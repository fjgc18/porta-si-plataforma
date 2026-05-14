import { useState, useEffect } from 'react'
import { getResumen, getVentasPorMes, getVentas, getClientes } from '../../services/endpoints'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { formatMoney, monthName } from '../../utils/formatters'

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899']

export default function Reportes() {
  const [resumen, setResumen] = useState(null)
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([getResumen(), getVentasPorMes()]).then(([r, v]) => {
      setResumen(r.data.data)
      setChartData((v.data.data||[]).map(([a,m,t,monto])=>({name:`${monthName(m)} ${a}`,ventas:t,monto:Number(monto)})).reverse())
    }).finally(()=>setLoading(false))
  }, [])
  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"/></div>
  const pieData = [{name:'Disponibles',value:resumen?.disponibles||0},{name:'Vendidos',value:resumen?.vendidos||0},{name:'Rentados',value:resumen?.rentados||0},{name:'Reservados',value:resumen?.reservados||0}].filter(d=>d.value>0)
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-white">Reportes</h1><p className="text-sm text-slate-500">Estadísticas y análisis</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card"><h3 className="text-base font-semibold text-white mb-4">Ventas por Mes</h3><div className="h-64"><ResponsiveContainer><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#334155"/><XAxis dataKey="name" tick={{fill:'#94a3b8',fontSize:11}}/><YAxis tick={{fill:'#94a3b8',fontSize:11}}/><Tooltip contentStyle={{background:'#1e293b',border:'1px solid #334155',borderRadius:8,color:'#e2e8f0'}}/><Bar dataKey="ventas" fill="#3b82f6" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></div>
        <div className="card"><h3 className="text-base font-semibold text-white mb-4">Distribución de Inmuebles</h3><div className="h-64"><ResponsiveContainer><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({name,value})=>`${name}: ${value}`}>{pieData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip contentStyle={{background:'#1e293b',border:'1px solid #334155',borderRadius:8,color:'#e2e8f0'}}/></PieChart></ResponsiveContainer></div></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center"><p className="text-xs text-slate-500 uppercase">Total Inmuebles</p><p className="text-3xl font-bold text-white mt-1">{resumen?.totalInmuebles}</p></div>
        <div className="card text-center"><p className="text-xs text-slate-500 uppercase">Total Clientes</p><p className="text-3xl font-bold text-white mt-1">{resumen?.totalClientes}</p></div>
        <div className="card text-center"><p className="text-xs text-slate-500 uppercase">Monto Total Ventas</p><p className="text-2xl font-bold text-emerald-400 mt-1">{formatMoney(resumen?.montoTotalVentas||0)}</p></div>
        <div className="card text-center"><p className="text-xs text-slate-500 uppercase">Pagos Pendientes</p><p className="text-3xl font-bold text-amber-400 mt-1">{resumen?.pagosPendientes}</p></div>
      </div>
    </div>
  )
}
