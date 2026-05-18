import { useState, useEffect } from 'react'
import { getPagos, createPago, updatePago, deletePago, getVentas, getRentas } from '../../services/endpoints'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { formatMoney, formatDate } from '../../utils/formatters'
import toast from 'react-hot-toast'

export default function Pagos() {
  const [data, setData] = useState([])
  const [ventas, setVentas] = useState([])
  const [rentas, setRentas] = useState([])
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ tipoReferencia:'RENTA', idVenta:'', idRenta:'', monto:'', fechaPago:'', metodoPago:'EFECTIVO', estado:'PAGADO', concepto:'' })
  const load = () => getPagos().then(r => setData(r.data.data))
  useEffect(() => { load(); getVentas({}).then(r=>setVentas(r.data.data)); getRentas().then(r=>setRentas(r.data.data)) }, [])
  const resetForm = () => setForm({ tipoReferencia:'RENTA', idVenta:'', idRenta:'', monto:'', fechaPago:new Date().toISOString().split('T')[0], metodoPago:'EFECTIVO', estado:'PAGADO', concepto:'' })
  const openNew = () => { resetForm(); setEdit(null); setOpen(true) }
  const openEdit = p => { setForm({ tipoReferencia:p.tipoReferencia||'RENTA', idVenta:'', idRenta:'', monto:p.monto||'', fechaPago:p.fechaPago||'', metodoPago:p.metodoPago||'EFECTIVO', estado:p.estado||'PAGADO', concepto:p.concepto||'' }); setEdit(p); setOpen(true) }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {...form, monto:Number(form.monto), idVenta:form.tipoReferencia==='VENTA'?Number(form.idVenta):null, idRenta:form.tipoReferencia==='RENTA'?Number(form.idRenta):null}
      if (edit) { await updatePago(edit.id, payload); toast.success('Pago actualizado') }
      else { await createPago(payload); toast.success('Pago registrado') }
      setOpen(false); load()
    } catch (err) { toast.error(err.response?.data?.message||'Error') }
  }
  const handleDelete = async id => { if (!confirm('¿Eliminar este pago?')) return; try { await deletePago(id); load(); toast.success('Pago eliminado') } catch(err) { toast.error(err.response?.data?.message||'Error al eliminar') } }
  const badge = { PENDIENTE:'badge-gold', PAGADO:'badge-green', VENCIDO:'badge-red' }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white">Pagos</h1><p className="text-sm text-slate-500">Registro de pagos</p></div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16}/> Registrar Pago</button>
      </div>
      <div className="table-wrap"><table><thead><tr><th>Tipo</th><th>Folio</th><th>Inmueble</th><th>Monto</th><th>Método</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
        <tbody>{data.map(p=><tr key={p.id}><td><span className={`badge ${p.tipoReferencia==='VENTA'?'badge-blue':'badge-gold'}`}>{p.tipoReferencia}</span></td><td className="text-primary-400 font-mono text-xs">{p.folioReferencia}</td><td className="text-white">{p.inmueble}</td><td className="text-emerald-400 font-medium">{formatMoney(p.monto)}</td><td className="text-slate-400 text-xs">{p.metodoPago}</td><td><span className={`badge ${badge[p.estado]||'badge-gray'}`}>{p.estado}</span></td><td className="text-slate-500 text-xs">{formatDate(p.fechaPago)}</td><td className="flex gap-2"><button onClick={()=>openEdit(p)} className="btn btn-ghost p-2"><Edit size={15}/></button><button onClick={()=>handleDelete(p.id)} className="btn btn-ghost p-2 text-red-400"><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
      {open&&<div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setOpen(false)}><div className="modal"><h3 className="text-lg font-semibold text-white mb-4">{edit?'Editar':'Registrar'} Pago</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="label">Tipo</label><select className="input" value={form.tipoReferencia} onChange={e=>setForm({...form,tipoReferencia:e.target.value,idVenta:'',idRenta:''})}><option value="VENTA">Venta</option><option value="RENTA">Renta</option></select></div>
          {form.tipoReferencia==='VENTA'?<div><label className="label">Venta</label><select className="input" value={form.idVenta} onChange={e=>setForm({...form,idVenta:e.target.value})} required={!edit}><option value="">Seleccionar</option>{ventas.map(v=><option key={v.id} value={v.id}>{v.folio} — {v.inmueble}</option>)}</select></div>:<div><label className="label">Renta</label><select className="input" value={form.idRenta} onChange={e=>setForm({...form,idRenta:e.target.value})} required={!edit}><option value="">Seleccionar</option>{rentas.map(r=><option key={r.id} value={r.id}>{r.folio} — {r.inmueble}</option>)}</select></div>}
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Monto</label><input type="number" className="input" value={form.monto} onChange={e=>setForm({...form,monto:e.target.value})} required/></div><div><label className="label">Fecha</label><input type="date" className="input" value={form.fechaPago} onChange={e=>setForm({...form,fechaPago:e.target.value})} required/></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Método</label><select className="input" value={form.metodoPago} onChange={e=>setForm({...form,metodoPago:e.target.value})}><option>EFECTIVO</option><option>TRANSFERENCIA</option><option>CHEQUE</option><option>TARJETA</option></select></div><div><label className="label">Estado</label><select className="input" value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})}><option>PAGADO</option><option>PENDIENTE</option><option>VENCIDO</option></select></div></div>
          <div><label className="label">Concepto</label><input className="input" value={form.concepto} onChange={e=>setForm({...form,concepto:e.target.value})}/></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={()=>setOpen(false)} className="btn btn-outline flex-1">Cancelar</button><button type="submit" className="btn btn-primary flex-1">{edit?'Guardar':'Registrar'}</button></div>
        </form></div></div>}
    </div>
  )
}
