package com.hackverse.antiproc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Integer totalPoints;
    private Integer level;
    private String levelTitle;
    private List<AchievementResponse> badges;
}
