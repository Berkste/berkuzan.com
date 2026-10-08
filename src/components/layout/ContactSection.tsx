import { motion, useReducedMotion } from 'framer-motion'
import { socials } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { feather } from '../../lib/feather'
import { useThemeCopy } from '../../lib/theme-context'

const STATUS_LINES = ['Coding...', 'Dreaming...', 'Creating...', 'Having Fun...']

export function ContactSection() {
  const reduced = useReducedMotion()
  const copy = useThemeCopy()

  return (
    <section
      id="iletisim"
      aria-labelledby="iletisim-title"
      className="relative scroll-mt-24 overflow-hidden border-y border-edge"
    >
      {/* Cinematic burgundy-to-ember wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--contact-wash)' }}
      />

      <div className="shell grid items-center gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)_240px] lg:gap-10 lg:py-16">
        {/* ---- Copy + socials ---- */}
        <Reveal>
          <div className="relative">
            <p className="text-[14px] text-ink-secondary">Projeler, fikirler, kahve muhabbeti...</p>
            <h2
              id="iletisim-title"
              className="text-glow mt-2 text-[clamp(1.9rem,5vw,2.75rem)] font-bold leading-tight"
            >
              İletişime Geçelim!
            </h2>

            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => {
                const shared =
                  'grid h-12 w-12 place-items-center rounded-full border border-edge bg-black/35 backdrop-blur-md transition-all duration-300'
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className={`${shared} text-ink-secondary hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-neon`}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ) : (
                      <span
                        title={`${label} bağlantısı henüz eklenmedi`}
                        className={`${shared} text-ink-muted/70 cursor-default hover:border-edge-strong`}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                        <span className="sr-only">{label} — bağlantı henüz eklenmedi</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>

        {/* ---- Footer koala ---- */}
        <Reveal delay={0.08} className="order-first lg:order-none">
          <motion.figure
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mx-auto w-full max-w-[300px]"
          >
            <img
              src="/images/koala/note-mesaj.png"
              alt=""
              aria-hidden
              width={360}
              height={324}
              loading="lazy"
              className="pointer-events-none absolute -left-28 top-4 hidden w-[124px] -rotate-3 select-none opacity-90 mix-blend-screen xl:block"
            />
            <img
              src="/images/koala/contact-koala.png"
              alt="Şehri izleyen koala ve kedisi, arkadan görünüm"
              width={708}
              height={384}
              loading="lazy"
              decoding="async"
              className="w-full select-none object-contain"
              style={feather(14, 12)}
            />
          </motion.figure>
        </Reveal>

        {/* ---- Status terminal ---- */}
        <Reveal delay={0.14}>
          <div className="rounded-2xl border border-edge bg-black/55 p-4 font-mono text-[12.5px] backdrop-blur-md">
            <p className="text-accent-warm">{copy.statusHeading}</p>
            <ul className="mt-2 space-y-1.5 text-ink-secondary">
              {STATUS_LINES.map((line, i) => (
                <motion.li
                  key={line}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <span aria-hidden className="text-accent">
                    •
                  </span>
                  {line}
                </motion.li>
              ))}
            </ul>
            <p className="mt-3 border-t border-edge pt-2.5 text-right text-accent">♥</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
