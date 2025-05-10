package com.jee.back.service;

import com.jee.back.dto.UpdateUserDTO;
import com.jee.back.dto.UpdateUserImageDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.entity.PasswordResetToken;
import com.jee.back.entity.User;
import com.jee.back.repository.PasswordResetTokenRepository;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;

    public User getUserByEmail(String email) {
        return (User) userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + email));
    }

    public User updateUserForIntroduction(String email, UpdateUserDTO updateUserDTO) {
        User user = getUserByEmail(email);
        user.setIntroduction(updateUserDTO.getIntroduction());
        User updatedUser = userRepository.save(user);
        return updatedUser;
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + email));
    }

    public Map<String, Object> updateUserImage(UpdateUserImageDTO updateUserImageDTO) {
        log.info("update user image ✅");
        Map<String, Object> response = new HashMap<>();
        try {
            User user = findUserByEmail(updateUserImageDTO.getEmail());
            user.setImage(updateUserImageDTO.getImage());
            User savedUser = userRepository.save(user);
            response.put("success", true);
            response.put("message", savedUser.getImage());
        } catch (Exception e) {
            log.error("Error updating user image: {}", e.getMessage());
            response.put("success", false);
            response.put("error", "Failed to update user image");
        }

        return response;
    }

    public Map<String, Object> updatePassword(User user, String newPassword, PasswordResetToken token) {
        Map<String, Object> response = new HashMap<>();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(token);
        response.put("success", true);
        response.put("message", "Password updated successfully");

        return response;
    }

    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserResponseDTO::new).collect(Collectors.toList());
    }

    public User updateUserDetails(String email, UpdateUserDTO updateUserDTO) {
        User user = getUserByEmail(email);
        user.setName(updateUserDTO.getName());
        user.setEmail(updateUserDTO.getEmail());
        user.setRole(updateUserDTO.getRole());
        return userRepository.save(user);
    }
}
