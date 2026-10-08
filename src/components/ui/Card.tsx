import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

type CardProps = {
  children: ReactNode
  className?: string
  /** Renders the thin neon hairline along the top edge. */
  neon?: boolean
  /** Lifts and warms the border on hover. */
  interactive?: boolean
}

export function Card({ children, className, neon, interactive }: CardProps) {
  return (
    <motion.div
      whileHover={
        interactive
          ? {
              y: -4,
              transition: { type: 'spring', stiffness: 320, damping: 26 },
            }
          : undefined
      }
      className={cn(
        'panel',
        neon && 'neon-edge',
        interactive &&
          'group transition-[border-color,box-shadow] duration-300 hover:border-edge-strong hover:shadow-glow',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

/** Section-level heading with the small icon chip used throughout the reference. */
export function SectionHeader({
  icon,
  title,
  action,
  className,
  id,
}: {
  icon?: ReactNode
  title: string
  action?: ReactNode
  className?: string
  id?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3', className)}>
      <h2 id={id} className="flex items-center gap-2.5 text-xl font-semibold sm:text-2xl">
        {icon ? (
          <span className="from-burgundy/45 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-edge bg-gradient-to-br to-transparent text-accent">
            {icon}
          </span>
        ) : null}
        <span>{title}</span>
      </h2>
      {action}
    </div>
  )
}
