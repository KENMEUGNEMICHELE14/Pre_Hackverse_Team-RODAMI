package com.hackverse.antiproc.service;

import com.hackverse.antiproc.dto.request.SessionSaveRequest;
import com.hackverse.antiproc.dto.response.PagedResponse;
import com.hackverse.antiproc.dto.response.SaveSessionResponse;
import com.hackverse.antiproc.dto.response.SessionResponse;
import com.hackverse.antiproc.exception.ForbiddenException;
import com.hackverse.antiproc.exception.ResourceNotFoundException;
import com.hackverse.antiproc.model.FocusSession;
import com.hackverse.antiproc.model.Task;
import com.hackverse.antiproc.model.TaskStatus;
import com.hackverse.antiproc.model.User;
import com.hackverse.antiproc.repository.FocusSessionRepository;
import com.hackverse.antiproc.repository.TaskRepository;
import com.hackverse.antiproc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FocusSessionService {

    private final FocusSessionRepository sessionRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;
    private final AchievementService achievementService;

    @Transactional
    public SaveSessionResponse saveSession(Long userId, SessionSaveRequest req) {
        User user = getUser(userId);
        Task task = taskRepository.findById(req.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Tâche introuvable."));

        // Security: ensure task belongs to user
        if (!task.getUser().getId().equals(userId)) {
            throw new ForbiddenException("Accès refusé.");
        }

        int planned = req.getPlannedDuration();
        int actual = req.getActualDuration();

        // Backend calculates completed, never trusts client
        boolean completed = actual >= planned;

        // Calculate points (§5.1 + §5.2)
        int points = gamificationService.calculateSessionPoints(planned, actual);
        int oldLevel = user.getLevel();

        // Award points
        user.addPoints(points);
        boolean leveledUp = gamificationService.updateUserLevel(user);

        // Handle streak bonus (§5.5)
        points += handleStreakBonus(user, completed);

        // Update task status
        if (completed && task.getStatus() == TaskStatus.TODO) {
            task.setStatus(TaskStatus.IN_PROGRESS);
            taskRepository.save(task);
        }

        FocusSession session = FocusSession.builder()
                .startTime(req.getStartTime())
                .plannedDuration(planned)
                .actualDuration(actual)
                .completed(completed)
                .pointsEarned(points)
                .task(task)
                .user(user)
                .build();

        session = sessionRepository.save(session);
        userRepository.save(user);

        // Check and award badges (after saving session)
        achievementService.evaluateAndAwardBadges(user);

        return SaveSessionResponse.builder()
                .session(toResponse(session))
                .pointsEarned(points)
                .newTotalPoints(user.getTotalPoints())
                .newLevel(user.getLevel())
                .newLevelTitle(gamificationService.getLevelTitle(user.getLevel()))
                .leveledUp(leveledUp)
                .build();
    }

    /**
     * Streak algorithm per spec §5.5:
     * Count consecutive completed sessions from most recent; break on first false.
     * Bonus if streak >= 3.
     */
    private int handleStreakBonus(User user, boolean currentSessionCompleted) {
        if (!currentSessionCompleted) return 0;

        List<FocusSession> sessions = sessionRepository.findByUserOrderByStartTimeDesc(user);
        int streak = 0;
        for (FocusSession s : sessions) {
            if (Boolean.TRUE.equals(s.getCompleted())) streak++;
            else break;
        }
        // Include current unsaved session
        streak++;

        if (streak >= 3) {
            user.addPoints(100); // streak bonus
            return 100;
        }
        return 0;
    }

    public PagedResponse<SessionResponse> getHistory(Long userId, int page, int size) {
        User user = getUser(userId);
        Pageable pageable = PageRequest.of(page, Math.min(size, 100));
        Page<FocusSession> pageResult = sessionRepository
                .findByUserOrderByStartTimeDesc(user, pageable);

        return PagedResponse.<SessionResponse>builder()
                .content(pageResult.getContent().stream()
                        .map(this::toResponse)
                        .collect(Collectors.toList()))
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .currentPage(pageResult.getNumber())
                .size(pageResult.getSize())
                .build();
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable."));
    }

    public SessionResponse toResponse(FocusSession s) {
        return SessionResponse.builder()
                .id(s.getId())
                .startTime(s.getStartTime())
                .plannedDuration(s.getPlannedDuration())
                .actualDuration(s.getActualDuration())
                .completed(s.getCompleted())
                .pointsEarned(s.getPointsEarned())
                .taskId(s.getTask().getId())
                .taskTitle(s.getTask().getTitle())
                .build();
    }
}
