package com.hackverse.antiproc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SaveSessionResponse {
    private SessionResponse session;
    private Integer pointsEarned;
    private Integer newTotalPoints;
    private Integer newLevel;
    private String newLevelTitle;
    private boolean leveledUp;
}
