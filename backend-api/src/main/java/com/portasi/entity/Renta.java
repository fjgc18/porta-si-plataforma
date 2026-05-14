package com.portasi.entity;

import com.portasi.enums.EstadoContrato;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "rentas")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Renta {
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
    @JoinColumn(name = "id_agente", nullable = false)
    private Usuario agente;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "pago_mensual", nullable = false, precision = 14, scale = 2)
    private BigDecimal pagoMensual;

    @Column(precision = 14, scale = 2)
    private BigDecimal deposito;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_contrato", nullable = false)
    private EstadoContrato estadoContrato = EstadoContrato.ACTIVO;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    @PrePersist  void onCreate() { creadoEn = actualizadoEn = LocalDateTime.now(); }
    @PreUpdate   void onUpdate() { actualizadoEn = LocalDateTime.now(); }
}
