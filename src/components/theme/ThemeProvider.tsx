import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { DEFAULT_THEME, getTheme, isThemeId, type ThemeId } from '../../data/themes'
import { microcopy } from '../../data/microcopy'
import {
  SWAP_AT_MS,
  THEME_KEY,
  ThemeContext,
  TRANSITION_MS,
  type ThemeContextValue,
} from '../../lib/theme-context'

function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return isThemeId(stored) ? stored : DEFAULT_THEME
  } catch {
    /* private mode / storage disabled — the default still applies */
    return DEFAULT_THEME
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme)
  const [transitioningTo, setTransitioningTo] = useState<ThemeId | null>(null)
  const timers = useRef<number[]>([])

  /* Mirrors `theme` so `setTheme` can read the current value without taking a
     dependency on it — the callback stays stable across theme changes. */
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* nothing to do — the theme still applies for this session */
    }
  }, [theme])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(window.clearTimeout)
  }, [])

  const setTheme = useCallback((next: ThemeId) => {
    if (themeRef.current === next) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      themeRef.current = next
      setThemeState(next)
      return
    }

    /* A swap already in flight is superseded by this one. */
    timers.current.forEach(window.clearTimeout)
    timers.current = []

    /* Claim the target immediately so a double-click can't queue two swaps,
       then let the overlay cover the page before the palette actually flips —
       that way the change reads as one deliberate moment, not a flash. */
    themeRef.current = next
    setTransitioningTo(next)
    timers.current.push(
      window.setTimeout(() => setThemeState(next), SWAP_AT_MS),
      window.setTimeout(() => setTransitioningTo(null), TRANSITION_MS),
    )
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      def: getTheme(theme),
      copy: microcopy[theme],
      setTheme,
      transitioningTo,
    }),
    [theme, setTheme, transitioningTo],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
