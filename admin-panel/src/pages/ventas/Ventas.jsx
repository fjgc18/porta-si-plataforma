import { useState, useEffect } from 'react'
import { getVentas, createVenta, updateVenta, deleteVenta, getClientes, getInmuebles } from '../../services/endpoints'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { formatMoney, formatDate } from '../../utils/formatters'
import toast from 'react-hot-toast'

export default function Ventas() {
  const [data, setData] = useState([])
  const [clientes, setClientes] = useState([])
  const [inmuebles, setInmuebles] = useState([])
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ idInmueble:'', idCliente:'', precioFinal:'', metodoPago:'CONTADO', anticipo:'', estadoPago:'PENDIENTE', fechaVenta:'', observaciones:'' })
  const load = () => getVentas({}).then(r => setData(r.data.data))
  useEffect(() => { load(); getClientes().then(r=>setClientes(r.data.data)); getInmuebles({size:100}).then(r=>setInmuebles(r.data.data?.content||[])) }, [])
  const resetForm = () => setForm({ idInmueble:'', idCliente:'', precioFinal:'', metodoPago:'CONTADO', anticipo:'', estadoPago:'PENDIENTE', fechaVenta:new Date().toISOString().split('T')[0], observaciones:'' })
  const openNew = () => { resetForm(); setEdit(null); setOpen(true) }
  const openEdit = v => { setForm({ idInmueble:v.idInmueble||'', idCliente:v.idCliente||'', precioFinal:v.precioFinal||'', metodoPago:v.metodoPago||'CONTADO', anticipo:v.anticipo||'', estadoPago:v.estadoPago||'PENDIENTE', fechaVenta:v.fechaVenta||'', observaciones:v.observaciones||'' }); setEdit(v); setOpen(true) }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {...form, precioFinal:Number(form.precioFinal), anticipo:form.anticipo?Number(form.anticipo):0}
      if (edit) { await updateVenta(edit.id, payload); toast.success('Venta actualizada') }
      else { await createVenta(payload); toast.success('Venta registrada') }
      setOpen(false); load()
    } catch (err) { toast.error(err.response?.data?.message||'Error') }
  }
  const handleDelete = async id => { if (!confirm('¿Eliminar esta venta?')) return; try { await deleteVenta(id); load(); toast.success('Venta eliminada') } catch(err) { toast.error(err.response?.data?.message||'Error al eliminar') } }
  const badgePago = { PENDIENTE:'badge-gold', PARCIAL:'badge-blue', PAGADO:'badge-green' }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white">Ventas</h1><p className="text-sm text-slate-500">Registro de ventas</p></div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16}/> Nueva Venta</button>
      </div>
      <div className="table-wrap"><table><thead><tr><th>Folio</th><th>Inmueble</th><th>Cliente</th><th>Vendedor</th><th>Precio</th><th>Método</th><th>Pago</th><th>Fecha</th><th>Acciones</th></tr></thead>
        <tbody>{data.map(v=><tr key={v.id}><td className="text-primary-400 font-mono text-xs">{v.folio}</td><td className="text-white">{v.inmueble}</td><td className="text-slate-400">{v.cliente}</td><td className="text-slate-400">{v.vendedor}</td><td className="text-emerald-400 font-medium">{formatMoney(v.precioFinal)}</td><td className="text-slate-400 text-xs">{v.metodoPago}</td><td><span className={`badge ${badgePago[v.estadoPago]||'badge-gray'}`}>{v.estadoPago}</span></td><td className="text-slate-500 text-xs">{formatDate(v.fechaVenta)}</td><td className="flex gap-2"><button onClick={()=>openEdit(v)} className="btn btn-ghost p-2"><Edit size={15}/></button><button onClick={()=>handleDelete(v.id)} className="btn btn-ghost p-2 text-red-400"><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
      {open&&<div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setOpen(false)}><div className="modal"><h3 className="text-lg font-semibold text-white mb-4">{edit?'Editar':'Registrar'} Venta</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="label">Inmueble</label><select className="input" value={form.idInmueble} onChange={e=>{const i=inmuebles.find(x=>x.id==e.target.value);setForm({...form,idInmueble:e.target.value,precioFinal:i?.precio||''})}} required={!edit}><option value="">Seleccionar</option>{inmuebles.filter(i=>i.estado==='Disponible').map(i=><option key={i.id} value={i.id}>{i.titulo} — {formatMoney(i.precio)}</option>)}</select></div>
          <div><label className="label">Cliente</label><select className="input" value={form.idCliente} onChange={e=>setForm({...form,idCliente:e.target.value})} required={!edit}><option value="">Seleccionar</option>{clientes.map(c=><option key={c.id} value={c.id}>{c.nombre} {c.apellidos}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Precio Final</label><input type="number" className="input" value={form.precioFinal} onChange={e=>setForm({...form,precioFinal:e.target.value})} required/></div><div><label className="label">Anticipo</label><input type="number" className="input" value={form.anticipo} onChange={e=>setForm({...form,anticipo:e.target.value})}/></div></div>
          <div className="grid grid-cols-3 gap-3"><div><label className="label">Método</label><select className="input" value={form.metodoPago} onChange={e=>setForm({...form,metodoPago:e.target.value})}><option>CONTADO</option><option>CREDITO</option><option>FINANCIAMIENTO</option></select></div><div><label className="label">Estado Pago</label><select className="input" value={form.estadoPago} onChange={e=>setForm({...form,estadoPago:e.target.value})}><option>PENDIENTE</option><option>PARCIAL</option><option>PAGADO</option></select></div><div><label className="label">Fecha</label><input type="date" className="input" value={form.fechaVenta} onChange={e=>setForm({...form,fechaVenta:e.target.value})} required/></div></div>
          <div><label className="label">Observaciones</label><textarea className="input" rows={2} value={form.observaciones} onChange={e=>setForm({...form,observaciones:e.target.value})}/></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={()=>setOpen(false)} className="btn btn-outline flex-1">Cancelar</button><button type="submit" className="btn btn-primary flex-1">{edit?'Guardar':'Registrar'}</button></div>
        </form></div></div>}
    </div>
  )
}
