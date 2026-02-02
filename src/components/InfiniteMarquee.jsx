import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

/* 
  INLINE SVG ICONS - STRICTLY TYPED
  Each icon is 24x24 viewBox (standard SimpleIcons/Material), rendered at height 35px.
  Fill is strictly 'white'.
*/

const FigmaIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <path d="M8.12 16.5A3.49 3.49 0 0 1 11.5 19.99A3.49 3.49 0 0 1 8.12 23.5A3.5 3.5 0 0 1 4.62 19.99A3.49 3.49 0 0 1 8.12 16.5M11.5 13.01H8.12A3.5 3.5 0 0 1 4.62 9.51A3.49 3.49 0 0 1 8.12 6.01H11.5V13.01H12V6.01L12.01 6.01H15.51A3.49 3.49 0 0 1 18.89 9.51A3.49 3.49 0 0 1 15.51 13.01H11.5M8.12 6A3.49 3.49 0 0 1 11.5 2.5A3.49 3.49 0 0 1 14.89 6H8.12M15.51 2.5A3.49 3.49 0 0 1 18.89 6H15.51V2.5Z" />
    </svg>
);

const PhotoshopIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Adobe Photoshop</title>
        <path d="M0 .034v23.932h24V.034H0zM17.5 14.354h-1.666v-3.75h1.666c.892 0 1.667.625 1.667 1.875 0 1.25-.775 1.875-1.667 1.875zM12.5 17.5h-3.333V6.25h3.333c2.75 0 5 1.5 5 4.166 0 2.25-1.583 3.75-3.75 4.042v.084c1.166.25 1.916 1.166 2.083 2.5.084.75.167 1.417.417 1.875v.083h-2.5c-.25-.417-.333-1.083-.417-1.75-.166-1.166-.833-1.583-1.833-1.583h-1.667V17.5zM10 13.75H8.333V8.75H10c.892 0 1.667.508 1.667 1.583 0 1.25-.833 1.5-1.667 1.5h-.833v1.917z" />
    </svg>
);

const IllustratorIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Adobe Illustrator</title>
        <path d="M0 .034v23.932h24V.034H0zM8.5 18.334l2.917-8.333h.166l2.917 8.333H12.5l-.667-2.083h-3.5l-.667 2.083H5.917zm4.25-3.333l-1.083-3.25h-.084l-1.083 3.25h2.25zm6.5 3.333h-1.667V9.5h1.667v8.834zm0-10.75h-1.667V6.084h1.667v1.5z" />
    </svg>
);

const N8nIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>n8n</title>
        <path d="M12.723 15.539c.075-.246.069-.512-.016-.754l-.988-2.822-2.126-6.108a.723.723 0 0 0-1.371.01l-1.42 4.195-2.067 6.107a1.268 1.268 0 0 0 .542 1.536L11.088 21.1a1.272 1.272 0 0 0 1.635-.552l2.365-4.885-2.365-.124zm.447-1.12l1.625-3.376a.715.715 0 0 0-.012-.663L13.11 7.02l2.92-1.928a1.275 1.275 0 0 1 1.674.27l3.868 4.793a1.27 1.27 0 0 1-.16 1.78l-5.698 4.605-2.544-2.12zm-3.618-8.157L7.09 4.385a1.277 1.277 0 0 1 1.614-1.748l3.665 1.27a.723.723 0 0 1 .455.518l.848 3.535-4.12-1.698z" />
    </svg>
);

const MakeIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Make</title>
        <path d="M4.09 1.564a2.535 2.535 0 0 0-2.527 2.53v15.812a2.535 2.535 0 0 0 2.528 2.53h15.82a2.535 2.535 0 0 0 2.528-2.53V4.094a2.535 2.535 0 0 0-2.528-2.53h-15.82Zm3.821 7.155a3.35 3.35 0 1 1 3.35 3.35 3.35 3.35 0 0 1-3.35-3.35Zm-3.13 6.94c0-1.728 1.4-3.13 3.13-3.13h8.179c1.729 0 3.13 1.402 3.13 3.13 0 1.729-1.4 3.13-3.13 3.13H7.91c-1.73 0-3.13-1.4-3.13-3.13Z" />
    </svg>
);

const InstagramIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Instagram</title>
        <path d="M7.03021 2.73012C5.07492 2.73012 3.48972 4.31631 3.48972 6.2706V17.7295C3.48972 19.6848 5.07492 21.2709 7.03021 21.2709H16.9688C18.9251 21.2709 20.5093 19.6848 20.5093 17.7295V6.2706C20.5093 4.31631 18.9251 2.73012 16.9688 2.73012H7.03021ZM11.9995 7.15286C14.6738 7.15286 16.8467 9.32577 16.8467 12.0001C16.8467 14.6743 14.6738 16.8472 11.9995 16.8472C9.32524 16.8472 7.15234 14.6743 7.15234 12.0001C7.15234 9.32577 9.32524 7.15286 11.9995 7.15286ZM16.9688 5.64188C17.3986 5.64188 17.7469 5.99021 17.7469 6.42004C17.7469 6.84988 17.3986 7.1982 16.9688 7.1982C16.539 7.1982 16.1906 6.84988 16.1906 6.42004C16.1906 5.99021 16.539 5.64188 16.9688 5.64188ZM11.9995 8.70908C10.1818 8.70908 8.70857 10.1824 8.70857 12.0001C8.70857 13.8177 10.1818 15.291 11.9995 15.291C13.8172 15.291 15.2905 13.8177 15.2905 12.0001C15.2905 10.1824 13.8172 8.70908 11.9995 8.70908Z" />
    </svg>
);

const TikTokIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>TikTok</title>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.76v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.46-.54 2.94-1.34 4.14-1.1 1.66-2.85 2.85-4.83 3.03-3.1.28-6.07-1.78-6.66-4.79-.58-2.93 1.16-5.91 4.02-6.84.47-.15.96-.24 1.45-.25v4.2c-.32-.01-.66.07-.94.22-.61.32-.97.98-.95 1.67.01.76.43 1.45 1.12 1.74.83.35 1.83.1 2.45-.64.39-.46.58-1.04.57-1.64.01-4.78.01-9.56-.01-14.35-.11-1.11.23-2.28.9-3.14.39-.49.88-.91 1.16-1.14z" />
    </svg>
);

const VSCodeIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Visual Studio Code</title>
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.291L6.94 12.283l-4.174-3.14a.735.735 0 0 0-.895.071L.17 10.6a.733.733 0 0 0 .165 1.171l5.584 3.09 5.588 3.076 9.577 12.003a1.494 1.494 0 0 0 1.705.29L23.15 21.4a1.496 1.496 0 0 0 .85-1.347v-16.12a1.496 1.496 0 0 0-.85-1.346z" />
    </svg>
);

const GeminiIcon = () => (
    <svg role="img" viewBox="0 0 24 24" height="35" xmlns="http://www.w3.org/2000/svg" fill="white">
        <title>Google Gemini</title>
        <path d="M12 24c0-6 4-10 10-12-6-2-10-6-10-12-2 6-6 10-12 12 6 2 10 6 12 12z" />
    </svg>
);

// Tools array now contains COMPONENTS instead of URL Strings
const tools = [
    { name: 'Figma', icon: <FigmaIcon />, color: "#F24E1E", desc: "Prototypage UI/UX haute fidélité." },
    { name: 'Photoshop', icon: <PhotoshopIcon />, color: "#31A8FF", desc: "Retouche photo avancée." },
    { name: 'Illustrator', icon: <IllustratorIcon />, color: "#FF9A00", desc: "Création vectorielle." },
    { name: 'n8n', icon: <N8nIcon />, color: "#EA4B71", desc: "Workflows d'automatisation." },
    { name: 'Make', icon: <MakeIcon />, color: "#690EB1", desc: "Intégrations visuelles." },
    { name: 'Instagram', icon: <InstagramIcon />, color: "#E4405F", desc: "Stratégies de contenu." },
    { name: 'TikTok', icon: <TikTokIcon />, color: "#FFFFFF", desc: "Viralité et rétention." },
    { name: 'VS Code', icon: <VSCodeIcon />, color: "#007ACC", desc: "Développement." },
    { name: 'Gemini', icon: <GeminiIcon />, color: "#412991", desc: "IA et Code." }
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
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    style={{
                        animationPlayState: isHovered ? "paused" : "running",
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 mx-10 cursor-pointer group flex items-center justify-center p-4 relative"
                            onClick={() => setSelectedTool(tool)}
                        >
                            <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                {tool.icon}
                            </div>

                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
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

                                <div className="w-16 h-16 mb-6 flex items-center justify-center p-2 bg-white/5 rounded-2xl border border-white/5 text-white">
                                    {/* CLONE ELEMENT TO REMOVE HEIGHT OR ADJUST SIZE FOR MODAL IF NEEDED - OR JUST RENDER */}
                                    {React.cloneElement(selectedTool.icon, { height: "50", width: "50" })}
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
