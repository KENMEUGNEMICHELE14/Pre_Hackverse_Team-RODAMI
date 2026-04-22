package com.hackverse.antiproc.dto.response;

import com.hackverse.antiproc.model.Priority;
import com.hackverse.antiproc.model.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private TaskStatus status;
    private LocalDate deadline;
    private LocalDateTime createdAt;
    private int priorityScore; // For prioritized endpoint
}
