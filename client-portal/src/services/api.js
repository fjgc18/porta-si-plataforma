import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'
const api = axios.create({ baseURL: API_BASE_URL })
const apiOrigin = API_BASE_URL.startsWith('http') ? new URL(API_BASE_URL).origin : ''

export const assetUrl = url => {
  if (!url || url.startsWith('http')) return url
  return `${apiOrigin}${url}`
}

export const getCatalogo = () => api.get('/inmuebles/catalogo')
export const getDetalle = id => api.get(`/inmuebles/catalogo/${id}`)
export default api
