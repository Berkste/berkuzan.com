import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/useReducedMotion'
import { cn } from '../../lib/cn'

type TypeLineProps = {
  text: string
  /** ms per character */
  speed?: number
  startDelay?: number
  className?: string
  cursor?: boolean
  /** Only start typing once this flips true (used by the Koala OS terminal). */
  active?: boolean
  onDone?: () => void
}

/** Terminal-style typewriter. Renders instantly when motion is reduced. */
export function TypeLine({
  text,
  speed = 55,
  startDelay = 0,
  className,
  cursor = true,
  active = true,
  onDone,
}: TypeLineProps) {
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setCount(text.length)
      onDone?.()
      return
    }

    setCount(0)
    let i = 0
    let timer: number

    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) {
          window.clearInterval(timer)
          onDone?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduced, active])

  const done = count >= text.length

  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      <span aria-hidden>
        {text.slice(0, count)}
        {cursor && (
          <span
            className={cn(
              'ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-accent',
              done && 'animate-blink',
            )}
          />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
