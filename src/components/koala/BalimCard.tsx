import { Star } from 'lucide-react'
import { useThemeCopy } from '../../lib/theme-context'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'

const TITLES = ['Chief Debugging Officer', 'Professional Cat', 'Full-time Supervisor']

/**
 * Balım gets one slim strip — enough to be part of the identity, not enough to
 * turn the site into a pet page.
 */
export function BalimCard() {
  const copy = useThemeCopy()

  return (
    <div className="shell pb-[var(--section-gap)]">
      <Reveal>
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
            <img
              src="/images/koala/balim.png"
              alt="Balım, tekir kedi, uyuklarken"
              width={390}
              height={294}
              loading="lazy"
              decoding="async"
              className="border-edge-strong/40 h-20 w-20 shrink-0 rounded-2xl border object-cover shadow-[0_14px_34px_-16px_rgba(0,0,0,0.9)] sm:h-[86px] sm:w-[86px]"
            />

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11.5px] text-ink-muted">
                <span className="text-accent">&gt;</span> {copy.balimFile}
              </p>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-[17px] font-semibold text-ink-primary">Balım</h3>
                <span className="flex items-center gap-0.5" role="img" aria-label="Beş yıldız">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
                  ))}
                </span>
              </div>

              <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5 font-mono text-[11.5px] text-ink-secondary">
                {TITLES.map((title, i) => (
                  <li key={title} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-ink-muted/60">
                        ·
                      </span>
                    )}
                    {title}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-accent-soft/85 shrink-0 font-hand text-[19px] leading-tight sm:max-w-[190px] sm:text-right">
              Klavyeye oturarak
              <br className="hidden sm:block" /> code review yapar.
            </p>
          </div>
        </Card>
      </Reveal>
    </div>
  )
}
