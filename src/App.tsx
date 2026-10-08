import { useCallback, useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ContactSection } from './components/layout/ContactSection'
import { Hero } from './components/hero/Hero'
import { AboutSection } from './components/about/AboutSection'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { BlogSection } from './components/blog/BlogSection'
import { BalimCard } from './components/koala/BalimCard'
import { KoalaOS } from './components/koala/KoalaOS'
import { KoalaOSLauncher } from './components/koala/KoalaOSLauncher'
import { ThemeAtmosphere } from './components/theme/ThemeAtmosphere'
import { ThemeTransition } from './components/theme/ThemeTransition'
import { WandTrail } from './components/theme/WandTrail'
import { SystemHud } from './components/theme/SystemHud'
import { ThemeProvider } from './components/theme/ThemeProvider'

export default function App() {
  const [osOpen, setOsOpen] = useState(false)

  const openOs = useCallback(() => setOsOpen(true), [])
  const closeOs = useCallback(() => setOsOpen(false), [])

  return (
    <ThemeProvider>
      <a href="#main" className="skip-link">
        İçeriğe geç
      </a>

      {/* Per-theme background scenery; renders nothing for the plain themes. */}
      <ThemeAtmosphere />

      <Navbar onOpenKoalaOS={openOs} />

      <main id="main">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <BalimCard />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />

      <KoalaOSLauncher onOpen={openOs} hidden={osOpen} />
      <KoalaOS open={osOpen} onClose={closeOs} />

      {/* Theme-scoped chrome: all three no-op outside their own universe. */}
      <SystemHud />
      <WandTrail />
      <ThemeTransition />
    </ThemeProvider>
  )
}
