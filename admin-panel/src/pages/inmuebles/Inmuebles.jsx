import { useState, useEffect } from 'react'
import { getInmuebles, createInmueble, updateInmueble, deleteInmueble, getTipos, getEstados, togglePublicado } from '../../services/endpoints'
import { assetUrl } from '../../services/api'
import { Plus, Edit, Trash2, Eye, EyeOff, Search, ImagePlus, X } from 'lucide-react'
import { formatMoney } from '../../utils/formatters'
import toast from 'react-hot-toast'

export default function Inmuebles() {
  const [data, setData] = useState([])
  const [tipos, setTipos] = useState([])
  const [estados, setEstados] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)
  const [imageModal, setImageModal] = useState(null)
  const [file, setFile] = useState(null)
  const [form, setForm] = useState({ titulo:'', descripcion:'', direccion:'', ciudad:'', estadoGeo:'Sonora', idTipo:'', idEstado:'', precio:'', metrosCuadrados:'', habitaciones:'', banos:'', estacionamientos:'', publicado:false })
  const load = () => getInmuebles({page:0,size:50}).then(r => setData(r.data.data?.content||[]))
  useEffect(() => { load(); getTipos().then(r=>setTipos(r.data.data)); getEstados().then(r=>setEstados(r.data.data)) }, [])
  const resetForm = () => setForm({ titulo:'', descripcion:'', direccion:'', ciudad:'', estadoGeo:'Sonora', idTipo:'', idEstado:'', precio:'', metrosCuadrados:'', habitaciones:'', banos:'', estacionamientos:'', publicado:false })
  const openNew = () => { resetForm(); setEdit(null); setOpen(true) }
  const openEdit = i => { setForm({ titulo:i.titulo, descripcion:i.descripcion||'', direccion:i.direccion||'', ciudad:i.ciudad, estadoGeo:i.estadoGeo, idTipo:tipos.find(t=>t.nombre===i.tipo)?.id||'', idEstado:estados.find(e=>e.nombre===i.estado)?.id||'', precio:i.precio, metrosCuadrados:i.metrosCuadrados||'', habitaciones:i.habitaciones||'', banos:i.banos||'', estacionamientos:i.estacionamientos||'', publicado:i.publicado }); setEdit(i); setOpen(true) }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {...form, precio: Number(form.precio), metrosCuadrados: form.metrosCuadrados ? Number(form.metrosCuadrados) : null, habitaciones: form.habitaciones ? Number(form.habitaciones) : null, banos: form.banos ? Number(form.banos) : null, estacionamientos: form.estacionamientos ? Number(form.estacionamientos) : null}
      if (edit) { await updateInmueble(edit.id, payload); toast.success('Actualizado') }
      else { await createInmueble(payload); toast.success('Registrado') }
      setOpen(false); load()
    } catch (err) { toast.error(err.response?.data?.message||'Error') }
  }
  const handleDelete = async id => { if(!confirm('¿Eliminar?')) return; await deleteInmueble(id); load(); toast.success('Eliminado') }
  const handleToggle = async id => { await togglePublicado(id); load(); toast.success('Publicación actualizada') }
  const handleImageUpload = async e => {
    e.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    try {
      await import('../../services/endpoints').then(m => m.uploadImagen(imageModal.id, formData))
      toast.success('Imagen subida')
      setImageModal(null); setFile(null); load()
    } catch (err) { toast.error(err.response?.data?.message||'Error al subir imagen') }
  }
  const handleDeleteImagen = async (imgId) => {
    if(!confirm('¿Eliminar imagen?')) return
    try {
      await import('../../services/endpoints').then(m => m.deleteImagen(imgId))
      toast.success('Imagen eliminada')
      setImageModal(null); load()
    } catch (err) { toast.error('Error al eliminar') }
  }
  const filtered = data.filter(i => i.titulo.toLowerCase().includes(search.toLowerCase()))
  const estadoBadge = { Disponible:'badge-green', Reservado:'badge-gold', Vendido:'badge-red', Rentado:'badge-blue' }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white">Inmuebles</h1><p className="text-sm text-slate-500">Gestión de propiedades</p></div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16}/> Nuevo</button>
      </div>
      <div className="relative mb-4"><Search size={16} className="absolute left-3 top-3 text-slate-500"/><input className="input pl-10 max-w-sm" placeholder="Buscar inmueble..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <div className="table-wrap"><table><thead><tr><th>Título</th><th>Tipo</th><th>Ciudad</th><th>Precio</th><th>Estado</th><th>Pub.</th><th>Acciones</th></tr></thead>
        <tbody>{filtered.map(i=><tr key={i.id}><td className="text-white font-medium max-w-[200px] truncate">{i.titulo}</td><td className="text-slate-400">{i.tipo}</td><td className="text-slate-400">{i.ciudad}</td><td className="text-emerald-400 font-medium">{formatMoney(i.precio)}</td><td><span className={`badge ${estadoBadge[i.estado]||'badge-gray'}`}>{i.estado}</span></td><td>{i.publicado?<Eye size={16} className="text-emerald-400"/>:<EyeOff size={16} className="text-slate-600"/>}</td><td className="flex gap-1"><button onClick={()=>setImageModal(i)} className="btn btn-ghost p-2 text-blue-400"><ImagePlus size={15}/></button><button onClick={()=>openEdit(i)} className="btn btn-ghost p-2"><Edit size={15}/></button><button onClick={()=>handleToggle(i.id)} className="btn btn-ghost p-2"><Eye size={15}/></button><button onClick={()=>handleDelete(i.id)} className="btn btn-ghost p-2 text-red-400"><Trash2 size={15}/></button></td></tr>)}</tbody></table></div>
      {open&&<div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setOpen(false)}><div className="modal max-w-2xl"><h3 className="text-lg font-semibold text-white mb-4">{edit?'Editar':'Nuevo'} Inmueble</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="label">Título</label><input className="input" value={form.titulo} onChange={e=>setForm({...form,titulo:e.target.value})} required/></div>
          <div><label className="label">Descripción</label><textarea className="input" rows={2} value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})}/></div>
          <div><label className="label">Dirección</label><input className="input" value={form.direccion} onChange={e=>setForm({...form,direccion:e.target.value})}/></div>
          <div className="grid grid-cols-3 gap-3"><div><label className="label">Ciudad</label><input className="input" value={form.ciudad} onChange={e=>setForm({...form,ciudad:e.target.value})} required/></div><div><label className="label">Estado</label><input className="input" value={form.estadoGeo} onChange={e=>setForm({...form,estadoGeo:e.target.value})} required/></div><div><label className="label">Precio</label><input type="number" className="input" value={form.precio} onChange={e=>setForm({...form,precio:e.target.value})} required/></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Tipo</label><select className="input" value={form.idTipo} onChange={e=>setForm({...form,idTipo:e.target.value})} required><option value="">Seleccionar</option>{tipos.map(t=><option key={t.id} value={t.id}>{t.nombre}</option>)}</select></div><div><label className="label">Estado Inmueble</label><select className="input" value={form.idEstado} onChange={e=>setForm({...form,idEstado:e.target.value})} required><option value="">Seleccionar</option>{estados.map(e=><option key={e.id} value={e.id}>{e.nombre}</option>)}</select></div></div>
          <div className="grid grid-cols-4 gap-3"><div><label className="label">m²</label><input type="number" className="input" value={form.metrosCuadrados} onChange={e=>setForm({...form,metrosCuadrados:e.target.value})}/></div><div><label className="label">Habitaciones</label><input type="number" className="input" value={form.habitaciones} onChange={e=>setForm({...form,habitaciones:e.target.value})}/></div><div><label className="label">Baños</label><input type="number" className="input" value={form.banos} onChange={e=>setForm({...form,banos:e.target.value})}/></div><div><label className="label">Estac.</label><input type="number" className="input" value={form.estacionamientos} onChange={e=>setForm({...form,estacionamientos:e.target.value})}/></div></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={()=>setOpen(false)} className="btn btn-outline flex-1">Cancelar</button><button type="submit" className="btn btn-primary flex-1">Guardar</button></div>
        </form></div></div>}
      
      {imageModal&&<div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setImageModal(null)}><div className="modal max-w-lg"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold text-white">Gestión de Imágenes</h3><button onClick={()=>setImageModal(null)} className="text-slate-400 hover:text-white"><X size={20}/></button></div>
        <p className="text-sm text-slate-400 mb-4">{imageModal.titulo}</p>
        
        {imageModal.imagenes?.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {imageModal.imagenes.map(img => (
              <div key={img.id} className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-800 aspect-video">
                <img src={assetUrl(img.url)} className="w-full h-full object-cover" alt="inmueble" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <button type="button" onClick={()=>handleDeleteImagen(img.id)} className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-slate-500 mb-6 text-center py-4 border border-dashed border-slate-700 rounded-lg">No hay imágenes agregadas</p>}

        <form onSubmit={handleImageUpload} className="space-y-4 pt-4 border-t border-slate-800">
          <div>
            <label className="label">Agregar nueva imagen</label>
            <input type="file" accept="image/*" className="input" onChange={e=>setFile(e.target.files[0])} required/>
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={!file}>Subir Imagen</button>
        </form>
      </div></div>}
    </div>
  )
}
