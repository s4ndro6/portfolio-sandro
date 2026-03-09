import { useState } from 'react'
import PageTransition from '../components/layout/PageTransition'
import Footer from '../components/layout/Footer'

const EMAIL = 'sandro.schillaci@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', sujet: 'Alternance', message: '' })

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--text-2)',
    color: 'var(--text-0)',
    fontFamily: 'var(--font-body)',
    fontSize: 16,
    fontWeight: 300,
    padding: '12px 0',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <PageTransition>
      <main style={{ paddingTop: 52 }}>
        {/* Header */}
        <div style={{ padding: '5rem 80px 3rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(64px, 10vw, 10vw)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text-0)',
            }}
          >
            TRAVAILLONS
          </h1>
          <h1
            className="outline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(64px, 10vw, 10vw)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              marginBottom: '3rem',
            }}
          >
            ENSEMBLE.
          </h1>
        </div>

        {/* Email grand */}
        <div style={{ padding: '0 80px 5rem' }}>
          <button
            onClick={copyEmail}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(18px, 2.5vw, 40px)',
              color: 'var(--text-0)',
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: 0,
              position: 'relative',
              letterSpacing: '-0.02em',
            }}
          >
            <span
              style={{
                borderBottom: copied ? '2px solid var(--accent)' : '1px solid var(--text-2)',
                paddingBottom: 4,
                transition: 'border-color 0.2s',
              }}
            >
              {EMAIL}
            </span>
            <span
              className="label"
              style={{
                marginLeft: 16,
                color: copied ? 'var(--accent)' : 'var(--text-1)',
                transition: 'color 0.2s',
              }}
            >
              {copied ? '✓ COPIÉ' : 'COPIER'}
            </span>
          </button>
        </div>

        {/* Form + Card */}
        <div
          style={{
            padding: '0 80px 6rem',
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Form */}
          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {[
              { key: 'nom', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'vous@email.com' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <div className="label" style={{ marginBottom: 8 }}>{label}</div>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderBottomColor = 'var(--accent)' }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderBottomColor = 'var(--text-2)' }}
                />
              </div>
            ))}

            <div>
              <div className="label" style={{ marginBottom: 8 }}>Sujet</div>
              <select
                value={form.sujet}
                onChange={e => setForm(prev => ({ ...prev, sujet: e.target.value }))}
                style={{ ...inputStyle, cursor: 'none' }}
                onFocus={e => { (e.target as HTMLSelectElement).style.borderBottomColor = 'var(--accent)' }}
                onBlur={e => { (e.target as HTMLSelectElement).style.borderBottomColor = 'var(--text-2)' }}
              >
                {['Alternance', 'Projet', 'Autre'].map(opt => (
                  <option key={opt} value={opt} style={{ background: 'var(--bg-0)', color: 'var(--text-0)' }}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="label" style={{ marginBottom: 8 }}>Message</div>
              <textarea
                rows={4}
                placeholder="Votre message..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderBottomColor = 'var(--accent)' }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderBottomColor = 'var(--text-2)' }}
              />
            </div>

            <button
              type="submit"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 400,
                color: 'var(--bg-0)',
                background: 'var(--accent)',
                padding: '14px 32px',
                border: 'none',
                cursor: 'none',
                alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            >
              ENVOYER →
            </button>
          </form>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Alternance card */}
            <div
              style={{
                border: '1px solid var(--accent-border)',
                background: 'var(--accent-dim)',
                padding: 32,
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span
                  className="pulse"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'inline-block',
                  }}
                />
                <span className="label" style={{ color: 'var(--accent)' }}>Disponible Alternance B2</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 22,
                  color: 'var(--text-0)',
                  letterSpacing: '-0.02em',
                  marginBottom: 8,
                }}
              >
                Chef de Projets Digitaux
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-1)', marginBottom: 20 }}>
                Ynov Lille · Septembre 2025
              </div>
              <a
                href="/cv-sandro-schillaci.pdf"
                download
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--bg-0)',
                  background: 'var(--accent)',
                  padding: '10px 20px',
                  display: 'inline-block',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                TÉLÉCHARGER MON CV →
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com' },
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'TikTok', href: 'https://tiktok.com' },
                { label: 'Fiverr', href: 'https://fiverr.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--text-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBlock: 12,
                    borderBottom: '1px solid var(--text-2)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-0)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)' }}
                >
                  {label}
                  <span style={{ transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}
