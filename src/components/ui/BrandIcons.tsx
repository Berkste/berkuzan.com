import type { SVGProps } from 'react'

/**
 * Brand marks (GitHub, LinkedIn, X, YouTube) are no longer shipped by lucide-react,
 * so they live here as small inline glyphs. Everything else uses lucide.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
} as const

export function GithubIcon({ className, ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.9 3.17 9.05 7.57 10.52.55.1.75-.24.75-.53v-1.9c-3.08.67-3.73-1.32-3.73-1.32-.5-1.29-1.23-1.63-1.23-1.63-1-.69.08-.67.08-.67 1.11.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.46-.28-5.05-1.24-5.05-5.5 0-1.22.43-2.21 1.14-2.99-.11-.28-.5-1.42.11-2.95 0 0 .93-.3 3.06 1.14a10.5 10.5 0 0 1 5.58 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.71.78 1.14 1.77 1.14 2.99 0 4.27-2.6 5.21-5.07 5.49.4.35.76 1.03.76 2.08v3.08c0 .3.2.64.76.53a11.11 11.11 0 0 0 7.56-10.52C23.1 5.33 18.27.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className, ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M6.94 5.5a2.19 2.19 0 1 1-4.38 0 2.19 2.19 0 0 1 4.38 0ZM3 8.98h3.86V21H3V8.98Zm6.32 0h3.7v1.64h.05c.52-.94 1.79-1.93 3.68-1.93 3.94 0 4.67 2.5 4.67 5.76V21h-3.86v-5.66c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.19 1.46-2.19 2.98V21H9.32V8.98Z" />
    </svg>
  )
}

export function XIcon({ className, ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M17.53 3h3.2l-6.99 7.99L22 21h-6.44l-5.04-6.59L4.75 21h-3.2l7.47-8.54L2 3h6.6l4.56 6.03L17.53 3Zm-1.12 16.06h1.77L7.68 4.84H5.78l10.63 14.22Z" />
    </svg>
  )
}

export function YoutubeIcon({ className, ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M22.54 6.98a2.79 2.79 0 0 0-1.96-1.98C18.83 4.5 12 4.5 12 4.5s-6.83 0-8.58.5A2.79 2.79 0 0 0 1.46 6.98 29.1 29.1 0 0 0 1 12a29.1 29.1 0 0 0 .46 5.02 2.79 2.79 0 0 0 1.96 1.98c1.75.5 8.58.5 8.58.5s6.83 0 8.58-.5a2.79 2.79 0 0 0 1.96-1.98A29.1 29.1 0 0 0 23 12a29.1 29.1 0 0 0-.46-5.02ZM9.75 15.27V8.73L15.5 12l-5.75 3.27Z" />
    </svg>
  )
}
