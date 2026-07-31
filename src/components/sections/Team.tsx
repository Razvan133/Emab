import type { ComponentType } from 'react'
import { CalendarCheck, ClipboardCheck, Martini } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { STAGGER } from '@/lib/motion'

interface Member {
  role: string
  tagline: string
  icon: ComponentType<{ className?: string }>
  accent: string
}

const team: Member[] = [
  {
    role: 'Manager de local',
    tagline: 'Are grijă ca fiecare seară să iasă strike — de la piste la ultimul detaliu.',
    icon: ClipboardCheck,
    accent: 'text-electric-400 ring-electric-400/25 bg-electric-500/10',
  },
  {
    role: 'Șeful barului',
    tagline: 'Cocktailuri, recomandări și povești, servite direct de la tejghea.',
    icon: Martini,
    accent: 'text-violetglow-400 ring-violetglow-400/25 bg-violetglow-500/10',
  },
  {
    role: 'Organizator de evenimente',
    tagline: 'Petreceri private, turnee și seri corporate — fără bătăi de cap pentru tine.',
    icon: CalendarCheck,
    accent: 'text-lane-300 ring-lane-400/25 bg-lane-500/10',
  },
]

export function Team() {
  return (
    <section id="echipa" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="Oamenii care au grijă de seara ta"
          lead="O echipă mică, atentă la detalii — de la starea pistelor până la ultimul cocktail de pe bar."
        />

        {/* one roster panel, rows split by hairlines — the staff bench, not a card grid */}
        <Reveal className="mt-14">
          <div className="divide-y divide-white/8 overflow-hidden rounded-2xl bg-ink-850 ring-1 ring-white/8">
            {team.map((member, index) => {
              const Icon = member.icon
              return (
                <Reveal
                  key={member.role}
                  as="article"
                  delay={index * STAGGER}
                  distance={16}
                  className="group relative grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 px-6 py-7 transition-colors duration-200 ease-out hover:bg-white/[0.035] sm:grid-cols-[auto_minmax(14rem,18rem)_1fr] sm:gap-x-8 sm:px-9"
                >
                  {/* the room's light leans in when you lean on a row */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-electric-500/12 to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />

                  <span
                    className={`row-span-2 grid size-12 place-items-center rounded-xl ring-1 sm:row-span-1 sm:size-14 sm:rounded-2xl ${member.accent}`}
                  >
                    <Icon className="size-5 sm:size-6" />
                  </span>

                  <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">
                    {member.role}
                  </h3>
                  <p className="col-start-2 text-[0.95rem] leading-relaxed text-white/60 sm:col-start-3">
                    {member.tagline}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
