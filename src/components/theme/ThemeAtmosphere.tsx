import { useMemo } from 'react'
import { useTheme } from '../../lib/theme-context'
import { usePrefersReducedMotion } from '../../lib/useReducedMotion'

/**
 * Per-theme background scenery. Everything here is a fixed, pointer-events-none
 * layer animated purely in CSS — no rAF loop, no React re-renders while it runs,
 * and the whole thing unmounts when the theme doesn't use it.
 *
 * Element counts are deliberately small (6 beams, 22 motes); the depth comes
 * from layering gradients, not from spawning particles.
 */
export function ThemeAtmosphere() {
  const { theme } = useTheme()
  const reduced = usePrefersReducedMotion()

  // if (theme === 'neon-sci-fi') return <SciFiAtmosphere reduced={reduced} />
  if (theme === 'wizarding') return <WizardingAtmosphere reduced={reduced} />
  return null
}

/* ------------------------------------------------------------------ sci-fi */

/**
 * `cycle` is the full loop; the keyframe compresses the actual pass into ~14%
 * of it, so each beam crosses the viewport in roughly 2–3s and then waits.
 * Staggered offsets keep them from ever firing in unison.
 */
// const BEAMS = [
//   { top: '12%', delay: -1, cycle: 17, width: '34vw', opacity: 0.9 },
//   { top: '27%', delay: -8, cycle: 21, width: '22vw', opacity: 0.55 },
//   { top: '46%', delay: -14, cycle: 19, width: '46vw', opacity: 0.75 },
//   { top: '61%', delay: -4, cycle: 24, width: '28vw', opacity: 0.5 },
//   { top: '78%', delay: -19, cycle: 16, width: '38vw', opacity: 0.7 },
//   { top: '90%', delay: -11, cycle: 26, width: '24vw', opacity: 0.4 },
// ]

// function SciFiAtmosphere({ reduced }: { reduced: boolean }) {
//   return (
//     <div className="atmos" aria-hidden>
//       {/* Perspective grid receding toward the horizon */}
//       <div className="atmos-grid" />

//       {/* Slow drifting neon nebulae */}
//       <div className="atmos-nebula" />

//       {/* Fast light streaks — the "starship speed" cue */}
//       {!reduced && (
//         <div className="atmos-beams">
//           {BEAMS.map((b, i) => (
//             <span
//               key={i}
//               className="atmos-beam"
//               style={{
//                 top: b.top,
//                 width: b.width,
//                 opacity: b.opacity,
//                 animationDuration: `${b.cycle}s`,
//                 animationDelay: `${b.delay}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* CRT scanlines + holographic noise, very low opacity */}
//       <div className="atmos-scan" />
//     </div>
//   )
// }

/* --------------------------------------------------------------- wizarding */

const MOTE_COUNT = 22

function WizardingAtmosphere({ reduced }: { reduced: boolean }) {
  /* Positions are randomised once per mount so the drift never looks gridded. */
  const motes = useMemo(
    () =>
      Array.from({ length: MOTE_COUNT }, (_, i) => ({
        left: `${(i * 37 + ((i * i * 13) % 47)) % 100}%`,
        size: 1.5 + ((i * 7) % 5) * 0.7,
        duration: 16 + ((i * 11) % 14),
        delay: -((i * 5.5) % 20),
        drift: `${((i % 5) - 2) * 3}vw`,
      })),
    [],
  )

  return (
    <div className="atmos" aria-hidden>
      {/* Candlelit vignette that breathes like a flame */}
      <div className="atmos-candle" />

      {/* Blurred atmospheric mist */}
      <div className="atmos-mist" />

      {/* Castle silhouette along the bottom of the page: curtain wall at y=176
          with six spired towers rising out of it. */}
      <svg
        className="atmos-castle"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        focusable="false"
      >
        {/* Towers are drawn narrow on purpose: `preserveAspectRatio="none"`
            stretches the box horizontally on wide screens, and slim shapes in
            the viewBox come out correctly proportioned on screen. */}
        <path
          d="M0 220V176h140v-64l13-60 13 60v64h164V88l16-68 16 68v88h198V64l20-60 20 60v112h200v-76l14-56 14 56v76h182V80l17-58 17 58v96h186v-60l13-58 13 58v60h184v44z"
          fill="currentColor"
        />
        {/* Windows, lit from inside */}
        <g className="atmos-castle-windows">
          {[
            [147, 126],
            [147, 152],
            [340, 104],
            [340, 136],
            [574, 82],
            [574, 118],
            [808, 116],
            [1021, 96],
            [1021, 132],
            [1237, 130],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="7"
              height="16"
              rx="3"
              style={{ animationDelay: `${(i * 1.7) % 6}s` }}
            />
          ))}
        </g>
      </svg>

      {/* Floating dust + occasional gold sparks */}
      {!reduced && (
        <div className="atmos-motes">
          {motes.map((m, i) => (
            <span
              key={i}
              className={i % 6 === 0 ? 'atmos-mote atmos-mote--spark' : 'atmos-mote'}
              style={{
                left: m.left,
                width: `${m.size}px`,
                height: `${m.size}px`,
                animationDuration: `${m.duration}s`,
                animationDelay: `${m.delay}s`,
                ['--drift' as string]: m.drift,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
