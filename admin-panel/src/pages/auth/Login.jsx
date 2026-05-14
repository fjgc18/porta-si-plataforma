import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Building2, Mail, Lock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await login(email, password)
      toast.success('Bienvenido a Porta SI')
      navigate('/')
    } catch {
      setError('Credenciales incorrectas')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Building2 size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Porta SI</h1>
          <p className="text-sm text-slate-500 mt-1">Sistema de Gestión Inmobiliaria</p>
        </div>
        {/* Card */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-1">Iniciar Sesión</h2>
          <p className="text-sm text-slate-500 mb-6">Ingresa al panel administrativo</p>
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Correo electrónico</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                <input type="email" className="input pl-10" placeholder="admin@portasi.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="label">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
                <input type="password" className="input pl-10" placeholder="••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : 'Ingresar'}
            </button>
          </form>
          <p className="text-xs text-slate-600 text-center mt-6">Demo: admin@portasi.com / 123456</p>
        </div>
      </div>
    </div>
  )
}
