package com.jee.back.service;

import com.jee.back.entity.Blog;
import com.jee.back.entity.Comment;
import com.jee.back.entity.User;
import com.jee.back.repository.BlogRepository;
import com.jee.back.repository.CommentRepository;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

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
}
