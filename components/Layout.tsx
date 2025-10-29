'use client';

import Sidebar from '@/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-canvas relative overflow-hidden">
      {/* Animated gradient orbs for bright theme */}
      <motion.div
        className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-blue/10 to-teal/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple/8 to-pink/8 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
      <motion.div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange/6 to-yellow/6 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <Sidebar />
      
      <motion.main 
        className="flex-1 ml-72 px-10 py-8 relative z-10 overflow-y-auto h-screen"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div className="max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
