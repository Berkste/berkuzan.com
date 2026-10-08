import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { site } from '../../data/site'
import { ButtonLink } from './Button'
import { cn } from '../../lib/cn'

type CvButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline'
  className?: string
  label?: string
}

/**
 * The CV PDF is dropped in later. Rather than sending visitors to a 404, probe
 * the file first and fall back to an inline note if it isn't there yet.
 */
export function CvButton({
  size = 'lg',
  variant = 'outline',
  className,
  label = 'CV İndir',
}: CvButtonProps) {
  const [missing, setMissing] = useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(site.cvPath, { method: 'HEAD' })
      const type = res.headers.get('content-type') ?? ''
      // A dev server happily returns index.html for unknown paths, so check the type too.
      if (res.ok && !type.includes('text/html')) {
        window.location.href = site.cvPath
        return
      }
    } catch {
      /* fall through to the note below */
    }
    setMissing(true)
  }

  return (
    <span className={cn('relative inline-flex flex-col', className)}>
      <ButtonLink
        href={site.cvPath}
        onClick={handleClick}
        variant={variant}
        size={size}
        aria-describedby={missing ? 'cv-missing' : undefined}
      >
        {label}
        <Download className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden />
      </ButtonLink>

      <AnimatePresence>
        {missing && (
          <motion.span
            id="cv-missing"
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-full mt-2 whitespace-nowrap font-mono text-[11px] text-ink-muted"
          >
            // CV dosyası henüz yüklenmedi
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
