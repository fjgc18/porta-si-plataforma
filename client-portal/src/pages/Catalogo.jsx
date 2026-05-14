import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCatalogo } from '../services/api'
import { formatMoney } from '../utils/formatters'
import { Search, MapPin, Bed, Bath, Car, Maximize } from 'lucide-react'

export default function Catalogo() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => { getCatalogo().then(r=>setData(r.data.data)).finally(()=>setLoading(false)) }, [])
  const filtered = data.filter(i => {
    const matchSearch = i.titulo.toLowerCase().includes(search.toLowerCase()) || i.ciudad.toLowerCase().includes(search.toLowerCase())
    const matchTipo = !tipoFilter || i.tipo === tipoFilter
    return matchSearch && matchTipo
  })
  const tipos = [...new Set(data.map(i => i.tipo))]
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Propiedades Disponibles</h1>
          <p className="text-gray-500">Encuentra tu próxima propiedad en nuestro catálogo</p>
        </div>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1"><Search size={16} className="absolute left-3 top-3 text-gray-400"/><input className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" placeholder="Buscar por título o ciudad..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <select className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" value={tipoFilter} onChange={e=>setTipoFilter(e.target.value)}><option value="">Todos los tipos</option>{tipos.map(t=><option key={t}>{t}</option>)}</select>
        </div>
        {loading ? <div className="text-center py-20"><div className="animate-spin w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full mx-auto"/></div>
        : filtered.length === 0 ? <div className="text-center py-20 text-gray-400">No se encontraron propiedades</div>
        : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(i => (
            <Link to={`/catalogo/${i.id}`} key={i.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                {i.imagenes?.length > 0 ? <img src={i.imagenes[0].url} alt={i.titulo} className="w-full h-full object-cover"/> : <div className="text-slate-300 text-4xl font-bold">{i.tipo?.[0]}</div>}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2"><MapPin size={12}/>{i.ciudad}, {i.estadoGeo}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent-600 transition mb-2">{i.titulo}</h3>
                <p className="text-2xl font-bold text-accent-600 mb-3">{formatMoney(i.precio)}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  {i.habitaciones&&<span className="flex items-center gap-1"><Bed size={14}/>{i.habitaciones}</span>}
                  {i.banos&&<span className="flex items-center gap-1"><Bath size={14}/>{i.banos}</span>}
                  {i.estacionamientos&&<span className="flex items-center gap-1"><Car size={14}/>{i.estacionamientos}</span>}
                  {i.metrosCuadrados&&<span className="flex items-center gap-1"><Maximize size={14}/>{i.metrosCuadrados}m²</span>}
                </div>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-medium">{i.tipo}</span>
              </div>
            </Link>
          ))}
        </div>}
      </div>
    </div>
  )
}
