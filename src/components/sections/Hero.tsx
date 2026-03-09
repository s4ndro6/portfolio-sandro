import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltPhoto from '../ui/TiltPhoto'
import HeroParticles from '../three/HeroParticles'

interface HeroProps {
  isLoaded: boolean
}

const PILLS = ['● IA & Automation', '● Motion Design', '● Web Dev']

export default function Hero({ isLoaded }: HeroProps) {
  const labelRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLDivElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isLoaded) return
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(labelRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })

    if (h1Ref.current) {
      const lines = h1Ref.current.querySelectorAll('.h1-line')
      tl.fromTo(
        lines,
        { clipPath: 'inset(0 0 100% 0)', y: 50 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1, stagger: 0.12, ease: 'power4.out' },
        '-=0.2'
      )
    }

    tl.fromTo(separatorRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out', transformOrigin: 'left' }, '-=0.3')

    tl.fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.2')

    if (pillsRef.current) {
      tl.fromTo(
        pillsRef.current.children,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      )
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
        '-=0.3'
      )
    }

    tl.fromTo(
      photoRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
      0.4
    )

    // Scroll parallax
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (photoRef.current) {
          gsap.set(photoRef.current, { y: self.progress * 80, opacity: 1 - self.progress * 0.4 })
        }
        if (h1Ref.current) {
          gsap.set(h1Ref.current, { y: self.progress * -40 })
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
        alignItems: 'center',
        padding: '0 80px',
        overflow: 'hidden',
      }}
    >
      <HeroParticles />

      {/* Left column */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingRight: '3rem',
        }}
      >
        {/* Label */}
        <div
          ref={labelRef}
          className="label"
          style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          CRÉATION × AUTOMATISATION × DESIGN
        </div>

        {/* H1 */}
        <div ref={h1Ref}>
          <div
            className="h1-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(64px, 10vw, 160px)',
              color: 'var(--text-0)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              clipPath: 'inset(0 0 100% 0)',
            }}
          >
            SANDRO
          </div>
          <div
            className="h1-line outline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(64px, 10vw, 160px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              clipPath: 'inset(0 0 100% 0)',
            }}
          >
            SCHILLACI
          </div>
        </div>

        {/* Separator */}
        <div
          ref={separatorRef}
          style={{
            width: 60,
            height: 1,
            background: 'var(--accent)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 18,
            color: 'var(--text-0)',
            opacity: 0,
            maxWidth: 400,
            lineHeight: 1.7,
          }}
        >
          Designer créatif & développeur IA basé à Lille.
        </p>

        {/* Pills */}
        <div
          ref={pillsRef}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}
        >
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
        <div ref={buttonsRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/projets"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--bg-0)',
              background: 'var(--accent)',
              padding: '12px 28px',
              display: 'inline-block',
              opacity: 0,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            VOIR MES PROJETS →
          </Link>
          <a
            href="#about"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--text-0)',
              border: '1px solid var(--text-2)',
              padding: '12px 28px',
              display: 'inline-block',
              opacity: 0,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-0)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-2)' }}
          >
            ALTERNANCE B2 ↓
          </a>
        </div>
      </div>

      {/* Right column — photo */}
      <div
        ref={photoRef}
        style={{
          height: '80vh',
          opacity: 0,
          position: 'relative',
          zIndex: 1,
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
