package com.jee.back.controller;

import com.jee.back.dto.BlogsDTO;
import com.jee.back.dto.PostBlogDTO;
import com.jee.back.entity.Blog;
import com.jee.back.entity.User;
import com.jee.back.repository.BlogsLikeRepository;
import com.jee.back.repository.TagsRepository;
import com.jee.back.service.BlogService;
import com.jee.back.service.TagsService;
import com.jee.back.service.UserService;
import com.jee.back.util.CookieUtil;
import com.jee.back.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("api/v1/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final TagsService tagsService;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final BlogsLikeRepository blogsLikeRepository;
    private final CookieUtil cookieUtil;
    private final TagsRepository tagsRepository;

    Map<String, Object> responseMap = new HashMap<>();

    @PostMapping()
    public ResponseEntity<Map<String, Object>> postBlog(@Valid @RequestBody PostBlogDTO postBlogDTO) {
        String email = SecurityUtil.getAuthenticatedUserEmail();
        log.info("logged in user's email: {}", email);
        User user = userService.getUserByEmail(email);
        Blog blog = blogService.saveBlog(postBlogDTO, user);

        return ResponseEntity.ok(Map.of("posted blog", blog));
    }

    @GetMapping()
    public ResponseEntity<List<BlogsDTO>> getAllBlogs() {
        String email = null;
        try {
            email = SecurityUtil.getAuthenticatedUserEmail();
        } catch (Exception e) {
            log.info("error occurred: {}", e);
        }
        User currentUser = email != null ? userService.getUserByEmail(email) : null;
        List<BlogsDTO> blogDTOs = blogService.getBlogs(currentUser);
        return ResponseEntity.ok(blogDTOs);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<BlogsDTO>> getUserBlogs(@PathVariable String email) {
        return ResponseEntity.ok(blogService.getBlogsByUser(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogsDTO> getBlogById(@PathVariable int id) {
        Blog blog = blogService.getBlogById(id);
        return ResponseEntity.ok(new BlogsDTO(blog));
    }

    @GetMapping("/tag/{tagName}")
    public ResponseEntity<Map<String, Object>> getBlogsByTag(
            @PathVariable String tagName
    ) {

        try {
            List<Blog> blogPage = tagsService.findByTagName(tagName);
            List<BlogsDTO> blogDTOs = blogPage.stream()
                    .map(blog -> new BlogsDTO(blog, null))
                    .collect(Collectors.toList());
            responseMap.put("success", true);
            responseMap.put("data", blogDTOs);
            responseMap.put("count", blogDTOs.size());
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            log.error("Error fetching blogs by tag", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Server error"));
        }
    }
}
