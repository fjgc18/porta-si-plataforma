package com.portasi.repository;

import com.portasi.entity.InmuebleImagen;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InmuebleImagenRepository extends JpaRepository<InmuebleImagen, Long> {
    List<InmuebleImagen> findByInmuebleId(Long inmuebleId);
}
