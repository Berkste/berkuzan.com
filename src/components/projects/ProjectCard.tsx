import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button, ButtonLink } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcons'

type ProjectCardProps = {
  project: Project
  onDetails: (project: Project) => void
}

export function ProjectCard({ project, onDetails }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`

  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <article aria-labelledby={titleId} className="flex h-full flex-col">
        {/* Header row: title block left, artwork right — as in the reference */}
        <div className="flex items-start gap-3 p-4 pb-3">
          <div className="min-w-0 flex-1">
            <h3
              id={titleId}
              className="text-[15px] font-semibold leading-snug text-ink-primary transition-colors duration-300 group-hover:text-accent-soft"
            >
              {project.title}
            </h3>
            <p className="mt-0.5 text-[11.5px] leading-snug text-ink-muted">{project.category}</p>
          </div>

          <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-xl border border-edge">
            <img
              src={project.image}
              alt={`${project.title} görseli`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(10,4,7,0.55))]"
            />
          </div>
        </div>

        <div className="px-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <li key={t}>
                <Badge size="sm">{t}</Badge>
              </li>
            ))}
            {project.tech.length > 3 && (
              <li>
                <Badge size="sm" tone="accent">
                  +{project.tech.length - 3}
                </Badge>
              </li>
            )}
          </ul>

          <p className="mt-3 text-[13px] leading-relaxed text-ink-secondary">
            {project.description}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2 p-4 pt-4">
          <Button size="sm" variant="outline" onClick={() => onDetails(project)}>
            Detaylar
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Button>

          {project.repo ? (
            <ButtonLink
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              variant="icon"
              aria-label={`${project.title} GitHub deposu`}
              className="h-9 w-9 rounded-full"
            >
              <GithubIcon className="h-4 w-4" />
            </ButtonLink>
          ) : (
            <span
              title="Depo bağlantısı henüz eklenmedi"
              className="text-ink-muted/60 grid h-9 w-9 place-items-center rounded-full border border-edge bg-white/[0.02]"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">GitHub bağlantısı henüz yok</span>
            </span>
          )}

          <span className="ml-auto font-mono text-[10.5px] text-ink-muted">{project.year}</span>
        </div>
      </article>
    </Card>
  )
}
