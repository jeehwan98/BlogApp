package com.jee.back.dto;

import com.jee.back.entity.Role;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
    private int id;
    private String name;
    private String password;
    private String email;
    private Role role;
    private String image;

}
