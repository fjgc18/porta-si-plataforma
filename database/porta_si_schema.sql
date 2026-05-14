-- ============================================================
--  SISTEMA DE GESTIÓN INMOBILIARIA — PORTA SI
--  Schema completo — MySQL 8.x
-- ============================================================

CREATE DATABASE IF NOT EXISTS porta_si
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE porta_si;

-- ============================================================
-- 1. ROLES
-- ============================================================
CREATE TABLE roles (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(50)  NOT NULL UNIQUE,
  descripcion VARCHAR(200) NULL,
  creado_en   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 2. PERMISOS
-- ============================================================
CREATE TABLE permisos (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(200) NULL
) ENGINE=InnoDB;

-- ============================================================
-- 3. ROL_PERMISOS (pivot)
-- ============================================================
CREATE TABLE rol_permisos (
  id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_rol   INT UNSIGNED NOT NULL,
  id_permiso INT UNSIGNED NOT NULL,
  UNIQUE KEY uq_rol_permiso (id_rol, id_permiso),
  CONSTRAINT fk_rp_rol     FOREIGN KEY (id_rol)     REFERENCES roles(id),
  CONSTRAINT fk_rp_permiso FOREIGN KEY (id_permiso) REFERENCES permisos(id)
) ENGINE=InnoDB;

-- ============================================================
-- 4. USUARIOS
-- ============================================================
CREATE TABLE usuarios (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  apellidos     VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  username      VARCHAR(80)  NOT NULL UNIQUE,
  telefono      VARCHAR(20)  NULL,
  password      VARCHAR(255) NOT NULL,
  id_rol        INT UNSIGNED NOT NULL,
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  eliminado_en  DATETIME     NULL,
  CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES roles(id)
) ENGINE=InnoDB;

-- ============================================================
-- 5. TIPOS DE INMUEBLE
-- ============================================================
CREATE TABLE tipos_inmueble (
  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- 6. ESTADOS DE INMUEBLE
-- ============================================================
CREATE TABLE estados_inmueble (
  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- 7. INMUEBLES
-- ============================================================
CREATE TABLE inmuebles (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo          VARCHAR(200) NOT NULL,
  descripcion     TEXT         NULL,
  direccion       VARCHAR(300) NULL,
  ciudad          VARCHAR(100) NOT NULL,
  estado_geo      VARCHAR(100) NOT NULL,
  id_tipo         INT UNSIGNED NOT NULL,
  id_estado       INT UNSIGNED NOT NULL DEFAULT 1,
  precio          DECIMAL(14,2) NOT NULL,
  metros_cuadrados DECIMAL(10,2) NULL,
  habitaciones    TINYINT UNSIGNED NULL,
  banos           TINYINT UNSIGNED NULL,
  estacionamientos TINYINT UNSIGNED NULL,
  publicado       TINYINT(1)   NOT NULL DEFAULT 0,
  creado_por      INT UNSIGNED NOT NULL,
  creado_en       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  eliminado_en    DATETIME     NULL,
  CONSTRAINT fk_inmueble_tipo   FOREIGN KEY (id_tipo)    REFERENCES tipos_inmueble(id),
  CONSTRAINT fk_inmueble_estado FOREIGN KEY (id_estado)  REFERENCES estados_inmueble(id),
  CONSTRAINT fk_inmueble_user   FOREIGN KEY (creado_por) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ============================================================
-- 8. IMÁGENES DE INMUEBLE
-- ============================================================
CREATE TABLE inmueble_imagenes (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_inmueble INT UNSIGNED NOT NULL,
  url         VARCHAR(500) NOT NULL,
  nombre_archivo VARCHAR(255) NOT NULL,
  principal   TINYINT(1)   NOT NULL DEFAULT 0,
  creado_en   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_img_inmueble FOREIGN KEY (id_inmueble) REFERENCES inmuebles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 9. CLIENTES
-- ============================================================
CREATE TABLE clientes (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  apellidos       VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NULL,
  telefono        VARCHAR(20)  NULL,
  direccion       VARCHAR(300) NULL,
  rfc             VARCHAR(13)  NULL,
  tipo_cliente    ENUM('COMPRADOR','ARRENDATARIO','AMBOS') NOT NULL DEFAULT 'COMPRADOR',
  notas           TEXT         NULL,
  registrado_por  INT UNSIGNED NOT NULL,
  creado_en       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  eliminado_en    DATETIME     NULL,
  CONSTRAINT fk_cliente_usuario FOREIGN KEY (registrado_por) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ============================================================
-- 10. ESTADOS DE VENTA
-- ============================================================
CREATE TABLE estados_venta (
  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- 11. VENTAS
-- ============================================================
CREATE TABLE ventas (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  folio           VARCHAR(20)   NOT NULL UNIQUE,
  id_inmueble     INT UNSIGNED  NOT NULL,
  id_cliente      INT UNSIGNED  NOT NULL,
  id_vendedor     INT UNSIGNED  NOT NULL,
  id_estado_venta INT UNSIGNED  NOT NULL DEFAULT 1,
  precio_final    DECIMAL(14,2) NOT NULL,
  metodo_pago     ENUM('CONTADO','CREDITO','FINANCIAMIENTO') NOT NULL DEFAULT 'CONTADO',
  anticipo        DECIMAL(14,2) NULL DEFAULT 0,
  estado_pago     ENUM('PENDIENTE','PARCIAL','PAGADO') NOT NULL DEFAULT 'PENDIENTE',
  fecha_venta     DATE          NOT NULL,
  observaciones   TEXT          NULL,
  creado_en       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_venta_inmueble  FOREIGN KEY (id_inmueble)     REFERENCES inmuebles(id),
  CONSTRAINT fk_venta_cliente   FOREIGN KEY (id_cliente)      REFERENCES clientes(id),
  CONSTRAINT fk_venta_vendedor  FOREIGN KEY (id_vendedor)     REFERENCES usuarios(id),
  CONSTRAINT fk_venta_estado    FOREIGN KEY (id_estado_venta) REFERENCES estados_venta(id)
) ENGINE=InnoDB;

-- ============================================================
-- 12. RENTAS (contratos de arrendamiento)
-- ============================================================
CREATE TABLE rentas (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  folio           VARCHAR(20)   NOT NULL UNIQUE,
  id_inmueble     INT UNSIGNED  NOT NULL,
  id_cliente      INT UNSIGNED  NOT NULL,
  id_agente       INT UNSIGNED  NOT NULL,
  fecha_inicio    DATE          NOT NULL,
  fecha_fin       DATE          NOT NULL,
  pago_mensual    DECIMAL(14,2) NOT NULL,
  deposito        DECIMAL(14,2) NULL DEFAULT 0,
  estado_contrato ENUM('ACTIVO','VENCIDO','CANCELADO','RENOVADO') NOT NULL DEFAULT 'ACTIVO',
  observaciones   TEXT          NULL,
  creado_en       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_renta_inmueble FOREIGN KEY (id_inmueble) REFERENCES inmuebles(id),
  CONSTRAINT fk_renta_cliente  FOREIGN KEY (id_cliente)  REFERENCES clientes(id),
  CONSTRAINT fk_renta_agente   FOREIGN KEY (id_agente)   REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ============================================================
-- 13. PAGOS
-- ============================================================
CREATE TABLE pagos (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo_referencia ENUM('VENTA','RENTA') NOT NULL,
  id_venta        INT UNSIGNED NULL,
  id_renta        INT UNSIGNED NULL,
  monto           DECIMAL(14,2) NOT NULL,
  fecha_pago      DATE          NOT NULL,
  metodo_pago     ENUM('EFECTIVO','TRANSFERENCIA','CHEQUE','TARJETA') NOT NULL DEFAULT 'EFECTIVO',
  estado          ENUM('PENDIENTE','PAGADO','VENCIDO') NOT NULL DEFAULT 'PENDIENTE',
  concepto        VARCHAR(200)  NULL,
  registrado_por  INT UNSIGNED  NOT NULL,
  creado_en       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pago_venta    FOREIGN KEY (id_venta)        REFERENCES ventas(id),
  CONSTRAINT fk_pago_renta    FOREIGN KEY (id_renta)        REFERENCES rentas(id),
  CONSTRAINT fk_pago_usuario  FOREIGN KEY (registrado_por)  REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ============================================================
-- 14. NOTIFICACIONES
-- ============================================================
CREATE TABLE notificaciones (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario    INT UNSIGNED NOT NULL,
  titulo        VARCHAR(200) NOT NULL,
  mensaje       TEXT         NOT NULL,
  tipo          ENUM('INFO','ALERTA','VENCIMIENTO','SISTEMA') NOT NULL DEFAULT 'INFO',
  leida         TINYINT(1)   NOT NULL DEFAULT 0,
  creado_en     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ============================================================
-- 15. ÍNDICES PARA BÚSQUEDAS FRECUENTES
-- ============================================================
CREATE INDEX idx_inmueble_estado     ON inmuebles(id_estado);
CREATE INDEX idx_inmueble_tipo       ON inmuebles(id_tipo);
CREATE INDEX idx_inmueble_ciudad     ON inmuebles(ciudad);
CREATE INDEX idx_inmueble_publicado  ON inmuebles(publicado);
CREATE INDEX idx_inmueble_precio     ON inmuebles(precio);
CREATE INDEX idx_inmueble_eliminado  ON inmuebles(eliminado_en);
CREATE INDEX idx_venta_fecha         ON ventas(fecha_venta);
CREATE INDEX idx_venta_vendedor      ON ventas(id_vendedor);
CREATE INDEX idx_renta_estado        ON rentas(estado_contrato);
CREATE INDEX idx_renta_fecha_fin     ON rentas(fecha_fin);
CREATE INDEX idx_pago_estado         ON pagos(estado);
CREATE INDEX idx_pago_fecha          ON pagos(fecha_pago);
CREATE INDEX idx_cliente_email       ON clientes(email);
CREATE INDEX idx_cliente_eliminado   ON clientes(eliminado_en);
CREATE INDEX idx_usuario_eliminado   ON usuarios(eliminado_en);
CREATE INDEX idx_notif_usuario       ON notificaciones(id_usuario);
CREATE INDEX idx_notif_leida         ON notificaciones(leida);

-- ============================================================
-- FIN DEL SCHEMA
-- ============================================================
