import { Archive, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'
import { Card, SectionHeader } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'

/**
 * "Arşiv" — the smaller experiments. Deliberately lighter weight than the
 * featured grid so it reads as a shelf, not a second portfolio.
 */
export function ArchiveSection({
  projects,
  onDetails,
}: {
  projects: Project[]
  onDetails: (p: Project) => void
}) {
  return (
    <section
      id="arsiv"
      aria-labelledby="arsiv-title"
      className="shell scroll-mt-24 pb-[var(--section-gap)]"
    >
      <Reveal>
        <Card className="p-5 sm:p-6 lg:p-7">
          <SectionHeader
            id="arsiv-title"
            icon={<Archive className="h-4 w-4" aria-hidden />}
            title="Arşiv"
            action={
              <p className="font-mono text-[11.5px] text-ink-muted">
                küçük deneyler · terk edilmiş dallar · iyi fikirler
              </p>
            }
          />

          <ul className="mt-5 grid gap-2.5 lg:grid-cols-2">
            {projects.map((project, i) => (
              <li key={project.id}>
                <Reveal delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => onDetails(project)}
                    className="hover:border-accent/45 hover:bg-accent/[0.06] group flex w-full items-center gap-3.5 rounded-xl border border-edge bg-white/[0.02] px-3.5 py-3 text-left transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-edge bg-black/30 font-mono text-[13px] font-bold text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="truncate text-[14px] font-medium text-ink-primary">
                          {project.title}
                        </span>
                        <span className="shrink-0 font-mono text-[10.5px] text-ink-muted">
                          {project.year}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] text-ink-muted">
                        {project.category}
                      </span>
                    </span>

                    <span className="hidden shrink-0 gap-1.5 md:flex">
                      {project.tech.slice(0, 2).map((t) => (
                        <Badge key={t} size="sm">
                          {t}
                        </Badge>
                      ))}
                    </span>

                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </section>
  )
}
