/* ============================================================
   AAZ Portfolio V4 — TextScramble React Component
   Wraps TextScramble utility, triggers on mount or external signal
   ============================================================ */

import { useEffect, useRef } from 'react'
import { TextScramble as TextScrambleUtil } from '../../utils/textScramble'

interface TextScrambleProps {
  text: string
  trigger?: boolean   // if false, runs on mount; if boolean, runs when flips to true
  style?: React.CSSProperties
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

export default function TextScrambleComp({
  text,
  trigger = true,
  style,
  className,
  tag: Tag = 'span',
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null)
  const scramblerRef = useRef<TextScrambleUtil | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.innerText = text
      scramblerRef.current = new TextScrambleUtil(ref.current)
    }
  }, [text])

  useEffect(() => {
    if (trigger && scramblerRef.current) {
      scramblerRef.current.setText(text)
    }
  }, [trigger, text])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={style}
      className={className}
    >
      {text}
    </Tag>
  )
}
