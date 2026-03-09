/* ============================================================
   AAZ Portfolio V4 — ProjectCard
   Image or canvas media, hover overlay, parallax
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { Project } from '../../data/content'
import {
  drawAgentStudio,
  drawAtlasTrading,
  drawTikTokPipeline,
  drawJobBot,
} from '../../utils/generateProjectCanvas'

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  project: Project
}

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  large: { gridColumn: 'span 2', gridRow: 'span 2' },
  medium: { gridColumn: 'span 2', gridRow: 'span 1' },
  small: { gridColumn: 'span 1', gridRow: 'span 1' },
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !project.mediaType.startsWith('canvas-')) return

    canvas.width = canvas.offsetWidth || 400
    canvas.height = canvas.offsetHeight || 300

    let cleanup: (() => void) | undefined

    switch (project.mediaType) {
      case 'canvas-terminal':
        cleanup = drawAgentStudio(canvas) as () => void
        break
      case 'canvas-chart':
        cleanup = drawAtlasTrading(canvas) as () => void
        break
      case 'canvas-frames':
        cleanup = drawTikTokPipeline(canvas) as () => void
        break
      case 'canvas-kanban':
        cleanup = drawJobBot(canvas) as () => void
        break
    }

    return () => cleanup?.()
  }, [project.mediaType])

  // Image parallax
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const trigger = ScrollTrigger.create({
      trigger: img.parentElement!,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        gsap.set(img, { yPercent: -15 * self.progress })
      },
    })
    return () => trigger.kill()
  }, [project.media])

  // Hover overlay
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (hovered) {
      gsap.fromTo(
        overlay,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.4, ease: 'power3.out' }
      )
    } else {
      gsap.to(overlay, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.3,
        ease: 'power3.in',
      })
    }
  }, [hovered])

  const statusColor = project.status === 'Livré' ? '#00FF88' : '#FF9F00'

  return (
    <div
      data-cursor="view"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...SIZE_STYLES[project.size],
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-1)',
        cursor: 'none',
      }}
    >
      {/* Large project number watermark */}
      <span
        style={{
          position: 'absolute',
          top: -20,
          right: -10,
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 160,
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
          left: 12,
          zIndex: 3,
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.12em',
          color: statusColor,
          background: 'rgba(2,8,4,0.8)',
          border: `1px solid ${statusColor}33`,
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <span
          className="dot-pulse"
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: statusColor,
            display: 'inline-block',
          }}
        />
        {project.status.toUpperCase()}
      </div>

      {/* Media */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {project.media ? (
          <img
            ref={imgRef}
            src={project.media}
            alt={project.title}
            style={{
              width: '100%',
              height: '115%',
              objectFit: 'cover',
              display: 'block',
              marginTop: '-7.5%',
            }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />
        )}
      </div>

      {/* Hover overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'rgba(2,8,4,0.93)',
          borderLeft: `3px solid ${project.color}`,
          clipPath: 'inset(100% 0 0 0)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '0.75rem',
        }}
      >
        <div>
          <div className="mono" style={{ marginBottom: 6, color: project.color }}>
            {project.id} / {project.year}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 28,
              lineHeight: 1,
              color: 'var(--text-0)',
              whiteSpace: 'pre-line',
              letterSpacing: '-0.02em',
              marginBottom: 4,
            }}
          >
            {project.title}
          </h3>
          <p className="mono" style={{ color: project.color, marginBottom: 8 }}>
            {project.subtitle}
          </p>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-1)',
              lineHeight: 1.6,
              marginBottom: 10,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.1em',
                color: 'var(--text-1)',
                border: '1px solid var(--accent-border)',
                padding: '2px 7px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.14em',
            color: project.color,
          }}
        >
          [→ VOIR]
        </div>
      </div>
    </div>
  )
}
