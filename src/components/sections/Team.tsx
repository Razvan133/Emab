import type { ComponentType } from 'react'
import { PenTool, Palette, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { STAGGER } from '@/lib/motion'

interface Member {
  role: string
  tagline: string
  icon: ComponentType<{ className?: string }>
  glow: string
  chip: string
}

const team: Member[] = [
  {
    role: 'Copywriter',
    tagline: 'Stăpânul cuvintelor care atrag',
    icon: PenTool,
    glow: 'from-electric-500/30',
    chip: 'text-electric-400 ring-electric-400/25 bg-electric-500/10',
  },
  {
    role: 'Art Director',
    tagline: 'Viziunea din spatele designului nostru',
    icon: Palette,
    glow: 'from-violetglow-500/30',
    chip: 'text-violetglow-400 ring-violetglow-400/25 bg-violetglow-500/10',
  },
  {
    role: 'PPC Specialist',
    tagline: 'Strategul din spatele campaniilor',
    icon: TrendingUp,
    glow: 'from-cyan-400/30',
    chip: 'text-cyan-300 ring-cyan-300/25 bg-cyan-400/10',
  },
]

export function Team() {
  return (
    <section id="echipa" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-80 max-w-4xl rounded-full bg-violetglow-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Echipa noastră"
          title="Oamenii din spatele Emab"
          description="O echipă mică, cu obsesii mari pentru detalii — de la primul cuvânt scris până la ultima campanie livrată."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {team.map((member, index) => {
            const Icon = member.icon
            return (
              /* The lift is a plain CSS transition rather than whileHover: it
                 runs off the main thread and Tailwind already gates `hover:`
                 behind `@media (hover: hover)`, so touch devices don't get a
                 sticky hover state on tap. */
              <Reveal
                key={member.role}
                as="article"
                delay={index * STAGGER}
                distance={24}
                className="glass-panel group relative overflow-hidden rounded-2xl p-8 transition-[border-color,translate] duration-200 ease-out-strong hover:border-white/20 hover:-translate-y-2"
              >
                {/* Hover wash */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br ${member.glow} to-transparent opacity-0 blur-3xl transition-opacity duration-300 ease-out group-hover:opacity-100`}
                />
                {/* Top hairline */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="relative z-10">
                  <span
                    className={`grid size-14 place-items-center rounded-2xl ring-1 ${member.chip}`}
                  >
                    <Icon className="size-6" />
                  </span>

                  <h3 className="mt-7 font-display text-xl font-semibold text-white">
                    {member.role}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/60">
                    {member.tagline}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-white/35">
                    <span className="h-px w-8 bg-white/25" />
                    Emab Team
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
