package com.jee.back.dto;

import com.jee.back.entity.Feedback;
import com.jee.back.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private int id;
    private User user;
    private String content;
    private LocalDateTime createdAt;

    public FeedbackDTO(Feedback feedback) {
        this.id = feedback.getId();
        this.user = feedback.getUser();
        this.content = feedback.getContent();
        this.createdAt = feedback.getCreatedAt();
    }
}
