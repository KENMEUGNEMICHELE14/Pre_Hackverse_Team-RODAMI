package com.hackverse.antiproc.service;

import com.hackverse.antiproc.model.Achievement;
import com.hackverse.antiproc.model.TaskStatus;
import com.hackverse.antiproc.model.User;
import com.hackverse.antiproc.repository.AchievementRepository;
import com.hackverse.antiproc.repository.FocusSessionRepository;
import com.hackverse.antiproc.repository.TaskRepository;
import com.hackverse.antiproc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final FocusSessionRepository sessionRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;

    @Transactional
    public void evaluateAndAwardBadges(User user) {
        LocalDateTime safeEpoch = LocalDateTime.of(2000, 1, 1, 0, 0);
        awardIfEligible(user, "Premier Pas",
                () -> sessionRepository.countCompletedSessionsSince(user, safeEpoch) >= 1);

        awardIfEligible(user, "En Feu",
                () -> sessionRepository.findCompletedTodayByUser(user).size() >= 3);

        awardIfEligible(user, "Streak Master",
                () -> calculateConsecutiveStreak(user) >= 5);

        awardIfEligible(user, "Chasseur de tâches",
                () -> taskRepository.countByUserAndStatus(user, TaskStatus.DONE) >= 10);

        awardIfEligible(user, "Top 3",
                () -> isUserInTop3(user));

        awardIfEligible(user, "Maître du Focus",
                () -> user.getLevel() >= 5);
    }

    private void awardIfEligible(User user, String badgeName, java.util.function.BooleanSupplier condition) {
        Optional<Achievement> achievement = achievementRepository.findByName(badgeName);
        if (achievement.isEmpty()) return;

        Achievement badge = achievement.get();
        boolean alreadyEarned = user.getAchievements().contains(badge);
        if (!alreadyEarned && condition.getAsBoolean()) {
            user.getAchievements().add(badge);
            user.addPoints(badge.getBonusPoints());
            gamificationService.updateUserLevel(user);
            userRepository.save(user);
            log.info("Badge '{}' awarded to user {}", badgeName, user.getId());
        }
    }

    private int calculateConsecutiveStreak(User user) {
        var sessions = sessionRepository.findByUserOrderByStartTimeDesc(user);
        int streak = 0;
        for (var s : sessions) {
            if (Boolean.TRUE.equals(s.getCompleted())) streak++;
            else break;
        }
        return streak;
    }

    private boolean isUserInTop3(User user) {
        List<User> top3 = userRepository.findTopByOrderByTotalPointsDesc(3);
        return top3.stream().anyMatch(u -> u.getId().equals(user.getId()));
    }
}
