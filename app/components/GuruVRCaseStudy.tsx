"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Info, 
  Cpu, 
  Search, 
  BookOpen, 
  Layers, 
  Bot, 
  Coins, 
  Box
} from "lucide-react";

interface Section {
  id: string;
  navLabel: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "project-overview",
    navLabel: "Project Overview",
    label: "Project Overview",
    title: "Project Overview",
    icon: <Info size={16} />,
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Indian engineering education suffers from a severe disconnect between theoretical lectures and practical application. During my 5-month tenure with FireBirdVR, I was tasked with conceptualizing GuruVR Metaversity—an XR-first immersive educational platform. The objective was to eliminate passive learning by building a scalable ecosystem where students don't just memorize concepts, but physically interact with them.
        </p>
        <div className="w-full mt-12">
          <img src="/guruvr/hero.png" alt="GuruVR Metaversity Gate / 3D Campus Wide Shot" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "scope-stack",
    navLabel: "Scope & Stack",
    label: "Scope & Stack",
    title: "Scope & Stack",
    icon: <Cpu size={16} />,
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          <span className="font-bold text-white/90">Role:</span> XR Design Intern (FireBirdVR)<br/>
          <span className="font-bold text-white/90">Focus:</span> Cross-Platform UX Architecture, AI Agent Integration, Spatial Interaction Design, Gamification Strategy.<br/>
          <span className="font-bold text-white/90">Core Framework:</span> Developed the proprietary CLPE-A Model to scaffold cognitive load in XR.
        </p>
        <div className="w-full mt-8">
          <img src="/guruvr/scope.png" alt="Team photo or branding style guide" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "systemic-research",
    navLabel: "Systemic Research",
    label: "Systemic Research",
    title: "Systemic Research",
    icon: <Search size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          To validate our assumptions, I conducted a structured quantitative study with 92 engineering students. The data revealed a massive opportunity: over 85% had never used XR in academics, yet 91% agreed that hands-on learning drastically improves retention. I synthesized qualitative insights using affinity mapping, revealing two friction points: students desired real-time visual experimentation, while faculty feared the technical learning curve.
        </p>
        <div className="w-full mt-8">
          <img src="/guruvr/research.png" alt="Survey Graphs and Affinity Map Board" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "clpe-a-framework",
    navLabel: "CLPE-A Framework",
    label: "CLPE-A Framework",
    title: "The CLPE-A Framework",
    icon: <BookOpen size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          To manage cognitive load in VR, I helped develop the proprietary CLPE-A pedagogical model. Every spatial module is strictly scaffolded through five phases: Concept, Learning, Practice, Experiment, and Assessment. This ensures the technology serves the curriculum, not the other way around.
        </p>
        <div className="w-full mt-8">
          <img src="/guruvr/clpe.png" alt="CLPE-A Circular Diagram" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "ecosystem-architecture",
    navLabel: "Ecosystem Architecture",
    label: "Ecosystem Architecture",
    title: "Ecosystem Architecture",
    icon: <Layers size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Instead of a monolithic application, I architected user-specific mind maps and dynamic routing for four distinct systemic nodes. Students access gamified learning pathways, faculty monitor real-time analytics and assign tasks, creators upload 3D modules, and corporates sponsor content.
        </p>
        <div className="w-full mt-8">
          <img src="/guruvr/architecture.png" alt="Multi-Role Dashboard Flow Diagram / Mind Map" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "ai-integration",
    navLabel: "AI Integration: Gyaanix",
    label: "AI Integration: Gyaanix",
    title: "AI Integration: Gyaanix",
    icon: <Bot size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          A spatial ecosystem requires intelligent, contextual guidance. I integrated "Gyaanix," an in-world, voice-driven AI assistant. Summonable via a wrist-tap gesture, Gyaanix reads the user's current environment to provide spatial hints and clarify abstract engineering concepts without breaking immersion.
        </p>
        <div className="w-full mt-8">
          <img src="/guruvr/gyaanix.png" alt="Gyaanix Robot UI and Voice Prompt Interaction" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "gamification-economy",
    navLabel: "Gamification Economy",
    label: "Gamification Economy",
    title: "Gamification Economy",
    icon: <Coins size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          To drive long-term retention, I architected a systemic gamification loop. This utilizes 'GuruCoins' (in-platform currency), XP-based leveling, milestone badges, and daily streaks to build a competitive and rewarding learning habit.
        </p>
        <div className="w-full mt-8">
          <img src="/guruvr/gamification.png" alt="Reward System UI / Dashboard" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "spatial-execution",
    navLabel: "Spatial Execution (XR)",
    label: "Spatial Execution (XR)",
    title: "Spatial Execution (XR)",
    icon: <Box size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          To prove the platform's efficacy, I led the spatial design of the flagship module: "Logic Gates Mystery Island". I mapped abstract digital electronics (AND, OR, XOR gates) onto physical, puzzle-based interactions within virtual temples. By wrapping the learning outcomes in a survival narrative, we successfully bypassed traditional educational friction.
        </p>
        <div className="w-full mt-8">
          <img src="/guruvr/spatial.png" alt="VR Logic Gates Environment & Hand Tracking UI" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
];

export default function GuruVRCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", 
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-transparent overflow-clip relative selection:bg-white/30 font-sans">
      {/* Background Glowing Blobs matching Zoo project */}
      <div className="fixed w-[809px] h-[809px] left-[-20vw] top-[-10vh] origin-top-left -rotate-[17deg] opacity-50 bg-gradient-to-b from-blue-600 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] left-[10vw] bottom-[-20vh] origin-top-left rotate-[60deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 text-lg font-medium tracking-wide text-white/90 hover:text-white transition-colors">
            Home
          </Link>
          <div className="flex gap-8">
            <span className="text-lg tracking-wide font-normal text-white/70 cursor-pointer hover:text-white transition-colors">Work</span>
            <span className="text-lg tracking-wide font-normal text-white/70 cursor-pointer hover:text-white transition-colors">About</span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pt-40 pb-40 flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* Left Sidebar (ScrollSpy) */}
        <div className="w-full lg:w-[250px] flex-shrink-0 sticky top-40 self-start">
          <nav className="flex flex-col gap-4">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className="group flex items-center gap-4 py-2"
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {/* Using Icon as requested, but styling it to match the dot style */}
                    <div 
                      className={`
                        transition-all duration-300
                        ${isActive ? "text-white scale-110" : "text-white/40 group-hover:text-white/80 scale-100"}
                      `}
                    >
                      {section.icon}
                    </div>
                  </div>
                  <span 
                    className={`
                      text-base tracking-wide transition-all duration-300
                      ${isActive ? "font-bold text-white opacity-100" : "font-medium text-white/60 group-hover:text-white/90"}
                    `}
                  >
                    {section.navLabel}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[706px] max-w-full">
          {/* Header Section */}
          <div className="mb-24">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
              GuruVR Metaversity
            </h1>
            <p className="text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-12">
              An XR-first immersive educational platform conceptualized during my 5-month tenure with FireBirdVR.
            </p>
            <div className="w-full">
              <img src="/guruvr/hero.png" alt="GuruVR Metaversity Hero" className="w-full h-auto rounded-lg object-cover" />
            </div>
          </div>

          {/* Sections Content */}
          <div className="flex flex-col gap-24">
            {sections.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32"
              >
                <div className="mb-8">
                  <h2 className="text-sm tracking-widest uppercase text-white/50 font-semibold mb-2">
                    {section.label}
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                    {section.title}
                  </h3>
                </div>
                {section.content}
              </section>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
