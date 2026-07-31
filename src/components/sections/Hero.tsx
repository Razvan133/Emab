import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import ballFallback from '@/assets/bowling-ball.svg'
import { site } from '@/lib/site'

/**
 * Unsplash placeholder for the hero ball. Swap for the venue's own render or
 * photo before launch; if it ever fails to load we fall back to the local
 * vector ball so the hero never renders empty.
 */
const UNSPLASH_BALL =
  'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1400&q=80'

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [ballSrc, setBallSrc] = useState(UNSPLASH_BALL)

  // Heavy drop with a settling bounce, then a slow continuous float.
  const dropAnimation = reduceMotion
    ? { opacity: 1, y: 0 }
    : {
        opacity: [0, 1, 1, 1, 1, 1, 1, 1],
        y: ['-115%', '0%', '-19%', '0%', '-7%', '0%', '-2%', '0%'],
        scaleY: [1, 0.88, 1.04, 0.95, 1.02, 0.98, 1.01, 1],
      }

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[46rem] -translate-x-1/2 rounded-full bg-electric-600/18 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 -z-10 size-[34rem] rounded-full bg-violetglow-500/14 blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent to-ink-950" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-10 lg:pb-32 lg:pt-44">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur-md transition-colors hover:border-electric-400/50 hover:text-white"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-electric-400" />
            </span>
            <MapPin className="size-3.5" />
            {site.address}
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Strike-uri perfecte,</span>
            <br />
            <span className="text-white/90">seri de neuitat.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg lg:mx-0"
          >
            Piste profesionale, darts, fotbal de masă și un bar cu personalitate — totul
            într-un singur loc, în inima Bacăului. Adu-ți prietenii, noi ne ocupăm de
            restul.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href={site.phoneHref}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-electric-500 to-violetglow-500 px-8 py-4 font-semibold text-white shadow-[0_18px_45px_-14px] shadow-electric-500/80 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.99] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Phone className="relative size-4.5" />
              <span className="relative">Rezervă acum</span>
              <ArrowRight className="relative size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#activitati"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-medium text-white/80 transition-colors duration-300 hover:border-white/35 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              Vezi activitățile
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
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
        </div>

        {/* The ball */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-[74vw] max-w-[420px] sm:w-[52vw] lg:w-full lg:max-w-[460px]">
            {/* Contact shadow on the floor */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={
                reduceMotion
                  ? { opacity: 0.75, scaleX: 1 }
                  : {
                      opacity: [0, 0.85, 0.5, 0.8, 0.62, 0.78, 0.7, 0.75],
                      scaleX: [0.35, 1.08, 0.78, 1.02, 0.88, 1, 0.95, 1],
                    }
              }
              transition={{
                duration: 1.9,
                times: [0, 0.45, 0.6, 0.72, 0.82, 0.9, 0.96, 1],
                ease: 'easeOut',
              }}
              className="absolute inset-x-[12%] bottom-[6%] h-10 rounded-[50%] bg-black blur-2xl"
            />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: '-115%' }}
              animate={dropAnimation}
              transition={{
                duration: reduceMotion ? 0.4 : 1.9,
                times: reduceMotion
                  ? undefined
                  : [0, 0.45, 0.6, 0.72, 0.82, 0.9, 0.96, 1],
                ease: reduceMotion
                  ? 'easeOut'
                  : ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
              }}
              style={{ transformOrigin: '50% 100%' }}
            >
              {/* Continuous float, handed over once the drop settles */}
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [0, 3, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.95,
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
