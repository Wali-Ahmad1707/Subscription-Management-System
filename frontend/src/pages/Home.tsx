import Navbar from "../components/layout/Navbar"
import HeroSection from "../components/sections/HeroSection"

function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080d1a] text-white">
      <Navbar />
      <HeroSection />
    </main>
  )
}

export default Home