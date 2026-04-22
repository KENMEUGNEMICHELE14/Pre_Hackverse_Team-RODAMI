package com.hackverse.antiproc.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "focus_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FocusSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "planned_duration", nullable = false)
    private Integer plannedDuration; // minutes

    @Column(name = "actual_duration", nullable = false)
    private Integer actualDuration; // minutes

    /**
     * Calculated by backend: true if actualDuration >= plannedDuration.
     * Clients must NOT send this field.
     */
    @Column(nullable = false)
    @Builder.Default
    private Boolean completed = false;

    @Column(name = "points_earned", nullable = false)
    @Builder.Default
    private Integer pointsEarned = 0;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
