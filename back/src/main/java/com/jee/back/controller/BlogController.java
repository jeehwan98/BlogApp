package com.jee.back.controller;

import com.jee.back.dto.BlogsDTO;
import com.jee.back.dto.PostBlogDTO;
import com.jee.back.entity.Blog;
import com.jee.back.entity.User;
import com.jee.back.service.BlogService;
import com.jee.back.service.TagsService;
import com.jee.back.service.UserService;
import com.jee.back.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping()
    public ResponseEntity<Map<String, Object>> postBlog(@Valid @RequestBody PostBlogDTO postBlogDTO) {
        String email = SecurityUtil.getAuthenticatedUserEmail();
        User user = userService.getUser(email);
        Blog blog = blogService.saveBlog(postBlogDTO, user);

        return ResponseEntity.ok(Map.of("posted blog", blog));
    }

    public List<BlogsDTO> getBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        List<BlogsDTO> blogDTOs = blogs.stream().map(BlogsDTO::new).collect(Collectors.toList());
        return blogDTOs;
    }

    @GetMapping()
    public ResponseEntity<List<BlogsDTO>> getAllBlogs() {
        List<BlogsDTO> blogDTOs = getBlogs();
        return ResponseEntity.ok(blogDTOs);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<BlogsDTO>> getUserBlogs(@PathVariable String email) {
        log.info("in fetch blog by user");
        List<BlogsDTO> blogsDTO = blogService.getBlogsByUser(email);
        log.info("user blogs?: {}", blogsDTO);
        return ResponseEntity.ok(blogsDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogsDTO> getBlogById(@PathVariable int id) {
        Blog blog = blogService.getBlogById(id);
        BlogsDTO blogsDTO = modelMapper.map(blog, BlogsDTO.class);
        return ResponseEntity.ok(blogsDTO);
    }
}
