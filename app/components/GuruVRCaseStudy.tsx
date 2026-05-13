"use client";

import { useEffect, useState } from "react";
import { BookOpen, Cpu, Gamepad2, Globe, Building2, User, Target, Route, Layers, Search, Layout, Palette, Glasses, TestTube, Lightbulb, ChevronRight, ChevronDown, Monitor, Smartphone, LayoutDashboard, Share2, ShieldAlert, AlertCircle, Rocket, X } from "lucide-react";
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
  "sponsor": Building2,
  "my-role": User,
  "problem": Target,
  "process": Route,
  "framework": Layers,
  "research": Search,
  "platform-design": Layout,
  "ui-ux": Palette,
  "xr-module": Glasses,
  "testing": TestTube,
  "prototype": Rocket,
  "reflection": Lightbulb
};

const ProblemCard = ({ title, content }: { title: string; content: string }) => (
  <div className="my-12 p-8 rounded-2xl border border-rose-500/30 bg-[#0a0a0c] relative overflow-hidden group">
    {/* Watermark Icon */}
    <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-all duration-500">
      <ShieldAlert size={100} className="text-rose-500" strokeWidth={1} />
    </div>
    
    
    <p className="text-lg md:text-xl tracking-wide font-normal text-white/90 leading-relaxed relative z-10 italic">
      {content}
    </p>
  </div>
);

