import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Project } from '../../data/projects'
import { Badge } from '../ui/Badge'
import { Button, ButtonLink } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcons'

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="bg-black/78 absolute inset-0 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="panel neon-edge relative w-full max-w-lg overflow-hidden"
          >
            <div className="relative h-40 overflow-hidden sm:h-48">
              <img
                src={project.image}
                alt={`${project.title} görseli`}
                className="h-full w-full scale-110 object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,4,7,0.25),rgba(16,6,11,0.96))]"
              />
              <Button
                ref={closeRef}
                variant="icon"
                onClick={onClose}
                aria-label="Kapat"
                className="absolute right-3 top-3 h-9 w-9 rounded-full bg-black/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </div>

            <div className="p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {project.category}
              </p>
              <h3 id="project-modal-title" className="mt-1.5 text-xl font-semibold sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-secondary">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Badge size="sm">{t}</Badge>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {project.repo ? (
                  <ButtonLink
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="outline"
                    size="sm"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </ButtonLink>
                ) : (
                  <p className="font-mono text-[11.5px] text-ink-muted">
                    // depo bağlantısı henüz yok
                  </p>
                )}
                <span className="ml-auto font-mono text-[11px] text-ink-muted">{project.year}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
