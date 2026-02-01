import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

import InkBackground from './components/InkBackground';
import AboutProjects from './components/AboutProjects';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import IntroHero from './components/IntroHero';
import Chatbot from './components/Chatbot';
import Services from './components/Services';
import Skills from './components/Skills';
import InfiniteMarquee from './components/InfiniteMarquee';
import Experiences from './components/Experiences';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMainSite, setShowMainSite] = useState(false);

  useEffect(() => {
    if (isLoading || !showMainSite) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading, showMainSite]);

  const handleContinue = () => { setShowMainSite(true); };
  const handleBackToBio = (e) => { e.preventDefault(); setShowMainSite(false); };

  const sliderImages = ["/images/magazine.png", "/images/pulse digital.png", "/images/avant-apres.png", "/images/491shots_so.png"];

  return (
    <>
      <div className="bg-noise" />
      <div className="hidden md:block"><CustomCursor /></div>
      <InkBackground />

      {!isLoading && <Chatbot />}

      <AnimatePresence mode='wait'>
        {isLoading && <Preloader key="preloader" finishLoading={setIsLoading} />}

        {!isLoading && !showMainSite && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="relative z-50"
          >
            <IntroHero onContinue={handleContinue} />
          </motion.div>
        )}

        {!isLoading && showMainSite && (
          <motion.div
            key="mainsite"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="relative min-h-screen font-sans text-white selection:bg-[#4FD1ED] selection:text-white"
          >
            <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10 transition-all">
              <button onClick={handleBackToBio} className="font-black text-xl text-white hover:opacity-80 transition-opacity">
                Sandro<span className="text-[#E91E63]">.</span>
              </button>
              <div className="flex items-center gap-4">
                <button onClick={handleBackToBio} className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                  <User size={16} /> Bio
                </button>
                <a href="/cv.pdf" target="_blank" className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors mr-4">
                  CV
                </a>
                <a href="#contact" className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold uppercase hover:scale-105 transition-transform">
                  Contact
                </a>
              </div>
            </nav>

            <div className="pt-24 border-b border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden mb-0">
              <Skills />
              <InfiniteMarquee />
              <Experiences />
            </div>

            <AboutProjects />

            <Services />

            <Contact />
            <footer className="py-12 border-t border-white/10 bg-white/5 backdrop-blur-sm text-center"><p className="text-sm font-bold text-gray-400 mb-2">Alessandro Schillaci</p><p className="text-xs text-gray-600">© 2026 • Stratégie & Data Intelligence.</p></footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;