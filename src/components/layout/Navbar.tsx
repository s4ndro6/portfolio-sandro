import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Projets', to: '/projets', img: '/images/pulse_digital.png' },
  { label: 'À propos', to: '/a-propos', img: '/images/sandro.jpg' },
  { label: 'Contact', to: '/contact', img: null },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const prevScrollY = useRef(0)
  const previewRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y >= 60)
      setHidden(y > prevScrollY.current && y > 280)
      prevScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleEnter = (label: string) => {
    const el = previewRefs.current[label]
    if (el) {
      gsap.killTweensOf(el)
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0 0 0)', rotation: -4, opacity: 1 },
        { clipPath: 'inset(0% 0 0 0)', rotation: 0, duration: 0.38, ease: 'power3.out' }
      )
    }
  }

  const handleLeave = (label: string) => {
    const el = previewRefs.current[label]
    if (el) {
      gsap.killTweensOf(el)
      gsap.to(el, { clipPath: 'inset(100% 0 0 0)', duration: 0.25, ease: 'power3.in' })
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 52,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: '2rem',
        transition: 'transform 0.28s ease, background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        background: scrolled ? 'rgba(12,12,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--text-2)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 20,
          color: 'var(--text-0)',
          letterSpacing: '-0.03em',
        }}
      >
        Sandro
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', position: 'relative' }}>
        {NAV_LINKS.map(({ label, to, img }) => {
          const isActive = location.pathname === to
          return (
            <div
              key={label}
              style={{ position: 'relative' }}
              onMouseEnter={() => handleEnter(label)}
              onMouseLeave={() => handleLeave(label)}
            >
              <Link
                to={to}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 15,
                  color: isActive ? 'var(--text-0)' : 'var(--text-1)',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: 4,
                }}
              >
                {label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 1,
                    background: 'var(--text-0)',
                    width: isActive ? '100%' : '0%',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Link>

              {img && (
                <div
                  ref={el => { previewRefs.current[label] = el }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 20px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 180,
                    height: 230,
                    borderRadius: 4,
                    overflow: 'hidden',
                    clipPath: 'inset(100% 0 0 0)',
                    pointerEvents: 'none',
                    zIndex: 200,
                  }}
                >
                  <img
                    src={img}
                    alt={label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span
          className="label pulse"
          style={{ color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          Dispo B2
        </span>
        <Link
          to="/contact"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 400,
            color: 'var(--text-0)',
            border: '1px solid var(--text-2)',
            padding: '5px 14px',
            borderRadius: 2,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-0)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-2)'
          }}
        >
          Contact →
        </Link>
      </div>
    </nav>
  )
}
