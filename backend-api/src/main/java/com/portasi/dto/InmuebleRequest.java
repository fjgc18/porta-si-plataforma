package com.portasi.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Data @NoArgsConstructor @AllArgsConstructor
public class InmuebleRequest {
    @NotBlank private String titulo;
    private String descripcion;
    private String direccion;
    @NotBlank private String ciudad;
    @NotBlank private String estadoGeo;
    @NotNull private Long idTipo;
    @NotNull private Long idEstado;
    @NotNull private BigDecimal precio;
    private BigDecimal metrosCuadrados;
    private Integer habitaciones;
    private Integer banos;
    private Integer estacionamientos;
    private Boolean publicado;
}
