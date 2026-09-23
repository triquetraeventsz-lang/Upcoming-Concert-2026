import Navbar from './components/Navbar'
import CinematicHero from './components/CinematicHero'
import RevealSection from './components/RevealSection'
import Countdown from './components/Countdown'
import HypeStatement from './components/HypeStatement'
import SignupForm from './components/SignupForm'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { eventConfig } from './config/event'

function App() {
  return (
    <div className="relative">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <CinematicHero />
        <RevealSection />
        <Countdown revealDate={eventConfig.revealDate} />
        <HypeStatement />
        <SignupForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
