import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

const Loader = ({ onComplete }: LoaderProps) => {
  const panelTopRef = useRef<HTMLDivElement>(null)
  const panelBotRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Sécurité : onComplete quand même après 2.5s
    const fallback = setTimeout(() => onComplete(), 2500)

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(fallback)
        onComplete()
      },
    })

    // Étape 1 : ligne accent — 0.5s
    tl.to(lineRef.current, {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: 0.5,
      ease: 'power4.out',
    })

    // Étape 2 : nom — 0.5s
    tl.fromTo(
      nameRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power4.out' },
      '-=0.1'
    )

    // Étape 3 : pause — 0.2s
    tl.to({}, { duration: 0.2 })

    // Étape 4 : panels verts s'ouvrent — 0.5s
    tl.to(panelTopRef.current, {
      clipPath: 'inset(0% 0 100% 0)',
      duration: 0.5,
      ease: 'power4.in',
    })
    tl.to(
      panelBotRef.current,
      { clipPath: 'inset(100% 0 0% 0)', duration: 0.5, ease: 'power4.in' },
      '<'
    )

    return () => clearTimeout(fallback)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'var(--bg-0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Panel vert haut — commence plein, s'ouvre vers le haut */}
      <div
        ref={panelTopRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#C8FF00',
          zIndex: 2,
          clipPath: 'inset(0% 0 0% 0)',
        }}
      />

      {/* Panel vert bas — commence plein, s'ouvre vers le bas */}
      <div
        ref={panelBotRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#C8FF00',
          zIndex: 2,
          clipPath: 'inset(0% 0 0% 0)',
        }}
      />

      {/* Contenu centre */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        <div
          ref={lineRef}
          style={{
            width: 60,
            height: 1,
            background: 'var(--accent)',
            margin: '0 auto 20px',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
          }}
        />
        <span
          ref={nameRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 10vw, 80px)',
            color: 'var(--text-0)',
            display: 'block',
            letterSpacing: '-0.04em',
            clipPath: 'inset(0 100% 0 0)',
          }}
        >
          Sandro
        </span>
      </div>
    </div>
  )
}

export default Loader
