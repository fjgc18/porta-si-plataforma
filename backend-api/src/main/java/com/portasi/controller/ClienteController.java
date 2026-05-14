package com.portasi.controller;

import com.portasi.dto.*;
import com.portasi.repository.UsuarioRepository;
import com.portasi.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/clientes")
@RequiredArgsConstructor
@Tag(name = "Clientes")
@SecurityRequirement(name = "bearerAuth")
public class ClienteController {
    private final ClienteService clienteService;
    private final UsuarioRepository usuarioRepo;

    @GetMapping
    @Operation(summary = "Listar clientes")
    public ResponseEntity<ApiResponse<List<ClienteResponse>>> listar() {
        return ResponseEntity.ok(ApiResponse.ok(clienteService.listar()));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar clientes con paginación")
    public ResponseEntity<ApiResponse<PageResponse<ClienteResponse>>> buscar(
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.ok(clienteService.buscar(q, page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClienteResponse>> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(clienteService.obtener(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ClienteResponse>> crear(@Valid @RequestBody ClienteRequest req, @AuthenticationPrincipal UserDetails ud) {
        Long idUsuario = usuarioRepo.findByEmail(ud.getUsername()).orElseThrow().getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Cliente registrado", clienteService.crear(req, idUsuario)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ClienteResponse>> actualizar(@PathVariable Long id, @Valid @RequestBody ClienteRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Cliente actualizado", clienteService.actualizar(id, req)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        clienteService.eliminar(id);
        return ResponseEntity.ok(ApiResponse.ok("Cliente eliminado", null));
    }
}
