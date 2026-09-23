import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { eventConfig } from '../config/event'

const ease = [0.22, 1, 0.36, 1]
const initialForm = { name: '', email: '', phone: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (form.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }
  return errors
}

const fieldClasses =
  'w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-sm text-bone placeholder:text-mist/60 focus:border-gold focus:outline-none'

export default function SignupForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [joined, setJoined] = useState(false)

  if (!eventConfig.signupEnabled) return null

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const subject = `Waitlist signup: ${form.name}`
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone.trim() && `Phone / WhatsApp: ${form.phone}`,
    ].filter(Boolean)

    window.location.href = `mailto:${eventConfig.waitlistEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`

    setJoined(true)
  }

  return (
    <section id="signup" className="relative bg-void py-28 sm:py-36">
      <div className="container-page flex flex-col items-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="font-display text-balance text-4xl text-bone sm:text-6xl">
            Don&rsquo;t Hear It From Someone Else.
          </h2>
          <p className="max-w-md text-sm text-mist sm:text-base">
            Be among the first to know when the secret is finally revealed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="w-full max-w-md"
        >
          {joined ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold/40 bg-charcoal px-6 py-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-void">
                <Check className="h-6 w-6" />
              </span>
              <p className="font-display text-2xl text-bone">You&rsquo;re on the list.</p>
              <p className="text-sm text-mist">
                Your email app should now be open with your details addressed to{' '}
                {eventConfig.waitlistEmail} — send it from there and we&rsquo;ll reach out the moment the
                wait ends.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={update('name')}
                  className={fieldClasses}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={update('email')}
                  className={fieldClasses}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone / WhatsApp (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone / WhatsApp (optional)"
                  value={form.phone}
                  onChange={update('phone')}
                  className={fieldClasses}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 text-xs text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-void uppercase transition-colors duration-300 hover:bg-bone"
              >
                Join the List
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
