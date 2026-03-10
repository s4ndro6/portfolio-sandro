import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface TiltPhotoProps {
  src?: string
  alt?: string
}

export default function TiltPhoto({
  src = '/images/sandro.jpg',
  alt = 'Sandro Schillaci',
}: TiltPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const idleRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    // Respiration idle — légère animation loop
    idleRef.current = gsap.to(photoRef.current, {
      y: -7,
      duration: 5.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      idleRef.current?.kill()
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    const photo = photoRef.current
    const inner = innerRef.current
    if (!container || !photo || !inner) return

    const rect = container.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Tilt 3D
    gsap.to(photo, { rotateY: x * 12, rotateX: y * -6, duration: 1.8, ease: 'power2.out' })

    // Glow dynamique selon position souris
    const glowIntensity = 0.08 + Math.abs(x) * 0.1
    gsap.to(inner, {
      boxShadow: `${x * 40}px ${y * 20}px 80px rgba(200,255,0,${glowIntensity}), 0 60px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(240,237,230,0.06)`,
      duration: 1.8,
      ease: 'power2.out',
    })
  }

  const handleMouseEnter = () => {
    // Pause la respiration au hover
    idleRef.current?.pause()
  }

  const handleMouseLeave = () => {
    const photo = photoRef.current
    const inner = innerRef.current
    if (!photo || !inner) return

    gsap.to(photo, { rotateY: 0, rotateX: 0, duration: 1.5, ease: 'elastic.out(1, 0.4)' })
    gsap.to(inner, {
      boxShadow: '0 60px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(240,237,230,0.06)',
      duration: 1.5,
      ease: 'power2.out',
    })

    // Reprend la respiration
    idleRef.current?.resume()
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px', width: '100%' }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          overflow: 'hidden',
          borderRadius: 4,
          boxShadow: '0 60px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(240,237,230,0.06)',
          transformStyle: 'preserve-3d',
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
            objectPosition: 'center 20%',
            display: 'block',
            transformStyle: 'preserve-3d',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            padding: '6px 12px',
            background: 'rgba(12,12,10,0.85)',
            border: '1px solid rgba(200,255,0,0.2)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Lille, 2025
        </div>
      </div>
    </div>
  )
}
