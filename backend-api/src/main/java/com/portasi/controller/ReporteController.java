package com.portasi.controller;

import com.portasi.dto.*;
import com.portasi.service.ReporteService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reportes")
@RequiredArgsConstructor
@Tag(name = "Reportes")
@SecurityRequirement(name = "bearerAuth")
public class ReporteController {
    private final ReporteService reporteService;

    @GetMapping("/resumen")
    public ResponseEntity<ApiResponse<ResumenDashboard>> resumen() {
        return ResponseEntity.ok(ApiResponse.ok(reporteService.resumen()));
    }

    @GetMapping("/ventas-por-mes")
    public ResponseEntity<ApiResponse<List<Object[]>>> ventasPorMes() {
        return ResponseEntity.ok(ApiResponse.ok(reporteService.ventasPorMes()));
    }
}
