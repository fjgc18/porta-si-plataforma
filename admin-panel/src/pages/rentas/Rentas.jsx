import { useState, useEffect } from 'react'
import { getRentas, createRenta, updateRenta, deleteRenta, getClientes, getInmuebles } from '../../services/endpoints'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { formatMoney, formatDate } from '../../utils/formatters'
import toast from 'react-hot-toast'

export default function Rentas() {
  const [data, setData] = useState([])
  const [clientes, setClientes] = useState([])
  const [inmuebles, setInmuebles] = useState([])
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ idInmueble:'', idCliente:'', fechaInicio:'', fechaFin:'', pagoMensual:'', deposito:'', observaciones:'' })
  const load = () => getRentas().then(r => setData(r.data.data))
  useEffect(() => { load(); getClientes().then(r=>setClientes(r.data.data)); getInmuebles({size:100}).then(r=>setInmuebles(r.data.data?.content||[])) }, [])
  const resetForm = () => setForm({ idInmueble:'', idCliente:'', fechaInicio:'', fechaFin:'', pagoMensual:'', deposito:'', observaciones:'' })
  const openNew = () => { resetForm(); setEdit(null); setOpen(true) }
  const openEdit = r => { setForm({ idInmueble:r.idInmueble||'', idCliente:r.idCliente||'', fechaInicio:r.fechaInicio||'', fechaFin:r.fechaFin||'', pagoMensual:r.pagoMensual||'', deposito:r.deposito||'', observaciones:r.observaciones||'' }); setEdit(r); setOpen(true) }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {...form, pagoMensual:Number(form.pagoMensual), deposito:form.deposito?Number(form.deposito):0}
      if (edit) { await updateRenta(edit.id, payload); toast.success('Renta actualizada') }
      else { await createRenta(payload); toast.success('Renta registrada') }
      setOpen(false); load()
    } catch (err) { toast.error(err.response?.data?.message||'Error') }
  }
  const handleDelete = async id => { if (!confirm('¿Eliminar esta renta?')) return; try { await deleteRenta(id); load(); toast.success('Renta eliminada') } catch(err) { toast.error(err.response?.data?.message||'Error al eliminar') } }
  const badge = { ACTIVO:'badge-green', VENCIDO:'badge-red', CANCELADO:'badge-gray', RENOVADO:'badge-blue' }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white">Rentas</h1><p className="text-sm text-slate-500">Contratos de arrendamiento</p></div>
        <button onClick={()=>{resetForm();setOpen(true)}} className="btn btn-primary"><Plus size={16}/> Nuevo Contrato</button>
      </div>
      <div className="table-wrap"><table><thead><tr><th>Folio</th><th>Inmueble</th><th>Cliente</th><th>Agente</th><th>Mensual</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>{data.map(r=><tr key={r.id}><td className="text-primary-400 font-mono text-xs">{r.folio}</td><td className="text-white">{r.inmueble}</td><td className="text-slate-400">{r.cliente}</td><td className="text-slate-400">{r.agente}</td><td className="text-emerald-400 font-medium">{formatMoney(r.pagoMensual)}</td><td className="text-slate-500 text-xs">{formatDate(r.fechaInicio)}</td><td className="text-slate-500 text-xs">{formatDate(r.fechaFin)}</td><td><span className={`badge ${badge[r.estadoContrato]||'badge-gray'}`}>{r.estadoContrato}</span></td><td className="flex gap-2"><button onClick={()=>openEdit(r)} className="btn btn-ghost p-2"><Edit size={15}/></button><button onClick={()=>handleDelete(r.id)} className="btn btn-ghost p-2 text-red-400"><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
      {open&&<div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setOpen(false)}><div className="modal"><h3 className="text-lg font-semibold text-white mb-4">{edit?'Editar':'Nuevo'} Contrato de Renta</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="label">Inmueble</label><select className="input" value={form.idInmueble} onChange={e=>setForm({...form,idInmueble:e.target.value})} required={!edit}><option value="">Seleccionar</option>{inmuebles.filter(i=>i.estado==='Disponible').map(i=><option key={i.id} value={i.id}>{i.titulo}</option>)}</select></div>
          <div><label className="label">Cliente</label><select className="input" value={form.idCliente} onChange={e=>setForm({...form,idCliente:e.target.value})} required={!edit}><option value="">Seleccionar</option>{clientes.map(c=><option key={c.id} value={c.id}>{c.nombre} {c.apellidos}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Fecha Inicio</label><input type="date" className="input" value={form.fechaInicio} onChange={e=>setForm({...form,fechaInicio:e.target.value})} required/></div><div><label className="label">Fecha Fin</label><input type="date" className="input" value={form.fechaFin} onChange={e=>setForm({...form,fechaFin:e.target.value})} required/></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Pago Mensual</label><input type="number" className="input" value={form.pagoMensual} onChange={e=>setForm({...form,pagoMensual:e.target.value})} required/></div><div><label className="label">Depósito</label><input type="number" className="input" value={form.deposito} onChange={e=>setForm({...form,deposito:e.target.value})}/></div></div>
          <div><label className="label">Observaciones</label><textarea className="input" rows={2} value={form.observaciones} onChange={e=>setForm({...form,observaciones:e.target.value})}/></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={()=>setOpen(false)} className="btn btn-outline flex-1">Cancelar</button><button type="submit" className="btn btn-primary flex-1">{edit?'Guardar':'Registrar'}</button></div>
        </form></div></div>}
    </div>
  )
}
