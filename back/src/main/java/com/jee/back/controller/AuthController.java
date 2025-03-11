package com.jee.back.controller;

import com.jee.back.dto.LoginDTO;
import com.jee.back.dto.RegisterDTO;
import com.jee.back.entity.PasswordResetToken;
import com.jee.back.entity.User;
import com.jee.back.repository.PasswordResetTokenRepository;
import com.jee.back.repository.UserRepository;
import com.jee.back.service.AuthService;
import com.jee.back.service.UserService;
import com.jee.back.util.CookieUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final CookieUtil cookieUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

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
        SecurityContextHolder.clearContext();
        cookieUtil.clearCookies(response);
        log.info("SecurityContextHolder cleared and cookies cleared");
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", true);
        responseBody.put("message", "Logout successful");
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterDTO registerDTO) {
        log.info("registering user ✅");
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

    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentUserInfo(HttpServletRequest request) {
        try {
            String email = cookieUtil.getLoggedInUserEmail(request);
            if (email == null) {
                log.info("email is null: " + email);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "User not authenticated in authController"));
            }

            User user = userService.findUserByEmail(email);

            Map<String, Object> userDetails = new HashMap<>();
            userDetails.put("email", user.getEmail());
            userDetails.put("name", user.getName());
            userDetails.put("image", user.getImage());
            userDetails.put("bio", user.getIntroduction());
            userDetails.put("role", user.getRole());

            log.info("userDetails?: {}", userDetails);

            return ResponseEntity.ok(userDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User not authenticated in auth controller"));
        }
    }

    @PostMapping("/forgot-password/{email}")
    public ResponseEntity<Map<String, Object>> forgotPassword(@PathVariable("email") String email) {
        log.info("inputted email in forgotPassword method: {}", email);
        Map<String, Object> responseMap = new HashMap<>();
        User user = userService.findUserByEmail(email);

        if (user == null) {
            responseMap.put("success", false);
            responseMap.put("error", "Email doesn't exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }

        tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);
        PasswordResetToken token = new PasswordResetToken(user);
        tokenRepository.save(token);

        String resetUrl = "http://localhost:3000/reset-password?token=" + token.getToken();
        try {
            sendResetEmail(email, resetUrl);
            responseMap.put("success", true);
            responseMap.put("message", "Password reset link sent to your email");
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            responseMap.put("success", false);
            responseMap.put("error", "Failed to send reset email: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(
            @RequestParam String token,
            @RequestParam String password) {
        log.info("in reset-password method ✅");
        Map<String, Object> response = new HashMap<>();
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired()) {
            response.put("success", false);
            response.put("error", "Invalid or expired token");
            return ResponseEntity.badRequest().body(response);
        }

        User user = tokenOpt.get().getUser();
        response =  userService.updatePassword(user, password, tokenOpt.get());
        return ResponseEntity.ok(response);
    }

    private void sendResetEmail(String email, String resetUrl) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("Password Reset Request");
        helper.setText(
                "<h1>Password Reset</h1>" +
                        "<p>Hello,</p>" +
                        "<p>Click the link below to reset your password:</p>" +
                        "<a href=\"" + resetUrl + "\">Reset Password</a>" +
                        "<p>If you didn’t request this, please ignore this email.</p>" +
                        "<p>Best regards,<br>Your App Team</p>",
                true // Enable HTML
        );
        mailSender.send(message);
    }

    public void checkUser() {
        Authentication authCheck = SecurityContextHolder.getContext().getAuthentication();
        log.info("check for authenticated user's email: {}",
                authCheck != null ? authCheck.getName() : "No authentication found");
    }
}