import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const circleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const stateRef = useRef<string>('')

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const el = circleRef.current
    if (!el) return

    // lerp ~0.1 → duration 0.3
    const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' })

    const updateState = (type: string) => {
      if (!el || !labelRef.current) return
      if (type === 'view') {
        gsap.to(el, { width: 80, height: 80, background: 'var(--accent-dim)', duration: 0.3, ease: 'power2.out' })
        labelRef.current.textContent = 'VIEW'
        labelRef.current.style.opacity = '1'
      } else if (type === 'drag') {
        gsap.to(el, { width: 64, height: 64, background: 'var(--accent-dim)', duration: 0.3, ease: 'power2.out' })
        labelRef.current.textContent = 'DRAG →'
        labelRef.current.style.opacity = '1'
      } else if (type === 'link') {
        gsap.to(el, { width: 12, height: 12, background: 'var(--text-0)', duration: 0.2, ease: 'power2.out' })
        labelRef.current.style.opacity = '0'
      } else {
        gsap.to(el, { width: 32, height: 32, background: 'transparent', duration: 0.3, ease: 'power2.out' })
        labelRef.current.style.opacity = '0'
      }
    }

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)

      const target = e.target as HTMLElement
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor') ?? ''
      const isInteractive = !!target.closest('a, button, [data-magnetic]')

      const newState = cursorType || (isInteractive ? 'link' : '')
      if (newState !== stateRef.current) {
        stateRef.current = newState
        updateState(newState)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="cursor"
      ref={circleRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '1px solid rgba(240,237,230,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-200px, -200px)',
        xPercent: -50,
        yPercent: -50,
        willChange: 'transform',
        transition: 'border-color 0.3s',
      } as React.CSSProperties}
    >
      <span
        ref={labelRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          letterSpacing: '0.1em',
          color: 'var(--text-0)',
          textTransform: 'uppercase',
          opacity: 0,
          transition: 'opacity 0.2s',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        VIEW
      </span>
    </div>
  )
}
