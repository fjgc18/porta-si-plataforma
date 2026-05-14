import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDetalle } from '../services/api'
import { formatMoney } from '../utils/formatters'
import { MapPin, Bed, Bath, Car, Maximize, ArrowLeft, Phone, Mail } from 'lucide-react'

export default function Detalle() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { getDetalle(id).then(r=>setData(r.data.data)).finally(()=>setLoading(false)) }, [id])
  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full"/></div>
  if (!data) return <div className="text-center py-20">Propiedad no encontrada</div>
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-600 mb-6"><ArrowLeft size={16}/>Volver al catálogo</Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="h-80 lg:h-[420px] bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl overflow-hidden mb-6">
              {data.imagenes?.length > 0 ? <img src={data.imagenes[0].url} alt={data.titulo} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-slate-300 text-6xl font-bold">{data.tipo?.[0]}</div>}
            </div>
            {data.imagenes?.length > 1 && <div className="grid grid-cols-4 gap-2 mb-6">{data.imagenes.slice(1,5).map((img,i)=><div key={i} className="h-20 rounded-lg overflow-hidden bg-gray-100"><img src={img.url} alt="" className="w-full h-full object-cover"/></div>)}</div>}
            {/* Info */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.titulo}</h1>
            <div className="flex items-center gap-1 text-gray-500 mb-4"><MapPin size={16}/>{data.direccion && `${data.direccion}, `}{data.ciudad}, {data.estadoGeo}</div>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b">
              {data.habitaciones&&<span className="flex items-center gap-1.5"><Bed size={16}/>{data.habitaciones} Recámaras</span>}
              {data.banos&&<span className="flex items-center gap-1.5"><Bath size={16}/>{data.banos} Baños</span>}
              {data.estacionamientos&&<span className="flex items-center gap-1.5"><Car size={16}/>{data.estacionamientos} Estac.</span>}
              {data.metrosCuadrados&&<span className="flex items-center gap-1.5"><Maximize size={16}/>{data.metrosCuadrados} m²</span>}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-600 leading-relaxed">{data.descripcion || 'Sin descripción disponible.'}</p>
          </div>
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <span className="inline-block px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-medium mb-4">{data.tipo}</span>
              <p className="text-3xl font-bold text-accent-600 mb-6">{formatMoney(data.precio)}</p>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">¿Te interesa esta propiedad?</h3>
              <form className="space-y-3" onSubmit={e=>{e.preventDefault();alert('¡Gracias! Un asesor te contactará pronto.')}}>
                <input placeholder="Tu nombre" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" required/>
                <input type="email" placeholder="Tu email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" required/>
                <input type="tel" placeholder="Tu teléfono" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40"/>
                <textarea placeholder="Mensaje (opcional)" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40"/>
                <button type="submit" className="w-full bg-accent-600 text-white py-3 rounded-xl font-semibold hover:bg-accent-700 transition">Solicitar Información</button>
              </form>
              <div className="mt-6 pt-6 border-t space-y-3">
                <a href="tel:6221000001" className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent-600"><Phone size={14}/>622-100-0001</a>
                <a href="mailto:info@portasi.com" className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent-600"><Mail size={14}/>info@portasi.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
