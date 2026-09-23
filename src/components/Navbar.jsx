import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-line bg-void/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="Triquetra Events">
          <img src="/images/triquetra-logo.png" alt="Triquetra Events" className="h-9 w-9" />
          <span className="hidden text-xs font-semibold tracking-[0.3em] text-bone/80 uppercase sm:inline">
            Triquetra Events
          </span>
        </a>

        <a
          href="#signup"
          className="group inline-flex items-center gap-2 rounded-full border border-gold/70 px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-void"
        >
          Get on the List
        </a>
      </div>
    </header>
  )
}
