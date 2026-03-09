/* ============================================================
   AAZ Portfolio V4 — BootLoader
   Terminal boot sequence → clip-path split reveal
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface BootLoaderProps {
  onComplete: () => void
}

const LINES = [
  'AAZ_SYSTEM — Alessandro Schillaci',
  '──────────────────────────────────────',
  '> Chargement interface...     ██████████ 100%',
  '> IA Engine (Ollama/Groq)...  ██████████ ONLINE ✓',
  '> Motion & 3D (Three.js)...   ██████████ ONLINE ✓',
  '> Automation (n8n/Python)...  ██████████ ONLINE ✓',
  '──────────────────────────────────────',
  'SYSTÈME PRÊT. Bienvenue, Alessandro.',
]

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < LINES.length) {
        setVisibleLines(prev => [...prev, LINES[i]])
        i++
      } else {
        clearInterval(interval)
        setDone(true)
      }
    }, 300)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!done) return
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      })
      tl.to(leftRef.current, { x: '-100%', duration: 0.6, ease: 'power4.in' }, 0)
        .to(rightRef.current, { x: '100%', duration: 0.6, ease: 'power4.in' }, 0)
        .to(containerRef.current, { opacity: 0, duration: 0.15 }, 0.55)
    }, 400)
    return () => clearTimeout(timer)
  }, [done, onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#020804',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Left panel */}
      <div
        ref={leftRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: '#020804',
          zIndex: 2,
        }}
      />
      {/* Right panel */}
      <div
        ref={rightRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: '#020804',
          zIndex: 2,
        }}
      />

      {/* Terminal content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: '#00FF88',
          lineHeight: 1.8,
          padding: '2rem',
          maxWidth: '540px',
          width: '100%',
        }}
      >
        {visibleLines.map((line, idx) => (
          <div
            key={idx}
            style={{
              opacity: idx === visibleLines.length - 1 && !done ? 0.9 : 0.7,
              color: line.startsWith('AAZ_SYSTEM') || line.startsWith('SYSTÈME')
                ? '#00FF88'
                : line.startsWith('─')
                ? 'rgba(0,255,136,0.3)'
                : '#00FF88',
              fontWeight: line.startsWith('SYSTÈME') ? 500 : 400,
            }}
          >
            {line}
            {idx === visibleLines.length - 1 && !done && (
              <span className="cursor-blink" style={{ marginLeft: 4 }}>█</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
