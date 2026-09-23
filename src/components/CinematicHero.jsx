import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const headlineWords = ['SOMETHING', 'BIG', 'IS COMING.']

const ease = [0.22, 1, 0.36, 1]

export default function CinematicHero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden bg-void"
    >
      {/* Atmosphere: light beams, spotlight glow, crowd silhouette — no photography, built entirely from gradients */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, ease }}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 55% at 50% 30%, rgba(249,188,33,0.16) 0%, rgba(249,188,33,0) 65%), radial-gradient(120% 80% at 50% 100%, rgba(20,17,10,0.9) 0%, #050505 60%)',
          }}
        />

        {/* Light beams */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2.2, delay: 0.3, ease }}
          className="absolute inset-0"
          style={{
            background:
              'conic-gradient(from 200deg at 30% -10%, transparent 0deg, rgba(249,188,33,0.08) 8deg, transparent 20deg), conic-gradient(from 160deg at 75% -10%, transparent 0deg, rgba(245,242,234,0.06) 6deg, transparent 18deg)',
          }}
        />

        {/* Slow diagonal light sweep */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 opacity-0"
          initial={{ x: '-60%', opacity: 0 }}
          animate={{ x: ['-60%', '140%'], opacity: [0, 0.18, 0] }}
          transition={{ duration: 6, delay: 2.4, repeat: Infinity, repeatDelay: 7, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(75deg, transparent 40%, rgba(245,242,234,0.5) 50%, transparent 60%)',
            width: '60%',
          }}
        />

        {/* Crowd silhouette */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[28%] w-full text-black"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            fillOpacity="0.9"
            d="M0,220 L0,140 Q40,120 70,150 L100,110 Q130,90 150,130 L180,100 Q210,70 235,120 L260,95 Q290,60 320,115 L350,90 Q380,65 410,120 L440,100 Q470,75 500,125 L530,105 Q560,80 590,130 L620,100 Q650,70 680,120 L710,95 Q740,65 770,118 L800,100 Q830,80 860,130 L890,105 Q920,75 950,120 L980,95 Q1010,65 1040,115 L1070,90 Q1100,60 1130,110 L1160,95 Q1190,75 1220,120 L1250,100 Q1280,80 1310,130 L1340,110 Q1370,95 1400,130 L1440,140 L1440,220 Z"
          />
        </svg>

        <div className="absolute inset-0 shadow-[inset_0_0_220px_120px_rgba(0,0,0,0.85)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative z-10 flex flex-col items-center gap-5 text-center sm:gap-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease }}
          className="text-xs font-semibold tracking-[0.45em] text-gold uppercase"
        >
          Triquetra Events Presents
        </motion.span>

        <h1 className="font-display flex flex-col text-6xl leading-[0.88] font-normal tracking-tight text-bone sm:text-7xl md:text-8xl lg:text-9xl">
          {headlineWords.map((word, i) => (
            <span key={word} className="overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 2.0 + i * 0.18, ease }}
                className={`block ${word === 'BIG' ? 'text-gold' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.9, ease }}
          className="max-w-md text-sm text-mist sm:text-base"
        >
          One stage. One night. An experience you won&rsquo;t want to miss.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.3, ease }}
          className="mt-2 flex items-center justify-center"
        >
          <MagneticButton href="#signup" variant="solid">
            Get on the List
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-mist"
      >
        <span className="text-[0.6rem] font-semibold tracking-[0.35em] uppercase">Scroll</span>
        <div className="relative h-9 w-px overflow-hidden bg-bone/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 w-px bg-gold"
            animate={{ y: [0, 24], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.15, 0.85, 1] }}
          />
        </div>
      </motion.div>
    </section>
  )
}

function MagneticButton({ href, children, variant }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  const base =
    'inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300'
  const style =
    variant === 'solid'
      ? 'bg-gold text-void hover:bg-bone'
      : 'border border-bone/30 text-bone hover:border-gold hover:text-gold'

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${style}`}
      style={{ transition: 'transform 0.2s ease, background-color 0.3s ease, color 0.3s ease' }}
    >
      {children}
    </a>
  )
}
