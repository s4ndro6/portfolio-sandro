import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["VISION", "DATA", "STRATÉGIE", "SANDRO"];

const Preloader = ({ finishLoading }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Vitesse de lecture
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) return prev;
        return prev + 1;
      });
    }, 800);

    // Vitesse de progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const timeout = setTimeout(() => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
      finishLoading();
    }, 3500);

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [finishLoading]);

  const textVariants = {
    initial: { opacity: 0, y: 20, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(12px)" }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex flex-col items-center justify-center bg-[#050505] cursor-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Container principal */}
      <div className="flex flex-col items-center justify-center relative z-10 w-full">

        {/* ZONE TEXTE */}
        <div className="h-auto flex items-center justify-center overflow-hidden relative w-full p-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-6xl md:text-9xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1ED] to-[#E91E63]"
              style={{ dropShadow: "0 0 15px rgba(79, 209, 237, 0.4)" }}
            >
              {words[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* LA BARRE ROSE (Collée sous le texte) */}
        {/* J'utilise -mt-2 (marge négative) pour remonter la barre et la coller visuellement */}
        <div className="relative w-[300px] md:w-[600px] h-2 flex items-center justify-center -mt-2 md:-mt-4">
            <motion.div
                className="h-1.5 bg-[#E91E63] rounded-full absolute"
                style={{
                    boxShadow: "0 0 20px #E91E63, 0 0 35px rgba(233, 30, 99, 0.8)",
                    left: '50%',
                    x: '-50%', 
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
            />
        </div>

      </div>

      {/* BOUTON PASSER */}
      <button 
        onClick={finishLoading}
        className="absolute top-8 right-8 z-50 group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#E91E63]/50 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:bg-[#E91E63]/10 cursor-pointer"
      >
        <span className="text-xs font-bold text-gray-400 group-hover:text-white tracking-widest uppercase">Passer</span>
        <div className="w-2 h-2 rounded-full bg-[#E91E63] animate-pulse group-hover:shadow-[0_0_10px_#E91E63]"></div>
      </button>

    </motion.div>
  );
};

export default Preloader;