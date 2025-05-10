package com.jee.back.dto;

import com.jee.back.entity.Blog;
import com.jee.back.entity.Comment;
import com.jee.back.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDTO {
    private int id;
    private String content;
    private String userName;
    private String userEmail;
    private String userImage;
    private Blog blog;
    private Comment parentComment;
    private List<Comment> replies;
    private LocalDateTime createdAt;

    public CommentResponseDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.userName = comment.getUser().getName();
        this.userEmail = comment.getUser().getEmail();
        this.userImage = comment.getUser().getImage();
        this.replies = comment.getReplies();
        this.createdAt = comment.getCreatedAt();
    }

    public static List<CommentResponseDTO> fromComments(List<Comment> comments) {
        return comments.stream()
                .map(CommentResponseDTO::new)
                .collect(Collectors.toList());
    }
}
