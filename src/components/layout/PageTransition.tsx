import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  )
}
