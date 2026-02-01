import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '../data/tools';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const InfiniteMarquee = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    return (
        <div className="relative border-y border-white/5 bg-white/5 backdrop-blur-md overflow-hidden z-20 flex items-center justify-center h-[120px] w-full">
            {/* Dégradés latéraux */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

            {/* MARQUEE CONTAINER */}
            <div
                className="flex w-full overflow-hidden items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex items-center min-w-full"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    style={{
                        animationPlayState: isHovered ? "paused" : "running",
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {/* Items */}
                    {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 mx-10 cursor-pointer group flex items-center justify-center p-4 relative"
                            onClick={() => setSelectedTool(tool)}
                        >
                            <div className="flex items-center justify-center transition-all duration-300">
                                {/* LOGO IMG - CDN */}
                                <img
                                    src={tool.icon}
                                    alt={tool.name}
                                    className="block transition-all duration-300 filter grayscale opacity-50 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110"
                                    style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                                />
                            </div>

                            {/* Tooltip Survol */}
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* MODALE DÉTAILS - PORTAL vers BODY */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedTool && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                            {/* Overlay flou */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedTool(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-lg"
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />

                            {/* Contenu Modal */}
                            <motion.div
                                layoutId={`tool-${selectedTool.name}-modal`}
                                className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl relative z-[10000] max-w-sm text-center shadow-2xl flex flex-col items-center justify-center"
                            >
                                <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full p-1"><X size={16} /></button>

                                <div className="w-16 h-16 mb-6 flex items-center justify-center p-2 bg-white/5 rounded-2xl border border-white/5">
                                    <img
                                        src={selectedTool.icon}
                                        alt={selectedTool.name}
                                        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    />
                                </div>

                                <h4 className="text-2xl font-black text-white mb-2" style={{ color: selectedTool.color }}>{selectedTool.name}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">{selectedTool.desc}</p>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default InfiniteMarquee;
