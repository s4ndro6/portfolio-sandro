import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { X, ExternalLink } from 'lucide-react';
import { createPortal } from 'react-dom';

const ProjectMarquee = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="relative border-y border-white/5 bg-white/5 backdrop-blur-md overflow-hidden z-20 flex items-center justify-center h-[200px] w-full my-12">
            {/* Dégradés latéraux */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

            {/* MARQUEE CONTAINER */}
            <div
                className="flex w-full overflow-hidden items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex items-center min-w-full gap-8 pl-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 50, ease: "linear", repeat: Infinity }}
                    style={{
                        animationPlayState: isHovered ? "paused" : "running",
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {/* Items */}
                    {[...projects, ...projects, ...projects].map((project, idx) => (
                        <div
                            key={`${project.id}-${idx}`}
                            className="flex-shrink-0 cursor-pointer group flex flex-col items-center justify-center relative w-[250px] aspect-video rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
                            onClick={() => setSelectedProject(project)}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-bold text-sm uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm bg-black/30">Voir</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* MODALE DETAILS - PORTAL (STRICT FIXED) */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
                            <motion.div
                                layoutId={`project-${selectedProject.id}-modal`}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-[#111] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl flex flex-col md:flex-row"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-50 text-white hover:text-[#E91E63] transition-colors bg-black/50 rounded-full p-2"><X size={24} /></button>

                                {/* Image Section */}
                                <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>

                                {/* Content Section */}
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

                            {/* Backdrop Click Close */}
                            <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedProject(null)} />
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default ProjectMarquee;
