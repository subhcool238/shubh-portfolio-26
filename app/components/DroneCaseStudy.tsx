"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Eye,
  ShieldAlert,
  Users,
  BrainCircuit,
  Radio,
  Map,
  LayoutDashboard,
  TrendingUp,
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
    icon: <Eye size={16} />,
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          I conceptualized a unified command center for autonomous drone security operations at Le Musée d&apos;Art Précieux in Paris as a high-fidelity product design challenge. The museum houses works valued at over €2 billion across 65,000 sqm. The project goal was to transition from &quot;passive monitoring&quot; to &quot;active security orchestration,&quot; enabling a team of 24 guards to manage 6 autonomous drones effectively.
        </p>
        <div className="w-full mt-12">
          <img src="/flytbase/hero.png" alt="Command Center Dashboard Mockup" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "security-challenge",
    navLabel: "The Security Challenge",
    label: "The Security Challenge",
    title: "The Security Challenge",
    icon: <ShieldAlert size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Security operators face catastrophic information overload from disconnected systems (CCTV, motion sensors, access control). The core challenge was to design a triage hub that minimizes human cognitive load while maintaining rigorous safety standards. The system had to be optimized for 24/7 high-stress operations.
        </p>
        <div className="mt-8 p-6 rounded-lg border-2 border-[#EF4444]/40 bg-[#EF4444]/5">
          <div className="flex items-center gap-3 mb-3">
            <ShieldAlert size={20} className="text-[#EF4444]" />
            <span className="text-sm tracking-widest uppercase font-semibold text-[#EF4444]">Core Problem</span>
          </div>
          <p className="text-base tracking-wide font-normal text-white/80 leading-relaxed">
            Disconnected CCTV, motion sensors, and access control systems create information silos—making it impossible for operators to form a coherent situational picture during active incidents.
          </p>
        </div>
        <div className="w-full mt-8">
          <img src="/flytbase/facility-map.png" alt="Museum Facility Security Map" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "user-personas",
    navLabel: "User & System Personas",
    label: "User & System Personas",
    title: "User & System Personas",
    icon: <Users size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          I mapped four distinct security stakeholders, each with specific cognitive requirements under pressure:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              role: "Security Director",
              desc: "Requires strategic accountability and high-level incident summaries.",
              accent: "border-blue-500/30 bg-blue-500/5",
            },
            {
              role: "Drone Operator",
              desc: "Demands granular control over autonomous flight paths and telemetry.",
              accent: "border-emerald-500/30 bg-emerald-500/5",
            },
            {
              role: "Junior Analyst",
              desc: "Needs proactive, AI-generated guidance and SOP checklists.",
              accent: "border-amber-500/30 bg-amber-500/5",
            },
            {
              role: "Night Supervisor",
              desc: "Requires seamless coordination between the command center and physical guards on the ground.",
              accent: "border-purple-500/30 bg-purple-500/5",
            },
          ].map((persona) => (
            <div
              key={persona.role}
              className={`p-5 rounded-lg border-2 ${persona.accent} transition-all duration-300 hover:scale-[1.02]`}
            >
              <h4 className="text-base font-bold text-white/90 mb-2 tracking-wide">{persona.role}</h4>
              <p className="text-sm tracking-wide font-normal text-white/60 leading-relaxed">{persona.desc}</p>
            </div>
          ))}
        </div>
        <div className="w-full mt-8">
          <img src="/flytbase/personas.png" alt="Security Persona Cards" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "ai-decision-triage",
    navLabel: "AI Decision Triage",
    label: "AI Decision Triage",
    title: "AI Decision Triage",
    icon: <BrainCircuit size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          To solve &quot;information overload,&quot; I architected an AI-powered triage layer. The system filters thousands of incoming sensor inputs, flagging only genuine security anomalies while suppressing routine noise (e.g., HVAC vibrations, cleaning staff). This enables the human operator to focus exclusively on confirmed threats.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Sensor Inputs", value: "2,400+", sub: "per hour" },
            { label: "Noise Suppressed", value: "97%", sub: "false positives" },
            { label: "Response Time", value: "<8s", sub: "to confirmed alert" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
              <p className="text-xs tracking-wider uppercase text-white/40 mt-1">{stat.sub}</p>
              <p className="text-sm text-white/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="w-full mt-8">
          <img src="/flytbase/ai-triage.png" alt="AI Decision Triage Flowchart" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "drone-guard-orchestration",
    navLabel: "Drone-Guard Orchestration",
    label: "Drone-Guard Orchestration",
    title: "Drone-Guard Orchestration",
    icon: <Radio size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          The system is built on a &quot;Human-in-the-Loop&quot; architecture. Upon detecting a breach, the drone automatically plots an intercept course, notifies the nearest guard via turn-by-turn navigation, and compiles an immediate evidence package. This creates a closed-loop security response.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {[
            { step: "Breach Detected", detail: "AI confirms anomaly from multi-sensor fusion", color: "bg-[#EF4444]" },
            { step: "Drone Dispatched", detail: "Autonomous intercept course plotted in <3 seconds", color: "bg-amber-500" },
            { step: "Guard Notified", detail: "Turn-by-turn navigation sent to nearest on-ground unit", color: "bg-blue-500" },
            { step: "Evidence Compiled", detail: "HD footage, timestamps, and sensor logs packaged", color: "bg-emerald-500" },
          ].map((item, i) => (
            <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
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
        <div className="w-full mt-8">
          <img src="/flytbase/orchestration.png" alt="Drone-Guard Orchestration System Flowchart" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "spatial-facility-view",
    navLabel: "Spatial Facility View",
    label: "Spatial Facility View",
    title: "Spatial Facility View",
    icon: <Map size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          I designed a 3D facility visualization to handle multi-level spatial navigation. This allows operators to toggle between a 2D floor plan for quick alerts and a 3D simulation for tactical planning. This spatial context is vital for guards navigating complex multi-level rooms during an active security incident.
        </p>
        <div className="mt-6 flex gap-4">
          <div className="flex-1 p-4 rounded-lg border border-white/10 bg-white/5 text-center">
            <Map size={24} className="mx-auto mb-3 text-blue-400" />
            <p className="text-sm font-bold text-white/80 tracking-wide">2D Floor Plan</p>
            <p className="text-xs text-white/40 mt-1">Quick alert triage</p>
          </div>
          <div className="flex-1 p-4 rounded-lg border border-white/10 bg-white/5 text-center">
            <Map size={24} className="mx-auto mb-3 text-emerald-400" />
            <p className="text-sm font-bold text-white/80 tracking-wide">3D Simulation</p>
            <p className="text-xs text-white/40 mt-1">Tactical planning</p>
          </div>
        </div>
        <div className="w-full mt-8">
          <img src="/flytbase/spatial-view.png" alt="3D Facility Visualization Mockup" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "interface-architecture",
    navLabel: "Interface Architecture",
    label: "Interface Architecture",
    title: "Interface Architecture",
    icon: <LayoutDashboard size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          The command center UI is built on a modular &quot;widget-based&quot; grid. It prioritizes the &quot;Live Camera Feed,&quot; &quot;Drone Telemetry,&quot; and &quot;Active Incident Log.&quot; I implemented custom color states to provide immediate situational awareness.
        </p>
        <div className="mt-6 flex gap-4 flex-wrap">
          {[
            { state: "Idle", color: "bg-blue-500", border: "border-blue-500/40", desc: "Normal operations" },
            { state: "Alert", color: "bg-[#EF4444]", border: "border-[#EF4444]/40", desc: "Active incident" },
            { state: "Patrol", color: "bg-emerald-500", border: "border-emerald-500/40", desc: "Scheduled route" },
            { state: "RTL", color: "bg-amber-500", border: "border-amber-500/40", desc: "Return to launch" },
          ].map((item) => (
            <div key={item.state} className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${item.border} bg-white/5`}>
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <div>
                <p className="text-sm font-bold text-white/80">{item.state}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-8">
          <img src="/flytbase/dashboard-ui.png" alt="Command Center Dashboard UI" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "operational-impact",
    navLabel: "Operational Impact",
    label: "Operational Impact",
    title: "Operational Impact",
    icon: <TrendingUp size={16} />,
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          The system transforms security from reactive to proactive. By automating audit trails and evidence compilation, the command center is estimated to reduce incident response time by 40% and provides a clear, forensic record for post-event investigation—a non-negotiable requirement for protecting global cultural heritage.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/5">
            <p className="text-3xl font-bold text-[#EF4444] tracking-tight">40%</p>
            <p className="text-sm text-white/60 mt-2 tracking-wide">Reduction in incident response time</p>
          </div>
          <div className="p-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-3xl font-bold text-emerald-400 tracking-tight">100%</p>
            <p className="text-sm text-white/60 mt-2 tracking-wide">Automated forensic audit trails</p>
          </div>
          <div className="p-5 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <p className="text-3xl font-bold text-blue-400 tracking-tight">6</p>
            <p className="text-sm text-white/60 mt-2 tracking-wide">Autonomous drones managed simultaneously</p>
          </div>
          <div className="p-5 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-3xl font-bold text-amber-400 tracking-tight">24/7</p>
            <p className="text-sm text-white/60 mt-2 tracking-wide">Continuous high-stress operation support</p>
          </div>
        </div>
        <div className="w-full mt-8">
          <img src="/flytbase/audit-trail.png" alt="Audit Trail Interface Mockup" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
];

export default function DroneCaseStudy() {
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
      {/* Background Glowing Blobs matching GuruVR project */}
      <div className="fixed w-[809px] h-[809px] left-[-20vw] top-[-10vh] origin-top-left -rotate-[17deg] opacity-50 bg-gradient-to-b from-blue-600 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] left-[10vw] bottom-[-20vh] origin-top-left rotate-[60deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>



      {/* Header Section - Centered & Narrower */}
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
          FlytBase Drone Security
        </h1>
        <p className="text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-16 max-w-3xl mx-auto">
          A unified command center for autonomous drone security operations — conceptualized for Le Musée d&apos;Art Précieux, Paris.
        </p>
        
        {/* Project Hero Image */}
        <div className="w-full mb-20">
          <img src="/flytbase/hero.png" alt="FlytBase Drone Security Command Center" className="w-full h-auto rounded-3xl object-cover shadow-2xl" />
        </div>

        {/* Project Metadata Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 py-10 rounded-3xl bg-white/5 border border-white/10 mb-20">
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Role</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">Product Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 md:border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Team</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">Solo Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Timeline</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">4 Weeks</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Tools</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">Figma, Miro, Prototyping</p>
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
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className="group flex items-center gap-4 py-2"
                  >
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
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
