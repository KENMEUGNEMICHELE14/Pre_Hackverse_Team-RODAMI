package com.hackverse.antiproc.service;

import com.hackverse.antiproc.dto.request.TaskRequest;
import com.hackverse.antiproc.dto.request.UpdateTaskRequest;
import com.hackverse.antiproc.dto.response.PagedResponse;
import com.hackverse.antiproc.dto.response.TaskResponse;
import com.hackverse.antiproc.exception.ForbiddenException;
import com.hackverse.antiproc.exception.ResourceNotFoundException;
import com.hackverse.antiproc.model.Priority;
import com.hackverse.antiproc.model.Task;
import com.hackverse.antiproc.model.TaskStatus;
import com.hackverse.antiproc.model.User;
import com.hackverse.antiproc.repository.TaskRepository;
import com.hackverse.antiproc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public PagedResponse<TaskResponse> getTasks(Long userId, int page, int size, String sort) {
        User user = getUser(userId);
        String[] sortParts = sort.split(",");
        Sort.Direction dir = sortParts.length > 1 && "asc".equalsIgnoreCase(sortParts[1])
                ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(dir, sortParts[0]));
        Page<Task> taskPage = taskRepository.findByUser(user, pageable);

        return PagedResponse.<TaskResponse>builder()
                .content(taskPage.getContent().stream()
                        .map(t -> toResponse(t, 0))
                        .collect(Collectors.toList()))
                .totalElements(taskPage.getTotalElements())
                .totalPages(taskPage.getTotalPages())
                .currentPage(taskPage.getNumber())
                .size(taskPage.getSize())
                .build();
    }

    @Transactional
    public TaskResponse createTask(Long userId, TaskRequest req) {
        User user = getUser(userId);
        Task task = Task.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .priority(req.getPriority() != null ? req.getPriority() : Priority.MEDIUM)
                .status(TaskStatus.TODO)
                .deadline(req.getDeadline())
                .user(user)
                .build();
        return toResponse(taskRepository.save(task), 0);
    }

    @Transactional
    public TaskResponse updateTask(Long userId, Long taskId, UpdateTaskRequest req) {
        Task task = findTask(taskId, userId);

        if (req.getTitle() != null) task.setTitle(req.getTitle());
        if (req.getDescription() != null) task.setDescription(req.getDescription());
        if (req.getPriority() != null) task.setPriority(req.getPriority());
        if (req.getStatus() != null) task.setStatus(req.getStatus());

        return toResponse(taskRepository.save(task), 0);
    }

    @Transactional
    public void deleteTask(Long userId, Long taskId) {
        Task task = findTask(taskId, userId);
        taskRepository.delete(task);
    }

    /**
     * Returns tasks sorted by algorithm score per spec §5.4.
     */
    public List<TaskResponse> getPrioritizedTasks(Long userId) {
        User user = getUser(userId);
        List<Task> tasks = taskRepository.findByUser(user);
        return tasks.stream()
                .filter(t -> t.getStatus() != TaskStatus.DONE)
                .map(t -> {
                    int score = calculatePriorityScore(t);
                    return toResponse(t, score);
                })
                .sorted((a, b) -> Integer.compare(b.getPriorityScore(), a.getPriorityScore()))
                .collect(Collectors.toList());
    }

    /**
     * Priority score formula from spec §5.4:
     * Score = priorityPoints + urgencyPoints + investmentPoints
     */
    int calculatePriorityScore(Task task) {
        // Priority points
        int priorityPoints = switch (task.getPriority()) {
            case HIGH -> 3;
            case MEDIUM -> 2;
            case LOW -> 1;
        };

        // Urgency points based on deadline
        int urgencyPoints = 0;
        if (task.getDeadline() != null) {
            long daysLeft = LocalDate.now().until(task.getDeadline()).getDays();
            if (daysLeft < 1) urgencyPoints = 5;
            else if (daysLeft < 3) urgencyPoints = 3;
            else if (daysLeft < 7) urgencyPoints = 1;
        }

        // Investment points (has sessions)
        int investmentPoints = task.getFocusSessions().isEmpty() ? 0 : 1;

        return priorityPoints + urgencyPoints + investmentPoints;
    }

    private Task findTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Tâche introuvable."));
        if (!task.getUser().getId().equals(userId)) {
            throw new ForbiddenException("Accès refusé.");
        }
        return task;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable."));
    }

    public TaskResponse toResponse(Task task, int score) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .status(task.getStatus())
                .deadline(task.getDeadline())
                .createdAt(task.getCreatedAt())
                .priorityScore(score)
                .build();
    }
}
