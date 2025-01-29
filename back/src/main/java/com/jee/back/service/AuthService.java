package com.jee.back.service;

import com.jee.back.dto.RegisterDTO;
import com.jee.back.entity.Role;
import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public void register(RegisterDTO registerDTO) {

        Optional<User> existsByUsername = userRepository.findByUsername(registerDTO.getUsername());
        if (existsByUsername.isPresent()) {
            throw new IllegalArgumentException("username already exists");
        }

        Optional<User> existsByEmail = userRepository.findByEmail(registerDTO.getEmail());
        if (existsByEmail.isPresent()) {
            throw new IllegalArgumentException("email already exists");
        }

        registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        registerDTO.setRole(Role.USER);

        User user = modelMapper.map(registerDTO, User.class);
        userRepository.save(user);
    }
}
