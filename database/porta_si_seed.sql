-- ============================================================
--  PORTA SI — Datos Semilla (Seed Data)
-- ============================================================

 USE porta_si;
 
-- Roles
INSERT INTO roles (nombre, descripcion) VALUES
  ('ADMIN',    'Acceso total al sistema'),
  ('EMPLEADO', 'Gestión de inmuebles, clientes y ventas');

-- Permisos
INSERT INTO permisos (nombre, descripcion) VALUES
  ('USUARIOS_LEER',      'Ver lista de usuarios'),
  ('USUARIOS_CREAR',     'Crear usuarios'),
  ('USUARIOS_EDITAR',    'Editar usuarios'),
  ('USUARIOS_ELIMINAR',  'Desactivar usuarios'),
  ('CLIENTES_LEER',      'Ver clientes'),
  ('CLIENTES_CREAR',     'Crear clientes'),
  ('CLIENTES_EDITAR',    'Editar clientes'),
  ('CLIENTES_ELIMINAR',  'Eliminar clientes'),
  ('INMUEBLES_LEER',     'Ver inmuebles'),
  ('INMUEBLES_CREAR',    'Crear inmuebles'),
  ('INMUEBLES_EDITAR',   'Editar inmuebles'),
  ('INMUEBLES_ELIMINAR', 'Eliminar inmuebles'),
  ('VENTAS_LEER',        'Ver ventas'),
  ('VENTAS_CREAR',       'Registrar ventas'),
  ('RENTAS_LEER',        'Ver rentas'),
  ('RENTAS_CREAR',       'Registrar rentas'),
  ('RENTAS_EDITAR',      'Editar rentas'),
  ('PAGOS_LEER',         'Ver pagos'),
  ('PAGOS_CREAR',        'Registrar pagos'),
  ('REPORTES_LEER',      'Ver reportes'),
  ('REPORTES_EXPORTAR',  'Exportar reportes');

-- ADMIN tiene todos los permisos
INSERT INTO rol_permisos (id_rol, id_permiso)
  SELECT 1, id FROM permisos;

-- EMPLEADO tiene permisos limitados
INSERT INTO rol_permisos (id_rol, id_permiso)
  SELECT 2, id FROM permisos
  WHERE nombre NOT IN ('USUARIOS_CREAR','USUARIOS_EDITAR','USUARIOS_ELIMINAR');

-- Tipos de inmueble
INSERT INTO tipos_inmueble (nombre) VALUES
  ('Casa'),
  ('Departamento'),
  ('Terreno'),
  ('Local Comercial');

-- Estados de inmueble
INSERT INTO estados_inmueble (nombre) VALUES
  ('Disponible'),
  ('Reservado'),
  ('Vendido'),
  ('Rentado');

-- Estados de venta
INSERT INTO estados_venta (nombre) VALUES
  ('Completada'),
  ('En Proceso'),
  ('Cancelada');

-- Usuarios (password = BCrypt de '123456')
INSERT INTO usuarios (nombre, apellidos, email, username, telefono, password, id_rol) VALUES
  ('Kevin Edgardo',    'Espinoza Camargo',  'admin@portasi.com',     'admin',      '622-100-0001', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1),
  ('Francisco Javier', 'González Castro',   'fgonzalez@portasi.com', 'fgonzalez',  '622-100-0002', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2),
  ('Iván Enrique',     'Arce Baldenebro',   'iarce@portasi.com',     'iarce',      '622-100-0003', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2),
  ('Daniel',           'Aguilar Trillas',   'daguilar@portasi.com',  'daguilar',   '622-100-0004', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2);

