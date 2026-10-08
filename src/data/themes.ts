export type ThemeId = 'burgundy' | 'wizarding' //| 'amber' | 'neon-sci-fi' 

export type ThemeDef = {
  id: ThemeId
  label: string
  /** One line shown under the label in the picker. */
  hint: string
  /** Three colours used for the swatch preview: bg, mid, accent. */
  swatch: [string, string, string]
  /** Drives the flavour of the transition overlay when switching to it. */
  transition: 'plain' | 'scanline' | 'spell'
}

/**
 * The single source of truth for available themes. `id` doubles as the value of
 * `<html data-theme="...">` and as the persisted localStorage value, so adding a
 * theme is: one entry here + one `:root[data-theme='...']` block in index.css.
 */
export const themes: ThemeDef[] = [
  {
    id: 'burgundy',
    label: 'Burgundy',
    hint: 'Varsayılan — koyu şarabi',
    swatch: ['#0a0407', '#7a1230', '#ff3d68'],
    transition: 'plain',
  },
  // {
  //   id: 'amber',
  //   label: 'Amber',
  //   hint: 'Sıcak terminal turuncusu',
  //   swatch: ['#08060a', '#7d3c10', '#ff9d3d'],
  //   transition: 'plain',
  // },
  // {
  //   id: 'neon-sci-fi',
  //   label: 'Neon Dark Sci-Fi',
  //   hint: 'Neon şehir, ışık hüzmeleri, HUD',
  //   swatch: ['#050508', '#8a0f3c', '#ff2d6f'],
  //   transition: 'scanline',
  // },
  {
    id: 'wizarding',
    label: 'Wizarding',
    hint: 'Mum ışığı, altın, büyü tozu',
    swatch: ['#0a0808', '#6b1528', '#c9a227'],
    transition: 'spell',
  },
]

export const DEFAULT_THEME: ThemeId = 'burgundy'

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value)
}

export function getTheme(id: ThemeId): ThemeDef {
  return themes.find((t) => t.id === id) ?? themes[0]
}
