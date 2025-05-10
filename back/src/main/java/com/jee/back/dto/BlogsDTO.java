package com.jee.back.dto;

import com.jee.back.entity.Blog;
import com.jee.back.entity.Tags;
import com.jee.back.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogsDTO {
    private int id;
    private String title;
    private Set<String> tags;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserResponseDTO user;
    private int likesCount;
    private boolean isLiked;

    public BlogsDTO(Blog blog) {
        this(blog, null);
    }

    public BlogsDTO(Blog blog, User currentUser) {
        this.id = blog.getId();
        this.title = blog.getTitle();
        this.content = blog.getContent();
        this.createdAt = blog.getCreatedAt();
        this.updatedAt = blog.getUpdatedAt();
        this.user = new UserResponseDTO(blog.getUser());
        this.tags = blog.getTags().stream()
                .map(Tags::getName)
                .collect(Collectors.toSet());
        this.likesCount = blog.getLikeCount();
        this.isLiked = currentUser != null && currentUser.hasLiked(blog);
    }
}