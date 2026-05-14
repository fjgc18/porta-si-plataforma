package com.portasi.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UsuarioResponse {
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private String username;
    private String telefono;
    private String rol;
    private Boolean activo;
    private LocalDateTime creadoEn;
}
