import type { ComponentType, SVGProps } from 'react'
import {
  Brain,
  Coffee,
  Gamepad2,
  Mail,
  Music4,
  Palette,
  Rocket,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon, YoutubeIcon } from '../components/ui/BrandIcons'

/** Both lucide icons and the local brand glyphs satisfy this. */
export type IconType = ComponentType<SVGProps<SVGSVGElement>>

export const site = {
  name: 'Berk Uzan',
  tagline: 'Code · Design · Games · Life',
  role: 'Software Developer & Creative Technologist',
  location: 'Ankara, Türkiye',
  age: 32,
  zodiac: 'Boğa',
  cvPath: '/assets/Berk-Uzan-CV.pdf',
} as const

export type NavItem = { label: string; href: string }

export const navItems: NavItem[] = [
  { label: 'Ana Sayfa', href: '#top' },
  { label: 'Hakkımda', href: '#hakkimda' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'Blog', href: '#blog' },
  { label: 'CV', href: '#cv' },
  { label: 'Arşiv', href: '#arsiv' },
]

export const heroLabels = [
  'Software Developer',
  'Game Dev',
  'AI Explorer',
  'UI/UX Lover',
  'Nerd',
] as const

export type StatusItem = { icon: IconType; title: string; detail: string }

/** "Şu anda:" — the now-playing panel beside the hero. */
export const nowStatus: StatusItem[] = [
  {
    icon: TerminalSquare,
    title: 'Proje Geliştiriyorum',
    detail: 'Minerva Nail Art · yayına hazırlık',
  },
  { icon: Music4, title: 'Müzik Dinliyorum', detail: 'Lo-fi / Synthwave' },
  { icon: Gamepad2, title: 'Oyun Oynuyorum', detail: 'Tabii ki' },
  { icon: Coffee, title: 'Kahve İçiyorum', detail: 'Sürekli' },
]

export type LifeStat = { label: string; value: number }

/** "> cat life_status.txt" — deliberately unserious meters. */
export const lifeStats: LifeStat[] = [
  { label: 'Kodlama', value: 100 },
  { label: 'Öğrenme', value: 85 },
  { label: 'Oyun', value: 75 },
  { label: 'Film/Dizi', value: 70 },
  { label: 'Kedi', value: 100 },
  { label: 'Sosyal', value: 25 },
]

export type Interest = { icon: IconType; label: string }

export const interests: Interest[] = [
  { icon: Gamepad2, label: 'Oyun Geliştirme' },
  { icon: Brain, label: 'AI & LLM' },
  { icon: Rocket, label: 'Veri Analizi' },
  { icon: Palette, label: 'UI/UX Tasarım' },
  { icon: Sparkles, label: 'Bilim-Kurgu' },
  { icon: Music4, label: 'Pop Kültür' },
]

export const personalInterests = ['Yazılım', 'Oyunlar', 'Yapay Zeka', 'Filmler', 'Teknoloji']

export type SocialLink = {
  icon: IconType
  label: string
  /** Intentionally null — no accounts are invented; drop the real URLs in here. */
  href: string | null
}

export const socials: SocialLink[] = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/Berkste' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: null },
  { icon: XIcon, label: 'X', href: null },
  { icon: YoutubeIcon, label: 'YouTube', href: null },
  { icon: Mail, label: 'E-posta', href: null },
]
