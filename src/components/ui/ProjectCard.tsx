import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import type { Project } from '../../data/content'

interface ProjectCardProps {
  project: Project
  height?: string
}

export default function ProjectCard({ project, height = '48vh' }: ProjectCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const onEnter = () => {
    gsap.killTweensOf([overlayRef.current, imgRef.current])
    gsap.to(overlayRef.current, {
      clipPath: 'inset(0% 0 0% 0)',
      duration: 0.4,
      ease: 'power3.out',
    })
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.8, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.killTweensOf([overlayRef.current, imgRef.current])
    gsap.to(overlayRef.current, {
      clipPath: 'inset(0% 0 100% 0)',
      duration: 0.32,
      ease: 'power2.in',
    })
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' })
  }

  return (
    <Link
      to={`/projets/${project.slug}`}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div
        className="project-card"
        data-cursor="view"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          cursor: 'none',
          height,
          background: 'var(--bg-1)',
        }}
      >
        {/* N° watermark */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 16,
            zIndex: 1,
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(80px, 10vw, 140px)',
            color: 'rgba(240,237,230,0.03)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {project.id}
        </div>

        {/* MEDIA */}
        <img
          ref={imgRef}
          src={project.media}
          alt={project.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transformOrigin: 'center',
            willChange: 'transform',
          }}
        />

        {/* Gradient bas — toujours visible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background: 'linear-gradient(to top, rgba(12,12,10,0.9) 0%, rgba(12,12,10,0.3) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Info bas — toujours visible */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            padding: '2rem 1.5rem 1.5rem',
            pointerEvents: 'none',
          }}
        >
          <div className="label" style={{ marginBottom: 6 }}>
            {project.year} — {project.location}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 28,
              lineHeight: 1,
              color: 'var(--text-0)',
              whiteSpace: 'pre-line',
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
            {project.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  color: 'var(--text-1)',
                  border: '1px solid var(--text-2)',
                  padding: '2px 7px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* OVERLAY hover — sort du bas via clip-path */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            background: 'linear-gradient(to top, rgba(12,12,10,0.97) 0%, rgba(12,12,10,0.6) 70%, transparent 100%)',
            clipPath: 'inset(100% 0 0 0)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 28,
          }}
        >
          <span className="label" style={{ color: 'var(--accent)', marginBottom: 8 }}>
            {project.year} · {project.location}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(20px, 2.2vw, 30px)',
              lineHeight: 1.1,
              whiteSpace: 'pre-line',
              marginBottom: 12,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-1)',
              lineHeight: 1.65,
              marginBottom: 16,
              maxWidth: 340,
            }}
          >
            {project.description}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  padding: '4px 10px',
                  border: '1px solid rgba(240,237,230,0.15)',
                  borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* STATUT badge */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(12,12,10,0.85)',
            border: `1px solid ${project.status === 'Livré' ? 'rgba(200,255,0,0.3)' : 'rgba(255,180,0,0.3)'}`,
            padding: '4px 10px',
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
              animation: project.status !== 'Livré' ? 'pulse 2s infinite' : 'none',
            }}
          />
          <span className="label" style={{ fontSize: 9 }}>{project.status}</span>
        </div>
      </div>
    </Link>
  )
}
