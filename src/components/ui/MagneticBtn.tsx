/* ============================================================
   AAZ Portfolio V4 — MagneticBtn
   Magnetic hover effect with elastic return
   ============================================================ */

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticBtnProps {
  children: ReactNode
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
}

export default function MagneticBtn({ children, style, className, onClick }: MagneticBtnProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const onMouseEnter = () => {
    const el = ref.current
    if (!el) return
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const offsetX = e.clientX - rect.left - rect.width / 2
      const offsetY = e.clientY - rect.top - rect.height / 2
      gsap.to(el, { x: offsetX * 0.35, y: offsetY * 0.35, duration: 0.4, ease: 'power2.out' })
    }
    el.addEventListener('mousemove', onMouseMove)
    ;(el as HTMLButtonElement & { _clean?: () => void })._clean = () => el.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    ;(el as HTMLButtonElement & { _clean?: () => void })._clean?.()
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <button
      ref={ref}
      className={className}
      style={{ display: 'inline-block', background: 'none', border: 'none', padding: 0, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      data-cursor="link"
    >
      {children}
    </button>
  )
}
