import { site } from '../../data/site'

export function Footer() {
  return (
    <footer className="bg-[rgba(8,3,6,0.75)]">
      {/* Extra bottom padding keeps the floating Koala OS launcher clear of the credits. */}
      <div className="shell flex flex-col items-center gap-2 pb-20 pt-6 text-center sm:flex-row sm:justify-between sm:pb-6 sm:text-left">
        <p className="text-[12.5px] text-ink-muted">
          © {new Date().getFullYear()} {site.name} — Made with <span aria-hidden>☕</span>
          <span className="sr-only">kahve</span>, <span className="text-accent">♥</span> and a lot
          of commits.
        </p>
        <p className="text-ink-muted/80 font-mono text-[11px] tracking-[0.16em]">
          {site.tagline.toUpperCase()}
        </p>
      </div>
    </footer>
  )
}
