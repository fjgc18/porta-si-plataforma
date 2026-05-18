package com.portasi.service;

import com.portasi.dto.*;
import com.portasi.entity.*;
import com.portasi.enums.*;
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
public class VentaService {
    private final VentaRepository ventaRepo;
    private final InmuebleRepository inmuebleRepo;
    private final ClienteRepository clienteRepo;
    private final UsuarioRepository usuarioRepo;
    private final EstadoVentaRepository estadoVentaRepo;
    private final EstadoInmuebleRepository estadoInmuebleRepo;

    public List<VentaResponse> listar(Integer anio, Integer mes, Long idVendedor) {
        return ventaRepo.buscarConFiltros(anio, mes, idVendedor).stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    public VentaResponse obtener(Long id) {
        return toResponse(ventaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Venta", id)));
    }

    @Transactional
    public VentaResponse registrar(VentaRequest req, Long idVendedor) {
        Inmueble inmueble = inmuebleRepo.findById(req.getIdInmueble())
                .orElseThrow(() -> new ResourceNotFoundException("Inmueble", req.getIdInmueble()));
        if (!"Disponible".equals(inmueble.getEstado().getNombre()))
            throw new BusinessException("El inmueble no está disponible para la venta");
        Cliente cliente = clienteRepo.findById(req.getIdCliente())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", req.getIdCliente()));
        Usuario vendedor = usuarioRepo.findById(idVendedor)
                .orElseThrow(() -> new ResourceNotFoundException("Vendedor", idVendedor));
        EstadoVenta estadoCompletada = estadoVentaRepo.findByNombre("Completada")
                .orElseThrow(() -> new BusinessException("Estado de venta no configurado"));

        String prefix = "VTA-" + java.time.Year.now().getValue();
        String folio = FolioGenerator.generar("VTA", ventaRepo.contarPorAnio(prefix));

        Venta v = Venta.builder()
                .folio(folio).inmueble(inmueble).cliente(cliente).vendedor(vendedor)
                .estadoVenta(estadoCompletada).precioFinal(req.getPrecioFinal())
                .metodoPago(req.getMetodoPago() != null ? MetodoPago.valueOf(req.getMetodoPago()) : MetodoPago.CONTADO)
                .anticipo(req.getAnticipo())
                .estadoPago(req.getEstadoPago() != null ? EstadoPago.valueOf(req.getEstadoPago()) : EstadoPago.PENDIENTE)
                .fechaVenta(req.getFechaVenta()).observaciones(req.getObservaciones()).build();
        ventaRepo.save(v);

        // Cambiar estado del inmueble a Vendido
        EstadoInmueble vendido = estadoInmuebleRepo.findByNombre("Vendido")
                .orElseThrow(() -> new BusinessException("Estado Vendido no configurado"));
        inmueble.setEstado(vendido);
        inmueble.setPublicado(false);
        inmuebleRepo.save(inmueble);

        return toResponse(v);
    }

    @Transactional
    public VentaResponse actualizar(Long id, VentaRequest req) {
        Venta v = ventaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Venta", id));
        v.setPrecioFinal(req.getPrecioFinal());
        v.setMetodoPago(req.getMetodoPago() != null ? MetodoPago.valueOf(req.getMetodoPago()) : v.getMetodoPago());
        v.setAnticipo(req.getAnticipo());
        v.setEstadoPago(req.getEstadoPago() != null ? EstadoPago.valueOf(req.getEstadoPago()) : v.getEstadoPago());
        v.setFechaVenta(req.getFechaVenta());
        v.setObservaciones(req.getObservaciones());
        return toResponse(ventaRepo.save(v));
    }

    @Transactional
    public void eliminar(Long id) {
        Venta v = ventaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Venta", id));
        // Restaurar inmueble a Disponible
        EstadoInmueble disponible = estadoInmuebleRepo.findByNombre("Disponible")
                .orElseThrow(() -> new BusinessException("Estado Disponible no configurado"));
        v.getInmueble().setEstado(disponible);
        inmuebleRepo.save(v.getInmueble());
        ventaRepo.delete(v);
    }

    private VentaResponse toResponse(Venta v) {
        return VentaResponse.builder()
                .id(v.getId()).folio(v.getFolio())
                .inmueble(v.getInmueble().getTitulo())
                .tipoInmueble(v.getInmueble().getTipo().getNombre())
                .cliente(v.getCliente().getNombre() + " " + v.getCliente().getApellidos())
                .vendedor(v.getVendedor().getNombre() + " " + v.getVendedor().getApellidos())
                .precioFinal(v.getPrecioFinal()).metodoPago(v.getMetodoPago().name())
                .anticipo(v.getAnticipo()).estadoPago(v.getEstadoPago().name())
                .fechaVenta(v.getFechaVenta()).estadoVenta(v.getEstadoVenta().getNombre())
                .observaciones(v.getObservaciones()).creadoEn(v.getCreadoEn()).build();
    }
}
