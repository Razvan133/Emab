import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { navLinks, site } from '@/lib/site'
import { EASE_OUT, translateY } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, transform: translateY(reduceMotion ? 0 : -24) }}
      animate={{ opacity: 1, transform: translateY(0) }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-out',
        scrolled
          ? 'border-b border-white/10 bg-ink-950/70 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="pressable flex items-center gap-3">
          <span className="relative grid size-9 place-items-center rounded-full bg-gradient-to-br from-electric-500 to-violetglow-500 shadow-[0_0_24px_-4px] shadow-electric-500/70">
            <span className="size-2.5 rounded-full bg-ink-950/80" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Emab<span className="text-white/45"> Bowling</span>
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-white/65 transition-colors duration-200 ease-out hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-electric-400 after:transition-[width] after:duration-200 after:ease-out-strong hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="pressable flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-[background-color,border-color,transform] duration-200 ease-out hover:border-electric-400/60 hover:bg-electric-500/10"
          >
            <Phone className="size-4 text-electric-400" />
            {site.phone}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={open}
          className="pressable grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          /* Absolutely positioned so opening the menu animates transform and
             opacity only — animating `height` would force layout every frame.
             It scales from the top because that's where the trigger lives. */
          <motion.div
            initial={{ opacity: 0, transform: translateY(-8) }}
            animate={{ opacity: 1, transform: translateY(0) }}
            exit={{
              opacity: 0,
              transform: translateY(-8),
              transition: { duration: 0.15, ease: EASE_OUT },
            }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            style={{ transformOrigin: 'top center' }}
            className="absolute inset-x-0 top-full origin-top border-b border-white/10 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-white/75 transition-colors duration-200 ease-out hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.phoneHref}
                className="pressable mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric-500 to-violetglow-500 px-5 py-3 font-medium text-white"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
