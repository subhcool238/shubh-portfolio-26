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
  { 
    year: "NOV 2026 — PRESENT", 
    title: "XR Consultant", 
    company: "Varahe Analytics", 
    image: "/company images/Varahe.jpg",
    logo: "/company logos/Varahe Analytics.png"
  },
  { 
    year: "JAN 2025 – JUN 2025", 
    title: "XR Designer", 
    company: "FireBirdVR", 
    image: "/company images/firebird.png",
    logo: "/company logos/firebirdvr.png"
  },
  { 
    year: "OCT 2020 – OCT 2022", 
    title: "UI/UX Designer", 
    company: "Web Impact Software Solutions", 
    image: "/company images/Web_impact.png",
    logo: "/company logos/Web Impact.png"
  },
  { 
    year: "OCT 2018 – OCT 2020", 
    title: "Graphic Designer", 
    company: "Convolution Bikes", 
    image: "/company images/Convolution.png",
    logo: "/company logos/Convolution.png"
  },
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
    description: "Agentic Experience (AX) Design, Advanced Prompt Engineering, Generative AI Workflows.",
  },
  {
    title: "Systems Architecture",
    icon: <Compass className="w-5 h-5 text-blue-500" />,
    description: "Ethnographic Research, Behavioral Mapping, Cross-touchpoint Orchestration.",
  },
];

const AdobeSuiteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM24 22.624V1.376h-9.512l9.512 21.248zM0 1.376v21.248h9.512L0 1.376z"/>
  </svg>
);

const SplineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12ZM10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM13.5 15.5C13.5 16.6046 14.3954 17.5 15.5 17.5C16.6046 17.5 17.5 16.6046 17.5 15.5C17.5 14.3954 16.6046 13.5 15.5 13.5C14.3954 13.5 13.5 14.3954 13.5 15.5Z"/>
  </svg>
);

const TouchDesignerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const techStack = [
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/white" },
  { name: "Spline", customIcon: SplineIcon },
  { name: "Unity", logo: "https://cdn.simpleicons.org/unity/white" },
  { name: "Unreal", logo: "https://cdn.simpleicons.org/unrealengine/white" },
  { name: "Touch Designer", customIcon: TouchDesignerIcon },
  { name: "Adobe Suite", customIcon: AdobeSuiteIcon },
];

