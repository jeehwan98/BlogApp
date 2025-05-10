package com.jee.back.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> test() {
        return ResponseEntity.ok(Map.of("email", "completed"));
    }

    @PutMapping("/user/{email}")
    public ResponseEntity<Map<String, Object>> changeUserRole(@Valid @PathVariable String email) {
        return ResponseEntity.ok(Map.of("success", "asdasd"));
    }
}
