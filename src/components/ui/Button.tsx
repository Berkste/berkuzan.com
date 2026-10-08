import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'outline' | 'ghost' | 'icon'
type Size = 'sm' | 'md' | 'lg'

/* `btn` / `btn-*` carry no styling of their own — they are the hooks theme
   skins in index.css use to reshape buttons without touching this file. */
const base =
  'btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ' +
  'disabled:cursor-not-allowed disabled:opacity-45 active:translate-y-px'

const variants: Record<Variant, string> = {
  primary:
    'btn-primary bg-[linear-gradient(120deg,var(--burgundy-bright),var(--accent))] text-[#1a0308] ' +
    'shadow-[0_10px_30px_-12px_rgba(var(--glow-rgb),0.85)] hover:shadow-[0_16px_44px_-12px_rgba(var(--glow-rgb),0.95)] hover:brightness-110',
  outline:
    'btn-outline border border-edge-strong/70 bg-white/[0.02] text-ink-primary hover:border-accent hover:bg-accent/10 hover:text-ink-primary',
  ghost: 'btn-ghost text-ink-secondary hover:bg-white/5 hover:text-ink-primary',
  icon: 'btn-icon border border-edge bg-white/[0.03] text-ink-secondary hover:border-accent/70 hover:text-accent hover:shadow-neon',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[15px]',
}

type Common = {
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Common & ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(base, variants[variant], variant !== 'icon' && sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Common & ComponentProps<'a'>) {
  return (
    <a
      className={cn(base, variants[variant], variant !== 'icon' && sizes[size], className)}
      {...rest}
    >
      {children}
    </a>
  )
}
