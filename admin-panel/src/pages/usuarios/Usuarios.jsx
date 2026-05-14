import { useState, useEffect } from 'react'
import { getUsuarios, createUsuario, updateUsuario, toggleUsuario, getRoles } from '../../services/endpoints'
import { Plus, Edit, Power } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Usuarios() {
  const [data, setData] = useState([])
  const [roles, setRoles] = useState([])
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ nombre: '', apellidos: '', email: '', username: '', telefono: '', password: '', idRol: '' })

  const load = () => { getUsuarios().then(r => setData(r.data.data)); getRoles().then(r => setRoles(r.data.data)) }
  useEffect(load, [])

  const resetForm = () => setForm({ nombre: '', apellidos: '', email: '', username: '', telefono: '', password: '', idRol: '' })
  const openNew = () => { resetForm(); setEdit(null); setOpen(true) }
  const openEdit = u => { setForm({ nombre: u.nombre, apellidos: u.apellidos, email: u.email, username: u.username, telefono: u.telefono || '', password: '', idRol: roles.find(r => r.nombre === u.rol)?.id || '' }); setEdit(u); setOpen(true) }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (edit) { await updateUsuario(edit.id, form); toast.success('Usuario actualizado') }
      else { await createUsuario(form); toast.success('Usuario creado') }
      setOpen(false); load()
    } catch (err) { toast.error(err.response?.data?.message || 'Error') }
  }

  const handleToggle = async id => { await toggleUsuario(id); load(); toast.success('Estado actualizado') }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white">Usuarios</h1><p className="text-sm text-slate-500">Gestión de usuarios del sistema</p></div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16} /> Nuevo</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Nombre</th><th>Email</th><th>Username</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {data.map(u => (
              <tr key={u.id}>
                <td className="text-white font-medium">{u.nombre} {u.apellidos}</td>
                <td className="text-slate-400">{u.email}</td>
                <td className="text-slate-400">{u.username}</td>
                <td><span className={`badge ${u.rol === 'ADMIN' ? 'badge-blue' : 'badge-gold'}`}>{u.rol}</span></td>
                <td><span className={`badge ${u.activo ? 'badge-green' : 'badge-red'}`}>{u.activo ? 'Activo' : 'Inactivo'}</span></td>
                <td className="flex gap-2">
                  <button onClick={() => openEdit(u)} className="btn btn-ghost p-2"><Edit size={15} /></button>
                  <button onClick={() => handleToggle(u.id)} className="btn btn-ghost p-2"><Power size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {open && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal">
            <h3 className="text-lg font-semibold text-white mb-4">{edit ? 'Editar' : 'Nuevo'} Usuario</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Nombre</label><input className="input" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required /></div>
                <div><label className="label">Apellidos</label><input className="input" value={form.apellidos} onChange={e => setForm({ ...form, apellidos: e.target.value })} required /></div>
              </div>
              <div><label className="label">Email</label><input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Username</label><input className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></div>
                <div><label className="label">Teléfono</label><input className="input" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} /></div>
              </div>
              <div><label className="label">Contraseña {edit && '(dejar vacío para no cambiar)'}</label><input type="password" className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} {...(!edit && { required: true })} /></div>
              <div><label className="label">Rol</label><select className="input" value={form.idRol} onChange={e => setForm({ ...form, idRol: e.target.value })} required>
                <option value="">Seleccionar...</option>
                {roles.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
              </select></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="btn btn-outline flex-1">Cancelar</button>
                <button type="submit" className="btn btn-primary flex-1">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
