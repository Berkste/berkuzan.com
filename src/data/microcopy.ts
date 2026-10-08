import type { ThemeId } from './themes'

/**
 * Decorative strings only. These are the little terminal prompts and labels
 * that sell each universe — the actual portfolio content never changes with
 * the theme.
 */
export type Microcopy = {
  heroPrompt: string
  nowLabel: string
  nowBadge: string
  statusFile: string
  balimFile: string
  statusHeading: string
  osTitle: string
  osHint: string
  coffeeLabel: string
}

const base: Microcopy = {
  heroPrompt: 'sudo whoami',
  nowLabel: 'Şu anda:',
  nowBadge: 'live',
  statusFile: 'cat life_status.txt',
  balimFile: 'cat life_status.txt',
  statusHeading: 'Status:',
  osTitle: 'KOALA OS',
  osHint: 'easter egg · esc ile çık',
  coffeeLabel: 'coffee',
}

export const microcopy: Record<ThemeId, Microcopy> = {
  burgundy: base,
  // amber: base,
  // 'neon-sci-fi': {
  //   ...base,
  //   heroPrompt: 'sudo identify --user',
  //   nowLabel: 'Sistem durumu:',
  //   nowBadge: 'online',
  //   statusFile: 'telemetry --stream life_status',
  //   balimFile: 'telemetry --unit balim',
  //   statusHeading: 'SYSTEM:',
  //   osTitle: 'KOALA OS',
  //   osHint: 'easter egg · esc ile çık',
  //   coffeeLabel: 'coffee',
  // },
  wizarding: {
    ...base,
    heroPrompt: 'incantation: codeus maximus',
    nowLabel: 'Şu anki büyü:',
    nowBadge: 'aktif',
    statusFile: 'grimoire --oku hayat_durumu',
    balimFile: 'grimoire --oku familiar',
    statusHeading: 'Büyülü Durum:',
    osTitle: 'KOALA OS',
    osHint: 'gizli oda · esc ile çık',
    coffeeLabel: 'iksir',
  },
}
