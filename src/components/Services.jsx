
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, X } from 'lucide-react';
import { services, serviceContext } from '../data/services';

const Services = () => {
    const contextItems = [
        { title: "Marketing", desc: serviceContext.marketing, color: "text-[#E91E63]" },
        { title: "Design", desc: serviceContext.design, color: "text-[#4FD1ED]" },
        { title: "Tech", desc: serviceContext.tech, color: "text-white" }
    ];

    const [selectedService, setSelectedService] = useState(null);

    return (
        <section className="py-24 relative overflow-hidden" id="services">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="mb-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Packages <span className="text-[#E91E63]">Stratégiques</span></h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-24 text-left">
                        {contextItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className="p-6 border-l-2 border-white/10 hover:border-white/30 transition-colors"
                            >
                                <h3 className={`text-xl font-black mb-4 uppercase tracking-wider ${item.color}`}>{item.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {services.map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedService(p)}
                            className={`relative p-8 rounded-3xl border cursor-pointer cursor-view group transition-all duration-300 h-full flex flex-col justify-between ${p.popular ? 'bg-[#0F0F0F] border-[#E91E63] shadow-[0_0_30px_rgba(233,30,99,0.15)]' : 'bg-black/40 border-white/10 hover:border-white/30'}`}
                        >
                            {p.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E91E63] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                                    Best Seller
                                </div>
                            )}

                            <div>
                                <h3 className={`text-2xl font-black mb-2 ${p.textColor}`}>{p.name}</h3>
                                <div className="text-4xl font-bold text-white mb-6">{p.price}</div>
                                <p className="text-gray-400 text-sm mb-8 min-h-[60px]">{p.description}</p>

                                <ul className="space-y-4 mb-8">
                                    {p.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                            <div className={`mt-0.5 p-0.5 rounded-full ${p.popular ? 'bg-[#E91E63]' : 'bg-white/20'}`}>
                                                <Check size={10} className="text-white" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 group-hover:gap-4 transition-all ${p.btnColor}`}>
                                <span>En savoir plus</span>
                                <ArrowRight size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 max-w-2xl mx-auto backdrop-blur-md">
                    <p className="text-gray-300 font-light">
                        <span className="text-[#E91E63] font-bold">Note :</span> Je ne vends pas des tâches, je vends des solutions. Chaque package est ajusté sur-mesure après notre premier call.
                    </p>
                </div>

                <AnimatePresence>
                    {selectedService && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedService(null)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-lg"
                            />
                            <motion.div
                                layoutId={selectedService.name}
                                className="bg-[#0F0F0F] border border-white/10 w-full max-w-lg p-8 rounded-3xl relative z-10"
                            >
                                <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 text-white hover:text-[#E91E63] transition-colors"><X /></button>

                                <h3 className={`text-2xl font-black mb-2 ${selectedService.textColor}`}>
                                    {selectedService.name}
                                </h3>
                                <div className="text-3xl font-bold text-white mb-8">{selectedService.price}</div>

                                <div className="mb-6">
                                    <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-widest opacity-50">Méthodologie</h4>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        "{selectedService.methodology}"
                                    </p>
                                </div>

                                <button onClick={() => window.location.href = '#contact'} className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest ${selectedService.btnColor} mt-4`}>
                                    Réserver ce pack
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default Services;
