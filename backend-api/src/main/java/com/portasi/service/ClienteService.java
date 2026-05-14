package com.portasi.service;

import com.portasi.dto.*;
import com.portasi.entity.*;
import com.portasi.enums.TipoCliente;
import com.portasi.exceptions.*;
import com.portasi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepo;
    private final UsuarioRepository usuarioRepo;

    public List<ClienteResponse> listar() {
        return clienteRepo.findAllByEliminadoEnIsNullOrderByCreadoEnDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public PageResponse<ClienteResponse> buscar(String q, int page, int size) {
        Page<Cliente> p = clienteRepo.buscar(q, PageRequest.of(page, size, Sort.by("creadoEn").descending()));
        return PageResponse.<ClienteResponse>builder()
                .content(p.getContent().stream().map(this::toResponse).collect(Collectors.toList()))
                .totalElements(p.getTotalElements()).totalPages(p.getTotalPages())
                .currentPage(p.getNumber()).pageSize(p.getSize()).build();
    }

    public ClienteResponse obtener(Long id) {
        return toResponse(findOrFail(id));
    }

    @Transactional
    public ClienteResponse crear(ClienteRequest req, Long idUsuario) {
        Usuario registrador = usuarioRepo.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", idUsuario));
        Cliente c = Cliente.builder()
                .nombre(req.getNombre()).apellidos(req.getApellidos())
                .email(req.getEmail()).telefono(req.getTelefono())
                .direccion(req.getDireccion()).rfc(req.getRfc())
                .tipoCliente(req.getTipoCliente() != null ? TipoCliente.valueOf(req.getTipoCliente()) : TipoCliente.COMPRADOR)
                .notas(req.getNotas()).registradoPor(registrador).build();
        return toResponse(clienteRepo.save(c));
    }

    @Transactional
    public ClienteResponse actualizar(Long id, ClienteRequest req) {
        Cliente c = findOrFail(id);
        c.setNombre(req.getNombre()); c.setApellidos(req.getApellidos());
        c.setEmail(req.getEmail()); c.setTelefono(req.getTelefono());
        c.setDireccion(req.getDireccion()); c.setRfc(req.getRfc());
        if (req.getTipoCliente() != null) c.setTipoCliente(TipoCliente.valueOf(req.getTipoCliente()));
        c.setNotas(req.getNotas());
        return toResponse(clienteRepo.save(c));
    }

    @Transactional
    public void eliminar(Long id) {
        Cliente c = findOrFail(id);
        c.setEliminadoEn(LocalDateTime.now());
        clienteRepo.save(c);
    }

    private Cliente findOrFail(Long id) {
        return clienteRepo.findById(id).filter(c -> c.getEliminadoEn() == null)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", id));
    }

    private ClienteResponse toResponse(Cliente c) {
        return ClienteResponse.builder()
                .id(c.getId()).nombre(c.getNombre()).apellidos(c.getApellidos())
                .email(c.getEmail()).telefono(c.getTelefono()).direccion(c.getDireccion())
                .rfc(c.getRfc()).tipoCliente(c.getTipoCliente().name()).notas(c.getNotas())
                .registradoPor(c.getRegistradoPor().getNombre() + " " + c.getRegistradoPor().getApellidos())
                .creadoEn(c.getCreadoEn()).build();
    }
}
