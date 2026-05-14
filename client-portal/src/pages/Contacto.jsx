import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contacto() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contáctanos</h1>
          <p className="text-gray-500">Estamos listos para ayudarte a encontrar tu propiedad ideal</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('¡Mensaje enviado! Te contactaremos pronto.') }}>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Nombre" className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" required />
                <input placeholder="Apellidos" className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" required />
              </div>
              <input type="email" placeholder="Correo electrónico" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" required />
              <input type="tel" placeholder="Teléfono" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40">
                <option>Quiero comprar una propiedad</option><option>Quiero rentar una propiedad</option><option>Quiero vender mi propiedad</option><option>Agendar visita</option><option>Otro</option>
              </select>
              <textarea rows={4} placeholder="Tu mensaje..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40" required />
              <button type="submit" className="w-full bg-accent-600 text-white py-3.5 rounded-xl font-semibold hover:bg-accent-700 transition shadow-lg">Enviar Mensaje</button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información de contacto</h2>
            <div className="space-y-6">
              {[{ icon: Phone, title: 'Teléfono', value: '622-100-0001', sub: 'Llamadas y WhatsApp' },
              { icon: Mail, title: 'Correo', value: 'info@portasi.com', sub: 'Respuesta en 24 horas' },
              { icon: MapPin, title: 'Ubicación', value: 'Guaymas, Sonora', sub: 'México' },
              { icon: Clock, title: 'Horario', value: 'Lun - Vie: 9:00 - 18:00', sub: 'Sáb: 9:00 - 14:00' }
              ].map(({ icon: Icon, title, value, sub }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center shrink-0"><Icon size={20} className="text-accent-600" /></div>
                  <div><p className="text-sm font-medium text-gray-900">{title}</p><p className="text-sm text-gray-600">{value}</p><p className="text-xs text-gray-400">{sub}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
