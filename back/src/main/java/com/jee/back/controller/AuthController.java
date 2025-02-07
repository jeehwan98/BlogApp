package com.jee.back.controller;

import com.jee.back.dto.LoginDTO;
import com.jee.back.dto.RegisterDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Log4j2
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> loginCredentials(@Valid @RequestBody LoginDTO loginDTO) {
        HashMap<String, Object> responseMap = new HashMap<>();
        String token;

        try {
            /** set the user info into the securitycontextholder */
            token = authService.login(loginDTO);
            responseMap.put("token", token);
            UserResponseDTO userResponseDTO = authService.getResponse(loginDTO.getEmail());
            responseMap.put("name", userResponseDTO.getName());
            responseMap.put("email", userResponseDTO.getEmail());
            responseMap.put("image", userResponseDTO.getImage());
        } catch (IllegalArgumentException e) {
            responseMap.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(responseMap);
        }

        ResponseCookie jwtCookie = ResponseCookie.from("accessToken", token)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .domain("localhost")
                .maxAge(Duration.ofMinutes(180))
                .build();

        System.out.println("details: " + responseMap);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(responseMap);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        System.out.println("logging out...!");
        ResponseCookie expiredCookie = ResponseCookie.from("accessToken", "")
                .path("/")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, expiredCookie.toString())
                .body(Map.of("message", "Logged out successfully"));
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