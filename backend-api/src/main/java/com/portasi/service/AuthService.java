package com.portasi.service;

import com.portasi.dto.*;
import com.portasi.entity.Usuario;
import com.portasi.repository.UsuarioRepository;
import com.portasi.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authManager;
    private final UsuarioRepository usuarioRepo;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        Usuario u = usuarioRepo.findByEmailAndEliminadoEnIsNull(req.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));
        String token = jwtUtil.generateToken(u.getEmail(), u.getRol().getNombre());
        return LoginResponse.builder()
                .token(token).id(u.getId()).nombre(u.getNombre()).apellidos(u.getApellidos())
                .email(u.getEmail()).username(u.getUsername()).rol(u.getRol().getNombre()).build();
    }
}
