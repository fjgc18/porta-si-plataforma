package com.portasi.service;

import com.portasi.entity.*;
import com.portasi.exceptions.*;
import com.portasi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final InmuebleRepository inmuebleRepo;
    private final InmuebleImagenRepository imagenRepo;

    @Value("${app.upload.dir}")
    private String uploadDir;

    private static final Set<String> ALLOWED = Set.of("image/jpeg","image/png","image/webp","image/gif");

    public InmuebleImagen upload(Long inmuebleId, MultipartFile file, boolean principal) {
        if (file.isEmpty()) throw new BusinessException("El archivo está vacío");
        if (!ALLOWED.contains(file.getContentType()))
            throw new BusinessException("Formato no permitido. Use: JPG, PNG, WebP o GIF");
        Inmueble inmueble = inmuebleRepo.findById(inmuebleId)
                .orElseThrow(() -> new ResourceNotFoundException("Inmueble", inmuebleId));
        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
        String filename = UUID.randomUUID() + ext;
        try {
            Path target = Paths.get(uploadDir).resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BusinessException("Error al guardar el archivo: " + e.getMessage());
        }
        InmuebleImagen img = InmuebleImagen.builder()
                .inmueble(inmueble).url("/uploads/" + filename)
                .nombreArchivo(filename).principal(principal).build();
        return imagenRepo.save(img);
    }

    public void delete(Long imagenId) {
        InmuebleImagen img = imagenRepo.findById(imagenId)
                .orElseThrow(() -> new ResourceNotFoundException("Imagen", imagenId));
        try { Files.deleteIfExists(Paths.get(uploadDir).resolve(img.getNombreArchivo())); }
        catch (IOException ignored) {}
        imagenRepo.delete(img);
    }
}
