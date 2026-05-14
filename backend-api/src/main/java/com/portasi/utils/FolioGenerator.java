package com.portasi.utils;

import java.time.Year;

public class FolioGenerator {
    public static String generar(String prefijo, long consecutivo) {
        String anio = String.valueOf(Year.now().getValue());
        return prefijo + "-" + anio + "-" + String.format("%04d", consecutivo + 1);
    }
}
