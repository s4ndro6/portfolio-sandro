import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltPhoto from '../ui/TiltPhoto'
import CountUp from '../ui/CountUp'

export default function AboutSnippet() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = leftRef.current
    if (!el) return

    const children = el.querySelectorAll('.animate-in')
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(children, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
      },
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '8rem 80px',
        display: 'grid',
        gridTemplateColumns: '60fr 40fr',
        gap: '5rem',
        alignItems: 'center',
        background: 'var(--bg-1)',
      }}
    >
      {/* Left */}
      <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="animate-in label">À PROPOS</div>

        <h2
          className="animate-in"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 80px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--text-0)',
          }}
        >
          Construire des<br />
          <span className="outline">systèmes qui tournent.</span>
        </h2>

        <p className="animate-in body-lg">
          Micro-entrepreneur à 20 ans, je construis des systèmes IA qui automatisent, génèrent et optimisent. Pas des slides — des agents qui tournent.
        </p>

        <p className="animate-in body-lg">
          Étudiant Chef de Projets Digitaux à Ynov Lille, ancien sapeur-pompier volontaire. Disponible pour une alternance B2 dès septembre 2025.
        </p>

        {/* Stats */}
        <div
          className="animate-in"
          style={{
            display: 'flex',
            gap: '3rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--text-2)',
          }}
        >
          {[
            { end: 5, suffix: '+', label: 'Projets livrés' },
            { end: 20, suffix: ' ans', label: 'Âge' },
            { end: 2, suffix: '+', label: 'Ans d\'expérience' },
          ].map(({ end, suffix, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 48,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-0)',
                }}
              >
                <CountUp end={end} suffix={suffix} />
              </div>
              <div className="label" style={{ marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <Link
          className="animate-in"
          to="/a-propos"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--text-0)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            borderBottom: '1px solid var(--text-2)',
            paddingBottom: 4,
            width: 'fit-content',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-0)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-2)' }}
        >
          En savoir plus →
        </Link>
      </div>

      {/* Right — photo */}
      <div style={{ height: 500 }}>
        <TiltPhoto />
      </div>
    </section>
  )
}
