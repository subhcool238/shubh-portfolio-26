"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MoveRight, 
  Layers, 
  Cpu, 
  Compass, 
  Activity, 
  Camera, 
  Globe,
  Music,
  Play,
  Share2
} from "lucide-react";
import { PolaroidModule } from "../components/PolaroidModule";
import Modal from "../components/Modal";
import VinylPlayer from "../components/VinylPlayer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  { year: "2026 — PRESENT", title: "XR & AI Consultant", company: "Varahe Analytics", image: "/about/abstract_hero.png" },
  { year: "JAN 2025 – JUN 2025", title: "XR Designer", company: "FireBirdVR", image: "/about/fitness.png" },
  { year: "OCT 2020 – OCT 2022", title: "UI/UX Designer", company: "Web Impact Software Solutions", image: "/about/triumph.png" },
  { year: "OCT 2018 – OCT 2020", title: "Graphic Designer", company: "Convolution Bikes", image: "/about/travel.png" },
];

const competencies = [
  {
    title: "Spatial/XR",
    icon: <Layers className="w-5 h-5 text-blue-500" />,
    description: "Unity, Unreal Engine, WebAR, TouchDesigner, Spatial Interaction Design.",
  },
  {
    title: "AI Product Design",
    icon: <Cpu className="w-5 h-5 text-blue-500" />,
    description: "Agentic Experience (AX) Design, LLM Integration, Local AI Automation (n8n, Ollama).",
  },
  {
    title: "Systems Architecture",
    icon: <Compass className="w-5 h-5 text-blue-500" />,
    description: "Ethnographic Research, Behavioral Mapping, Cross-touchpoint Orchestration.",
  },
];

