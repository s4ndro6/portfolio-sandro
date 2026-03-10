const TEXT = 'SANDRO · CRÉATEUR IA · PULSE DIGITAL · VISION 2 · AUTOMATION · LILLE · '
const REPEATED = TEXT.repeat(4)

export default function TextMarquee() {
  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '32px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Ligne 1 : → gauche, 35s */}
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee-ltr 55s linear infinite',
          width: 'max-content',
          marginBottom: 0,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(56px, 7vw, 96px)',
            color: 'rgba(240,237,230,0.05)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            paddingInline: '2rem',
          }}
        >
          {REPEATED}
        </span>
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(56px, 7vw, 96px)',
            color: 'rgba(240,237,230,0.05)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            paddingInline: '2rem',
          }}
        >
          {REPEATED}
        </span>
      </div>

      {/* Séparateur */}
      <div style={{ height: 1, background: 'var(--text-2)', margin: '0 0' }} />

      {/* Ligne 2 : ← droite, 27s */}
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee-rtl 45s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(56px, 7vw, 96px)',
            color: 'rgba(240,237,230,0.05)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            paddingInline: '2rem',
          }}
        >
          {REPEATED}
        </span>
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(56px, 7vw, 96px)',
            color: 'rgba(240,237,230,0.05)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            paddingInline: '2rem',
          }}
        >
          {REPEATED}
        </span>
      </div>
    </div>
  )
}
