import { motion, useReducedMotion } from 'framer-motion'
import { lifeStats } from '../../data/site'
import { useThemeCopy } from '../../lib/theme-context'
import { Card } from '../ui/Card'
import { cn } from '../../lib/cn'

const CELLS = 10

/** "> cat life_status.txt" — ASCII-style meters, rendered as real progress bars. */
export function LifeStatus() {
  const reduced = useReducedMotion()
  const copy = useThemeCopy()

  return (
    <Card className="p-4">
      <p className="mb-3 font-mono text-[12px] text-ink-muted">
        <span className="text-accent">&gt;</span> {copy.statusFile}
      </p>

      <ul className="space-y-[7px]">
        {lifeStats.map(({ label, value }, row) => {
          const filled = Math.round((value / 100) * CELLS)
          return (
            <li key={label} className="flex items-center gap-2 font-mono text-[11px]">
              <span className="w-[62px] shrink-0 text-ink-secondary">{label}</span>

              <span
                className="flex flex-1 gap-[2px]"
                role="img"
                aria-label={`${label}: yüzde ${value}`}
              >
                {Array.from({ length: CELLS }, (_, i) => (
                  <motion.span
                    key={i}
                    initial={reduced ? false : { opacity: 0, scaleY: 0.3 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.25 + row * 0.06 + i * 0.02,
                      duration: 0.28,
                    }}
                    className={cn(
                      'h-[11px] flex-1 rounded-[2px]',
                      i < filled
                        ? 'bg-[linear-gradient(180deg,var(--accent),var(--burgundy-bright))] shadow-[0_0_8px_-1px_rgba(255,61,104,0.75)]'
                        : 'bg-white/[0.07]',
                    )}
                  />
                ))}
              </span>

              <span className="w-[34px] shrink-0 text-right text-ink-secondary">{value}%</span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