const galleryImages = [
  { src: "/about/triumph.png", alt: "Obsidian Scrambler", x: "-20%", y: "-10%", rotate: "-5deg" },
  { src: "/about/fitness.png", alt: "Performance", x: "15%", y: "20%", rotate: "3deg" },
  { src: "/about/mountain.png", alt: "Expedition", x: "30%", y: "-15%", rotate: "-2deg" },
  { src: "/about/travel.png", alt: "Travel Photography", x: "-25%", y: "15%", rotate: "4deg" },
];

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [hoveredTimelineImage, setHoveredTimelineImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray(".reveal-scroll").forEach((elem: any) => {
        gsap.from(elem, {
          y: 40,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen selection:bg-blue-600/30">
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="w-full lg:w-3/5">
            <h4 className="reveal text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
              SHUBHANSHU (SANKY) SAHU
            </h4>
            <h1 className="reveal text-2xl md:text-3xl font-bold text-white/50 mb-8 leading-tight">
              Senior AI Product Designer & <br/>Spatial UX Specialist
            </h1>
          </div>
          <div className="w-full lg:w-2/5 lg:pt-16">
            <p className="reveal text-sm md:text-base text-white/80 leading-relaxed font-light">
              I architect ecosystems where physical environments and generative AI intersect. With an M.Des in Immersive Media Design, I treat every interface as a spatial challenge—moving beyond screens to build scalable, zero-learning-curve products. I don't just design screens; I map logic. My background allows me to bridge cognitive psychology with high-fidelity technical execution. Whether building projection-mapped AR experiences for public sector infrastructure or structuring logic gates for AI-integrated XR learning, my focus is always on human performance and systemic scalability.
            </p>
          </div>
        </div>

        {/* Big Hero Image */}
        <div className="reveal mt-20 w-full aspect-[21/9] rounded-xl overflow-hidden border border-white/5 bg-stone-900 shadow-2xl">
          <img 
            src="/about/abstract_hero.png" 
            alt="Abstract AI Landscape" 
            className="w-full h-full object-cover opacity-80" 
          />
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative" onMouseMove={handleMouseMove}>
        <h4 className="reveal-scroll text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 mb-16">Professional Timeline</h4>
        
        <div className="space-y-0" onMouseLeave={() => setHoveredTimelineImage(null)}>
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              onMouseEnter={() => setHoveredTimelineImage(item.image)}
              className="reveal-scroll border-t border-white/5 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-lg cursor-default"
            >
              <div className="md:col-span-3 text-[11px] font-bold tracking-widest text-white/30 pt-1">
                {item.year}
              </div>
              <div className="md:col-span-6">
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight relative z-10">{item.title}</h3>
              </div>
              <div className="md:col-span-3 text-right">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/20">
                  {item.company}
                </span>
              </div>
            </div>
          ))}
          <div className="border-t border-white/5"></div>
        </div>

        {/* Hover Image */}
        <AnimatePresence>
          {hoveredTimelineImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="fixed pointer-events-none z-[100] w-64 h-48 rounded-xl overflow-hidden shadow-2xl border border-white/10"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img src={hoveredTimelineImage} alt="Work preview" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Competencies */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <h4 className="reveal-scroll text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 mb-16 text-center">Competencies</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competencies.map((comp, index) => (
            <div key={index} className="reveal-scroll p-8 bg-stone-900/40 border border-white/5 rounded-2xl flex flex-col gap-6 hover:border-white/10 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                {comp.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wider mb-3 uppercase">{comp.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{comp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* System Calibration: Life & Performance */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <h4 className="reveal-scroll text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 mb-20 text-center">System Calibration: Life & Performance</h4>
        
        <div ref={galleryRef} className="relative h-[800px] flex items-center justify-center bg-[#050505] rounded-[60px] border border-white/5 shadow-inner">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 text-sm md:text-base text-white/30 text-center max-w-xl font-light pointer-events-none select-none uppercase tracking-[0.2em] leading-loose">
            The best systems are built by those who explore multiple disciplines. Outside of design, I focus on human performance through physical training and high-altitude exploration. This intersection of physical endurance and technical rigor defines my design process.
          </p>
          
          <div className="relative w-full h-full flex items-center justify-center">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i} 
                drag
                dragConstraints={galleryRef}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                initial={{ 
                    x: img.x, 
                    y: img.y, 
                    rotate: img.rotate,
                    opacity: 0 
                }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                className="absolute w-60 md:w-72 aspect-[3/4] rounded-2xl border-4 border-white/5 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-stone-900 group"
              >
                <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none select-none" 
                />
                <div className="absolute bottom-4 left-4 text-[9px] font-bold tracking-[0.3em] uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
                  {img.alt}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hint for dragging */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[9px] font-bold tracking-widest text-white/20 uppercase animate-pulse">
             <span>Click + Drag to reorder logic</span>
          </div>
        </div>
      </section>

      {/* Embedded Music Block */}
      <section className="py-20 px-6 md:px-12 w-full overflow-hidden">
        <VinylPlayer />
      </section>

      {/* Interaction Lab */}
      <section className="py-40 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="reveal-scroll p-12 bg-[#0A0A0A] border border-white/5 rounded-[40px] flex flex-col md:flex-row gap-16 items-center group hover:border-white/10 transition-all duration-700">
          <div className="w-full md:w-1/2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-500">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Interaction Lab</h2>
            <p className="text-white/40 text-base leading-relaxed mb-12 max-w-md font-light">
              Experience the intersection of digital identity and spatial interaction. Trigger the interactive Lab-Cam to capture a high-fidelity snapshot within this system.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 shadow-2xl flex items-center gap-3"
            >
              Open Lab-Cam
              <MoveRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full md:w-1/2 aspect-square bg-stone-950/50 rounded-[32px] border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-blue-500/20 transition-colors duration-700">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
                {/* Visual grid/pattern */}
                <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
             </div>
             
             {/* Dynamic Scan Line */}
             <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 h-1/2 w-full -translate-y-full group-hover:animate-scan pointer-events-none"></div>

             <div className="relative z-10 w-3/4 h-3/4 border border-white/5 rounded-3xl flex flex-col items-center justify-center gap-6 text-white/10 group-hover:text-white/20 transition-colors">
                <div className="relative">
                   <Camera className="w-16 h-16" />
                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500/40 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Camera Standby</span>
                   <span className="text-[8px] font-mono opacity-50 tracking-widest">SYS.CAPTURE_MODE: ACTIVE</span>
                </div>
             </div>

             {/* Corner Details */}
             <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/20"></div>
             <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20"></div>
             <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/20"></div>
             <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/20"></div>
          </div>
        </div>
      </section>

      {/* Modal for Interaction Lab */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Interaction Lab: Spatial Capture"
      >
        <PolaroidModule />
      </Modal>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold tracking-widest uppercase">Shubh Design</span>
          </div>
          
          <div className="flex items-center gap-12">
            {[
              { label: "LinkedIn", icon: <Globe className="w-4 h-4" />, href: "#" },
              { label: "Behance", icon: <Share2 className="w-4 h-4" />, href: "#" },
              { label: "Instagram", icon: <Globe className="w-4 h-4" />, href: "#" },
            ].map((link, i) => (
              <a key={i} href={link.href} className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-[10px] font-bold tracking-widest uppercase text-white/20">
            © 2026 SHUBH DESIGN. BUILT FOR THE SPATIAL WEB.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes music-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-music-bar {
          animation: music-bar 1.5s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
