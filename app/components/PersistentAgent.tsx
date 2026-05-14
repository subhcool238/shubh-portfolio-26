"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Agent from "./Agent";

export default function PersistentAgent() {
  const pathname = usePathname();
  const [scrollPos, setScrollPos] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showAgent, setShowAgent] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // 1. Handle Sync with Preloader & Syn Loading
  useEffect(() => {
    setIsMounted(true);
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem("hasSeenPreloader");
    
    const reveal = () => setShowAgent(true);

    if (hasSeen) {
      reveal();
    } else {
      window.addEventListener('syn-loaded', reveal);
      // Fallback reveal in case event is missed
      const timer = setTimeout(reveal, 6000);
      return () => {
        window.removeEventListener('syn-loaded', reveal);
        clearTimeout(timer);
      };
    }
  }, []);

  // 2. Handle Scroll & Footer Visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
      
      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setIsFooterVisible(footerTop < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // 3. Determine Mode Instantly during Render to avoid Navigation Flicker
  const isHome = pathname === "/";
  // The threshold should match the Hero section height logic
  const isHeroActive = isHome && scrollPos < 300; 
  
  let mode: "hero" | "sticky" | "hidden" = "sticky";
  if (isFooterVisible) mode = "hidden";
  else if (isHeroActive) mode = "hero";

  if (!isMounted || !showAgent) return null;

  const getContainerClasses = () => {
    const base = "absolute pointer-events-auto transition-all duration-1000 ease-in-out";
    
    if (mode === "hidden") {
      return `${base} opacity-0 scale-50 pointer-events-none bottom-[30px] w-[240px] h-[240px] right-[calc(min(0px,640px-50vw)+30px)]`;
    }

    if (mode === "hero") {
      // Hero Mode: Positioned for the Home Page Hero Section
      return `${base} opacity-100 bottom-[-61px] right-[-36px] w-[192px] h-[192px] md:bottom-auto md:right-[-10%] md:top-[55%] md:translate-y-[calc(-50%+20px)] md:translate-x-[-30px] md:w-[560px] md:h-[560px]`;
    }

    // Sticky mode: Default for all other pages and scrolled-down home page
    return `${base} opacity-100 w-[192px] h-[192px] md:w-[240px] md:h-[240px] bottom-[-61px] right-[-36px] md:bottom-[-50px] md:right-[calc(min(0px,640px-50vw)-10px)]`;
  };

  return (
    <div className="fixed inset-0 z-[5000] pointer-events-none flex justify-center">
      <div className="w-full max-w-7xl relative h-full">
        <div className={getContainerClasses()}>
          <Agent isSticky={mode === 'sticky'} />
        </div>
      </div>
    </div>
  );
}
