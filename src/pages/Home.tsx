import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from '../components/layout/Loader'
import Hero from '../components/sections/Hero'
import AboutSnippet from '../components/sections/AboutSnippet'
import ProjectsStrip from '../components/sections/ProjectsStrip'
import ToolsMarquee from '../components/sections/ToolsMarquee'
import ContactTeaser from '../components/sections/ContactTeaser'
import Footer from '../components/layout/Footer'
import PageTransition from '../components/layout/PageTransition'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      // Refresh after loader unmounts and layout is stable
      const t = setTimeout(() => ScrollTrigger.refresh(), 150)
      return () => clearTimeout(t)
    }
  }, [isLoaded])

  return (
    <>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      <PageTransition>
        <Hero isLoaded={isLoaded} />
        <AboutSnippet />
        <ProjectsStrip isLoaded={isLoaded} />
        <ToolsMarquee />
        <ContactTeaser />
        <Footer />
      </PageTransition>
    </>
  )
}
