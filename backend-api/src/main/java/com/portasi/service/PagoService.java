package com.portasi.service;

import com.portasi.dto.*;
import com.portasi.entity.*;
import com.portasi.enums.*;
import com.portasi.exceptions.*;
import com.portasi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PagoService {
    private final PagoRepository pagoRepo;
    private final VentaRepository ventaRepo;
    private final RentaRepository rentaRepo;
    private final UsuarioRepository usuarioRepo;

    public List<PagoResponse> listar() {
        return pagoRepo.findAllByOrderByFechaPagoDesc().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public PagoResponse registrar(PagoRequest req, Long idUsuario) {
        Usuario user = usuarioRepo.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));
        Pago.PagoBuilder b = Pago.builder()
                .tipoReferencia(Pago.TipoReferencia.valueOf(req.getTipoReferencia()))
                .monto(req.getMonto()).fechaPago(req.getFechaPago())
                .metodoPago(req.getMetodoPago() != null ? MetodoPagoSimple.valueOf(req.getMetodoPago()) : MetodoPagoSimple.EFECTIVO)
                .estado(req.getEstado() != null ? EstadoPago.valueOf(req.getEstado()) : EstadoPago.PAGADO)
                .concepto(req.getConcepto()).registradoPor(user);
        if (req.getIdVenta() != null) b.venta(ventaRepo.findById(req.getIdVenta()).orElse(null));
        if (req.getIdRenta() != null) b.renta(rentaRepo.findById(req.getIdRenta()).orElse(null));
        return toResponse(pagoRepo.save(b.build()));
    }

    @Transactional
    public PagoResponse actualizar(Long id, PagoRequest req) {
        Pago p = pagoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pago", id));
        p.setTipoReferencia(Pago.TipoReferencia.valueOf(req.getTipoReferencia()));
        p.setMonto(req.getMonto());
        p.setFechaPago(req.getFechaPago());
        p.setMetodoPago(req.getMetodoPago() != null ? MetodoPagoSimple.valueOf(req.getMetodoPago()) : p.getMetodoPago());
        p.setEstado(req.getEstado() != null ? EstadoPago.valueOf(req.getEstado()) : p.getEstado());
        p.setConcepto(req.getConcepto());
        if (req.getIdVenta() != null) p.setVenta(ventaRepo.findById(req.getIdVenta()).orElse(null));
        if (req.getIdRenta() != null) p.setRenta(rentaRepo.findById(req.getIdRenta()).orElse(null));
        return toResponse(pagoRepo.save(p));
    }

    @Transactional
    public void eliminar(Long id) {
        Pago p = pagoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pago", id));
        pagoRepo.delete(p);
    }

    private PagoResponse toResponse(Pago p) {
        String folioRef = p.getVenta() != null ? p.getVenta().getFolio() : (p.getRenta() != null ? p.getRenta().getFolio() : "N/A");
        String inmueble = p.getVenta() != null ? p.getVenta().getInmueble().getTitulo() : (p.getRenta() != null ? p.getRenta().getInmueble().getTitulo() : "N/A");
        String cliente = p.getVenta() != null ? p.getVenta().getCliente().getNombre() : (p.getRenta() != null ? p.getRenta().getCliente().getNombre() : "N/A");
        return PagoResponse.builder()
                .id(p.getId()).tipoReferencia(p.getTipoReferencia().name()).folioReferencia(folioRef)
                .inmueble(inmueble).cliente(cliente).monto(p.getMonto()).fechaPago(p.getFechaPago())
                .metodoPago(p.getMetodoPago().name()).estado(p.getEstado().name())
                .concepto(p.getConcepto())
                .registradoPor(p.getRegistradoPor().getNombre() + " " + p.getRegistradoPor().getApellidos())
                .creadoEn(p.getCreadoEn()).build();
    }
}
