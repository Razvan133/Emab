import { ArrowUpRight, MapPin, Navigation, Phone } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { STAGGER } from '@/lib/motion'
import { site } from '@/lib/site'

export function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Contact & Locație"
          title="Ne găsești în centrul Bacăului"
          description="Sună-ne pentru rezervări sau treci direct pe la noi — pistele te așteaptă."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Details */}
          <Reveal className="flex flex-col gap-5">
            <a
              href={site.phoneHref}
              className="pressable glass-panel group relative block overflow-hidden rounded-2xl p-7 transition-[border-color,transform] duration-200 ease-out hover:border-electric-400/40"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-electric-500/25 opacity-0 blur-3xl transition-opacity duration-300 ease-out group-hover:opacity-100" />
              <div className="relative z-10 flex items-start gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-electric-500/12 text-electric-400 ring-1 ring-electric-400/25">
                  <Phone className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    Telefon & Rezervări
                  </p>
                  <p className="mt-2 whitespace-nowrap font-display text-xl font-semibold text-white transition-colors group-hover:text-electric-400 sm:text-2xl">
                    {site.phone}
                  </p>
                  <p className="mt-1.5 text-sm text-white/50">
                    Apasă pentru a suna direct
                  </p>
                </div>
                <ArrowUpRight className="ml-auto size-5 shrink-0 text-white/30 transition-[color,translate] duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </div>
            </a>

            <div className="glass-panel relative overflow-hidden rounded-2xl p-7">
              <div className="relative z-10 flex items-start gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-violetglow-500/12 text-violetglow-400 ring-1 ring-violetglow-400/25">
                  <MapPin className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    Adresă
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold leading-snug text-white">
                    Str. Republicii 194bis
                  </p>
                  <p className="mt-1 text-sm text-white/55">600303 Bacău, România</p>
                </div>
              </div>
            </div>

            <a
              href={site.phoneHref}
              className="pressable inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-electric-500 to-violetglow-500 px-8 py-4.5 font-semibold text-white shadow-[0_18px_45px_-14px] shadow-electric-500/70"
            >
              <Navigation className="size-4.5" />
              Rezervă acum
            </a>
          </Reveal>

          {/* Map */}
          <Reveal
            delay={STAGGER}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5"
          >
            <iframe
              src={site.mapEmbedSrc}
              title="Harta locației Emab Bowling Bacău"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full min-h-[400px] rounded-xl border-0"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
