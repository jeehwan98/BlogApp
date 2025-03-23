package com.jee.back.dto;

import com.jee.back.entity.BlogsLike;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogsLikeFromBlogResponseDTO {
    private int id;
    private UserResponseDTO userResponseDTO;

    public BlogsLikeFromBlogResponseDTO(BlogsLike blogsLike) {
        this.id = blogsLike.getId();
        this.userResponseDTO = new UserResponseDTO(blogsLike.getUser());
    }
}
