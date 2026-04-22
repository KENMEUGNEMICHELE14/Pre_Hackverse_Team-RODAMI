package com.hackverse.antiproc.controller;

import com.hackverse.antiproc.dto.request.SessionSaveRequest;
import com.hackverse.antiproc.dto.response.PagedResponse;
import com.hackverse.antiproc.dto.response.SaveSessionResponse;
import com.hackverse.antiproc.dto.response.SessionResponse;
import com.hackverse.antiproc.repository.UserRepository;
import com.hackverse.antiproc.service.FocusSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final FocusSessionService focusSessionService;
    private final UserRepository userRepository;

    @PostMapping("/save")
    public ResponseEntity<SaveSessionResponse> saveSession(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody SessionSaveRequest req) {
        Long userId = resolveUserId(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(focusSessionService.saveSession(userId, req));
    }

    @GetMapping("/history")
    public ResponseEntity<PagedResponse<SessionResponse>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Long userId = resolveUserId(userDetails);
        return ResponseEntity.ok(focusSessionService.getHistory(userId, page, size));
    }

    private Long resolveUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow().getId();
    }
}
