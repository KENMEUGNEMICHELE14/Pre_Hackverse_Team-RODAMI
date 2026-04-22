package com.hackverse.antiproc.service;

import com.hackverse.antiproc.dto.response.LeaderboardEntry;
import com.hackverse.antiproc.dto.response.StatsResponse;
import com.hackverse.antiproc.model.FocusSession;
import com.hackverse.antiproc.model.TaskStatus;
import com.hackverse.antiproc.model.User;
import com.hackverse.antiproc.repository.FocusSessionRepository;
import com.hackverse.antiproc.repository.TaskRepository;
import com.hackverse.antiproc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final FocusSessionRepository sessionRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;

    public StatsResponse getMyStats(Long userId) {
        User user = getUser(userId);

        List<FocusSession> allSessions = sessionRepository.findByUserOrderByStartTimeDesc(user);
        long completed = allSessions.stream().filter(s -> Boolean.TRUE.equals(s.getCompleted())).count();
        long abandoned = allSessions.size() - completed;
        Long totalMinutes = sessionRepository.sumActualDurationByUser(user);
        double rate = allSessions.isEmpty() ? 0.0 : (completed * 100.0 / allSessions.size());
        int streak = calculateStreak(allSessions);
        long tasksDone = taskRepository.countByUserAndStatus(user, TaskStatus.DONE);

        return StatsResponse.builder()
                .totalMinutesFocused(totalMinutes != null ? totalMinutes : 0L)
                .totalCompletedSessions(completed)
                .totalAbandonedSessions(abandoned)
                .completionRate(Math.round(rate * 10.0) / 10.0)
                .currentStreak(streak)
                .totalPoints(user.getTotalPoints())
                .level(user.getLevel())
                .levelTitle(gamificationService.getLevelTitle(user.getLevel()))
                .totalTasksDone(tasksDone)
                .build();
    }

    public List<LeaderboardEntry> getLeaderboard(int limit) {
        List<User> topUsers = userRepository.findTopByOrderByTotalPointsDesc(Math.min(limit, 100));
        List<LeaderboardEntry> result = new ArrayList<>();
        for (int i = 0; i < topUsers.size(); i++) {
            User u = topUsers.get(i);
            result.add(LeaderboardEntry.builder()
                    .rank(i + 1)
                    .userId(u.getId())
                    .username(u.getUsername())
                    .totalPoints(u.getTotalPoints())
                    .level(u.getLevel())
                    .levelTitle(gamificationService.getLevelTitle(u.getLevel()))
                    .build());
        }
        return result;
    }

    private int calculateStreak(List<FocusSession> sessions) {
        int streak = 0;
        for (FocusSession s : sessions) {
            if (Boolean.TRUE.equals(s.getCompleted())) streak++;
            else break;
        }
        return streak;
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable."));
    }
}
