package com.jee.back.controller;

import com.jee.back.service.UserService;
import com.jee.back.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /** diverse ways in getting the user details
     * 1. through @AuthenticationPrincipal (needs some enhancement)
     * 2. through SecurityUtil.getAuthenticatedUserEmail
     * */
    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated"));
        }

        String email1 = SecurityUtil.getAuthenticatedUserEmail();
        System.out.println("email1?: " + email1);

        String email = userDetails.getUsername();

        return ResponseEntity.ok(Map.of("email", email));
    }
}
