import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PageTransition from '../components/layout/PageTransition'
import TiltPhoto from '../components/ui/TiltPhoto'
import Footer from '../components/layout/Footer'
import { skills, timeline } from '../data/content'

const QUOTE = "Je construis des systèmes IA qui tournent vraiment. Pas des slides. Des trucs qui fonctionnent."

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const carteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Timeline animations
    const items = timelineRef.current?.querySelectorAll('[data-timeline-item]')
    items?.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        }
      )
    })

    // Skills bars
    const bars = skillsRef.current?.querySelectorAll('[data-skill-bar]')
    bars?.forEach(bar => {
      const level = (bar as HTMLElement).dataset.level ?? '0'
      gsap.fromTo(
        bar,
        { width: 0 },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
        }
      )
    })

    // Carte Sandro
    if (carteRef.current) {
      gsap.from(carteRef.current, {
        y: 50, opacity: 0, rotate: -12,
        duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: carteRef.current, start: 'top 90%', once: true },
      })
    }

    // Citation mot par mot
    if (quoteRef.current) {
      const words = quoteRef.current.querySelectorAll('.word')
      gsap.from(words, {
        opacity: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.055,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 65%',
          once: true,
        },
      })
    }
  }, [])

  return (
    <PageTransition>
      <main style={{ paddingTop: 52 }}>
        {/* Header */}
        <div style={{ padding: '5rem clamp(24px, 5vw, 80px) 3rem' }}>
          <div className="label" style={{ marginBottom: '1.5rem' }}>PARCOURS & COMPÉTENCES</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(52px, 9vw, 130px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'var(--text-0)',
              marginBottom: '4rem',
            }}
          >
            <em style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>À propos</em>{' '}
            <span className="outline">de Sandro</span>
          </h1>
        </div>

        {/* Stats row */}
        <div
          style={{
            padding: '2rem clamp(24px, 5vw, 80px)',
            display: 'flex',
            gap: '3rem',
            flexWrap: 'wrap',
            borderTop: '1px solid var(--text-2)',
            borderBottom: '1px solid var(--text-2)',
            marginBottom: '4rem',
          }}
        >
          {[
            { value: '06', label: 'Projets livrés' },
            { value: '20', label: 'Ans' },
            { value: '2+', label: 'Ans expérience' },
          ].map(stat => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--accent)',
                }}
              >
                {stat.value}
              </div>
              <div className="label" style={{ marginTop: 6 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bio section — citation mot par mot */}
        <div
          style={{
            padding: '100px clamp(40px, 8vw, 160px)',
            background: 'var(--bg-1)',
            textAlign: 'center',
          }}
        >
          <div
            ref={quoteRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 3.5vw, 56px)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              color: 'var(--text-0)',
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {QUOTE.split(' ').map((word, i) => (
              <span
                key={i}
                className="word"
                style={{ display: 'inline-block', marginRight: '0.28em' }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Bio + photo */}
        <div
          style={{
            padding: '6rem clamp(24px, 5vw, 80px)',
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          <div style={{ position: 'sticky', top: 80, height: 520, display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
            <TiltPhoto />
            <div
              ref={carteRef}
              style={{
                width: 140,
                aspectRatio: '2/3',
                borderRadius: 10,
                overflow: 'hidden',
                flexShrink: 0,
                transform: 'rotate(-4deg)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
                border: '1px solid rgba(200,255,0,0.25)',
                alignSelf: 'flex-end',
              }}
            >
              <img
                src="/images/carte_sandro.png"
                alt="Carte Sandro"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p className="body-lg" style={{ color: 'var(--text-0)' }}>
              Vision 2, mon agent IA, voit ton écran et exécute des tâches en autonomie. Je l'ai codé seul, de zéro, avec FastAPI, Ollama et Groq. C'est ça qui me définit : je ne parle pas d'IA, je la construis.
            </p>
            <p className="body-lg">
              Direction artistique, motion design, interfaces web premium. Pulse Digital c'est ma structure, mais c'est surtout ma façon de prouver qu'un bon design n'est pas réservé aux grandes agences.
            </p>
            <p className="body-lg">
              Je cherche une entreprise qui veut un profil rare : quelqu'un qui comprend le business, maîtrise les outils IA les plus récents, et livre. Disponible septembre 2025, Lille et remote.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div
          ref={skillsRef}
          style={{
            padding: '6rem 80px',
            background: 'var(--bg-1)',
          }}
        >
          <div className="label" style={{ marginBottom: '3rem' }}>Compétences</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '3rem',
            }}
          >
            {skills.map(cat => (
              <div
                key={cat.category}
                style={{
                  background: 'var(--bg-2)',
                  padding: '2rem',
                  borderRadius: 4,
                }}
              >
                <div className="label" style={{ marginBottom: '1.5rem', color: 'var(--text-0)' }}>
                  {cat.category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cat.items.map(item => (
                    <div key={item.name}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-0)' }}>
                          {item.name}
                        </span>
                        <span className="label">{item.level}%</span>
                      </div>
                      <div
                        style={{
                          height: 2,
                          background: 'rgba(240,237,230,0.08)',
                          borderRadius: 1,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          data-skill-bar
                          data-level={item.level}
                          style={{
                            height: '100%',
                            background: 'var(--accent)',
                            width: 0,
                            borderRadius: 1,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '6rem 80px' }}>
          <div className="label" style={{ marginBottom: '3rem' }}>Parcours</div>
          <div
            ref={timelineRef}
            style={{
              position: 'relative',
              maxWidth: 800,
            }}
          >
            {/* Center line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'var(--text-2)',
              }}
            />

            {timeline.map((item, i) => (
              <div
                key={item.year}
                data-timeline-item
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '3rem',
                  marginBottom: '3rem',
                  paddingLeft: '2rem',
                  opacity: 0,
                }}
              >
                {/* Year */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 48,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: 'var(--accent)',
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div style={{ paddingTop: 8, textAlign: i % 2 === 0 ? 'left' : 'left' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 22,
                      color: 'var(--text-0)',
                      letterSpacing: '-0.02em',
                      marginBottom: 6,
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-1)', lineHeight: 1.7 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}
