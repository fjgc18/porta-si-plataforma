package com.portasi.service;

import com.portasi.dto.*;
import com.portasi.entity.*;
import com.portasi.exceptions.*;
import com.portasi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InmuebleService {
    private final InmuebleRepository inmuebleRepo;
    private final TipoInmuebleRepository tipoRepo;
    private final EstadoInmuebleRepository estadoRepo;
    private final UsuarioRepository usuarioRepo;

    public List<InmuebleResponse> listar() {
        return inmuebleRepo.findAllByEliminadoEnIsNullOrderByCreadoEnDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public PageResponse<InmuebleResponse> buscar(String ciudad, String tipo, String estado,
                                                   BigDecimal precioMin, BigDecimal precioMax, int page, int size) {
        Page<Inmueble> p = inmuebleRepo.buscarConFiltros(ciudad, tipo, estado, precioMin, precioMax,
                PageRequest.of(page, size, Sort.by("creadoEn").descending()));
        return PageResponse.<InmuebleResponse>builder()
                .content(p.getContent().stream().map(this::toResponse).collect(Collectors.toList()))
                .totalElements(p.getTotalElements()).totalPages(p.getTotalPages())
                .currentPage(p.getNumber()).pageSize(p.getSize()).build();
    }

    public List<InmuebleResponse> catalogo() {
        return inmuebleRepo.findCatalogoPublico().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public InmuebleResponse obtener(Long id) {
        return toResponse(findOrFail(id));
    }

    @Transactional
    public InmuebleResponse crear(InmuebleRequest req, Long idUsuario) {
        TipoInmueble tipo = tipoRepo.findById(req.getIdTipo())
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de inmueble", req.getIdTipo()));
        EstadoInmueble estado = estadoRepo.findById(req.getIdEstado())
                .orElseThrow(() -> new ResourceNotFoundException("Estado de inmueble", req.getIdEstado()));
        Usuario usuario = usuarioRepo.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));
        Inmueble i = Inmueble.builder()
                .titulo(req.getTitulo()).descripcion(req.getDescripcion())
                .direccion(req.getDireccion()).ciudad(req.getCiudad()).estadoGeo(req.getEstadoGeo())
                .tipo(tipo).estado(estado).precio(req.getPrecio())
                .metrosCuadrados(req.getMetrosCuadrados()).habitaciones(req.getHabitaciones())
                .banos(req.getBanos()).estacionamientos(req.getEstacionamientos())
                .publicado(req.getPublicado() != null && req.getPublicado())
                .creadoPor(usuario).build();
        return toResponse(inmuebleRepo.save(i));
    }

    @Transactional
    public InmuebleResponse actualizar(Long id, InmuebleRequest req) {
        Inmueble i = findOrFail(id);
        TipoInmueble tipo = tipoRepo.findById(req.getIdTipo())
                .orElseThrow(() -> new ResourceNotFoundException("Tipo", req.getIdTipo()));
        EstadoInmueble estado = estadoRepo.findById(req.getIdEstado())
                .orElseThrow(() -> new ResourceNotFoundException("Estado", req.getIdEstado()));
        i.setTitulo(req.getTitulo()); i.setDescripcion(req.getDescripcion());
        i.setDireccion(req.getDireccion()); i.setCiudad(req.getCiudad()); i.setEstadoGeo(req.getEstadoGeo());
        i.setTipo(tipo); i.setEstado(estado); i.setPrecio(req.getPrecio());
        i.setMetrosCuadrados(req.getMetrosCuadrados()); i.setHabitaciones(req.getHabitaciones());
        i.setBanos(req.getBanos()); i.setEstacionamientos(req.getEstacionamientos());
        if (req.getPublicado() != null) i.setPublicado(req.getPublicado());
        return toResponse(inmuebleRepo.save(i));
    }

    @Transactional
    public InmuebleResponse togglePublicado(Long id) {
        Inmueble i = findOrFail(id);
        i.setPublicado(!i.getPublicado());
        return toResponse(inmuebleRepo.save(i));
    }

    @Transactional
    public void eliminar(Long id) {
        Inmueble i = findOrFail(id);
        i.setEliminadoEn(LocalDateTime.now());
        i.setPublicado(false);
        inmuebleRepo.save(i);
    }

    private Inmueble findOrFail(Long id) {
        return inmuebleRepo.findById(id).filter(i -> i.getEliminadoEn() == null)
                .orElseThrow(() -> new ResourceNotFoundException("Inmueble", id));
    }

    private InmuebleResponse toResponse(Inmueble i) {
        List<InmuebleResponse.ImagenDTO> imgs = i.getImagenes() != null
                ? i.getImagenes().stream().map(img -> InmuebleResponse.ImagenDTO.builder()
                    .id(img.getId()).url(img.getUrl()).principal(img.getPrincipal()).build())
                    .collect(Collectors.toList())
                : Collections.emptyList();
        return InmuebleResponse.builder()
                .id(i.getId()).titulo(i.getTitulo()).descripcion(i.getDescripcion())
                .direccion(i.getDireccion()).ciudad(i.getCiudad()).estadoGeo(i.getEstadoGeo())
                .tipo(i.getTipo().getNombre()).estado(i.getEstado().getNombre())
                .precio(i.getPrecio()).metrosCuadrados(i.getMetrosCuadrados())
                .habitaciones(i.getHabitaciones()).banos(i.getBanos())
                .estacionamientos(i.getEstacionamientos()).publicado(i.getPublicado())
                .creadoPor(i.getCreadoPor().getNombre() + " " + i.getCreadoPor().getApellidos())
                .imagenes(imgs).creadoEn(i.getCreadoEn()).actualizadoEn(i.getActualizadoEn()).build();
    }
}
