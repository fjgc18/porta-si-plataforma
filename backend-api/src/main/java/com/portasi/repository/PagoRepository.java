package com.portasi.repository;

import com.portasi.entity.Pago;
import com.portasi.enums.EstadoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findAllByOrderByFechaPagoDesc();
    List<Pago> findByEstado(EstadoPago estado);
    List<Pago> findByVentaId(Long ventaId);
    List<Pago> findByRentaId(Long rentaId);
    long countByEstado(EstadoPago estado);
}
