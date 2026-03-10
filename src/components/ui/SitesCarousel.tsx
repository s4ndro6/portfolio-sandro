import { forwardRef, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface SitesCarouselProps {
  images: string[]
}

const SitesCarousel = forwardRef<HTMLDivElement, SitesCarouselProps>(({ images }, ref) => {
  const [current, setCurrent] = useState(0)
  const imgRefs = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % images.length
        gsap.to(imgRefs.current[prev], { opacity: 0, duration: 0.6 })
        gsap.to(imgRefs.current[next], { opacity: 1, duration: 0.6 })
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      {images.map((src, i) => (
        <img
          key={src}
          ref={el => { if (el) imgRefs.current[i] = el }}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: i === 0 ? 1 : 0,
          }}
        />
      ))}
      {/* Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
          zIndex: 10,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? 'var(--accent)' : 'rgba(240,237,230,0.3)',
              transition: 'width 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
})

SitesCarousel.displayName = 'SitesCarousel'

export default SitesCarousel
