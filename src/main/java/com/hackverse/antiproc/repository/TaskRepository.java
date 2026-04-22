package com.hackverse.antiproc.repository;

import com.hackverse.antiproc.model.Task;
import com.hackverse.antiproc.model.TaskStatus;
import com.hackverse.antiproc.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByUser(User user, Pageable pageable);
    List<Task> findByUser(User user);
    Optional<Task> findByIdAndUser(Long id, User user);
    long countByUserAndStatus(User user, TaskStatus status);

    @Query("SELECT t FROM Task t LEFT JOIN t.focusSessions fs WHERE t.user = :user GROUP BY t ORDER BY COUNT(fs) DESC")
    List<Task> findByUserWithSessionCount(@Param("user") User user);
}
