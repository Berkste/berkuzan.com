import type { IconType } from './site'
import { Bot, Boxes, Database, Layers, Wrench } from 'lucide-react'

export type SkillGroup = {
  id: string
  label: string
  icon: IconType
  items: string[]
}

/**
 * Technologies Berk works with or explores — not certifications, not
 * percentages, just an honest shelf of tools.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Diller',
    icon: Boxes,
    items: ['Dart', 'C#', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'frameworks',
    label: 'Framework & Platform',
    icon: Layers,
    items: [
      'Flutter',
      '.NET',
      'React',
      'Angular',
      'Flame',
      'Node.js',
      'Tauri',
      'Tailwind CSS',
      'Supabase',
    ],
  },
  {
    id: 'data',
    label: 'Veri & Altyapı',
    icon: Database,
    items: ['PostgreSQL', 'Elasticsearch', 'Kibana', 'Superset', 'Docker', 'Nginx'],
  },
  {
    id: 'tools',
    label: 'Araçlar',
    icon: Wrench,
    items: ['Git', 'VS Code', 'Unity', 'Figma', 'Postman'],
  },
  {
    id: 'ai',
    label: 'Yapay Zeka',
    icon: Bot,
    items: ['Ollama', 'Qwen', 'Local LLMs', 'AI-assisted development'],
  },
]

export type HeroSkill = { name: string; short: string; tint: string }

/** The tile grid at the top of the skills card, mirroring the reference layout. */
export const heroSkills: HeroSkill[] = [
  { name: '.NET 9', short: '.NET', tint: '#7c4dff' },
  { name: 'Flutter', short: 'Fl', tint: '#42a5f5' },
  { name: 'TypeScript', short: 'Tps', tint: '#3178c6' },
  { name: 'React', short: 'Re', tint: '#61dafb' },
  { name: 'Tauri', short: 'Ta', tint: '#ffc131' },
  { name: 'Unity', short: 'Un', tint: '#d7d7d7' },
  { name: 'PostgreSQL', short: 'Pg', tint: '#4b8bbe' },
  { name: 'Docker', short: 'Dk', tint: '#2496ed' },
  { name: 'Superset', short: 'Sp', tint: '#20a7c9' },
  { name: 'Elasticsearch', short: 'Es', tint: '#f9b110' },
]

/** The single-line tag row under the tiles. */
export const skillTags = ['C#', 'Python', 'SQL', 'HTML/CSS', 'JavaScript', 'Git', 'Linux', 'Figma']
