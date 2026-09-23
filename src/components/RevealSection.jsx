import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function RevealSection() {
  return (
    <section id="reveal" className="relative overflow-hidden bg-void py-32 sm:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(50% 40% at 50% 50%, rgba(249,188,33,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="container-page relative z-10 flex flex-col items-center gap-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-4xl leading-[1.05] text-balance text-bone sm:text-6xl md:text-7xl"
        >
          You don&rsquo;t know who&rsquo;s coming.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="font-display text-4xl leading-[1.05] text-balance text-gold sm:text-6xl md:text-7xl"
        >
          You just know it&rsquo;s going to be big.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.36, ease }}
          className="max-w-md text-sm text-mist sm:text-base"
        >
          Some things don&rsquo;t need a name to be felt. This is one of them.
        </motion.p>
      </div>
    </section>
  )
}
