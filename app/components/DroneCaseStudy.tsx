"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Eye,
  ShieldAlert,
  Users,
  BrainCircuit,
  Radio,
  Clock,
  LayoutDashboard,
  GitBranch,
  Sparkles,
  Info,
  TrendingUp,
  Quote,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  FileText,
  Target,
  X,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  navLabel: string;
  label: string;
  title: string;
  content: React.ReactNode;
}

const SECTION_ICONS: Record<string, any> = {
  "overview": Eye,
  "challenge": Target,
  "personas": Users,
  "triage": BrainCircuit,
  "orchestration": Radio,
  "shift": Clock,
  "architecture": LayoutDashboard,
  "flowchart": GitBranch,
  "aiprocess": Sparkles,
  "rationale": Info,
  "impact": TrendingUp,
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

const PersonaCard = ({ name, role, desc, dotColor }: { name: string; role: string; desc: string; dotColor: string }) => (
  <div className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColor}`} />
      <h4 className="text-lg font-bold text-white/90 tracking-wide">{name}</h4>
    </div>
    <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4 ml-6">{role}</p>
    <p className="text-base tracking-wide font-normal text-white/60 leading-relaxed ml-6">{desc}</p>
  </div>
);

const RationaleCard = ({ title, val, over, why }: { title: string; val: string; over: string; why: string }) => (
  <div className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">{title}</p>
    <p className="text-xl font-bold text-white/90 mb-2">{val}</p>
    <p className="text-base text-rose-500/60 line-through mb-6 font-medium">{over}</p>
    <div className="w-full h-px bg-white/5 mb-6" />
    <p className="text-base text-white/50 leading-relaxed italic">{why}</p>
  </div>
);


export default function DroneCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sections: Section[] = useMemo(() => [
    {
      id: "overview",
      navLabel: "Overview",
      label: "Project Overview",
      title: "Strategic Security Orchestration",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            I conceptualised a unified command center for autonomous drone security operations at Le Musée d&apos;Art Précieux in Paris — a high-fidelity product design challenge set by FlytBase.
          </p>
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            The museum houses works valued at over €2 billion across 65,000 sqm. The goal was to enabling a team of 24 guards to manage 6 autonomous drones effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02]">
              <BrainCircuit size={32} className="text-rose-500 mb-6" />
              <h4 className="text-base font-bold text-white mb-2 uppercase tracking-widest">Decision Support</h4>
              <p className="text-sm text-white/40 leading-relaxed">AI confidence scoring cuts manual triage time from 45s to seconds.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02]">
              <Radio size={32} className="text-blue-500 mb-6" />
              <h4 className="text-base font-bold text-white mb-2 uppercase tracking-widest">Multi-Incident</h4>
              <p className="text-sm text-white/40 leading-relaxed">Ranked P1/P2/P3 alerts with drone assignment suggestions.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02]">
              <Clock size={32} className="text-emerald-500 mb-6" />
              <h4 className="text-base font-bold text-white mb-2 uppercase tracking-widest">Persistence</h4>
              <p className="text-sm text-white/40 leading-relaxed">Mandatory shift briefings preserve institutional memory across rotations.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "challenge",
      navLabel: "Challenge",
      label: "The Security Challenge",
      title: "Engineering security at museum scale",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            Security operators face catastrophic information overload from disconnected systems — CCTV, motion sensors, pressure sensors, and drone consoles — with no single source of truth.
          </p>
          
          <div className="relative p-10 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden my-12">
            <Quote className="absolute top-4 left-4 text-white/5" size={100} />
            <p className="text-xl md:text-2xl italic text-white/70 leading-relaxed relative z-10">
              &quot;With 65,000 square metres and over 400 rooms, it&apos;s impossible to have eyes everywhere. We almost lost a Degas worth €30 million when sensors failed in the east wing.&quot;
            </p>
            <div className="mt-8 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white/40">M</div>
              <div>
                <p className="text-base font-bold text-white/90">Marc</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Head of Security, Le Musée d&apos;Art Précieux</p>
              </div>
            </div>
          </div>

          <ProblemCard content="Disconnected CCTV, motion sensors, and access-control systems create information silos — making it impossible for operators to form a coherent situational picture during active incidents." />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox value="150+" label="Attempted thefts" sub="Global 2023" colorClass="text-rose-500" accent="border-rose-500/20 bg-rose-500/5" />
            <StatBox value="€30M" label="Asset Value" sub="At Risk" colorClass="text-amber-500" accent="border-amber-500/20 bg-amber-500/5" />
            <StatBox value="45s" label="Manual Triage" sub="Lost Time" colorClass="text-blue-500" accent="border-blue-500/20 bg-blue-500/5" />
            <StatBox value="24/7" label="Operational" sub="Requirement" colorClass="text-emerald-500" accent="border-emerald-500/20 bg-emerald-500/5" />
          </div>

          <div className="my-12 cursor-zoom-in" onClick={() => setSelectedImage("/flytbase/challenge.png")}>
            <img src="/flytbase/challenge.png" alt="The Security Challenge" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10" />
          </div>
        </div>
      ),
    },
    {
      id: "personas",
      navLabel: "Personas",
      label: "User & System Personas",
      title: "Who are we designing for at 2 AM?",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            I mapped four distinct security stakeholders, each with specific cognitive requirements under pressure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PersonaCard 
              name="Marc, 58" 
              role="Security Director" 
              desc="Needs accountability, actionable clarity, and system-level performance data he can trust. Avoids UI noise." 
              dotColor="bg-rose-500"
            />
            <PersonaCard 
              name="Isabelle, 34" 
              role="Lead Drone Operator" 
              desc="Technically proficient and calm. Needs fast triage support and structured multi-incident flows." 
              dotColor="bg-blue-500"
            />
            <PersonaCard 
              name="Luc, 26" 
              role="Junior Security Analyst" 
              desc="Excels with tech but lacks experience. Needs AI confidence signals to escalate correctly." 
              dotColor="bg-amber-500"
            />
            <PersonaCard 
              name="Sophie, 42" 
              role="Night Shift Supervisor" 
              desc="Coordinates field guards. Needs full situational context immediately at shift start." 
              dotColor="bg-emerald-500"
            />
          </div>
        </div>
      ),
    },
    {
      id: "triage",
      navLabel: "Triage",
      label: "AI Decision Triage",
      title: "Shifting from Monitoring to Triage",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            Each alert card surfaces an AI Confidence Assessment — a percentage score, a root-cause hint, and sensor reliability context.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatBox value="45s" label="Reduced to seconds" sub="Efficiency" colorClass="text-blue-500" accent="border-blue-500/20 bg-blue-500/5" />
            <StatBox value="97%" label="False-positive rate" sub="Accuracy" colorClass="text-emerald-500" accent="border-emerald-500/20 bg-emerald-500/5" />
            <StatBox value="<8s" label="Response Target" sub="SLA" colorClass="text-rose-500" accent="border-rose-500/20 bg-rose-500/5" />
          </div>
        </div>
      ),
    },
    {
      id: "orchestration",
      navLabel: "Orchestration",
      label: "Drone-Guard Orchestration",
      title: "Autonomous Intercept Logic",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            When critical alerts fire simultaneously, the dashboard enters multi-incident mode — ranking incidents as P1, P2, P3.
          </p>
          <div className="space-y-4">
            {[
              { n: "01", label: "Breach Detected", detail: "AI analyses multi-sensor fusion inputs.", color: "bg-rose-500" },
              { n: "02", label: "Drone Dispatched", detail: "Autonomous route calculated in <3 seconds.", color: "bg-amber-500" },
              { n: "03", label: "Guard Notified", detail: "Nearest unit receives turn-by-turn navigation.", color: "bg-blue-500" },
              { n: "04", label: "Evidence Compiled", detail: "Thermal and logs packaged for audit.", color: "bg-emerald-500" },
            ].map((step) => {
              const colorMap: Record<string, { bg: string, border: string, text: string }> = {
                "bg-rose-500": { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-500" },
                "bg-amber-500": { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500" },
                "bg-blue-500": { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-500" },
                "bg-emerald-500": { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500" },
              };
              const colors = colorMap[step.color] || colorMap["bg-rose-500"];
              
              return (
                <div key={step.n} className="p-8 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-8 group hover:bg-white/10 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center font-mono text-lg font-bold ${colors.text}`}>
                    {step.n}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white/90">{step.label}</h4>
                    <p className="text-base text-white/40 mt-2 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: "shift",
      navLabel: "Shift Briefing",
      label: "Shift Briefing",
      title: "Solving the Context Gap",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            I designed a mandatory Shift Briefing flow that ensures situational awareness is preserved across 24/7 rotations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
              <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">Briefing Modules</p>
              <ul className="space-y-4">
                {["Incidents Summary", "Fleet Readiness", "Coverage Gaps", "Director's Note", "Operator Handover"].map(m => (
                  <li key={m} className="flex items-center gap-4 text-base text-white/60 font-medium group">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <StatBox value="2–3m" label="Time to awareness" sub="Speed" colorClass="text-emerald-500" accent="border-emerald-500/20 bg-emerald-500/5" />
              <StatBox value="100%" label="Context transfer" sub="Reliability" colorClass="text-blue-500" accent="border-blue-500/20 bg-blue-500/5" />
            </div>
          </div>
          <div className="my-12 cursor-zoom-in" onClick={() => setSelectedImage("/flytbase/briefing.png")}>
            <img src="/flytbase/briefing.png" alt="Shift Briefing Interface" className="w-full h-auto rounded-3xl shadow-2xl border border-white/10" />
          </div>
        </div>
      ),
    },
    {
      id: "architecture",
      navLabel: "Architecture",
      label: "Interface Architecture",
      title: "Building the Modular Command Hub",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            The command centre UI is built on a modular widget-based grid. We prioritize Live Camera Feed and Drone Telemetry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { img: "/flytbase/dashboard.png", name: "Dashboard", desc: "Live incidents & AI triage" },
              { img: "/flytbase/fleet.png", name: "Fleet Management", desc: "Drone health & docking" },
              { img: "/flytbase/manual.png", name: "Manual Control", desc: "Direct piloting overrides" },
              { img: "/flytbase/patrol.png", name: "Patrols", desc: "Autonomous route library" },
              { img: "/flytbase/incidents.png", name: "Incidents", desc: "Historical forensic logs" },
              { img: "/flytbase/settings.png", name: "System Settings", desc: "Zones & SLA thresholds" },
            ].map((screen) => (
              <div 
                key={screen.name} 
                className="flex flex-col group transition-all duration-500 cursor-zoom-in"
                onClick={() => setSelectedImage(screen.img)}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4 group-hover:border-white/20 group-hover:scale-[1.02] transition-all duration-500">
                  <img src={screen.img} alt={screen.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-1">
                  <h4 className="text-base font-bold text-white/90 mb-1">{screen.name}</h4>
                  <p className="text-sm text-white/40 font-medium">{screen.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "flowchart",
      navLabel: "System Flowchart",
      label: "System Flowchart",
      title: "All major user flows mapped across the hub",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            All major user flows — from alert triage to shift handover, drone dispatch to manual override — are mapped across the Dashboard as the central hub. The flowchart covers 8 distinct flow groups including: alert management, drone patrol, manual control, multi-incident mode, shift briefing, fleet management, settings, and escalation paths.
          </p>
          <div className="my-12">
            <div className="w-full aspect-[16/10] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-500 hover:border-white/20">
              <iframe 
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FkuUnGfhIXURT2moqiizI4a%2FDrone-Alert-Management-System%3Fnode-id%3D18-4609%26t%3Dm9ecvF3KfMGiXut2-1" 
                className="w-full h-full bg-[#0b0b12]"
                allowFullScreen
              />
            </div>
          </div>
          <div className="pt-8">
             <a 
               href="https://www.figma.com/board/kuUnGfhIXURT2moqiizI4a/Drone-Alert-Management-System?node-id=18-4609&t=m9ecvF3KfMGiXut2-1" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors font-bold tracking-widest uppercase text-sm"
             >
               ↗ Open Full Flowchart in Figma
             </a>
          </div>
        </div>
      ),
    },
    {
      id: "aiprocess",
      navLabel: "AI Process",
      label: "AI Design Process",
      title: "Collaborating with Machines",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            AI was used as a deliberate collaborator at every stage — to accelerate reasoning and validate persona flows.
          </p>
          <div className="space-y-4">
            {[
              { n: "01", tool: "Perplexity", label: "Deep analysis of the brief — extracted museum context, constraints, and all 4 persona pain points" },
              { n: "02", tool: "Perplexity + ChatGPT", label: "Problem framing — grouped issues into 3 gaps: decision support, multi-incident prioritisation, context persistence" },
              { n: "03", tool: "ChatGPT + Perplexity", label: "Information architecture — wrote textual user flow descriptions before any visual structure" },
              { n: "04", tool: "Eraser.io → FigJam", label: "Flowchart — translated text flows into structured nodes, then iterated and annotated in FigJam" },
              { n: "05", tool: "ChatGPT", label: "Flow validation — checked every step against each persona; led to making shift briefing mandatory" },
              { n: "06–07", tool: "AI + Gemini Dynamic View", label: "Feature lists per screen; visual layout exploration for alert cards, multi-incident view, shift briefing" },
              { n: "08–09", tool: "Stitch + Google AI Studio", label: "Mockup refinement for UI consistency; built interactive prototype simulating 2:37–2:47 AM scenario" },
              { n: "10–11", tool: "Perplexity + ChatGPT", label: "Prototype stress-testing — verified every pain point was addressed; identified gaps in drone readiness cues" },
            ].map((step) => (
              <div key={step.n} className="p-8 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-8 hover:bg-white/10 transition-all duration-300">
                <span className="text-lg font-mono text-amber-400 font-bold">{step.n}</span>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/30 mb-2">{step.tool}</p>
                  <p className="text-lg text-white/80 font-medium">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "rationale",
      navLabel: "Rationale",
      label: "Design Rationale",
      title: "Operational Safety over Flashy UI",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            Every design decision involved a trade-off. We prioritised operational safety over conventional feature richness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RationaleCard 
              title="Decision 01" 
              val="Clarity over complexity" 
              over="Instead of: Decorative data visualizations" 
              why="A calm, legible hierarchy outperforms impressive charts during 2 AM crisis mode." 
            />
            <RationaleCard 
              title="Decision 02" 
              val="Human-in-the-loop" 
              over="Instead of: Full automation dispatch" 
              why="Accountability cannot be delegated to models in high-stakes security." 
            />
            <RationaleCard 
              title="Decision 03" 
              val="Focused V1 over feature breadth" 
              over="Instead of: Solving every possible scenario" 
              why="V1 focuses on three pain clusters: understanding alerts, handling multiple incidents, and preserving shift context. Depth in the right places beats surface coverage of everything." 
            />
            <RationaleCard 
              title="Decision 04" 
              val="Scenario-driven design" 
              over="Instead of: Generic dashboard conventions" 
              why="Primary flows are anchored in concrete 2-3 AM scenarios from the brief. UI decisions are grounded in the operational moment, not borrowed from SaaS patterns that serve no one in particular." 
            />
          </div>
        </div>
      ),
    },
    {
      id: "impact",
      navLabel: "Impact",
      label: "Operational Impact",
      title: "Moving the Needle",
      content: (
        <div className="space-y-6">
          <p className="text-xl tracking-wide font-normal text-white/80 leading-relaxed">
            The system transforms museum security from reactive to proactive, reducing incident response time by an estimated 40%.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox value="40%" label="Response time" sub="Reduction" colorClass="text-rose-500" accent="border-rose-500/20 bg-rose-500/5" />
            <StatBox value="6" label="Active Drones" sub="Simultaneous" colorClass="text-blue-500" accent="border-blue-500/20 bg-blue-500/5" />
            <StatBox value="100%" label="Forensic Trails" sub="Automated" colorClass="text-emerald-500" accent="border-emerald-500/20 bg-emerald-500/5" />
            <StatBox value="24/7" label="Reliability" sub="Full Rotation" colorClass="text-amber-500" accent="border-amber-500/20 bg-amber-500/5" />
          </div>
          <div className="flex flex-wrap gap-4 pt-12">
            <a 
              href="https://subhcool238.github.io/Drone-Alert-Management-System/#/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black hover:scale-105 transition-all font-bold text-sm tracking-widest uppercase"
            >
              Open Live Prototype
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      ),
    },
  ], [setSelectedImage]);

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
      {/* Background Glowing Blobs */}
      <div className="fixed w-[400px] h-[400px] left-[-10vw] top-[-5vh] origin-top-left -rotate-[17deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[60s]"></div>
      <div className="fixed w-[740px] h-[740px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-20 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[75s]"></div>

      {/* Header Section */}
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
          FlytBase Drone Security
        </h1>
        <p className="text-lg md:text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-16 max-w-3xl mx-auto">
          A unified command center for autonomous drone security operations — conceptualised for Le Musée d&apos;Art Précieux, Paris.
        </p>
        
        {/* Project Hero Image */}
        <div className="w-full mb-20 relative group cursor-zoom-in" onClick={() => setSelectedImage("/flytbase/flytbase_hero.png")}>
          <img src="/flytbase/flytbase_hero.png" alt="FlytBase Drone Security" className="w-full h-auto rounded-3xl object-cover relative" />
        </div>

        {/* Project Metadata Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 py-12 rounded-3xl bg-white/[0.03] border border-white/10 mb-20 backdrop-blur-sm">
          <div className="flex flex-col items-start text-left px-8 border-r border-white/5">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Role</p>
            <p className="text-base font-bold text-white/90 leading-snug">Product Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 md:border-r border-white/5">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Team</p>
            <p className="text-base font-bold text-white/90 leading-snug">Solo Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 border-r border-white/5 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Timeline</p>
            <p className="text-base font-bold text-white/90 leading-snug">4 Weeks</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Tools</p>
            <p className="text-base font-bold text-white/90 leading-snug whitespace-nowrap">Figma, Miro, AI Studio</p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[800px] mx-auto relative px-6 pb-40">
        {/* Left Sidebar Container */}
        <div className="hidden lg:block absolute right-full mr-72 top-0 bottom-0 w-[220px]">
          <div className="sticky top-0 h-screen flex flex-col justify-center">
            <nav className="flex flex-col gap-4">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                const Icon = SECTION_ICONS[section.id] || Building2;
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
                <div className="content-wrapper">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <div className="max-w-[800px] mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Previous Project</p>
          <Link href="/case-study/samsung" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
            <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Samsung PRISM
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Next Project</p>
          <Link href="/case-study/guru-vr" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
            GuruVR Metaversity
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
