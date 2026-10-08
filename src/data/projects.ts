export type Project = {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  image: string
  /** Real repo URL goes here when it exists; null hides the GitHub button. */
  repo: string | null
  featured: boolean
  year: string
}

export const projects: Project[] = [
  {
    id: 'koala-ai',
    title: 'KOALA-AI',
    category: 'Kişisel AI Asistan',
    description:
      'Yalnızca kendi bilgisayarımda, localhost’ta çalışan ve yazılı komutla konuşulan kişisel asistan. Not sistemimi yönetiyor, araştırma yapıyor, yeni proje iskeleti kurup çalıştırıyor.',
    tech: ['TypeScript', 'Node.js', 'React', 'Claude Agent SDK'],
    image: '/images/projects/nexus.png',
    repo: null,
    featured: true,
    year: '2026',
  },
  {
    id: 'minerva',
    title: 'Minerva Nail Art',
    category: 'Randevu & Stüdyo App',
    description:
      'Bir tırnak stüdyosu için randevu sistemi: müşteri uygulaması ve personel uygulaması, tek kod tabanından iki ayrı uygulama.',
    tech: ['Flutter', 'Supabase', 'PostgreSQL'],
    image: '/images/projects/minerva.png',
    repo: null,
    featured: true,
    year: '2026',
  },
  {
    id: 'metro-run',
    title: 'Metro Run',
    category: 'Endless Runner Game',
    description: 'Ankara metrosundan ilham alan, 2D cartoon tarzında endless runner oyunu.',
    tech: ['Flutter', 'Flame'],
    image: '/images/projects/metro-run.png',
    repo: null,
    featured: true,
    year: '2026',
  },
]

/** "Arşiv" — smaller experiments that still deserve a shelf. */
export const archiveProjects: Project[] = [
  {
    id: 'taht',
    title: 'TAHT',
    category: 'Strateji / Kart Oyunu',
    description:
      'Osmanlı sarayında bir Sultan olarak kartları sağa sola kaydırıp halkı, hazineyi, orduyu ve inancı dengede tutmaya çalıştığın mobil karar oyunu prototipi.',
    tech: ['Unity', 'C#'],
    image: '/images/projects/taht.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'koala-dungeon',
    title: 'Koala Dungeon',
    category: 'Roguelike Prototip',
    description:
      'Orman yangınından kurtulan uykulu bir koalanın mağaralara indiği, sıra tabanlı 2D pixel art roguelike. Uyumadan ne kadar ilerleyebilirsin?',
    tech: ['Unity', 'C#', 'Pixel Art'],
    image: '/images/projects/koala-dungeon.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'blackjack-count-trainer',
    title: 'Blackjack Count Trainer',
    category: 'Eğitim Uygulaması',
    description:
      'Hi-Lo kart saymayı adım adım öğreten offline eğitim uygulaması. Dersler, hız çalışmaları ve temel strateji simülatörü. Gerçek para yok, sadece matematik.',
    tech: ['Flutter', 'Riverpod'],
    image: '/images/projects/blackjack-count-trainer.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'koala-freestyle',
    title: 'Koala Freestyle Generator',
    category: 'Rap Antrenman Uygulaması',
    description:
      'Freestyle rap pratiği için süreli ve kategorili Türkçe kelime üreten offline mobil uygulama. Kafiye zor, koala kararlı.',
    tech: ['Flutter', 'Dart'],
    image: '/images/projects/koala-freestyle.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'wonder-quiz',
    title: 'Wonder Quiz',
    category: 'Bilgi Yarışması',
    description:
      'Seviye ilerlemeli dünyalarda, cevabı harf harf doldurduğun Türkçe bilgi yarışması prototipi.',
    tech: ['Flutter', 'Riverpod'],
    image: '/images/projects/wonder-quiz.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'nexus-vault',
    title: 'Nexus Vault',
    category: 'Kişisel Kasa',
    description:
      'Şifreleri, hesapları ve alışverişleri birbirine bağlı düğümler olarak tutan, yalnızca cihazda çalışan kasa uygulaması.',
    tech: ['Flutter', 'Drift', 'Kriptografi'],
    image: '/images/projects/nexus-vault.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'sayac',
    title: 'SAYAC',
    category: 'Geri Sayım Uygulaması',
    description: 'Neon cyberpunk arayüzlü, tam ekran geri sayım uygulaması.',
    tech: ['Flutter'],
    image: '/images/projects/sayac.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'movielander',
    title: 'MovieLander',
    category: 'Tanışma Uygulaması',
    description:
      'Sevdiğin film ve dizilere göre eşleştiren mobil tanışma uygulaması. Ortak bir Aftersun, ortak bir Avengers’tan daha çok şey söyler. Neon sinema temalı arayüz prototipi.',
    tech: ['Flutter', 'Riverpod'],
    image: '/images/projects/movielander.png',
    repo: null,
    featured: false,
    year: '2026',
  },
  {
    id: 'budget-tracker',
    title: 'Budget Tracker',
    category: 'Bütçe Uygulaması',
    description: 'Gelir ve giderleri kaydedip toplamı anlık gösteren basit bütçe takip uygulaması.',
    tech: ['Flutter', 'Firebase'],
    image: '/images/projects/budget-tracker.png',
    repo: null,
    featured: false,
    year: '2025',
  },
]
