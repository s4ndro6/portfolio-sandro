/* ============================================================
   AAZ Portfolio V4 — AboutHome Section
   Bio + stats + photo for homepage
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TiltPhoto from '../ui/TiltPhoto'

gsap.registerPlugin(ScrollTrigger)

function CountUp({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => setStarted(true),
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || !started || typeof target !== 'number') return
    gsap.fromTo(
      { val: 0 },
      { val: target, duration: 1.5, ease: 'power2.out',
        onUpdate: function() {
          el.textContent = Math.round(this.targets()[0].val) + suffix
        }
      },
      {}
    )
  }, [started, target, suffix])

  if (typeof target === 'string') {
    return <span ref={ref}>{target}</span>
  }
  return <span ref={ref}>0{suffix}</span>
}

export default function AboutHome() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '8rem 2rem',
        maxWidth: 1400,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '5rem',
        alignItems: 'center',
      }}
    >
      {/* Left */}
      <div ref={textRef}>
        <div className="mono" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
          // À PROPOS
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.8,
            color: 'var(--text-0)',
            marginBottom: '1.25rem',
          }}
        >
          Micro-entrepreneur à 20 ans. Je ne fais pas des slides sur l'IA — je construis des agents
          qui tournent, des pipelines qui livrent, des designs qui marquent.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.8,
            color: 'var(--text-1)',
            marginBottom: '3rem',
          }}
        >
          Étudiant Chef de Projets Digitaux à Ynov Lille (B1→B2), ancien sapeur-pompier volontaire.
          Disponible alternance B2 dès septembre 2025.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '3rem' }}>
          {[
            { label: 'PROJETS', value: 5, suffix: '' },
            { label: 'ANS', value: 20, suffix: '' },
            { label: 'AUTOMAT.', value: '∞', suffix: '' },
          ].map(stat => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 52,
                  lineHeight: 1,
                  color: 'var(--accent)',
                }}
              >
                <CountUp target={stat.value as number} suffix={stat.suffix} />
              </div>
              <div className="mono" style={{ marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — photo */}
      <div style={{ height: 500, position: 'relative' }}>
        <TiltPhoto caption="[Lille, 2025]" />
      </div>
    </section>
  )
}
