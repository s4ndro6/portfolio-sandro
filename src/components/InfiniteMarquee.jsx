import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '../data/tools';
import { X } from 'lucide-react';

const InfiniteMarquee = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    return (
        <div className="relative py-8 bg-white/5 border-y border-white/5 backdrop-blur-md z-20 overflow-hidden flex items-center justify-center h-[140px]">
            {/* Dégradés latéraux pour l'immersion */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

            <div
                className="flex w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex flex-nowrap items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    style={{ animationPlayState: isHovered ? "paused" : "running" }}
                >
                    {/* Triple boucle pour fluidité infinie */}
                    {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 mx-10 cursor-pointer group relative flex flex-col items-center justify-center"
                            onClick={() => setSelectedTool(tool)}
                        >
                            {/* LOGO SVG */}
                            <div className="h-10 w-auto flex items-center justify-center transition-all duration-300 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                <svg
                                    viewBox={tool.viewBox}
                                    className="h-full w-auto block pointer-events-none"
                                    style={{ maxHeight: '40px', minWidth: '40px' }} // Contraintes strictes
                                >
                                    {tool.path}
                                </svg>
                            </div>

                            {/* TOOLTIP NOM */}
                            <span className="absolute -bottom-8 px-2 py-1 rounded bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                {tool.name}
                            </span>
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
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
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
