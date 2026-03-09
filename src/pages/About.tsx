import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PageTransition from '../components/layout/PageTransition'
import TiltPhoto from '../components/ui/TiltPhoto'
import Footer from '../components/layout/Footer'
import { skills, timeline } from '../data/content'

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

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
  }, [])

  return (
    <PageTransition>
      <main style={{ paddingTop: 52 }}>
        {/* Header */}
        <div style={{ padding: '5rem 80px 3rem' }}>
          <div className="label" style={{ marginBottom: '1.5rem' }}>PARCOURS & COMPÉTENCES</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(64px, 10vw, 10vw)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text-0)',
            }}
          >
            À PROPOS
          </h1>
          <h1
            className="outline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(64px, 10vw, 10vw)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              marginBottom: '4rem',
            }}
          >
            DE SANDRO
          </h1>
        </div>

        {/* Bio section */}
        <div
          style={{
            padding: '6rem 80px',
            background: 'var(--bg-1)',
            textAlign: 'center',
          }}
        >
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(24px, 3.5vw, 56px)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              fontStyle: 'italic',
              color: 'var(--text-0)',
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            "Je ne fais pas des slides sur l'IA.<br />Je construis des systèmes qui fonctionnent."
          </blockquote>
        </div>

        {/* Bio + photo */}
        <div
          style={{
            padding: '6rem 80px',
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          <div style={{ position: 'sticky', top: 80, height: 520 }}>
            <TiltPhoto />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p className="body-lg" style={{ color: 'var(--text-0)' }}>
              Micro-entrepreneur à 20 ans, je construis des systèmes IA qui automatisent, génèrent et optimisent. Pas des slides — des agents qui tournent.
            </p>
            <p className="body-lg">
              Étudiant Chef de Projets Digitaux à Ynov Lille (B1→B2), ancien sapeur-pompier volontaire pendant 3 ans. La rigueur du terrain, l'énergie du digital.
            </p>
            <p className="body-lg">
              Disponible pour une alternance B2 dès septembre 2025. Basé à Lille, mobile partout.
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
