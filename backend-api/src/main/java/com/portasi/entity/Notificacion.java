package com.portasi.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "notificaciones")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Notificacion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String mensaje;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoNotificacion tipo = TipoNotificacion.INFO;

    @Column(nullable = false)
    private Boolean leida = false;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @PrePersist void onCreate() { creadoEn = LocalDateTime.now(); }

    public enum TipoNotificacion { INFO, ALERTA, VENCIMIENTO, SISTEMA }
}
