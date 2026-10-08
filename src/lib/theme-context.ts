import { createContext, useContext } from 'react'
import type { ThemeDef, ThemeId } from '../data/themes'
import type { Microcopy } from '../data/microcopy'

export const THEME_KEY = 'koala-theme'

/** How long the swap overlay runs. Short enough to never feel like a wait. */
export const TRANSITION_MS = 620
/** The new palette is applied at the peak of the overlay, not at the start. */
export const SWAP_AT_MS = 260

export type ThemeContextValue = {
  theme: ThemeId
  def: ThemeDef
  copy: Microcopy
  setTheme: (id: ThemeId) => void
  /** The theme being transitioned *into*, or null when idle. */
  transitioningTo: ThemeId | null
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

/** Convenience for components that only need the decorative strings. */
export function useThemeCopy() {
  return useTheme().copy
}
