package com.portasi.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class InmuebleResponse {
    private Long id;
    private String titulo;
    private String descripcion;
    private String direccion;
    private String ciudad;
    private String estadoGeo;
    private String tipo;
    private String estado;
    private BigDecimal precio;
    private BigDecimal metrosCuadrados;
    private Integer habitaciones;
    private Integer banos;
    private Integer estacionamientos;
    private Boolean publicado;
    private String creadoPor;
    private List<ImagenDTO> imagenes;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ImagenDTO {
        private Long id;
        private String url;
        private Boolean principal;
    }
}
