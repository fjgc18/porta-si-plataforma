package com.portasi.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ClienteResponse {
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;
    private String direccion;
    private String rfc;
    private String tipoCliente;
    private String notas;
    private String registradoPor;
    private LocalDateTime creadoEn;
}
