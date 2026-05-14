package com.portasi.entity;

import com.portasi.enums.MetodoPago;
import com.portasi.enums.EstadoPago;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "ventas")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Venta {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String folio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_inmueble", nullable = false)
    private Inmueble inmueble;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vendedor", nullable = false)
    private Usuario vendedor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estado_venta", nullable = false)
    private EstadoVenta estadoVenta;

    @Column(name = "precio_final", nullable = false, precision = 14, scale = 2)
    private BigDecimal precioFinal;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pago", nullable = false)
    private MetodoPago metodoPago = MetodoPago.CONTADO;

    @Column(precision = 14, scale = 2)
    private BigDecimal anticipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pago", nullable = false)
    private EstadoPago estadoPago = EstadoPago.PENDIENTE;

    @Column(name = "fecha_venta", nullable = false)
    private LocalDate fechaVenta;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    @PrePersist  void onCreate() { creadoEn = actualizadoEn = LocalDateTime.now(); }
    @PreUpdate   void onUpdate() { actualizadoEn = LocalDateTime.now(); }
}
