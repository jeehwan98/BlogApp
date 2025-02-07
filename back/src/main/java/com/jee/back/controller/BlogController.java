package com.jee.back.controller;

import com.jee.back.dto.PostBlogDTO;
import com.jee.back.entity.Blog;
import com.jee.back.entity.User;
import com.jee.back.service.BlogService;
import com.jee.back.service.TagsService;
import com.jee.back.service.UserService;
import com.jee.back.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final TagsService tagsService;
    private final UserService userService;

    @PostMapping()
    public ResponseEntity<Map<String, Object>> postBlog(@Valid @RequestBody PostBlogDTO postBlogDTO) {
        String email = SecurityUtil.getAuthenticatedUserEmail();
        User user = userService.getUser(email);
        Blog blog = blogService.saveBlog(postBlogDTO, user);

        return ResponseEntity.ok(Map.of("posted blog", blog));
    }
}
