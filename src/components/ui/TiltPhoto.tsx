/* ============================================================
   AAZ Portfolio V4 — TiltPhoto
   3D tilt on mousemove + RGB glitch mount effect
   ============================================================ */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface TiltPhotoProps {
  src?: string
  alt?: string
  caption?: string
  style?: React.CSSProperties
}

export default function TiltPhoto({
  src = '/images/sandro.jpg',
  alt = 'Alessandro Schillaci',
  caption = '[Lille, 2025]',
  style,
}: TiltPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const photo = photoRef.current
    if (!photo) return

    // Mount glitch effect
    let frame = 0
    const glitchFrames = [
      'hue-rotate(30deg) saturate(1.4)',
      'hue-rotate(-30deg) saturate(0.8)',
      'none',
    ]
    const glitchId = setInterval(() => {
      photo.style.filter = glitchFrames[frame % glitchFrames.length]
      frame++
      if (frame >= glitchFrames.length) clearInterval(glitchId)
    }, 40)

    return () => clearInterval(glitchId)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    const photo = photoRef.current
    if (!container || !photo) return

    const rect = container.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(photo, {
      rotateY: x * 15,
      rotateX: y * -8,
      duration: 1,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const photo = photoRef.current
    if (!photo) return
    gsap.to(photo, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <img
        ref={photoRef}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 0 1px var(--accent-border), 0 0 40px var(--accent-glow), 0 60px 120px rgba(0,0,0,0.9)',
        }}
      />

      {/* Floating badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          right: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          background: 'var(--bg-2)',
          border: '1px solid var(--accent-border)',
          padding: '4px 10px',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        RTX 4070 · ONLINE
        <span
          className="dot-pulse"
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
        />
      </div>

      {/* Caption */}
      {caption && (
        <div
          style={{
            position: 'absolute',
            bottom: -24,
            left: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: 'var(--text-1)',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  )
}
