/* ============================================================
   AAZ Portfolio V4 — ContactSection
   Terminal form with typewriter intro
   ============================================================ */

import { useRef, useState } from 'react'

type Subject = 'ALTERNANCE' | 'PROJET' | 'AUTRE'

export default function ContactSection() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState<Subject>('ALTERNANCE')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const emailRef = useRef<HTMLDivElement>(null)

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--accent-border)',
    color: 'var(--text-0)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    width: '100%',
    padding: '6px 0',
    outline: 'none',
    letterSpacing: '0.06em',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@aaz.studio')
    const el = emailRef.current
    if (el) {
      el.textContent = '✓ COPIÉ'
      setTimeout(() => { el.textContent = 'hello@aaz.studio' }, 1500)
    }
  }

  return (
    <section style={{ padding: '6rem 2rem', maxWidth: 760, margin: '0 auto' }}>
      {/* Terminal form */}
      <div
        style={{
          border: '1px solid var(--accent-border)',
          background: 'var(--bg-1)',
          padding: '2rem',
          marginBottom: '3rem',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            borderBottom: '1px solid var(--accent-border)',
            paddingBottom: '0.75rem',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: 'var(--text-1)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>AAZ_CONTACT_TERMINAL v1.0</span>
          <span style={{ display: 'flex', gap: 6 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
              <span
                key={c}
                style={{
                  width: 10, height: 10,
                  borderRadius: '50%',
                  background: c,
                  display: 'inline-block',
                }}
              />
            ))}
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-1)' }}>
              {'> '}
            </span>
            <input
              style={inputStyle}
              placeholder="nom_______"
              value={nom}
              onChange={e => setNom(e.target.value)}
              required
            />
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-1)' }}>
              {'> '}
            </span>
            <input
              style={inputStyle}
              placeholder="email_______"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-1)', marginRight: 8 }}>
              {'> sujet'}
            </span>
            <div style={{ display: 'inline-flex', gap: 8, marginTop: 4 }}>
              {(['ALTERNANCE', 'PROJET', 'AUTRE'] as Subject[]).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    color: subject === s ? 'var(--bg-0)' : 'var(--text-1)',
                    background: subject === s ? 'var(--accent)' : 'transparent',
                    border: '1px solid var(--accent-border)',
                    padding: '4px 10px',
                    cursor: 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  [{s}]
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-1)' }}>
              {'> '}
            </span>
            <textarea
              style={{ ...inputStyle, resize: 'none', height: 80, verticalAlign: 'top' }}
              placeholder="message________________________________"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              color: 'var(--bg-0)',
              background: 'var(--accent)',
              border: 'none',
              padding: '12px 24px',
              cursor: 'none',
              textAlign: 'left',
              transition: 'opacity 0.2s',
              opacity: status !== 'idle' ? 0.7 : 1,
            }}
          >
            {status === 'idle' && '[ENVOYER LA REQUÊTE →]'}
            {status === 'sending' && 'ENVOI EN COURS...'}
            {status === 'sent' && '✓ MESSAGE REÇU'}
          </button>
        </form>
      </div>

      {/* Links */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}
      >
        <div
          ref={emailRef}
          data-cursor="copy"
          onClick={copyEmail}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.1em',
            color: 'var(--text-1)',
            cursor: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.color = 'var(--accent)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.color = 'var(--text-1)'
          }}
        >
          hello@aaz.studio
        </div>

        {[
          { label: 'LinkedIn', href: 'https://linkedin.com/in/alessandro-schillaci' },
          { label: 'GitHub', href: 'https://github.com/aazstudio' },
          { label: 'TikTok', href: 'https://tiktok.com/@aaz.studio' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.1em',
              color: 'var(--text-1)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-1)'
            }}
          >
            [{link.label} →]
          </a>
        ))}
      </div>

      {/* Alternance card */}
      <div
        style={{
          border: '1px solid var(--accent)',
          background: 'var(--accent-dim)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              marginBottom: 4,
            }}
          >
            <span
              className="dot-pulse"
              style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}
            />
            DISPONIBLE B2 · SEPT 2025
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--text-0)',
            }}
          >
            Chef de Projets Digitaux — Ynov Lille
          </div>
        </div>
        <a
          href="/cv-alessandro-schillaci.pdf"
          download
          data-cursor="link"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: 'var(--bg-0)',
            background: 'var(--accent)',
            padding: '8px 14px',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
        >
          [TÉLÉCHARGER CV →]
        </a>
      </div>
    </section>
  )
}
