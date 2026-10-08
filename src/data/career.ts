export type CareerEntry = {
  id: string
  period: string
  title: string
  /** Technology focus of the period — no employer names are invented. */
  stack: string[]
  summary: string
  current?: boolean
}

/**
 * Deliberately company-free. Only the shape of the work and the stack it was
 * built on, because that is what is actually known.
 */
export const career: CareerEntry[] = [
  {
    id: 'now',
    period: '2024 — Devam',
    title: 'Senior Software Developer',
    stack: ['.NET', 'Flutter', 'AI'],
    summary: 'Kurumsal projeler ve bireysel ürünler. Yerel LLM denemeleri ve masaüstü otomasyonu.',
    current: true,
  },
  {
    id: 'mid',
    period: '2021 — 2024',
    title: 'Software Developer',
    stack: ['Backend', 'Frontend', 'Veri'],
    summary: 'Servis geliştirme, arayüz çalışmaları ve veri görselleştirme tarafında üretim.',
  },
  {
    id: 'fullstack',
    period: '2018 — 2021',
    title: 'Full Stack Developer',
    stack: ['Angular', '.NET'],
    summary: 'Uçtan uca web uygulamaları; ilk ciddi mimari kararlar ve ilk ciddi refactorlar.',
  },
  {
    id: 'before',
    period: 'Öncesi',
    title: 'Meraklı, Oyun Oynayan ve Kodla Tanışan Bir Öğrenci',
    stack: ['Merak', 'Oyun', 'Deneme'],
    summary: 'Oyunları bozarak nasıl çalıştıklarını anlamaya çalışan biri. Pek bir şey değişmedi.',
  },
]

export type CareerTrack = { label: string; detail: string }

/** Capability areas shown beside the timeline. */
export const careerTracks: CareerTrack[] = [
  {
    label: 'Software Development',
    detail: 'Ürün odaklı, uçtan uca geliştirme',
  },
  { label: 'Frontend', detail: 'React, Angular, Flutter, tasarım sistemleri' },
  { label: 'Backend', detail: '.NET, Node.js, servis ve API tasarımı' },
  { label: 'Veri', detail: 'PostgreSQL, Elasticsearch, Kibana, Superset' },
  {
    label: 'AI Deneyleri',
    detail: 'Claude Agent SDK, Ollama, Qwen, yerel modeller, agent ekipleri',
  },
  { label: 'Oyun Geliştirme', detail: 'Unity, Flame, 2D mekanikler, prototipleme' },
  { label: 'Kişisel Ürünler', detail: 'Fikirden yayına küçük ölçekli ürünler' },
]
