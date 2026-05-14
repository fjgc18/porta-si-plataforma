package com.portasi.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity @Table(name = "roles")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Rol {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nombre;

    @Column(length = 200)
    private String descripcion;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    @PrePersist  void onCreate() { creadoEn = actualizadoEn = LocalDateTime.now(); }
    @PreUpdate   void onUpdate() { actualizadoEn = LocalDateTime.now(); }
}
