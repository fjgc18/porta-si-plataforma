package com.portasi.repository;

import com.portasi.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmailAndEliminadoEnIsNull(String email);
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByUsername(String username);
    List<Usuario> findAllByEliminadoEnIsNullOrderByCreadoEnDesc();
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
