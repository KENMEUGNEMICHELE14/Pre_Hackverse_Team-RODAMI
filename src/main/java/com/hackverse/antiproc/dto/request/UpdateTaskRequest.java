package com.hackverse.antiproc.dto.request;

import com.hackverse.antiproc.model.Priority;
import com.hackverse.antiproc.model.TaskStatus;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateTaskRequest {

    @Size(max = 255, message = "Le titre ne peut pas dépasser 255 caractères.")
    private String title;

    @Size(max = 2000, message = "La description ne peut pas dépasser 2000 caractères.")
    private String description;

    private Priority priority;

    private TaskStatus status;
}
