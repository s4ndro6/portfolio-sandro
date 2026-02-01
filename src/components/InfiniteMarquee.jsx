import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '../data/tools';
import { X } from 'lucide-react';

const InfiniteMarquee = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    return (
        <div className="relative border-y border-white/5 bg-white/5 backdrop-blur-md overflow-hidden z-20 flex items-center justify-center" style={{ height: '120px' }}>
            {/* Dégradés latéraux pour l'immersion */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

            <div
                className="flex w-full overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    style={{ animationPlayState: isHovered ? "paused" : "running", display: 'flex', gap: '80px', paddingLeft: '40px' }}
                >
                    {/* Triple boucle pour fluidité infinie */}
                    {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 cursor-pointer group relative flex flex-col items-center justify-center p-2"
                            onClick={() => setSelectedTool(tool)}
                        >
                            {/* LOGO SVG */}
                            <div className="flex items-center justify-center transition-all duration-300 transform group-hover:scale-110"
                                style={{
                                    filter: 'grayscale(100%) opacity(0.6)',
                                    opacity: 0.6,
                                    height: '45px',
                                    transition: '0.3s'
                                }}
                            >
                                <div className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:filter-none" style={{ filter: 'grayscale(0%) opacity(1)' }}>
                                    {/* This overlay handles the hover state separately to ensure clean transition */}
                                </div>

                                <svg
                                    viewBox={tool.viewBox}
                                    className="w-auto block pointer-events-none transition-all duration-300 group-hover:filter-none group-hover:opacity-100"
                                    style={{ height: '45px' }}
                                >
                                    {tool.path}
                                </svg>
                            </div>

                            {/* HOVER OVERRIDE VIA CSS DIRECT */}
                            <style jsx>{`
                                .group:hover svg {
                                    filter: grayscale(0%) !important;
                                    opacity: 1 !important;
                                }
                            `}</style>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* MODALE DÉTAILS */}
            <AnimatePresence>
                {selectedTool && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTool(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-lg"
                        />
                        <motion.div
                            layoutId={`tool-${selectedTool.name}`}
                            className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl relative z-10 max-w-sm text-center shadow-2xl mx-auto my-auto"
                        >
                            <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>

                            <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center">
                                <svg viewBox={selectedTool.viewBox} className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    {selectedTool.path}
                                </svg>
                            </div>

                            <h4 className="text-2xl font-black text-white mb-3" style={{ color: selectedTool.color }}>{selectedTool.name}</h4>
                            <p className="text-gray-300 text-sm leading-relaxed font-light">{selectedTool.desc}</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InfiniteMarquee;
