import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Work from './pages/Work'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Portal from './pages/Portal'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/work" element={<Work />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/portal" element={<Portal />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}
