import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, X, Database, TrendingUp, BarChart3, Lightbulb, PenTool, CheckCircle } from 'lucide-react';
import { projects } from '../data/projects';

const AboutProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const expertises = [
    { title: "Analyse Quintilienne", desc: "Audit profond (QQOQCCP) pour une stratégie chirurgicale sans zone d'ombre.", icon: <Database size={20} /> },
    { title: "Architecture Meta Ads", desc: "CBO/ABO, API de conversion et domination du Pixel pour un ROAS optimisé.", icon: <TrendingUp size={20} /> },
    { title: "Data Intelligence", icon: <BarChart3 size={20} />, desc: "Configuration GA4 avancée et dashboards Looker Studio pour un pilotage par la donnée." }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="grid md:grid-cols-3 gap-8 mb-32">
        {expertises.map((exp, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-[#4FD1ED] mb-4">{exp.icon}</div>
            <h3 className="text-white font-black mb-2 uppercase text-sm tracking-widest">{exp.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{exp.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Analyses & Réalisations</h2>
        <p className="text-gray-400 flex items-center gap-2"><MousePointerClick size={16} /> Cliquez pour voir la stratégie détaillée.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, idx) => (
          <motion.div
            key={idx}
            layoutId={`p-${p.id}`}
            onClick={() => setSelectedProject(p)}
            className="group bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/10 cursor-pointer hover:border-[#4FD1ED]/50 hover:shadow-[0_0_30px_rgba(79,209,237,0.15)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-72 overflow-hidden relative">
              <img src={p.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt={p.title} />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm uppercase">Voir le cas</span>
              </div>
            </div>
            <div className="p-8">
              <span className="text-[#E91E63] text-xs font-bold uppercase tracking-wider bg-[#E91E63]/10 px-2 py-1 rounded">{p.role}</span>
              <h3 className="text-2xl font-bold mt-3 text-white">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{p.shortDesc}</p>
              <div className="flex gap-2 mt-4">
                {p.tags.map((tag, t) => (
                  <span key={t} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-500">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/90 backdrop-blur-lg" />
            <motion.div layoutId={`p-${selectedProject.id}`} className="bg-[#0F0F0F] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 flex flex-col md:flex-row shadow-2xl mx-auto my-auto">
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-white hover:text-[#E91E63] transition-colors z-50 bg-black/50 p-2 rounded-full"><X /></button>

              <div className="w-full md:w-1/3 relative">
                <img src={selectedProject.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent md:bg-gradient-to-r" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-4xl font-black text-white mb-2">{selectedProject.title}</h2>
                  <span className="text-[#E91E63] font-bold">{selectedProject.role}</span>
                </div>
              </div>

              <div className="w-full md:w-2/3 p-8 md:p-12">
                <div className="space-y-8">
                  {/* Le Brief */}
                  <div className="relative pl-6 border-l-2 border-[#4FD1ED]">
                    <h4 className="flex items-center gap-2 text-[#4FD1ED] font-bold mb-2 uppercase text-sm tracking-widest">
                      <Lightbulb size={18} /> Le Brief
                    </h4>
                    <p className="text-gray-300 leading-relaxed font-light text-lg">
                      "{selectedProject.brief}"
                    </p>
                  </div>

                  {/* La Réflexion */}
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h4 className="flex items-center gap-2 text-purple-400 font-bold mb-3 uppercase text-sm tracking-widest">
                      <PenTool size={18} /> La Réflexion
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedProject.reflection}
                    </p>
                  </div>

                  {/* La Réalisation */}
                  <div>
                    <h4 className="flex items-center gap-2 text-white font-bold mb-3 uppercase text-sm tracking-widest">
                      <CheckCircle size={18} className="text-green-500" /> La Réalisation
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {selectedProject.realization}
                    </p>

                    <div className="bg-[#4FD1ED]/5 p-5 rounded-xl border border-[#4FD1ED]/10 grid grid-cols-2 gap-4">
                      {selectedProject.results.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 text-white text-sm font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1ED]"></span> {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutProjects;
