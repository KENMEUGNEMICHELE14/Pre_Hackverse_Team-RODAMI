package com.hackverse.antiproc.service;

import com.hackverse.antiproc.dto.request.UpdateProfileRequest;
import com.hackverse.antiproc.dto.response.AchievementResponse;
import com.hackverse.antiproc.dto.response.UserResponse;
import com.hackverse.antiproc.exception.ConflictException;
import com.hackverse.antiproc.model.User;
import com.hackverse.antiproc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GamificationService gamificationService;

    public UserResponse getProfile(Long userId) {
        User user = getUser(userId);
        return toResponse(user);
    }

    @Transactional
    public UserResponse updateProfile(Long userId, UpdateProfileRequest req) {
        User user = getUser(userId);

        if (StringUtils.hasText(req.getUsername())
                && !req.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(req.getUsername())) {
                throw new ConflictException("Ce nom d'utilisateur est déjà pris.");
            }
            user.setUsername(req.getUsername());
        }

        if (StringUtils.hasText(req.getEmail())
                && !req.getEmail().equalsIgnoreCase(user.getEmail())) {
            if (userRepository.existsByEmail(req.getEmail())) {
                throw new ConflictException("Un compte avec cet email existe déjà.");
            }
            user.setEmail(req.getEmail());
        }

        if (StringUtils.hasText(req.getNewPassword())) {
            if (!StringUtils.hasText(req.getCurrentPassword())) {
                throw new BadCredentialsException("Le mot de passe actuel est requis.");
            }
            if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPasswordHash())) {
                throw new BadCredentialsException("Mot de passe actuel incorrect.");
            }
            user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        }

        return toResponse(userRepository.save(user));
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable."));
    }

    public UserResponse toResponse(User user) {
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
