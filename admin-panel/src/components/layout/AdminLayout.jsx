import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Users, Building2, Handshake, FileText, CreditCard, BarChart3, KeyRound, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/usuarios',  icon: Users,          label: 'Usuarios',  admin: true },
  { to: '/clientes',  icon: Handshake,      label: 'Clientes' },
  { to: '/inmuebles', icon: Building2,      label: 'Inmuebles' },
  { to: '/ventas',    icon: FileText,       label: 'Ventas' },
  { to: '/rentas',    icon: KeyRound,       label: 'Rentas' },
  { to: '/pagos',     icon: CreditCard,     label: 'Pagos' },
  { to: '/reportes',  icon: BarChart3,      label: 'Reportes' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }
  const filtered = nav.filter(n => !n.admin || user?.rol === 'ADMIN')

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-5 pt-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">Porta SI</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Gestión Inmobiliaria</p>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {filtered.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-primary-600/20 text-primary-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      {/* User */}
      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            {user?.nombre?.[0]}{user?.apellidos?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user?.nombre} {user?.apellidos}</p>
            <p className="text-[10px] text-slate-500 uppercase">{user?.rol}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut size={16} /> Cerrar sesión
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface-900 border-r border-slate-800 shrink-0">
        <SidebarContent />
      </aside>
      {/* Mobile sidebar */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-surface-900 border-r border-slate-800 flex flex-col z-10">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
            <SidebarContent />
          </aside>
        </div>
      )}
      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-surface-900/80 backdrop-blur shrink-0 lg:hidden">
          <button onClick={() => setOpen(true)} className="text-slate-400"><Menu size={22} /></button>
          <span className="text-sm font-semibold text-slate-300">Porta SI</span>
          <div className="w-8" />
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
