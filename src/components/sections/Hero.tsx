import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltPhoto from '../ui/TiltPhoto'
import EchoTitle from '../ui/EchoTitle'
import InteractiveBackground from '../layout/InteractiveBackground'

interface HeroProps {
  isLoaded: boolean
}

const PILLS = ['● IA & Automation', '● Motion Design', '● Web Dev']

export default function Hero({ isLoaded }: HeroProps) {
  const labelRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Mouse scrub global — écho + photo micro-rotation (subtil)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      const echo = document.querySelector<HTMLElement>('.echo-title')
      if (echo) {
        gsap.to(echo, { x: x * 8, y: y * 6, duration: 4.0, ease: 'power2.out' })
      }
      if (photoRef.current) {
        gsap.to(photoRef.current, { rotateY: x * 3, rotateX: y * -2, duration: 3.5, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Animations onLoaded — lentes et confiantes
  useEffect(() => {
    if (!isLoaded) return

    const tl = gsap.timeline()

    // 1. Label + Ligne 1 — partent ensemble
    tl.from(labelRef.current, { y: 14, opacity: 0, duration: 0.8, ease: 'power3.out' })
    tl.from(line1Ref.current, { y: '105%', duration: 0.9, ease: 'power4.out' }, '-=0.7')

    // 2. Ligne 2
    tl.from(line2Ref.current, { y: '105%', duration: 0.9, ease: 'power4.out' }, '-=0.7')

    // 3. Séparateur + desc en même temps
    tl.from(separatorRef.current, {
      scaleX: 0, transformOrigin: 'left', duration: 0.7, ease: 'power3.out',
    }, '-=0.5')
    tl.from(descRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')

    // 4. Pills + boutons + photo — tous ensemble
    const pillEls = pillsRef.current ? Array.from(pillsRef.current.children) : []
    tl.from(pillEls, { y: 14, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }, '-=0.6')

    const btnEls = buttonsRef.current ? Array.from(buttonsRef.current.children) : []
    tl.from(btnEls, { y: 12, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }, '-=0.6')

    tl.from(photoRef.current, {
      x: 50, opacity: 0, duration: 1.2, ease: 'power3.out',
      clipPath: 'inset(0 100% 0 0)',
    }, '-=0.8')

    // 5. Écho discret — commence avec la photo
    tl.from('.echo-title', { opacity: 0, duration: 1.0, ease: 'power2.out' }, '-=1.0')

    // 6. Scroll indicator
    tl.from(scrollRef.current, { opacity: 0, y: 10, duration: 0.7, ease: 'power2.out' }, '-=0.5')

    // Scroll parallax
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (photoRef.current) {
          gsap.set(photoRef.current, { y: self.progress * 80, opacity: 1 - self.progress * 0.5 })
        }
        if (scrollRef.current) {
          gsap.set(scrollRef.current, { opacity: 1 - self.progress * 3 })
        }
      },
    })
  }, [isLoaded])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100svh',
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
        alignItems: 'end',
        padding: '0 clamp(32px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      <InteractiveBackground />

      {/* Left column */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingRight: '3rem',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
        }}
      >
        {/* Label */}
        <div
          ref={labelRef}
          className="label"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent)', display: 'inline-block',
          }} />
          LILLE, FRANCE · CRÉATEUR IA
        </div>

        {/* Titre avec écho */}
        <EchoTitle sectionRef={sectionRef} line1Ref={line1Ref} line2Ref={line2Ref} />

        {/* Separator */}
        <div
          ref={separatorRef}
          style={{ width: 60, height: 1, background: 'var(--accent)', transformOrigin: 'left' }}
        />

        {/* Subtitle */}
        <p
          ref={descRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 18,
            color: 'var(--text-0)',
            maxWidth: 420,
            lineHeight: 1.7,
          }}
        >
          Systèmes qui automatisent. Designs qui marquent. Expériences qui restent.
        </p>

        {/* Pills */}
        <div ref={pillsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {PILLS.map(pill => (
            <span
              key={pill}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                color: 'var(--text-1)',
                border: '1px solid var(--text-2)',
                padding: '5px 12px',
                borderRadius: 2,
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link
            to="/projets"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 600,
              color: '#0C0C0A',
              background: 'var(--accent)',
              padding: '13px 28px',
              display: 'inline-block',
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            MES PROJETS →
          </Link>
          <a
            href="/cv.pdf"
            download="CV_Alessandro_Schillaci.pdf"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--text-0)',
              border: '1px solid var(--text-2)',
              padding: '13px 28px',
              display: 'inline-block',
              transition: 'border-color 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-0)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-2)' }}
          >
            ALTERNANCE B2 ↓
          </a>
        </div>
      </div>

      {/* Right column — photo, collée en bas, sans height forcé */}
      <div
        ref={photoRef}
        className="hero-photo-wrap"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        <TiltPhoto />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 1,
        }}
      >
        <span className="label" style={{ writingMode: 'vertical-rl', letterSpacing: '0.18em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'var(--text-2)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-1)' }}>↓</span>
      </div>
    </section>
  )
}
