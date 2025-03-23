package com.jee.back.controller;

import com.jee.back.dto.UpdateUserDTO;
import com.jee.back.dto.UpdateUserImageDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.entity.User;
import com.jee.back.service.UserService;
import com.jee.back.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Log4j2
@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

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
        log.info("email1?: ", email1);
        String email = userDetails.getUsername();

        return ResponseEntity.ok(Map.of("email", email));
    }

    @GetMapping()
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        return ResponseEntity.ok(Map.of("result", userService.getAllUsers()));
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        UserResponseDTO responseDTO = modelMapper.map(user, UserResponseDTO.class);

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Map<String, Object>> updateUserInfo(@PathVariable String email, @RequestBody UpdateUserDTO updateUserDTO) {
        User user = userService.updateUserForIntroduction(email, updateUserDTO);
        return ResponseEntity.ok(Map.of("success", user));
    }

    @PutMapping("/image")
    public ResponseEntity<Map<String, Object>> updateUserImage(@RequestBody UpdateUserImageDTO updateImageDTO) {
        Map<String, Object> response = userService.updateUserImage(updateImageDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/edit/{email}")
    public ResponseEntity<Map<String, Object>> updateUserDetails(@PathVariable String email, @RequestBody UpdateUserDTO updateUserDTO) {
        User user;
        user = userService.getUserByEmail(email);
        log.info("initial user details: {}", user);
        user = userService.updateUserDetails(email, updateUserDTO);
        log.info("updated user info?: {}", user);
        return ResponseEntity.ok(Map.of("success", "user updated successfully"));
    }
}
