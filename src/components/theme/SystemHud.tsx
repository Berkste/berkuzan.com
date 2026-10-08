import { useState } from 'react'
// import { useTheme } from '../../lib/theme-context'

/**
 * One small HUD readout pinned to the bottom-left, shown only in the sci-fi
 * universe. Deliberately the *only* piece of chrome-style decoration on the
 * page — a portfolio shouldn't read like a game menu.
 */
export function SystemHud() {
  // const { theme } = useTheme()
  const [uptime] = useState('00:00')

  // useEffect(() => {
  //   if (theme !== 'neon-sci-fi') return

  //   const started = Date.now()
  //   const tick = () => {
  //     const s = Math.floor((Date.now() - started) / 1000)
  //     setUptime(`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`)
  //   }
  //   tick()
  //   const id = window.setInterval(tick, 1000)
  //   return () => window.clearInterval(id)
  // }, [theme])

  // if (theme !== 'neon-sci-fi') return null

  return (
    <aside className="system-hud" aria-hidden>
      <span className="system-hud-dot" />
      <span>SYSTEM ONLINE</span>
      <span className="system-hud-sep">/</span>
      <span>USER: BERK</span>
      <span className="system-hud-sep">/</span>
      <span>STATUS: CODING</span>
      <span className="system-hud-sep">/</span>
      <span>SESSION {uptime}</span>
    </aside>
  )
}
