package com.portasi.controller;

import com.portasi.dto.*;
import com.portasi.repository.RolRepository;
import com.portasi.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios")
@SecurityRequirement(name = "bearerAuth")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final RolRepository rolRepo;

    @GetMapping
    @Operation(summary = "Listar usuarios")
    public ResponseEntity<ApiResponse<List<UsuarioResponse>>> listar() {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.listar()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID")
    public ResponseEntity<ApiResponse<UsuarioResponse>> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.obtener(id)));
    }

    @PostMapping
    @Operation(summary = "Crear usuario")
    public ResponseEntity<ApiResponse<UsuarioResponse>> crear(@Valid @RequestBody UsuarioRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Usuario creado", usuarioService.crear(req)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar usuario")
    public ResponseEntity<ApiResponse<UsuarioResponse>> actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Usuario actualizado", usuarioService.actualizar(id, req)));
    }

    @PatchMapping("/{id}/toggle")
    @Operation(summary = "Activar/Desactivar usuario")
    public ResponseEntity<ApiResponse<Void>> toggle(@PathVariable Long id) {
        usuarioService.toggleActivo(id);
        return ResponseEntity.ok(ApiResponse.ok("Estado actualizado", null));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario (soft delete)")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.ok(ApiResponse.ok("Usuario eliminado", null));
    }

    @GetMapping("/roles")
    @Operation(summary = "Listar roles")
    public ResponseEntity<ApiResponse<?>> roles() {
        return ResponseEntity.ok(ApiResponse.ok(rolRepo.findAll()));
    }
}
