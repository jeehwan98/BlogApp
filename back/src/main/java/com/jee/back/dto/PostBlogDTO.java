package com.jee.back.dto;

import com.jee.back.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostBlogDTO {
    private int id;
    private String title;
    private List<String> tags;
    private String content;
    private User user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
