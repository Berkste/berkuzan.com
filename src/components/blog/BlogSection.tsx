import { ArrowRight } from 'lucide-react'
import { blogPosts } from '../../data/blog'
import { Card, SectionHeader } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { BlogCard } from './BlogCard'
import { CareerTimeline } from '../cv/CareerTimeline'

/** Blog and the CV timeline share one row, mirroring the reference layout. */
export function BlogSection() {
  return (
    <div className="shell grid gap-5 pb-[var(--section-gap)] xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] xl:gap-6">
      <section id="blog" aria-labelledby="blog-title" className="scroll-mt-24">
        <Reveal className="h-full">
          <Card neon className="flex h-full flex-col p-5 sm:p-6">
            <SectionHeader
              id="blog-title"
              icon={
                <span aria-hidden className="text-sm">
                  ✍️
                </span>
              }
              title="Son Blog Yazıları"
              action={
                <a
                  href="#blog"
                  className="group flex items-center gap-1.5 text-[13px] text-ink-secondary transition-colors hover:text-accent"
                >
                  Tüm Yazılar
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              }
            />

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post, i) => (
                <li key={post.id} className="h-full">
                  <Reveal delay={i * 0.07} className="h-full">
                    <BlogCard post={post} />
                  </Reveal>
                </li>
              ))}
            </ul>

            {/* 4th post as a compact row so the card keeps its proportions */}
            <ul className="mt-auto pt-4">
              {blogPosts.slice(3).map((post) => (
                <li key={post.id}>
                  <a
                    href={`#blog-${post.id}`}
                    className="hover:border-accent/45 hover:bg-accent/[0.06] group flex items-center gap-3 rounded-xl border border-edge bg-white/[0.02] px-4 py-3 transition-all duration-300"
                  >
                    <span className="font-mono text-[11px] text-accent">04</span>
                    <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink-primary">
                      {post.title}
                    </span>
                    <time
                      dateTime={post.datetime}
                      className="hidden shrink-0 font-mono text-[11px] text-ink-muted sm:block"
                    >
                      {post.date}
                    </time>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </section>

      <section id="cv" aria-labelledby="cv-title" className="scroll-mt-24">
        <Reveal delay={0.08} className="h-full">
          <CareerTimeline />
        </Reveal>
      </section>
    </div>
  )
}
