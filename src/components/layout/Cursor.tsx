/* ============================================================
   AAZ Portfolio V4 — Custom Cursor
   Crosshair + 8-clone trail, desktop only
   ============================================================ */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TRAIL_COUNT = 8

export default function Cursor() {
  const crosshairRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  const ringRef = useRef<HTMLDivElement>(null)
  const ringLabelRef = useRef<HTMLSpanElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const cursorStateRef = useRef<string>('')

  useEffect(() => {
    // Hidden on mobile
    if (window.matchMedia('(max-width: 768px)').matches) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }

      // Crosshair follows directly
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
      // Ring follows with slight delay
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: e.clientX,
          y: e.clientY,
          xPercent: -50,
          yPercent: -50,
          duration: 0.18,
          ease: 'power2.out',
        })
      }

      // Trail clones
      trailRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          x: e.clientX,
          y: e.clientY,
          xPercent: -50,
          yPercent: -50,
          duration: 0.1 + i * 0.045,
          ease: 'power2.out',
          delay: i * 0.02,
        })
      })

      // Detect cursor state
      const target = e.target as HTMLElement
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor') || ''
      if (cursorType !== cursorStateRef.current) {
        cursorStateRef.current = cursorType
        updateCursorState(cursorType)
      }
    }

    const updateCursorState = (type: string) => {
      if (!ringRef.current || !ringLabelRef.current || !crosshairRef.current) return
      const ring = ringRef.current
      const label = ringLabelRef.current
      const cross = crosshairRef.current

      // Reset
      ring.style.opacity = '0'
      ring.style.width = '0px'
      ring.style.height = '0px'
      label.textContent = ''
      cross.style.transform = cross.style.transform

      switch (type) {
        case 'view':
          ring.style.opacity = '1'
          ring.style.width = '80px'
          ring.style.height = '80px'
          ring.style.background = 'var(--accent-dim)'
          label.textContent = 'VIEW'
          break
        case 'drag':
          ring.style.opacity = '1'
          ring.style.width = '65px'
          ring.style.height = '65px'
          ring.style.background = 'transparent'
          label.textContent = 'DRAG →'
          break
        case 'copy':
          ring.style.opacity = '1'
          ring.style.width = '65px'
          ring.style.height = '65px'
          ring.style.background = 'transparent'
          label.textContent = 'COPY'
          break
        case 'link':
          ring.style.opacity = '0'
          gsap.to(cross, { scale: 1.8, duration: 0.25 })
          break
        default:
          ring.style.opacity = '0'
          gsap.to(cross, { scale: 1, duration: 0.25 })
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Crosshair */}
      <div
        ref={crosshairRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          pointerEvents: 'none',
          zIndex: 10001,
          willChange: 'transform',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="0" x2="10" y2="8" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="10" y1="12" x2="10" y2="20" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="0" y1="10" x2="8" y2="10" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="12" y1="10" x2="20" y2="10" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="1.5" fill="var(--accent)" />
        </svg>
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      >
        <span
          ref={ringLabelRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
          }}
        />
      </div>

      {/* Trail clones */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailRefs.current[i] = el }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 20,
            height: 20,
            pointerEvents: 'none',
            zIndex: 9999 - i,
            opacity: 1 - i * 0.11,
            transform: 'translate(-200px, -200px)',
            scale: String(1 - i * 0.06),
            willChange: 'transform',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.6 }}>
            <line x1="10" y1="0" x2="10" y2="8" stroke="var(--accent)" strokeWidth="1" />
            <line x1="10" y1="12" x2="10" y2="20" stroke="var(--accent)" strokeWidth="1" />
            <line x1="0" y1="10" x2="8" y2="10" stroke="var(--accent)" strokeWidth="1" />
            <line x1="12" y1="10" x2="20" y2="10" stroke="var(--accent)" strokeWidth="1" />
          </svg>
        </div>
      ))}
    </>
  )
}
