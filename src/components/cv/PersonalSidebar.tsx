import type { ReactNode } from 'react'
import { MapPin } from 'lucide-react'
import { personalInterests, site } from '../../data/site'

/**
 * Compact public-facing personal card; nothing private lives here.
 * Narrow screens lay it out as a row of facts plus a chip row, wide screens as
 * the vertical rail from the reference.
 */
export function PersonalSidebar() {
  return (
    <aside
      aria-label="Kişisel bilgiler"
      className="panel-inset px-3 py-4 sm:flex sm:flex-col sm:gap-4"
    >
      <div className="flex flex-row justify-around gap-3 sm:flex-col sm:justify-start sm:gap-4">
        <Fact
          emblem={<span className="font-display text-lg font-bold text-accent">32</span>}
          label="Yaş"
        />
        <Fact
          emblem={<span className="text-lg text-accent-soft">♉</span>}
          label="Boğa"
          sub="Burç"
        />
        <Fact
          emblem={<MapPin className="h-4 w-4 text-accent-warm" aria-hidden />}
          label={site.location.split(',')[0]}
          sub="Türkiye"
        />
      </div>

      <div className="mt-4 border-t border-edge pt-3.5 sm:mt-0 sm:border-0 sm:pt-0">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          İlgi Alanları
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 sm:block sm:space-y-1">
          {personalInterests.map((interest) => (
            <li
              key={interest}
              className="flex items-center gap-1.5 text-[11.5px] text-ink-secondary"
            >
              <span aria-hidden className="text-accent">
                ▸
              </span>
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function Fact({ emblem, label, sub }: { emblem: ReactNode; label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-edge bg-black/30">
        {emblem}
      </span>
      <span className="text-[12px] font-medium leading-tight text-ink-primary">{label}</span>
      {sub && <span className="text-[10px] leading-tight text-ink-muted">{sub}</span>}
    </div>
  )
}
