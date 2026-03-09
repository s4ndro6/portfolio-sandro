/* ============================================================
   AAZ Portfolio V4 — Home Page
   BootLoader → Hero → AboutHome → ProjectsGrid preview → ToolsMarquee
   ============================================================ */

import { useState } from 'react'
import BootLoader from '../components/layout/BootLoader'
import HeroShader from '../components/three/HeroShader'
import Hero from '../components/sections/Hero'
import AboutHome from '../components/sections/AboutHome'
import ProjectsGrid from '../components/sections/ProjectsGrid'
import ToolsMarquee from '../components/sections/ToolsMarquee'
import PageTransition from '../components/layout/PageTransition'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {!isLoaded && <BootLoader onComplete={() => setIsLoaded(true)} />}
      <PageTransition>
        <section style={{ position: 'relative', overflow: 'hidden' }}>
          <HeroShader />
          <Hero isLoaded={isLoaded} />
        </section>
        <AboutHome />
        <div style={{ paddingBottom: '4rem' }}>
          <div className="mono" style={{ paddingInline: '2rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
            // PROJETS RÉCENTS
          </div>
          <ProjectsGrid preview limit={3} />
        </div>
        <ToolsMarquee />
        <div style={{ height: 28 }} />
      </PageTransition>
    </>
  )
}
