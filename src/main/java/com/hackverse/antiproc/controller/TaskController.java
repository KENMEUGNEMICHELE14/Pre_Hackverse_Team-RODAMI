package com.hackverse.antiproc.controller;

import com.hackverse.antiproc.dto.request.TaskRequest;
import com.hackverse.antiproc.dto.request.UpdateTaskRequest;
import com.hackverse.antiproc.dto.response.PagedResponse;
import com.hackverse.antiproc.dto.response.TaskResponse;
import com.hackverse.antiproc.repository.UserRepository;
import com.hackverse.antiproc.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<PagedResponse<TaskResponse>> getTasks(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort) {
        Long userId = resolveUserId(userDetails);
        return ResponseEntity.ok(taskService.getTasks(userId, page, size, sort));
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TaskRequest req) {
        Long userId = resolveUserId(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(userId, req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskRequest req) {
        Long userId = resolveUserId(userDetails);
        return ResponseEntity.ok(taskService.updateTask(userId, id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        Long userId = resolveUserId(userDetails);
        taskService.deleteTask(userId, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/prioritized")
    public ResponseEntity<List<TaskResponse>> getPrioritized(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = resolveUserId(userDetails);
        return ResponseEntity.ok(taskService.getPrioritizedTasks(userId));
    }

    private Long resolveUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow().getId();
    }
}
