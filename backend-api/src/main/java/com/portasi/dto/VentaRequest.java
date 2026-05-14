package com.portasi.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor
public class VentaRequest {
    @NotNull private Long idInmueble;
    @NotNull private Long idCliente;
    @NotNull private BigDecimal precioFinal;
    private String metodoPago;
    private BigDecimal anticipo;
    private String estadoPago;
    @NotNull private LocalDate fechaVenta;
    private String observaciones;
}
