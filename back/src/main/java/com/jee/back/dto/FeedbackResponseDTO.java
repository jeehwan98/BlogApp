package com.jee.back.dto;

import com.jee.back.entity.Feedback;
import lombok.*;

import java.time.LocalDateTime;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackInfoDTO {
    private int id;
    private UserResponseDTO user;
    private String content;
    private LocalDateTime createdAt;

    public FeedbackInfoDTO(Feedback feedback) {
        this.id = feedback.getId();
        UserResponseDTO userDTO = new UserResponseDTO(feedback.getUser());
        this.user = userDTO;
        this.content = feedback.getContent();
        this.createdAt = feedback.getCreatedAt();
    }
}
