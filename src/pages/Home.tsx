import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from '../components/layout/Loader'
import Hero from '../components/sections/Hero'
import TextMarquee from '../components/sections/TextMarquee'
import AboutSnippet from '../components/sections/AboutSnippet'
import ProjectsStrip from '../components/sections/ProjectsStrip'
import ToolsMarquee from '../components/sections/ToolsMarquee'
import ContactTeaser from '../components/sections/ContactTeaser'
import Footer from '../components/layout/Footer'
import PageTransition from '../components/layout/PageTransition'

export default function Home() {
  // loaderVisible : garde le loader dans le DOM jusqu'à ce que les panels soient sortis
  // animReady     : déclenche les animations Hero au même instant où le loader est retiré
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [animReady, setAnimReady] = useState(false)

  // Bloquer le scroll pendant le loader
  useEffect(() => {
    const lenis = (window as typeof window & { lenis: { stop: () => void; start: () => void } }).lenis
    lenis?.stop()
  }, [])

  const handleLoaderComplete = () => {
    window.scrollTo(0, 0)
    // 200ms : laisser le temps aux panels de finir leur sortie avant de retirer le DOM
    setTimeout(() => {
      const lenis = (window as typeof window & { lenis: { start: () => void } }).lenis
      lenis?.start()
      // Les deux états batchés ensemble → un seul re-render
      // → loader retiré ET Hero animations démarrent au même frame → zéro flash
      setLoaderVisible(false)
      setAnimReady(true)
      setTimeout(() => ScrollTrigger.refresh(), 300)
    }, 200)
  }

  return (
    <>
      {loaderVisible && <Loader onComplete={handleLoaderComplete} />}
      <PageTransition>
        <Hero isLoaded={animReady} />
        <TextMarquee />
        <AboutSnippet />
        <TextMarquee />
        <ProjectsStrip isLoaded={animReady} />
        <ToolsMarquee />
        <TextMarquee />
        <ContactTeaser />
        <Footer />
      </PageTransition>
    </>
  )
}
