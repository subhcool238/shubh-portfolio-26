"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const MouseCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text" | "scroll">("default");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll progress tracker for case study pages
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? scrollY / height : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current || !textRef.current) return;

    // Center elements on their x/y coordinates
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(ringRef.current, { xPercent: -50, yPercent: -50 });

    // Inner dot tracks instantly
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.05, ease: "none" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.05, ease: "none" });

    // Outer ring trails with a spring-like delay
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.2, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
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

      // On case study pages, default state still shows the scroll loader
      // but we no longer set a separate "scroll" cursorState for non-hoverable areas.
      // The scroll SVG is always visible on case-study pages via isCaseStudy flag.

      setCursorState("default");
      setCursorText("");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Run once on mount to establish correct state based on URL
    handleMouseOver({ target: document.body } as unknown as MouseEvent);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  // Handle animation states based on cursorState
  useEffect(() => {
    if (!dotRef.current || !ringRef.current || !textRef.current) return;

    if (cursorState === "text") {
      // Large solid circle with text
      gsap.to(ringRef.current, {
        width: 110,
        height: 110,
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "0px solid rgba(255,255,255,0)",
        mixBlendMode: "normal", // Disable difference so it's a solid white circle
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
      // Expanded hollow ring for links
      gsap.to(ringRef.current, {
        width: 60,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0)",
        border: "1px solid rgba(255,255,255,0.5)",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(textRef.current, { opacity: 0, duration: 0.1 });
      gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2 });
      
    } else {
      // Default state — small compact ring
      gsap.to(ringRef.current, {
        width: 28,
        height: 28,
        backgroundColor: "rgba(255, 255, 255, 0)",
        border: "1px solid rgba(255,255,255,0.3)",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(textRef.current, { opacity: 0, duration: 0.1 });
      gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2 });
    }
  }, [cursorState]);

  // Detect if we're on a case-study page
  const [isCaseStudy, setIsCaseStudy] = useState(false);
  useEffect(() => {
    setIsCaseStudy(window.location.pathname.includes('/case-study'));
  }, []);

  // Update SVG stroke offset based on scroll progress
  useEffect(() => {
    if (progressCircleRef.current && isCaseStudy) {
      const radius = 39;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - scrollProgress * circumference;
      gsap.to(progressCircleRef.current, {
        strokeDashoffset: offset,
        duration: 0.1,
        ease: "none"
      });
    }
  }, [scrollProgress, isCaseStudy]);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10001] hidden md:block mix-blend-difference"
        style={{
          width: "8px", // Matches screenshot inner dot size
          height: "8px",
          backgroundColor: "white",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease"
        }}
      />
      
      {/* Outer Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] flex items-center justify-center overflow-hidden hidden md:flex mix-blend-difference"
        style={{
          width: "28px",
          height: "28px",
          border: "1px solid rgba(255,255,255,0.3)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease"
        }}
      >
        {/* SVG Scroll Progress Loader */}
        <svg 
          viewBox="0 0 80 80"
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" 
          style={{ opacity: isCaseStudy ? 1 : 0, transition: "opacity 0.3s" }}
        >
          {/* Faint background track */}
          <circle 
            cx="40" cy="40" r="39" 
            fill="none" 
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="1" 
          />
          {/* Active progress fill */}
          <circle 
            ref={progressCircleRef}
            cx="40" cy="40" r="39" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            strokeDasharray={2 * Math.PI * 39}
            strokeDashoffset={2 * Math.PI * 39}
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
