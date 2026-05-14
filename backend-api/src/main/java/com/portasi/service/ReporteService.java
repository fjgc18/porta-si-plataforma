package com.portasi.service;

import com.portasi.dto.ResumenDashboard;
import com.portasi.enums.EstadoContrato;
import com.portasi.enums.EstadoPago;
import com.portasi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReporteService {
    private final InmuebleRepository inmuebleRepo;
    private final ClienteRepository clienteRepo;
    private final VentaRepository ventaRepo;
    private final RentaRepository rentaRepo;
    private final PagoRepository pagoRepo;

    public ResumenDashboard resumen() {
        BigDecimal totalVentas = ventaRepo.findAll().stream()
                .map(v -> v.getPrecioFinal()).reduce(BigDecimal.ZERO, BigDecimal::add);
        return ResumenDashboard.builder()
                .totalInmuebles(inmuebleRepo.countByEliminadoEnIsNull())
                .disponibles(inmuebleRepo.countByEstadoNombre("Disponible"))
                .reservados(inmuebleRepo.countByEstadoNombre("Reservado"))
                .vendidos(inmuebleRepo.countByEstadoNombre("Vendido"))
                .rentados(inmuebleRepo.countByEstadoNombre("Rentado"))
                .totalClientes(clienteRepo.countByEliminadoEnIsNull())
                .totalVentas(ventaRepo.count())
                .montoTotalVentas(totalVentas)
                .rentasActivas(rentaRepo.countByEstadoContrato(EstadoContrato.ACTIVO))
                .pagosPendientes(pagoRepo.countByEstado(EstadoPago.PENDIENTE))
                .build();
    }

    public List<Object[]> ventasPorMes() { return ventaRepo.ventasPorMes(); }
}
