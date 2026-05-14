package com.portasi.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor
public class RentaRequest {
    @NotNull private Long idInmueble;
    @NotNull private Long idCliente;
    @NotNull private LocalDate fechaInicio;
    @NotNull private LocalDate fechaFin;
    @NotNull private BigDecimal pagoMensual;
    private BigDecimal deposito;
    private String observaciones;
}
