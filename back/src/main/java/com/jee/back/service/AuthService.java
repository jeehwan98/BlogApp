package com.jee.back.service;

import com.jee.back.dto.LoginDTO;
import com.jee.back.dto.RegisterDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.entity.Role;
import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import com.jee.back.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtil jwtUtil;

    public String login(LoginDTO loginDTO) {
        Optional<User> userOptional = userRepository.findByUsername(loginDTO.getUsername());
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid username");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        return jwtUtil.generateToken(user.getUsername());
    }

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

    public UserResponseDTO getResponse(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user not found with username: " + username));
        UserResponseDTO userResponseDTO = modelMapper.map(user, UserResponseDTO.class);
        return userResponseDTO;
    }

}
