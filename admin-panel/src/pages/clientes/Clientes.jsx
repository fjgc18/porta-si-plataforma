import { useState, useEffect } from 'react'
import { getClientes, createCliente, updateCliente, deleteCliente } from '../../services/endpoints'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { formatDate } from '../../utils/formatters'
import toast from 'react-hot-toast'

export default function Clientes() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ nombre:'', apellidos:'', email:'', telefono:'', direccion:'', rfc:'', tipoCliente:'COMPRADOR', notas:'' })
  const load = () => getClientes().then(r => setData(Array.isArray(r?.data?.data) ? r.data.data : [])).catch(e => { console.error(e); setData([]); toast.error('Error al cargar clientes'); })
  useEffect(() => { load() }, [])
  const resetForm = () => setForm({ nombre:'', apellidos:'', email:'', telefono:'', direccion:'', rfc:'', tipoCliente:'COMPRADOR', notas:'' })
  const openNew = () => { resetForm(); setEdit(null); setOpen(true) }
  const openEdit = c => { setForm({ nombre:c.nombre, apellidos:c.apellidos, email:c.email||'', telefono:c.telefono||'', direccion:c.direccion||'', rfc:c.rfc||'', tipoCliente:c.tipoCliente, notas:c.notas||'' }); setEdit(c); setOpen(true) }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (edit) { await updateCliente(edit.id, form); toast.success('Actualizado') }
      else { await createCliente(form); toast.success('Registrado') }
      setOpen(false); load()
    } catch (err) { toast.error(err.response?.data?.message || 'Error') }
  }
  const handleDelete = async id => { if (!confirm('¿Eliminar?')) return; await deleteCliente(id); load(); toast.success('Eliminado') }
  const filtered = (Array.isArray(data) ? data : []).filter(c => `${c?.nombre||''} ${c?.apellidos||''} ${c?.email||''}`.toLowerCase().includes((search||'').toLowerCase()))
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white">Clientes</h1><p className="text-sm text-slate-500">Gestión de clientes</p></div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16}/> Nuevo</button>
      </div>
      <div className="relative mb-4"><Search size={16} className="absolute left-3 top-3 text-slate-500"/><input className="input pl-10 max-w-sm" placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <div className="table-wrap"><table><thead><tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>RFC</th><th>Tipo</th><th>Acciones</th></tr></thead>
        <tbody>{filtered.map(c=><tr key={c.id}><td className="text-white font-medium">{c.nombre} {c.apellidos}</td><td className="text-slate-400">{c.email||'—'}</td><td className="text-slate-400">{c.telefono||'—'}</td><td className="text-slate-400 font-mono text-xs">{c.rfc||'—'}</td><td><span className={`badge ${c.tipoCliente==='COMPRADOR'?'badge-blue':c.tipoCliente==='ARRENDATARIO'?'badge-gold':'badge-green'}`}>{c.tipoCliente}</span></td><td className="flex gap-2"><button onClick={()=>openEdit(c)} className="btn btn-ghost p-2"><Edit size={15}/></button><button onClick={()=>handleDelete(c.id)} className="btn btn-ghost p-2 text-red-400"><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
      {open&&<div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setOpen(false)}><div className="modal"><h3 className="text-lg font-semibold text-white mb-4">{edit?'Editar':'Nuevo'} Cliente</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Nombre</label><input className="input" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} required/></div><div><label className="label">Apellidos</label><input className="input" value={form.apellidos} onChange={e=>setForm({...form,apellidos:e.target.value})} required/></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Email</label><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div><div><label className="label">Teléfono</label><input className="input" value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})}/></div></div>
          <div><label className="label">Dirección</label><input className="input" value={form.direccion} onChange={e=>setForm({...form,direccion:e.target.value})}/></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">RFC</label><input className="input" value={form.rfc} onChange={e=>setForm({...form,rfc:e.target.value})}/></div><div><label className="label">Tipo</label><select className="input" value={form.tipoCliente} onChange={e=>setForm({...form,tipoCliente:e.target.value})}><option value="COMPRADOR">Comprador</option><option value="ARRENDATARIO">Arrendatario</option><option value="AMBOS">Ambos</option></select></div></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={()=>setOpen(false)} className="btn btn-outline flex-1">Cancelar</button><button type="submit" className="btn btn-primary flex-1">Guardar</button></div>
        </form></div></div>}
    </div>
  )
}
