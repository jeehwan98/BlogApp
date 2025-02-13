package com.jee.back.controller;

import com.jee.back.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
@Log4j2
public class Comment {

    private final CommentService commentService;

    @PostMapping("/{blogId}/{userId}")
    public ResponseEntity<Map<String, Object>> postComment(
            @PathVariable int blogId,
            @PathVariable int userId,
            @RequestBody String content,
            @RequestParam(required = false) Integer parentCommentId) {
        return ResponseEntity.ok(Map.of("success", commentService.postComment(blogId,userId, content, parentCommentId)));
    }
}
