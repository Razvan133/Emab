import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Activities } from '@/components/sections/Activities'
import { Team } from '@/components/sections/Team'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-white antialiased">
      {/* Ambient wash sitting behind every section */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(37,99,235,0.16),transparent_60%),radial-gradient(ellipse_60%_50%_at_85%_60%,rgba(139,92,246,0.10),transparent_65%)]" />

      <Navbar />

      <main>
        <Hero />
        <Activities />
        <Team />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
