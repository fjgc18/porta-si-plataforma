import api from './api'

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password })

// Usuarios
export const getUsuarios = () => api.get('/usuarios')
export const getUsuario = id => api.get(`/usuarios/${id}`)
export const createUsuario = data => api.post('/usuarios', data)
export const updateUsuario = (id, data) => api.put(`/usuarios/${id}`, data)
export const toggleUsuario = id => api.patch(`/usuarios/${id}/toggle`)
export const deleteUsuario = id => api.delete(`/usuarios/${id}`)
export const getRoles = () => api.get('/usuarios/roles')

// Clientes
export const getClientes = () => api.get('/clientes')
export const buscarClientes = (q, page, size) => api.get('/clientes/buscar', { params: { q, page, size } })
export const getCliente = id => api.get(`/clientes/${id}`)
export const createCliente = data => api.post('/clientes', data)
export const updateCliente = (id, data) => api.put(`/clientes/${id}`, data)
export const deleteCliente = id => api.delete(`/clientes/${id}`)

// Inmuebles
export const getInmuebles = params => api.get('/inmuebles', { params })
export const getInmueble = id => api.get(`/inmuebles/${id}`)
export const createInmueble = data => api.post('/inmuebles', data)
export const updateInmueble = (id, data) => api.put(`/inmuebles/${id}`, data)
export const deleteInmueble = id => api.delete(`/inmuebles/${id}`)
export const togglePublicado = id => api.patch(`/inmuebles/${id}/publicar`)
export const getTipos = () => api.get('/inmuebles/tipos')
export const getEstados = () => api.get('/inmuebles/estados')
export const uploadImagen = (id, formData) => api.post(`/inmuebles/${id}/imagenes`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const deleteImagen = id => api.delete(`/inmuebles/imagenes/${id}`)

// Ventas
export const getVentas = params => api.get('/ventas', { params })
export const getVenta = id => api.get(`/ventas/${id}`)
export const createVenta = data => api.post('/ventas', data)
export const updateVenta = (id, data) => api.put(`/ventas/${id}`, data)
export const deleteVenta = id => api.delete(`/ventas/${id}`)

// Rentas
export const getRentas = () => api.get('/rentas')
export const getRenta = id => api.get(`/rentas/${id}`)
export const createRenta = data => api.post('/rentas', data)
export const updateRenta = (id, data) => api.put(`/rentas/${id}`, data)
export const renovarRenta = (id, data) => api.patch(`/rentas/${id}/renovar`, data)
export const deleteRenta = id => api.delete(`/rentas/${id}`)

// Pagos
export const getPagos = () => api.get('/pagos')
export const createPago = data => api.post('/pagos', data)
export const updatePago = (id, data) => api.put(`/pagos/${id}`, data)
export const deletePago = id => api.delete(`/pagos/${id}`)

// Reportes
export const getResumen = () => api.get('/reportes/resumen')
export const getVentasPorMes = () => api.get('/reportes/ventas-por-mes')
