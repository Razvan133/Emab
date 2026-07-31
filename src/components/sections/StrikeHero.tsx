import { useRef, useState } from 'react'
import {
  motion,
  transform,
  useAnimationControls,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import type { MotionValue, Variants } from 'framer-motion'
import { ArrowRight, ChevronDown, Phone } from 'lucide-react'
import ballAsset from '@/assets/bowling-ball.svg'
import { site } from '@/lib/site'
import { EASE_OUT, STAGGER } from '@/lib/motion'

/**
 * The page's one authored moment: a 260vh scroll scene. The viewport pins,
 * the ball rolls down a perspective lane with a slight hook, hits the pin
 * triangle at 55% progress, the pins scatter, and STRIKE lands. Everything
 * runs on transform/opacity via motion values — no React re-renders while
 * scrolling. Reduced motion gets a static composed scene instead.
 */

/** Where each pin flies on impact: vw/vh offsets and rotation. */
const SCATTER = [
  { x: -16, y: -9, r: -260 },
  { x: -9, y: -13, r: 200 },
  { x: 9, y: -12, r: -190 },
  { x: 17, y: -8, r: 260 },
  { x: -12, y: -5, r: -150 },
  { x: -4, y: -15, r: 120 },
  { x: 4, y: -14, r: -130 },
  { x: 12, y: -6, r: 170 },
  { x: -2, y: -8, r: -90 },
  { x: 2, y: -10, r: 100 },
] as const

/**
 * Pin triangle: row 0 faces the player. Rows behind sit higher on screen,
 * spread tighter, and scale down — a cheap but convincing perspective.
 */
const PIN_LAYOUT = [
  { x: 0, row: 0 },
  { x: -14, row: 1 },
  { x: 14, row: 1 },
  { x: -27, row: 2 },
  { x: 0, row: 2 },
  { x: 27, row: 2 },
  { x: -39, row: 3 },
  { x: -13, row: 3 },
  { x: 13, row: 3 },
  { x: 39, row: 3 },
] as const

const pinStyle = (pin: (typeof PIN_LAYOUT)[number]) => ({
  left: `${50 + pin.x * (1 - pin.row * 0.07)}%`,
  bottom: `${pin.row * 21}%`,
  zIndex: 4 - pin.row,
  scale: `${1 - pin.row * 0.08}`,
})

/**
 * Scroll-mapped value that framer can never promote to a WAAPI
 * ScrollTimeline animation. The native timeline measures progress against
 * the wrong scroll range for a sticky scene inside a tall section, which
 * left every promoted opacity frozen — so everything runs through plain
 * MotionValues updated imperatively on the main thread instead.
 */
function useScrollValue(
  progress: MotionValue<number>,
  input: number[],
  output: number[],
) {
  const value = useMotionValue(transform(progress.get(), input, output))
  useMotionValueEvent(progress, 'change', (v) =>
    value.set(transform(v, input, output)),
  )
  return value
}

function Pin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="pinBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b9bec9" />
          <stop offset="35%" stopColor="#f4f6fa" />
          <stop offset="70%" stopColor="#d4d9e3" />
          <stop offset="100%" stopColor="#9aa0ad" />
        </linearGradient>
      </defs>
      <path
        d="M20 2c6 0 9 4 9 9 0 4-2 7-3 11-1 5 1 9 4 15 4 8 6 14 6 22 0 22-7 39-16 39S4 81 4 59c0-8 2-14 6-22 3-6 5-10 4-15-1-4-3-7-3-11 0-5 3-9 9-9Z"
        fill="url(#pinBody)"
      />
      <path d="M8 34c1.5 3 22.5 3 24 0l1.5 5c-2.5 3.5-24.5 3.5-27 0Z" fill="#dc2626" />
      <path
        d="M20 2c6 0 9 4 9 9 0 4-2 7-3 11-.4 2-.2 4 .4 6-4-1.5-9.8-1.5-12.8 0 .6-2 .8-4 .4-6-1-4-3-7-3-11 0-5 3-9 9-9Z"
        fill="#ffffff"
        opacity="0.5"
      />
    </svg>
  )
}

