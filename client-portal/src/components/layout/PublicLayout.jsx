import { Outlet, Link, NavLink } from 'react-router-dom'
import { Building2, Phone, Mail, MapPin } from 'lucide-react'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.jpg" alt="Porta SI Logo" className="h-14 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-accent-600' : 'text-gray-700 hover:text-accent-600'}`}>Inicio</NavLink>
            <NavLink to="/catalogo" className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-accent-600' : 'text-gray-700 hover:text-accent-600'}`}>Propiedades</NavLink>
            <NavLink to="/nosotros" className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-accent-600' : 'text-gray-700 hover:text-accent-600'}`}>Sobre nosotros</NavLink>
          </div>
          <div className="flex items-center shrink-0">
            <Link to="/contacto" className="bg-accent-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-accent-600/20 hover:bg-accent-700 hover:shadow-lg hover:shadow-accent-700/30 transition-all">
              Contáctenos
            </Link>
          </div>
        </div>
      </nav>
      {/* Content */}
      <main className="flex-1"><Outlet /></main>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.jpg" alt="Porta SI Logo" className="h-10 w-auto object-contain bg-white rounded p-1" />
              </div>
              <p className="text-sm leading-relaxed">Sistema de Gestión Inmobiliaria profesional. Encontramos la propiedad perfecta para ti en Guaymas y San Carlos, Sonora.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm"><li><Link to="/" className="hover:text-white">Inicio</Link></li><li><Link to="/nosotros" className="hover:text-white">Nosotros</Link></li><li><Link to="/catalogo" className="hover:text-white">Propiedades</Link></li><li><Link to="/contacto" className="hover:text-white">Contacto</Link></li></ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone size={14} className="text-accent-500" /> 644 415 08 00 / 644 107 49 42</li>
                <li className="flex items-center gap-2"><Mail size={14} className="text-accent-500" /> info@portasi.com</li>
                <li className="flex items-start gap-2"><MapPin size={14} className="text-accent-500 mt-1 shrink-0" /> <span>Calle Hidalgo #619 Local 3<br/>Colonia Centro</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs">© 2026 Porta SI. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
