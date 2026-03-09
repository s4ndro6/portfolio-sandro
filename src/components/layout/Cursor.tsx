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

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

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

    const updateState = (type: string) => {
      if (!el || !labelRef.current) return
      if (type === 'view') {
        gsap.to(el, { width: 64, height: 64, background: 'var(--accent-dim)', duration: 0.3, ease: 'power2.out' })
        labelRef.current.style.opacity = '1'
      } else if (type === 'link') {
        gsap.to(el, { width: 8, height: 8, background: 'transparent', duration: 0.3, ease: 'power2.out' })
        labelRef.current.style.opacity = '0'
      } else {
        gsap.to(el, { width: 36, height: 36, background: 'transparent', duration: 0.3, ease: 'power2.out' })
        labelRef.current.style.opacity = '0'
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
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid rgba(240,237,230,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 'var(--z-cursor)' as unknown as number,
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
          fontSize: 9,
          letterSpacing: '0.1em',
          color: 'var(--text-0)',
          textTransform: 'uppercase',
          opacity: 0,
          transition: 'opacity 0.2s',
          userSelect: 'none',
        }}
      >
        VIEW
      </span>
    </div>
  )
}
