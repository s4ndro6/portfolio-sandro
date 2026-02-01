
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Users, X, ShieldCheck } from 'lucide-react'; // Using Flame as FireExtinguisher proxy if needed, or stick to generic
import { experiences } from '../data/experiences';

const Experiences = () => {
    const [selectedExp, setSelectedExp] = useState(null);

    const getIcon = (iconName) => {
        if (iconName === 'FireExtinguisher') return <Flame size={32} />;
        if (iconName === 'Users') return <Users size={32} />;
        return <ShieldCheck size={32} />;
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Parcours & <span className="text-[#E91E63]">Leçons</span></h2>
                    <p className="max-w-xl text-gray-400">
                        Ce qui ne s'apprend pas dans les livres. Les expériences terrains qui ont forgé ma discipline et mon relationnel.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            layoutId={`exp-${exp.id}`}
                            onClick={() => setSelectedExp(exp)}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#E91E63]/50 cursor-pointer cursor-view transition-all hover:bg-white/10 relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-3 bg-white/10 rounded-xl text-[#E91E63]">
                                    {getIcon(exp.icon)}
                                </div>
                                <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">{exp.period}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                            <p className="text-gray-400 text-sm mb-4">{exp.shortDesc}</p>

                            <div className="flex items-center gap-2 text-[#E91E63] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                Voir les leçons apprises
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedExp && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedExp(null)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-lg"
                            />
                            <motion.div
                                layoutId={`exp-${selectedExp.id}`}
                                className="bg-[#0F0F0F] border border-white/10 w-full max-w-2xl p-8 md:p-12 rounded-3xl relative z-10"
                            >
                                <button onClick={() => setSelectedExp(null)} className="absolute top-6 right-6 text-white hover:text-[#E91E63]"><X /></button>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-[#E91E63]/10 text-[#E91E63] rounded-2xl">
                                        {getIcon(selectedExp.icon)}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white">{selectedExp.role}</h3>
                                        <span className="text-gray-500 font-mono">{selectedExp.period}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Ce que j'en retiens pour le business</h4>
                                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                                        "{selectedExp.details}"
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

export default Experiences;
