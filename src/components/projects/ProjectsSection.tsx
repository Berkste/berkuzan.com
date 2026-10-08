import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { archiveProjects, projects, type Project } from '../../data/projects'
import { Card, SectionHeader } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { ArchiveSection } from './ArchiveSection'

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      <section
        id="projeler"
        aria-labelledby="projeler-title"
        className="shell scroll-mt-24 pb-[var(--section-gap)]"
      >
        <Reveal>
          <Card neon className="p-5 sm:p-6 lg:p-7">
            <SectionHeader
              id="projeler-title"
              icon={
                <span aria-hidden className="text-sm">
                  🚀
                </span>
              }
              title="Öne Çıkan Projeler"
              action={
                <a
                  href="#arsiv"
                  className="group flex items-center gap-1.5 text-[13px] text-ink-secondary transition-colors hover:text-accent"
                >
                  Tüm Projeler
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              }
            />

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <li key={project.id} className="h-full">
                  <Reveal delay={i * 0.07} className="h-full">
                    <ProjectCard project={project} onDetails={setSelected} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </section>

      <ArchiveSection projects={archiveProjects} onDetails={setSelected} />

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
