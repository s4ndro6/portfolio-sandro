/* ============================================================
   AAZ Portfolio V4 — Navbar
   Fixed top, blur on scroll, nav links with image previews
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'PROJETS', to: '/projets', img: '/images/pulse_digital.png' },
  { label: 'À PROPOS', to: '/a-propos', img: '/images/sandro.jpg' },
  { label: 'CONTACT', to: '/contact', img: null },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const prevScrollY = useRef(0)
  const previewRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y >= 80)
      if (y > prevScrollY.current && y > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      prevScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkEnter = (label: string) => {
    setHoveredLink(label)
    const el = previewRefs.current[label]
    if (el) {
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0 0 0)', rotation: -3, opacity: 1 },
        { clipPath: 'inset(0% 0 0 0)', rotation: 0, duration: 0.35, ease: 'power3.out' }
      )
    }
  }

  const handleLinkLeave = (label: string) => {
    setHoveredLink(null)
    const el = previewRefs.current[label]
    if (el) {
      gsap.to(el, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.25,
        ease: 'power3.in',
      })
    }
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: '2rem',
        transition: 'transform 0.25s ease, background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        background: scrolled ? 'rgba(2,8,4,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--accent-border)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 22,
          color: 'var(--text-0)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          letterSpacing: '-0.02em',
        }}
        data-cursor="link"
      >
        AAZ
        <span
          className="dot-pulse"
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
        />
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', position: 'relative' }}>
        {NAV_LINKS.map(({ label, to, img }) => {
          const isActive = location.pathname === to
          return (
            <div
              key={label}
              style={{ position: 'relative' }}
              onMouseEnter={() => handleLinkEnter(label)}
              onMouseLeave={() => handleLinkLeave(label)}
            >
              <Link
                to={to}
                data-cursor="link"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: isActive ? 'var(--accent)' : 'var(--text-1)',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: 4,
                }}
              >
                [{label}]
                {/* Underline */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 1,
                    background: 'var(--accent)',
                    width: hoveredLink === label || isActive ? '100%' : '0%',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Link>

              {/* Image preview */}
              {img && (
                <div
                  ref={el => { previewRefs.current[label] = el }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 16px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 180,
                    height: 240,
                    borderRadius: 6,
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

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: 'var(--text-1)',
            background: 'rgba(0,255,136,0.06)',
            border: '1px solid var(--accent-border)',
            borderRadius: 20,
            padding: '4px 10px',
          }}
        >
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
          DISPO B2
        </div>
        <Link
          to="/contact"
          data-magnetic
          data-cursor="link"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.14em',
            color: 'var(--bg-0)',
            background: 'var(--accent)',
            padding: '6px 14px',
            borderRadius: 2,
            fontWeight: 500,
            transition: 'opacity 0.2s',
          }}
        >
          [CONTACT →]
        </Link>
      </div>
    </nav>
  )
}
