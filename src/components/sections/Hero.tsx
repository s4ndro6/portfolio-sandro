/* ============================================================
   AAZ Portfolio V4 — Hero Section
   Full-viewport split: text left, photo right
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import TypeWriter from '../ui/TypeWriter'
import TiltPhoto from '../ui/TiltPhoto'

interface HeroProps {
  isLoaded: boolean
}

const PILLS = ['● Motion Design', '● IA Agents', '● Web Dev', '● Direction Art.']

export default function Hero({ isLoaded }: HeroProps) {
  const labelRef = useRef<HTMLDivElement>(null)
  const h1Line1Ref = useRef<HTMLHeadingElement>(null)
  const h1Line2Ref = useRef<HTMLHeadingElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const [startTypewriter, setStartTypewriter] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(labelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })

    tl.fromTo(
      h1Line1Ref.current,
      { clipPath: 'inset(0 0 100% 0)', y: 50 },
      { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1, ease: 'power4.out' },
      '-=0.2'
    )
    tl.fromTo(
      h1Line2Ref.current,
      { clipPath: 'inset(0 0 100% 0)', y: 50 },
      { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1, ease: 'power4.out' },
      '-=0.7'
    )

    tl.add(() => setStartTypewriter(true), '-=0.3')

    if (pillsRef.current) {
      const pills = pillsRef.current.children
      tl.fromTo(
        pills,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      )
    }

    tl.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
      '-=0.3'
    )

    tl.fromTo(
      photoRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.4
    )
  }, [isLoaded])

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: 28, // StatusBar height
      }}
    >
      {/* Left column */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingLeft: '2rem',
          paddingRight: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Label */}
        <div
          ref={labelRef}
          className="mono"
          style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span
            className="dot-pulse"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          SYSTÈME ACTIF — LILLE, FR
        </div>

        {/* H1 */}
        <div style={{ overflow: 'hidden', lineHeight: 0.9 }}>
          <h1
            ref={h1Line1Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(4rem, 11vw, 11vw)',
              color: 'var(--text-0)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              clipPath: 'inset(0 0 100% 0)',
              margin: 0,
            }}
          >
            ALESSANDRO
          </h1>
          <h1
            ref={h1Line2Ref}
            className="outline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(4rem, 11vw, 11vw)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              clipPath: 'inset(0 0 100% 0)',
              margin: 0,
            }}
          >
            SCHILLACI
          </h1>
        </div>

        {/* TypeWriter */}
        <div style={{ opacity: startTypewriter ? 1 : 0, transition: 'opacity 0.3s' }}>
          <TypeWriter
            text="Créateur de systèmes IA_"
            speed={60}
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: 20,
              color: 'var(--text-0)',
              letterSpacing: '-0.01em',
            }}
          />
        </div>

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
                border: '1px solid var(--accent-border)',
                padding: '4px 10px',
                borderRadius: 2,
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} style={{ display: 'flex', gap: '1rem', opacity: 0 }}>
          <Link
            to="/projets"
            data-magnetic
            data-cursor="link"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              color: 'var(--bg-0)',
              background: 'var(--accent)',
              padding: '12px 24px',
              display: 'inline-block',
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
          >
            VOIR MES PROJETS →
          </Link>
          <a
            href="/cv-alessandro-schillaci.pdf"
            download
            data-magnetic
            data-cursor="link"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
              padding: '12px 24px',
              display: 'inline-block',
              transition: 'background 0.2s',
            }}
          >
            DOWNLOAD CV ↓
          </a>
        </div>
      </div>

      {/* Right column — photo */}
      <div
        ref={photoRef}
        style={{
          height: '80vh',
          opacity: 0,
          padding: '2rem 2rem 2rem 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <TiltPhoto />
      </div>
    </section>
  )
}
