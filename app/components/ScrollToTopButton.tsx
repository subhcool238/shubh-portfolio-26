"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      const isScrolled = window.scrollY > 300;
      
      // Hide if footer is in view
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      // Hide when within 800px of bottom (where footer usually is)
      const isNearBottom = documentHeight - scrollPosition < 800;
      
      if (isScrolled && !isNearBottom) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const mobileNav = document.querySelector('.lg\\:hidden.mb-16 nav');
    if (mobileNav) {
      // Scroll to just above the nav tags
      const y = mobileNav.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="lg:hidden fixed bottom-6 left-6 z-[100] p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-colors hover:bg-white/20"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
