# 🏠 Porta SI — Sistema de Gestión Inmobiliaria

Plataforma web empresarial para la gestión integral de operaciones inmobiliarias.

## 📋 Arquitectura

```
porta-si/
├── backend-api/      ← Java + Spring Boot 3.2 (API REST)
├── admin-panel/      ← React + Vite + Tailwind CSS (Panel Administrativo)
├── client-portal/    ← React + Vite + Tailwind CSS (Portal Público)
├── database/         ← Scripts SQL (MySQL 8)
└── docker/           ← Docker Compose + Dockerfiles
```

## 🛠 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Java 21, Spring Boot 3.2, Spring Security, JPA/Hibernate, JWT, BCrypt, Lombok, Swagger |
| Admin Panel | React 18, Vite, Tailwind CSS, React Router DOM 6, Axios, Recharts, Lucide React |
| Client Portal | React 18, Vite, Tailwind CSS, React Router DOM 6, Axios, Lucide React |
| Base de Datos | MySQL 8, 14 tablas, vistas SQL, índices optimizados |
| Infraestructura | Docker, Docker Compose, Nginx |

## 🚀 Instalación Local

### Prerrequisitos
- Java 21+ (JDK)
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

### 1. Base de Datos
```sql
mysql -u root -p < database/porta_si_schema.sql
mysql -u root -p < database/porta_si_seed.sql
```

### 2. Backend
```bash
cd backend-api
# Editar src/main/resources/application.properties (password de MySQL)
mvn clean compile
mvn spring-boot:run
```
El API estará en: http://localhost:8080
Swagger UI: http://localhost:8080/swagger-ui.html

### 3. Admin Panel
```bash
cd admin-panel
npm install
npm run dev
```
Disponible en: http://localhost:5173

### 4. Client Portal
```bash
cd client-portal
npm install
npm run dev
```
Disponible en: http://localhost:5174

## 🐳 Docker
```bash
cd docker
cp .env.example .env
docker compose up -d --build
```

## 👤 Usuarios Demo

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@portasi.com | 123456 | ADMIN |
| fgonzalez@portasi.com | 123456 | EMPLEADO |
| iarce@portasi.com | 123456 | EMPLEADO |
| daguilar@portasi.com | 123456 | EMPLEADO |

## 📡 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/v1/auth/login | Iniciar sesión |
| GET/POST/PUT/DELETE | /api/v1/usuarios | CRUD Usuarios (ADMIN) |
| PATCH | /api/v1/usuarios/{id}/toggle | Activar/Desactivar |
| GET/POST/PUT/DELETE | /api/v1/clientes | CRUD Clientes |
| GET/POST/PUT/DELETE | /api/v1/inmuebles | CRUD Inmuebles |
| GET | /api/v1/inmuebles/catalogo | Catálogo público |
| POST | /api/v1/inmuebles/{id}/imagenes | Subir imagen |
| GET/POST | /api/v1/ventas | Gestión Ventas |
| GET/POST/PUT | /api/v1/rentas | Gestión Rentas |
| PATCH | /api/v1/rentas/{id}/renovar | Renovar contrato |
| GET/POST | /api/v1/pagos | Gestión Pagos |
| GET | /api/v1/reportes/resumen | Dashboard KPIs |
| GET | /api/v1/reportes/ventas-por-mes | Reporte ventas |

## 🔒 Seguridad
- JWT Authentication con BCrypt
- Spring Security con roles (ADMIN, EMPLEADO)
- Protección CORS configurada
- Validación de inputs con Bean Validation
- Manejo global de excepciones
- Soft delete en entidades principales

## 📊 Módulos
- ✅ Dashboard con KPIs y gráficas
- ✅ Gestión de Usuarios (CRUD + activar/desactivar)
- ✅ Gestión de Clientes (CRUD + búsqueda + RFC)
- ✅ Gestión de Inmuebles (CRUD + filtros + imágenes + paginación)
- ✅ Gestión de Ventas (registro + cambio automático estado)
- ✅ Gestión de Rentas (contratos + renovaciones)
- ✅ Gestión de Pagos (registro + historial)
- ✅ Reportes (gráficas + estadísticas)
- ✅ Portal Público (landing + catálogo + detalle + contacto)

## 👥 Equipo
- Kevin Edgardo Espinoza Camargo
- Francisco Javier González Castro
- Iván Enrique Arce Baldenebro
- Daniel Aguilar Trillas

---
**ITSON — Guaymas, Sonora — 2026**
