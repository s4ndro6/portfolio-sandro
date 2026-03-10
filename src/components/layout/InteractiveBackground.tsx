import { useRef, useEffect } from 'react'

interface Point {
  x: number
  y: number
  baseX: number
  baseY: number
  opacity: number
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const pointsRef = useRef<Point[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth <= 640
    if (isMobile) return

    const COLS = 20
    const ROWS = 20
    const REPULSION_RADIUS = 120
    const BASE_OPACITY = 0.15

    const buildGrid = () => {
      const pts: Point[] = []
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const bx = (col / (COLS - 1)) * canvas.width
          const by = (row / (ROWS - 1)) * canvas.height
          pts.push({ x: bx, y: by, baseX: bx, baseY: by, opacity: BASE_OPACITY })
        }
      }
      pointsRef.current = pts
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildGrid()
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    let t = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.005
      const mouse = mouseRef.current

      pointsRef.current.forEach((pt, i) => {
        const idleY = Math.sin(t + i * 0.28) * 2.5

        const dx = mouse.x - pt.baseX
        const dy = mouse.y - pt.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetX = pt.baseX
        let targetY = pt.baseY + idleY
        let targetOpacity = BASE_OPACITY

        if (dist < REPULSION_RADIUS) {
          const ratio = 1 - dist / REPULSION_RADIUS
          const force = ratio * 18
          targetX = pt.baseX - (dx / (dist || 1)) * force
          targetY = pt.baseY - (dy / (dist || 1)) * force + idleY
          targetOpacity = BASE_OPACITY + ratio * 0.45
        }

        pt.x += (targetX - pt.x) * 0.08
        pt.y += (targetY - pt.y) * 0.08
        pt.opacity += (targetOpacity - pt.opacity) * 0.08

        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 255, 0, ${pt.opacity})`
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="interactive-bg"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
