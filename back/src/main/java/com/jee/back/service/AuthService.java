package com.jee.back.service;

import com.jee.back.dto.LoginDTO;
import com.jee.back.dto.RegisterDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.entity.Role;
import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import com.jee.back.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final CookieUtil cookieUtil;
    private final UsersDetailsService usersDetailsService;

    public Map<String, Object> login(LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse httpResponse) {
        Map<String, Object> response = new HashMap<>();
        User user = userService.findUserByEmail(loginDTO.getEmail());

        if (user == null || !passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            response.put("success", false);
            response.put("error", "Invalid email or password");
            return response;
        }

        cookieUtil.createCookies(httpResponse, user);

        UserDetails userDetails = usersDetailsService.loadUserByUsername(user.getEmail());
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("accessToken", cookieUtil.createAccessToken(user));
        response.put("refreshToken", cookieUtil.createRefreshToken());

        return response;
    }

    public User registerCredentials(RegisterDTO registerDTO) {
        Optional<User> existsByEmail = userRepository.findByEmail(registerDTO.getEmail());
        if (existsByEmail.isPresent()) {
            throw new IllegalArgumentException("email already exists");
        }

        registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        registerDTO.setRole(Role.USER);
        return userRepository.save(new User(registerDTO));
    }

    public void registerGithub(RegisterDTO registerDTO) {
        registerDTO.setRole(Role.USER);
        System.out.println(registerDTO);

        User user = modelMapper.map(registerDTO, User.class);
        userRepository.save(user);
    }

    public UserResponseDTO getResponse(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found with username: " + email));
        UserResponseDTO userResponseDTO = modelMapper.map(user, UserResponseDTO.class);
        return userResponseDTO;
    }

    public Map<String, Object> registerUser(RegisterDTO registerDTO) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> existsByEmail = userRepository.findByEmail(registerDTO.getEmail());
        if (existsByEmail.isPresent()) {
            response.put("success", false);
            response.put("error", "Email already exists");
            return response;
        }

        registerDTO.setRole(Role.USER);
        registerDTO.setProvider("Email");
        registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        User user = modelMapper.map(registerDTO, User.class);
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "Registration success");
        return response;
    }
}


