import { useEffect, useRef } from 'react'
import { useTheme } from '../../lib/theme-context'

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  gold: boolean
}

/** Hard ceiling — the pool is reused, never grown. */
const MAX_SPARKS = 90
/** Sparks emitted per pointer move, once the pointer has travelled far enough. */
const EMIT_PER_MOVE = 2
const EMIT_MIN_DISTANCE = 6
/** Burst emitted on click. */
const BURST = 18

/**
 * Wand trail for the Wizarding theme: a small pool of gold sparks that follow
 * the cursor and burst on click.
 *
 * Deliberately kept out of React's render path — the pool lives in a ref and
 * the canvas is driven by a single rAF loop that **stops itself** as soon as
 * every spark has died, so an idle page costs nothing.
 *
 * Skipped entirely on touch/coarse pointers and when reduced motion is on.
 */
export function WandTrail() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (theme !== 'wizarding') return

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const sparks: Spark[] = []
    let raf = 0
    let running = false
    let last = { x: 0, y: 0, set: false }
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (x: number, y: number, count: number, power = 1) => {
      for (let i = 0; i < count && sparks.length < MAX_SPARKS; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = (0.25 + Math.random() * 1.1) * power
        const maxLife = 420 + Math.random() * 480
        sparks.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.18,
          life: maxLife,
          maxLife,
          size: 0.8 + Math.random() * 1.9,
          gold: Math.random() > 0.28,
        })
      }
      start()
    }

    let prevTime = 0
    const frame = (time: number) => {
      const dt = prevTime ? Math.min(time - prevTime, 48) : 16
      prevTime = time

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life -= dt
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        s.x += s.vx * (dt / 16)
        s.y += s.vy * (dt / 16)
        s.vy += 0.012 * (dt / 16) // a little settle, like drifting embers
        s.vx *= 0.985
        s.vy *= 0.985

        const t = s.life / s.maxLife
        const alpha = t * t
        const r = s.size * (0.4 + t * 0.9)

        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 5)
        const core = s.gold ? '255, 214, 122' : '255, 140, 170'
        glow.addColorStop(0, `rgba(${core}, ${alpha})`)
        glow.addColorStop(0.35, `rgba(${core}, ${alpha * 0.35})`)
        glow.addColorStop(1, `rgba(${core}, 0)`)

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, r * 5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'

      if (sparks.length) {
        raf = requestAnimationFrame(frame)
      } else {
        running = false
        prevTime = 0
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }

    function start() {
      if (running) return
      running = true
      prevTime = 0
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (last.set) {
        const dx = e.clientX - last.x
        const dy = e.clientY - last.y
        if (dx * dx + dy * dy < EMIT_MIN_DISTANCE * EMIT_MIN_DISTANCE) return
      }
      last = { x: e.clientX, y: e.clientY, set: true }
      spawn(e.clientX, e.clientY, EMIT_PER_MOVE)
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      spawn(e.clientX, e.clientY, BURST, 2.4)
    }

    /* Nothing should keep animating in a hidden tab. */
    const onVisibility = () => {
      if (document.hidden) {
        sparks.length = 0
        cancelAnimationFrame(raf)
        running = false
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [theme])

  if (theme !== 'wizarding') return null

  return <canvas ref={canvasRef} className="wand-canvas" aria-hidden />
}
