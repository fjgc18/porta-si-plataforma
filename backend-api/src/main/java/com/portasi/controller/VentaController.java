package com.portasi.controller;

import com.portasi.dto.*;
import com.portasi.repository.UsuarioRepository;
import com.portasi.service.VentaService;
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
@RequestMapping("/api/v1/ventas")
@RequiredArgsConstructor
@Tag(name = "Ventas")
@SecurityRequirement(name = "bearerAuth")
public class VentaController {
    private final VentaService ventaService;
    private final UsuarioRepository usuarioRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<VentaResponse>>> listar(
            @RequestParam(required = false) Integer anio,
            @RequestParam(required = false) Integer mes,
            @RequestParam(required = false) Long vendedor) {
        return ResponseEntity.ok(ApiResponse.ok(ventaService.listar(anio, mes, vendedor)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VentaResponse>> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(ventaService.obtener(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<VentaResponse>> registrar(@Valid @RequestBody VentaRequest req, @AuthenticationPrincipal UserDetails ud) {
        Long idVendedor = usuarioRepo.findByEmail(ud.getUsername()).orElseThrow().getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Venta registrada", ventaService.registrar(req, idVendedor)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<VentaResponse>> actualizar(@PathVariable Long id, @Valid @RequestBody VentaRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Venta actualizada", ventaService.actualizar(id, req)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        ventaService.eliminar(id);
        return ResponseEntity.ok(ApiResponse.ok("Venta eliminada", null));
    }
}
