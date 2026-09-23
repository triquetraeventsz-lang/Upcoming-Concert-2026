import { motion } from 'framer-motion'
import { eventConfig } from '../config/event'

const ease = [0.22, 1, 0.36, 1]

export default function HypeStatement() {
  const hasSocials = Object.keys(eventConfig.socialLinks ?? {}).length > 0

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(60% 60% at 50% 0%, rgba(249,188,33,0.1) 0%, transparent 70%)',
        }}
      />
      <div className="container-page relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="text-xs font-semibold tracking-[0.35em] text-gold uppercase"
        >
          The Stage Is Set
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-display text-5xl text-bone sm:text-7xl"
        >
          Are You Ready?
        </motion.h2>

        {hasSocials ? (
          <div className="mt-2 flex items-center gap-5">
            {Object.entries(eventConfig.socialLinks).map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold tracking-[0.2em] text-mist uppercase transition-colors hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-sm font-semibold tracking-[0.2em] text-mist uppercase"
          >
            Follow the reveal.
          </motion.p>
        )}
      </div>
    </section>
  )
}
