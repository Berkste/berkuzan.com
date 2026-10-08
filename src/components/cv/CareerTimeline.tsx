import { motion, useReducedMotion } from 'framer-motion'
import { FileText, MapPin } from 'lucide-react'
import { career, careerTracks } from '../../data/career'
import { site } from '../../data/site'
import { Card, SectionHeader } from '../ui/Card'
import { ButtonLink } from '../ui/Button'
import { CvButton } from '../ui/CvButton'
import { PersonalSidebar } from './PersonalSidebar'

export function CareerTimeline() {
  const reduced = useReducedMotion()

  return (
    <Card neon className="h-full p-5 sm:p-6">
      <SectionHeader
        id="cv-title"
        icon={
          <span aria-hidden className="text-sm">
            🧭
          </span>
        }
        title="Kariyer Yolculuğu"
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_128px] sm:gap-5">
        {/* ---- Timeline ---- */}
        <ol className="relative space-y-5 border-l border-edge pl-5">
          {career.map((entry, i) => (
            <motion.li
              key={entry.id}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <span
                aria-hidden
                className={
                  'absolute -left-[25px] top-1.5 grid h-[9px] w-[9px] place-items-center rounded-full ' +
                  (entry.current
                    ? 'bg-accent shadow-[0_0_12px_2px_rgba(255,61,104,0.65)]'
                    : 'bg-burgundy-bright/80')
                }
              >
                {entry.current && !reduced && (
                  <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                )}
              </span>

              <p className="font-mono text-[11px] text-accent">{entry.period}</p>
              <h3 className="mt-0.5 text-[14.5px] font-semibold leading-snug text-ink-primary">
                {entry.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-ink-muted">{entry.stack.join(' · ')}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-secondary">
                {entry.summary}
              </p>
            </motion.li>
          ))}
        </ol>

        <PersonalSidebar />
      </div>

      {/* ---- Capability areas ---- */}
      <div className="hair-divider my-5" />
      <ul className="flex flex-wrap gap-1.5">
        {careerTracks.map((track) => (
          <li key={track.label}>
            <span
              title={track.detail}
              className="hover:border-accent/45 inline-flex cursor-default items-center rounded-full border border-edge bg-white/[0.02] px-3 py-1 text-[11.5px] text-ink-secondary transition-colors duration-300 hover:text-accent-soft"
            >
              {track.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <CvButton size="sm" variant="primary" />
        <ButtonLink href="#cv" variant="outline" size="sm">
          <FileText className="h-3.5 w-3.5" aria-hidden />
          Detaylı CV'yi Gör
        </ButtonLink>
        <span className="ml-auto flex items-center gap-1 font-mono text-[11px] text-ink-muted">
          <MapPin className="h-3 w-3" aria-hidden />
          {site.location}
        </span>
      </div>
    </Card>
  )
}
