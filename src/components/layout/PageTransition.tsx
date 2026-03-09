/* ============================================================
   AAZ Portfolio V4 — PageTransition
   Framer Motion clip-path diagonal reveal/exit
   ============================================================ */

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const variants = {
  initial: { clipPath: 'inset(100% 0% 0% 100%)' },
  animate: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] as const },
  },
  exit: {
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1] as const },
  },
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ background: 'var(--bg-0)', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}