-- Inmuebles de ejemplo
INSERT INTO inmuebles (titulo, descripcion, id_tipo, id_estado, direccion, ciudad, estado_geo, precio, metros_cuadrados, habitaciones, banos, estacionamientos, publicado, creado_por) VALUES
  ('Casa Colinas del Sol',       'Hermosa residencia en fraccionamiento privado con alberca y jardín amplio.',                                1, 3, 'Fracc. Colinas del Sol, Guaymas, Son.',     'Guaymas',     'Sonora', 2400000.00, 150.00, 3, 2, 2, 1, 1),
  ('Departamento Zona Centro',   'Departamento moderno con vista a la bahía, seguridad 24 horas y amenidades.',                               2, 1, 'Calle Serdán 412, Centro, Guaymas.',        'Guaymas',     'Sonora',  980000.00,  75.00, 2, 1, 1, 1, 2),
  ('Terreno Miramar',            'Terreno con frente a la avenida principal y vista panorámica al mar.',                                       3, 1, 'Av. Miramar s/n, San Carlos, Son.',          'San Carlos',  'Sonora', 1750000.00, 350.00, NULL, NULL, NULL, 1, 2),
  ('Casa Fracc. Las Palmas',     'Casa amplia con jardín, cocina integral, cochera para 2 autos y cuarto de servicio.',                        1, 2, 'Fracc. Las Palmas, Empalme, Son.',           'Empalme',     'Sonora', 3100000.00, 210.00, 4, 3, 2, 1, 2),
  ('Local Comercial Serdán',     'Local en planta baja sobre avenida principal con alto flujo peatonal y vehicular.',                          4, 1, 'Av. Serdán 102, Centro, Guaymas.',           'Guaymas',     'Sonora', 1200000.00,  95.00, NULL, NULL, 2, 1, 1),
  ('Casa Moderna Miramar',       'Residencia de lujo frente al mar con acabados premium, terraza y roof garden.',                              1, 1, 'Fracc. Miramar, San Carlos, Son.',           'San Carlos',  'Sonora', 4500000.00, 280.00, 4, 3, 3, 1, 2),
  ('Departamento Zona Norte',    'Departamento en planta alta con elevador, estacionamiento techado y área de lavado.',                        2, 3, 'Fracc. Zona Norte, Guaymas, Son.',           'Guaymas',     'Sonora', 1100000.00,  90.00, 2, 2, 1, 1, 2),
  ('Terreno Industrial',         'Terreno con uso de suelo industrial y acceso directo a carretera federal.',                                  3, 1, 'Carretera Federal KM 12, Empalme.',          'Empalme',     'Sonora',  850000.00, 500.00, NULL, NULL, NULL, 0, 1);

-- Clientes de ejemplo
INSERT INTO clientes (nombre, apellidos, email, telefono, direccion, rfc, tipo_cliente, registrado_por) VALUES
  ('Roberto',        'Ibarra Ochoa',   'roberto.ibarra@gmail.com', '622-134-5678', 'Col. Centro, Guaymas',        'IIOR850312AB1', 'COMPRADOR',     2),
  ('María Fernanda', 'López Ramos',    'mflopez@hotmail.com',      '622-987-6543', 'Fracc. Miramar, San Carlos',  'LORM900715CD2', 'COMPRADOR',     2),
  ('Jorge',          'Armenta Díaz',   'jarmenta@outlook.com',     '622-456-7890', 'Col. Norte, Empalme',         'AEDJ880923EF3', 'ARRENDATARIO',  2),
  ('Ana Cecilia',    'Morales Vega',   'acmorales@yahoo.com',      '622-321-0987', 'Fracc. Las Palmas, Guaymas',  'MOVA950108GH4', 'AMBOS',         2),
  ('Luis Alberto',   'Soto Paredes',   'lasoto@gmail.com',         '622-654-3210', 'Centro, Guaymas',             'SOPL870520IJ5', 'COMPRADOR',     2);

-- Ventas de ejemplo
INSERT INTO ventas (folio, id_inmueble, id_cliente, id_vendedor, id_estado_venta, precio_final, metodo_pago, anticipo, estado_pago, fecha_venta, observaciones) VALUES
  ('VTA-2026-0001', 1, 1, 2, 1, 2400000.00, 'CONTADO',         2400000.00, 'PAGADO',   '2026-05-05', 'Pago de contado. Escrituración con notario.'),
  ('VTA-2026-0002', 7, 4, 2, 1, 1100000.00, 'FINANCIAMIENTO',   330000.00, 'PARCIAL',  '2026-04-29', 'Financiamiento bancario FOVISSSTE.'),
  ('VTA-2026-0003', 4, 3, 3, 2, 3200000.00, 'CREDITO',          960000.00, 'PARCIAL',  '2026-04-15', 'Enganche 30%, resto a 18 meses.');

-- Rentas de ejemplo
INSERT INTO rentas (folio, id_inmueble, id_cliente, id_agente, fecha_inicio, fecha_fin, pago_mensual, deposito, estado_contrato, observaciones) VALUES
  ('RNT-2026-0001', 2, 3, 2, '2026-01-01', '2026-12-31', 8500.00,  17000.00, 'ACTIVO',  'Contrato anual. Incluye mantenimiento.'),
  ('RNT-2026-0002', 5, 5, 3, '2026-03-01', '2027-02-28', 15000.00, 30000.00, 'ACTIVO',  'Local para negocio de abarrotes.');

