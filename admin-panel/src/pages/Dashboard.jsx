import { useState, useEffect } from 'react'
import { Building2, CheckCircle, DollarSign, Users, KeyRound, CreditCard, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getResumen, getVentasPorMes } from '../services/endpoints'
import { formatMoney, monthName } from '../utils/formatters'

export default function Dashboard() {
  const [resumen, setResumen] = useState(null)
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getResumen(), getVentasPorMes()]).then(([r, v]) => {
      setResumen(r.data.data)
      setChartData((v.data.data || []).map(([anio, mes, total, monto]) => ({
        name: `${monthName(mes)} ${anio}`, ventas: total, monto: Number(monto)
      })).reverse())
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" /></div>

  const stats = [
    { label: 'Total Inmuebles', value: resumen?.totalInmuebles, icon: Building2, color: 'from-blue-600 to-blue-800' },
    { label: 'Disponibles', value: resumen?.disponibles, icon: CheckCircle, color: 'from-emerald-600 to-emerald-800' },
    { label: 'Vendidos', value: resumen?.vendidos, icon: DollarSign, color: 'from-violet-600 to-violet-800' },
    { label: 'Rentados', value: resumen?.rentados, icon: KeyRound, color: 'from-amber-600 to-amber-800' },
    { label: 'Clientes', value: resumen?.totalClientes, icon: Users, color: 'from-cyan-600 to-cyan-800' },
    { label: 'Rentas Activas', value: resumen?.rentasActivas, icon: TrendingUp, color: 'from-pink-600 to-pink-800' },
    { label: 'Ventas Totales', value: formatMoney(resumen?.montoTotalVentas || 0), icon: DollarSign, color: 'from-green-600 to-green-800', wide: true },
    { label: 'Pagos Pendientes', value: resumen?.pagosPendientes, icon: CreditCard, color: 'from-red-600 to-red-800' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Resumen general del sistema</p>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div className={`stat-icon bg-gradient-to-br ${color}`}><Icon size={20} /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
              <p className="text-xl font-bold text-white mt-0.5">{value ?? 0}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="card">
        <h2 className="text-base font-semibold text-white mb-4">Ventas por Mes</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="ventas" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
