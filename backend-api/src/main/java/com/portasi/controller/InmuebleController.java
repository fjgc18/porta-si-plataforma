package com.portasi.controller;

import com.portasi.dto.*;
import com.portasi.entity.*;
import com.portasi.repository.*;
import com.portasi.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inmuebles")
@RequiredArgsConstructor
@Tag(name = "Inmuebles")
public class InmuebleController {
    private final InmuebleService inmuebleService;
    private final FileStorageService fileService;
    private final UsuarioRepository usuarioRepo;
    private final TipoInmuebleRepository tipoRepo;
    private final EstadoInmuebleRepository estadoRepo;

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Listar inmuebles con filtros y paginación")
    public ResponseEntity<ApiResponse<PageResponse<InmuebleResponse>>> listar(
            @RequestParam(required = false) String ciudad, @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String estado, @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.ok(inmuebleService.buscar(ciudad, tipo, estado, precioMin, precioMax, page, size)));
    }

    @GetMapping("/catalogo")
    @Operation(summary = "Catálogo público")
    public ResponseEntity<ApiResponse<List<InmuebleResponse>>> catalogo() {
        return ResponseEntity.ok(ApiResponse.ok(inmuebleService.catalogo()));
    }

    @GetMapping("/catalogo/{id}")
    @Operation(summary = "Detalle público de un inmueble")
    public ResponseEntity<ApiResponse<InmuebleResponse>> catalogoDetalle(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(inmuebleService.obtener(id)));
    }

    @GetMapping("/tipos")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<TipoInmueble>>> listarTipos() {
        return ResponseEntity.ok(ApiResponse.ok(tipoRepo.findAll()));
    }

    @GetMapping("/estados")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<EstadoInmueble>>> listarEstados() {
        return ResponseEntity.ok(ApiResponse.ok(estadoRepo.findAll()));
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<InmuebleResponse>> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(inmuebleService.obtener(id)));
    }

    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<InmuebleResponse>> crear(@Valid @RequestBody InmuebleRequest req, @AuthenticationPrincipal UserDetails ud) {
        Long idUsuario = usuarioRepo.findByEmail(ud.getUsername()).orElseThrow().getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Inmueble registrado", inmuebleService.crear(req, idUsuario)));
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<InmuebleResponse>> actualizar(@PathVariable Long id, @Valid @RequestBody InmuebleRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Inmueble actualizado", inmuebleService.actualizar(id, req)));
    }

    @PatchMapping("/{id}/publicar")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<InmuebleResponse>> togglePublicado(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(inmuebleService.togglePublicado(id)));
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        inmuebleService.eliminar(id);
        return ResponseEntity.ok(ApiResponse.ok("Inmueble eliminado", null));
    }

    @PostMapping("/{id}/imagenes")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Subir imagen a inmueble")
    public ResponseEntity<ApiResponse<?>> uploadImagen(@PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean principal) {
        var img = fileService.upload(id, file, principal);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Imagen subida", img.getUrl()));
    }

    @DeleteMapping("/imagenes/{idImagen}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> deleteImagen(@PathVariable Long idImagen) {
        fileService.delete(idImagen);
        return ResponseEntity.ok(ApiResponse.ok("Imagen eliminada", null));
    }
}
