package com.hackverse.antiproc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsResponse {
    private Long totalMinutesFocused;
    private Long totalCompletedSessions;
    private Long totalAbandonedSessions;
    private Double completionRate;   // percentage 0-100
    private Integer currentStreak;
    private Integer totalPoints;
    private Integer level;
    private String levelTitle;
    private Long totalTasksDone;
}
