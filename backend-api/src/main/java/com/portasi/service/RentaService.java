package com.portasi.service;

import com.portasi.dto.*;
import com.portasi.entity.*;
import com.portasi.enums.EstadoContrato;
import com.portasi.exceptions.*;
import com.portasi.repository.*;
import com.portasi.utils.FolioGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RentaService {
    private final RentaRepository rentaRepo;
    private final InmuebleRepository inmuebleRepo;
    private final ClienteRepository clienteRepo;
    private final UsuarioRepository usuarioRepo;
    private final EstadoInmuebleRepository estadoInmuebleRepo;

    public List<RentaResponse> listar() {
        return rentaRepo.findAllByOrderByCreadoEnDesc().stream()
            .map(this::toResponse).collect(Collectors.toList());
    }

    public RentaResponse obtener(Long id) {
        return toResponse(rentaRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Renta", id)));
    }

    @Transactional
    public RentaResponse crear(RentaRequest req, Long idAgente) {
        Inmueble inmueble = inmuebleRepo.findById(req.getIdInmueble())
            .orElseThrow(() -> new ResourceNotFoundException("Inmueble", req.getIdInmueble()));
        if (!"Disponible".equals(inmueble.getEstado().getNombre()))
            throw new BusinessException("El inmueble no está disponible");
        Cliente cliente = clienteRepo.findById(req.getIdCliente())
            .orElseThrow(() -> new ResourceNotFoundException("Cliente", req.getIdCliente()));
        Usuario agente = usuarioRepo.findById(idAgente)
            .orElseThrow(() -> new ResourceNotFoundException("Agente", idAgente));
        String prefix = "RNT-" + java.time.Year.now().getValue();
        String folio = FolioGenerator.generar("RNT", rentaRepo.contarPorAnio(prefix));
        Renta r = Renta.builder().folio(folio).inmueble(inmueble).cliente(cliente)
            .agente(agente).fechaInicio(req.getFechaInicio()).fechaFin(req.getFechaFin())
            .pagoMensual(req.getPagoMensual()).deposito(req.getDeposito())
            .estadoContrato(EstadoContrato.ACTIVO).observaciones(req.getObservaciones()).build();
        rentaRepo.save(r);
        EstadoInmueble rentado = estadoInmuebleRepo.findByNombre("Rentado")
            .orElseThrow(() -> new BusinessException("Estado Rentado no configurado"));
        inmueble.setEstado(rentado);
        inmueble.setPublicado(false);
        inmuebleRepo.save(inmueble);
        return toResponse(r);
    }

    @Transactional
    public RentaResponse actualizar(Long id, RentaRequest req) {
        Renta r = rentaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Renta", id));
        r.setFechaInicio(req.getFechaInicio());
        r.setFechaFin(req.getFechaFin());
        r.setPagoMensual(req.getPagoMensual());
        r.setDeposito(req.getDeposito());
        r.setObservaciones(req.getObservaciones());
        return toResponse(rentaRepo.save(r));
    }

    @Transactional
    public RentaResponse renovar(Long id, RentaRequest req) {
        Renta original = rentaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Renta", id));
        original.setEstadoContrato(EstadoContrato.RENOVADO);
        rentaRepo.save(original);
        return crear(req, original.getAgente().getId());
    }

    @Transactional
    public void eliminar(Long id) {
        Renta r = rentaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Renta", id));
        EstadoInmueble disponible = estadoInmuebleRepo.findByNombre("Disponible")
                .orElseThrow(() -> new BusinessException("Estado Disponible no configurado"));
        r.getInmueble().setEstado(disponible);
        inmuebleRepo.save(r.getInmueble());
        rentaRepo.delete(r);
    }

    private RentaResponse toResponse(Renta r) {
        return RentaResponse.builder()
            .id(r.getId()).folio(r.getFolio())
            .inmueble(r.getInmueble().getTitulo())
            .cliente(r.getCliente().getNombre() + " " + r.getCliente().getApellidos())
            .agente(r.getAgente().getNombre() + " " + r.getAgente().getApellidos())
            .fechaInicio(r.getFechaInicio()).fechaFin(r.getFechaFin())
            .pagoMensual(r.getPagoMensual()).deposito(r.getDeposito())
            .estadoContrato(r.getEstadoContrato().name())
            .observaciones(r.getObservaciones()).creadoEn(r.getCreadoEn()).build();
    }
}
