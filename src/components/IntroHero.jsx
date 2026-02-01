import React from 'react';
import { motion } from 'framer-motion';
import { Palette, BrainCircuit, Zap, ArrowDownCircle, ShieldCheck } from 'lucide-react';

const IntroHero = ({ onContinue }) => {
  const skills = [
    { name: "Web Design UI/UX", icon: <Palette size={16} />, color: "border-[#4FD1ED] text-[#4FD1ED] bg-[#4FD1ED]/10" },
    { name: "Stratégie Digitale", icon: <BrainCircuit size={16} />, color: "border-purple-500 text-purple-400 bg-purple-500/10" },
    { name: "Automation & IA", icon: <Zap size={16} />, color: "border-yellow-400 text-yellow-400 bg-yellow-400/10" },
    { name: "Fiabilité Absolue", icon: <ShieldCheck size={16} />, color: "border-[#E91E63] text-[#E91E63] bg-[#E91E63]/10" },
  ];

  return (
    <section className="h-screen w-full overflow-y-auto overflow-x-hidden relative z-50 bg-black/30 backdrop-blur-md">
      <div className="min-h-full flex flex-col justify-center items-center px-6 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 w-full justify-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest mb-8">
              Digital Project Manager • Ynov Lille
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-white">
              Une vision créative. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1ED] via-[#E91E63] to-[#4FD1ED] animate-text-gradient">
                Une logique implacable.
              </span>
            </h1>

            <div className="text-lg text-gray-400 leading-relaxed space-y-6 font-medium max-w-xl">
              <p>
                Je m'appelle Alessandro Schillaci. Je ne me contente pas de coder ou de designer. Je conçois des <strong>Sites Vitrines</strong> et des écosystèmes digitaux pensés pour convertir.
              </p>
              <p>
                Mon approche est hybride : j'allie la sensibilité d'un <strong>Designer</strong>, l'analyse d'un <strong>Stratège</strong> et la puissance de l'<strong>IA</strong> pour accélérer votre croissance.
              </p>

              {/* Le bloc citation avec effet verre "lourd" */}
              <div className="bg-white/5 p-6 rounded-xl border-l-4 border-[#E91E63] text-gray-200 text-sm font-bold backdrop-blur-md shadow-lg">
                "Créer avec passion. Analyser avec méthode. Délivrer avec une rigueur opérationnelle à toute épreuve."
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <div key={idx} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border ${skill.color} shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                  {skill.icon}{skill.name}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-[450px] relative order-1 lg:order-2"
          >
            {/* Le Halo coloré animé (Même sur mobile maintenant) */}
            <div className="absolute inset-0 bg-gradient-to-tl from-[#4FD1ED] to-[#E91E63] rounded-[2rem] blur-3xl opacity-30 animate-pulse"></div>

            <img
              src="/images/sandro.jpg"
              alt="Alessandro"
              className="relative w-full h-auto rounded-[2rem] shadow-2xl border border-white/10 z-10 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-20 mb-10 flex flex-col md:flex-row items-center gap-8">
          <button onClick={onContinue} className="group relative flex flex-col items-center gap-3 font-black uppercase tracking-widest text-sm cursor-pointer z-50 pointer-events-auto">
            <span className="text-gray-400 group-hover:text-white transition-colors glow-text">Découvrir mes projets</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="text-black bg-white rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <ArrowDownCircle size={32} />
            </motion.div>
          </button>

          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all font-bold uppercase text-xs tracking-widest flex items-center gap-2 group">
            <span className="group-hover:scale-105 transition-transform">Télécharger mon CV</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroHero;