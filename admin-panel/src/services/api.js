import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const api = axios.create({ 
  baseURL: API_BASE_URL, 
  headers: { 'Content-Type': 'application/json' } 
})

const apiOrigin = API_BASE_URL.startsWith('http') ? new URL(API_BASE_URL).origin : ''

export const assetUrl = url => {
  if (!url || url.startsWith('http')) return url
  return `${apiOrigin}${url}`
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('portasi_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(r => r, err => {
  if (err.response?.status === 401) {
    localStorage.removeItem('portasi_token')
    localStorage.removeItem('portasi_user')
    window.location.href = '/login'
  }
  return Promise.reject(err)
})

export default api
