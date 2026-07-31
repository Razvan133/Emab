import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import ballFallback from '@/assets/bowling-ball.svg'
import { site } from '@/lib/site'
import { EASE_FALL, EASE_OUT, STAGGER, translateY } from '@/lib/motion'

/**
 * Unsplash placeholder for the hero ball. Swap for the venue's own render or
 * photo before launch; if it ever fails to load we fall back to the local
 * vector ball so the hero never renders empty.
 */
const UNSPLASH_BALL =
  'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1400&q=80'

/**
 * Impact at 55%, then a single shallow rebound. A bowling ball weighs ~7kg —
 * it thuds and settles, it doesn't bounce like a rubber ball. The fall uses a
 * gravity curve (accelerating); everything after the impact uses ease-out.
 */
const DROP_KEYFRAMES = [
  'translateY(-115%) scaleY(1)',
  'translateY(0%) scaleY(0.93)',
  'translateY(-6%) scaleY(1.02)',
  'translateY(0%) scaleY(0.985)',
  'translateY(0%) scaleY(1)',
]
const DROP_TIMES = [0, 0.55, 0.73, 0.89, 1]
const DROP_DURATION = 0.95

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [ballSrc, setBallSrc] = useState(UNSPLASH_BALL)

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : STAGGER,
        delayChildren: 0.1,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, transform: translateY(reduceMotion ? 0 : 16) },
    show: {
      opacity: 1,
      transform: translateY(0),
      transition: { duration: 0.5, ease: EASE_OUT },
    },
  }

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[46rem] -translate-x-1/2 rounded-full bg-electric-600/18 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 -z-10 size-[34rem] rounded-full bg-violetglow-500/14 blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent to-ink-950" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-10 lg:pb-32 lg:pt-44">
        {/* Copy — one stagger container instead of six hand-tuned delays */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.div variants={item}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur-md transition-colors duration-200 ease-out hover:border-electric-400/50 hover:text-white"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-electric-400" />
              </span>
              <MapPin className="size-3.5" />
              {site.address}
            </a>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Strike-uri perfecte,</span>
            <br />
            <span className="text-white/90">seri de neuitat.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg lg:mx-0"
          >
            Piste profesionale, darts, fotbal de masă și un bar cu personalitate — totul
            într-un singur loc, în inima Bacăului. Adu-ți prietenii, noi ne ocupăm de
            restul.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href={site.phoneHref}
              className="pressable group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-electric-500 to-violetglow-500 px-8 py-4 font-semibold text-white shadow-[0_18px_45px_-14px] shadow-electric-500/80 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-600 ease-out-strong group-hover:translate-x-full" />
              <Phone className="relative size-4.5" />
              <span className="relative">Rezervă acum</span>
              <ArrowRight className="relative size-4.5 transition-transform duration-200 ease-out-strong group-hover:translate-x-1" />
            </a>

            <a
              href="#activitati"
              className="pressable inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-medium text-white/80 transition-[color,background-color,border-color,transform] duration-200 ease-out hover:border-white/35 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              Vezi activitățile
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/8 pt-8 lg:mx-0"
          >
            {[
              { value: '4', label: 'Activități' },
              { value: 'Pro', label: 'Scor digital' },
              { value: 'Bar', label: 'Meniu & bar' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="font-display text-2xl font-semibold text-white">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-white/40">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* The ball */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-[74vw] max-w-[420px] sm:w-[52vw] lg:w-full lg:max-w-[460px]">
            {/* Contact shadow — tightens on impact, then relaxes with the rebound */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, transform: 'scaleX(0.4)' }}
              animate={
                reduceMotion
                  ? { opacity: 0.75, transform: 'scaleX(1)' }
                  : {
                      opacity: [0, 0.88, 0.6, 0.76, 0.75],
                      transform: [
                        'scaleX(0.4)',
                        'scaleX(1.06)',
                        'scaleX(0.86)',
                        'scaleX(1.01)',
                        'scaleX(1)',
                      ],
                    }
              }
              transition={{
                duration: reduceMotion ? 0.3 : DROP_DURATION,
                times: reduceMotion ? undefined : DROP_TIMES,
                ease: EASE_OUT,
              }}
              className="absolute inset-x-[12%] bottom-[6%] h-10 rounded-[50%] bg-black blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, transform: DROP_KEYFRAMES[0] }}
              animate={
                reduceMotion
                  ? { opacity: 1, transform: 'translateY(0%) scaleY(1)' }
                  : {
                      opacity: [0, 1, 1, 1, 1],
                      transform: DROP_KEYFRAMES,
                    }
              }
              transition={{
                duration: reduceMotion ? 0.3 : DROP_DURATION,
                times: reduceMotion ? undefined : DROP_TIMES,
                // Gravity on the way down, ease-out for everything after impact
                ease: reduceMotion
                  ? EASE_OUT
                  : [EASE_FALL, EASE_OUT, EASE_OUT, EASE_OUT],
              }}
              style={{ transformOrigin: '50% 100%' }}
            >
              {/* Ambient float, handed over once the drop has settled */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        transform: [
                          'translateY(0px)',
                          'translateY(-12px)',
                          'translateY(0px)',
                        ],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: DROP_DURATION + 0.1,
                }}
              >
                <img
                  src={ballSrc}
                  onError={() => setBallSrc(ballFallback)}
                  alt="Bilă de bowling premium"
                  width={920}
                  height={920}
                  loading="eager"
                  decoding="async"
                  className="floor-reflect aspect-square w-full rounded-full object-cover [filter:drop-shadow(0_35px_45px_rgba(0,0,0,0.8))_drop-shadow(0_0_70px_rgba(59,130,246,0.28))_drop-shadow(0_0_120px_rgba(139,92,246,0.18))]"
                />
              </motion.div>
            </motion.div>

            {/* Rim light hugging the sphere */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_70%_75%,rgba(59,130,246,0.35),transparent_62%)] blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
