package com.portasi.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class PagoResponse {
    private Long id;
    private String tipoReferencia;
    private String folioReferencia;
    private String inmueble;
    private String cliente;
    private BigDecimal monto;
    private LocalDate fechaPago;
    private String metodoPago;
    private String estado;
    private String concepto;
    private String registradoPor;
    private LocalDateTime creadoEn;
}
