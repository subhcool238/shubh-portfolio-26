"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  image: string;
  x: number;
  y: number;
}

interface Category {
  id: string;
  name: string;
  projects: Project[];
  x: number;
  y: number;
}

const CATEGORIES: Category[] = [
  {
    id: "prototypes",
    name: "Prototypes",
    x: 400,
    y: 400,
    projects: [
      { id: "p1", title: "Glass UI", image: "/playground/prototypes.png", x: -300, y: -250 },
      { id: "p2", title: "Motion Lab", image: "/playground/prototypes.png", x: 400, y: -150 },
    ],
  },
  {
    id: "live-sites",
    name: "Live Sites",
    x: 1800,
    y: 600,
    projects: [
      { id: "ls1", title: "E-comm", image: "/playground/live.png", x: -350, y: -200 },
    ],
  },
  {
    id: "projection",
    name: "Projection Mapping",
    x: 1200,
    y: 1500,
    projects: [
      { id: "pm1", title: "Urban Light", image: "/playground/projection.png", x: -400, y: 150 },
    ],
  },
  {
    id: "branding",
    name: "Branding",
    x: 500,
    y: 2200,
    projects: [
      { id: "b1", title: "Identity", image: "/playground/branding.png", x: 300, y: -250 },
    ],
  },
  {
    id: "vr",
    name: "VR",
    x: 2500,
    y: 2200,
    projects: [
      { id: "vr1", title: "Quest App", image: "/playground/vr.png", x: -250, y: -350 },
    ],
  },
  {
    id: "ar",
    name: "AR",
    x: 1400,
    y: 2800,
    projects: [
      { id: "ar1", title: "Spatial UI", image: "/playground/ar.png", x: -300, y: -150 },
    ],
  },
];

const TILE_SIZE = 3000;

function Universe({ hoveredCategory, setHoveredCategory }: { 
  hoveredCategory: string | null, 
  setHoveredCategory: (id: string | null) => void 
}) {
  return (
    <>
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="absolute" style={{ left: cat.x, top: cat.y }}>
          <div
            onMouseEnter={() => setHoveredCategory(cat.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="relative z-50 group cursor-pointer"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.6em] text-white/5 group-hover:text-white transition-all duration-700 uppercase whitespace-nowrap">
              {cat.name}
            </h2>
            <div className={`absolute -bottom-2 left-0 w-full h-[1px] bg-white/20 transition-all duration-700 ${hoveredCategory === cat.id ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          {cat.projects.map((proj) => (
            <div key={proj.id} className="absolute z-40" style={{ left: proj.x, top: proj.y, transform: 'translate(-50%, -50%)' }}>
              <motion.div
                animate={{
                  opacity: hoveredCategory === cat.id ? 1 : 0.3,
                  scale: hoveredCategory === cat.id ? 1 : 0.85,
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative group/proj w-52 h-52 md:w-64 md:h-64 rounded-[40px] overflow-hidden border border-white/5 backdrop-blur-3xl bg-white/[0.01] shadow-2xl transition-all duration-1000 hover:scale-[1.03] hover:border-white/10">
                  <Image src={proj.image} alt={proj.title} fill className="object-cover opacity-50 group-hover/proj:opacity-100 transition-all duration-1000 filter grayscale group-hover/proj:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover/proj:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">{proj.title}</p>
                  </div>
                </div>

                <svg className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-[-1]">
                  <AnimatePresence>
                    {hoveredCategory === cat.id && (
                      <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.1 }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        x1="800" y1="800" x2={800 - proj.x} y2={800 - proj.y}
                        stroke="white" strokeWidth="0.5" strokeDasharray="12 12"
                        transition={{ duration: 1.2 }}
                      />
                    )}
                  </AnimatePresence>
                </svg>
              </motion.div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default function PlaygroundClient() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  
  const springX = useSpring(panX, { stiffness: 60, damping: 20 });
  const springY = useSpring(panY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    panX.set(-TILE_SIZE / 2);
    panY.set(-TILE_SIZE / 2);
    setIsReady(true);
  }, [panX, panY]);

  const wrapValue = (v: number, min: number, max: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
  };

  const updatePan = (dx: number, dy: number) => {
    const newX = wrapValue(panX.get() + dx, -TILE_SIZE, 0);
    const newY = wrapValue(panY.get() + dy, -TILE_SIZE, 0);
    panX.set(newX);
    panY.set(newY);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      updatePan(-e.deltaX, -e.deltaY);
    };

    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updatePan(e.movementX, e.movementY);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isDragging, panX, panY]);

  if (!isReady) return <div className="w-full h-screen bg-[#050505]" />;

  return (
    <main className="fixed inset-0 bg-[#050505] overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '150px 150px'
        }}
      />

      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute w-[3000px] h-[3000px] pointer-events-auto"
      >
        {/* Render 3x3 grid for infinite seamless looping */}
        {[ -1, 0, 1 ].map((i) => (
          [ -1, 0, 1 ].map((j) => (
            <div key={`${i}-${j}`} className="absolute" style={{ left: i * TILE_SIZE, top: j * TILE_SIZE }}>
              <Universe hoveredCategory={hoveredCategory} setHoveredCategory={setHoveredCategory} />
            </div>
          ))
        ))}
      </motion.div>

      {/* UI Overlay */}
      <div className="fixed top-24 left-10 z-[100]">
        <Link href="/" className="group flex items-center gap-4 text-white/20 hover:text-white transition-all duration-500 uppercase tracking-[0.5em] text-[10px] font-bold">
          <span>←</span> <span>Return</span>
        </Link>
      </div>
    </main>
  );
}
