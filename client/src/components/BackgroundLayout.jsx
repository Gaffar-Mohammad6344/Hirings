import React from 'react';
import { motion } from 'framer-motion';

const BackgroundLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F8FAFC]">
      
      {/* --- FIXED BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* 1. Large Animated Blurred Circles */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#0B57D0]/10 blur-[120px] rounded-full"
        />

        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-[#071952]/5 blur-[100px] rounded-full"
        />

        {/* 2. The Transparent Grid */}
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* 3. Tiny Dot Pattern Over Grid */}
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 bg-transparent">
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;