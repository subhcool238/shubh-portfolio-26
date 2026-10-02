"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Agent from "./Agent";

export default function PersistentAgent() {
  const pathname = usePathname();
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showAgent, setShowAgent] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // 1. Handle Sync with Preloader & Syn Loading
  useEffect(() => {
    setIsMounted(true);
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem("hasSeenPreloader");
    
    // Mount Syn (which downloads the 3D viewer and scene) once the browser is idle,
    // so it never competes with the page's own content for the first paint
    let idleId = 0;
    const reveal = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setShowAgent(true), { timeout: 1500 });
      } else {
        setShowAgent(true);
      }
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (hasSeen) {
      reveal();
    } else {
      window.addEventListener('preloader-done', reveal);
      // Fallback reveal in case event is missed
      timer = setTimeout(reveal, 3000);
    }
    return () => {
      window.removeEventListener('preloader-done', reveal);
      if (timer) clearTimeout(timer);
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
    };
  }, []);

  // 2. Handle Scroll & Footer Visibility
  useEffect(() => {
    // Checked at most once per frame; state only changes when a threshold is crossed,
    // so scrolling does not re-render the agent
    let frame = 0;
    const update = () => {
      frame = 0;
      // The threshold should match the Hero section height logic
      setIsPastHero(window.scrollY >= 300);

      // The footer is revealed once the end of the page content rises above the bottom of the screen
      const contentEnd = document.getElementById('footer-reveal-sentinel');
      if (contentEnd) {
        setIsFooterVisible(contentEnd.getBoundingClientRect().top < window.innerHeight);
      }
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // 3. Determine Mode Instantly during Render to avoid Navigation Flicker
  const isHome = pathname === "/";
  const isHeroActive = isHome && !isPastHero;
  
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
      // Hero Mode: Positioned for the Home Page Hero Section.
      // Phones and tablets: small, in the bottom-right corner (the hero text spans the full width there).
      // Wide screens (xl+): large, beside the text, which only takes two thirds of the width.
      return `${base} opacity-100 w-[192px] h-[192px] bottom-[-61px] right-[-36px] md:w-[240px] md:h-[240px] md:bottom-[-50px] md:right-[calc(min(0px,640px-50vw)-10px)] xl:bottom-auto xl:right-[-10%] xl:top-[55%] xl:translate-y-[calc(-50%+20px)] xl:translate-x-[-30px] xl:w-[560px] xl:h-[560px]`;
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
