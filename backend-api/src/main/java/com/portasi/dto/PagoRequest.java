package com.portasi.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor
public class PagoRequest {
    @NotBlank private String tipoReferencia; // VENTA or RENTA
    private Long idVenta;
    private Long idRenta;
    @NotNull private BigDecimal monto;
    @NotNull private LocalDate fechaPago;
    private String metodoPago;
    private String estado;
    private String concepto;
}
