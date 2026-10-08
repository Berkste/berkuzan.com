import { ArrowRight, Clock } from 'lucide-react'
import type { BlogPost } from '../../data/blog'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

export function BlogCard({ post }: { post: BlogPost }) {
  const titleId = `post-${post.id}-title`

  return (
    <Card interactive className="h-full overflow-hidden">
      <article aria-labelledby={titleId} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={`${post.title} yazısının kapak görseli`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(16,6,11,0.9))]"
          />
          <Badge tone="accent" size="sm" className="absolute left-3 top-3 backdrop-blur-md">
            {post.category}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3
            id={titleId}
            className="text-[15px] font-semibold leading-snug text-ink-primary transition-colors duration-300 group-hover:text-accent-soft"
          >
            {post.title}
          </h3>

          <p className="mt-2 flex items-center gap-2 font-mono text-[11px] text-ink-muted">
            <time dateTime={post.datetime}>{post.date}</time>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden />
              {post.readingTime}
            </span>
          </p>

          <p className="mt-3 text-[13px] leading-relaxed text-ink-secondary">{post.excerpt}</p>

          <a
            href={`#blog-${post.id}`}
            className="mt-4 inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-accent transition-colors hover:text-accent-soft"
          >
            Devamını Oku
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </div>
      </article>
    </Card>
  )
}
