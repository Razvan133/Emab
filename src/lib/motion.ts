/**
 * Shared motion tokens.
 *
 * Everything that moves on this page pulls its easing and timing from here so
 * the whole site reads as one system rather than a pile of one-off numbers.
 */

/** Strong ease-out. Entrances and exits — starts fast, so it feels responsive. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** Strong ease-in-out. Only for things moving across the screen. */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

/** Gravity curve. Reserved for the falling hero ball — never for UI. */
export const EASE_FALL = [0.55, 0, 1, 0.45] as const

/** Scroll reveals. Long enough to read as deliberate, short enough to stay out of the way. */
export const REVEAL_DURATION = 0.55

/** Gap between staggered siblings. Above ~80ms the cascade starts to feel slow. */
export const STAGGER = 0.06

/**
 * Framer Motion's `x`/`y` shorthands run on the main thread, so they drop
 * frames while the browser is busy. Animating the full `transform` string
 * keeps the work on the compositor.
 */
export const translateY = (px: number) => `translateY(${px}px)`
