import { CloudMoon, Moon } from 'lucide-react'
import { Card } from '../ui/Card'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

/**
 * The small "night in Ankara" widget from the reference. Static by design —
 * there is no backend, and a fake live feed would be worse than an honest one.
 */
export function AmbientCard({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden p-4', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: 'radial-gradient(70% 120% at 8% 0%, rgba(255,138,76,0.16), transparent 62%)',
        }}
      />

      <div className="relative flex items-start gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-edge bg-black/30 text-accent-warm">
          <CloudMoon className="h-5 w-5" aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[12.5px] text-ink-secondary">{site.location.split(',')[0]},</p>
            <span className="flex items-center gap-1 font-mono text-[10px] text-ink-muted">
              <Moon className="h-3 w-3" aria-hidden />
              gece
            </span>
          </div>
          <p className="font-display text-2xl font-semibold leading-tight">22°C</p>
        </div>
      </div>

      <p className="relative mt-3 border-t border-edge pt-3 text-[12px] italic leading-relaxed text-ink-secondary">
        “En güzel kod, çalışan ve temiz olanıdır.”
      </p>
    </Card>
  )
}
