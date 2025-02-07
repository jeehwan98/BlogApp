package com.jee.back.service;

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

    public User getUser(String email) {
        return (User) userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + email));
    }
}
