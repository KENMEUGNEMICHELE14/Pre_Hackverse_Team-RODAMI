package com.hackverse.antiproc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {
    private Long id;
    private LocalDateTime startTime;
    private Integer plannedDuration;
    private Integer actualDuration;
    private Boolean completed;
    private Integer pointsEarned;
    private Long taskId;
    private String taskTitle;
}
