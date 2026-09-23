import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function getTimeLeft(revealDate) {
  if (!revealDate) return null
  const diff = revealDate.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

const units = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
]

export default function Countdown({ revealDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(revealDate))

  useEffect(() => {
    if (!revealDate) return undefined
    const id = setInterval(() => setTimeLeft(getTimeLeft(revealDate)), 1000)
    return () => clearInterval(id)
  }, [revealDate])

  return (
    <section className="relative bg-void py-28 sm:py-36">
      <div className="container-page flex flex-col items-center gap-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
          className="text-xs font-semibold tracking-[0.35em] text-gold uppercase"
        >
          The Reveal Begins In
        </motion.span>

        {timeLeft && !timeLeft.done ? (
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {units.map(([key, label], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="flex min-w-[76px] flex-col items-center gap-2 rounded-2xl border border-line bg-ink px-4 py-6 sm:min-w-[110px] sm:px-6 sm:py-8"
              >
                <span className="font-display text-4xl text-gold tabular-nums sm:text-6xl">
                  {String(timeLeft[key]).padStart(2, '0')}
                </span>
                <span className="text-[0.65rem] font-semibold tracking-[0.25em] text-mist uppercase">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        ) : timeLeft?.done ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="font-display text-4xl text-bone sm:text-5xl"
          >
            The wait is over.
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
              Date to Be Announced
            </span>
            <p className="max-w-sm text-sm text-mist">
              The countdown starts the moment we&rsquo;re ready. Join the list to be notified first.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
