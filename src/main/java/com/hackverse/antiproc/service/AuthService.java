package com.hackverse.antiproc.service;

import com.hackverse.antiproc.dto.request.LoginRequest;
import com.hackverse.antiproc.dto.request.RegisterRequest;
import com.hackverse.antiproc.dto.response.AuthResponse;
import com.hackverse.antiproc.dto.response.AchievementResponse;
import com.hackverse.antiproc.dto.response.UserResponse;
import com.hackverse.antiproc.exception.ConflictException;
import com.hackverse.antiproc.exception.TooManyRequestsException;
import com.hackverse.antiproc.model.User;
import com.hackverse.antiproc.repository.UserRepository;
import com.hackverse.antiproc.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final GamificationService gamificationService;

    // Brute-force protection (in-memory as per §9.2)
    private final Map<String, Integer> failedAttempts = new ConcurrentHashMap<>();
    private final Map<String, Instant> lockoutExpiry = new ConcurrentHashMap<>();

    private static final int MAX_ATTEMPTS = 5;
    private static final long LOCKOUT_SECONDS = 900; // 15 minutes

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ConflictException("Un compte avec cet email existe déjà.");
        }
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new ConflictException("Ce nom d'utilisateur est déjà pris.");
        }

        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .totalPoints(0)
                .level(1)
                .build();

        user = userRepository.save(user);
        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getLevel());
        return AuthResponse.builder()
                .token(token)
                .user(toUserResponse(user))
                .build();
    }

    public AuthResponse login(LoginRequest req) {
        String email = req.getEmail();

        // Check brute-force lockout
        checkBruteForce(email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    recordFailedAttempt(email);
                    return new BadCredentialsException("Email ou mot de passe incorrect.");
                });

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            recordFailedAttempt(email);
            throw new BadCredentialsException("Email ou mot de passe incorrect.");
        }

        // Successful login — reset counter
        failedAttempts.remove(email);
        lockoutExpiry.remove(email);

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getLevel());
        return AuthResponse.builder()
                .token(token)
                .user(toUserResponse(user))
                .build();
    }

    private void checkBruteForce(String email) {
        Instant expiry = lockoutExpiry.get(email);
        if (expiry != null) {
            if (Instant.now().isBefore(expiry)) {
                throw new TooManyRequestsException(
                        "Trop de tentatives. Compte bloqué 15 minutes. Réessayez plus tard.");
            } else {
                // Lockout expired — reset
                lockoutExpiry.remove(email);
                failedAttempts.remove(email);
            }
        }
    }

    private void recordFailedAttempt(String email) {
        int attempts = failedAttempts.merge(email, 1, Integer::sum);
        if (attempts >= MAX_ATTEMPTS) {
            lockoutExpiry.put(email, Instant.now().plusSeconds(LOCKOUT_SECONDS));
            log.warn("Account locked for email: {} after {} failed attempts", email, attempts);
        }
    }

    public UserResponse toUserResponse(User user) {
        List<AchievementResponse> badges = user.getAchievements().stream()
                .map(a -> AchievementResponse.builder()
                        .id(a.getId())
                        .name(a.getName())
                        .description(a.getDescription())
                        .icon(a.getIcon())
                        .bonusPoints(a.getBonusPoints())
                        .build())
                .collect(Collectors.toList());

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .totalPoints(user.getTotalPoints())
                .level(user.getLevel())
                .levelTitle(gamificationService.getLevelTitle(user.getLevel()))
                .badges(badges)
                .build();
    }
}
