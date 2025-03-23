package com.jee.back.util;

import com.jee.back.entity.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Log4j2
@Component
@RequiredArgsConstructor
public class CookieUtil {
    private final JwtUtil jwtUtil;

    public void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);

        String sameSite = "None";
        String cookieHeader = String.format("%s=%s; Max-Age=%d; Path=/; HttpOnly; Secure; SameSite=%s",
                name, value, maxAge, sameSite);
        response.addHeader("Set-Cookie", cookieHeader);
    }

    public void createCookies(HttpServletResponse response, User user) {
        String accessToken = createAccessToken(user);
        String refreshToken = createRefreshToken();

        setCookie(response, "accessToken", accessToken, 60 * 60);
        setCookie(response, "refreshToken", refreshToken, 7 * 24 * 60 * 60);
    }

    public String createAccessToken(User user) {
        return JwtUtil.generateAccessToken(user.getEmail());
    }

    public String createRefreshToken() {
        return JwtUtil.generateRefreshToken();
    }

    public static String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated in cookie Util");
        }

        return authentication.getName();
    }

    public String getLoggedInUserEmail(HttpServletRequest request) {
        String token = extractTokenFromCookies(request);
        String email = jwtUtil.extractEmail(token);
        return email;
    }

    private static String extractTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            return Arrays.stream(request.getCookies())
                    .filter(cookie -> "accessToken".equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);
        }
        return null;
    }

    public void clearCookies(HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(0);
        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);
        response.addCookie(refreshTokenCookie);

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }
}
