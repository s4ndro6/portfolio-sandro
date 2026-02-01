import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '../data/tools';
import { X } from 'lucide-react';

const InfiniteMarquee = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    return (
        <div className="relative py-12 border-y border-white/5 bg-white/5 backdrop-blur-md overflow-hidden z-20">

            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

            <div
                className="flex w-full overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex gap-24 whitespace-nowrap px-4 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, ease: "linear", repeat: Infinity, playState: isHovered ? "paused" : "running" }}
                    style={{ animationPlayState: isHovered ? "paused" : "running" }}
                >
                    {[...tools, ...tools, ...tools].map((tool, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col items-center justify-center gap-4 cursor-pointer cursor-view"
                            onClick={() => setSelectedTool(tool)}
                        >

                            <div className="w-12 h-12 md:w-16 md:h-16 relative flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                                <div
                                    className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                                    style={{ backgroundColor: tool.color }}
                                />

                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full fill-current text-gray-500 group-hover:text-white transition-colors duration-300 z-10"
                                    style={{
                                        filter: isHovered ? `drop-shadow(0 0 5px ${tool.color})` : "none"
                                    }}
                                >
                                    <path d={tool.path} />
                                </svg>
                            </div>

                            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6">
                                {tool.name}
                            </span>

                        </div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedTool && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTool(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={selectedTool.name}
                            className="bg-[#1A1A1A] border border-white/10 p-6 rounded-2xl relative z-10 max-w-sm text-center shadow-2xl"
                        >
                            <button onClick={() => setSelectedTool(null)} className="absolute top-2 right-2 text-gray-400 hover:text-white"><X size={16} /></button>
                            <h4 className="text-xl font-bold text-white mb-2" style={{ color: selectedTool.color }}>{selectedTool.name}</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{selectedTool.desc}</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default InfiniteMarquee;
