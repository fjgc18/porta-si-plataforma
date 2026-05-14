package com.portasi.repository;

import com.portasi.entity.Inmueble;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;

public interface InmuebleRepository extends JpaRepository<Inmueble, Long> {

    @Query("SELECT i FROM Inmueble i WHERE i.publicado = true AND i.estado.nombre = 'Disponible' AND i.eliminadoEn IS NULL")
    List<Inmueble> findCatalogoPublico();

    @Query("SELECT i FROM Inmueble i WHERE i.eliminadoEn IS NULL " +
           "AND (:ciudad IS NULL OR i.ciudad LIKE %:ciudad%) " +
           "AND (:tipo IS NULL OR i.tipo.nombre = :tipo) " +
           "AND (:estado IS NULL OR i.estado.nombre = :estado) " +
           "AND (:precioMin IS NULL OR i.precio >= :precioMin) " +
           "AND (:precioMax IS NULL OR i.precio <= :precioMax)")
    Page<Inmueble> buscarConFiltros(
            @Param("ciudad") String ciudad, @Param("tipo") String tipo,
            @Param("estado") String estado, @Param("precioMin") BigDecimal precioMin,
            @Param("precioMax") BigDecimal precioMax, Pageable pageable);

    List<Inmueble> findAllByEliminadoEnIsNullOrderByCreadoEnDesc();
    long countByEstadoNombre(String nombre);
    long countByEliminadoEnIsNull();
}
