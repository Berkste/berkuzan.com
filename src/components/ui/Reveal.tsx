import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance travelled on entry, in px. */
  y?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * The single scroll-reveal used site-wide, so the vertical rhythm of the page
 * stays consistent instead of every section inventing its own animation.
 */
export function Reveal({ children, className, delay = 0, y = 26 }: RevealProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
