import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Palette } from 'lucide-react'
import { themes } from '../../data/themes'
import { useTheme } from '../../lib/theme-context'
import { cn } from '../../lib/cn'
import { Button } from './Button'

/** Navbar control that swaps between every registered theme. */
export function ThemePicker({ className }: { className?: string }) {
  const { theme, def, setTheme } = useTheme()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  /* Close on outside click and on Escape, and return focus to the trigger. */
  useEffect(() => {
    if (!open) return

    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      wrapRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
    }

    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      <Button
        variant="icon"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Tema: ${def.label}. Değiştirmek için aç`}
        title={`Tema: ${def.label}`}
        className="h-10 w-10 rounded-full"
      >
        <Palette className="h-[18px] w-[18px]" aria-hidden />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Tema seç"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="panel absolute right-0 top-[calc(100%+10px)] z-50 w-[268px] origin-top-right overflow-hidden p-1.5"
          >
            <p className="px-2.5 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Evren seç
            </p>

            {themes.map((t) => {
              const active = t.id === theme
              return (
                <button
                  key={t.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setTheme(t.id)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors duration-200',
                    active ? 'bg-accent/12' : 'hover:bg-white/[0.05]',
                  )}
                >
                  {/* Palette preview: background, mid tone, accent */}
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-edge"
                  >
                    {t.swatch.map((c) => (
                      <span key={c} className="h-full flex-1" style={{ background: c }} />
                    ))}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block truncate text-[13px] font-medium',
                        active ? 'text-accent-soft' : 'text-ink-primary',
                      )}
                    >
                      {t.label}
                    </span>
                    <span className="block truncate text-[11px] text-ink-muted">{t.hint}</span>
                  </span>

                  {active && <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
