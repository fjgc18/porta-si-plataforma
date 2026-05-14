package com.portasi.repository;

import com.portasi.entity.EstadoInmueble;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EstadoInmuebleRepository extends JpaRepository<EstadoInmueble, Long> {
    Optional<EstadoInmueble> findByNombre(String nombre);
}
