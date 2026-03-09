import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { projects } from '../../data/content'

interface ProjectsStripProps {
  isLoaded?: boolean
}

export default function ProjectsStrip({ isLoaded }: ProjectsStripProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isLoaded])

  const preview = projects.slice(0, 4)

  return (
    <div
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Header row */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 80,
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          width: 'calc(100% - 160px)',
          alignItems: 'flex-end',
        }}
      >
        <span className="label">Projets sélectionnés</span>
        <Link
          to="/projets"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-1)',
            borderBottom: '1px solid var(--text-2)',
            paddingBottom: 2,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-0)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)' }}
        >
          Voir tous →
        </Link>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          height: '100vh',
          paddingTop: 80,
          paddingBottom: 20,
          gap: '2px',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {preview.map((project) => (
          <Link
            key={project.id}
            to="/projets"
            data-cursor="view"
            style={{
              position: 'relative',
              width: '65vw',
              height: '100%',
              overflow: 'hidden',
              background: 'var(--bg-1)',
              flexShrink: 0,
              display: 'block',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: -20,
                right: -10,
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 140,
                color: 'rgba(255,255,255,0.03)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 1,
              }}
            >
              {project.id}
            </span>

            {project.media && (
              <img
                src={project.media}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(12,12,10,0.95) 0%, transparent 60%)',
                padding: '4rem 2rem 2rem',
                zIndex: 2,
              }}
            >
              <div className="label" style={{ marginBottom: 8 }}>
                {project.year} — {project.location}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 32,
                  color: 'var(--text-0)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  whiteSpace: 'pre-line',
                }}
              >
                {project.title}
              </h3>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                {project.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      color: 'var(--text-1)',
                      border: '1px solid var(--text-2)',
                      padding: '2px 7px',
                      borderRadius: 2,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {/* CTA card */}
        <Link
          to="/projets"
          style={{
            width: '30vw',
            height: '100%',
            background: 'var(--bg-2)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem',
            textDecoration: 'none',
            border: '1px solid var(--text-2)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 28,
              color: 'var(--text-0)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
            }}
          >
            Voir tous les projets
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, color: 'var(--accent)' }}>
            →
          </span>
        </Link>
      </div>
    </div>
  )
}
