package com.jee.back.controller;

import com.jee.back.dto.LoginDTO;
import com.jee.back.dto.RegisterDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.entity.User;
import com.jee.back.service.AuthService;
import com.jee.back.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final CookieUtil cookieUtil;

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO,
                                                     HttpServletRequest request,
                                                     HttpServletResponse httpResponse) throws IOException {
        log.info("Login request received: email={}", loginDTO.getEmail());
        Map<String, Object> response = authService.login(loginDTO, request, httpResponse);

        log.info("AuthService response: {}", response);
        checkUser();

        if (!Boolean.TRUE.equals(response.get("success"))) {
            log.info("Login failed, returning UNAUTHORIZED");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        log.info("Full response headers: {}", httpResponse.getHeaderNames());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request, HttpServletResponse response) {
        log.info("Logout request received");

        SecurityContextHolder.clearContext();
        log.info("SecurityContextHolder cleared");

        cookieUtil.clearCookies(response);
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", true);
        responseBody.put("message", "Logout successful");
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterDTO registerDTO) {
        Map<String, Object> response = authService.registerUser(registerDTO);
        if (!(Boolean) response.get("success")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/login/github")
    public ResponseEntity<Void> loginWithGitHub() {
        log.info("in login github ✅");
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", "/oauth2/authorization/github")
                .build();
    }

    public void checkUser() {
        Authentication authCheck = SecurityContextHolder.getContext().getAuthentication();
        log.info("check for authenticated user's email: {}",
                authCheck != null ? authCheck.getName() : "No authentication found");
    }
}