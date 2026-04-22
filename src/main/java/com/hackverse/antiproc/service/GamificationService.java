package com.hackverse.antiproc.service;

import com.hackverse.antiproc.model.User;
import org.springframework.stereotype.Service;

/**
 * Handles XP points calculation and level progression per spec §5.2 and §5.3.
 */
@Service
public class GamificationService {

    public static final int[] LEVEL_THRESHOLDS = {0, 0, 200, 500, 1000, 2000};
    public static final String[] LEVEL_TITLES = {"", "Débutant", "Focalisé", "Productif", "Expert", "Maître du Focus"};

    /**
     * Calculate points for a session based on actual vs planned duration.
     * Rules (§5.1 + §5.2):
     * - completed (actual >= planned): 25min -> 50pts, 50min -> 120pts, others proportional
     * - partial (>= 50%): 50% of full points
     * - abandoned (< 50%): 0 pts
     */
    public int calculateSessionPoints(int plannedDuration, int actualDuration) {
        boolean completed = actualDuration >= plannedDuration;
        boolean partial = !completed && (actualDuration * 2 >= plannedDuration);

        if (!completed && !partial) {
            return 0; // abandoned
        }

        int fullPoints = getFullPoints(plannedDuration);
        return completed ? fullPoints : fullPoints / 2;
    }

    private int getFullPoints(int plannedDuration) {
        if (plannedDuration <= 25) return 50;
        if (plannedDuration <= 50) return 120;
        // Proportional for custom durations
        return (plannedDuration <= 25) ? 50 : 50 + (plannedDuration - 25) * (70 / 25);
    }

    /**
     * Calculate user level from total points per spec §5.3.
     */
    public int calculateLevel(int totalPoints) {
        if (totalPoints >= 2000) return 5;
        if (totalPoints >= 1000) return 4;
        if (totalPoints >= 500)  return 3;
        if (totalPoints >= 200)  return 2;
        return 1;
    }

    public String getLevelTitle(int level) {
        if (level < 1 || level > 5) return "Débutant";
        return LEVEL_TITLES[level];
    }

    /**
     * Update user level after adding points. Returns true if leveled up.
     */
    public boolean updateUserLevel(User user) {
        int oldLevel = user.getLevel();
        int newLevel = calculateLevel(user.getTotalPoints());
        user.setLevel(newLevel);
        return newLevel > oldLevel;
    }
}
