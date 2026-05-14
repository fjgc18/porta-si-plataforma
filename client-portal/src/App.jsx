import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import Landing from './pages/Landing'
import Catalogo from './pages/Catalogo'
import Detalle from './pages/Detalle'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout/>}>
        <Route index element={<Landing/>}/>
        <Route path="catalogo" element={<Catalogo/>}/>
        <Route path="nosotros" element={<Nosotros/>}/>
        <Route path="catalogo/:id" element={<Detalle/>}/>
        <Route path="contacto" element={<Contacto/>}/>
      </Route>
    </Routes>
  )
}