/** The lane: a single perspective strip of wood boards with gutters, guide
    arrows and electric light lines. The lights live inside the 3D plane so
    they converge toward the horizon like the boards do. */
function Lane() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[54%] sm:top-[46%]" aria-hidden>
      <div className="absolute inset-x-[16%] inset-y-0 [perspective:700px] sm:inset-x-[22%]">
        <div
          className="absolute inset-x-0 top-0 h-[135%] origin-top [transform:rotateX(54deg)]"
          style={{
            background:
              /* wood boards: alternating plank stripes */
              `repeating-linear-gradient(90deg,
                 var(--color-lane-600) 0px, var(--color-lane-500) 22px,
                 var(--color-lane-600) 23px, var(--color-lane-400) 44px,
                 var(--color-lane-600) 45px)`,
          }}
        >
          {/* night mood: the lane glows mid-distance, falls into shadow near the player */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/45 to-ink-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_12%,rgb(255_240_210/0.34),transparent_70%)]" />
          {/* gutters */}
          <div className="absolute inset-y-0 left-0 w-[6%] bg-ink-950/90 shadow-[inset_0_0_14px_rgb(0_0_0/0.95)]" />
          <div className="absolute inset-y-0 right-0 w-[6%] bg-ink-950/90 shadow-[inset_0_0_14px_rgb(0_0_0/0.95)]" />
          {/* electric light lines just inside the gutters */}
          <div className="light-flicker absolute inset-y-0 left-[7%] w-[3px] bg-gradient-to-t from-electric-500/0 via-electric-500 to-electric-400 shadow-[0_0_16px_3px_var(--color-electric-500)]" />
          <div className="light-flicker absolute inset-y-0 right-[7%] w-[3px] bg-gradient-to-t from-electric-500/0 via-electric-500 to-electric-400 shadow-[0_0_16px_3px_var(--color-electric-500)] [animation-delay:120ms]" />
          {/* guide arrows, small and dark like on a real lane */}
          <svg
            viewBox="0 0 100 26"
            className="absolute left-1/2 top-[24%] w-[46%] -translate-x-1/2 opacity-45"
          >
            {[
              [50, 2],
              [41, 10],
              [59, 10],
              [32, 18],
              [50, 18],
              [68, 18],
            ].map(([cx, cy], i) => (
              <path key={i} d={`M${cx} ${cy} l1.7 4.6 h-3.4 Z`} fill="#5f1d1d" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

export function StrikeHero() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const shake = useAnimationControls()
  const struckRef = useRef(false)
  const [ballSrc] = useState(ballAsset)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* Ball path: forward (up-screen), shrinking with distance, hooking left
     into the pocket like a real hook shot. */
  const ballX = useScrollValue(scrollYProgress, [0.08, 0.3, 0.46, 0.55], [0, 4.2, -1.6, -0.6])
  const ballY = useScrollValue(scrollYProgress, [0.08, 0.55], [0, -47])
  const ballScale = useScrollValue(scrollYProgress, [0.08, 0.55], [1, 0.14])
  const ballOpacity = useScrollValue(scrollYProgress, [0.55, 0.6], [1, 0])
  const ballTransform = useMotionTemplate`translate3d(${ballX}vw, ${ballY}vh, 0) scale(${ballScale})`
  const ballRoll = useScrollValue(scrollYProgress, [0.08, 0.55], [0, 480])
  const ballRollTransform = useMotionTemplate`rotate(${ballRoll}deg)`

  /* Copy recedes as the throw begins. */
  const copyOpacity = useScrollValue(scrollYProgress, [0.04, 0.2], [1, 0])
  const copyY = useScrollValue(scrollYProgress, [0.04, 0.2], [0, -7])
  const copyTransform = useMotionTemplate`translate3d(0, ${copyY}vh, 0)`
  const hintOpacity = useScrollValue(scrollYProgress, [0, 0.06], [1, 0])

  /* Impact: flash, then STRIKE. */
  const flashOpacity = useScrollValue(scrollYProgress, [0.53, 0.56, 0.63], [0, 0.85, 0])
  const strikeOpacity = useScrollValue(scrollYProgress, [0.56, 0.63, 0.85, 0.95], [0, 1, 1, 0])
  const strikeScale = useScrollValue(scrollYProgress, [0.56, 0.66], [0.82, 1])
  const strikeTransform = useMotionTemplate`scale(${strikeScale})`

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduceMotion) return
    if (v >= 0.55 && !struckRef.current) {
      struckRef.current = true
      shake.start({
        transform: [
          'translate3d(0,0,0)',
          'translate3d(0,7px,0)',
          'translate3d(-5px,-4px,0)',
          'translate3d(4px,2px,0)',
          'translate3d(0,0,0)',
        ],
        transition: { duration: 0.4, ease: 'easeOut' },
      })
    } else if (v < 0.45 && struckRef.current) {
      struckRef.current = false
    }
  })

  const copyContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER, delayChildren: 0.55 } },
  }
  const copyItem: Variants = {
    hidden: { opacity: 0, transform: 'translateY(18px)' },
    show: {
      opacity: 1,
      transform: 'translateY(0px)',
      transition: { duration: 0.55, ease: EASE_OUT },
    },
  }

  /* ------- static branch for reduced motion ------- */
  if (reduceMotion) {
    return (
      <section id="top" className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pb-10 pt-32">
        <SceneBackdrop />
        <Lane />
        <PinDeck />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          <HeroCopy container={copyContainer} item={copyItem} />
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="top" className="relative h-[260vh]">
      <motion.div animate={shake} className="sticky top-0 h-svh overflow-hidden">
        <div className="relative isolate size-full">
          <SceneBackdrop />
          <Lane />

          {/* pin triangle standing on the lane's far edge */}
          <div
            className="absolute left-1/2 top-[48%] z-[5] h-[8vh] w-[92px] -translate-x-1/2 sm:top-[37%] sm:h-[9.5vh] sm:w-[120px]"
            aria-hidden
          >
            {PIN_LAYOUT.map((pin, i) => {
              const window0 = 0.55 + (i % 4) * 0.006
              return <ScatterPin key={i} index={i} pin={pin} window0={window0} progress={scrollYProgress} />
            })}
          </div>

          {/* the ball, foreground, ready to roll */}
          <motion.div
            style={{ transform: ballTransform, opacity: ballOpacity, transformOrigin: '50% 100%' }}
            className="absolute bottom-[3vh] left-1/2 z-10 w-[19vh] max-w-[230px] -translate-x-1/2 sm:w-[24vh]"
          >
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(-70vh)' }}
              animate={{ opacity: 1, transform: 'translateY(0vh)' }}
              transition={{ duration: 0.65, ease: [0.55, 0, 1, 0.45], delay: 0.2 }}
            >
              <motion.img
                src={ballSrc}
                alt=""
                width={600}
                height={600}
                style={{ transform: ballRollTransform }}
                className="aspect-square w-full rounded-full [filter:drop-shadow(0_24px_30px_rgb(0_0_0/0.9))_drop-shadow(0_0_50px_rgb(59_130_246/0.28))]"
              />
            </motion.div>
          </motion.div>

          {/* impact flash */}
          <motion.div
            style={{ opacity: flashOpacity }}
            className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgb(219_234_254/0.95),rgb(59_130_246/0.35)_55%,transparent_80%)]"
            aria-hidden
          />

          {/* STRIKE. */}
          <motion.div
            style={{ opacity: strikeOpacity, transform: strikeTransform }}
            className="pointer-events-none absolute inset-x-0 top-[30%] z-30 text-center"
            aria-hidden
          >
            <p className="font-display text-[clamp(4rem,13vw,10.5rem)] font-extrabold leading-none tracking-tight text-white [text-shadow:0_0_60px_rgb(59_130_246/0.65)]">
              STRIKE
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.35em] text-electric-400">
              Așa sună o seară la Emab
            </p>
          </motion.div>

          {/* headline + CTA, in the dark air above the lane */}
          <motion.div
            style={{ opacity: copyOpacity, transform: copyTransform }}
            className="absolute inset-x-0 top-0 z-10 pt-[9vh] sm:pt-[15vh]"
          >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
              <HeroCopy container={copyContainer} item={copyItem} />
            </div>
          </motion.div>

          {/* scroll hint, tucked in the corner so it never sits on the ball */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-6 left-6 z-10 hidden items-center gap-2 text-white/50 sm:flex lg:left-10"
          >
            <ChevronDown className="hint-nudge size-4" />
            <span className="text-[0.7rem] uppercase tracking-[0.3em]">Dă scroll pentru strike</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/** One pin: stands until its window opens, then flies out and fades. */
function ScatterPin({
  index,
  pin,
  window0,
  progress,
}: {
  index: number
  pin: (typeof PIN_LAYOUT)[number]
  window0: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const vec = SCATTER[index]
  const tx = useScrollValue(progress, [window0, window0 + 0.18], [0, vec.x])
  const ty = useScrollValue(progress, [window0, window0 + 0.18], [0, vec.y])
  const rot = useScrollValue(progress, [window0, window0 + 0.18], [0, vec.r])
  const opacity = useScrollValue(progress, [window0 + 0.1, window0 + 0.2], [1, 0])
  const pinTransform = useMotionTemplate`translate3d(${tx}vw, ${ty}vh, 0) rotate(${rot}deg)`

  const base = pinStyle(pin)

  return (
    <motion.div
      style={{ ...base, transform: pinTransform, opacity }}
      className="absolute w-[19%] -translate-x-1/2"
    >
      <Pin className="w-full drop-shadow-[0_5px_8px_rgb(0_0_0/0.65)]" />
    </motion.div>
  )
}

/** Room behind the lane: dark air, two hanging light pools, horizon line. */
function SceneBackdrop() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-ink-950" />
      <div className="light-flicker absolute left-1/2 top-[8%] size-[42rem] -translate-x-1/2 rounded-full bg-electric-600/16 blur-[130px]" />
      <div className="absolute -right-32 top-[30%] size-[26rem] rounded-full bg-violetglow-500/12 blur-[120px]" />
      {/* horizon: the dark mouth of the pin deck */}
      <div className="absolute inset-x-0 top-[54%] h-[8vh] bg-gradient-to-b from-transparent via-ink-900 to-transparent sm:top-[46%]" />
    </div>
  )
}

