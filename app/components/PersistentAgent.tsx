"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Agent from "./Agent";

export default function PersistentAgent() {
  const pathname = usePathname();
  const [scrollPos, setScrollPos] = useState(0);
  const [mode, setMode] = useState<"hero" | "sticky" | "hidden">("hero");
  const [isMounted, setIsMounted] = useState(false);
  const [showAgent, setShowAgent] = useState(false);

  useEffect(() => {
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem("hasSeenPreloader");
    if (hasSeen) {
      setShowAgent(true);
    } else {
      // Sync with Preloader timing (~3.8s total)
      const timer = setTimeout(() => {
        setShowAgent(true);
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPos(currentScroll);
      
      const footer = document.querySelector('footer');
      let footerVisible = false;
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        footerVisible = footerTop < window.innerHeight;
      }

      const isHome = window.location.pathname === "/";
      
      if (footerVisible) {
        setMode("hidden");
      } else if (isHome && currentScroll < window.innerHeight * 0.4) {
        setMode("hero");
      } else {
        setMode("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!isMounted || !showAgent) return null;

  const getContainerClasses = () => {
    const base = "absolute pointer-events-auto transition-all duration-1000 ease-in-out";
    
    if (mode === "hidden") {
      return `${base} opacity-0 scale-50 pointer-events-none bottom-[30px] w-[240px] h-[240px] right-[calc(min(0px,640px-50vw)+30px)]`;
    }

    if (mode === "hero") {
      // Hero Mode: Moved 100px to the left (from +70px to -30px)
      return `${base} opacity-100 bottom-[-61px] right-[-36px] w-[192px] h-[192px] md:bottom-auto md:right-[-10%] md:top-[55%] md:translate-y-[calc(-50%+20px)] md:translate-x-[-30px] md:w-[560px] md:h-[560px]`;
    }

    // Sticky mode: Shifted further down (additional 30px)
    // On mobile, we keep the size (192px) and bottom/right same as hero mode to satisfy "keep the place same"
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
