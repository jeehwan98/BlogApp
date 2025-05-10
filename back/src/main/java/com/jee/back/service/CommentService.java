package com.jee.back.service;

import com.jee.back.entity.Blog;
import com.jee.back.entity.Comment;
import com.jee.back.entity.User;
import com.jee.back.repository.BlogRepository;
import com.jee.back.repository.CommentRepository;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class CommentService {
    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final BlogService blogService;
    private final UserService userService;

    public Comment postComment(int blogId, String email, String content, Integer parentCommentId) {
        Blog blog = blogService.getBlogById(blogId);
        User user = userService.getUserByEmail(email);

        Comment comment = new Comment(
                blog,
                user,
                content
        );

        return commentRepository.save(comment);
    }

    public Comment getCommentById(int commentId) {
        Optional<Comment> commentExists = commentRepository.findById(commentId);
        if (commentExists.isEmpty()) {
            log.info("comment doesn't exist");
            return null;
        }
        return commentExists.get();
    }

    public void deleteCommentById(int commentId) {
        commentRepository.deleteById(commentId);
        log.info(getCommentById(commentId));
    }
}
