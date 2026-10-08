import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Square, X } from 'lucide-react'
import { TypeLine } from '../ui/TypeLine'
import { Button } from '../ui/Button'
import { useTheme } from '../../lib/theme-context'
import type { ThemeId } from '../../data/themes'

type Line =
  | { kind: 'prompt'; text: string }
  | { kind: 'out'; text: string }
  | { kind: 'meter'; label: string; value: number }
  | { kind: 'gap' }

const BASE_SCRIPT: Line[] = [
  { kind: 'prompt', text: 'whoami' },
  { kind: 'out', text: 'Berk Uzan' },
  { kind: 'gap' },
  { kind: 'prompt', text: 'status' },
  { kind: 'out', text: 'Coding...' },
  { kind: 'out', text: 'Creating...' },
  { kind: 'out', text: 'Playing...' },
  { kind: 'out', text: 'Thinking...' },
  { kind: 'gap' },
  { kind: 'prompt', text: 'coffee' },
  { kind: 'meter', label: 'brewing', value: 100 },
  { kind: 'gap' },
  { kind: 'prompt', text: 'exit' },
  { kind: 'out', text: 'Görüşürüz 🐨' },
]

/** Same beats, same length — only the vocabulary changes with the universe. */
const WIZARDING_SCRIPT: Line[] = [
  { kind: 'prompt', text: 'quis es' },
  { kind: 'out', text: 'Berk Uzan' },
  { kind: 'gap' },
  { kind: 'prompt', text: 'status' },
  { kind: 'out', text: 'Kod yazıyor...' },
  { kind: 'out', text: 'Büyü hazırlıyor...' },
  { kind: 'out', text: 'Oyun oynuyor...' },
  { kind: 'out', text: 'Düşünüyor...' },
  { kind: 'gap' },
  { kind: 'prompt', text: 'iksir' },
  { kind: 'meter', label: 'demleniyor', value: 100 },
  { kind: 'gap' },
  { kind: 'prompt', text: 'exit' },
  { kind: 'out', text: 'Nox 🐨' },
]

function scriptFor(theme: ThemeId): Line[] {
  return theme === 'wizarding' ? WIZARDING_SCRIPT : BASE_SCRIPT
}

export function KoalaOS({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <KoalaOSWindow onClose={onClose} />}</AnimatePresence>
}

/** Mounted only while open, so the boot sequence replays on every launch. */
function KoalaOSWindow({ onClose }: { onClose: () => void }) {
  const reduced = useReducedMotion()
  const { theme, copy } = useTheme()
  const SCRIPT = scriptFor(theme)
  const [step, setStep] = useState(0)
  const [runId, setRunId] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  /* Non-prompt lines auto-advance; prompt lines wait for the typewriter. */
  useEffect(() => {
    if (step >= SCRIPT.length) return
    const line = SCRIPT[step]
    if (line.kind === 'prompt') return

    const delay = reduced ? 0 : line.kind === 'gap' ? 120 : 260
    const timer = window.setTimeout(() => setStep((s) => s + 1), delay)
    return () => window.clearTimeout(timer)
  }, [step, reduced, SCRIPT])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [step])

  const visible = SCRIPT.slice(0, step + 1)

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="koala-os-title"
        initial={{ opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="panel neon-edge relative w-full max-w-[520px] overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-edge bg-black/40 px-4 py-2.5">
          <img
            src="/images/koala/favicon.png"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] rounded-full"
          />
          <p id="koala-os-title" className="font-mono text-[12.5px] text-ink-primary">
            {copy.osTitle} <span className="text-ink-muted">v1.0</span>
          </p>
          <div className="ml-auto flex items-center gap-1.5 text-ink-muted">
            <Minus className="h-3.5 w-3.5" aria-hidden />
            <Square className="h-3 w-3" aria-hidden />
            <Button
              ref={closeRef}
              variant="icon"
              onClick={onClose}
              aria-label="Koala OS'u kapat"
              className="h-7 w-7 rounded-md border-transparent bg-transparent"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="max-h-[58vh] min-h-[292px] space-y-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(8,3,6,0.9),rgba(20,7,13,0.9))] p-5 font-mono text-[13px] leading-relaxed"
        >
          {visible.map((line, i) => {
            const key = `${runId}-${i}`
            if (line.kind === 'gap') return <div key={key} className="h-2.5" />

            if (line.kind === 'meter') {
              const cells = 16
              return (
                <div key={key} className="flex items-center gap-2 text-accent">
                  <span
                    className="flex flex-1 gap-[2px]"
                    role="img"
                    aria-label={`${line.label} %${line.value}`}
                  >
                    {Array.from({ length: cells }, (_, c) => (
                      <motion.span
                        key={c}
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: c * 0.045 }}
                        className="h-3.5 flex-1 rounded-[1px] bg-accent shadow-[0_0_8px_-2px_var(--accent)]"
                      />
                    ))}
                  </span>
                  <span className="shrink-0 text-ink-secondary">{line.value}%</span>
                </div>
              )
            }

            if (line.kind === 'prompt') {
              const isLast = i === visible.length - 1
              return (
                <p key={key} className="text-accent-soft">
                  <span className="text-ink-muted">&gt;</span>{' '}
                  {isLast ? (
                    <TypeLine
                      text={line.text}
                      speed={70}
                      onDone={() => setStep((s) => (s === i ? s + 1 : s))}
                    />
                  ) : (
                    line.text
                  )}
                </p>
              )
            }

            return (
              <motion.p
                key={key}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="text-ink-secondary"
              >
                {line.text}
              </motion.p>
            )
          })}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-edge bg-black/30 px-4 py-2.5">
          <p className="font-mono text-[10.5px] text-ink-muted">{copy.osHint}</p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStep(0)
                setRunId((r) => r + 1)
              }}
            >
              Yeniden çalıştır
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Kapat
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
