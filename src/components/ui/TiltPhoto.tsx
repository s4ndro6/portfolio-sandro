import { useRef } from 'react'
import gsap from 'gsap'

interface TiltPhotoProps {
  src?: string
  alt?: string
  style?: React.CSSProperties
}

export default function TiltPhoto({
  src = '/images/sandro.jpg',
  alt = 'Alessandro Schillaci',
  style,
}: TiltPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    const photo = photoRef.current
    if (!container || !photo) return

    const rect = container.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(photo, {
      rotateY: x * 12,
      rotateX: y * -6,
      duration: 1.2,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const photo = photoRef.current
    if (!photo) return
    gsap.to(photo, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
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
          borderRadius: 2,
          transformStyle: 'preserve-3d',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(240,237,230,0.06)',
        }}
      />

      {/* Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'var(--text-1)',
          background: 'var(--bg-2)',
          padding: '4px 10px',
          borderRadius: 2,
        }}
      >
        Lille, 2025
      </div>
    </div>
  )
}
