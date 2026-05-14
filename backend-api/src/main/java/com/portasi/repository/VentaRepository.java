package com.portasi.repository;

import com.portasi.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {
    @Query("SELECT v FROM Venta v " +
           "WHERE (:anio IS NULL OR YEAR(v.fechaVenta) = :anio) " +
           "AND (:mes IS NULL OR MONTH(v.fechaVenta) = :mes) " +
           "AND (:idVendedor IS NULL OR v.vendedor.id = :idVendedor) " +
           "ORDER BY v.fechaVenta DESC")
    List<Venta> buscarConFiltros(@Param("anio") Integer anio, @Param("mes") Integer mes,
                                  @Param("idVendedor") Long idVendedor);

    @Query("SELECT YEAR(v.fechaVenta), MONTH(v.fechaVenta), COUNT(v), SUM(v.precioFinal) " +
           "FROM Venta v WHERE v.estadoVenta.nombre = 'Completada' " +
           "GROUP BY YEAR(v.fechaVenta), MONTH(v.fechaVenta) " +
           "ORDER BY YEAR(v.fechaVenta) DESC, MONTH(v.fechaVenta) DESC")
    List<Object[]> ventasPorMes();

    @Query("SELECT COUNT(v) FROM Venta v WHERE v.folio LIKE :prefix%")
    long contarPorAnio(@Param("prefix") String prefix);
}
