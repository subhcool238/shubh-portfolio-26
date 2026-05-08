"use client";

import { useEffect, useState } from "react";
import { BookOpen, Cpu, Gamepad2, Globe, Building2, User, Target, Route, Layers, Search, Layout, Palette, Glasses, TestTube, Lightbulb, ChevronRight, ChevronDown, Monitor, Smartphone, LayoutDashboard, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  "reflection": Lightbulb
};

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
        <div className="w-full mb-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
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
        <ul className="list-disc pl-6 space-y-4 text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          <li><span className="font-bold text-white/90">User Research:</span> Survey of 92 students, focus group discussions, competitor benchmarking, affinity mapping.</li>
          <li><span className="font-bold text-white/90">Platform Architecture:</span> User-specific mind maps, information architecture across VR, desktop, and mobile.</li>
          <li><span className="font-bold text-white/90">Brand & Design System:</span> Logo, color palette, typography, full component library.</li>
          <li><span className="font-bold text-white/90">Cross-Platform UX:</span> Onboarding flows, dashboards, gamified interfaces.</li>
          <li><span className="font-bold text-white/90">XR Module Design:</span> Narrative design, spatial UI, hand-tracked interactions, Unity scene prototyping.</li>
          <li><span className="font-bold text-white/90">Testing & Iteration:</span> Usability sessions on Meta Quest 2, think-aloud protocol, heuristic evaluation.</li>
        </ul>
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
        <div className="mt-12">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 p-[1px]">
            <div className="rounded-[14px] bg-[#080c14]/90 backdrop-blur-xl p-6 md:p-8">
              <p className="text-lg md:text-xl tracking-wide font-normal text-white/90 leading-relaxed italic">
                "Indian Engineering education relies heavily on theoretical lectures and outdated teaching methods — leading to a significant lack of hands-on learning and industry-relevant skills. Students struggle with limited access to practical sessions and insufficient guidance from untrained faculty, often resulting in a self-driven learning approach."
              </p>
            </div>
          </div>
        </div>

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
        <div className="w-full overflow-x-auto pb-4 mt-8 custom-scrollbar">
          <div className="min-w-[800px] relative">
            {/* Header */}
            <div className="grid grid-cols-5 text-center mb-6">
              {['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY'].map((month) => (
                <div key={month} className="text-sm font-bold text-white/40 tracking-widest uppercase">
                  {month}
                </div>
              ))}
            </div>

            {/* Gantt Area */}
            <div className="relative mt-2">
              {/* Background Columns */}
              <div className="absolute inset-0 flex pointer-events-none">
                <div className="flex-1 mx-2 bg-white/[0.05] rounded-xl"></div>
                <div className="flex-1 mx-2 bg-white/[0.05] rounded-xl"></div>
                <div className="flex-1 mx-2 bg-white/[0.05] rounded-xl"></div>
                <div className="flex-1 mx-2 bg-white/[0.05] rounded-xl"></div>
                <div className="flex-1 mx-2 bg-white/[0.05] rounded-xl"></div>
              </div>

              {/* Tasks */}
              <div className="relative z-10 py-4 flex flex-col gap-3">
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
                  <div key={i} className="w-full h-9 relative">
                    <div 
                      className="absolute h-full"
                      style={{ left: task.left, width: task.width }}
                    >
                      <div className={`h-full min-w-full w-max flex items-center px-4 border rounded-lg transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:brightness-125 ${task.color}`}>
                        <span className="text-[12px] font-medium tracking-wide whitespace-nowrap">{task.name}</span>
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

        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
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
        <ul className="list-disc pl-6 space-y-2 text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          <li>Students lost in abstract theory — need visual anchors</li>
          <li>Faculty not opposed to XR — just anxious about the curve</li>
          <li>Navigation in VR was a consistent friction point</li>
        </ul>

        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
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

        <div className="w-full mt-12 mb-12 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 animate-pulse">Click nodes to expand logic</span>
          </div>
          
          <div className="relative z-10">
            <SystemMap />
          </div>
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
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Screenshot 2025-05-17 192449.png" alt="Social View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R1C2-3: Wide */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Zoomed Out Gate.png" alt="Main Gate" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-1">Architecture</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">Main Campus Gate</h4>
            </div>
          </div>

          {/* R1-2C4: Tall */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Screenshot 2025-05-17 184930.png" alt="Lab View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">Dept. Labs</span>
            </div>
          </div>

          {/* R2C1: Square */}
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Screenshot 2025-05-17 185725.png" alt="Classroom" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R2C2: Square */}
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Screenshot 2025-05-17 185734.png" alt="UI View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* R2-3C3: Tall */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Screenshot 2025-05-17 184521.png" alt="Campus View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">Campus View</span>
            </div>
          </div>

          {/* R3C1-2: Wide */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Screenshot 2025-05-01 141742.png" alt="Module View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400 mb-1">Learning Module</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">Logic Gates Mystery Island</h4>
            </div>
          </div>

          {/* R3C4: Square */}
          <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src="/guruvr/metaversity/Screenshot 2025-05-17 184251.png" alt="Detailed View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Onboarding Flows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="w-full aspect-[16/9] bg-white/5 border border-white/10 rounded-[5px] flex flex-col items-center justify-center p-6 text-center text-white/50">
            [ Onboarding Wireframe Placeholder ]
          </div>
          <div className="w-full aspect-[16/9] bg-white/5 border border-white/10 rounded-[5px] flex flex-col items-center justify-center p-6 text-center text-white/50">
            [ Hi-Fi Onboarding Flow Placeholder ]
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
          <div className="w-full aspect-[21/9] bg-white/5 border border-white/10 rounded-[5px] flex flex-col items-center justify-center p-6 text-center text-white/50">
            [ Design System Spread Placeholder ]
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Role-based dashboards</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Each role gets a dashboard designed around their actual job:
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {[
            { state: "Student", color: "bg-blue-500", desc: "Progress tracking, XR Launchpad, AI Tutor" },
            { state: "Faculty", color: "bg-emerald-500", desc: "Engagement analytics, classroom management" },
            { state: "Creator", color: "bg-amber-500", desc: "Creator Studio, concept tagging" },
            { state: "Corporate", color: "bg-purple-500", desc: "XR safety training, HR sync" },
          ].map((item) => (
            <div key={item.state} className="flex flex-col items-start gap-2 px-6 py-6 rounded-2xl border border-white/10 bg-white/5 w-full md:w-[calc(50%-8px)] transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <p className="text-base font-bold text-white/90">{item.state}</p>
              </div>
              <p className="text-sm text-white/50">{item.desc}</p>
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

        <div className="w-full mt-12 mb-12">
          <div className="w-full aspect-[21/9] bg-white/5 border border-white/10 rounded-[5px] flex flex-col items-center justify-center p-6 text-center text-white/50">
            [ Logic Gates Module Unity Screenshot Placeholder ]
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Scene by scene</h3>
        <div className="mt-6 flex flex-col gap-3">
          {[
            { step: "01. Crash Site", detail: "Orientation — no pressure to perform yet.", color: "bg-blue-500" },
            { step: "02. Temple of Unity (AND Gate)", detail: "Pull both levers simultaneously to activate the gate.", color: "bg-emerald-500" },
            { step: "03. Temple of Acceptance (OR Gate)", detail: "Step on pressure pads in different combinations.", color: "bg-amber-500" },
            { step: "04. Chamber of Inversion (NOT Gate)", detail: "Insert an orb into the gate — the inverse shoots out as a beam.", color: "bg-[#EF4444]" },
            { step: "05. Temple of Divergence (XOR Gate)", detail: "Select mismatched input pairs to activate the gate.", color: "bg-purple-500" },
            { step: "06. Tower of Equality (XNOR Gate)", detail: "Align both inputs to match — the platform rises.", color: "bg-indigo-500" },
            { step: "07. Final Ritual", detail: "Build one mega-circuit from gate tokens. Unlock the escape portal.", color: "bg-pink-500" },
          ].map((item, i) => (
            <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                {i < 6 && <div className="w-px h-8 bg-white/10 mt-1" />}
              </div>
              <div>
                <h4 className="text-base font-bold text-white/90 tracking-wide">{item.step}</h4>
                <p className="text-sm text-white/50 mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Interactions & spatial UI</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
          Implemented hand-tracked lever pulls (Gesture), input selections at circuit nodes (Drag & Drop), accessible quiz confirmation (Gaze & Hold), and truth tables with circuit feedback (Floating UI).
        </p>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Prototyping in Unity</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          All 7 scenes were prototyped and tested in Unity, deployed on Meta Quest 2 via Side Quest. We collaborated directly with the dev team to translate design intent into real XR behaviour using Unity (C#), Meta XR SDK, XR Interaction Toolkit, and Photon Fusion.
        </p>
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
    id: "reflection",
    navLabel: "Reflection",
    label: "Reflection",
    title: "What we actually learned",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Not a list of achievements. Genuine things that changed how we design — especially in spatial contexts.
        </p>

        <ul className="list-disc pl-6 space-y-4 text-lg tracking-wide font-normal text-white/80 leading-relaxed mt-6">
          <li><span className="font-bold text-white/90">Design:</span> Immersive narrative unlocks engagement that UI alone can't. Gamification only works when it's earned.</li>
          <li><span className="font-bold text-white/90">Technical:</span> VR development demands constant trade-offs between visual quality and frame rate. Gesture-based affordances need to feel like natural instinct.</li>
          <li><span className="font-bold text-white/90">User-Centric:</span> Real users never follow the ideal path. UI placement in 3D space must adapt to user height, direction, and attention speed.</li>
        </ul>

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


const DEEP_ARCH_DATA = {
  id: "web-portal",
  label: "Unified Web Portal",
  type: "web",
  children: [
    {
      id: "landing",
      label: "Landing Page",
      type: "web",
      children: [
        { id: "hero", label: "Smart Hero (Dynamic)" },
        { id: "teaser", label: "Teaser Video" },
        { id: "about", label: "About Metaversity" },
        { id: "feat", label: "Core Features" },
        { id: "demo", label: "Demo Experience" },
        { id: "faq", label: "FAQ's & Support" },
      ]
    },
    {
      id: "auth",
      label: "Sign Up / Login",
      type: "auth",
      children: [
        {
          id: "creators",
          label: "Creators",
          type: "role",
          children: [
            { id: "c-dash", label: "Dashboard" },
            { id: "c-studio", label: "Creator Studio" },
            { id: "c-analytics", label: "Analytics" },
            { id: "c-port", label: "Portfolio" },
          ]
        },
        {
          id: "users",
          label: "Users",
          type: "role",
          children: [
            {
              id: "students",
              label: "Students",
              type: "subrole",
              children: [
                { id: "s-dash", label: "Learning Dashboard" },
                { id: "s-labs", label: "XR Labs & Lectures" },
                { id: "s-ai", label: "AI Tutor" },
                { id: "s-reward", label: "Rewards & Gamification" },
              ]
            },
            {
              id: "faculties",
              label: "Faculties",
              type: "subrole",
              children: [
                { id: "f-dash", label: "Teaching Hub" },
                { id: "f-tools", label: "Teaching Tools" },
                { id: "f-ai", label: "AI Resource Assistant" },
                { id: "f-xr", label: "Virtual Classroom" },
              ]
            },
            {
              id: "corp",
              label: "Corporates (B2B)",
              type: "subrole",
              children: [
                { id: "b2b-cert", label: "Certifications" },
                { id: "b2b-hr", label: "HR Sync" },
                { id: "b2b-sim", label: "XR Simulations" },
              ]
            },
            {
              id: "govt",
              label: "Government",
              type: "subrole",
              children: [
                { id: "g-adoption", label: "Govt. Adoption" },
                { id: "g-studio", label: "Govt. Creator Studio" },
                { id: "g-analytics", label: "Regional Progress" },
              ]
            }
          ]
        }
      ]
    }
  ]
};

function MindMapNode({ node, level = 0 }: { node: any; level?: number }) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;

  // Layout constants — must match the CSS
  const NODE_H = 48;   // h-12
  const GAP    = 16;   // gap-4
  const STEP   = NODE_H + GAP; // 64px per child slot

  const getStyle = (type: string) => {
    switch (type) {
      case 'web':     return { bg: 'bg-[#4FD1C5]', text: 'text-[#1A202C]', border: 'border-[#38B2AC]', line: '#4FD1C5' };
      case 'auth':    return { bg: 'bg-[#7C3AED]',  text: 'text-white',      border: 'border-[#6D28D9]', line: '#7C3AED' };
      case 'role':    return { bg: 'bg-[#10B981]',  text: 'text-white',      border: 'border-[#059669]', line: '#10B981' };
      case 'subrole': return { bg: 'bg-[#8B5CF6]',  text: 'text-white',      border: 'border-[#7C3AED]', line: '#8B5CF6' };
      default:        return { bg: 'bg-white/10',    text: 'text-white/80',   border: 'border-white/10',  line: '#94A3B8' };
    }
  };

  const style = getStyle(node.type);

  // Total height of the expanded children subtree (for the first-level children only)
  // We use this to size the SVG overlay correctly.
  const childCount = hasChildren ? node.children.length : 0;
  const svgH = childCount > 0 ? Math.max(NODE_H, childCount * STEP - GAP) : NODE_H;

  // Y-centre of the parent pill within the SVG coordinate space.
  // The parent pill sits at the top of the outer flex row (items-start).
  const parentCY = NODE_H / 2; // = 24

  return (
    <div className="flex items-start">

      {/* ── Parent pill column ── */}
      <div className="relative flex-shrink-0" style={{ height: NODE_H }}>
        <motion.div
          layout
          whileHover={{ scale: 1.05 }}
          onClick={() => hasChildren && setIsOpen(!isOpen)}
          className={`
            h-full px-6 py-2 rounded-full border shadow-xl
            cursor-pointer group/node flex items-center justify-between gap-3
            min-w-[150px] transition-all duration-300
            ${style.bg} ${style.text} ${style.border}
          `}
        >
          <span className="text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
            {node.label}
          </span>
          {hasChildren && (
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight size={14} className="opacity-60 group-hover/node:opacity-100" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ── Connector + children (only when open) ── */}
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="relative flex-shrink-0"
            style={{ width: 56 /* ml-16 = 64, svg takes 56, 8 gap */ }}
          >
            {/* SVG draws from parent-pill right edge → each child left edge */}
            <svg
              width="56"
              height={svgH}
              overflow="visible"
              className="absolute left-0 top-0 pointer-events-none"
            >
              {node.children.map((child: any, idx: number) => {
                const childStyle = getStyle(child.type);
                // Centre-Y of this child relative to the top of the SVG
                const childCY = idx * STEP + NODE_H / 2;
                // Curve: start at right edge of parent (x=0, y=parentCY)
                // end at left edge of child column (x=56, y=childCY)
                const d = `M 0 ${parentCY} C 28 ${parentCY}, 28 ${childCY}, 56 ${childCY}`;
                return (
                  <path
                    key={child.id}
                    d={d}
                    fill="none"
                    stroke={childStyle.line}
                    strokeWidth="2"
                    strokeOpacity="0.7"
                    strokeDasharray={level >= 1 ? '5,4' : '0'}
                  />
                );
              })}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Children column ── */}
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {node.children.map((child: any) => (
              <MindMapNode key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


function SystemMap() {
  return (
    <div className="w-full overflow-x-auto pb-24 pt-12 px-10 custom-scrollbar">
      <div className="min-w-[2000px] min-h-[800px] relative py-20">
        
        {/* Global SVG Layer for Funneling */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {/* Metaversity to Platforms */}
          <path d="M 180 400 C 240 400, 240 200, 300 200" fill="none" stroke="#4FD1C5" strokeWidth="3" strokeOpacity="0.4" />
          <path d="M 180 400 C 240 400, 240 300, 300 300" fill="none" stroke="#4FD1C5" strokeWidth="3" strokeOpacity="0.4" />
          <path d="M 180 400 C 240 400, 240 400, 300 400" fill="none" stroke="#4FD1C5" strokeWidth="3" strokeOpacity="0.4" />
          <path d="M 180 400 C 240 400, 240 600, 300 600" fill="none" stroke="#7C3AED" strokeWidth="3" strokeOpacity="0.4" />

          {/* Platforms to Unified Web Funnel */}
          <path d="M 460 200 C 540 200, 540 375, 620 375" fill="none" stroke="#4FD1C5" strokeWidth="2" strokeDasharray="8,5" strokeOpacity="0.3" />
          <path d="M 460 300 C 540 300, 540 375, 620 375" fill="none" stroke="#4FD1C5" strokeWidth="2" strokeDasharray="8,5" strokeOpacity="0.3" />
          <path d="M 460 400 C 540 400, 540 375, 620 375" fill="none" stroke="#4FD1C5" strokeWidth="2" strokeDasharray="8,5" strokeOpacity="0.3" />
        </svg>

        {/* Level 0: Root */}
        <div className="absolute left-[20px] top-[375px] z-10">
          <div className="px-10 py-4 rounded-full bg-[#1A202C] border border-white/20 shadow-2xl text-white font-black text-xs uppercase tracking-[0.3em]">
            GuruVR Metaversity
          </div>
        </div>

        {/* Level 1: Platform Pills */}
        <div className="absolute left-[300px] top-[180px] z-10 space-y-[65px]">
          {["Desktop", "Mobile", "Tablet"].map((p) => (
            <div key={p} className="px-8 py-2.5 rounded-full bg-[#4FD1C5] text-[#1A202C] font-bold text-[10px] uppercase tracking-widest w-40 text-center shadow-lg border border-[#38B2AC]">
              {p}
            </div>
          ))}
          <div className="absolute top-[395px] px-8 py-2.5 rounded-full bg-[#7C3AED] text-white font-bold text-[10px] uppercase tracking-widest w-40 text-center shadow-lg border border-[#6D28D9]">
            XR Device (Unity)
          </div>
        </div>

        {/* Level 2+: The Recursive Branches (Starting with Unified Hub) */}
        <div className="absolute left-[620px] top-[350px] z-10">
          <MindMapNode node={DEEP_ARCH_DATA} />
        </div>

      </div>
    </div>
  );
}

export default function GuruVRCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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
      {/* Background Glowing Blobs matching Zoo Case Study */}
      <div className="fixed w-[809px] h-[809px] left-[-20vw] top-[-10vh] origin-top-left -rotate-[17deg] opacity-50 bg-gradient-to-b from-blue-600 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] left-[10vw] bottom-[-20vh] origin-top-left rotate-[60deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>

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
        <div className="w-full mb-20">
          <div className="w-full aspect-[16/9] bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white/50 shadow-2xl">
            [ Hero Visual Placeholder ]<br/>
            <span className="text-sm mt-2">GuruVR platform screenshot / 3D campus render</span>
          </div>
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
