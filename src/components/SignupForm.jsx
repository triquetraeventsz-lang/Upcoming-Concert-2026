import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { eventConfig } from '../config/event'

const ease = [0.22, 1, 0.36, 1]
const initialForm = { name: '', email: '', phone: '' }
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

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
  'w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-sm text-bone placeholder:text-mist/60 focus:border-gold focus:outline-none disabled:opacity-60'

export default function SignupForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  if (!eventConfig.signupEnabled) return null

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    if (!ACCESS_KEY) {
      console.error(
        'Missing VITE_WEB3FORMS_ACCESS_KEY — add your Web3Forms access key to .env before this form can submit.',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'New Concert 2026 — Join the List Submission',
          from_name: 'Triquetra Events — Concert Teaser',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          to: eventConfig.waitlistEmail,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
      } else {
        console.error('Web3Forms submission failed:', data)
        setStatus('error')
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err)
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'

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
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease }}
                className="relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-gold/40 bg-charcoal px-6 py-12"
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.25] }}
                  transition={{ duration: 1.6, ease }}
                  style={{
                    background: 'radial-gradient(45% 55% at 50% 0%, rgba(249,188,33,0.35) 0%, transparent 70%)',
                  }}
                />

                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold text-void"
                >
                  <Check className="h-6 w-6" />
                </motion.span>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease }}
                  className="font-display relative text-3xl tracking-wide text-bone"
                >
                  You&rsquo;re on the List.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease }}
                  className="relative max-w-xs text-sm text-mist"
                >
                  Thanks for joining us. Stay tuned. Something big is coming.
                </motion.p>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.45, ease }}
                  className="relative mt-2 text-[0.65rem] font-semibold tracking-[0.3em] text-gold uppercase"
                >
                  Triquetra Events
                </motion.span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 text-left"
              >
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={update('name')}
                    disabled={submitting}
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
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={update('email')}
                    disabled={submitting}
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
                    name="phone"
                    type="tel"
                    placeholder="Phone / WhatsApp (optional)"
                    value={form.phone}
                    onChange={update('phone')}
                    disabled={submitting}
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

                {status === 'error' && (
                  <p role="alert" className="text-xs text-red-400">
                    We couldn&rsquo;t add you to the list just yet. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-void uppercase transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-gold"
                >
                  {submitting ? 'Joining…' : 'Join the List'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
