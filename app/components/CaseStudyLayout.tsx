"use client";

import { useEffect, useState } from "react";
import { BookOpen, Target, User, Palette, Route, Search, Layers, Lightbulb, Rocket } from "lucide-react";

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

const sections: Section[] = [
  {
    id: "getting-started",
    navLabel: "Getting Started",
    label: "Getting Started",
    title: "Overview",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          In this project, my group mate Ankit and I explored Rajiv Gandhi Zoological Park (RGZP) through a systems thinking framework, recognizing that a zoo is more than just the sum of its individual parts. Instead, it is an interconnected system where every element, from the diverse animal species to the dedicated staff, plays a vital role in maintaining a delicate balance.
        </p>
        <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
            <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
            Rajiv Gandhi Zoological Park, commonly known as the Rajiv Gandhi Zoo, is a popular zoological park in Pune, Maharashtra, India. Established in 1999, the zoo is named after the former Prime Minister of India, Rajiv Gandhi, and spans approximately 130 acres.
            </p>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Aim</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          We aim to uncover the intricate relationships that govern a zoo's functionality, seeking sustainable solutions that benefit both the captive inhabitants and the broader ecosystem.
        </p>
      </div>
    ),
  },
  {
    id: "the-challenge",
    navLabel: "The Challenge",
    label: "The Challenge",
    title: "Problem Statement",
    content: (
      <div className="mt-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 p-[1px]">
            <div className="rounded-[14px] bg-[#080c14]/90 backdrop-blur-xl p-6 md:p-8">
              <p className="text-lg md:text-xl tracking-wide font-normal text-white/90 leading-relaxed italic">
                "People lack awareness regarding the purpose and significance of zoos."
              </p>
            </div>
          </div>
      </div>
    ),
  },
  {
    id: "my-role",
    navLabel: "My Role",
    label: "My Role",
    title: "My Responsibilities",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          As a UX Researcher and Designer on this project, I contributed to multiple phases of the double diamond process.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          <li><span className="font-bold text-white/90">Research & Mapping:</span> Conducted research interviews, created visitor journey maps, and designed user personas.</li>
          <li><span className="font-bold text-white/90">Ideation:</span> Developed flow diagrams, mind mapping, and brainstormed solutions.</li>
          <li><span className="font-bold text-white/90">Physical Prototyping:</span> Designed and laser-cut souvenirs (keychains and badges) using selected durable materials.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "design-tool-kit",
    navLabel: "Design Tool Kit",
    label: "Design Tool Kit",
    title: "Tools Used",
    content: (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Figma", desc: "UI/UX & Prototyping", icon: "/zoo/Figma.png", accent: "border-blue-500/30 bg-blue-500/5" },
          { label: "Miro", desc: "Mind mapping & Ideation", icon: "/zoo/Miro.png", accent: "border-amber-500/30 bg-amber-500/5" },
          { label: "PowerPoint", desc: "Presentation & Delivery", icon: "/zoo/Power Point.png", accent: "border-rose-500/30 bg-rose-500/5" },
        ].map((tool) => (
          <div key={tool.label} className={`p-6 rounded-2xl border ${tool.accent} flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:brightness-110 w-full`}>
            <img src={tool.icon} alt={tool.label} className="h-12 w-auto object-contain mb-4" />
            <p className="text-base font-bold text-white/90 tracking-wide">{tool.label}</p>
            <p className="text-sm text-white/60 mt-1">{tool.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "the-process",
    navLabel: "The Process",
    label: "The Process",
    title: "Double Diamond",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          We used the Double Diamond Process Model in this project. This framework uses a divergent-to-convergent approach to explore problems deeply and deliver effective solutions, highlighting four key phases:
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {[
            { step: "Discover (Research)", detail: "Gathering insights through understanding zoos, mind mapping, and primary/secondary research.", color: "bg-blue-500" },
            { step: "Define (Synthesis)", detail: "Analyzing findings, empathy mapping, and identifying opportunities to frame a problem statement.", color: "bg-emerald-500" },
            { step: "Develop (Ideation)", detail: "Generating, evaluating, and refining ideas for potential solutions.", color: "bg-amber-500" },
            { step: "Deliver (Implementation)", detail: "Validating feasibility, prototyping, and creating proof-of-concepts (POCs).", color: "bg-purple-500" },
          ].map((item, i) => (
            <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                {i < 3 && <div className="w-px h-8 bg-white/10 mt-1" />}
              </div>
              <div>
                <h4 className="text-base font-bold text-white/90 tracking-wide">{item.step}</h4>
                <p className="text-sm text-white/50 mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-12 mb-12">
          <img src="/zoo/Double Diamond jpg-01 1.png" alt="Double Diamond Diagram" className="w-full h-auto rounded object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "discover",
    navLabel: "Discover (Research)",
    label: "Discover (Research)",
    title: "Research & Mapping",
    content: (
      <div className="space-y-6">
        <div className="w-full mb-12">
           <img src="/zoo/Mind Map.png" alt="Mind Map" className="w-full h-auto rounded object-cover" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Research</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-8">
          We conducted multiple research visits to Rajiv Gandhi Zoological Park, where we interviewed the zoo directors and visitors. These interactions provided valuable insights into the zoo's operations and visitor experiences. We explored and answered key questions such as:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { 
              role: "What's a Zoo?", 
              items: ["Houses animals", "Cares for them", "Displays them to public"], 
              dotColor: "bg-blue-500" 
            },
            { 
              role: "Why do zoos exist?", 
              items: ["Conservation", "Education", "Research", "Rehabilitation"], 
              dotColor: "bg-emerald-500" 
            },
            { 
              role: "How do zoos work?", 
              items: ["Suitable habitats", "Breeding Programs", "Tours & Workshops"], 
              dotColor: "bg-amber-500" 
            },
          ].map((layer) => (
            <div key={layer.role} className="flex flex-col items-start gap-2 p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 w-full">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${layer.dotColor}`} />
                <h4 className="text-base font-bold text-white/90 tracking-wide whitespace-nowrap">{layer.role}</h4>
              </div>
              <ul className="list-disc pl-4 text-sm tracking-wide font-normal text-white/60 leading-relaxed">
                {layer.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Feedback Loop</h3>
        <div className="w-full mb-12">
           <img src="/zoo/Feedback Loop-01 1.png" alt="Feedback Loop" className="w-full h-auto rounded object-cover" />
        </div>
        

      </div>
    ),
  },
  {
    id: "define",
    navLabel: "Define (Synthesis)",
    label: "Management",
    title: "Synthesis & Classification",
    content: (
      <div className="space-y-24">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Management</h3>
          <img src="/zoo/Zoo management.svg" alt="Zoo Management Diagram" className="w-full h-auto rounded object-cover" />
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Types of Visitors</h3>
          <img src="/zoo/Visitors journey Map.png" alt="Types of Visitors" className="w-full h-auto rounded object-cover" />
        </div>
        
        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Visitors Journey Map</h3>
          <img src="/zoo/vistors journey map.svg" alt="Visitors Journey Map" className="w-full h-auto rounded object-cover" />
        </div>
        
        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">User Persona</h3>
          <div className="flex flex-col gap-8">
            <img src="/zoo/Haresh Persona.png" alt="User Persona Haresh" className="w-full h-auto rounded object-cover" />
            <img src="/zoo/Abhishek Baccha.png" alt="User Persona Abhishek" className="w-full h-auto rounded object-cover" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Iceberg Model</h3>
          <img src="/zoo/Iceberb Model.png" alt="Iceberg Model" className="w-full h-auto rounded object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "develop",
    navLabel: "Develop (Ideation)",
    label: "Develop (Ideation)",
    title: "Ideation",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Through our research and defined problems, we generated a variety of potential solutions to enhance the visitor experience and meet the educational and conservational goals of the zoo:
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Digital Signages", desc: "Interactive boards to provide dynamic information about exhibited animals.", color: "bg-blue-500" },
            { title: "AR Experiences", desc: "Augmented Reality on signages, exhibits, and interactive photo/video booths.", color: "bg-emerald-500" },
            { title: "Smart Dustbins", desc: "Gamified disposal—throwing garbage triggers a rewarding animation on a screen.", color: "bg-amber-500" },
            { title: "VR Workshops", desc: "Virtual reality integration for events and educational workshops.", color: "bg-purple-500" },
            { title: "Interactive Maps", desc: "AR guides allowing visitors to scan and start a personalized zoo journey.", color: "bg-rose-500" },
            { title: "Engaging Media", desc: "4D Movies about the Animal Kingdom and interactive games.", color: "bg-indigo-500" },
            { title: "DIY Kit", desc: "Educational kits for kids to learn about wildlife at home.", color: "bg-cyan-500" },
            { title: "Badge & Keychain", desc: "Collectible souvenirs representing different animals.", color: "bg-orange-500" },
            { title: "AR Photobooth", desc: "Capture memories with virtual animals in the zoo.", color: "bg-pink-500" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-start gap-2 px-6 py-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 w-full">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <p className="text-base font-bold text-white/90">{item.title}</p>
              </div>
              <p className="text-sm text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "deliver",
    navLabel: "Deliver (Implement)",
    label: "Deliver (Implement)",
    title: "Solutions",
    content: (
      <div className="space-y-24">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          We narrowed down our ideas to a set of cohesive, actionable deliverables. The main developed solutions included a monthly drawing competition, a prototype for the RGZP App, and integrating an AR Mascot for interactive navigation and gaming.
        </p>


        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Drawing Competition</h3>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
            The Zoo shall hold a monthly drawing competition where kids can send their drawings based on the animal of the month.
          </p>
          <div className="flex flex-col gap-6">
            <img src="/zoo/Ticket Design-01 1.png" alt="Ticket Design 1" className="w-full h-auto rounded object-cover shadow-lg hover:scale-[1.01] transition-transform" />
            <img src="/zoo/Ticket Design-02 1.png" alt="Ticket Design 2" className="w-full h-auto rounded object-cover shadow-lg hover:scale-[1.01] transition-transform" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Unique Themed QR Codes</h3>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
            Unique animal themed QR codes on tickets shall lead the users to App installation page.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <img src="/zoo/Unique Themed QR Code 1.png" alt="QR Code 1" className="w-full h-auto rounded object-cover shadow-lg hover:scale-[1.01] transition-transform" />
            <img src="/zoo/Unique Themed QR Code 2.png" alt="QR Code 2" className="w-full h-auto rounded object-cover shadow-lg hover:scale-[1.01] transition-transform" />
          </div>
        </div>


        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">RGZP Mascot - Tigo</h3>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-8">
            Tigo is the new mascot of RGZP who will help the users navigate around the zoo using the AR maps while also keeping them engaged along the way.
          </p>
          <img src="/zoo/TIgo 1.png" alt="Mascot Tigo" className="w-full max-w-[300px] h-auto object-contain mx-auto drop-shadow-2xl" />
        </div>

        <div>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">DIY Kit</h3>
              <img src="/zoo/DIY Kit.png" alt="DIY Kit" className="w-full h-auto rounded object-cover" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Badge & Keychain</h3>
              <img src="/zoo/Badge & Keychain 1.png" alt="Badge and Keychain" className="w-full h-auto rounded object-cover" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">RGZP App Prototype</h3>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
            Installing the RGZP app allows users to avail discounts at the souvenir shop, view event calendars, and unlock powerful AR features.
          </p>
          <div className="flex justify-center mb-12">
            {/* Responsive Figma Prototype Container */}
            <div
              className="relative overflow-hidden rounded-[32px] md:rounded-[56px] bg-black/20 border border-white/10 w-full max-w-[320px] md:max-w-[448px] aspect-[1/1.94]"
            >
              <iframe
                style={{ border: "none", position: "absolute", top: "-5.5%", left: "-11%", width: "122%", height: "111%" }}
                src="https://embed.figma.com/proto/j4iV2AqoFHSJuVY1MZb2lr/Zoo-Adventure-AR?node-id=23-2&p=f&viewport=251%2C395%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=23%3A2&page-id=0%3A1&embed-host=share"
                allowFullScreen
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 transition-all duration-300 hover:scale-[1.02]">
                <h4 className="text-lg font-bold tracking-wide mb-3 text-blue-400">Zoo Adventure AR</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  An interactive game for children. It combines AR tech and photography. Play quiz games to unlock AR animals, take photos, and earn unique passport stamps.
                </p>
             </div>
             <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 transition-all duration-300 hover:scale-[1.02]">
                <h4 className="text-lg font-bold tracking-wide mb-3 text-emerald-400">Interactive Map</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  Navigate around the zoo efficiently. Features an AR mode where the mascot 'TIGO' guides visitors and shares interesting facts about animals along the way.
                </p>
             </div>
          </div>
        </div>


      </div>
    ),
  },
];

export default function CaseStudyLayout() {
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
      {/* Background Glowing Blobs matching Figma, keeping theme consistent with your layout */}
      <div className="fixed w-[809px] h-[809px] left-[-20vw] top-[-10vh] origin-top-left -rotate-[17deg] opacity-50 bg-gradient-to-b from-blue-600 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] left-[10vw] bottom-[-20vh] origin-top-left rotate-[60deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Header Section - Centered & Narrower */}
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
            Rajiv Gandhi Zoological Park - Systems Thinking
          </h1>
          <p className="text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-16 max-w-3xl mx-auto">
            A system design case study to spread awareness regarding the purpose and significance of zoos.
          </p>
        </div>
        
        {/* Project Hero Image */}
        <div className="w-full mb-20">
          <img 
            src="/zoo/Zoo UI Mockup top hero image.png" 
            alt="RGZP System App Mockup" 
            className="w-full h-auto rounded-3xl object-cover shadow-2xl"
          />
        </div>

        {/* Project Metadata Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 py-10 rounded-3xl bg-white/5 border border-white/10 mb-20">
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Role</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">UX Researcher & Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 md:border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Team</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">2 Designers (Ankit & Shubhanshu)</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Timeline</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">4 Weeks</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Tools</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">Figma, Miro, PowerPoint</p>
          </div>
        </div>
      </div>

      {/* Main Layout - Sidebar + Content */}
      <div className="max-w-[800px] mx-auto relative px-6 pb-40">
        
        {/* Left Sidebar Container - Positioned absolutely to the left of the centered content */}
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
          {/* Mobile Navigation (Visible only on small screens) */}
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
