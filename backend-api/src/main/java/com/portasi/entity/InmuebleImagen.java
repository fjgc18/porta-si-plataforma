package com.portasi.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "inmueble_imagenes")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class InmuebleImagen {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_inmueble", nullable = false)
    @ToString.Exclude
    private Inmueble inmueble;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "nombre_archivo", nullable = false, length = 255)
    private String nombreArchivo;

    @Column(nullable = false)
    private Boolean principal = false;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @PrePersist void onCreate() { creadoEn = LocalDateTime.now(); }
}
