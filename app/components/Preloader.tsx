"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already loaded in this session
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeenPreloader) {
      setIsLoading(false);
      return;
    }

    // Body scroll lock
    document.body.style.overflow = "hidden";

    // Simulate loading
    const duration = 2800; // minimum duration
    const interval = 20; 
    
    let currentProgress = 0;
    let synReady = false;

    const handleSynLoaded = () => { synReady = true; };
    window.addEventListener('syn-loaded', handleSynLoaded);
    
    // Safety timeout: don't hang preloader if Syn fails to load
    const safetyTimer = setTimeout(() => { synReady = true; }, 5000);
    
    const timer = setInterval(() => {
      // Gradual, more linear increment
      let step = 0.35; // Takes ~6 seconds to reach 100% naturally
      
      if (synReady) {
        // Accelerate to finish once Syn is ready
        step = Math.max(0.8, (100 - currentProgress) * 0.3);
      } else if (currentProgress >= 88) {
        // Slow down to a crawl near the end if Syn isn't ready yet
        step = (98 - currentProgress) * 0.05;
      }
      
      currentProgress += step;
      
      if (currentProgress >= 99.8) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("hasSeenPreloader", "true");
        }, 500); 
      }
      setProgress(Math.min(100, Math.round(currentProgress)));
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimer);
      window.removeEventListener('syn-loaded', handleSynLoaded);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0c] flex flex-col items-center justify-center skip-preloader-hide"
        >
          <div className="flex flex-col items-center max-w-sm w-full px-6">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 relative w-12 h-12 opacity-90"
            >
              <Image
                src="/Logo/White Logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Loading Bar Container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-6 relative"
            >
              <div 
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* Percentage text & Loading Label */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex justify-between w-full text-[10px] font-bold tracking-[0.3em] uppercase text-white/40"
            >
              <span>Loading Experience</span>
              <span className="font-mono">{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