/** Standing pins for the static reduced-motion scene. */
function PinDeck() {
  return (
    <div
      className="absolute left-1/2 top-[48%] z-[5] h-[8vh] w-[92px] -translate-x-1/2 sm:top-[37%] sm:h-[9.5vh] sm:w-[120px]"
      aria-hidden
    >
      {PIN_LAYOUT.map((pin, i) => (
        <div key={i} style={pinStyle(pin)} className="absolute w-[19%] -translate-x-1/2">
          <Pin className="w-full drop-shadow-[0_5px_8px_rgb(0_0_0/0.65)]" />
        </div>
      ))}
    </div>
  )
}

function HeroCopy({ container, item }: { container: Variants; item: Variants }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
      <motion.h1
        variants={item}
        className="font-display text-[clamp(2.1rem,5.2vw,4.4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-balance text-white"
      >
        Seara începe
        <br />
        cu un <span className="font-extrabold text-electric-400">strike</span>.
      </motion.h1>

      <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
        Piste profesionale, darts, fotbal de masă și un bar cu personalitate
        <span className="hidden sm:inline">
          {' '}— totul într-un singur loc, pe Str. Republicii 194bis, în Bacău
        </span>
        .
      </motion.p>

      <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={site.phoneHref}
          className="pressable group inline-flex items-center justify-center gap-2 rounded-full bg-electric-500 px-8 py-4 font-semibold text-white shadow-[0_18px_45px_-14px] shadow-electric-500/80"
        >
          <Phone className="size-4.5" />
          Rezervă acum
          <ArrowRight className="size-4.5 transition-transform duration-200 ease-out-strong group-hover:translate-x-1" />
        </a>
        <a
          href="#activitati"
          className="pressable inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-medium text-white/80 transition-[color,background-color,border-color,transform] duration-200 ease-out hover:border-white/35 hover:bg-white/5 hover:text-white"
        >
          Vezi activitățile
        </a>
      </motion.div>

      <motion.p variants={item} className="mt-7 hidden text-sm text-white/55 sm:block">
        {site.phone} · {site.address}
      </motion.p>
    </motion.div>
  )
}
