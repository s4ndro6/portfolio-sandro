/* ============================================================
   AAZ Portfolio V4 — SkillsTerminal
   Terminal-style skill display with animated bars
   ============================================================ */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { skills } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsTerminal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = containerRef.current?.querySelectorAll('[data-skill-bar]')
      if (!bars) return

      bars.forEach(bar => {
        const target = (bar as HTMLElement).dataset.target || '0'
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        lineHeight: 2,
        color: 'var(--accent)',
      }}
    >
      <div style={{ color: 'var(--text-1)', marginBottom: '1rem' }}>
        $ skills --list --verbose
      </div>

      {skills.map(category => (
        <div key={category.category} style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: 'var(--text-0)', marginBottom: '0.5rem' }}>
            [{category.category}]
          </div>
          {category.items.map((item, i) => {
            const isLast = i === category.items.length - 1
            return (
              <div key={item.name} style={{ paddingLeft: 4, marginBottom: 6 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 3,
                  }}
                >
                  <span style={{ color: 'var(--text-1)', fontSize: 11 }}>
                    {isLast ? '└──' : '├──'}
                  </span>
                  <span style={{ color: 'var(--text-0)', minWidth: 160, fontSize: 11 }}>
                    {item.name}
                  </span>
                  {/* Bar container */}
                  <div
                    style={{
                      width: 120,
                      height: 3,
                      background: 'var(--bg-2)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      data-skill-bar
                      data-target={item.level}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        background: 'var(--accent)',
                        width: '0%',
                      }}
                    />
                  </div>
                  <span style={{ color: 'var(--text-1)', fontSize: 10 }}>
                    {item.level}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
