package com.portasi.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class VentaResponse {
    private Long id;
    private String folio;
    private String inmueble;
    private String tipoInmueble;
    private String cliente;
    private String vendedor;
    private BigDecimal precioFinal;
    private String metodoPago;
    private BigDecimal anticipo;
    private String estadoPago;
    private LocalDate fechaVenta;
    private String estadoVenta;
    private String observaciones;
    private LocalDateTime creadoEn;
}
