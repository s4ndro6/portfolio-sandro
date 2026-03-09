/* ============================================================
   AAZ Portfolio V4 — StatusBar
   Fixed bottom, live clock, system status
   ============================================================ */

import { useEffect, useState } from 'react'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function StatusBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 28,
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--accent-border)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: '1.25rem',
      }}
    >
      {/* Left */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'var(--text-1)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          className="dot-pulse"
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
        />
        AAZ_SYSTEM ONLINE
      </div>

      {/* Center — live clock */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'var(--text-1)',
        }}
      >
        {time}
      </div>

      {/* Right */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'var(--accent)',
        }}
      >
        DISPONIBLE ALTERNANCE B2 · SEPT 2025
      </div>
    </div>
  )
}
