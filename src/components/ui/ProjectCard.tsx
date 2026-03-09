import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '../../data/content'
import {
  drawAgentStudio,
  drawAtlasTrading,
  drawTikTokPipeline,
} from '../../utils/generateProjectCanvas'

interface ProjectCardProps {
  project: Project
  height?: string
}

export default function ProjectCard({ project, height = '48vh' }: ProjectCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !project.mediaType.startsWith('canvas-')) return
    canvas.width = canvas.offsetWidth || 400
    canvas.height = canvas.offsetHeight || 300

    let cleanup: (() => void) | undefined
    switch (project.mediaType) {
      case 'canvas-terminal': cleanup = drawAgentStudio(canvas); break
      case 'canvas-chart': cleanup = drawAtlasTrading(canvas); break
      case 'canvas-frames': cleanup = drawTikTokPipeline(canvas); break
    }
    return () => cleanup?.()
  }, [project.mediaType])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const trigger = ScrollTrigger.create({
      trigger: img.parentElement!,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => { gsap.set(img, { yPercent: -15 * self.progress }) },
    })
    return () => trigger.kill()
  }, [project.media])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (hovered) {
      gsap.fromTo(overlay, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.38, ease: 'power3.out' })
    } else {
      gsap.to(overlay, { clipPath: 'inset(100% 0 0 0)', duration: 0.3, ease: 'power3.in' })
    }
  }, [hovered])

  const statusColor = project.status === 'Livré' ? '#4DFFB4' : '#FFB800'

  return (
    <div
      data-cursor="view"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-1)',
        cursor: 'none',
        height,
      }}
    >
      {/* Number watermark */}
      <span
        style={{
          position: 'absolute',
          top: -10,
          right: -10,
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 140,
          color: 'rgba(255,255,255,0.03)',
          lineHeight: 1,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {project.id}
      </span>

      {/* Status badge */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 3,
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.12em',
          color: statusColor,
          background: 'rgba(12,12,10,0.8)',
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <span
          className={project.status !== 'Livré' ? 'pulse' : ''}
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: statusColor,
            display: 'inline-block',
          }}
        />
        {project.status}
      </div>

      {/* Media */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {project.media ? (
          <img
            ref={imgRef}
            src={project.media}
            alt={project.title}
            style={{ width: '100%', height: '115%', objectFit: 'cover', marginTop: '-7.5%' }}
          />
        ) : (
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        )}
      </div>

      {/* Bottom info always visible */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          background: 'linear-gradient(to top, rgba(12,12,10,0.9) 0%, transparent 100%)',
          padding: '2rem 1.5rem 1.5rem',
        }}
      >
        <div className="label" style={{ marginBottom: 6 }}>{project.year} — {project.location}</div>
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

      {/* Hover overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          background: 'rgba(12,12,10,0.93)',
          borderLeft: `2px solid ${project.color}`,
          clipPath: 'inset(100% 0 0 0)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '0.75rem',
        }}
      >
        <div className="label" style={{ color: project.color }}>{project.id} / {project.subtitle}</div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 28,
            color: 'var(--text-0)',
            whiteSpace: 'pre-line',
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.7 }}>
          {project.description}
        </p>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: project.color,
            letterSpacing: '0.05em',
          }}
        >
          Voir →
        </div>
      </div>
    </div>
  )
}
