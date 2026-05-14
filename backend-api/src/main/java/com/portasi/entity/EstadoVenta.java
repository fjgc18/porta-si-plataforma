package com.portasi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "estados_venta")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class EstadoVenta {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nombre;
}
