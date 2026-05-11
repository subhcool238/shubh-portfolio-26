"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const MouseCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  
  // Mouse position refs
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorIcon, setCursorIcon] = useState<string | null>(null);
  const [cursorColor, setCursorColor] = useState<string | null>(null);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text">("default");
  const [scrollProgress, setScrollProgress] = useState(0);

  const pathname = usePathname();
  const isCaseStudy = pathname.includes('/case-study');

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? scrollY / height : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Butter smooth animation loop
  const animate = useCallback(() => {
    if (!dotRef.current || !ringRef.current) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    // Dot follows faster for precision
    dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.45;
    dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.45;

    // Ring lags with damping for premium feel
    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

    dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
    ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  // Handle all mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const target = e.target as HTMLElement;
      if (target && target.closest('[data-cursor-hide]')) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('[data-cursor-hide]')) {
        return;
      }
      
      // Check for specific cursor text attributes
      const textContainer = target.closest('[data-cursor-text]') as HTMLElement;
      const iconType = target.closest('[data-cursor-icon]')?.getAttribute('data-cursor-icon');

      if (textContainer || iconType) {
        setCursorText(textContainer?.getAttribute('data-cursor-text') || "");
        setCursorIcon(iconType || null);
        setCursorColor(null); // Reset color on standard hover
        setCursorState("text");
        return;
      }

      // Default hover for all interactive elements
      const link = target.closest('a, button');
      if (link) {
        setCursorState("hover");
        setCursorText("");
        setCursorIcon(null);
        setCursorColor(null);
        return;
      }

      setCursorState("default");
      setCursorText("");
      setCursorIcon(null);
      setCursorColor(null);
    };

    // Listen for custom "cursor-update" events from other components (like Footer/Game)
    const handleCursorUpdate = (e: any) => {
      const { state, text, icon, color } = e.detail;
      if (state) setCursorState(state);
      if (text !== undefined) setCursorText(text);
      if (icon !== undefined) setCursorIcon(icon);
      if (color !== undefined) setCursorColor(color);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("cursor-update", handleCursorUpdate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("cursor-update", handleCursorUpdate);
    };
  }, []);

  // Handle visual states with GSAP
  useEffect(() => {
    if (!dotRef.current || !ringRef.current || !textRef.current || !iconRef.current) return;

    if (cursorState === "text") {
      gsap.to(ringRef.current, {
        width: 100,
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0)", // Outline instead of filled
        border: "1px solid rgba(255, 255, 255, 0.25)",
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      gsap.to(iconRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      gsap.to(dotRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      
    } else if (cursorState === "hover") {
      gsap.to(ringRef.current, {
        width: 70,
        height: 70,
        backgroundColor: "rgba(255, 255, 255, 0)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(textRef.current, { opacity: 0, scale: 0.8, duration: 0.2 });
      gsap.to(iconRef.current, { opacity: 0, scale: 0.8, duration: 0.2 });
      gsap.to(dotRef.current, { opacity: 1, scale: 1.5, duration: 0.3 });
      
    } else {
      gsap.to(ringRef.current, {
        width: 40,
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(textRef.current, { opacity: 0, scale: 0.8, duration: 0.2 });
      gsap.to(iconRef.current, { opacity: 0, scale: 0.8, duration: 0.2 });
      gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.3 });
    }
  }, [cursorState]);

  // Update SVG scroll progress
  useEffect(() => {
    if (progressCircleRef.current) {
      const radius = 18;
      const circumference = 2 * Math.PI * radius;
      const offset = isCaseStudy ? circumference - scrollProgress * circumference : 0;
      gsap.to(progressCircleRef.current, {
        strokeDashoffset: offset,
        duration: 0.15,
        ease: "none"
      });
    }
  }, [scrollProgress, isCaseStudy]);

  const renderIcon = () => {
    switch (cursorIcon) {
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#0077b5]">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <defs>
              <linearGradient id="insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#f09433' }} />
                <stop offset="25%" style={{ stopColor: '#e6683c' }} />
                <stop offset="50%" style={{ stopColor: '#dc2743' }} />
                <stop offset="75%" style={{ stopColor: '#cc2366' }} />
                <stop offset="100%" style={{ stopColor: '#bc1888' }} />
              </linearGradient>
            </defs>
            <path fill="url(#insta-grad)" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
          </svg>
        );
      case 'behance':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#0057ff]">
            <path d="M19.58 12.27c-.04-.62-.25-1.09-.62-1.41c-.37-.32-.83-.48-1.38-.48c-.58 0-1.08.17-1.39.51c-.33.34-.54.8-.62 1.38m6.35-.23c.08.41.08 1 .08 1.77h-6.5c.05.9.35 1.52.94 1.88c.35.23.78.34 1.29.34c.53 0 .96-.14 1.27-.41c.2-.15.36-.35.5-.62h2.38c-.06.54-.35 1.07-.88 1.62c-.78.88-1.9 1.3-3.34 1.3c-1.19 0-2.23-.37-3.16-1.1c-.88-.73-1.34-1.92-1.34-3.57c0-1.55.41-2.75 1.23-3.55c.82-.83 1.88-1.24 3.19-1.24c.77 0 1.47.14 2.09.42c.62.28 1.14.71 1.54 1.32c.37.53.6 1.14.71 1.84M9.58 14.07c0-.65-.27-1.1-.79-1.34c-.29-.13-.71-.2-1.25-.23H4.87v3.34H7.5c.54 0 .96-.07 1.26-.22c.55-.27.82-.79.82-1.55m-4.71-3.61H7.5c.54 0 1-.1 1.32-.31c.34-.2.5-.57.5-1.09c0-.56-.22-.96-.66-1.15c-.39-.13-.88-.19-1.47-.19H4.87m6.85 4.7c.32.5.48 1.11.48 1.82c0 .76-.2 1.4-.55 1.99a3.6 3.6 0 0 1-.88.98c-.4.29-.87.51-1.41.62c-.54.11-1.12.17-1.75.17H2V5.55h6c1.53.03 2.6.45 3.23 1.33c.38.53.57 1.16.57 1.9c0 .76-.19 1.37-.57 1.83c-.23.26-.53.5-.95.71c.63.23 1.11.6 1.44 1.1m8.34-5.1h-5.01V6.07h5.01v1.25z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Precision Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-element fixed pointer-events-none z-[10001] hidden md:block mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Trailing Ring with Negative Effect */}
      <div
        ref={ringRef}
        className={`custom-cursor-element fixed pointer-events-none z-[10000] hidden md:flex items-center justify-center overflow-hidden ${!cursorColor ? 'mix-blend-difference' : ''}`}
        style={{
          left: 0,
          top: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* SVG Scroll Progress Ring */}
        <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle ref={progressCircleRef} cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray={2 * Math.PI * 18} strokeDashoffset={2 * Math.PI * 18} strokeLinecap="round" />
        </svg>

        {/* Brand Icon (rendered for social links) */}
        <div ref={iconRef} className="absolute inset-0 flex items-center justify-center opacity-0 scale-50">
          {renderIcon()}
        </div>

        {/* Custom Text (rendered for specific triggers, hidden if icon exists) */}
        <span 
          ref={textRef} 
          style={{ opacity: 0, color: cursorColor || 'white' }} 
          className="uppercase text-[10px] leading-tight w-20 text-center font-bold tracking-[0.2em] relative z-10"
        >
          {!cursorIcon && cursorText}
        </span>
      </div>
    </>
  );
};

export default MouseCursor;

