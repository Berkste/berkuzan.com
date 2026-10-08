import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Archive,
  FileText,
  Home,
  Mail,
  Menu,
  Newspaper,
  Sparkles,
  TerminalSquare,
  User,
  X,
} from 'lucide-react'
import { navItems, site } from '../../data/site'
import { cn } from '../../lib/cn'
import { Button, ButtonLink } from '../ui/Button'
import { ThemePicker } from '../ui/ThemePicker'

const iconFor: Record<string, typeof Home> = {
  'Ana Sayfa': Home,
  Hakkımda: User,
  Projeler: Sparkles,
  Blog: Newspaper,
  CV: FileText,
  Arşiv: Archive,
}

type NavbarProps = {
  onOpenKoalaOS: () => void
}

export function Navbar({ onOpenKoalaOS }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
   * Highlight the last section whose top has crossed a line a third of the way
   * down the viewport. An IntersectionObserver is the usual tool here, but the
   * sections have wildly different heights, so "whichever intersects most" is
   * unstable — this reads exactly like the eye does.
   */
  useEffect(() => {
    const hrefs = [...navItems.map((i) => i.href), '#iletisim']

    const update = () => {
      const line = window.scrollY + window.innerHeight * 0.34

      /* Nav order and document order differ (Arşiv sits above Blog), so walk
         the sections top-to-bottom rather than in menu order. */
      const inDocOrder = hrefs
        .map((href) => ({ href, el: document.querySelector(href) }))
        .filter((s): s is { href: string; el: Element } => Boolean(s.el))
        .map((s) => ({ href: s.href, top: s.el.getBoundingClientRect().top + window.scrollY }))
        .sort((a, b) => a.top - b.top)

      const passed = inDocOrder.filter((s) => s.top <= line)
      const current = passed.length ? passed[passed.length - 1].href : inDocOrder[0]?.href

      /* Anything at the very bottom of the page counts as the last section. */
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      const last = inDocOrder[inDocOrder.length - 1]?.href

      setActive((atBottom ? last : current) ?? '#top')
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-edge bg-[rgba(10,4,7,0.82)] backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Ana menü" className="shell flex h-16 items-center gap-4 xl:h-[72px]">
        <a href="#top" className="group flex shrink-0 items-center gap-2.5">
          <img
            src="/images/koala/favicon.png"
            alt=""
            width={36}
            height={36}
            className="ring-edge-strong/50 h-9 w-9 rounded-full object-cover ring-1 transition-shadow duration-300 group-hover:shadow-neon"
          />
          <span className="leading-none">
            <span className="block font-display text-[15px] font-bold tracking-[0.14em] text-ink-primary">
              BERK UZAN
            </span>
            <span className="mt-1 hidden text-[10px] tracking-[0.18em] text-ink-muted sm:block">
              {site.tagline}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="mx-auto hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const Icon = iconFor[item.label] ?? Home
            const isActive = active === item.href
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] transition-colors duration-200 2xl:px-4',
                    isActive ? 'text-ink-primary' : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill border-accent/40 bg-accent/12 absolute inset-0 -z-10 rounded-full border"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {item.label}
                </a>
              </li>
            )
          })}
          <li>
            <button
              type="button"
              onClick={onOpenKoalaOS}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] text-ink-secondary transition-colors duration-200 hover:text-accent 2xl:px-4"
            >
              <TerminalSquare className="h-3.5 w-3.5" aria-hidden />
              Koala OS
            </button>
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <ThemePicker />

          <ButtonLink href="#iletisim" size="sm" className="hidden xs:inline-flex">
            <Mail className="h-4 w-4" aria-hidden />
            İletişim
          </ButtonLink>

          <Button
            variant="icon"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            className="h-10 w-10 rounded-full xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-16 -z-10 bg-black/70 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className="absolute inset-x-0 top-full origin-top border-y border-edge bg-[rgba(14,5,10,0.97)] backdrop-blur-xl xl:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <ul className="shell grid gap-1.5 py-5">
                {navItems.map((item) => {
                  const Icon = iconFor[item.label] ?? Home
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="border-edge/60 hover:border-accent/50 hover:bg-accent/10 flex items-center gap-3 rounded-xl border bg-white/[0.02] px-4 py-3.5 text-[15px] text-ink-primary transition-colors"
                      >
                        <Icon className="h-4 w-4 text-accent" aria-hidden />
                        {item.label}
                      </a>
                    </li>
                  )
                })}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      onOpenKoalaOS()
                    }}
                    className="border-edge/60 hover:border-accent/50 hover:bg-accent/10 flex w-full items-center gap-3 rounded-xl border bg-white/[0.02] px-4 py-3.5 text-left text-[15px] text-ink-primary transition-colors"
                  >
                    <TerminalSquare className="h-4 w-4 text-accent" aria-hidden />
                    Koala OS
                  </button>
                </li>
                <li className="pt-1.5">
                  <ButtonLink
                    href="#iletisim"
                    onClick={() => setOpen(false)}
                    size="lg"
                    className="w-full"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    İletişime Geç
                  </ButtonLink>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
