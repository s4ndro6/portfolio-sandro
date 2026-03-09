import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  immediate?: boolean
}

export default function TextReveal({ children, delay = 0, duration = 0.9, immediate = false }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const animate = () => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)', y: 40, opacity: 1 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration, delay, ease: 'power4.out' }
      )
    }

    if (immediate) {
      animate()
    } else {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: animate,
      })
    }
  }, [delay, duration, immediate])

  return (
    <div ref={ref} style={{ overflow: 'hidden', display: 'inherit', lineHeight: 'inherit' }}>
      {children}
    </div>
  )
}
