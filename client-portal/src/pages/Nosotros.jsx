import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Nosotros() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-brand-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
            20 años construyendo sueños y facilitando las mejores decisiones inmobiliarias en Sonora.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">¿Quiénes somos?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                <strong className="text-brand-700">Porta SI</strong> es una empresa líder en soluciones inmobiliarias con mayor presencia y mejor cobertura en todo el estado de Sonora, gracias a que cuentan con personal profesional altamente calificado y capacitado con la calidez humana que los caracteriza.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Cuentan con <strong className="text-gray-900">20 años de experiencia</strong> en el mercado inmobiliario con una amplia variedad de servicios.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                {['Bienes Raíces', 'Avalúos Inmobiliarios', 'Créditos Hipotecarios', 'Jurídico / Legal'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="text-accent-600" size={20} />
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center items-center">
              <div className="relative w-64 md:w-80 flex items-center justify-center">
                <img src="/logo.jpg" alt="Logo Porta SI" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="max-w-5xl mx-auto px-4 mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Nuestros Servicios</h3>
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white inline-block w-full">
          <img src="/banner.jpg" alt="Porta SI Cumple - Servicios Inmobiliarios" className="w-full object-cover" />
        </div>
        <div className="mt-12">
          <Link to="/catalogo" className="bg-accent-600 text-black text-lg px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-accent-700 hover:shadow-xl transition-all">
            Ver Catálogo de Propiedades
          </Link>
        </div>
      </div>
    </div>
  )
}
