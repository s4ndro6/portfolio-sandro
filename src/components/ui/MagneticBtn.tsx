import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticBtnProps {
  children: ReactNode
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  as?: 'button' | 'a'
  href?: string
  target?: string
}

export default function MagneticBtn({ children, style, className, onClick, as: Tag = 'button', href, target }: MagneticBtnProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

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
    ;(el as typeof el & { _clean?: () => void })._clean = () => el.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    ;(el as typeof el & { _clean?: () => void })._clean?.()
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
  }

  const commonProps = {
    ref,
    className,
    style: { display: 'inline-block', background: 'none', border: 'none', padding: 0, ...style },
    onMouseEnter,
    onMouseLeave,
    'data-cursor': 'link',
  }

  if (Tag === 'a') {
    return (
      <a {...commonProps} href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    )
  }

  return (
    <button {...commonProps} onClick={onClick}>
      {children}
    </button>
  )
}
