package com.portasi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.portasi.repository.UsuarioRepository;
import com.portasi.entity.Usuario;

@SpringBootApplication
public class PortaSiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortaSiApplication.class, args);
    }

    @Bean
    CommandLineRunner resetPasswords(UsuarioRepository repo, PasswordEncoder encoder) {
        return args -> {
            for (Usuario u : repo.findAll()) {
                u.setPassword(encoder.encode("123456"));
                repo.save(u);
            }
        };
    }
}
