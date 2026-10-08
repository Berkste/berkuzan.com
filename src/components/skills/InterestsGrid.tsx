import { motion, useReducedMotion } from 'framer-motion'
import { interests } from '../../data/site'
import { Card } from '../ui/Card'

export function InterestsGrid() {
  const reduced = useReducedMotion()

  return (
    <Card className="p-5 sm:p-6">
      <h3 className="text-[15px] font-semibold text-ink-primary">İlgilendiğim Alanlar</h3>

      <ul className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
        {interests.map(({ icon: Icon, label }, i) => (
          <motion.li
            key={label}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04 * i, duration: 0.4 }}
            whileHover={reduced ? undefined : { y: -4 }}
            className="group flex cursor-default flex-col items-center gap-2 rounded-xl border border-transparent px-1.5 py-3 text-center transition-colors duration-300 hover:border-edge hover:bg-white/[0.03]"
          >
            <span className="group-hover:border-accent/55 grid h-10 w-10 place-items-center rounded-xl border border-edge bg-black/25 text-ink-secondary transition-all duration-300 group-hover:text-accent group-hover:shadow-neon">
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <span className="text-[10.5px] leading-tight text-ink-muted transition-colors duration-300 group-hover:text-ink-secondary">
              {label}
            </span>
          </motion.li>
        ))}
      </ul>
    </Card>
  )
}
