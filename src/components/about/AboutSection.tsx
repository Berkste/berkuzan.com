import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { SkillsSection } from '../skills/SkillsSection'
import { InterestsGrid } from '../skills/InterestsGrid'

export function AboutSection() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hakkimda"
      aria-labelledby="hakkimda-title"
      className="shell scroll-mt-24 py-[var(--section-gap)]"
    >
      {/* `items-start` keeps each column at its natural height instead of
          stretching one card and opening a void inside it. */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
        {/* ---- Hakkımda + ilgi alanları ---- */}
        <div className="flex flex-col gap-5">
          <Reveal>
            <Card neon className="flex flex-col overflow-hidden p-5 sm:p-7">
              <SectionHeader
                id="hakkimda-title"
                icon={
                  <span aria-hidden className="text-base">
                    🐨
                  </span>
                }
                title="Hakkımda"
              />

              <div className="mt-6 grid gap-6 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-7">
                <motion.figure
                  initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto w-full max-w-[220px] sm:mx-0"
                >
                  <div
                    aria-hidden
                    className="absolute -inset-3 -z-10 rounded-[26px] blur-2xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,70,110,0.32), transparent 70%)',
                    }}
                  />
                  <img
                    src="/images/koala/about-koala.png"
                    alt="Hoodie giymiş, uzay istasyonunda dizüstü bilgisayar başında oturan koala portresi"
                    width={520}
                    height={603}
                    loading="lazy"
                    decoding="async"
                    className="border-edge-strong/40 w-full rounded-2xl border object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
                  />
                </motion.figure>

                <div>
                  <p className="text-[15px] leading-relaxed text-ink-secondary">
                    Ben <strong className="font-semibold text-ink-primary">Berk Uzan</strong>.
                  </p>

                  <div className="mt-3 space-y-3.5 text-[14.5px] leading-relaxed text-ink-secondary">
                    <p>
                      32 yaşındayım, Boğa burcuyum. Teknoloji, tasarım, yazılım, oyunlar, sinema ve
                      yaratıcı projelerle uğraşmayı seviyorum.
                    </p>
                    <p>
                      Günümü kod yazarak, yeni şeyler öğrenerek, arada bir oyun geliştirerek,
                      film/dizi izleyerek ve evde sevgili kedim{' '}
                      <span className="text-accent">Balım</span> ile geçiriyorum.
                    </p>
                    <p>
                      Kendime ait projeler üretiyorum, farklı teknolojileri kurcalıyorum, yapay zekâ
                      ile deneyler yapıyorum ve fikirleri ürüne dönüştürmeyi seviyorum.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-end gap-3 pt-7">
                <figure className="panel-inset flex flex-1 items-start gap-3 px-4 py-3.5">
                  <Quote className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <blockquote className="text-[14px] italic text-ink-secondary">
                    “Hayat uzun, backlog daha uzun.”
                  </blockquote>
                </figure>
                <img
                  src="/images/koala/doodle-koala.png"
                  alt=""
                  aria-hidden
                  width={360}
                  height={248}
                  loading="lazy"
                  className="hidden h-14 w-auto select-none opacity-80 mix-blend-screen sm:block"
                />
              </div>
            </Card>
          </Reveal>

          {/* Interests sit with the personal copy, and balance the taller
              skills card on the right. */}
          <Reveal delay={0.14}>
            <InterestsGrid />
          </Reveal>
        </div>

        {/* ---- Teknoloji ---- */}
        <Reveal delay={0.08}>
          <SkillsSection />
        </Reveal>
      </div>
    </section>
  )
}
