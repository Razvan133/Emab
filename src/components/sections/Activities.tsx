import type { ComponentType } from 'react'
import { CircleDot, Gamepad2, Target, UtensilsCrossed } from 'lucide-react'
import { GlowCard } from '@/components/ui/spotlight-card'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { STAGGER } from '@/lib/motion'

type GlowColor = 'blue' | 'purple' | 'green' | 'red' | 'orange'

interface Activity {
  title: string
  description: string
  glowColor: GlowColor
  icon: ComponentType<{ className?: string }>
  /** Tailwind classes for the icon chip, matched to the card's glow hue. */
  accent: string
  tag: string
}

const activities: Activity[] = [
  {
    title: 'Bowling',
    description:
      'Piste moderne, sistem profesional de scor și atmosferă vibrantă.',
    glowColor: 'blue',
    icon: CircleDot,
    accent: 'from-blue-500/25 to-blue-500/5 text-blue-300 ring-blue-400/30',
    tag: 'Piste profesionale',
  },
  {
    title: 'Darts',
    description:
      'Zone dedicate pentru ținte profesionale și competiție între prieteni.',
    glowColor: 'red',
    icon: Target,
    accent: 'from-red-500/25 to-red-500/5 text-red-300 ring-red-400/30',
    tag: 'Ținte oficiale',
  },
  {
    title: 'Fotbal de Masă (Foosball)',
    description: 'Mese profesionale de foosball pentru meciuri intense.',
    glowColor: 'green',
    icon: Gamepad2,
    accent: 'from-emerald-500/25 to-emerald-500/5 text-emerald-300 ring-emerald-400/30',
    tag: 'Meciuri 1v1 & 2v2',
  },
  {
    title: 'Restaurant & Bar',
    description:
      'Meniu variat de preparate, cocktailuri speciale și băuturi răcoritoare.',
    glowColor: 'purple',
    icon: UtensilsCrossed,
    accent: 'from-violet-500/25 to-violet-500/5 text-violet-300 ring-violet-400/30',
    tag: 'Bucătărie & cocktailuri',
  },
]

export function Activities() {
  return (
    <section id="activitati" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="După strike, seara abia începe"
          lead="Patru feluri de a rămâne: piste profesionale, ținte de darts, mese de foosball și un bar care știe ce face."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <Reveal key={activity.title} delay={index * STAGGER} distance={24}>
                <GlowCard
                  customSize
                  glowColor={activity.glowColor}
                  className="h-full min-h-[18rem] w-full !p-7"
                >
                  <div className="relative z-10 flex flex-col">
                    <span
                      className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ring-1 ${activity.accent}`}
                    >
                      <Icon className="size-6" />
                    </span>

                    <h3 className="mt-6 font-display text-xl font-bold leading-snug text-white">
                      {activity.title}
                    </h3>
                    <p className="mt-3 text-[0.975rem] leading-relaxed text-white/70">
                      {activity.description}
                    </p>
                  </div>

                  <div className="relative z-10 border-t border-white/10 pt-4">
                    <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                      {activity.tag}
                    </span>
                  </div>
                </GlowCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
