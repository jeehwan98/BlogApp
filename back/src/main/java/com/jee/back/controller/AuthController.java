package com.jee.back.controller;

import com.jee.back.dto.LoginDTO;
import com.jee.back.dto.RegisterDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Log4j2
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> loginCredentials(@Valid @RequestBody LoginDTO loginDTO) {
        HashMap<String, Object> responseMap = new HashMap<>();
        try {
            /** set the user info into the securitycontextholder */
            String token = authService.login(loginDTO);
            responseMap.put("token", token);
            UserResponseDTO userResponseDTO = authService.getResponse(loginDTO.getEmail());
            responseMap.put("name", userResponseDTO.getName());
            responseMap.put("email", userResponseDTO.getEmail());
            responseMap.put("image", userResponseDTO.getImage());
        } catch (IllegalArgumentException e) {
            responseMap.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(responseMap);
        }
        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDTO registerDTO) {
        System.out.println("inputted register details>: " + registerDTO);
        log.info("Inputted register details: {}", registerDTO);
        authService.registerCredentials(registerDTO);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login/github")
    public ResponseEntity<String> loginGithub(@Valid @RequestBody RegisterDTO registerDTO) {
        authService.registerGithub(registerDTO);
        return ResponseEntity.ok("User registered successfully");
    }
}
