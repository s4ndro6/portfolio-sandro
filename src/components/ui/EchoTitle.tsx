import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface EchoTitleProps {
  sectionRef: React.RefObject<HTMLElement | null>
  line1Ref: React.RefObject<HTMLSpanElement | null>
  line2Ref: React.RefObject<HTMLSpanElement | null>
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: 'clamp(52px, 10vw, 160px)',
  lineHeight: 0.88,
  letterSpacing: '-0.04em',
  whiteSpace: 'nowrap',
  display: 'block',
}

export default function EchoTitle({ sectionRef, line1Ref, line2Ref }: EchoTitleProps) {
  const echoRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = sectionRef.current
    if (!trigger) return

    // Écho monte plus vite — profondeur
    const st1 = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 2.5,
      onUpdate: (self) => {
        if (echoRef.current) gsap.set(echoRef.current, { y: self.progress * -40 })
      },
    })

    // Titre principal monte lentement
    const st2 = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 3.5,
      onUpdate: (self) => {
        if (mainRef.current) gsap.set(mainRef.current, { y: self.progress * -15 })
      },
    })

    return () => {
      st1.kill()
      st2.kill()
    }
  }, [sectionRef])

  return (
    <div style={{ position: 'relative', marginBottom: 28 }}>
      {/* ÉCHO — décalé bas-droite, parallax rapide */}
      <div
        ref={echoRef}
        className="echo-title"
        style={{
          position: 'absolute',
          top: 30,
          left: 40,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          willChange: 'transform',
        }}
      >
        <span style={{
          ...titleStyle,
          WebkitTextStroke: '1px rgba(240,237,230,0.18)',
          color: 'transparent',
        }}>
          SANDRO
        </span>
        <span style={{
          ...titleStyle,
          WebkitTextStroke: '1px rgba(240,237,230,0.10)',
          color: 'transparent',
        }}>
          SCHILLACI
        </span>
      </div>

      {/* TITRE PRINCIPAL — avant-plan, parallax lent */}
      <div ref={mainRef} style={{ position: 'relative', zIndex: 2, willChange: 'transform' }}>
        <div style={{ overflow: 'hidden' }}>
          <span ref={line1Ref} className="hero-line" style={{ color: 'var(--text-0)' }}>
            SANDRO
          </span>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <span
            ref={line2Ref}
            className="hero-line"
            style={{ WebkitTextStroke: '1.5px var(--text-0)', color: 'transparent' }}
          >
            SCHILLACI
          </span>
        </div>
      </div>
    </div>
  )
}
