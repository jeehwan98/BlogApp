package com.jee.back.service;

import com.jee.back.dto.UpdateUserDTO;
import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        return (User) userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + email));
    }

    public User updateUser(String email, UpdateUserDTO updateUserDTO) {
        User user = getUserByEmail(email);
        user.setIntroduction(updateUserDTO.getIntroduction());
        User updatedUser = userRepository.save(user);
        return updatedUser;
    }
}
