/* ============================================================
   AAZ Portfolio V4 — Canvas Generators
   Animated canvas visuals for projects without real images
   ============================================================ */

/* -------- Agent Studio — Terminal Grid -------- */
export function drawAgentStudio(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  if (!ctx) return

  const LINES_POOL = [
    '> agent.execute(task)', '> llm.generate(prompt)', '> output: ✓ ready',
    '> memory: 847MB', '> cpu: 12%', '> task: complete',
    '> pipeline: OK', '> groq.chat()', '> ollama.run()',
    '> stream: active', '> tokens: 1024', '> latency: 38ms',
  ]

  type Terminal = { lines: string[]; cursor: boolean; nextUpdate: number }
  const COLS = 4
  const ROWS = 3
  const terminals: Terminal[] = Array.from({ length: COLS * ROWS }, () => ({
    lines: [],
    cursor: true,
    nextUpdate: Math.random() * 800,
  }))

  let raf: number
  let lastTime = 0

  function draw(time: number) {
    const dt = time - lastTime
    lastTime = time

    const W = canvas.width
    const H = canvas.height
    const cellW = W / COLS
    const cellH = H / ROWS

    ctx.fillStyle = '#020804'
    ctx.fillRect(0, 0, W, H)

    terminals.forEach((term, idx) => {
      const col = idx % COLS
      const row = Math.floor(idx / COLS)
      const x = col * cellW
      const y = row * cellH
      const pad = 8

      ctx.strokeStyle = 'rgba(0,255,136,0.2)'
      ctx.lineWidth = 1
      ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2)

      term.nextUpdate -= dt
      if (term.nextUpdate <= 0) {
        const line = LINES_POOL[Math.floor(Math.random() * LINES_POOL.length)]
        term.lines.push(line)
        const maxLines = Math.floor((cellH - pad * 2) / 14)
        if (term.lines.length > maxLines) term.lines.shift()
        term.nextUpdate = 200 + Math.random() * 600
        term.cursor = !term.cursor
      }

      ctx.font = '9px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(0,255,136,0.7)'
      term.lines.forEach((line, li) => {
        ctx.fillText(line, x + pad, y + pad + 12 + li * 14, cellW - pad * 2)
      })

      if (term.cursor && term.lines.length > 0) {
        const cy = y + pad + 12 + term.lines.length * 14
        ctx.fillStyle = '#00FF88'
        ctx.fillRect(x + pad, cy - 10, 6, 10)
      }
    })

    raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}

/* -------- Atlas Trading — OHLC Chart -------- */
export function drawAtlasTrading(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  if (!ctx) return

  const CANDLES = 30
  const candles: { o: number; h: number; l: number; c: number }[] = []
  let price = 0.62
  for (let i = 0; i < CANDLES; i++) {
    const open = price
    const change = (Math.random() - 0.48) * 0.02
    const close = open + change
    const high = Math.max(open, close) + Math.random() * 0.008
    const low = Math.min(open, close) - Math.random() * 0.008
    candles.push({ o: open, h: high, l: low, c: close })
    price = close
  }

  const minP = Math.min(...candles.map(c => c.l))
  const maxP = Math.max(...candles.map(c => c.h))
  const range = maxP - minP

  function priceToY(p: number, _W: number, H: number) {
    const chartH = H * 0.72
    const chartY = H * 0.05
    return chartY + ((maxP - p) / range) * chartH
  }

  let smaPhase = 0
  let raf: number

  function draw() {
    const W = canvas.width
    const H = canvas.height

    ctx.fillStyle = '#040D06'
    ctx.fillRect(0, 0, W, H)

    const candleW = (W - 40) / CANDLES
    const padL = 20

    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = H * 0.05 + (H * 0.72 / 4) * i
      ctx.beginPath()
      ctx.moveTo(padL, y)
      ctx.lineTo(W - padL, y)
      ctx.stroke()
    }

    candles.forEach((c, i) => {
      const x = padL + i * candleW + candleW * 0.1
      const bodyW = candleW * 0.65
      const openY = priceToY(c.o, W, H)
      const closeY = priceToY(c.c, W, H)
      const highY = priceToY(c.h, W, H)
      const lowY = priceToY(c.l, W, H)
      const isBull = c.c >= c.o
      const color = isBull ? '#00FF88' : '#FF2D55'

      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x + bodyW / 2, highY)
      ctx.lineTo(x + bodyW / 2, lowY)
      ctx.stroke()

      ctx.fillStyle = isBull ? 'rgba(0,255,136,0.7)' : 'rgba(255,45,85,0.7)'
      const bodyTop = Math.min(openY, closeY)
      const bodyH = Math.abs(closeY - openY) || 1
      ctx.fillRect(x, bodyTop, bodyW, bodyH)

      const volH = (Math.abs(c.c - c.o) / range) * H * 0.08 + 4
      ctx.fillStyle = isBull ? 'rgba(0,255,136,0.3)' : 'rgba(255,45,85,0.3)'
      ctx.fillRect(x, H * 0.87 - volH, bodyW, volH)
    })

    ctx.strokeStyle = 'rgba(255,255,255,0.25)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    for (let i = 0; i < candles.length; i++) {
      const smoothed = candles.slice(Math.max(0, i - 4), i + 1).reduce((sum, c) => sum + c.c, 0) / Math.min(5, i + 1)
      const x = padL + i * candleW + candleW * 0.42
      const y = priceToY(smoothed, W, H) + Math.sin(i * 0.4 + smaPhase) * 0.5
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    smaPhase += 0.02

    ctx.fillStyle = 'rgba(0,255,136,0.8)'
    ctx.font = '10px "JetBrains Mono", monospace'
    ctx.fillText('ATLAS/USD · 1H · LIVE', padL, H - 6)

    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.fillStyle = '#00FF88'
      ctx.beginPath()
      ctx.arc(W - 24, H - 11, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}

