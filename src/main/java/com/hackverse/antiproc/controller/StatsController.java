package com.hackverse.antiproc.controller;

import com.hackverse.antiproc.dto.response.LeaderboardEntry;
import com.hackverse.antiproc.dto.response.StatsResponse;
import com.hackverse.antiproc.repository.UserRepository;
import com.hackverse.antiproc.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<StatsResponse> getMyStats(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = resolveUserId(userDetails);
        return ResponseEntity.ok(statsService.getMyStats(userId));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(statsService.getLeaderboard(limit));
    }

    private Long resolveUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow().getId();
    }
}
