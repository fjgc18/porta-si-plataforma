package com.portasi.security;

import com.portasi.entity.Usuario;
import com.portasi.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario u = usuarioRepo.findByEmailAndEliminadoEnIsNull(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

        if (!u.getActivo()) throw new UsernameNotFoundException("Usuario inactivo: " + email);

        return new User(
                u.getEmail(),
                u.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + u.getRol().getNombre()))
        );
    }
}
