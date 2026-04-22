package com.hackverse.antiproc.dto.request;

import com.hackverse.antiproc.model.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "Le titre de la tâche ne peut pas être vide.")
    @Size(max = 255, message = "Le titre ne peut pas dépasser 255 caractères.")
    private String title;

    @Size(max = 2000, message = "La description ne peut pas dépasser 2000 caractères.")
    private String description;

    private Priority priority = Priority.MEDIUM;

    private LocalDate deadline;
}
