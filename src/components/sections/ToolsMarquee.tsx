import { tools } from '../../data/content'

const ROW1 = tools.slice(0, 12)
const ROW2 = tools.slice(12)

function MarqueeRow({ items, reverse = false, speed = '30s' }: { items: string[]; reverse?: boolean; speed?: string }) {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${reverse ? 'marquee-rtl' : 'marquee-ltr'} ${speed} linear infinite`,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
      >
        {doubled.map((tool, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'var(--text-1)',
              border: '1px solid var(--text-2)',
              padding: '6px 14px',
              marginRight: 8,
              borderRadius: 2,
              whiteSpace: 'nowrap',
              transition: 'border-color 0.2s, color 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLSpanElement
              el.style.borderColor = 'var(--accent)'
              el.style.color = 'var(--text-0)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLSpanElement
              el.style.borderColor = 'var(--text-2)'
              el.style.color = 'var(--text-1)'
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ToolsMarquee() {
  return (
    <section
      style={{
        padding: '5rem 0',
        borderTop: '1px solid var(--text-2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <div className="label" style={{ paddingInline: '2rem', marginBottom: '2rem' }}>
        Stack & Outils
      </div>
      <MarqueeRow items={ROW1} reverse={false} speed="30s" />
      <MarqueeRow items={ROW2} reverse={true} speed="25s" />
    </section>
  )
}
