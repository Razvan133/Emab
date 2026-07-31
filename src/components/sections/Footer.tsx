import { MapPin, Phone } from 'lucide-react'
import { navLinks, site } from '@/lib/site'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07Zm0 3.37a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26Zm0 8.46a3.33 3.33 0 1 0 0-6.66 3.33 3.33 0 0 0 0 6.66Zm6.53-8.66a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    </svg>
  )
}

const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-electric-600/10 blur-[100px]" />

      {/* the venue's name as the room's back wall */}
      <p
        aria-hidden
        className="text-outline pointer-events-none absolute inset-x-0 -bottom-[0.18em] select-none whitespace-nowrap text-center font-display text-[clamp(4rem,14vw,13rem)] font-extrabold leading-none tracking-tight"
      >
        EMAB
      </p>

      <div className="relative mx-auto max-w-7xl px-6 py-14 pb-28 lg:px-10 lg:pb-36">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-electric-500 to-violetglow-500">
                <span className="size-2 rounded-full bg-ink-950/80" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Emab<span className="text-white/45"> Bowling</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-white/45">
              Bowling, darts, foosball & bar în {site.city}.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/55 transition-colors duration-200 ease-out hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pressable grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-white/60 transition-[color,background-color,border-color,transform] duration-200 ease-out hover:border-electric-400/50 hover:bg-electric-500/10 hover:text-white"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-1.5 text-sm text-white/45 md:items-end">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 transition-colors duration-200 ease-out hover:text-white"
              >
                <Phone className="size-3.5" />
                {site.phone}
              </a>
              <span className="inline-flex items-center gap-2 text-center md:text-right">
                <MapPin className="size-3.5 shrink-0" />
                {site.address}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-7 text-xs text-white/35 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} {site.city}. Toate drepturile
            rezervate.
          </p>
          <p>Rezervări zilnic, la telefon.</p>
        </div>
      </div>
    </footer>
  )
}
