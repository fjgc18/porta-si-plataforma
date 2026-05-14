import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginApi } from '../services/endpoints'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('portasi_user')
    const token = localStorage.getItem('portasi_token')
    if (stored && token) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await loginApi(email, password)
    const { token, ...userData } = data.data
    localStorage.setItem('portasi_token', token)
    localStorage.setItem('portasi_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('portasi_token')
    localStorage.removeItem('portasi_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
