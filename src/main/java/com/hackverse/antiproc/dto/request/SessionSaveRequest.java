package com.hackverse.antiproc.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SessionSaveRequest {

    @NotNull(message = "L'identifiant de la tâche est requis.")
    private Long taskId;

    @NotNull(message = "L'heure de début est requise.")
    private LocalDateTime startTime;

    @NotNull(message = "La durée prévue est requise.")
    @Min(value = 1, message = "La durée prévue doit être d'au moins 1 minute.")
    private Integer plannedDuration;

    @NotNull(message = "La durée réelle est requise.")
    @Min(value = 0, message = "La durée réelle ne peut pas être négative.")
    private Integer actualDuration;
}
