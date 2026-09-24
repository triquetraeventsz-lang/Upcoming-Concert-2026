import { Mail, Phone } from 'lucide-react'
import { eventConfig } from '../config/event'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-void py-12">
      <div className="container-page flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <img src="/images/triquetra-logo.png" alt="Triquetra Events" className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-[0.25em] text-bone/90 uppercase">
            Triquetra Events
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 text-sm text-bone/70 sm:flex-row sm:gap-8">
          <a
            href={`mailto:${eventConfig.contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-gold"
          >
            <Mail className="h-4 w-4" />
            {eventConfig.contact.email}
          </a>
          {eventConfig.contact.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          ))}
        </div>

        <p className="text-sm text-bone/60">&copy; {year} Triquetra Events. All rights reserved.</p>
      </div>
    </footer>
  )
}
