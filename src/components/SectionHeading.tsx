import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex max-w-2xl flex-col ${alignment}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-electric-400/90 backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-electric-400" />
        {eyebrow}
      </span>

      <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}
