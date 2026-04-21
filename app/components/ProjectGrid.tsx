"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, AppWindow, Home, Plane, Box, BrainCircuit, Glasses, Layers } from "lucide-react";

interface Tag {
  name: string;
  icon: React.ElementType;
}

interface Project {
  id: string;
  title: string;
  tags: Tag[];
  videoUrl: string;
  placeholderColor: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: "flytbase",
    title: "Orchestrating Clarity In Chaos",
    tags: [
      { name: "FlytBase", icon: Building2 },
      { name: "Web App", icon: AppWindow },
      { name: "Drone Tech", icon: Plane },
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with actual WebP/MP4
    placeholderColor: "bg-stone-900",
  },
  {
    id: "guruvr",
    title: "Immersive Learning Ecosystem",
    tags: [
      { name: "GuruVR", icon: Building2 },
      { name: "VR Experience", icon: Glasses },
      { name: "EdTech", icon: Box },
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    placeholderColor: "bg-neutral-900",
  },
  {
    id: "zoosystem",
    title: "Complex Enterprise Architecture",
    tags: [
      { name: "Zoo Systems", icon: Building2 },
      { name: "Web App", icon: AppWindow },
      { name: "System Design", icon: Layers },
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    placeholderColor: "bg-zinc-900",
    link: "/case-study/rgzp",
  },
  {
    id: "samsungprism",
    title: "Intelligence at the Edge",
    tags: [
      { name: "Samsung", icon: Building2 },
      { name: "AI Interface", icon: BrainCircuit },
      { name: "Innovation", icon: Box },
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    placeholderColor: "bg-stone-950",
  },
];

export default function ProjectGrid() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Selected Work</h2>
        <span className="text-gray-400 text-sm tracking-wider">01 // Case Studies</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
        {projects.map((project) => {
          const CardWrapper = project.link ? Link : 'div';
          return (
            <CardWrapper
              key={project.id}
              href={project.link || "#"}
              className="group relative flex flex-col cursor-pointer block"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-cursor-text="View Case Study"
            >
            {/* Image/Video Container */}
            <div className={`relative w-full aspect-[4/3] rounded-sm overflow-hidden ${project.placeholderColor} transition-transform duration-700 ease-out group-hover:scale-[0.98]`}>
              <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              
              <video
                src={project.videoUrl}
                muted
                loop
                playsInline
                className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  hoveredProject === project.id ? "opacity-100" : "opacity-0"
                }`}
                ref={(el) => {
                  if (el) {
                    if (hoveredProject === project.id) {
                      el.play().catch(() => {});
                    } else {
                      el.pause();
                    }
                  }
                }}
              />
            </div>

            {/* Meta Info */}
            <div className="mt-8 flex justify-between items-start">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl md:text-3xl font-bold tracking-wide transition-colors group-hover:text-gray-200">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                  {project.tags.map((tag, index) => {
                    const Icon = tag.icon;
                    return (
                      <span key={index} className="flex items-center gap-2 text-gray-400/80 text-sm font-normal tracking-wide">
                        <Icon className="w-4 h-4 opacity-70" strokeWidth={1.5} />
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded-full bg-white/5 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out hidden lg:block">
                <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </CardWrapper>
        )})}
      </div>
    </section>
  );
}
