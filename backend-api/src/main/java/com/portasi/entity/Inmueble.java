package com.portasi.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity @Table(name = "inmuebles")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Inmueble {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 300)
    private String direccion;

    @Column(nullable = false, length = 100)
    private String ciudad;

    @Column(name = "estado_geo", nullable = false, length = 100)
    private String estadoGeo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipo", nullable = false)
    private TipoInmueble tipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estado", nullable = false)
    private EstadoInmueble estado;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal precio;

    @Column(name = "metros_cuadrados", precision = 10, scale = 2)
    private BigDecimal metrosCuadrados;

    private Integer habitaciones;
    private Integer banos;
    private Integer estacionamientos;

    @Column(nullable = false)
    private Boolean publicado = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creado_por", nullable = false)
    private Usuario creadoPor;

    @OneToMany(mappedBy = "inmueble", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<InmuebleImagen> imagenes;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    @Column(name = "eliminado_en")
    private LocalDateTime eliminadoEn;

    @PrePersist  void onCreate() { creadoEn = actualizadoEn = LocalDateTime.now(); }
    @PreUpdate   void onUpdate() { actualizadoEn = LocalDateTime.now(); }
}
