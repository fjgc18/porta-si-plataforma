import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AdminLayout from './components/layout/AdminLayout'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/usuarios/Usuarios'
import Clientes from './pages/clientes/Clientes'
import Inmuebles from './pages/inmuebles/Inmuebles'
import Ventas from './pages/ventas/Ventas'
import Rentas from './pages/rentas/Rentas'
import Pagos from './pages/pagos/Pagos'
import Reportes from './pages/reportes/Reportes'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" /></div>
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="inmuebles" element={<Inmuebles />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="rentas" element={<Rentas />} />
        <Route path="pagos" element={<Pagos />} />
        <Route path="reportes" element={<Reportes />} />
      </Route>
    </Routes>
  )
}
