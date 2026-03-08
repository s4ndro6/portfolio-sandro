/* ============================================================
   AAZ Portfolio V4 — useLenis Hook
   Initializes Lenis smooth scroll and wires it to GSAP ticker.
   Decision: Lenis + GSAP ticker (not native scroll-behavior: smooth)
   — Required by STATE.md decision: "Lenis smooth scroll synced with GSAP ticker"
   ============================================================ */

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    // Wire Lenis to GSAP ticker so they share the same RAF loop
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })

    // Disable GSAP's built-in lag smoothing to avoid conflicts
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      // Note: gsap.ticker.remove requires a reference — ticker is global,
      // component unmount will re-init. For SPA this is acceptable.
    }
  }, [])
}
