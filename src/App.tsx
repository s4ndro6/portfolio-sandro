/* ============================================================
   AAZ Portfolio V4 — App Root
   BrowserRouter + Routes + useLenis smooth scroll
   ============================================================ */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'

function AppContent() {
  useLenis()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
