package com.hackverse.antiproc.controller;

import com.hackverse.antiproc.dto.response.AchievementResponse;
import com.hackverse.antiproc.model.User;
import com.hackverse.antiproc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<List<AchievementResponse>> getMyAchievements(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        List<AchievementResponse> badges = user.getAchievements().stream()
                .map(a -> AchievementResponse.builder()
                        .id(a.getId())
                        .name(a.getName())
                        .description(a.getDescription())
                        .icon(a.getIcon())
                        .bonusPoints(a.getBonusPoints())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(badges);
    }
}
