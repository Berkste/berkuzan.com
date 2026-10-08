import type { CSSProperties } from 'react'

/**
 * Feathers a raster illustration into the page on all four edges, so the
 * artwork reads as part of the scene instead of a pasted rectangle.
 * Two linear masks intersected beat a single radial, which always leaves the
 * mid-edges hard.
 */
export function feather(x = 12, y = 10): CSSProperties {
  const mask =
    `linear-gradient(to right, transparent 0%, #000 ${x}%, #000 ${100 - x}%, transparent 100%), ` +
    `linear-gradient(to bottom, transparent 0%, #000 ${y}%, #000 ${100 - y}%, transparent 100%)`

  return {
    maskImage: mask,
    WebkitMaskImage: mask,
    maskComposite: 'intersect',
    WebkitMaskComposite: 'source-in',
  } as CSSProperties
}

export const FEATHER = feather()
