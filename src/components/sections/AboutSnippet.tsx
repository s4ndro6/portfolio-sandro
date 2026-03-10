import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from '../ui/CountUp'

export default function AboutSnippet() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const block1Ref = useRef<HTMLDivElement>(null)
  const block2Ref = useRef<HTMLDivElement>(null)
  const carteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax photo
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current.querySelector('img'),
        { y: 0 },
        {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        }
      )
    }

    // Bloc 1 entrée
    if (block1Ref.current) {
      const children1 = block1Ref.current.querySelectorAll('.anim')
      ScrollTrigger.create({
        trigger: block1Ref.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(children1, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
        },
      })
    }

    // Bloc 2 entrée
    if (block2Ref.current) {
      const children2 = block2Ref.current.querySelectorAll('.anim')
      ScrollTrigger.create({
        trigger: block2Ref.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(children2, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
        },
      })
    }

  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: 'var(--bg-0)',
        color: 'var(--text-0)',
        position: 'relative',
        height: '200vh',
      }}
    >
      {/* GAUCHE — photo sticky */}
      <div
        ref={photoRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src="/images/sandro.jpg"
          alt="Alessandro Schillaci"
          style={{
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block',
          }}
        />
      </div>

      {/* DROITE — 2 blocs de 100vh */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
        }}
      >
        {/* Bloc 1 : label + titre + bio */}
        <div
          ref={block1Ref}
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(40px, 6vw, 100px) clamp(32px, 4vw, 72px)',
            gap: '1.75rem',
          }}
        >
          <div className="anim label" style={{ color: 'var(--text-1)', letterSpacing: '0.14em', opacity: 0 }}>
            À PROPOS
          </div>

          <h2
            className="anim"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--text-0)',
              opacity: 0,
            }}
          >
            <em style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>Alessandro</em>{' '}
            Schillaci
          </h2>

          <p
            className="anim"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.8,
              color: 'var(--text-1)',
              opacity: 0,
            }}
          >
            Autodidacte. 20 ans. J'ai lancé Pulse Digital parce que j'ai arrêté d'attendre.
            Depuis je conçois des agents IA, des interfaces qui marquent,
            et des pipelines qui automatisent ce que les autres font à la main.
          </p>
        </div>

        {/* Bloc 2 : citation + stats + lien */}
        <div
          ref={block2Ref}
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(40px, 6vw, 100px) clamp(32px, 4vw, 72px)',
            gap: '2.5rem',
          }}
        >
          <blockquote
            className="anim"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(22px, 3vw, 42px)',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              color: 'var(--text-0)',
              borderLeft: '3px solid #C8FF00',
              paddingLeft: 24,
              opacity: 0,
            }}
          >
            "Je construis des systèmes IA qui tournent vraiment.
            Pas des slides. Des trucs qui fonctionnent."
          </blockquote>

          {/* Stats + Carte — wrapper neutre sans opacity */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
              paddingTop: '1rem',
              borderTop: '1px solid var(--text-2)',
            }}
          >
            {/* Stats */}
            <div className="anim" style={{ display: 'flex', gap: '2.5rem', flex: 1, opacity: 0 }}>
              {[
                { end: 6, suffix: '+', label: 'Projets livrés' },
                { end: 20, suffix: ' ans', label: 'Fondateur Pulse Digital' },
                { end: 100, suffix: '%', label: 'Autodidacte' },
              ].map(({ end, suffix, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 44,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: 'var(--accent)',
                    }}
                  >
                    <CountUp end={end} suffix={suffix} />
                  </div>
                  <div className="label" style={{ marginTop: 4, color: 'var(--text-1)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Carte Sandro — son propre .anim, hors du parent opacity:0 */}
            <div
              ref={carteRef}
              className="anim"
              style={{
                width: 120,
                aspectRatio: '2/3',
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                border: '1px solid rgba(200,255,0,0.15)',
                flexShrink: 0,
                transform: 'rotate(-3deg)',
                opacity: 0,
              }}
            >
              <img
                src="/images/carte_sandro.png"
                alt="Carte Sandro"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <Link
            className="anim"
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
              transition: 'border-color 0.2s, color 0.2s',
              opacity: 0,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-0)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-2)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text-0)'
            }}
          >
            En savoir plus →
          </Link>
        </div>
      </div>
    </section>
  )
}
