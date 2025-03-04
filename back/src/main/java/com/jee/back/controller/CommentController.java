package com.jee.back.controller;

import com.jee.back.dto.CommentResponseDTO;
import com.jee.back.entity.Blog;
import com.jee.back.entity.Comment;
import com.jee.back.service.BlogService;
import com.jee.back.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
@Log4j2
public class CommentController {

    private final CommentService commentService;
    private final BlogService blogService;

    @PostMapping("/{blogId}")
    public ResponseEntity<Map<String, Object>> postComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable int blogId,
            @RequestBody String comment,
            @RequestParam(required = false) Integer parentCommentId) {
        String email = userDetails.getUsername();
        Comment postedComment = commentService.postComment(blogId, email, comment,parentCommentId);
        return ResponseEntity.ok(Map.of("success", postedComment));
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<List<CommentResponseDTO>> fetchComment(@PathVariable int blogId) {
        Blog blogDetails = blogService.getBlogById(blogId);
        List<Comment> comments = blogDetails.getComments();
        List<CommentResponseDTO> commentResponseDTOS = CommentResponseDTO.fromComments(comments);
        return ResponseEntity.ok(commentResponseDTOS);
    }
}
