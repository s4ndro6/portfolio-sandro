/* ============================================================
   AAZ Portfolio V4 — App Root
   BrowserRouter + AnimatePresence + Cursor + Navbar + StatusBar
   ============================================================ */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Cursor from './components/layout/Cursor'
import Navbar from './components/layout/Navbar'
import StatusBar from './components/layout/StatusBar'
import NoiseOverlay from './components/layout/NoiseOverlay'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  useLenis()
  return (
    <>
      <NoiseOverlay />
      <Cursor />
      <Navbar />
      <AnimatedRoutes />
      <StatusBar />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
