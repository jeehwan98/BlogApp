package com.jee.back.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import com.jee.back.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private static String SECRET_KEY;
  public static final long ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;      // 1 hour
  public static final long REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 1000; // 7 days

  @Value("${jwt.secret-key}")
  private String secretKey;
  @PostConstruct
  public void init() {
    SECRET_KEY = secretKey;
  }

  public static String generateAccessToken(String email) {
    return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
  }

  public static String generateRefreshToken() {
    return UUID.randomUUID().toString();
  }

  public String extractEmail(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("name", user.getName());
    claims.put("image", user.getImage());
    claims.put("role", user.getRole());
    claims.put("email", user.getEmail());
    return createToken(claims, user.getEmail());
  }

  private String createToken(Map<String, Object> claims, String email) {
    return Jwts
        .builder()
        .setClaims(claims)
        .setSubject(email)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
  }

  public Boolean validateToken(String token, UserDetails userDetails) {
    final String extractedEmail = extractEmail(token);
    return (extractedEmail.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }
}
