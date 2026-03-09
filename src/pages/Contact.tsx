/* ============================================================
   AAZ Portfolio V4 — Contact Page
   ============================================================ */

import { useEffect, useRef } from 'react'
import PageTransition from '../components/layout/PageTransition'
import TypeWriter from '../components/ui/TypeWriter'
import ContactSection from '../components/sections/ContactSection'
import { TextScramble } from '../utils/textScramble'

export default function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (headingRef.current) new TextScramble(headingRef.current).setText('CONTACT')
  }, [])

  return (
    <PageTransition>
      <main style={{ paddingTop: 56, paddingBottom: 28 }}>
        <div style={{ padding: '4rem 2rem 2rem', maxWidth: 760, margin: '0 auto' }}>
          <div className="mono" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>// CONNEXION</div>
          <h1 ref={headingRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(3rem, 11vw, 11vw)', color: 'var(--text-0)',
            lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: '1.5rem',
          }}>CONTACT</h1>
          <TypeWriter
            text="Discutons de ton projet, ton alternance, ta startup._"
            speed={45}
            style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 20, color: 'var(--text-1)', display: 'block', marginBottom: '2rem' }}
          />
        </div>
        <ContactSection />
      </main>
    </PageTransition>
  )
}
