package com.portasi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "tipos_inmueble")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TipoInmueble {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 80)
    private String nombre;
}
