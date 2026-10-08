export type BlogPost = {
  id: string
  title: string
  date: string
  /** ISO date for <time datetime>. */
  datetime: string
  category: string
  excerpt: string
  image: string
  readingTime: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'flutter-cross-platform',
    title: 'Flutter ile Cross-Platform Geliştirme',
    date: '25 Ağu 2026',
    datetime: '2026-08-25',
    category: 'Teknoloji',
    excerpt:
      'Tek kod tabanı, çok platform. Flutter neden hâlâ benim favorim ve nerede beni yarı yolda bırakıyor?',
    image: '/images/blog/flutter-cross-platform.png',
    readingTime: '6 dk',
  },
  {
    id: 'kediler-verimlilik',
    title: 'Evde Çalışma, Kediler ve Verimlilik',
    date: '22 Ağu 2026',
    datetime: '2026-08-22',
    category: 'Yaşam',
    excerpt:
      'Balım klavyenin üstünde uyurken kod yazmayı öğrendim. Beklenmedik bir odaklanma tekniği.',
    image: '/images/blog/kediler-verimlilik.png',
    readingTime: '4 dk',
  },
  {
    id: 'ai-asistan',
    title: 'Kendi AI Asistanımı Nasıl Yaptım?',
    date: '18 Ağu 2026',
    datetime: '2026-08-18',
    category: 'AI',
    excerpt:
      'Qwen, Ollama ve biraz inatla kurduğum yerel asistan denemesi. Bulut yok, fatura yok, sınır yok.',
    image: '/images/blog/ai-asistan.png',
    readingTime: '9 dk',
  },
  {
    id: 'flame-2d-oyun',
    title: 'Flame ile 2D Oyun Geliştirme',
    date: '11 Ağu 2026',
    datetime: '2026-08-11',
    category: 'Oyun',
    excerpt:
      'Sprite, collision, game loop. Flutter bilen biri için 2D oyuna giriş sandığından çok daha kolay.',
    image: '/images/blog/flame-2d-oyun.png',
    readingTime: '7 dk',
  },
]
