import { useRef } from 'react'
import { useInView } from 'framer-motion'

const WORDS = ['Bowling', 'Darts', 'Foosball', 'Restaurant & Bar']

/**
 * The venue's offer as a slow light-band between the strike scene and the
 * activities. Pure CSS transform loop; paused whenever it leaves the viewport
 * so the loop never burns cycles offscreen.
 */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  const row = (
    <div className="flex shrink-0 items-center">
      {WORDS.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-8 font-display text-2xl font-bold uppercase tracking-tight text-white/15 sm:text-3xl">
            {word}
          </span>
          <span className="size-2 rotate-45 bg-electric-500/40" aria-hidden />
        </span>
      ))}
    </div>
  )

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-white/8 bg-ink-900/60 py-6"
      aria-hidden
    >
      <div
        className="marquee-track flex w-max"
        style={{ animationPlayState: inView ? 'running' : 'paused' }}
      >
        {row}
        {row}
      </div>
    </div>
  )
}
