# Berk Uzan — Portfolio

Kişisel portföy, CV, blog ve proje vitrini. Koyu sci-fi / burgundy cyberpunk bir arayüz ve
koala maskot kimliği üzerine kurulu.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
npm run format   # prettier
```

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion · lucide-react. Backend yok —
tüm içerik `src/data/` altındaki statik TypeScript dosyalarından geliyor.

## Yapı

```
src/
├── components/
│   ├── layout/     Navbar, ContactSection, Footer
│   ├── hero/       Hero, StatusPanel, LifeStatus, AmbientCard
│   ├── about/      AboutSection
│   ├── skills/     SkillsSection, InterestsGrid
│   ├── projects/   ProjectsSection, ProjectCard, ProjectModal, ArchiveSection
│   ├── blog/       BlogSection, BlogCard
│   ├── cv/         CareerTimeline, PersonalSidebar
│   ├── koala/      KoalaOS (easter egg), KoalaOSLauncher, BalimCard
│   └── ui/         Button, Card, Badge, Reveal, TypeLine, CvButton, BrandIcons
├── data/           projects.ts, blog.ts, skills.ts, career.ts, site.ts
└── lib/            cn, feather, useReducedMotion
```

## İçeriği düzenleme

Metinlerin tamamı `src/data/` altında:

| Dosya          | İçerik                                                        |
| -------------- | ------------------------------------------------------------- |
| `site.ts`      | İsim, navigasyon, hero etiketleri, "Şu anda" paneli, sosyaller |
| `projects.ts`  | Öne çıkan projeler ve arşiv                                   |
| `blog.ts`      | Blog yazıları                                                 |
| `skills.ts`    | Teknoloji kartları ve grupları                                |
| `career.ts`    | Kariyer zaman çizelgesi ve yetkinlik alanları                 |

### Sosyal bağlantılar

`site.ts` içindeki `socials` dizisinde yalnızca GitHub bağlı; diğer `href`'ler bilerek `null`.
Uydurma hesap yok — gerçek adresler yazıldığında ikonlar otomatik olarak tıklanabilir hale gelir.

## Yayın

Bu dal (`source`) sitenin kaynağı. `source`'a her push'ta `.github/workflows/yayinla.yml`
build alır ve çıktıyı `main` dalına yazar; GitHub Pages `main`'den yayın yapıyor
(berkuzan.com). Elle yükleme gerekmiyor.

### CV

`CV İndir` butonları `/assets/Berk-Uzan-CV.pdf` dosyasını arar. Dosya yoksa uygulama
kırılmaz; buton "CV dosyası henüz yüklenmedi" notu gösterir. PDF'i
`public/assets/Berk-Uzan-CV.pdf` yoluna koymak yeterli.

## Görseller

`public/images/` altındaki koala/proje/blog görselleri **geçici**: referans tasarımdan
kırpılmış ya da prosedürel üretilmiş yer tutuculardır.

```
public/images/
├── koala/     hero-koala, about-koala, contact-koala, balim, favicon, note-*
├── projects/  nexus, minerva, metro-run, taht, koala-dungeon, blackjack-count-trainer, ...
└── blog/      flutter-cross-platform, kediler-verimlilik, ai-asistan, flame-2d-oyun
```

Gerçek çizimler geldiğinde aynı dosya adlarıyla üzerine yazmak yeterli; kod değişmesi
gerekmiyor. Hero ve iletişim görselleri `src/lib/feather.ts` ile kenarları yumuşatılarak
sayfaya karıştırılıyor, bu yüzden dikdörtgen bir raster görsel sorunsuz oturur.

## Temalar

Dört evren var; navbar'daki palet butonundan seçiliyor, tercih `localStorage`
(`koala-theme`) içinde saklanıyor.

| Tema               | Kimlik                                                            |
| ------------------ | ----------------------------------------------------------------- |
| `burgundy`         | Varsayılan — koyu şarabi                                          |
<!-- | `amber`            | Sıcak terminal turuncusu                                          |
| `neon-sci-fi`      | Neon şehir: ışık hüzmeleri, perspektif ızgara, tarama çizgileri, HUD | -->
| `wizarding`        | Mum ışığı: altın, uçuşan toz, şato silueti, asa izi                |

**Aynı React bileşenleri her temada render ediliyor** — tema başına kopya bileşen yok.
Değişen tek şey CSS değişkenleri ve tema kapsamlı "skin" kuralları.

### Yeni tema eklemek

1. `src/data/themes.ts` içine bir kayıt (id, etiket, ipucu, önizleme renkleri, geçiş türü).
2. `src/index.css` içine `:root[data-theme='<id>']` bloğu.
3. İsteğe bağlı: `src/data/microcopy.ts` içine dekoratif metinler.

Hepsi bu; tema seçici listeyi `themes.ts`'ten okuyor.

### Mimari

- **Token'lar** — `src/index.css`. `:root` bloğu, eskiden dosyanın içine gömülü olan
  değerleri (panel gradyanları, atmosfer, glow rengi, başlık fontu) değişken hâline
  getiriyor. Varsayılan değerler birebir eski değerler olduğu için `burgundy` ve `amber`
  piksel piksel aynı kaldı.
- **Skin'ler** — `index.css` sonundaki `[data-theme='...']` bölümü bilerek `@layer`
  dışında. Tailwind'in `utilities` katmanı `components`'ı specificity'den bağımsız
  yendiği için, bir utility'yi (radius, filter, border) ezmesi gereken skin kurallarının
  katman dışında olması gerekiyor.
- **State** — `src/lib/theme-context.ts` (context + hook'lar) ve
  `src/components/theme/ThemeProvider.tsx` (provider).
- **Sahne** — `ThemeAtmosphere` her tema için kendi katmanlarını basıyor; `burgundy` ve
  `amber` için hiçbir şey render etmiyor.

### Performans

Arka plan efektlerinin tamamı CSS animasyonu: 6 ışık hüzmesi, 22 toz zerresi, birkaç
gradyan katmanı. Sürekli çalışan tek JS döngüsü asa izinin canvas'ı — o da havuz boşalınca
kendini durduruyor, sekme gizlendiğinde temizleniyor, dokunmatik cihazlarda hiç kurulmuyor.

### Erişilebilirlik

`prefers-reduced-motion: reduce` aktifken hüzmeler ve zerreler gizleniyor, asa izi hiç
kurulmuyor, tema geçiş animasyonu atlanıyor — işlevsellik aynen kalıyor. Geçiş katmanı her
zaman `pointer-events: none`, yani hiçbir tıklamayı engellemiyor.

### Fontlar

`Oxanium` (sci-fi başlıklar) ve `Cinzel` (wizarding başlıklar) `public/fonts/` altında
yerel olarak barındırılıyor — ikisi de OFL 1.1, `latin` + `latin-ext` alt kümeleriyle, yani
Türkçe karakterler de aynı fontta. Gövde metni her temada Inter.

## Erişilebilirlik

Semantik bölümler, atlama bağlantısı, görünür odak halkaları, klavye ile açılabilen mobil
menü ve modallar, tüm görsellerde alt metin, `prefers-reduced-motion` desteği.
