import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Single Lenis instance — useLenis hook is disabled to avoid double init
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
lenis.on('scroll', () => ScrollTrigger.update())

// Expose lenis globally so components can access it
;(window as typeof window & { lenis: Lenis }).lenis = lenis

window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
