package com.portasi.service;

import com.portasi.dto.*;
import com.portasi.entity.*;
import com.portasi.exceptions.*;
import com.portasi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepo;
    private final RolRepository rolRepo;
    private final PasswordEncoder passwordEncoder;

    public List<UsuarioResponse> listar() {
        return usuarioRepo.findAllByEliminadoEnIsNullOrderByCreadoEnDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public UsuarioResponse obtener(Long id) {
        return toResponse(findOrFail(id));
    }

    @Transactional
    public UsuarioResponse crear(UsuarioRequest req) {
        if (usuarioRepo.existsByEmail(req.getEmail()))
            throw new BusinessException("El email ya está registrado");
        if (usuarioRepo.existsByUsername(req.getUsername()))
            throw new BusinessException("El username ya está en uso");
        Rol rol = rolRepo.findById(req.getIdRol())
                .orElseThrow(() -> new ResourceNotFoundException("Rol", req.getIdRol()));
        Usuario u = Usuario.builder()
                .nombre(req.getNombre()).apellidos(req.getApellidos())
                .email(req.getEmail()).username(req.getUsername())
                .telefono(req.getTelefono())
                .password(passwordEncoder.encode(req.getPassword()))
                .rol(rol).activo(true).build();
        return toResponse(usuarioRepo.save(u));
    }

    @Transactional
    public UsuarioResponse actualizar(Long id, UsuarioRequest req) {
        Usuario u = findOrFail(id);
        u.setNombre(req.getNombre());
        u.setApellidos(req.getApellidos());
        u.setTelefono(req.getTelefono());
        if (req.getPassword() != null && !req.getPassword().isBlank())
            u.setPassword(passwordEncoder.encode(req.getPassword()));
        if (req.getIdRol() != null) {
            Rol rol = rolRepo.findById(req.getIdRol())
                    .orElseThrow(() -> new ResourceNotFoundException("Rol", req.getIdRol()));
            u.setRol(rol);
        }
        return toResponse(usuarioRepo.save(u));
    }

    @Transactional
    public void toggleActivo(Long id) {
        Usuario u = findOrFail(id);
        u.setActivo(!u.getActivo());
        usuarioRepo.save(u);
    }

    @Transactional
    public void eliminar(Long id) {
        Usuario u = findOrFail(id);
        u.setEliminadoEn(LocalDateTime.now());
        u.setActivo(false);
        usuarioRepo.save(u);
    }

    private Usuario findOrFail(Long id) {
        return usuarioRepo.findById(id).filter(u -> u.getEliminadoEn() == null)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", id));
    }

    private UsuarioResponse toResponse(Usuario u) {
        return UsuarioResponse.builder()
                .id(u.getId()).nombre(u.getNombre()).apellidos(u.getApellidos())
                .email(u.getEmail()).username(u.getUsername()).telefono(u.getTelefono())
                .rol(u.getRol().getNombre()).activo(u.getActivo()).creadoEn(u.getCreadoEn()).build();
    }
}