const galleryImages = [
  { src: "/about/Obsidian.jpg", alt: "Obsidian", x: -140, y: -60, rotate: -8 },
  { src: "/about/Mountain.jpg", alt: "Mountain", x: 110, y: 100, rotate: 5 },
  { src: "/about/Expedition.jpg", alt: "Expedition", x: 180, y: -90, rotate: -4 },
  { src: "/about/Trekking.jpg", alt: "Trekking", x: -150, y: 90, rotate: 6 },
];

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [hoveredTimelineImage, setHoveredTimelineImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zIndices, setZIndices] = useState(galleryImages.map((_, i) => i + 10));
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);

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
    <main ref={containerRef} className="w-full relative text-stone-950 dark:text-white px-6 min-h-screen transition-colors duration-300">
      
      {/* Background Glowing Blobs */}
      <div className="fixed w-[400px] h-[400px] left-[-10vw] top-[-5vh] origin-top-left -rotate-[17deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      <div className="fixed w-[740px] h-[740px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-20 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-0"></div>

      <FloatingTag text="Sanky" isHovered={isHeroHovered} />
      <FloatingTag text="Drag" isHovered={isAnyCardHovered} />
      <div className="max-w-300 mx-auto z-10 relative">
        
        {/* Hero Section */}
        <section className="pt-[142px] md:pt-48 pb-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-3/5">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase mb-2 md:mb-6 block"
              >
                About Me ↘
              </motion.span>
              <h1 className="reveal text-5xl sm:text-6xl lg:text-8xl font-bold mb-10 leading-[1] tracking-tight">
                Shubhanshu <span className="text-white/20">Sahu</span>
              </h1>
              <p className="reveal text-lg md:text-xl text-stone-600 dark:text-white/60 leading-relaxed font-light max-w-2xl mb-12">
                I architect ecosystems where physical environments and generative AI intersect; M.Des in Immersive Media Design, has taught me to treat every interface as a spatial challenge—moving beyond screens to build scalable, zero-learning-curve products.
              </p>
              <div className="reveal flex items-center gap-6">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-stone-800 overflow-hidden shadow-xl">
                       <img src={`/about/${['Obsidian', 'Mountain', 'Expedition', 'Trekking'][i-1]}.jpg`} className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
                <p className="text-xs font-bold tracking-widest text-stone-400 dark:text-white/40 uppercase">Spatial Designer & Builder</p>
              </div>
            </div>
            <div className="w-full lg:w-2/5">
              <div 
                ref={heroImageRef} 
                className="reveal relative group cursor-none" 
                data-cursor-hide
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
              >
                <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-stone-950 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                   <img 
                    src="/about/Shubhanshu_hero.jpg" 
                    alt="Shubhanshu Hero" 
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative" onMouseMove={handleMouseMove}>
          <span className="reveal-scroll text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2 md:mb-6 block">Professional Timeline</span>
          <h2 className="reveal-scroll text-4xl md:text-5xl font-bold mb-16 tracking-tight">The Journey So Far</h2>
          
          <div className="space-y-2" onMouseLeave={() => setHoveredTimelineImage(null)}>
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                onMouseEnter={() => setHoveredTimelineImage(item.image)}
                className="reveal-scroll group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 py-6 px-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-white/5 cursor-default"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-white border border-white/10 flex items-center justify-center group-hover:border-blue-500/30 transition-colors overflow-hidden relative shadow-sm">
                    <img src={item.logo} className="w-4/5 h-4/5 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors tracking-tight leading-tight sm:leading-none">{item.title}</h3>
                    <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/20 mt-1 sm:mt-2">{item.company}</p>
                  </div>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-400 dark:text-white/40 uppercase group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all self-start sm:self-auto ml-16 sm:ml-0 shrink-0 w-fit">
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
          <span className="reveal-scroll text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2 md:mb-6 block text-center">Competencies</span>
          <h2 className="reveal-scroll text-4xl md:text-5xl font-bold mb-16 tracking-tight text-center">Strategic Toolkit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competencies.map((comp, index) => (
              <div key={index} className="reveal-scroll p-8 bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl flex flex-col gap-6 hover:border-white/10 transition-all group shadow-xl">
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-500 group-hover:scale-110">
                  {comp.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{comp.title}</h3>
                  <p className="text-sm text-stone-500 dark:text-white/50 leading-relaxed font-light">{comp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Calibration: Beyond the Pixels */}
        <section className="pt-32 pb-20 md:py-32">
          <span className="reveal-scroll text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2 md:mb-6 block text-center">Beyond the Pixels</span>
          <h2 className="reveal-scroll text-4xl md:text-5xl font-bold mb-16 tracking-tight text-center">Off The Screen</h2>
          
          <div className="relative group/gallery-wrapper transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.35),0_30px_60px_-30px_rgba(0,0,0,0.4),0_-2px_20px_rgba(255,255,255,0.01)] hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.45)] rounded-[40px]">
          <div ref={galleryRef} className="relative h-[700px] md:h-[650px] flex items-center justify-center bg-surface/40 backdrop-blur-md rounded-[40px] border border-white/5 overflow-hidden">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] text-sm md:text-lg text-white text-center max-w-[90%] md:max-w-2xl font-normal pointer-events-none select-none tracking-tight leading-relaxed opacity-100">
              Screens are where I work — but mountains are where I think. I ride Obsidian, my motorbike, into places with no signal and no plan. Some of my clearest ideas come from the middle of nowhere, halfway up a pass. The patience needed for a long trek is the same patience it takes to architect something that actually lasts.
            </p>
            
            <div className="relative w-full h-full flex items-center justify-center">
              {galleryImages.map((img, i) => (
                <GalleryCard key={i} img={img} i={i} galleryRef={galleryRef} bringToFront={bringToFront} zIndex={zIndices[i]} setAnyHover={setIsAnyCardHovered} />
              ))}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[9px] font-bold tracking-[0.3em] text-white/60 uppercase animate-pulse whitespace-nowrap">
               <div className="w-1 h-1 rounded-full bg-blue-500"></div>
               <span>Drag to rearrange snapshots</span>
            </div>
          </div>
        </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-60 hover:opacity-100 transition-opacity duration-1000">
             {techStack.map(tool => (
               <div key={tool.name} className="flex flex-col items-center gap-3 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden shadow-lg">
                     <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     {tool.logo ? (
                       <img src={tool.logo} alt={tool.name} className="w-7 h-7 object-contain opacity-50 group-hover:opacity-100 transition-all duration-500 z-10" />
                     ) : tool.customIcon ? (
                       <div className="w-7 h-7 opacity-50 group-hover:opacity-100 transition-all duration-500 z-10 text-white flex items-center justify-center">
                         <tool.customIcon />
                       </div>
                     ) : null}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">{tool.name}</span>
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
          <div className="reveal-scroll p-12 bg-surface/40 backdrop-blur-md border border-white/5 rounded-[40px] flex flex-col md:flex-row gap-16 items-center group hover:border-white/10 transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.35),0_30px_60px_-30px_rgba(0,0,0,0.4),0_-2px_20px_rgba(255,255,255,0.01)] hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.45)]">
            <div className="w-full md:w-1/2">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Camera className="w-7 h-7 text-white/80 z-10" />
              </div>

              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2 md:mb-6 block">Spatial Capture</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Interaction Lab</h2>
              <p className="text-stone-500 dark:text-white/40 text-base leading-relaxed mb-12 max-w-md font-light">
                Experience the intersection of digital identity and spatial interaction. Trigger the interactive Lab-Cam to capture a high-fidelity snapshot within this system.
              </p>
              <button 
                onClick={() => {
                  setIsModalOpen(true);
                  window.dispatchEvent(new CustomEvent('stop-all-music'));
                }}
                className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.3em] text-white flex items-center gap-3 active:scale-95 group/btn"
              >
                Open Lab-Cam
                <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
             <div className="w-full md:w-1/2 flex items-center justify-center relative perspective-1000">
              <motion.div 
                 initial={{ rotate: -4, y: 20 }}
                 whileHover={{ rotate: 0, scale: 1.05, y: 0 }}
                 className="w-64 md:w-72 aspect-[3.5/4.5] bg-white p-4 pb-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] rounded-sm origin-center cursor-pointer transition-all duration-500 flex flex-col relative group/lab"
                 data-cursor-tag="lab identity"
              >
                 <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center transition-transform duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-rose-500/10"></div>
                    <Camera className="w-12 h-12 text-white/10 group-hover/lab:scale-110 transition-transform duration-700" />
                    
                    {/* Gloss effect */}
                    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -rotate-45 transition-all duration-1000 group-hover/lab:left-[100%]"></div>
                 </div>
                 
                 <div className="absolute bottom-3 left-0 w-full text-center">
                    <span className="text-[9px] font-medium text-black/20 tracking-[0.4em] uppercase font-mono">Capture System v.01</span>
                 </div>
              </motion.div>
              
              {/* Secondary offset frame for depth */}
              <div className="absolute w-64 md:w-72 aspect-[3.5/4.5] bg-white/5 border border-white/10 rounded-sm -z-10 rotate-6 translate-x-4 translate-y-2 blur-[1px]"></div>
            </div>
          </div>
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Interaction Lab: Spatial Capture">
        <PolaroidModule />
      </Modal>

      <style jsx global>{`
        @keyframes vinylSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .vertical-text { writing-mode: vertical-lr; transform: rotate(180deg); }
        body:has([data-cursor-hide]:hover) .custom-cursor-element { 
          opacity: 0 !important;
          visibility: hidden !important;
          transition: opacity 0.2s ease, visibility 0.2s ease !important;
        }
      `}</style>
    </main>
  );
}

// Sub-components for Floating Interaction
function FloatingTag({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isHovered) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed pointer-events-none z-[10010]"
          style={{ left: pos.x, top: pos.y, x: "-50%", y: "-50%" }}
        >
          <div className="px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white whitespace-nowrap">
              {text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GalleryCard({ img, i, galleryRef, bringToFront, zIndex, setAnyHover }: any) {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <motion.div 
      drag
      dragConstraints={galleryRef}
      dragElastic={0}
      dragMomentum={true}
      onDragStart={() => { bringToFront(i); setIsDragging(true); }}
      onDragEnd={() => setIsDragging(false)}
      onTapStart={() => bringToFront(i)}
      onMouseEnter={() => setAnyHover(true)}
      onMouseLeave={() => setAnyHover(false)}
      whileDrag={{ scale: 1.05, rotate: 0 }}
      whileTap={{ scale: 1.02 }}
      initial={{ x: img.x, y: img.y, rotate: img.rotate, opacity: 0 }}
      animate={{ opacity: 1, zIndex }}
      transition={{ opacity: { delay: i * 0.1 + 0.5, duration: 0.8 }, zIndex: { duration: 0 }, default: { type: "spring", stiffness: 300, damping: 30 } }}
      style={{ zIndex }}
      className={`absolute w-48 sm:w-56 md:w-64 aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing group origin-center ${isDragging ? 'is-dragging' : ''}`}
      data-cursor-hide
    >
      <div className="w-full h-full relative rounded-[40px] overflow-hidden bg-stone-900">
          <img src={img.src} alt={img.alt} className={`w-full h-full object-cover transition-all duration-1000 pointer-events-none select-none rounded-[40px] ${isDragging ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} />
          <div className={`absolute inset-0 transition-colors duration-700 ${isDragging ? 'bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`}></div>
          <div className="absolute bottom-6 left-6">
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center shadow-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{img.alt}</span>
              </div>
          </div>
      </div>
    </motion.div>
  );
}
