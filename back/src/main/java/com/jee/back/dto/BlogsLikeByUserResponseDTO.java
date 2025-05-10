package com.jee.back.dto;

import com.jee.back.entity.BlogsLike;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogsLikeByUserResponseDTO {
    private int id;
    private BlogsDTO blogsDTO;

    public BlogsLikeByUserResponseDTO(BlogsLike blogsLike) {
        this.id = blogsLike.getId();
        this.blogsDTO = new BlogsDTO(blogsLike.getBlog());
    }
}
