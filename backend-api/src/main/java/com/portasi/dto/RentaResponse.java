package com.portasi.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class RentaResponse {
    private Long id;
    private String folio;
    private String inmueble;
    private String cliente;
    private String agente;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private BigDecimal pagoMensual;
    private BigDecimal deposito;
    private String estadoContrato;
    private String observaciones;
    private LocalDateTime creadoEn;
}
