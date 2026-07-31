import { Reveal } from '@/components/Reveal'
import { STAGGER } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      <Reveal distance={12}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-electric-400/90 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-electric-400" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={STAGGER}>
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={STAGGER * 2}>
          <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
