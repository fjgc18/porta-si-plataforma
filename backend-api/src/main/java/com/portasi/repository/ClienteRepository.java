package com.portasi.repository;

import com.portasi.entity.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findAllByEliminadoEnIsNullOrderByCreadoEnDesc();

    @Query("SELECT c FROM Cliente c WHERE c.eliminadoEn IS NULL " +
           "AND (:q IS NULL OR CONCAT(c.nombre,' ',c.apellidos) LIKE %:q% OR c.email LIKE %:q%)")
    Page<Cliente> buscar(@Param("q") String q, Pageable pageable);

    long countByEliminadoEnIsNull();
}
