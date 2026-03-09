// Sandro Portfolio V5 — Canvas generators (dark élégant)

export function drawAgentStudio(canvas: HTMLCanvasElement): (() => void) | undefined {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const lines: string[] = []
  const allLines = [
    '> agent.run()',
    '> llm.generate()',
    '> task: ✓',
    '> memory: 847mb',
    '> pipeline: ok',
    '> tools: 4 active',
    '> context: loaded',
    '> status: running',
  ]
  let lineIndex = 0
  let cursorVisible = true

  const draw = () => {
    const { width: w, height: h } = canvas
    ctx.fillStyle = '#0C0C0A'
    ctx.fillRect(0, 0, w, h)

    const lineH = 20
    const startY = h * 0.2
    const visible = lines.slice(-8)

    ctx.font = '11px "JetBrains Mono", monospace'
    visible.forEach((line, i) => {
      ctx.fillStyle = `rgba(240, 237, 230, ${0.3 + (i / visible.length) * 0.4})`
      ctx.fillText(line, 24, startY + i * lineH)
    })

    if (cursorVisible && visible.length > 0) {
      const lastY = startY + (visible.length - 1) * lineH
      const lastLine = visible[visible.length - 1]
      const metrics = ctx.measureText(lastLine)
      ctx.fillStyle = '#C8FF00'
      ctx.fillRect(24 + metrics.width + 4, lastY - 13, 7, 13)
    }

    ctx.font = '10px "JetBrains Mono", monospace'
    ctx.fillStyle = 'rgba(240,237,230,0.3)'
    ctx.fillText('AGENT STUDIO · LOCAL', 24, canvas.height - 20)
  }

  const addLine = () => {
    if (lineIndex < allLines.length) {
      lines.push(allLines[lineIndex])
      lineIndex++
    } else {
      lineIndex = 0
      lines.length = 0
    }
    draw()
  }

  const cursorInterval = setInterval(() => {
    cursorVisible = !cursorVisible
    draw()
  }, 530)

  const lineInterval = setInterval(addLine, 350 + Math.random() * 300)
  addLine()

  return () => {
    clearInterval(cursorInterval)
    clearInterval(lineInterval)
  }
}

export function drawAtlasTrading(canvas: HTMLCanvasElement): (() => void) | undefined {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width: w, height: h } = canvas
  const candleCount = 40
  const volumeH = h * 0.2
  const chartH = h * 0.75
  const candleW = (w - 48) / candleCount

  const candles = Array.from({ length: candleCount }, () => {
    const open = 100 + Math.random() * 80
    const close = open + (Math.random() - 0.48) * 20
    const high = Math.max(open, close) + Math.random() * 8
    const low = Math.min(open, close) - Math.random() * 8
    const volume = Math.random()
    return { open, close, high, low, volume }
  })

  const prices = candles.flatMap(c => [c.high, c.low])
  const minP = Math.min(...prices)
  const maxP = Math.max(...prices)
  const range = maxP - minP || 1

  const toY = (price: number) => 20 + ((maxP - price) / range) * (chartH - 40)
  const toVolY = (v: number) => h - 10 - v * volumeH

  const sma = candles.map((_, i) => {
    const slice = candles.slice(Math.max(0, i - 9), i + 1)
    return slice.reduce((a, c) => a + (c.open + c.close) / 2, 0) / slice.length
  })

  let frame = 0

  const draw = () => {
    ctx.fillStyle = '#0C0C0A'
    ctx.fillRect(0, 0, w, h)

    const count = Math.min(frame, candleCount)
    candles.slice(0, count).forEach((c, i) => {
      const x = 24 + i * candleW
      const isBull = c.close >= c.open
      const color = isBull ? 'rgba(200,255,0,0.8)' : 'rgba(255,77,109,0.8)'
      const cy1 = toY(c.open)
      const cy2 = toY(c.close)

      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x + candleW * 0.5, toY(c.high))
      ctx.lineTo(x + candleW * 0.5, toY(c.low))
      ctx.stroke()

      ctx.fillStyle = color
      ctx.fillRect(x + 1, Math.min(cy1, cy2), candleW - 3, Math.max(2, Math.abs(cy2 - cy1)))

      ctx.fillStyle = isBull ? 'rgba(200,255,0,0.3)' : 'rgba(255,77,109,0.3)'
      ctx.fillRect(x + 1, toVolY(c.volume), candleW - 3, h - 10 - toVolY(c.volume))
    })

    if (count > 1) {
      ctx.strokeStyle = 'rgba(240,237,230,0.4)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      sma.slice(0, count).forEach((v, i) => {
        const x = 24 + i * candleW + candleW * 0.5
        i === 0 ? ctx.moveTo(x, toY(v)) : ctx.lineTo(x, toY(v))
      })
      ctx.stroke()
    }

    ctx.font = '10px "JetBrains Mono", monospace'
    ctx.fillStyle = 'rgba(240,237,230,0.6)'
    ctx.fillText('ATLAS · 1H · LIVE', 24, h - 12)
  }

  const interval = setInterval(() => {
    frame = frame < candleCount ? frame + 1 : 0
    draw()
  }, 60)

  draw()
  return () => clearInterval(interval)
}

export function drawTikTokPipeline(canvas: HTMLCanvasElement): (() => void) | undefined {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width: w, height: h } = canvas
  const cols = 3
  const rows = 4
  const padX = 16
  const padY = 16
  const gapX = 10
  const gapY = 10
  const frameW = (w - padX * 2 - gapX * (cols - 1)) / cols
  const frameH = (h - padY * 2 - gapY * (rows - 1)) / rows

  const gradients: [string, string][] = [
    ['#1a1a10', '#2a2818'], ['#101520', '#1a2030'],
    ['#15101a', '#25182a'], ['#0a1510', '#101f15'],
    ['#1a1008', '#2a1810'], ['#0a1520', '#10202a'],
    ['#15101a', '#201520'], ['#101510', '#182018'],
    ['#1a1808', '#252312'], ['#0c1018', '#141820'],
    ['#120c18', '#1a1225'], ['#0c1510', '#121f14'],
  ]

  let activeFrame = 0

  const draw = () => {
    ctx.fillStyle = '#0C0C0A'
    ctx.fillRect(0, 0, w, h)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col
        const x = padX + col * (frameW + gapX)
        const y = padY + row * (frameH + gapY)
        const [c1, c2] = gradients[idx]

        const grad = ctx.createLinearGradient(x, y, x, y + frameH)
        grad.addColorStop(0, c1)
        grad.addColorStop(1, c2)
        ctx.fillStyle = grad
        ctx.fillRect(x, y, frameW, frameH)

        if (idx === activeFrame) {
          ctx.strokeStyle = '#C8FF00'
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, frameW, frameH)
        }

        const cx = x + frameW / 2
        const cy = y + frameH / 2 - 6
        ctx.fillStyle = 'rgba(240,237,230,0.6)'
        ctx.beginPath()
        ctx.moveTo(cx - 5, cy - 7)
        ctx.lineTo(cx - 5, cy + 7)
        ctx.lineTo(cx + 7, cy)
        ctx.closePath()
        ctx.fill()

        if (idx === activeFrame) {
          ctx.font = '7px "JetBrains Mono", monospace'
          ctx.fillStyle = 'rgba(240,237,230,0.5)'
          ctx.fillText('1080×1920 · AUTO', x + 3, y + frameH - 5)
        }
      }
    }
  }

  const interval = setInterval(() => {
    activeFrame = (activeFrame + 1) % (cols * rows)
    draw()
  }, 600)

  draw()
  return () => clearInterval(interval)
}
