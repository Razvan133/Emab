import { Reveal } from '@/components/Reveal'
import { STAGGER } from '@/lib/motion'

interface SectionHeadingProps {
  title: string
  lead?: string
  align?: 'left' | 'center'
}

/** Section openers: the heading carries its own weight — no eyebrow labels. */
export function SectionHeading({ title, lead, align = 'left' }: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <Reveal distance={14}>
        <h2 className="font-display text-[clamp(1.7rem,3.6vw,3.2rem)] font-bold leading-[1.12] tracking-[-0.02em] text-balance text-white">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={STAGGER}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
