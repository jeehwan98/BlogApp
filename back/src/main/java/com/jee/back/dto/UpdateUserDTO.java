package com.jee.back.dto;

import com.jee.back.entity.Blog;
import com.jee.back.entity.Role;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDTO {
    private int id;
    private String email;
    private String name;
    private String password;
    private String image;
    private Role role;
    private String provider;
    private List<Blog> blogs;
    private String introduction;
}
