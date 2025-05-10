package com.jee.back.dto;

import lombok.*;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserImageDTO {
    private String email;
    private String image;
}