import { Link } from 'react-router-dom'
import { Search, Building2, Users, Shield, ArrowRight, MapPin, Phone } from 'lucide-react'

export default function Landing() {
  return (
    <div>
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-24">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat"></div>
        {/* Dark Navy Overlay */}
        <div className="absolute inset-0 bg-brand-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">Tu hogar ideal te espera</h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed font-light">Descubre propiedades excepcionales en las mejores ubicaciones de Sonora con el respaldo de expertos en bienes raíces.</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/catalogo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-accent-700 transition shadow-lg shadow-accent-600/30 text-lg">
                Ver propiedades <ArrowRight size={20} />
              </Link>
              <Link to="/contacto" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition text-lg">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Stats / Features */}
      <section className="py-24 bg-[#f0f2f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-brand-900 mb-4">¿Por qué elegir Porta SI?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Más de 20 años ayudando a familias a encontrar su hogar perfecto</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { icon: Shield, title: 'Confianza garantizada', desc: 'Todas nuestras propiedades están verificadas y cuentan con documentación legal completa para tu tranquilidad.' },
                { icon: Building2, title: 'Experiencia comprobada', desc: 'Nuestro equipo de asesores certificados te guiará en cada paso del proceso de compra o venta.' }
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mb-6 rounded-xl bg-accent-50 flex items-center justify-center"><Icon size={24} className="text-accent-600" /></div>
                  <h3 className="text-xl font-bold text-brand-900 mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mb-6 rounded-xl bg-accent-50 flex items-center justify-center"><Users size={24} className="text-accent-600" /></div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">Atención personalizada</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Entendemos que cada cliente es único. Te ofrecemos un servicio adaptado a tus necesidades específicas y presupuesto.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Nueva Ubicación */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <img src="/logo.jpg" alt="Porta SI Logo" className="h-20 w-auto object-contain" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-900 mb-8 uppercase tracking-tight">
                NUEVA UBICACIÓN
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0 shadow-sm border border-brand-100">
                    <MapPin className="text-brand-600" size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 leading-tight">
                      Calle Hidalgo #619 Local 3<br />
                      Colonia Centro
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-4 bg-accent-50 rounded-2xl border border-accent-100">
                  <div className="w-14 h-14 rounded-xl bg-accent-600 flex items-center justify-center shrink-0 shadow-md shadow-accent-600/30">
                    <Phone className="text-white" size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-accent-800 uppercase tracking-wider mb-1">Contáctanos por WhatsApp o Llamada</span>
                    <p className="text-2xl font-bold text-brand-900 tracking-wide">
                      644 415 08 00 <span className="text-accent-600 mx-2">/</span> 644 107 49 42
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-white">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.454988005391!2d-109.932976!3d27.919956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI4JzExLjgiTiAxMDnCsDU1JzU4LjciVw!5e0!3m2!1sen!2smx!4v1620000000000!5m2!1sen!2smx" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Ubicación Porta SI Centro"
                 ></iframe>
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-8 bg-brand-900 text-white p-6 rounded-2xl shadow-xl">
                 <p className="font-bold text-xl mb-1">¡Te esperamos!</p>
                 <p className="text-brand-100">Lunes a Viernes de 9am a 6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para encontrar tu nuevo hogar?</h2>
          <p className="text-brand-100 mb-8 text-lg">Contáctanos y agenda una visita con uno de nuestros asesores expertos.</p>
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-accent-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-accent-700 transition shadow-lg shadow-accent-600/20 text-lg">
            Agendar Visita <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
