import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // --- PHYSIQUE ULTRA-ÉLASTIQUE ---

  // Le petit point (LEADER) : Reste vif et précis
  const springConfigDot = {
    stiffness: 4000,
    damping: 50,
    mass: 0.0001
  };

  // Le cercle (SUIVEUR) : Mode "Chewing-gum"
  const springConfigRing = {
    stiffness: 150,  // Beaucoup plus "mou" (il traîne loin derrière)
    damping: 14,     // Rebondit beaucoup plus à l'arrêt
    mass: 0.5        // Plus lourd = plus d'inertie
  };

  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);

  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check for standard interactive elements OR our custom cursor-view class
      if (
        ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.cursor-view') // <--- detection des éléments custom
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Point central Vif (Petit) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#E91E63] rounded-full pointer-events-none z-[100001] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />

      {/* Cercle extérieur (Très élastique) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#4FD1ED] rounded-full pointer-events-none z-[100000] mix-blend-difference flex items-center justify-center overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 3 : 1,
          backgroundColor: isHovering ? "#4FD1ED" : "transparent",
          borderColor: isHovering ? "transparent" : "#4FD1ED"
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-[3px] font-black text-black uppercase tracking-widest"
            >
              VOIR
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;