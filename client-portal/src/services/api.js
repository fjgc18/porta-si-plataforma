import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api/v1' })
export const getCatalogo = () => api.get('/inmuebles/catalogo')
export const getDetalle = id => api.get(`/inmuebles/catalogo/${id}`)
export default api
