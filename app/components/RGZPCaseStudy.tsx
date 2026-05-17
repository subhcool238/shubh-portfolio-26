"use client";

import { useEffect, useState } from "react";
import { 
  BookOpen, Target, User, Palette, Route, Search, Layers, Lightbulb, Rocket, 
  X, ChevronRight, Building2, ShieldAlert, Users, BrainCircuit, Globe, Zap, Heart, Maximize
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Section {
  id: string;
  navLabel: string;
  label: string;
  title: string;
  content: React.ReactNode;
}

const SECTION_ICONS: Record<string, any> = {
  "getting-started": BookOpen,
  "the-challenge": Target,
  "my-role": User,
  "design-tool-kit": Palette,
  "the-process": Route,
  "discover": Search,
  "define": Layers,
  "develop": Lightbulb,
  "deliver": Rocket
};

const ProblemCard = ({ content }: { content: string }) => (
  <div className="my-12 p-10 rounded-2xl border border-rose-500/30 bg-[#0a0a0c] relative overflow-hidden group">
    {/* Watermark Icon */}
    <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-all duration-500">
      <ShieldAlert size={120} className="text-rose-500" strokeWidth={1} />
    </div>
    
    <p className="text-xl md:text-2xl tracking-wide font-normal text-white/90 leading-relaxed relative z-10 italic">
      {content}
    </p>
  </div>
);

const StatBox = ({ value, label, sub, colorClass = "text-white", accent = "border-white/10 bg-white/5" }: { value: string; label: string; sub?: string; colorClass?: string; accent?: string }) => (
  <div className={`p-8 rounded-2xl border ${accent} flex flex-col items-start transition-all duration-300 hover:scale-[1.02] hover:brightness-110 w-full`}>
    <p className={`text-5xl font-bold tracking-tight ${colorClass}`}>{value}</p>
    {sub && <p className="text-xs tracking-wider uppercase text-white/40 mt-4 font-bold">{sub}</p>}
    <p className="text-sm text-white/60 mt-1 font-medium">{label}</p>
  </div>
);

export default function RGZPCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>("getting-started");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sections: Section[] = [
    {
      id: "getting-started",
      navLabel: "Getting Started",
      label: "Project Overview",
      title: "Systems Thinking at RGZP",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            In this project, Ankit and I explored Rajiv Gandhi Zoological Park (RGZP) through a systems thinking framework, recognizing that a zoo is more than just a collection of animals.
          </p>
          <div className="mt-8 p-10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20">
            <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
              Rajiv Gandhi Zoological Park, commonly known as the Rajiv Gandhi Zoo, is a 130-acre zoological park in Pune, Maharashtra. Established in 1999, it serves as a critical hub for conservation and public education.
            </p>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Our Aim</h3>
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            We aim to uncover the intricate relationships that govern a zoo&apos;s functionality, seeking sustainable solutions that benefit both the captive inhabitants and the broader ecosystem.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02]">
              <Globe size={32} className="text-blue-500 mb-6" />
              <h4 className="text-base font-bold text-white mb-2 uppercase tracking-widest">Conservation</h4>
              <p className="text-sm text-white/40 leading-relaxed">Protecting endangered species through breeding and habitat management.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02]">
              <BrainCircuit size={32} className="text-emerald-500 mb-6" />
              <h4 className="text-base font-bold text-white mb-2 uppercase tracking-widest">Education</h4>
              <p className="text-sm text-white/40 leading-relaxed">Spreading awareness about wildlife and ecological balance among visitors.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "the-challenge",
      navLabel: "The Challenge",
      label: "The Challenge",
      title: "The Problem of Perception",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            Despite their importance, zoos are often misunderstood as mere entertainment venues rather than educational and conservationist institutions.
          </p>
          <ProblemCard 
            content="People lack awareness regarding the purpose and significance of zoos — they are seen as static displays rather than living ecosystems."
          />
        </div>
      ),
    },
    {
      id: "my-role",
      navLabel: "My Role",
      label: "My Role",
      title: "Responsibilities",
      content: (
        <div className="space-y-12">
          <p className="text-xl md:text-2xl font-light tracking-wide text-white/80 leading-relaxed">
            As a UX Researcher and Designer, I steered the project through the full double diamond process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Research & Mapping",
                desc: "Conducted research interviews, created visitor journey maps, and designed user personas."
              },
              {
                title: "Ideation",
                desc: "Developed flow diagrams, mind mapping, and brainstormed solutions."
              },
              {
                title: "Physical Prototyping",
                desc: "Designed and laser-cut souvenirs (keychains and badges) using selected durable materials."
              },
              {
                title: "Synthesis",
                desc: "Analyzed findings, empathy mapping, and identifying opportunities to frame a problem statement."
              }
            ].map((role, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]" />
                    <h4 className="text-xl font-bold text-white tracking-tight">{role.title}</h4>
                  </div>
                  <p className="text-lg tracking-wide font-normal text-white/50 leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "design-tool-kit",
      navLabel: "Tool Kit",
      label: "Design Tool Kit",
      title: "Strategic Implements",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full justify-center justify-items-center place-items-center mx-auto">
          {[
            { label: "Figma", desc: "UI/UX & Prototyping", icon: "/Zoo/Figma.png", accent: "border-blue-500/20 bg-blue-500/5", color: "text-blue-400", offset: "translate-x-[5px]" },
            { label: "Miro", desc: "Mind mapping & Ideation", icon: "/Zoo/Miro.png", accent: "border-amber-500/20 bg-amber-500/5", color: "text-amber-400" },
            { label: "PowerPoint", desc: "Presentation & Delivery", icon: "/Zoo/Power Point.png", accent: "border-rose-500/20 bg-rose-500/5", color: "text-rose-400" },
          ].map((tool) => (
            <div key={tool.label} className={`p-10 rounded-[2.5rem] border ${tool.accent} flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] hover:brightness-110 w-full group mx-auto`}>
              <div className="h-16 w-16 flex items-center justify-center mb-8 mx-auto">
                <img src={tool.icon} alt={tool.label} className={`max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ${tool.offset || ""}`} />
              </div>
              <p className={`text-xl font-bold ${tool.color} tracking-tight`}>{tool.label}</p>
              <p className="text-sm text-white/40 mt-2 font-medium">{tool.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "the-process",
      navLabel: "The Process",
      label: "The Process",
      title: "Double Diamond Framework",
      content: (
        <div className="space-y-12">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            We used the Double Diamond Process Model to explore problems deeply and deliver effective solutions.
          </p>
          <div className="space-y-4">
            {[
              { step: "Discover", label: "Gathering insights through understanding zoos, mind mapping, and primary/secondary research.", color: "bg-blue-500" },
              { step: "Define", label: "Analyzing findings, empathy mapping, and identifying opportunities to frame a problem statement.", color: "bg-emerald-500" },
              { step: "Develop", label: "Generating, evaluating, and refining ideas for potential solutions.", color: "bg-amber-500" },
              { step: "Deliver", label: "Validating feasibility, prototyping, and creating proof-of-concepts (POCs).", color: "bg-purple-500" },
            ].map((item, i) => (
              <div key={item.step} className="p-8 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-8 group hover:bg-white/10 transition-all duration-300">
                <div className={`w-12 h-12 flex-shrink-0 rounded-full ${item.color}/10 border border-${item.color}/30 flex items-center justify-center font-mono text-lg font-bold text-white/90`}>
                  0{i + 1}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white/90">{item.step}</h4>
                  <p className="text-base text-white/40 mt-2 leading-relaxed">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="my-16 cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Double Diamond jpg-01 1.png")}>
            <img src="/Zoo/Double Diamond jpg-01 1.png" alt="Double Diamond Diagram" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" />
          </div>
        </div>
      ),
    },
    {
      id: "discover",
      navLabel: "Discover",
      label: "Discover (Research)",
      title: "Immersive Research",
      content: (
        <div className="space-y-12">
          <div className="w-full mb-12 cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Mind Map.png")}>
             <img src="/Zoo/Mind Map.png" alt="Mind Map" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" />
          </div>
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            Multiple visits to RGZP allowed us to interview directors and visitors, uncovering the true operational heart of the zoo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                role: "What's a Zoo?", 
                items: ["Houses animals", "Cares for them", "Displays them to public"], 
                color: "bg-blue-500",
                glow: "rgba(59,130,246,0.3)"
              },
              { 
                role: "Why exist?", 
                items: ["Conservation", "Education", "Research", "Rehabilitation"], 
                color: "bg-emerald-500",
                glow: "rgba(16,185,129,0.3)"
              },
              { 
                role: "How work?", 
                items: ["Habitats", "Breeding", "Workshops"], 
                color: "bg-amber-500",
                glow: "rgba(245,158,11,0.3)"
              },
            ].map((layer, i) => (
              <div key={i} className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02]">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-3 h-3 rounded-full ${layer.color} shadow-[0_0_12px_${layer.glow}]`} />
                    <h4 className="text-lg font-bold text-white/90 tracking-tight">{layer.role}</h4>
                  </div>
                  <ul className="space-y-3">
                    {layer.items.map(item => (
                      <li key={item} className="text-sm text-white/40 font-medium flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="my-16 cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Feedback Loop-01 1.png")}>
             <img src="/Zoo/Feedback Loop-01 1.png" alt="Feedback Loop" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" />
          </div>
        </div>
      ),
    },
    {
      id: "define",
      navLabel: "Define",
      label: "Synthesis",
      title: "Classification & Insights",
      content: (
        <div className="space-y-32">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Management Architecture</h3>
            <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Zoo management.svg")}>
              <img src="/Zoo/Zoo management.svg" alt="Zoo Management Diagram" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Visitor Typology</h3>
            <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Visitors journey Map.png")}>
              <img src="/Zoo/Visitors journey Map.png" alt="Types of Visitors" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Visitor Journey Map</h3>
            <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/vistors journey map.svg")}>
              <img src="/Zoo/vistors journey map.svg" alt="Visitors Journey Map" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">User Personas</h3>
            <div className="flex flex-col gap-12">
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Haresh Persona.png")}>
                <img src="/Zoo/Haresh Persona.png" alt="User Persona Haresh" className="w-full h-auto rounded-3xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Abhishek Baccha.png")}>
                <img src="/Zoo/Abhishek Baccha.png" alt="User Persona Abhishek" className="w-full h-auto rounded-3xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Iceberg Model</h3>
            <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Iceberb Model.png")}>
              <img src="/Zoo/Iceberb Model.png" alt="Iceberg Model" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "develop",
      navLabel: "Develop",
      label: "Ideation",
      title: "Solutions Matrix",
      content: (
        <div className="space-y-12">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            We generated a variety of potential solutions to enhance the visitor experience and meet educational goals.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Digital Signages", desc: "Interactive boards to provide dynamic information about exhibited animals.", color: "bg-blue-500" },
              { title: "AR Experiences", desc: "Augmented Reality on signages, exhibits, and interactive booths.", color: "bg-emerald-500" },
              { title: "Smart Dustbins", desc: "Gamified disposal — throwing garbage triggers rewarding animations.", color: "bg-amber-500" },
              { title: "VR Workshops", desc: "Virtual reality integration for events and educational workshops.", color: "bg-purple-500" },
              { title: "Interactive Maps", desc: "AR guides allowing visitors to start a personalized zoo journey.", color: "bg-rose-500" },
              { title: "Engaging Media", desc: "4D Movies about the Animal Kingdom and interactive games.", color: "bg-indigo-500" },
              { title: "DIY Kit", desc: "Educational kits for kids to learn about wildlife at home.", color: "bg-cyan-500" },
              { title: "Badge & Keychain", desc: "Collectible souvenirs representing different animals.", color: "bg-orange-500" },
              { title: "AR Photobooth", desc: "Capture memories with virtual animals in the zoo.", color: "bg-pink-500" },
            ].map((item) => (
              <div key={item.title} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01]">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_12px_rgba(255,255,255,0.2)]`} />
                  <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                </div>
                <p className="text-base text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "deliver",
      navLabel: "Deliver",
      label: "Solutions",
      title: "Final Implementation",
      content: (
        <div className="space-y-32">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            The final deliverables included a monthly drawing competition, a prototype for the RGZP App, and an AR Mascot for interactive navigation.
          </p>

          <div className="space-y-12">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Drawing Competition</h3>
            <div className="flex flex-col gap-8">
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Ticket Design-01 1.png")}>
                <img src="/Zoo/Ticket Design-01 1.png" alt="Ticket Design 1" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Ticket Design-02 1.png")}>
                <img src="/Zoo/Ticket Design-02 1.png" alt="Ticket Design 2" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Unique Themed QR Codes</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Unique Themed QR Code 1.png")}>
                <img src="/Zoo/Unique Themed QR Code 1.png" alt="QR Code 1" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Unique Themed QR Code 2.png")}>
                <img src="/Zoo/Unique Themed QR Code 2.png" alt="QR Code 2" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
            </div>
          </div>

          <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">RGZP Mascot - Tigo</h3>
            <p className="text-xl font-normal text-white/50 mb-12 max-w-xl mx-auto">
              A playful guide who helps visitors navigate the zoo via AR maps.
            </p>
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <img src="/Zoo/TIgo 1.png" alt="Mascot Tigo" className="relative z-10 w-full max-w-[350px] h-auto object-contain mx-auto drop-shadow-[0_0_50px_rgba(249,115,22,0.3)] transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">DIY Kit</h3>
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/DIY Kit.png")}>
                <img src="/Zoo/DIY Kit.png" alt="DIY Kit" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Badge & Keychain</h3>
              <div className="cursor-zoom-in group" onClick={() => setSelectedImage("/Zoo/Badge & Keychain 1.png")}>
                <img src="/Zoo/Badge & Keychain 1.png" alt="Badge and Keychain" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center">RGZP App Prototype</h3>
            <div className="flex flex-col items-center gap-6">
              <div className="relative overflow-hidden rounded-[3.5rem] bg-black/40 border border-white/10 w-[90%] sm:w-full max-w-[320px] md:max-w-[448px] aspect-[1/1.94] shadow-[0_0_80px_rgba(0,0,0,0.5)] mx-auto">
                <iframe
                  className="absolute border-none md:top-[-5.5%] md:left-[-11%] md:w-[122%] md:h-[111%] top-[-2%] left-[-4%] w-[108%] h-[104%]"
                  src="https://embed.figma.com/proto/j4iV2AqoFHSJuVY1MZb2lr/Zoo-Adventure-AR?node-id=23-2&p=f&viewport=251%2C395%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=23%3A2&page-id=0%3A1&embed-host=share"
                  allowFullScreen
                />
              </div>
              <a 
                href="https://www.figma.com/proto/j4iV2AqoFHSJuVY1MZb2lr/Zoo-Adventure-AR?node-id=23-2&p=f&viewport=251%2C395%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=23%3A2&page-id=0%3A1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Maximize size={16} />
                Open Fullscreen
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
               <div className="p-8 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/5 transition-all duration-500 hover:scale-[1.01] hover:bg-blue-500/10">
                  <h4 className="text-xl font-bold tracking-tight mb-4 text-blue-400">Zoo Adventure AR</h4>
                  <p className="text-base text-white/50 leading-relaxed font-medium">
                    An interactive game combining AR and photography. Play quizzes to unlock AR animals and earn stamps.
                  </p>
               </div>
               <div className="p-8 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 transition-all duration-500 hover:scale-[1.01] hover:bg-emerald-500/10">
                  <h4 className="text-xl font-bold tracking-tight mb-4 text-emerald-400">Interactive Map</h4>
                  <p className="text-base text-white/50 leading-relaxed font-medium">
                    Navigate efficiently with 'TIGO' guiding visitors and sharing wildlife facts in real-time.
                  </p>
               </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -40% 0px", 
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
      setActiveSection(id);
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-transparent overflow-clip relative selection:bg-white/30 font-sans">
      {/* Background Glowing Blobs - Hidden on mobile */}
      <div className="fixed hidden md:block w-[400px] h-[400px] left-[-10vw] top-[-5vh] origin-top-left -rotate-[17deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[60s]"></div>
      <div className="fixed hidden md:block w-[740px] h-[740px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-20 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[75s]"></div>

      {/* Header Section */}
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white"
        >
          RGZP Zoo Systems
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-16 max-w-3xl mx-auto"
        >
          A complex enterprise architecture study designed to transform public awareness and operational efficiency at Rajiv Gandhi Zoological Park.
        </motion.p>
        
        {/* Project Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full mb-20 cursor-zoom-in group" 
          onClick={() => setSelectedImage("/Zoo/Zoo UI Mockup top hero image.png")}
        >
          <img 
            src="/Zoo/Zoo UI Mockup top hero image.png" 
            alt="RGZP Hero" 
            className="w-full h-auto rounded-3xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]" 
          />
        </motion.div>

        {/* Project Metadata Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 py-12 rounded-3xl bg-white/[0.03] border border-white/10 mb-20 backdrop-blur-sm shadow-2xl shadow-black/20"
        >
          <div className="flex flex-col items-start text-left px-8 border-r border-white/5">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Role</p>
            <p className="text-base font-bold text-white/90 leading-snug">UX Researcher & Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 md:border-r border-white/5">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Team</p>
            <p className="text-base font-bold text-white/90 leading-snug">2 Designers</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 border-r border-white/5 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Timeline</p>
            <p className="text-base font-bold text-white/90 leading-snug">4 Weeks</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Tools</p>
            <p className="text-base font-bold text-white/90 leading-snug">Figma, Miro, PPT</p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[800px] mx-auto relative px-6 pb-40">
        
        {/* Left Sidebar Container */}
        <div className="hidden lg:block absolute right-full mr-72 top-0 bottom-0 w-[220px]">
          <div className="sticky top-0 h-screen flex flex-col justify-center">
            <nav className="flex flex-col gap-4">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                const Icon = SECTION_ICONS[section.id] || BookOpen;
                
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className="group flex items-center gap-4 py-2"
                  >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <Icon 
                        className={`
                          transition-all duration-300
                          ${isActive ? "text-white scale-110" : "text-white/40 group-hover:text-white/90 group-hover:scale-105"}
                        `}
                        size={20}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
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
        </div>

        {/* Content Area */}
        <div className="w-full">
          {/* Mobile Navigation */}
          <div className="lg:hidden mb-16">
            <nav className="flex flex-wrap gap-4">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? "bg-white text-black" : "bg-white/5 text-white/60"}`}
                  >
                    {section.navLabel}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-24">
            {sections.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32"
              >
                <div className="mb-6">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-6 block">
                    {section.label}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                    {section.title}
                  </h3>
                </div>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-[800px] mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Previous Project</p>
          <Link href="/case-study/guru-vr" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
            <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            GuruVR Metaversity
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Next Project</p>
          <Link href="/case-study/samsung" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
            Samsung PRISM
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>


      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
            >
              <button
                className="absolute top-0 right-0 p-4 text-white/50 hover:text-white transition-colors z-[110]"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
