package com.jee.back.dto;

import com.jee.back.entity.Blog;
import com.jee.back.entity.BlogsLike;
import com.jee.back.entity.User;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogsLikeResponseDTO {
    private Long id;
    private UserResponseDTO userResponseDTO;

    public BlogsLikeResponseDTO(BlogsLike blogsLike) {
        this.id = blogsLike.getId();
        this.userResponseDTO = new UserResponseDTO(blogsLike.getUser());
    }
}
