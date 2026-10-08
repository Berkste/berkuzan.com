import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { heroSkills, skillGroups, skillTags } from '../../data/skills'
import { Card, SectionHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

export function SkillsSection() {
  const reduced = useReducedMotion()
  const [openGroup, setOpenGroup] = useState<string>(skillGroups[0].id)
  const active = skillGroups.find((g) => g.id === openGroup) ?? skillGroups[0]

  return (
    <Card neon className="p-5 sm:p-6">
      <SectionHeader
        icon={
          <span aria-hidden className="text-sm">
            🧩
          </span>
        }
        title="Teknoloji & Yetenekler"
      />

      {/* Tile grid — the visual centrepiece of the card */}
      <ul className="mt-5 grid grid-cols-3 gap-2.5 xs:grid-cols-4 sm:grid-cols-5">
        {heroSkills.map((skill, i) => (
          <motion.li
            key={skill.name}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.03 * i, duration: 0.4 }}
          >
            <div
              className="group relative flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-edge bg-black/25 p-1 transition-all duration-300 hover:-translate-y-1 hover:border-edge-strong"
              title={skill.name}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `0 0 22px -6px ${skill.tint}` }}
              />
              <span
                className="grid h-8 w-8 place-items-center rounded-lg font-mono text-[11px] font-bold"
                style={{
                  color: skill.tint,
                  background: `color-mix(in srgb, ${skill.tint} 14%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${skill.tint} 34%, transparent)`,
                }}
                aria-hidden
              >
                {skill.short}
              </span>
              <span className="max-w-full truncate px-1 text-[9.5px] text-ink-muted transition-colors duration-300 group-hover:text-ink-secondary">
                {skill.name}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Quick tag row */}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {skillTags.map((tag) => (
          <li key={tag}>
            <Badge tone="mono" size="sm">
              <span className="text-accent">•</span>
              {tag}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="hair-divider my-5" />

      {/* Grouped, filterable full list */}
      <div>
        <ul className="flex flex-wrap gap-1.5" role="tablist" aria-label="Teknoloji grupları">
          {skillGroups.map((group) => {
            const Icon = group.icon
            const isActive = group.id === openGroup
            return (
              <li key={group.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${group.id}`}
                  onClick={() => setOpenGroup(group.id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] transition-all duration-300',
                    isActive
                      ? 'border-accent/55 bg-accent/12 text-accent-soft'
                      : 'border-edge bg-white/[0.02] text-ink-muted hover:border-edge-strong hover:text-ink-secondary',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {group.label}
                </button>
              </li>
            )
          })}
        </ul>

        <motion.ul
          key={active.id}
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3.5 flex min-h-[64px] flex-wrap gap-1.5"
        >
          {active.items.map((item) => (
            <li key={item}>
              <Badge size="sm" className="hover:border-accent/45 hover:text-accent-soft">
                {item}
              </Badge>
            </li>
          ))}
        </motion.ul>
      </div>
    </Card>
  )
}
