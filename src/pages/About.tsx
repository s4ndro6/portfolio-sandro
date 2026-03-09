/* ============================================================
   AAZ Portfolio V4 — About Page
   ============================================================ */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PageTransition from '../components/layout/PageTransition'
import TiltPhoto from '../components/ui/TiltPhoto'
import TypeWriter from '../components/ui/TypeWriter'
import SkillsTerminal from '../components/sections/SkillsTerminal'
import { TextScramble } from '../utils/textScramble'
import { timeline } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const timelineLineRef = useRef<SVGLineElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (h1Ref.current) new TextScramble(h1Ref.current).setText('À PROPOS')
    if (h2Ref.current) setTimeout(() => new TextScramble(h2Ref.current!).setText('DU SYSTÈME'), 200)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('[data-timeline-item]')
      items?.forEach((item, i) => {
        gsap.fromTo(item, { x: i % 2 === 0 ? -40 : 40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 80%', once: true },
        })
      })
      const line = timelineLineRef.current
      if (line) {
        gsap.set(line, { strokeDasharray: 600, strokeDashoffset: 600 })
        gsap.to(line, {
          strokeDashoffset: 0, duration: 2, ease: 'none',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 1 },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <main style={{ paddingTop: 56, paddingBottom: 28 }}>
        <div style={{ padding: '4rem 2rem 2rem' }}>
          <div className="mono" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>// SYSTÈME / OPÉRATEUR</div>
          <h1 ref={h1Ref} style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(3rem, 11vw, 11vw)', color: 'var(--text-0)',
            lineHeight: 0.88, letterSpacing: '-0.03em',
          }}>À PROPOS</h1>
          <h2 ref={h2Ref} className="outline" style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(3rem, 11vw, 11vw)', lineHeight: 0.88,
            letterSpacing: '-0.03em', marginBottom: '3rem',
          }}>DU SYSTÈME</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem',
          padding: '0 2rem 5rem', maxWidth: 1400, margin: '0 auto', alignItems: 'start',
        }}>
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <TypeWriter
                text="Micro-entrepreneur à 20 ans. Je construis des agents IA, des pipelines automatisés et des expériences digitales qui marquent."
                speed={30}
                style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.8, color: 'var(--text-0)', display: 'block' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.8, color: 'var(--text-1)', marginBottom: '3rem' }}>
              Étudiant Chef de Projets Digitaux à Ynov Lille (B1→B2), ancien sapeur-pompier volontaire pendant 3 ans.
              La rigueur du terrain, l'énergie du digital. Disponible alternance B2 dès septembre 2025.
            </p>
            <SkillsTerminal />
          </div>
          <div style={{ position: 'sticky', top: 80, height: 500 }}>
            <TiltPhoto caption="[Lille, 2025]" />
          </div>
        </div>

        <div style={{ padding: '0 2rem 5rem', maxWidth: 800, margin: '0 auto' }}>
          <div className="mono" style={{ marginBottom: '2rem', color: 'var(--accent)' }}>// PARCOURS</div>
          <div ref={timelineRef} style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 60, top: 0, height: '100%', width: 2, overflow: 'visible' }} width="2" height="600">
              <line ref={timelineLineRef} x1="1" y1="0" x2="1" y2="600"
                stroke="var(--accent)" strokeWidth="1" strokeDasharray="600" strokeDashoffset="600" />
            </svg>
            {timeline.map((item, i) => (
              <div key={item.year} data-timeline-item style={{
                display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem',
                marginBottom: '2.5rem', opacity: 0,
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 4 }}>
                    {item.year}
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginLeft: 56, marginTop: 4 }} />
                </div>
                <div style={{ marginLeft: i % 2 === 0 ? 0 : 20 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--text-0)', marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
