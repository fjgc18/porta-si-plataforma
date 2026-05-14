package com.portasi.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class ClienteRequest {
    @NotBlank private String nombre;
    @NotBlank private String apellidos;
    private String email;
    private String telefono;
    private String direccion;
    private String rfc;
    private String tipoCliente;
    private String notas;
}
