import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../components/layout/PageTransition'
import Footer from '../components/layout/Footer'
import { projects, projectDetails } from '../data/content'

export default function Project() {
  const { slug } = useParams<{ slug: string }>()
  const heroRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const idx = projects.findIndex(p => p.slug === slug)
  const project = projects[idx]
  const details = projectDetails[slug ?? '']
  const prev = idx > 0 ? projects[idx - 1] : null
  const next = idx < projects.length - 1 ? projects[idx + 1] : null

  useEffect(() => {
    if (!imgRef.current || !heroRef.current) return
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (imgRef.current) gsap.set(imgRef.current, { y: self.progress * 120 })
      },
    })
    return () => st.kill()
  }, [slug])

  if (!project) {
    return (
      <PageTransition>
        <main style={{ paddingTop: 52, padding: '8rem clamp(24px, 5vw, 80px)' }}>
          <div className="label" style={{ marginBottom: '2rem' }}>Projet introuvable</div>
          <Link
            to="/projets"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--text-0)',
              borderBottom: '1px solid var(--text-2)',
              paddingBottom: 4,
            }}
          >
            ← Retour aux projets
          </Link>
        </main>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <main>
        {/* HERO PROJET — plein écran */}
        <div
          ref={heroRef}
          style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {/* Image fond avec parallax */}
          <img
            ref={imgRef}
            src={project.media}
            alt={project.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: 'center top',
              top: '-10%',
            }}
          />

          {/* Gradient bas */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12,12,10,0.95) 0%, rgba(12,12,10,0.4) 60%, transparent 100%)',
            }}
          />

          {/* Numéro watermark géant */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 40,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(120px, 20vw, 280px)',
              color: 'rgba(240,237,230,0.04)',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {project.id}
          </div>

          {/* Contenu hero */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '0 clamp(24px, 5vw, 80px) 5rem',
              width: '100%',
            }}
          >
            <div className="label" style={{ color: 'var(--text-1)', marginBottom: '1.25rem' }}>
              {project.year} · {project.location}
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(44px, 8vw, 120px)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: 'var(--text-0)',
                whiteSpace: 'pre-line',
                marginBottom: '1.75rem',
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 300,
                color: 'var(--text-1)',
                maxWidth: 560,
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {project.subtitle}
            </p>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(12,12,10,0.85)',
                  border: `1px solid ${project.status === 'Livré' ? 'rgba(200,255,0,0.3)' : 'rgba(255,180,0,0.3)'}`,
                  padding: '4px 12px',
                  borderRadius: 2,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: project.status === 'Livré' ? '#C8FF00' : '#FFB800',
                    display: 'inline-block',
                  }}
                />
                <span className="label" style={{ fontSize: 10 }}>{project.status}</span>
              </span>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    color: 'var(--text-1)',
                    border: '1px solid var(--text-2)',
                    padding: '4px 10px',
                    borderRadius: 2,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div
          style={{
            padding: '6rem clamp(24px, 5vw, 80px)',
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Gauche — texte long */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 1.3vw, 20px)',
                fontWeight: 300,
                lineHeight: 1.85,
                color: 'var(--text-0)',
              }}
            >
              {details?.longDesc ?? project.description}
            </p>

            {details?.challenge && (
              <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.75rem' }}>
                <div className="label" style={{ color: 'var(--accent)', marginBottom: 10 }}>DÉFI</div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'var(--text-1)',
                  }}
                >
                  {details.challenge}
                </p>
              </div>
            )}

            {details?.result && (
              <div style={{ borderLeft: '2px solid var(--text-2)', paddingLeft: '1.75rem' }}>
                <div className="label" style={{ color: 'var(--text-1)', marginBottom: 10 }}>RÉSULTAT</div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'var(--text-1)',
                  }}
                >
                  {details.result}
                </p>
              </div>
            )}
          </div>

          {/* Droite — meta */}
          <div style={{ borderLeft: '1px solid var(--text-2)' }}>
            {[
              { label: 'Année', value: project.year },
              { label: 'Statut', value: project.status },
              { label: 'Type', value: project.subtitle },
              { label: 'Outils', value: project.tags.join(', ') },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid var(--text-2)',
                }}
              >
                <div className="label" style={{ marginBottom: 6, color: 'var(--text-2)' }}>{label}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--text-0)',
                    lineHeight: 1.5,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GALERIE — image principale seule */}
        {false && (
          <div
            style={{
              padding: '0 clamp(24px, 5vw, 80px) 6rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[project.media].map((src, i) => (
              <div
                key={i}
                style={{ aspectRatio: '16/10', overflow: 'hidden', background: 'var(--bg-1)' }}
              >
                <img
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* NAV PROJET — précédent / suivant */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderTop: '1px solid var(--text-2)',
          }}
        >
          {prev ? (
            <Link
              to={`/projets/${prev.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '2.5rem clamp(24px, 5vw, 80px)',
                borderRight: '1px solid var(--text-2)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <span style={{ fontSize: 24, color: 'var(--text-1)' }}>←</span>
              <div>
                <div className="label" style={{ marginBottom: 4, color: 'var(--text-2)' }}>Précédent</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 20,
                    color: 'var(--text-0)',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'pre-line',
                    lineHeight: 1,
                  }}
                >
                  {prev.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/projets/${next.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '1.5rem',
                padding: '2.5rem clamp(24px, 5vw, 80px)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <div style={{ textAlign: 'right' }}>
                <div className="label" style={{ marginBottom: 4, color: 'var(--text-2)' }}>Suivant</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 20,
                    color: 'var(--text-0)',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'pre-line',
                    lineHeight: 1,
                  }}
                >
                  {next.title}
                </div>
              </div>
              <span style={{ fontSize: 24, color: 'var(--text-1)' }}>→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}
