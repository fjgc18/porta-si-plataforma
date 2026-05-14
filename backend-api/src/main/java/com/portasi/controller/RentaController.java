package com.portasi.controller;

import com.portasi.dto.*;
import com.portasi.repository.UsuarioRepository;
import com.portasi.service.RentaService;
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
@RequestMapping("/api/v1/rentas")
@RequiredArgsConstructor
@Tag(name = "Rentas")
@SecurityRequirement(name = "bearerAuth")
public class RentaController {
    private final RentaService rentaService;
    private final UsuarioRepository usuarioRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RentaResponse>>> listar() {
        return ResponseEntity.ok(ApiResponse.ok(rentaService.listar()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RentaResponse>> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(rentaService.obtener(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RentaResponse>> crear(@Valid @RequestBody RentaRequest req, @AuthenticationPrincipal UserDetails ud) {
        Long idAgente = usuarioRepo.findByEmail(ud.getUsername()).orElseThrow().getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Renta registrada", rentaService.crear(req, idAgente)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RentaResponse>> actualizar(@PathVariable Long id, @Valid @RequestBody RentaRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Renta actualizada", rentaService.actualizar(id, req)));
    }

    @PatchMapping("/{id}/renovar")
    public ResponseEntity<ApiResponse<RentaResponse>> renovar(@PathVariable Long id, @Valid @RequestBody RentaRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Contrato renovado", rentaService.renovar(id, req)));
    }
}
