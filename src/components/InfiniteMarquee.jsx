import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

/*
  FINAL LOGO FIX: HYBRID APPROACH
  - Ps, Ai, VS Code: Inline SVG Components (No 404s)
  - Others: CDN URLs (Official Brands)
  - Size: 45px Fixed Height
  - Color: White
*/

// --- INLINE SVG COMPONENTS (For broken CDN links) ---

const PhotoshopIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="45" width="auto" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Adobe Photoshop</title>
        <path d="M0 .034v23.932h24V.034H0zM17.5 14.354h-1.666v-3.75h1.666c.892 0 1.667.625 1.667 1.875 0 1.25-.775 1.875-1.667 1.875zM12.5 17.5h-3.333V6.25h3.333c2.75 0 5 1.5 5 4.166 0 2.25-1.583 3.75-3.75 4.042v.084c1.166.25 1.916 1.166 2.083 2.5.084.75.167 1.417.417 1.875v.083h-2.5c-.25-.417-.333-1.083-.417-1.75-.166-1.166-.833-1.583-1.833-1.583h-1.667V17.5zM10 13.75H8.333V8.75H10c.892 0 1.667.508 1.667 1.583 0 1.25-.833 1.5-1.667 1.5h-.833v1.917z" />
    </svg>
);

const IllustratorIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="45" width="auto" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Adobe Illustrator</title>
        <path d="M0 .034v23.932h24V.034H0zM8.5 18.334l2.917-8.333h.166l2.917 8.333H12.5l-.667-2.083h-3.5l-.667 2.083H5.917zm4.25-3.333l-1.083-3.25h-.084l-1.083 3.25h2.25zm6.5 3.333h-1.667V9.5h1.667v8.834zm0-10.75h-1.667V6.084h1.667v1.5z" />
    </svg>
);

const VSCodeIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="45" width="auto" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Visual Studio Code</title>
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.291L6.94 12.283l-4.174-3.14a.735.735 0 0 0-.895.071L.17 10.6a.733.733 0 0 0 .165 1.171l5.584 3.09 5.588 3.076 9.577 12.003a1.494 1.494 0 0 0 1.705.29L23.15 21.4a1.496 1.496 0 0 0 .85-1.347v-16.12a1.496 1.496 0 0 0-.85-1.346z" />
    </svg>
);

// --- TOOLS DATA (Mixed: Component or String) ---

const tools = [
    { name: 'Figma', icon: "https://cdn.simpleicons.org/figma/white", type: 'url', color: "#F24E1E", desc: "Prototypage UI/UX haute fidélité." },
    { name: 'Photoshop', icon: <PhotoshopIcon />, type: 'component', color: "#31A8FF", desc: "Retouche photo avancée." },
    { name: 'Illustrator', icon: <IllustratorIcon />, type: 'component', color: "#FF9A00", desc: "Création vectorielle." },
    { name: 'VS Code', icon: <VSCodeIcon />, type: 'component', color: "#007ACC", desc: "Développement." },
    { name: 'Gemini', icon: "https://cdn.simpleicons.org/googlegemini/white", type: 'url', color: "#412991", desc: "IA et Code." },
    { name: 'Instagram', icon: "https://cdn.simpleicons.org/instagram/white", type: 'url', color: "#E4405F", desc: "Stratégies de contenu." },
    { name: 'TikTok', icon: "https://cdn.simpleicons.org/tiktok/white", type: 'url', color: "#FFFFFF", desc: "Viralité et rétention." }
];

const InfiniteMarquee = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

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
                                {tool.type === 'url' ? (
                                    <img
                                        src={tool.icon}
                                        alt={tool.name}
                                        className="block object-contain"
                                        style={{ height: '45px', width: 'auto', filter: 'none' }}
                                    />
                                ) : (
                                    // Render Component (Ps, Ai, VS Code)
                                    tool.icon
                                )}
                            </div>

                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {typeof document !== 'undefined' && createPortal(
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
                                    {tool.type === 'url' ? (
                                        <img
                                            src={selectedTool.icon}
                                            alt={selectedTool.name}
                                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                        />
                                    ) : (
                                        // Clone clone for sizing if needed, or just render. For modal we want it big.
                                        // The inline components have height=45 prop, but here we want them to fill the container.
                                        // We can clone and overwrite height/width.
                                        React.cloneElement(selectedTool.icon, { height: "100%", width: "100%" })
                                    )}
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
