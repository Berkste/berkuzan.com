import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { TerminalSquare } from 'lucide-react'

/** Floating dock button that boots the Koala OS easter egg. */
export function KoalaOSLauncher({ onOpen, hidden }: { onOpen: () => void; hidden: boolean }) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.button
          type="button"
          onClick={onOpen}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.92 }}
          whileHover={reduced ? undefined : { y: -3 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Koala OS terminalini aç"
          className="border-edge-strong/60 group fixed bottom-4 right-4 z-40 flex items-center gap-2.5 rounded-full border bg-[rgba(16,6,11,0.92)] p-2 backdrop-blur-xl transition-shadow duration-300 hover:shadow-neon sm:bottom-7 sm:right-7 sm:py-2.5 sm:pl-3 sm:pr-4"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(120deg,var(--burgundy-bright),var(--accent))] text-[#1a0308]">
            <TerminalSquare className="h-4 w-4" aria-hidden />
          </span>
          <span className="hidden text-left leading-none sm:block">
            <span className="block font-mono text-[12px] font-medium text-ink-primary">
              Koala OS
            </span>
            <span className="mt-0.5 block font-mono text-[9.5px] tracking-widest text-ink-muted">
              v1.0 · boot
            </span>
          </span>
          <span
            aria-hidden
            className="ml-0.5 hidden h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_1px_rgba(255,61,104,0.8)] sm:block"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
