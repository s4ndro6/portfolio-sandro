
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { hardSkills, softSkills } from '../data/skills';

const Skills = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <section className="py-24 relative overflow-hidden" id="skills">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Mes <span className="text-[#4FD1ED]">Armes</span></h2>
                    <p className="max-w-xl text-gray-400">
                        Une combinaison rare de technique et de créativité. Je ne me contente pas de coder, je construis des écosystèmes complets.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-24">
                    {hardSkills.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedSkill({ ...cat, type: 'hard' })}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#4FD1ED]/50 transition-all group hover:bg-white/10 cursor-pointer cursor-view"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 group-hover:text-[#4FD1ED] transition-colors flex items-center gap-2">
                                {cat.category} <span className="text-[10px] bg-[#4FD1ED]/20 text-[#4FD1ED] px-2 py-0.5 rounded ml-auto opacity-0 group-hover:opacity-100 transition-opacity">VOIR</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((s, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-300 border border-white/5">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {softSkills.map((soft, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedSkill({ ...soft, type: 'soft', category: soft.title })}
                            className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/10 text-center hover:shadow-[0_0_20px_rgba(233,30,99,0.2)] hover:border-[#E91E63]/50 transition-all cursor-pointer cursor-view group"
                        >
                            <h4 className="text-[#E91E63] font-black text-lg mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform">{soft.title}</h4>
                            <p className="text-gray-400 text-sm">{soft.desc}</p>
                            <div className="mt-4 text-[#E91E63] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">En savoir plus</div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedSkill && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedSkill(null)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            />
                            <motion.div
                                layoutId={selectedSkill.category || selectedSkill.title}
                                className="bg-[#0F0F0F] border border-white/10 w-full max-w-lg p-8 rounded-3xl relative z-10"
                            >
                                <button onClick={() => setSelectedSkill(null)} className="absolute top-4 right-4 text-white hover:text-[#4FD1ED] transition-colors"><X /></button>

                                <h3 className={`text-2xl font-black mb-4 ${selectedSkill.type === 'hard' ? 'text-[#4FD1ED]' : 'text-[#E91E63]'}`}>
                                    {selectedSkill.category || selectedSkill.title}
                                </h3>

                                <div className="mb-6">
                                    <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-widest opacity-50">L'Approche</h4>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        "{selectedSkill.details}"
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default Skills;