const sections: Section[] = [
  {
    id: "sponsor",
    navLabel: "Sponsor",
    label: "Sponsor",
    title: "About FireBirdVR",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          FireBirdVR is a next-generation XR company building immersive learning tools for education and industry. They sit at the intersection of VR, instructional design, and gamified thinking — their mission is to make hands-on learning accessible without needing a physical lab.
        </p>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          GuruVR Metaversity is their flagship product — a scalable XR-first platform where students, faculty, creators, and corporates converge in a shared immersive campus.
        </p>
        
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Domain & Market</h3>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
            <BookOpen size={28} className="mx-auto mb-4 text-blue-400" />
            <p className="text-base font-bold text-white/90 tracking-wide">Higher Ed + STEM</p>
            <p className="text-sm text-white/40 mt-1">Domain</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
            <Cpu size={28} className="mx-auto mb-4 text-emerald-400" />
            <p className="text-base font-bold text-white/90 tracking-wide">VR / AR / AI</p>
            <p className="text-sm text-white/40 mt-1">Technology</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
            <Gamepad2 size={28} className="mx-auto mb-4 text-amber-400" />
            <p className="text-base font-bold text-white/90 tracking-wide">Gamified Learning</p>
            <p className="text-sm text-white/40 mt-1">Focus</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
            <Globe size={28} className="mx-auto mb-4 text-purple-400" />
            <p className="text-base font-bold text-white/90 tracking-wide">India EdTech</p>
            <p className="text-sm text-white/40 mt-1">Market</p>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">The people in the room</h3>
        <div className="w-full mb-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Firebird Team.png")}>
          <img 
            src="/guruvr/Firebird Team.png" 
            alt="Firebird Team" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
            Team FireBirdVR
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { role: "Akshay Rathod", desc: "Industry Mentor (CEO, FireBirdVR)", dotColor: "bg-blue-500" },
            { role: "Prof. Shakti Banerjee", desc: "Faculty Mentor (HOD — IMD, MITID)", dotColor: "bg-emerald-500" },
            { role: "XR Developers", desc: "Collaborators (Unity + Meta SDK team)", dotColor: "bg-amber-500" },
            { role: "3D Artists", desc: "Collaborators (Environment + props design)", dotColor: "bg-purple-500" },
          ].map((persona) => (
            <div key={persona.role} className="p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${persona.dotColor}`} />
                <h4 className="text-base font-bold text-white/90 tracking-wide">{persona.role}</h4>
              </div>
              <p className="text-sm tracking-wide font-normal text-white/60 leading-relaxed ml-6">{persona.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "my-role",
    navLabel: "Team Role",
    label: "Team Role",
    title: "What we owned",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          As the XR Design team at FireBirdVR, we ran the full design pipeline — from zero-day research to Unity prototyping — across 5 months of agile sprints.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            { title: "User Research", desc: "Survey of 92 students, focus group discussions, competitor benchmarking, affinity mapping." },
            { title: "Platform Architecture", desc: "User-specific mind maps, information architecture across VR, desktop, and mobile." },
            { title: "Brand & Design System", desc: "Logo, color palette, typography, full component library." },
            { title: "Cross-Platform UX", desc: "Onboarding flows, dashboards, gamified interfaces." },
            { title: "XR Module Design", desc: "Narrative design, spatial UI, hand-tracked interactions, Unity scene prototyping." },
            { title: "Testing & Iteration", desc: "Usability sessions on Meta Quest 2, think-aloud protocol, heuristic evaluation." },
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]" />
                  <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
                </div>
                <p className="text-lg tracking-wide font-normal text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    navLabel: "Problem",
    label: "Problem",
    title: "Engineering education is broken in one specific way",
    content: (
      <div className="space-y-6">
        <ProblemCard 
          title="Core Problem" 
          content="Indian Engineering education relies heavily on theoretical lectures and outdated teaching methods — leading to a significant lack of hands-on learning and industry-relevant skills. Students struggle with limited access to practical sessions and insufficient guidance from untrained faculty, often resulting in a self-driven learning approach."
        />

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Key Statistics</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Theory Curriculum", value: "70%", sub: "30% practice", textColor: "text-blue-500", accent: "border-blue-500/30 bg-blue-500/5" },
            { label: "Hands-on Learning", value: "68%", sub: "Lack access", textColor: "text-emerald-500", accent: "border-emerald-500/30 bg-emerald-500/5" },
            { label: "Faculty Readiness", value: "63%", sub: "Unprepared for XR", textColor: "text-amber-500", accent: "border-amber-500/30 bg-amber-500/5" },
            { label: "Implementation", value: "71%", sub: "Cite high costs", textColor: "text-purple-500", accent: "border-purple-500/30 bg-purple-500/5" },
          ].map((stat) => (
            <div key={stat.label} className={`p-6 rounded-2xl border ${stat.accent} flex flex-col items-start transition-all duration-300 hover:scale-[1.02] hover:brightness-110 w-full`}>
              <p className={`text-4xl md:text-5xl font-bold tracking-tight ${stat.textColor}`}>{stat.value}</p>
              <p className="text-xs tracking-wider uppercase text-white/40 mt-4">{stat.sub}</p>
              <p className="text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>


      </div>
    ),
  },
  {
    id: "process",
    navLabel: "Process",
    label: "Process",
    title: "Timeline & deliverables",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Five months, one sprint board, zero handoff errors.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Timeline</h3>
        <div className="w-full mt-8">
          <div className="w-full relative">
            {/* Header */}
            <div className="grid grid-cols-5 text-center mb-6 px-2">
              {['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY'].map((month) => (
                <div key={month} className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">
                  {month}
                </div>
              ))}
            </div>

            {/* Gantt Area */}
            <div className="relative mt-2">
              {/* Background Columns */}
              <div className="absolute inset-0 flex pointer-events-none">
                <div className="flex-1 mx-1 bg-white/[0.03] rounded-xl"></div>
                <div className="flex-1 mx-1 bg-white/[0.03] rounded-xl"></div>
                <div className="flex-1 mx-1 bg-white/[0.03] rounded-xl"></div>
                <div className="flex-1 mx-1 bg-white/[0.03] rounded-xl"></div>
                <div className="flex-1 mx-1 bg-white/[0.03] rounded-xl"></div>
              </div>

              {/* Tasks */}
              <div className="relative z-10 py-4 flex flex-col gap-2">
                {[
                  { name: "Secondary Research", left: "2%", width: "26%", color: "bg-amber-500/10 text-amber-200/80 border-amber-500/20" },
                  { name: "Primary Research (Survey)", left: "10%", width: "26%", color: "bg-amber-500/10 text-amber-200/80 border-amber-500/20" },
                  { name: "Persona + Affinity Mapping", left: "22%", width: "28%", color: "bg-emerald-500/10 text-emerald-200/80 border-emerald-500/20" },
                  { name: "User Mind Map", left: "44%", width: "14%", color: "bg-emerald-500/10 text-emerald-200/80 border-emerald-500/20" },
                  { name: "Information Architecture (IA)", left: "46%", width: "24%", color: "bg-emerald-500/10 text-emerald-200/80 border-emerald-500/20" },
                  { name: "Branding & Website Design", left: "44%", width: "16%", color: "bg-blue-500/10 text-blue-200/80 border-blue-500/20" },
                  { name: "Dashboard & Gamification UX", left: "62%", width: "20%", color: "bg-blue-500/10 text-blue-200/80 border-blue-500/20" },
                  { name: "Onboarding UX (XR/Web/Mobile)", left: "50%", width: "26%", color: "bg-blue-500/10 text-blue-200/80 border-blue-500/20" },
                  { name: "XR Module Design", left: "65%", width: "14%", color: "bg-rose-500/10 text-rose-200/80 border-rose-500/20" },
                  { name: "Testing & Iteration", left: "70%", width: "16%", color: "bg-rose-500/10 text-rose-200/80 border-rose-500/20" },
                  { name: "Grad Book", left: "82%", width: "10%", color: "bg-rose-500/10 text-rose-200/80 border-rose-500/20" }
                ].map((task, i) => (
                  <div key={i} className="w-full h-8 relative">
                    <div 
                      className="absolute h-full"
                      style={{ left: task.left, width: task.width }}
                    >
                      <div className={`h-full w-full flex items-center px-2 border rounded-md transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:brightness-125 ${task.color}`}>
                        <span className="text-[10px] font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{task.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Key Deliverables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Brand identity", desc: "Complete design system & logo", icon: Palette, color: "text-blue-400" },
            { title: "Website UX", desc: "All multi-platform onboarding flows", icon: Layout, color: "text-emerald-400" },
            { title: "4 Dashboards", desc: "Role-based views for 4 segments", icon: Cpu, color: "text-amber-400" },
            { title: "Gamification", desc: "Reward & engagement blueprint", icon: Gamepad2, color: "text-purple-400" },
            { title: "Unity Prototype", desc: "Logic Gates Mystery Island module", icon: Glasses, color: "text-rose-400" },
            { title: "Research Docs", desc: "Personas, survey & usability reports", icon: Search, color: "text-indigo-400" },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
              <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                <item.icon size={22} />
              </div>
              <div>
                <p className="text-base font-bold text-white/90">{item.title}</p>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "framework",
    navLabel: "Framework",
    label: "Framework",
    title: "The CLPE-A learning model",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Before designing a single screen, we built the instructional skeleton. Every XR scene maps to this five-stage loop — it's what keeps learning intentional, not accidental.
        </p>
        
        <div className="mt-8 flex flex-col gap-4">
          {[
            { step: "Concept", detail: "Holographic voiceover introduces the topic with zero pressure to act", color: "bg-blue-500", accent: "border-blue-500/30 bg-blue-500/5" },
            { step: "Learning", detail: "Tooltips and VO tell you exactly how to interact", color: "bg-emerald-500", accent: "border-emerald-500/30 bg-emerald-500/5" },
            { step: "Practice", detail: "Learner performs the task — pull the lever, insert the orb", color: "bg-amber-500", accent: "border-amber-500/30 bg-amber-500/5" },
            { step: "Experiment", detail: "Interactive quiz challenges test understanding in-scene", color: "bg-purple-500", accent: "border-purple-500/30 bg-purple-500/5" },
            { step: "Assessment", detail: "Final ritual — apply all knowledge independently to escape", color: "bg-rose-500", accent: "border-rose-500/30 bg-rose-500/5" },
          ].map((item) => (
            <div key={item.step} className={`p-6 rounded-2xl border ${item.accent} transition-all duration-300 hover:scale-[1.01] hover:brightness-110`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {item.step.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base font-bold text-white/90 tracking-wide">{item.step}</h4>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>



        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Learning theories it's built on</h3>
        <ul className="list-disc pl-6 space-y-4 text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          <li><span className="font-bold text-white/90">Constructivism:</span> Build knowledge through doing. Learners construct understanding through real interactions — activating a circuit, not watching one.</li>
          <li><span className="font-bold text-white/90">Cognitive Load:</span> One temple. One gate. One idea. Gamified metaphors carry the abstract weight so working memory stays clear.</li>
          <li><span className="font-bold text-white/90">Kolb's Cycle:</span> Experience → Reflect → Apply. Every temple follows Kolb: hands-on interaction → quiz feedback → UI guidance.</li>
          <li><span className="font-bold text-white/90">Bloom's Taxonomy:</span> From Remember to Create. The module scaffolds from remembering facts to creating knowledge.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "research",
    navLabel: "Research",
    label: "Research",
    title: "Research & discovery",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          We ran both primary and secondary research before touching any design tool. The goal was to validate assumptions with real data, not gut feel.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Primary Research</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-4">
          <span className="font-bold text-white/90">Survey (92 Engineering Students):</span> Multi-institution quantitative survey. Covered XR exposure, learning preferences.
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Never Used XR", value: "85%", sub: "in academics", textColor: "text-blue-500", accent: "border-blue-500/30 bg-blue-500/5" },
            { label: "Hands-on Focus", value: "91%", sub: "improves retention", textColor: "text-emerald-500", accent: "border-emerald-500/30 bg-emerald-500/5" },
            { label: "Future of Ed", value: "83%", sub: "believe XR will define it", textColor: "text-purple-500", accent: "border-purple-500/30 bg-purple-500/5" },
          ].map((stat) => (
            <div key={stat.label} className={`p-6 rounded-2xl border ${stat.accent} flex flex-col items-start transition-all duration-300 hover:scale-[1.02] hover:brightness-110 w-full`}>
              <p className={`text-4xl md:text-5xl font-bold tracking-tight ${stat.textColor}`}>{stat.value}</p>
              <p className="text-xs tracking-wider uppercase text-white/40 mt-4">{stat.sub}</p>
              <p className="text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Primary Research.png")}>
          <img 
            src="/guruvr/Primary Research.png" 
            alt="User Interview" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
            User Interview
          </div>
        </div>

        <div className="mt-8 w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <iframe 
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2F23gng5WSIz6Ws9vNJ8rEFL%2FGuruVR-Metaversity%3Fnode-id%3D0-1%26t%3D02xleNzKFN5oJocW-1" 
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Qualitative Research</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-4">
          <span className="font-bold text-white/90">Focus Groups:</span> One-on-one and group sessions with students and faculty.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            "Students lost in abstract theory — need visual anchors",
            "Faculty not opposed to XR — just anxious about the curve",
            "Navigation in VR was a consistent friction point"
          ].map((finding, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 group">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] flex-shrink-0" />
              <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Focus Group 1.png")}>
          <img 
            src="/guruvr/Focus Group 1.png" 
            alt="Focus Group Study" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
            Focus Group Study
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Affinity Mapping</h3>
        <div className="mt-6 w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <iframe 
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2F23gng5WSIz6Ws9vNJ8rEFL%2FGuruVR-Metaversity%3Fnode-id%3D1-3268%26t%3D02xleNzKFN5oJocW-1" 
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Competitor Analysis</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Evaluated Labster, iXR Labs, Coursera, and others on dimensions like gamification, XR narrative, Indian curriculum alignment, and cross-platform capability. GuruVR addresses clear white spaces in immersive story-driven onboarding and AI integrations.
        </p>

        <div className="mt-8 w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <iframe 
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2F23gng5WSIz6Ws9vNJ8rEFL%2FGuruVR-Metaversity%3Fnode-id%3D1-2956%26t%3D02xleNzKFN5oJocW-1" 
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        <ProblemCard 
          title="The Challenge" 
          content="How might we build a scalable XR platform that bridges the gap between theoretical engineering education and hands-on industrial expertise, while ensuring the UX is intuitive for both first-time VR students and non-technical faculty?" 
        />
      </div>
    ),
  },
  {
    id: "platform-design",
    navLabel: "Platform Design",
    label: "Platform Design",
    title: "Platform architecture",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          GuruVR Metaversity is designed as a cross-platform XR ecosystem that operates seamlessly across VR headsets, desktop, and mobile. The XR-first approach ensures an immersive core with responsive layers for wider accessibility.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">Creators</h4>
            <p className="text-sm text-white/60 leading-relaxed">Educators, 3D artists, and module developers building the immersive curriculum.</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-4">Users</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Students", "Faculties", "Corporate", "Government"].map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/40">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mt-12 mb-12 aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative transition-all duration-500 hover:border-white/20 group">
          <iframe 
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2F23gng5WSIz6Ws9vNJ8rEFL%2FGuruVR-Metaversity%3Fnode-id%3D401-10494%26t%3D7PO0mZnBwWvHcTZu-1" 
            className="w-full h-full bg-[#0b0b12]"
            allowFullScreen
          />
          {/* Subtle Overlay Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Architecture Layers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { role: "VR Core", desc: "Meta Quest 2 · Spatial UI · Hand-tracking. The primary experience.", dotColor: "bg-blue-500" },
            { role: "Desktop", desc: "Dashboard UX · Course Management. Full feature access without a headset.", dotColor: "bg-emerald-500" },
            { role: "Mobile", desc: "Progress Tracking · Notifications. Adaptive touch UI for on-the-go.", dotColor: "bg-purple-500" },
          ].map((layer) => (
            <div key={layer.role} className="flex flex-col items-start gap-2 p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 w-full">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${layer.dotColor}`} />
                <h4 className="text-base font-bold text-white/90 tracking-wide">{layer.role}</h4>
              </div>
              <p className="text-sm tracking-wide font-normal text-white/60 leading-relaxed">{layer.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">The Spatial Campus</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Rather than a menu system, GuruVR uses a 3D campus metaphor. You navigate between zones — not pages.
        </p>

        {/* Bento Grid of Campus Images */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 mt-8 mb-12 h-[500px]">
          {/* R1C1: Square */}
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Screenshot 2025-05-17 192449.png")}>
            <img src="/guruvr/Metaversity/Screenshot 2025-05-17 192449.png" alt="Social View" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R1C2-3: Wide */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Zoomed Out Gate.png")}>
            <img src="/guruvr/Metaversity/Zoomed Out Gate.png" alt="Main Gate" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R1-2C4: Tall */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Screenshot 2025-05-17 184930.png")}>
            <img src="/guruvr/Metaversity/Screenshot 2025-05-17 184930.png" alt="Lab View" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R2C1: Square */}
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Screenshot 2025-05-17 185725.png")}>
            <img src="/guruvr/Metaversity/Screenshot 2025-05-17 185725.png" alt="Classroom" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R2C2: Square */}
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Screenshot 2025-05-17 185734.png")}>
            <img src="/guruvr/Metaversity/Screenshot 2025-05-17 185734.png" alt="UI View" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R2-3C3: Tall */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Screenshot 2025-05-17 184521.png")}>
            <img src="/guruvr/Metaversity/Screenshot 2025-05-17 184521.png" alt="Campus View" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R3C1-2: Wide */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Screenshot 2025-05-01 141742.png")}>
            <img src="/guruvr/Metaversity/Screenshot 2025-05-01 141742.png" alt="Module View" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R3C4: Square */}
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Metaversity/Screenshot 2025-05-17 184251.png")}>
            <img src="/guruvr/Metaversity/Screenshot 2025-05-17 184251.png" alt="Detailed View" className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-110" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { state: "Welcome Atrium", color: "bg-blue-500", desc: "Onboarding + avatar" },
            { state: "Dept. Labs", color: "bg-emerald-500", desc: "EEE / Mech / CS" },
            { state: "XR Classrooms", color: "bg-amber-500", desc: "Live + async sessions" },
            { state: "Peer Zones", color: "bg-purple-500", desc: "Avatar interaction" },
            { state: "Corp. Pavilion", color: "bg-[#EF4444]", desc: "Sponsors + recruitment" },
          ].map((item) => (
            <div key={item.state} className="flex flex-col items-start gap-2 px-6 py-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 w-full">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <p className="text-base font-bold text-white/90">{item.state}</p>
              </div>
              <p className="text-sm text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Onboarding & Storyboards</h3>
        <div className="flex flex-col gap-8 mt-6">
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Onboarding Flow.png")}>
            <img src="/guruvr/Onboarding Flow.png" alt="Onboarding Flow" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
              Onboarding Flow
            </div>
          </div>
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Storyboard.png")}>
            <img src="/guruvr/Storyboard.png" alt="Storyboard" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
              Module Storyboard
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ui-ux",
    navLabel: "UI/UX Strategy",
    label: "UI/UX Design & Strategy",
    title: "Design system",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          One design system to rule VR, desktop, and mobile. Lora brings the academic weight. Mulish keeps the UI sharp. The palette works in pitch-black VR environments as well as full-light web.
        </p>

        <div className="w-full mt-12 mb-12">
          <div className="w-full aspect-[21/9] bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <iframe 
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FZzbxCJIAib7hi1ESbKrB70%2FGuruVR-Metaversity%3Fnode-id%3D2298-142%26t%3DcOd7n4H4dW8e7x8j-1" 
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Role-based dashboards</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Each role gets a dashboard designed around their actual job:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {[
            { state: "Student", image: "/guruvr/Role Based/Students.png", color: "bg-blue-500", desc: "Progress tracking, XR Launchpad, AI Tutor" },
            { state: "Faculty", image: "/guruvr/Role Based/Faculty.png", color: "bg-emerald-500", desc: "Engagement analytics, classroom management" },
            { state: "Creator", image: "/guruvr/Role Based/Creator.png", color: "bg-amber-500", desc: "Creator Studio, concept tagging" },
            { state: "Corporate", image: "/guruvr/Role Based/Corporate.png", color: "bg-purple-500", desc: "XR safety training, HR sync" },
          ].map((item) => (
            <div key={item.state} className="group flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 overflow-hidden cursor-zoom-in" onClick={() => (window as any).setSelectedImage(item.image)}>
               <div className="w-full aspect-[4/3] overflow-hidden bg-black/20 p-4">
                 <img src={item.image} alt={item.state} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
               </div>
               <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                  <p className="text-base font-bold text-white/90">{item.state}</p>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Reward & gamification mechanics</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Gamification without overuse. Every element earns its place by driving a specific behaviour.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { state: "XP Points", color: "bg-blue-500", desc: "Earned through quizzes and tasks" },
            { state: "GuruCoins", color: "bg-amber-500", desc: "In-platform currency for avatar perks" },
            { state: "Badges", color: "bg-purple-500", desc: "Milestone markers for module completion" },
            { state: "Streaks", color: "bg-[#EF4444]", desc: "Engagement chains" },
            { state: "Leaderboards", color: "bg-emerald-500", desc: "Rankings driving social motivation" },
          ].map((item) => (
            <div key={item.state} className="flex flex-col items-start gap-2 px-6 py-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <p className="text-base font-bold text-white/90">{item.state}</p>
              </div>
              <p className="text-sm text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="w-full mt-12 mb-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/guruvr/Reward system.png")}>
          <img 
            src="/guruvr/Reward system.png" 
            alt="Reward System" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
            Gamification Ecosystem
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">AI Integration — Gyaanix</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Contextual AI assistant embedded across VR, desktop, and mobile. Summonable at any moment. Voice and text responses, concept explanations, and adaptive recommendations.
        </p>
      </div>
    ),
  },
  {
    id: "xr-module",
    navLabel: "XR Module",
    label: "XR Learning Module",
    title: "Logic Gates Mystery Island",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          The module that proves everything. Seven interconnected VR scenes. Each temple teaches one logic gate — through puzzles, not lectures. The final ritual forces you to use all five gates to escape.
        </p>



        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Scene by scene</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12">
          {[
            { step: "01. Crash Site", detail: "Orientation — no pressure to perform yet.", image: "/guruvr/Mystery Island/1.1.jpg", color: "bg-blue-500" },
            { step: "02. Temple of Unity (AND Gate)", detail: "Pull both levers simultaneously to activate the gate.", image: "/guruvr/Mystery Island/2.1.jpg", color: "bg-emerald-500" },
            { step: "03. Temple of Acceptance (OR Gate)", detail: "Step on pressure pads in different combinations.", image: "/guruvr/Mystery Island/3.1.jpg", color: "bg-amber-500" },
            { step: "04. Chamber of Inversion (NOT Gate)", detail: "Insert an orb into the gate — the inverse shoots out as a beam.", image: "/guruvr/Mystery Island/4.1.jpg", color: "bg-[#EF4444]" },
            { step: "05. Temple of Divergence (XOR Gate)", detail: "Select mismatched input pairs to activate the gate.", image: "/guruvr/Mystery Island/5.1.jpg", color: "bg-purple-500" },
            { step: "06. Tower of Equality (XNOR Gate)", detail: "Align both inputs to match — the platform rises.", image: "/guruvr/Mystery Island/6.1.jpg", color: "bg-indigo-500" },
            { step: "07. Final Ritual", detail: "Build one mega-circuit from gate tokens. Unlock the escape portal.", image: "/guruvr/Mystery Island/7.1.jpg", color: "bg-pink-500" },
          ].map((item) => (
            <div key={item.step} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/20 hover:bg-white/10 cursor-zoom-in" onClick={() => (window as any).setSelectedImage(item.image)}>
              <div className="aspect-video w-full overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.step} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
              <div className="p-6 relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <h4 className="text-base font-bold text-white/90 tracking-wide">{item.step}</h4>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Interactions & spatial UI</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Implemented hand-tracked lever pulls (Gesture), input selections at circuit nodes (Drag & Drop), accessible quiz confirmation (Gaze & Hold), and truth tables with circuit feedback (Floating UI).
        </p>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Prototyping in Unity</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-8">
          All 7 scenes were prototyped and tested in Unity, deployed on Meta Quest 2 via Side Quest. We collaborated directly with the dev team to translate design intent into real XR behaviour using Unity (C#), Meta XR SDK, XR Interaction Toolkit, and Photon Fusion.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {["03.jpg", "04.jpg", "05.jpg", "06.jpg"].map((img) => (
            <div key={img} className="rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group aspect-video cursor-zoom-in" onClick={() => (window as any).setSelectedImage(`/guruvr/Unity Prototypes/${img}`)}>
              <img 
                src={`/guruvr/Unity Prototypes/${img}`} 
                alt="Unity Prototype" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "testing",
    navLabel: "Testing",
    label: "Testing & Feedback",
    title: "We tested it. Then fixed it.",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Three rounds of UX evaluation with first-year engineering students — in VR, on actual Meta Quest 2 hardware. What we found shaped everything about the final experience.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500/10 hover:border-blue-500/30">
            <p className="text-4xl md:text-5xl font-bold text-blue-400 tracking-tight">8.5 min</p>
            <p className="text-sm text-white/60 mt-4 tracking-wide">Average completion time (down from 11m)</p>
          </div>
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500/10 hover:border-emerald-500/30">
            <p className="text-4xl md:text-5xl font-bold text-emerald-400 tracking-tight">21%</p>
            <p className="text-sm text-white/60 mt-4 tracking-wide">First-attempt error rate (down from 38%)</p>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">What we found & fixed</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { step: "Floating Truth Tables", detail: "Repositioned height & angle of floating UI panels to prevent them from being missed.", color: "bg-[#EF4444]" },
            { step: "NOT Gate Chamber", detail: "Added Gyaanix voice prompt at entry point to reduce confusion around mirror mechanics.", color: "bg-amber-500" },
            { step: "Lever Interactions", detail: "Improved haptic pulse and added visual confirmation glow upon successful activation.", color: "bg-emerald-500" },
            { step: "Quiz Failure", detail: "Implemented an adaptive logic hint system when users fail multiple quiz attempts.", color: "bg-blue-500" },
          ].map((item, i) => (
            <div key={item.step} className="flex flex-col items-start gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <h4 className="text-base font-bold text-white/90 tracking-wide">{item.step}</h4>
              </div>
              <p className="text-sm text-white/50">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 p-[1px]">
            <div className="rounded-[14px] bg-[#080c14]/90 backdrop-blur-xl p-6 md:p-8">
              <p className="text-lg md:text-xl italic text-white/90 leading-relaxed mb-4">
                "Felt like a puzzle adventure, not just a class."
              </p>
              <p className="text-lg md:text-xl italic text-white/90 leading-relaxed">
                "Voiceover tips from Gyaanix made me feel guided but not forced."
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "prototype",
    navLabel: "Prototype",
    label: "Final Prototype",
    title: "The Final Experience",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          The final developed prototype is an immersive, multi-user VR experience built for the Meta Quest 2. It integrates the spatial logic gate module and AI-driven guidance via Gyaanix.
        </p>
        
        <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative group mb-12">
          <video 
            src="/guruvr/Final Prototype Video.mp4" 
            controls 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
              <h4 className="text-base font-bold text-white/90 mb-2">Hardware</h4>
              <p className="text-sm text-white/50">Optimized for Meta Quest 2 / Quest 3 with hand-tracking and controller support.</p>
           </div>
           <div className="p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
              <h4 className="text-base font-bold text-white/90 mb-2">Tech Stack</h4>
              <p className="text-sm text-white/50">Built with Unity, Meta XR SDK, and Photon Fusion for real-time collaboration.</p>
           </div>
        </div>
      </div>
    ),
  },
  {
    id: "reflection",
    navLabel: "Reflection",
    label: "Reflection",
    title: "What we actually learned",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Not a list of achievements. Genuine things that changed how we design — especially in spatial contexts.
        </p>

        <div className="grid grid-cols-1 gap-6 mt-8">
          {[
            { category: "Design", text: "Immersive narrative unlocks engagement that UI alone can't. Gamification only works when it's earned.", color: "bg-blue-500", glow: "rgba(59,130,246,0.3)" },
            { category: "Technical", text: "VR development demands constant trade-offs between visual quality and frame rate. Gesture-based affordances need to feel like natural instinct.", color: "bg-purple-500", glow: "rgba(168,85,247,0.3)" },
            { category: "User-Centric", text: "Real users never follow the ideal path. UI placement in 3D space must adapt to user height, direction, and attention speed.", color: "bg-emerald-500", glow: "rgba(16,185,129,0.3)" },
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_12px_${item.glow}]`} />
                  <h4 className="text-xl font-bold text-white tracking-tight">{item.category}</h4>
                </div>
                <p className="text-lg tracking-wide font-normal text-white/60 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 p-[1px]">
            <div className="rounded-[14px] bg-[#080c14]/90 backdrop-blur-xl p-8 md:p-10 text-center">
              <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">Final thought</h4>
              <p className="text-lg md:text-xl tracking-wide font-normal text-white/90 leading-relaxed italic mb-6">
                "This project wasn't just about designing an XR module — it was a deep exploration into how technology, storytelling, and education converge. GuruVR Metaversity has potential beyond logic gates. It offers a new blueprint for how India's technical education system can evolve — more experiential, inclusive, and future-ready."
              </p>
              <p className="text-base tracking-wide font-bold text-white/60 leading-relaxed uppercase">
                — Shubhanshu Sahu
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];




export default function GuruVRCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Expose setSelectedImage to the window for use in section content
  useEffect(() => {
    (window as any).setSelectedImage = setSelectedImage;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show sidebar as soon as user scrolls down (200px threshold)
      if (window.scrollY > 200) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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

      {/* Header Section - Centered & Narrower */}
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
            GuruVR Metaversity
          </h1>
          <p className="text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-16 max-w-3xl mx-auto">
            An XR-first immersive learning platform that turns abstract engineering concepts into hands-on, gamified experiences in VR.
          </p>
        </div>
        
        {/* Project Hero Visual */}
        <div className="w-full mb-20 cursor-zoom-in group" onClick={() => setSelectedImage("/guruvr/guruvr_hero.png")}>
          <img 
            src="/guruvr/guruvr_hero.png" 
            alt="GuruVR Metaversity Hero" 
            className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" 
          />
        </div>

        {/* Project Metadata Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 py-10 rounded-3xl bg-white/5 border border-white/10 mb-20">
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Role</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">XR Design Intern</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 md:border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Team</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">1 Solo Designer, 5 Developers, 3D Artists</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Timeline</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">5 months (2024–25)</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Tools</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">Unity, Prototyping, Design Systems</p>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto relative px-6 pb-40">
        
        {/* Left Sidebar Container - Positioned absolutely to the left of the centered content */}
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
                <div className="mb-6">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-6 block">
                    {section.label}
                  </span>
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
      {/* Footer Navigation */}
      <div className="max-w-[800px] mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Previous Project</p>
          <Link href="/case-study/flytbase" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
            <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            FlytBase
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Next Project</p>
          <Link href="/case-study/rgzp" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
            RGZP Zoo Systems
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
