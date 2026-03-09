import { Link } from 'react-router-dom'

export default function ContactTeaser() {
  return (
    <section
      style={{
        padding: '8rem 80px',
        background: 'var(--bg-0)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'flex-start',
      }}
    >
      <span className="label">Travaillons ensemble</span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(48px, 7vw, 120px)',
          lineHeight: 0.92,
          letterSpacing: '-0.03em',
          color: 'var(--text-0)',
          maxWidth: 900,
        }}
      >
        Vous avez un projet ?<br />
        <span className="outline">Parlons-en.</span>
      </h2>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link
          to="/contact"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--bg-0)',
            background: 'var(--accent)',
            padding: '14px 32px',
            display: 'inline-block',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          Me contacter →
        </Link>
        <a
          href="mailto:sandro.schillaci@gmail.com"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--text-0)',
            border: '1px solid var(--text-2)',
            padding: '14px 32px',
            display: 'inline-block',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-0)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-2)' }}
        >
          sandro.schillaci@gmail.com
        </a>
      </div>
    </section>
  )
}
