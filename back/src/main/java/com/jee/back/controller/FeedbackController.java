package com.jee.back.controller;

import com.jee.back.dto.FeedbackDTO;
import com.jee.back.service.BlogService;
import com.jee.back.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.jee.back.service.FeedbackService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/feedback")
@RequiredArgsConstructor
@Log4j2
public class FeedbackController {

    private final UserService userService;
    private final BlogService blogService;
    private final FeedbackService feedbackService;

    @PostMapping("/{email}")
    public ResponseEntity<Map<String, Object>> postFeedback(
            @PathVariable("email") String email,
            @RequestBody String content) {
        try {
            FeedbackDTO savedFeedback = feedbackService.saveFeedback(email, content);
            Map<String, Object> response = new HashMap<>();
            response.put("success", "saved feedback success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching feedback for email: {}, error: {}", email, e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping()
    public ResponseEntity<Map<String, Object>> getAllFeedback() {
        log.info("in getAllFeedback controller");
        return ResponseEntity.ok(Map.of("result", feedbackService.getAllFeedback()));
    }
}
