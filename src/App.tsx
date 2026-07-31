import { Navbar } from '@/components/Navbar'
import { Marquee } from '@/components/Marquee'
import { StrikeHero } from '@/components/sections/StrikeHero'
import { Activities } from '@/components/sections/Activities'
import { Team } from '@/components/sections/Team'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-white antialiased">
      <Navbar />

      <main>
        <StrikeHero />
        <Marquee />
        <Activities />
        <Team />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
