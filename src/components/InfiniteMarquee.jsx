import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

/*
  HARD RESET: BASE64 LOGOS & SPEED FIX
  - Base64 Data URIs for Ps, Ai, VS Code (No 404s)
  - Speed: 35s
  - Size: 40px (Restored from "parfaite")
  - No CSS Filters
*/

// Provided Base64 Strings + Generated VS Code
const LOGO_PS = "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+QWRvYmUgUGhvdG9zaG9wPC90aXRsZT48cGF0aCBkPSJNMCAwdjI0aDI0VjBIMHptNi42NSA4LjA3OGMuOTY3IDAgMS42NDcuMjc2IDEuODk0LjY0NmwuMDM5IDEuMTUxaC0uMDM5Yy0uMzU0LS43ODctMS4wODItMS4xMTctMS44NjUtMS4xMTctMS4zNzcgMC0yLjI3OCAxLjA1My0yLjI3OCAyLjY0NyAwIDEuNjkyLjk1OSAyLjY2NyAyLjI3OCAyLjY2Ny44MDcgMCAxLjQyNy0uMjk2IDEuODEzLS44MjhoLjAzOXYuNzU5Yy0uMzI1LjY0MS0xLjI0OC45NzUtMi4xOTcuOTc1LTIuMzc3IDAtMy42NTEtMS41NzctMy42NTEtMy42MTQgMC0yLjE4OCAxLjQxNy0zLjI5NSAzLjk1Mi0zLjI5NXptOS4yNiAzLjM5MWMwIDEuNTM3LS42OCAyLjIwNi0yLjA3OCAyLjIwNi0uNDQzIDAtLjg2Ny0uMTI4LTEuMTkyLS4zMTVsLjEyOC0uOTg1Yy4yMjYuMTA4LjU2MS4yMTcuODk2LjIxNy42NzkgMCAxLjA0NC0uMjk1IDEuMDQ0LS45ODV2LS4xODdjLS40MzMuNTMxLS45OTQuNzM4LTEuNTg1LjczOC0xLjM2OSAwLTIuMTc3LS45ODUtMi4xNzctMi41NzEgMC0xLjgyMiAxLjA0NC0yLjcwOCAyLjI2NS0yLjcwOC42NTkgMCAxLjE5MS4yMjYgMS41MzcuNjc5aC4wMzl2LS41NjFoMS4xMjd2NC4xMjF6bS0yLjY5OC0xLjk5OWMtLjY3OSAwLTEuMTQyLjUzMS0xLjE0MiAxLjU1NiAwIDEuMDE0LjQxMyAxLjUxNyAxLjA3NCAxLjUxNy42NTkgMCAxLjA5My0uNTIxIDEuMDkzLTEuNDg3IDAtMS4wMTUtLjQzMy0xLjU4Ni0xLjAyNS0xLjU4NnoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=";
const LOGO_AI = "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+QWRvYmUgSWxsdXN0cmF0b3I8L3RpdGxlPjxwYXRoIGQ9Ik0wIDB2MjRoMjRWMEgwem02Ljc3NCAxNS4xMjhoLTEuNDhsLS4zODQtMS4yNkgzLjI2MmwtLjM3NCAxLjI2SDEuNDFMNC4wNjQgOC43M2gxLjI5bDIuNDIgNi4zOTh6bS0yLjE0Ny0yLjE4N0wzLjgzNSAxMC4zM2wtLjgxIDIuNjExaDEuNjAyem03LjYzMiAyLjE4N7gtMS4zMThWOC43M2gxLjMxOHY2LjM5OHptMCAxLjg4OGgtMS4zMTh2LTEuMzgzaDEuMzE4djEuMzgzem00Ljk3My0xLjg4OGgtMS4zMThWOC43M2gxLjMxOHY2LjM5OHptMCAxLjg4OGgtMS4zMTh2LTEuMzgzaDEuMzE4djEuMzgzem00LjA4NC0xLjg4OGgtMS4zMThWOC43M2gxLjMxOHY2LjM5OHptMCAxLjg4OGgtMS4zMTh2LTEuMzgzaDEuMzE4djEuMzgzeiIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==";
const LOGO_VSCODE = "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VmlzdWFsIFN0dWRpbyBDb2RlPC90aXRsZT48cGF0aCBkPSJNMjMuMTUgMi41ODdMMTguMjEuMjFhMS40OTQgMS40OTQgMCAwIDAtMS43MDUuMjkxTDYuOTQgMTIuMjgzbC00LjE3NC0zLjE0YS43MzUuNzM1IDAgMCAwLS44OTUuMDcxTC4xNyAxMC42YS43MzMuNzMzIDAgMCAwIC4xNjUgMS4xNzFsNS41ODQgMy4wOSA1LjU4OCAzLjA3NiA5LjU3NyAxMi4wMDNhMS40OTQgMS40OTQgMCAwIDAgMS43MDUuMjlMMjMuMTUgMjEuNGExLjQ5NiAxLjQ5NiAwIDAgMCAuODUtMS4zNDd2LTE2LjEyYTEuNDk2IDEuNDk2IDAgMCAwLS44NS0xLjM0NnoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=";

const tools = [
    { name: 'Figma', icon: "https://cdn.simpleicons.org/figma/white", color: "#F24E1E", desc: "Prototypage UI/UX haute fidélité." },
    { name: 'Photoshop', icon: LOGO_PS, color: "#31A8FF", desc: "Retouche photo avancée." },
    { name: 'Illustrator', icon: LOGO_AI, color: "#FF9A00", desc: "Création vectorielle." },
    { name: 'VS Code', icon: LOGO_VSCODE, color: "#007ACC", desc: "Développement." },
    { name: 'Gemini', icon: "https://cdn.simpleicons.org/googlegemini/white", color: "#412991", desc: "IA et Code." },
    { name: 'Instagram', icon: "https://cdn.simpleicons.org/instagram/white", color: "#E4405F", desc: "Stratégies de contenu." },
    { name: 'TikTok', icon: "https://cdn.simpleicons.org/tiktok/white", color: "#FFFFFF", desc: "Viralité et rétention." }
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
                            <img
                                src={tool.icon}
                                alt={tool.name}
                                className="block transition-all duration-300 group-hover:scale-110"
                                style={{
                                    height: '40px', // Restored to 40px "Perfect" size as requested
                                    width: 'auto',
                                    objectFit: 'contain',
                                    filter: 'none'
                                }}
                            />

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
                                    <img
                                        src={selectedTool.icon}
                                        alt={selectedTool.name}
                                        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
