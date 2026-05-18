package com.portasi.controller;

import com.portasi.dto.*;
import com.portasi.repository.UsuarioRepository;
import com.portasi.service.PagoService;
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
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Pagos")
@SecurityRequirement(name = "bearerAuth")
public class PagoController {
    private final PagoService pagoService;
    private final UsuarioRepository usuarioRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PagoResponse>>> listar() {
        return ResponseEntity.ok(ApiResponse.ok(pagoService.listar()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PagoResponse>> registrar(@Valid @RequestBody PagoRequest req, @AuthenticationPrincipal UserDetails ud) {
        Long idUsuario = usuarioRepo.findByEmail(ud.getUsername()).orElseThrow().getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Pago registrado", pagoService.registrar(req, idUsuario)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PagoResponse>> actualizar(@PathVariable Long id, @Valid @RequestBody PagoRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Pago actualizado", pagoService.actualizar(id, req)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        pagoService.eliminar(id);
        return ResponseEntity.ok(ApiResponse.ok("Pago eliminado", null));
    }
}
