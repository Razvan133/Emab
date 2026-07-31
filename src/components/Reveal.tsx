import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, REVEAL_DURATION, translateY } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to wait before starting — use STAGGER multiples for siblings. */
  delay?: number
  /** How far the element travels. Keep it small; big travel reads as slow. */
  distance?: number
  as?: 'div' | 'article' | 'section'
}

/**
 * Single scroll-reveal primitive, so every section enters the same way.
 *
 * Under `prefers-reduced-motion` the travel is dropped and only the fade
 * remains — the reveal still communicates "new content", without the movement.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]
  const offset = reduceMotion ? 0 : distance

  return (
    <Component
      initial={{ opacity: 0, transform: translateY(offset) }}
      whileInView={{ opacity: 1, transform: translateY(0) }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: reduceMotion ? 0.25 : REVEAL_DURATION,
        delay: reduceMotion ? 0 : delay,
        ease: EASE_OUT,
      }}
      className={className}
    >
      {children}
    </Component>
  )
}
