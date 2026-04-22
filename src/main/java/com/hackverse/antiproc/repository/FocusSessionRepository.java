package com.hackverse.antiproc.repository;

import com.hackverse.antiproc.model.FocusSession;
import com.hackverse.antiproc.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface FocusSessionRepository extends JpaRepository<FocusSession, Long> {
    Page<FocusSession> findByUserOrderByStartTimeDesc(User user, Pageable pageable);
    List<FocusSession> findByUserOrderByStartTimeDesc(User user);

    @Query("SELECT COUNT(fs) FROM FocusSession fs WHERE fs.user = :user AND fs.completed = true AND fs.startTime >= :since")
    long countCompletedSessionsSince(@Param("user") User user, @Param("since") LocalDateTime since);

    @Query("SELECT COUNT(DISTINCT CAST(fs.startTime AS date)) FROM FocusSession fs WHERE fs.user = :user AND fs.completed = true AND fs.startTime >= :since")
    long countDistinctDaysWithCompletedSessions(@Param("user") User user, @Param("since") LocalDateTime since);

    @Query("SELECT SUM(fs.actualDuration) FROM FocusSession fs WHERE fs.user = :user AND fs.completed = true")
    Long sumActualDurationByUser(@Param("user") User user);

    @Query("SELECT fs FROM FocusSession fs WHERE fs.user = :user AND CAST(fs.startTime AS date) = CURRENT_DATE AND fs.completed = true")
    List<FocusSession> findCompletedTodayByUser(@Param("user") User user);
}
