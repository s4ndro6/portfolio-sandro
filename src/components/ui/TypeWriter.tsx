/* ============================================================
   AAZ Portfolio V4 — TypeWriter
   Character-by-character typing with blinking cursor
   ============================================================ */

import { useEffect, useRef, useState } from 'react'

interface TypeWriterProps {
  text: string
  speed?: number
  onComplete?: () => void
  style?: React.CSSProperties
  className?: string
}

export default function TypeWriter({
  text,
  speed = 55,
  onComplete,
  style,
  className,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    const id = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(id)
        setDone(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(id)
  }, [text, speed, onComplete])

  return (
    <span style={style} className={className}>
      {displayed}
      <span
        className="cursor-blink"
        style={{ opacity: done ? 1 : 0.8 }}
      >
        |
      </span>
    </span>
  )
}
