import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { heroLabels } from '../../data/site'
import { FEATHER } from '../../lib/feather'
import { useThemeCopy } from '../../lib/theme-context'
import { ButtonLink } from '../ui/Button'
import { CvButton } from '../ui/CvButton'
import { TypeLine } from '../ui/TypeLine'
// import { StatusPanel } from './StatusPanel'
// import { LifeStatus } from './LifeStatus'
// import { AmbientCard } from './AmbientCard'

export function Hero() {
  const reduced = useReducedMotion()
  const copy = useThemeCopy()

  const rise = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" aria-label="Giriş" className="relative overflow-hidden pt-24 lg:pt-28">
      {/* Ambient burgundy wash behind the hero illustration */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[820px] w-[1400px] -translate-x-1/2 animate-drift opacity-70"
        style={{ background: 'var(--hero-wash)' }}
      />

      <div className="shell grid gap-8 pb-10 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-6 xl:pb-14">
        {/* ---- Left: copy + illustration ---- */}
        <div className="relative">
          <div className="relative grid items-center gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-3">
            <div className="relative z-10 max-w-xl">
              <motion.p {...rise(0)} className="text-accent-soft/85 mb-4 font-mono text-[13px]">
                <span className="text-ink-muted">&gt;</span>{' '}
                <TypeLine key={copy.heroPrompt} text={copy.heroPrompt} />
              </motion.p>

              <motion.h1
                {...rise(0.08)}
                className="text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[0.98]"
              >
                <span className="text-glow block">Merhaba,</span>
                <span className="block">
                  ben{' '}
                  <span className="bg-[linear-gradient(100deg,var(--accent-soft),var(--accent),var(--accent-warm))] bg-clip-text text-transparent">
                    Berk
                  </span>{' '}
                  <motion.span
                    className="inline-block"
                    animate={reduced ? undefined : { rotate: [0, 16, -6, 14, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 3.5,
                    }}
                    style={{ transformOrigin: '70% 70%' }}
                  >
                    👋
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p
                {...rise(0.16)}
                className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-secondary sm:text-base"
              >
                Kod yazıyorum, tasarlıyorum,
                <br className="hidden xl:block" /> oyunlar yapıyorum,{' '}
                <span className="text-accent">kedilerle yaşıyorum</span>
                <br className="hidden xl:block" /> ve bazen evreni fazla ciddiye almıyorum.
              </motion.p>

              <motion.ul
                {...rise(0.24)}
                className="mt-6 flex flex-wrap items-center gap-2"
                aria-label="Roller"
              >
                {heroLabels.map((label) => (
                  <li
                    key={label}
                    className="hover:border-accent/55 rounded-full border border-edge bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-ink-secondary transition-colors duration-300 hover:text-accent-soft"
                  >
                    {label}
                  </li>
                ))}
                <li aria-hidden className="text-base leading-none">
                  🐨☕
                </li>
              </motion.ul>

              <motion.div {...rise(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href="#hakkimda"
                  size="lg"
                  className="min-w-[140px] flex-1 sm:flex-none"
                >
                  Hakkımda
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
                <CvButton size="lg" className="min-w-[140px] flex-1 sm:flex-none" />
              </motion.div>
            </div>

            <HeroArt reduced={Boolean(reduced)} />
          </div>
        </div>

        {/* ---- Right rail ---- */}
        {/* <div className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <StatusPanel />
          <LifeStatus />
          <AmbientCard className="sm:col-span-2 xl:col-span-1" />
        </div> */}
      </div>
    </section>
  )
}

function HeroArt({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[440px] sm:max-w-[520px] md:-mr-6 md:max-w-none xl:-mr-6 xl:mt-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 -z-10 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(var(--glow-rgb), 0.3), transparent 68%)',
        }}
      />

      <motion.div
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <img
          src="/images/koala/hero-koala.png"
          alt="Kulaklık takmış, kahve içen ve kedisiyle birlikte kod yazan sci-fi koala illüstrasyonu"
          width={1076}
          height={1040}
          fetchPriority="high"
          decoding="async"
          className="w-full select-none object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
          style={FEATHER}
        />

        {/* Handwritten "Koala Approved!" note from the reference */}
        <img
          src="/images/koala/note-approved.png"
          alt=""
          aria-hidden
          width={378}
          height={252}
          className="pointer-events-none absolute -left-28 bottom-16 z-10 hidden w-[118px] -rotate-6 select-none opacity-90 mix-blend-screen 2xl:block"
        />
      </motion.div>

      {/* Balım tag */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-2 right-6 hidden items-center gap-2 rounded-full border border-edge bg-black/60 px-3 py-1.5 backdrop-blur-md sm:flex"
      >
        <img
          src="/images/koala/balim.png"
          alt="Balım, tekir kedi"
          width={390}
          height={294}
          loading="lazy"
          className="ring-accent/40 h-7 w-7 rounded-full object-cover ring-1"
        />
        <span className="font-mono text-[11px] text-ink-secondary">
          Balım <span className="text-accent">♥</span>
        </span>
      </motion.div>
    </motion.div>
  )
}
