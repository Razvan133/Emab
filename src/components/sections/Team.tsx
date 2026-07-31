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

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {team.map((member, index) => {
            const Icon = member.icon
            return (
              <Reveal
                key={member.role}
                as="article"
                delay={index * STAGGER}
                distance={24}
                className="group relative overflow-hidden rounded-2xl bg-ink-850 p-8 ring-1 ring-white/8 transition-[translate,box-shadow] duration-200 ease-out-strong hover:-translate-y-2 hover:shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)]"
              >
                {/* light sweeping across the card face on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/6 to-transparent transition-transform duration-600 ease-out-strong group-hover:translate-x-full" />

                <div className="relative">
                  <span className={`grid size-14 place-items-center rounded-2xl ring-1 ${member.accent}`}>
                    <Icon className="size-6" />
                  </span>

                  <h3 className="mt-7 font-display text-lg font-bold leading-snug text-white">
                    {member.role}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60">
                    {member.tagline}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
