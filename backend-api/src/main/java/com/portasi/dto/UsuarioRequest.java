package com.portasi.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class UsuarioRequest {
    @NotBlank private String nombre;
    @NotBlank private String apellidos;
    @NotBlank @Email private String email;
    @NotBlank private String username;
    private String telefono;
    private String password;
    @NotNull private Long idRol;
}
