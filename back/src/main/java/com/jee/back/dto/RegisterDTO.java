package com.jee.back.dto;

import com.jee.back.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
    private int id;
    private String username;
    private String password;
    private String email;
    private Role role;

}
