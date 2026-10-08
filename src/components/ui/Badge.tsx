import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeProps = {
  children: ReactNode
  className?: string
  tone?: 'default' | 'accent' | 'mono'
  size?: 'sm' | 'md'
}

const tones = {
  default: 'border-edge bg-white/[0.03] text-ink-secondary',
  accent: 'border-accent/45 bg-accent/12 text-accent-soft',
  mono: 'border-edge bg-black/30 font-mono text-ink-secondary',
} as const

export function Badge({ children, className, tone = 'default', size = 'md' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border transition-colors duration-200',
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
