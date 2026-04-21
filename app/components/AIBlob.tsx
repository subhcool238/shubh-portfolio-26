"use client";

import { useEffect, useRef } from "react";

export default function AIBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      
      // We want the blob to be pulled towards the mouse cursor
      const rect = blobRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const blobCenterX = rect.left + rect.width / 2;
      const blobCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - blobCenterX;
      const deltaY = e.clientY - blobCenterY;

      // Move 15% towards the cursor for a subtle, attractive effect
      const moveX = deltaX * 0.15;
      const moveY = deltaY * 0.15;

      blobRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible pointer-events-none">
      {/* Outer Glow */}
      <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Core Interactive Blob */}
      <div 
        ref={blobRef}
        className="w-72 h-72 absolute transition-transform duration-300 ease-out z-10 animate-blob"
        style={{
          background: "linear-gradient(45deg, rgba(24,103,237,1) 0%, rgba(210,29,83,1) 100%)",
          boxShadow: "0 0 40px rgba(210,29,83,0.5), inset 0 0 20px rgba(255,255,255,0.2)"
        }}
      ></div>

      {/* Inner Blob for depth */}
      <div 
        className="w-48 h-48 absolute z-20 animate-blob animation-delay-2000"
        style={{
          background: "linear-gradient(135deg, rgba(125,173,255,1) 0%, rgba(24,103,237,0.8) 100%)",
          mixBlendMode: "overlay"
        }}
      ></div>
    </div>
  );
}
