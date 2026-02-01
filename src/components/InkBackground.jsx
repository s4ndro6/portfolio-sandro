import React from 'react';
import { motion } from 'framer-motion';

const InkBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      {/* Lueurs Néons */}
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4FD1ED] rounded-full filter blur-[120px] opacity-20"
      />
      
      <motion.div
        animate={{ x: [0, -100, 50, 0], y: [0, 100, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-[#E91E63] rounded-full filter blur-[140px] opacity-15"
      />

      <motion.div
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600 rounded-full filter blur-[130px] opacity-15"
      />
    </div>
  );
};

export default InkBackground;