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
    Map<String, Object> responseMap = new HashMap<>();

    public Map<String, Object> login(LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse httpResponse) {
        Map<String, Object> responseMap = new HashMap<>();
        User user = userService.findUserByEmail(loginDTO.getEmail());
        if (user == null || !passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            responseMap.put("success", false);
            responseMap.put("message", "Invalid email or password");
            responseMap.put("error", "Invalid email or password");
            return responseMap;
        }

        cookieUtil.createCookies(httpResponse, user);

        UserDetails userDetails = usersDetailsService.loadUserByUsername(user.getEmail());
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        responseMap.put("success", true);
        responseMap.put("message", "Login successful");
        responseMap.put("accessToken", cookieUtil.createAccessToken(user));
        responseMap.put("refreshToken", cookieUtil.createRefreshToken());

        return responseMap;
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

    public boolean checkUserPassword(User user, String currentPassword) {
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return false;
        }
        return true;
    }

    public Map<String, Object> updatePassword(User user, String inputtedPassword) {
        Map<String, Object> responseMap = new HashMap<>();
        user.setPassword(passwordEncoder.encode(inputtedPassword));
        userRepository.save(user);
        responseMap.put("success", true);
        responseMap.put("message", "Password has been successfully update");

        return responseMap;
    }
}


