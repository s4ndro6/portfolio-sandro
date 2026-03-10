export default function Footer() {
  return (
    <footer
      style={{
        padding: '40px 60px',
        borderTop: '1px solid var(--text-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span className="label">Sandro © 2025</span>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {[
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sandrosch' },
          { label: 'Instagram', href: 'https://instagram.com/sndro.sch' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--text-1)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-0)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)' }}
          >
            {label}
          </a>
        ))}
      </div>

      <span className="label">Lille, France</span>
    </footer>
  )
}
