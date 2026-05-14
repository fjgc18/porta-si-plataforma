package com.portasi.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class LoginResponse {
    private String token;
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private String username;
    private String rol;
}
