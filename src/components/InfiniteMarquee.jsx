import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';

/*
  STABLE UI: ICONIFY & SLOW MOTION
  - Uses @iconify/react for 100% stable SVG rendering
  - Identifiers: simple-icons:adobephotoshop, etc.
  - Size: 45px
  - Color: White
*/

const tools = [
    { name: 'Figma', icon: "simple-icons:figma", color: "#F24E1E", desc: "Prototypage UI/UX haute fidélité." },
    { name: 'Photoshop', icon: "simple-icons:adobephotoshop", color: "#31A8FF", desc: "Retouche photo avancée." },
    { name: 'Illustrator', icon: "simple-icons:adobeillustrator", color: "#FF9A00", desc: "Création vectorielle." },
    { name: 'VS Code', icon: "simple-icons:visualstudiocode", color: "#007ACC", desc: "Développement." },
    { name: 'Gemini', icon: "simple-icons:googlegemini", color: "#412991", desc: "IA et Code." },
    { name: 'Instagram', icon: "simple-icons:instagram", color: "#E4405F", desc: "Stratégies de contenu." },
    { name: 'TikTok', icon: "simple-icons:tiktok", color: "#FFFFFF", desc: "Viralité et rétention." }
];

const InfiniteMarquee = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="relative border-y border-white/5 bg-white/5 backdrop-blur-md overflow-hidden z-20 flex items-center justify-center h-[120px] w-full">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

            <div
                className="flex w-full overflow-hidden items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex items-center min-w-full"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 35, ease: "linear", repeat: Infinity }}
                    style={{
                        animationPlayState: isHovered ? "paused" : "running",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '50px'
                    }}
                >
                    {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 cursor-pointer group flex items-center justify-center relative"
                            onClick={() => setSelectedTool(tool)}
                        >
                            <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                <Icon
                                    icon={tool.icon}
                                    width="45"
                                    height="45"
                                    color="white"
                                />
                            </div>

                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {isClient && createPortal(
                <AnimatePresence>
                    {selectedTool && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
                            <motion.div
                                layoutId={`tool-${selectedTool.name}-modal`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl relative max-w-sm w-full text-center shadow-2xl flex flex-col items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full p-1"><X size={16} /></button>

                                <div className="w-24 h-24 mb-6 flex items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <Icon
                                        icon={selectedTool.icon}
                                        width="100%"
                                        height="100%"
                                        color={selectedTool.color}
                                    />
                                </div>

                                <h4 className="text-2xl font-black text-white mb-2" style={{ color: selectedTool.color }}>{selectedTool.name}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">{selectedTool.desc}</p>
                            </motion.div>

                            <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedTool(null)} />
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default InfiniteMarquee;