/* -------- TikTok Pipeline — Frame Grid -------- */
export function drawTikTokPipeline(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  if (!ctx) return

  const COLS = 3
  const ROWS = 4
  let activeFrame = 0
  let raf: number

  function draw(time: number) {
    const W = canvas.width
    const H = canvas.height
    const cellW = W / COLS
    const cellH = H / ROWS
    const frameW = cellW * 0.8
    const frameH = cellH * 0.85

    ctx.fillStyle = '#020804'
    ctx.fillRect(0, 0, W, H)

    activeFrame = Math.floor(time / 600) % (COLS * ROWS)

    for (let i = 0; i < COLS * ROWS; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const cx = col * cellW + cellW / 2
      const cy = row * cellH + cellH / 2
      const fx = cx - frameW / 2
      const fy = cy - frameH / 2

      const hue = (i * 47 + Math.floor(time / 3000) * 15) % 360
      const grad = ctx.createLinearGradient(fx, fy, fx, fy + frameH)
      grad.addColorStop(0, `hsla(${hue}, 60%, 15%, 1)`)
      grad.addColorStop(1, `hsla(${(hue + 40) % 360}, 50%, 8%, 1)`)
      ctx.fillStyle = grad
      ctx.fillRect(fx, fy, frameW, frameH)

      const isActive = i === activeFrame
      ctx.strokeStyle = isActive ? 'rgba(0,255,136,0.9)' : 'rgba(255,255,255,0.08)'
      ctx.lineWidth = isActive ? 1.5 : 0.5
      ctx.strokeRect(fx, fy, frameW, frameH)

      const pSize = Math.min(frameW, frameH) * 0.2
      ctx.fillStyle = isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'
      ctx.beginPath()
      ctx.moveTo(cx - pSize * 0.4, cy - pSize * 0.5)
      ctx.lineTo(cx + pSize * 0.6, cy)
      ctx.lineTo(cx - pSize * 0.4, cy + pSize * 0.5)
      ctx.closePath()
      ctx.fill()
    }

    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(0, H - 22, W, 22)
    ctx.fillStyle = 'rgba(0,255,136,0.7)'
    ctx.font = '9px "JetBrains Mono", monospace'
    ctx.fillText('1080×1920 · 60FPS · AUTO', 8, H - 7)

    raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}

/* -------- Job Bot — Kanban -------- */
export function drawJobBot(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  if (!ctx) return

  const COLS_DATA = [
    { label: 'TO APPLY', color: 'rgba(255,255,255,0.6)', cards: 6 },
    { label: 'SENT', color: 'rgba(0,207,255,0.7)', cards: 4 },
    { label: 'INTERVIEW', color: 'rgba(255,165,0,0.7)', cards: 2 },
    { label: '✓ HIRED', color: 'rgba(0,255,136,0.8)', cards: 1 },
  ]

  let raf: number

  function draw(time: number) {
    const W = canvas.width
    const H = canvas.height

    ctx.fillStyle = '#040D06'
    ctx.fillRect(0, 0, W, H)

    const colW = W / COLS_DATA.length
    const pad = 8
    const counter = 12 + Math.floor(time / 2000)

    COLS_DATA.forEach((col, ci) => {
      const x = ci * colW

      ctx.fillStyle = 'rgba(255,255,255,0.08)'
      ctx.fillRect(x + pad, 10, colW - pad * 2, 22)
      ctx.fillStyle = col.color
      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.fillText(col.label, x + pad + 4, 25)

      const cardCount = col.cards + (ci === 0 ? Math.floor(time / 8000) % 2 : 0)
      for (let i = 0; i < Math.min(cardCount, 5); i++) {
        const cy = 44 + i * 32
        ctx.fillStyle = `rgba(255,255,255,${0.15 + (i === 0 ? 0.15 : 0)})`
        ctx.fillRect(x + pad, cy, colW - pad * 2, 24)
        ctx.fillStyle = col.color
        ctx.font = '7px "JetBrains Mono", monospace'
        ctx.fillText(`CANDIDATURE #${counter - ci * 3 - i}`, x + pad + 4, cy + 14)
      }
    })

    ctx.fillStyle = 'rgba(0,0,0,0.6)'
    ctx.fillRect(0, H - 24, W, 24)
    ctx.fillStyle = '#00FF88'
    ctx.font = '9px "JetBrains Mono", monospace'
    ctx.fillText(`${counter} candidatures envoyées`, 8, H - 8)

    raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}
