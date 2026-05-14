package com.portasi.dto;

import lombok.*;
import java.math.BigDecimal;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ResumenDashboard {
    private long totalInmuebles;
    private long disponibles;
    private long reservados;
    private long vendidos;
    private long rentados;
    private long totalClientes;
    private long totalVentas;
    private BigDecimal montoTotalVentas;
    private long rentasActivas;
    private long pagosPendientes;
}
