/* ============================================================
   AAZ Portfolio V4 — ToolsMarquee
   3 infinite marquee rows, pause on hover
   ============================================================ */

import { tools } from '../../data/content'

const ROW1 = tools.slice(0, 9)
const ROW2 = tools.slice(9, 18)
const ROW3 = tools.slice(18)

function MarqueeRow({
  items,
  reverse = false,
  speed = '25s',
}: {
  items: string[]
  reverse?: boolean
  speed?: string
}) {
  const doubled = [...items, ...items] // double for seamless loop

  return (
    <div
      style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${reverse ? 'marquee-rtl' : 'marquee-ltr'} ${speed} linear infinite`,
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
        }}
      >
        {doubled.map((tool, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'var(--text-1)',
              border: '1px solid var(--accent-border)',
              padding: '6px 14px',
              marginRight: 8,
              borderRadius: 2,
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, color 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLSpanElement).style.background = 'var(--accent-dim)'
              ;(e.currentTarget as HTMLSpanElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLSpanElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLSpanElement).style.color = 'var(--text-1)'
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
        padding: '4rem 0',
        borderTop: '1px solid var(--accent-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <div className="mono" style={{ paddingInline: '2rem', marginBottom: '1.5rem' }}>
        // STACK & OUTILS
      </div>
      <MarqueeRow items={ROW1} reverse={false} speed="28s" />
      <MarqueeRow items={ROW2} reverse={true} speed="22s" />
      <MarqueeRow items={ROW3} reverse={false} speed="32s" />
    </section>
  )
}
