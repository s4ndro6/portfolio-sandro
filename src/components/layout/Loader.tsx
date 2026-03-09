import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Reveal name
    tl.fromTo(
      nameRef.current,
      { clipPath: 'inset(0 0 100% 0)', y: 20 },
      { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.8, ease: 'power4.out' }
    )
    // Hold
    .to({}, { duration: 0.6 })
    // Fade out
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete,
    })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-loader)' as unknown as number,
        background: 'var(--bg-0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={nameRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 72,
          color: 'var(--text-0)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        Sandro
      </div>
    </div>
  )
}
