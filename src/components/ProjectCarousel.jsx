import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const ProjectCarousel = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [width, setWidth] = useState(0);
    const carouselRef = useRef();

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, [carouselRef]);

    return (
        <div className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2">Projets Récents</h2>
                <p className="text-gray-400 flex items-center gap-2 text-sm">
                    Drag (glisser) pour explorer.
                </p>
            </div>

            <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden px-6">
                {/* Auto-scrolling track that allows drag */}
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: "grabbing" }}
                    animate={{
                        x: [0, -width]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40, // Adjust speed here
                            ease: "linear",
                        },
                    }}
                    onDragStart={() => {
                        // Optional: Pause animation on drag interaction if needed, 
                        // but simple drag usually overrides 'animate' momentarily or conflicts.
                        // For a pure 'Auto + Drag', usually we let the users drag, and if they let go, 
                        // it might resume or stay. With strictly simple framer-motion, 
                        // enabling drag on an animating element can be glitchy. 
                        // However, we will try to just provide 'drag' and let FM handle the conflict (usually stops animation).
                    }}
                    className="flex gap-8"
                >
                    {/* Triple the items to create illusion of infinite capability or just single loop */}
                    {[...projects, ...projects, ...projects].map((project, idx) => (
                        <motion.div
                            key={`${project.id}-${idx}`}
                            className="min-w-[300px] md:min-w-[400px] h-[250px] md:h-[300px] rounded-3xl overflow-hidden relative group border border-white/10 bg-[#0F0F0F] shrink-0"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="text-white font-bold text-sm uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm bg-black/30">
                                    Voir le projet
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                <span className="text-[#E91E63] text-xs font-bold uppercase tracking-wider">{project.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* MODALE PROJECT (FIXED INSET-0 FLEX CENTER) */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
                            {/* Overlay is the background itself to ensure coverage */}
                            <motion.div
                                layoutId={`project-${selectedProject.id}-modal`}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-[#111] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl flex flex-col md:flex-row"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-50 text-white hover:text-[#E91E63] transition-colors bg-black/50 rounded-full p-2"><X size={24} /></button>

                                <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>

                                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {selectedProject.tags?.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">{selectedProject.title}</h3>
                                    <p className="text-[#E91E63] font-bold text-sm uppercase tracking-widest mb-6">{selectedProject.role}</p>

                                    <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                                        <div>
                                            <strong className="text-white block mb-1">Brief</strong>
                                            {selectedProject.brief}
                                        </div>
                                        <div>
                                            <strong className="text-white block mb-1">Réalisation</strong>
                                            {selectedProject.realization}
                                        </div>
                                        <div>
                                            <strong className="text-white block mb-1">Résultats</strong>
                                            <ul className="list-disc pl-4 space-y-1 mt-1">
                                                {selectedProject.results?.map((res, i) => <li key={i}>{res}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Close on background click */}
                            <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedProject(null)} />
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default ProjectCarousel;
