"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const MouseCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  
  // Mouse position refs (no re-renders on every frame)
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  
  const [isVisible, setIsVisible] = useState(true);
  const [cursorText, setCursorText] = useState("");
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text">("default");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use Next.js pathname for reliable route detection
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

  // The core animation loop — uses requestAnimationFrame + lerp for buttery smoothness
  const animate = useCallback(() => {
    if (!dotRef.current || !ringRef.current) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    // Dot follows mouse almost instantly (lerp factor 0.9)
    dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.9;
    dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.9;

    // Ring trails with heavy damping (lerp factor 0.12) — this creates the premium lag
    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

    dotRef.current.style.left = `${dotPos.current.x}px`;
    dotRef.current.style.top = `${dotPos.current.y}px`;

    ringRef.current.style.left = `${ringPos.current.x}px`;
    ringRef.current.style.top = `${ringPos.current.y}px`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  // Mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const textContainer = target.closest('[data-cursor-text]') as HTMLElement;
      if (textContainer) {
        setCursorText(textContainer.getAttribute('data-cursor-text') || "");
        setCursorState("text");
        return;
      }

      const link = target.closest('a, button');
      if (link) {
        setCursorState("hover");
        setCursorText("");
        return;
      }

      setCursorState("default");
      setCursorText("");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  // Handle animation states based on cursorState
  useEffect(() => {
    if (!dotRef.current || !ringRef.current || !textRef.current) return;

    if (cursorState === "text") {
      gsap.to(ringRef.current, {
        width: 110,
        height: 110,
        backgroundColor: "rgba(255, 255, 255, 1)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(textRef.current, {
        opacity: 1,
        color: "#000000",
        duration: 0.2,
        delay: 0.1
      });
      gsap.to(dotRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      
    } else if (cursorState === "hover") {
      gsap.to(ringRef.current, {
        width: 60,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(textRef.current, { opacity: 0, duration: 0.1 });
      gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2 });
      
    } else {
      gsap.to(ringRef.current, {
        width: 40,
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(textRef.current, { opacity: 0, duration: 0.1 });
      gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2 });
    }
  }, [cursorState]);

  // Update SVG stroke offset based on scroll progress (only on project/case-study pages)
  useEffect(() => {
    if (progressCircleRef.current) {
      const radius = 18;
      const circumference = 2 * Math.PI * radius;
      const offset = isCaseStudy
        ? circumference - scrollProgress * circumference
        : 0; // Fully filled ring on non-project pages
      gsap.to(progressCircleRef.current, {
        strokeDashoffset: offset,
        duration: 0.15,
        ease: "none"
      });
    }
  }, [scrollProgress, isCaseStudy]);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[10001] hidden md:block"
        style={{
          left: 0,
          top: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Outer Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[10000] hidden md:flex items-center justify-center overflow-hidden"
        style={{
          left: 0,
          top: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* SVG Scroll Progress Ring */}
        <svg 
          viewBox="0 0 40 40"
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        >
          {/* Faint background track */}
          <circle 
            cx="20" cy="20" r="18" 
            fill="none" 
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="1" 
          />
          {/* Active progress fill */}
          <circle 
            ref={progressCircleRef}
            cx="20" cy="20" r="18" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5"
            strokeDasharray={2 * Math.PI * 18}
            strokeDashoffset={2 * Math.PI * 18}
            strokeLinecap="round"
          />
        </svg>

        <span ref={textRef} style={{ opacity: 0 }} className="uppercase text-[12px] leading-tight w-20 text-center font-bold tracking-widest text-black relative z-10">
          {cursorText}
        </span>
      </div>
    </>
  );
};

export default MouseCursor;
