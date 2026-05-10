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
  Share2,
  Download,
  Brain
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

const styles = {
  gradientCircleOne: {
    background: "linear-gradient(90deg, rgba(24,103,237,1) 0%, rgba(210,29,83,0.967) 100%)",
    transform: "translate(-30%,-30%) rotate(45deg)",
  },
  gradientCircleTwo: {
    right: "0px",
    top: "100vh",
    background: "linear-gradient(90deg, rgba(24,103,237,1) 0%, rgba(210,29,83,0.967) 100%)",
    transform: "translate(30%,-80%) rotate(45deg)",
  },
  gradientCircleThree: {
    left: "0px",
    bottom: "20vh",
    background: "linear-gradient(90deg, rgba(24,103,237,1) 0%, rgba(210,29,83,0.967) 100%)",
    transform: "translate(-56%,0%) rotate(45deg)",
  },
};

const timelineData = [
  { year: "2026 — PRESENT", title: "XR & AI Consultant", company: "Varahe Analytics", image: "/about/abstract_hero.png" },
  { year: "JAN 2025 – JUN 2025", title: "XR Designer", company: "FireBirdVR", image: "/about/mountain.png" },
  { year: "OCT 2020 – OCT 2022", title: "UI/UX Designer", company: "Web Impact Software Solutions", image: "/about/fitness.png" },
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
  { src: "/about/triumph.png", alt: "Expedition", x: -140, y: -60, rotate: -8 },
  { src: "/about/mountain.png", alt: "Mountain", x: 110, y: 100, rotate: 5 },
  { src: "/about/fitness.png", alt: "Obsidian", x: 180, y: -90, rotate: -4 },
  { src: "/about/travel.png", alt: "Trekking", x: -150, y: 90, rotate: 6 },
];

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [hoveredTimelineImage, setHoveredTimelineImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zIndices, setZIndices] = useState(galleryImages.map((_, i) => i + 10));

  const bringToFront = (index: number) => {
    const newZIndices = [...zIndices];
    const maxZ = Math.max(...newZIndices, 10);
    newZIndices[index] = maxZ + 1;
    setZIndices(newZIndices);
  };

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
    <main ref={containerRef} className="w-full overflow-hidden relative text-stone-950 dark:text-white px-6 min-h-screen transition-colors duration-300">
      
      {/* Background Gradients from Home Page */}
      <div
        style={styles.gradientCircleOne}
        className="w-120 h-120 rounded-full blur-3xl opacity-30 absolute z-0"
      ></div>
      <div
        style={styles.gradientCircleTwo}
        className="w-200 h-200 rounded-full blur-3xl opacity-20 absolute z-0"
      ></div>
      <div
        style={styles.gradientCircleThree}
        className="w-200 h-200 rounded-full blur-3xl opacity-20 absolute z-0"
      ></div>

      <div className="max-w-300 mx-auto z-10 relative">
        
        {/* Hero Section */}
        <section className="pt-48 pb-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-3/5">
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-blue-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-6"
              >
                About Me ↘
              </motion.h4>
              <h1 className="reveal text-5xl sm:text-6xl lg:text-7xl font-bold mb-10 leading-[1.1] tracking-tight">
                Shubhanshu <span className="text-white/20 dark:text-white/20">Sahu</span>
              </h1>
              <p className="reveal text-lg md:text-xl text-stone-600 dark:text-white/60 leading-relaxed font-light max-w-2xl mb-12">
                I architect ecosystems where physical environments and generative AI intersect. With an M.Des in Immersive Media Design, I treat every interface as a spatial challenge—moving beyond screens to build scalable, zero-learning-curve products.
              </p>
              <div className="reveal flex items-center gap-6">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-stone-800 overflow-hidden shadow-xl">
                       <img src={`/about/${['triumph', 'mountain', 'fitness', 'travel'][i-1]}.png`} className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
                <p className="text-xs font-bold tracking-widest text-stone-400 dark:text-white/40 uppercase">Spatial Designer & Builder</p>
              </div>
            </div>
            <div className="w-full lg:w-2/5">
              <div className="reveal relative group" data-cursor-tag="Sanky">
                <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-stone-950 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                   <img 
                    src="/about/abstract_hero.png" 
                    alt="Shubhanshu Hero" 
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Timeline */}
        <section className="py-32 relative" onMouseMove={handleMouseMove}>
          <h4 className="reveal-scroll text-[11px] font-bold tracking-[0.3em] uppercase text-stone-400 dark:text-white/40 mb-16">Professional Timeline</h4>
          
          <div className="space-y-2" onMouseLeave={() => setHoveredTimelineImage(null)}>
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                onMouseEnter={() => setHoveredTimelineImage(item.image)}
                className="reveal-scroll group relative flex items-center justify-between py-6 px-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-white/5 cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-colors overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                    <p className="text-xs font-bold tracking-widest text-stone-400 dark:text-white/20 uppercase mt-1">{item.company}</p>
                  </div>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest text-stone-400 dark:text-white/40 uppercase group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
                  {item.year}
                </div>
              </div>
            ))}
          </div>

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
        <section className="py-20">
          <h4 className="reveal-scroll text-[11px] font-bold tracking-[0.3em] uppercase text-stone-400 dark:text-white/40 mb-16 text-center">Competencies</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competencies.map((comp, index) => (
              <div key={index} className="reveal-scroll p-8 bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl flex flex-col gap-6 hover:border-white/10 transition-all group shadow-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {comp.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wider mb-3 uppercase">{comp.title}</h4>
                  <p className="text-xs text-stone-500 dark:text-white/50 leading-relaxed">{comp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Calibration: Beyond the Pixels */}
        <section className="py-32 overflow-hidden">
        <h4 className="reveal-scroll text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500 mb-16 text-center">Beyond the Pixels</h4>
        
        <div ref={galleryRef} className="relative h-[400px] md:h-[650px] flex items-center justify-center bg-surface/40 backdrop-blur-md rounded-[40px] border border-white/5 shadow-2xl group/gallery overflow-hidden">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] text-sm md:text-xl text-white text-center max-w-2xl font-normal pointer-events-none select-none tracking-tight leading-relaxed opacity-100">
              The best systems are built by those who explore multiple disciplines. Outside of design, I focus on human performance through physical training and high-altitude exploration.
            </p>
            
            <div className="relative w-full h-full flex items-center justify-center">
              {galleryImages.map((img, i) => (
                <motion.div 
                  key={i} 
                  drag
                  dragConstraints={galleryRef}
                  dragElastic={0}
                  dragMomentum={true}
                  onDragStart={() => bringToFront(i)}
                  onTapStart={() => bringToFront(i)}
                  whileDrag={{ scale: 1.05, rotate: 0 }}
                  whileTap={{ scale: 1.02 }}
                  initial={{ x: img.x, y: img.y, rotate: img.rotate, opacity: 0 }}
                  animate={{ opacity: 1, zIndex: zIndices[i] }}
                  transition={{ opacity: { delay: i * 0.1 + 0.5, duration: 0.8 }, zIndex: { duration: 0 }, default: { type: "spring", stiffness: 300, damping: 30 } }}
                  style={{ zIndex: zIndices[i] }}
                  data-cursor-tag="Drag"
                  className="absolute w-48 sm:w-56 md:w-64 aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing group origin-center"
                >
                  <div className="w-full h-full relative rounded-[40px] overflow-hidden bg-stone-900">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 pointer-events-none select-none rounded-[40px]" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                      <div className="absolute bottom-6 left-6">
                         <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center shadow-2xl">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{img.alt}</span>
                         </div>
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[9px] font-bold tracking-[0.3em] text-white/60 uppercase animate-pulse">
               <div className="w-1 h-1 rounded-full bg-blue-500"></div>
               <span>Drag to rearrange snapshots</span>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-40 hover:opacity-100 transition-opacity duration-1000">
             {['Figma', 'Spline', 'Three.js', 'Next.js', 'Unity', 'Python'].map(tool => (
               <div key={tool} className="flex flex-col items-center gap-3 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-surface/60 backdrop-blur-sm border border-white/5 flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-500 group-hover:-translate-y-1">
                     <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-500 transition-colors"></div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 dark:text-white/40 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">{tool}</span>
               </div>
             ))}
          </div>
        </section>

        {/* Music Block */}
        <section className="py-20 w-full overflow-hidden">
          <VinylPlayer />
        </section>

        {/* Interaction Lab */}
        <section className="py-40">
          <div className="reveal-scroll p-12 bg-surface/40 backdrop-blur-md border border-white/5 rounded-[40px] flex flex-col md:flex-row gap-16 items-center group hover:border-white/10 transition-all duration-700 shadow-2xl">
            <div className="w-full md:w-1/2">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Interaction Lab</h2>
              <p className="text-stone-500 dark:text-white/40 text-base leading-relaxed mb-12 max-w-md font-light">
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
            
            <div className="w-full md:w-1/2 flex items-center justify-center relative perspective-1000">
              <motion.div 
                 initial={{ rotate: 4 }}
                 whileHover={{ rotate: 0, scale: 1.05 }}
                 className="w-64 md:w-72 aspect-[3/4] bg-stone-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-3xl border border-white/10 origin-center cursor-pointer transition-all duration-500 flex flex-col overflow-hidden group/lab"
                 data-cursor-tag="lab identity"
              >
                 <div className="w-full flex-1 bg-[#0a0a0a] relative overflow-hidden flex items-end justify-center transition-transform duration-700 group-hover/lab:scale-110">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="w-24 h-24 bg-[#050505] rounded-t-[60px] relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-14 bg-[#050505] rounded-[24px]"></div>
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-gradient-to-t from-black to-transparent">
                    <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase font-sans">System Model v.01</span>
                    <button className="text-white/20 hover:text-white transition-colors">
                       <Download className="w-4 h-4" />
                    </button>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Interaction Lab: Spatial Capture">
        <PolaroidModule />
      </Modal>

      <footer className="py-20 border-t border-white/5">
        <div className="max-w-300 mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold tracking-widest uppercase">Shubh Design</span>
          </div>
          <div className="flex items-center gap-12">
            {[{ label: "LinkedIn", icon: <Globe className="w-4 h-4" /> }, { label: "Behance", icon: <Share2 className="w-4 h-4" /> }, { label: "Instagram", icon: <Globe className="w-4 h-4" /> }].map((link, i) => (
              <a key={i} href="#" className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-stone-400 dark:text-white/40 hover:text-stone-900 dark:hover:text-white transition-colors">
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-stone-300 dark:text-white/20 text-center">
            © 2026 SHUBH DESIGN. BUILT FOR THE SPATIAL WEB.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes vinylSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .vertical-text { writing-mode: vertical-lr; transform: rotate(180deg); }
      `}</style>
    </main>
  );
}
