package com.jee.back.controller;

import com.jee.back.dto.BlogsLikeByUserResponseDTO;
import com.jee.back.dto.BlogsLikeFromBlogResponseDTO;
import com.jee.back.entity.Blog;
import com.jee.back.entity.BlogsLike;
import com.jee.back.entity.User;
import com.jee.back.repository.BlogsLikeRepository;
import com.jee.back.service.BlogService;
import com.jee.back.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("api/v1/like")
@RequiredArgsConstructor
public class LikeController {

    private final BlogService blogService;
    private final UserService userService;
    private final BlogsLikeRepository blogsLikeRepository;
    Map<String, Object> responseMap = new HashMap<>();

    public Blog getBlogById(int id) {
        return blogService.getBlogById(id);
    }

    public User getUserByEmail(String email) {
        return userService.getUserByEmail(email);
    }

    /**
     * 1. get all like from a specific blog ✔✔✔✔✔
     * 2. get all likes by a specific user ✔✔✔✔✔
     * 3. add like to a blog ✔✔✔✔✔
     * 4. remove like from a blog ＸＸＸＸＸ
     * */

    @GetMapping("/blog/{id}")
    public ResponseEntity<Map<String, Object>> getAllBlogsLikeByBlog(@PathVariable int id) {
        try {
            List<BlogsLike> gotBlogsLikes = blogService.getBlogsLikeById(id);
            List<BlogsLikeFromBlogResponseDTO> responseBlogsDTOs = gotBlogsLikes.stream()
                    .map(BlogsLikeFromBlogResponseDTO::new)
                    .collect(Collectors.toList());
            responseMap.put("success", true);
            responseMap.put("data", responseBlogsDTOs);
            return ResponseEntity.ok(responseMap);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            log.error("Error fetching blog likes", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Server error"));
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<Map<String, Object>> getAllBlogsLikeByUser(@PathVariable String email) {
        log.info("users liked blogs method!");
        try {
            List<BlogsLike> gotBlogsLikes = blogService.getBlogsLikeFromUser(email);
            List<BlogsLikeByUserResponseDTO> responseBlogsDTOs = gotBlogsLikes.stream()
                    .map(BlogsLikeByUserResponseDTO::new)
                    .collect(Collectors.toList());
            responseMap.put("success", true);
            responseMap.put("data", responseBlogsDTOs);
            responseMap.put("likedBlogsCount", responseBlogsDTOs.size());
            return ResponseEntity.ok(responseMap);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            log.error("Error fetching blog likes", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Server error"));
        }
    }

    @PostMapping("/{id}/{email}")
    public ResponseEntity<Map<String, Object>> addBlogLike(
            @Valid @PathVariable int id,
            @PathVariable String email
    ) {

        log.info("Adding like for blog {} by user {}", id, email);
        try {
            Blog blog = getBlogById(id);
            User user = getUserByEmail(email);

            if (user.hasLiked(blog)) {
                responseMap.put("success", false);
                responseMap.put("message", "Blog already liked by user");
                return ResponseEntity.badRequest().body(responseMap);
            };

            BlogsLike blogsLike = new BlogsLike(blog, user);
            blogService.saveBlogsLike(blogsLike);

            long countByBlog = blogsLikeRepository.countByBlog(blog);
            long countByUser = blogsLikeRepository.countByUser(user);
            log.info("count by user?: {}", countByUser);
            log.info("count by blog?: {}", countByBlog);

            responseMap.put("success", true);
            responseMap.put("message", "Blog is liked");
            responseMap.put("likes", blog.getLikeCount());
            responseMap.put("isLiked", true);
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            responseMap.put("success", false);
            responseMap.put("message", "Error adding like");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }
    }

    @DeleteMapping("/{id}/{email}")
    public ResponseEntity<Map<String, Object>> removeBlogLike(
            @Valid @PathVariable int id,
            @PathVariable String email
    ) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            Blog blog = getBlogById(id);
            User user = getUserByEmail(email);

            if (!user.hasLiked(blog)) {
                responseMap.put("success", false);
                responseMap.put("message", "Blog is not liked by the user");
                return ResponseEntity.badRequest().body(responseMap);
            }

            BlogsLike blogsLike = blogsLikeRepository.findByBlogAndUser(blog, user)
                    .orElseThrow(() -> new IllegalArgumentException("Like not found"));

            log.info("found blogslike?: {}", blogsLike);

            blogService.deleteBlogLike(blog, user);

            long countByBlog = blogsLikeRepository.countByBlog(blog);
            long countByUser = blogsLikeRepository.countByUser(user);
            log.info("count by user?: {}", countByUser);
            log.info("count by blog?: {}", countByBlog);

            responseMap.put("success", true);
            responseMap.put("message", "Like has been removed");
            responseMap.put("likes", countByBlog);
            responseMap.put("isLiked", false); // Should be false since the like is removed
            return ResponseEntity.ok(responseMap);
        } catch (IllegalArgumentException e) {
            responseMap.put("success", false);
            responseMap.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        } catch (Exception e) {
            log.error("Error removing like for blog {} by user {}", id, email, e);
            responseMap.put("success", false);
            responseMap.put("message", "Error removing like: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap);
        }
    }
}
