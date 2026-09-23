import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-void py-32 sm:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(45% 55% at 50% 100%, rgba(249,188,33,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="container-page relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-balance text-5xl leading-[0.95] text-bone sm:text-7xl md:text-8xl"
        >
          Something Big
          <span className="block text-gold">Is Coming.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-4 flex items-center gap-3"
        >
          <img src="/images/triquetra-logo.png" alt="Triquetra Events" className="h-7 w-7" />
          <span className="text-xs font-semibold tracking-[0.35em] text-mist uppercase">
            Triquetra Events
          </span>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          href="#signup"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-void uppercase transition-colors duration-300 hover:bg-bone"
        >
          Get on the List
        </motion.a>
      </div>
    </section>
  )
}
