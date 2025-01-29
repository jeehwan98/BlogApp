package com.jee.back.controller;

import com.jee.back.dto.LoginDTO;
import com.jee.back.dto.RegisterDTO;
import com.jee.back.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/login")
    public ResponseEntity<String> login(@Valid LoginDTO loginDTO) {
        String token = authService.login(loginDTO);
        return ResponseEntity.ok(token);
    }

    @PostMapping
    public ResponseEntity<String> register(@Valid RegisterDTO registerDTO) {
        authService.register(registerDTO);
        return ResponseEntity.ok("User registered successfully");
    }
}
