"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Agent from "./Agent";

export default function PersistentAgent() {
  const pathname = usePathname();
  const [scrollPos, setScrollPos] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem("hasSeenPreloader");
    
    if (hasSeen) {
      setIsPreloaderActive(false);
    } else {
      const handleFinished = () => setIsPreloaderActive(false);
      window.addEventListener('preloader-finished', handleFinished);
      // Safety fallback in case event is missed
      const timer = setTimeout(handleFinished, 8000);
      return () => {
        window.removeEventListener('preloader-finished', handleFinished);
        clearTimeout(timer);
      };
    }
  }, []);

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

  const isHome = pathname === "/";
  const isHeroActive = isHome && scrollPos < 300; 
  
  let mode: "hero" | "sticky" | "hidden" = "sticky";
  if (isFooterVisible) mode = "hidden";
  else if (isHeroActive) mode = "hero";

  if (!isMounted) return null;

  const getContainerClasses = () => {
    const base = "absolute pointer-events-auto transition-all duration-1000 ease-in-out";
    
    if (mode === "hidden") {
      return `${base} opacity-0 scale-50 pointer-events-none bottom-[30px] w-[240px] h-[240px] right-[calc(min(0px,640px-50vw)+30px)]`;
    }

    if (mode === "hero") {
      return `${base} opacity-100 bottom-[-61px] right-[-36px] w-[192px] h-[192px] md:bottom-auto md:right-[-10%] md:top-[55%] md:translate-y-[calc(-50%+20px)] md:translate-x-[-30px] md:w-[560px] md:h-[560px]`;
    }

    return `${base} opacity-100 w-[192px] h-[192px] md:w-[240px] md:h-[240px] bottom-[-61px] right-[-36px] md:bottom-[-50px] md:right-[calc(min(0px,640px-50vw)-10px)]`;
  };

  return (
    <div className={`fixed inset-0 z-[5000] pointer-events-none flex justify-center transition-opacity duration-700 ${isPreloaderActive ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full max-w-7xl relative h-full">
        <div className={getContainerClasses()}>
          <Agent isSticky={mode === 'sticky'} />
        </div>
      </div>
    </div>
  );
}