-- Pagos de ejemplo
INSERT INTO pagos (tipo_referencia, id_venta, id_renta, monto, fecha_pago, metodo_pago, estado, concepto, registrado_por) VALUES
  ('VENTA', 1, NULL, 2400000.00, '2026-05-05', 'TRANSFERENCIA', 'PAGADO',   'Pago total de contado',     2),
  ('VENTA', 2, NULL,  330000.00, '2026-04-29', 'TRANSFERENCIA', 'PAGADO',   'Enganche financiamiento',   2),
  ('RENTA', NULL, 1,    8500.00, '2026-01-05', 'TRANSFERENCIA', 'PAGADO',   'Renta enero 2026',          2),
  ('RENTA', NULL, 1,    8500.00, '2026-02-03', 'EFECTIVO',      'PAGADO',   'Renta febrero 2026',        2),
  ('RENTA', NULL, 1,    8500.00, '2026-03-05', 'TRANSFERENCIA', 'PAGADO',   'Renta marzo 2026',          2),
  ('RENTA', NULL, 1,    8500.00, '2026-04-04', 'TRANSFERENCIA', 'PAGADO',   'Renta abril 2026',          2),
  ('RENTA', NULL, 1,    8500.00, '2026-05-05', 'TRANSFERENCIA', 'PENDIENTE','Renta mayo 2026',           2),
  ('RENTA', NULL, 2,   15000.00, '2026-03-01', 'CHEQUE',        'PAGADO',   'Renta marzo 2026',          3),
  ('RENTA', NULL, 2,   15000.00, '2026-04-02', 'TRANSFERENCIA', 'PAGADO',   'Renta abril 2026',          3),
  ('RENTA', NULL, 2,   15000.00, '2026-05-01', 'TRANSFERENCIA', 'PENDIENTE','Renta mayo 2026',           3);

-- Notificaciones de ejemplo
INSERT INTO notificaciones (id_usuario, titulo, mensaje, tipo) VALUES
  (1, 'Bienvenido a Porta SI', 'El sistema está listo para usarse. Configura tu perfil desde ajustes.', 'INFO'),
  (2, 'Nuevo cliente registrado', 'Se registró al cliente Roberto Ibarra Ochoa exitosamente.', 'INFO'),
  (2, 'Contrato próximo a vencer', 'El contrato RNT-2026-0001 vence el 31 de diciembre de 2026.', 'VENCIMIENTO');

-- ============================================================
-- VISTAS PARA REPORTES
-- ============================================================

CREATE OR REPLACE VIEW v_catalogo_publico AS
SELECT
  i.id, i.titulo, i.descripcion, ti.nombre AS tipo, i.precio,
  i.metros_cuadrados, i.habitaciones, i.banos, i.estacionamientos,
  i.ciudad, i.estado_geo, i.direccion, ei.nombre AS estado
FROM inmuebles i
JOIN tipos_inmueble   ti ON ti.id = i.id_tipo
JOIN estados_inmueble ei ON ei.id = i.id_estado
WHERE i.publicado = 1 AND i.id_estado = 1 AND i.eliminado_en IS NULL;

CREATE OR REPLACE VIEW v_ventas_detalle AS
SELECT
  v.id, v.folio, v.fecha_venta,
  i.titulo AS inmueble, ti.nombre AS tipo_inmueble,
  CONCAT(c.nombre, ' ', c.apellidos) AS cliente,
  CONCAT(u.nombre, ' ', u.apellidos) AS vendedor,
  v.precio_final, v.metodo_pago, v.anticipo, v.estado_pago,
  ev.nombre AS estado_venta, v.observaciones
FROM ventas v
JOIN inmuebles      i  ON i.id  = v.id_inmueble
JOIN tipos_inmueble ti ON ti.id = i.id_tipo
JOIN clientes       c  ON c.id  = v.id_cliente
JOIN usuarios       u  ON u.id  = v.id_vendedor
JOIN estados_venta  ev ON ev.id = v.id_estado_venta;

CREATE OR REPLACE VIEW v_ventas_por_mes AS
SELECT
  YEAR(fecha_venta)  AS anio,
  MONTH(fecha_venta) AS mes,
  COUNT(*)           AS total_ventas,
  SUM(precio_final)  AS monto_total
FROM ventas
WHERE id_estado_venta = 1
GROUP BY YEAR(fecha_venta), MONTH(fecha_venta)
ORDER BY anio DESC, mes DESC;

-- ============================================================
-- FIN DE SEED DATA
-- ============================================================
