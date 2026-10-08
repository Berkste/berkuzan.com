import { AnimatePresence, motion } from 'framer-motion'
import { getTheme } from '../../data/themes'
import { TRANSITION_MS, useTheme } from '../../lib/theme-context'

const SECONDS = TRANSITION_MS / 1000

/**
 * The swap between universes. Purely decorative and always
 * `pointer-events: none`, so it never blocks a click mid-transition. The
 * provider skips it entirely under `prefers-reduced-motion`.
 */
export function ThemeTransition() {
  const { transitioningTo } = useTheme()
  const flavour = transitioningTo ? getTheme(transitioningTo).transition : 'plain'

  return (
    <AnimatePresence>
      {transitioningTo && (
        <motion.div
          key={transitioningTo}
          className="theme-swap"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          {flavour === 'spell' && <SpellCircle />}
          {flavour === 'scanline' && <ScanlineBoot />}
          {flavour === 'plain' && <PlainFade />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Wizarding: a golden rune circle expands outward, particles trail behind it. */
function SpellCircle() {
  return (
    <>
      <motion.span
        className="theme-swap-veil theme-swap-veil--gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0] }}
        transition={{ duration: SECONDS, times: [0, 0.4, 1], ease: 'easeInOut' }}
      />
      <motion.span
        className="theme-swap-ring"
        initial={{ scale: 0, opacity: 0.95 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: SECONDS, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="theme-swap-ring theme-swap-ring--inner"
        initial={{ scale: 0, opacity: 0.8, rotate: 0 }}
        animate={{ scale: 1.7, opacity: 0, rotate: 90 }}
        transition={{ duration: SECONDS * 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
      />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="theme-swap-spark"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * (180 + (i % 4) * 60),
              y: Math.sin(angle) * (180 + (i % 4) * 60),
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: SECONDS * 0.85, delay: 0.05, ease: 'easeOut' }}
          />
        )
      })}
    </>
  )
}

/** Sci-fi: the display darkens, then a scanline sweeps a booting system in. */
function ScanlineBoot() {
  return (
    <>
      <motion.span
        className="theme-swap-veil theme-swap-veil--dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0] }}
        transition={{ duration: SECONDS, times: [0, 0.35, 1], ease: 'easeInOut' }}
      />
      <motion.span
        className="theme-swap-sweep"
        initial={{ y: '-110%' }}
        animate={{ y: '110%' }}
        transition={{ duration: SECONDS * 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="theme-swap-boot"
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: [0, 1, 0], letterSpacing: '0.28em' }}
        transition={{ duration: SECONDS, times: [0, 0.45, 1] }}
      >
        SYSTEM ONLINE
      </motion.span>
    </>
  )
}

/** The two original themes get a plain, quiet cross-fade. */
function PlainFade() {
  return (
    <motion.span
      className="theme-swap-veil theme-swap-veil--dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: SECONDS * 0.7, times: [0, 0.4, 1] }}
    />
  )
}
