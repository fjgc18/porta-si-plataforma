package com.portasi.repository;

import com.portasi.entity.Renta;
import com.portasi.enums.EstadoContrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface RentaRepository extends JpaRepository<Renta, Long> {
    List<Renta> findAllByOrderByCreadoEnDesc();
    List<Renta> findByEstadoContrato(EstadoContrato estado);
    long countByEstadoContrato(EstadoContrato estado);

    @Query("SELECT r FROM Renta r WHERE r.estadoContrato = 'ACTIVO' AND r.fechaFin <= :fecha")
    List<Renta> findContratosProximosAVencer(@Param("fecha") LocalDate fecha);

    @Query("SELECT COUNT(r) FROM Renta r WHERE r.folio LIKE :prefix%")
    long contarPorAnio(@Param("prefix") String prefix);
}
