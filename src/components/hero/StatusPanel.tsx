import { motion, useReducedMotion } from 'framer-motion'
import { nowStatus } from '../../data/site'
import { useThemeCopy } from '../../lib/theme-context'
import { Card } from '../ui/Card'

/** "Şu anda:" — what Berk is doing right now, sci-fi console styling. */
export function StatusPanel() {
  const reduced = useReducedMotion()
  const copy = useThemeCopy()

  return (
    <Card neon className="overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[13px] font-medium text-ink-secondary">{copy.nowLabel}</p>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            {copy.nowBadge}
          </span>
        </span>
      </div>

      <ul className="space-y-2">
        {nowStatus.map(({ icon: Icon, title, detail }, i) => (
          <motion.li
            key={title}
            initial={reduced ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.09, duration: 0.45 }}
            className="group flex items-center gap-3 rounded-xl border border-transparent px-1.5 py-1.5 transition-colors duration-300 hover:border-edge hover:bg-white/[0.03]"
          >
            <span className="from-burgundy/40 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-edge bg-gradient-to-br to-transparent text-accent transition-shadow duration-300 group-hover:shadow-neon">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-ink-primary">
                {title}
              </span>
              <span className="block truncate text-[11.5px] text-ink-muted">{detail}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </Card>
  )
}
