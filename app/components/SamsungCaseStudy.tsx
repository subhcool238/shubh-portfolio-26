"use client";

import { useEffect, useState } from "react";
import { 
  Building2, Users, Route, Search, Target, User, Lightbulb, 
  Glasses, Layout, BookOpen, Layers, TestTube, Globe, Settings, Sparkles, Accessibility, Gauge, Repeat, Camera,
  Smartphone, Monitor, Share2, LayoutDashboard, Video
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
  "overview": Building2,
  "my-role": User,
  "process": Route,
  "research": Search,
  "competitive": Layers,
  "interviews": Globe,
  "empathy": Users,
  "problem": Target,
  "stakeholders": Users,
  "technical": Settings,
  "ideation": Lightbulb,
  "pivot": Route,
  "persona": User,
  "solution": Layout,
  "userflow": Route,
  "outcomes": TestTube
};

const sections: Section[] = [
  {
    id: "overview",
    navLabel: "Overview",
    label: "Overview",
    title: "About PRISM & Brief",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Students and professors form teams to work on smaller projects — "work-lets" — under guidance from mentors at Samsung R&D Institute, Bengaluru (SRI-B). The initiative sharpens skills and opens doors to better placements.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Samsung Brief</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Avatars are key for self-expression and virtual communication — they extend a user's identity. XR adds depth, 3D interaction, gestures, and multi-modality. This project explores <strong>novel use cases for Samsung Avatars in XR</strong>, integrating them with Samsung's app ecosystem beyond mobile and into the immersive XR space.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Duration", value: "6", sub: "Weeks", textColor: "text-blue-500", accent: "border-blue-500/30 bg-blue-500/5" },
            { label: "Research", value: "45", sub: "Participants surveyed", textColor: "text-emerald-500", accent: "border-emerald-500/30 bg-emerald-500/5" },
            { label: "Ideation", value: "5", sub: "Concepts generated", textColor: "text-amber-500", accent: "border-amber-500/30 bg-amber-500/5" },
            { label: "Delivery", value: "1", sub: "Final Solution", textColor: "text-purple-500", accent: "border-purple-500/30 bg-purple-500/5" },
          ].map((stat) => (
            <div key={stat.label} className={`p-6 rounded-3xl border ${stat.accent} flex flex-col items-start transition-all duration-300 hover:scale-[1.02] hover:brightness-110 w-full`}>
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
    id: "my-role",
    navLabel: "My Role",
    label: "My Role",
    title: "My Responsibilities",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          As the lead XR Concept Designer for this Samsung PRISM project, I steered the design strategy from initial desk research to the final high-fidelity prototype video.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          <li><span className="font-bold text-white/90">Primary Research:</span> Conducted surveys with 45+ participants and synthesized interview data into actionable insights.</li>
          <li><span className="font-bold text-white/90">Concept Design:</span> Ideated 5+ unique use cases for Samsung Avatars, eventually pivoting to a high-impact accessibility solution.</li>
          <li><span className="font-bold text-white/90">UI/UX Strategy:</span> Designed the VR-first interaction dictionary and multi-phase user workflows.</li>
          <li><span className="font-bold text-white/90">Prototyping & Motion:</span> Directed and edited the final high-fidelity prototype video demonstrating the Avatar Translator in action.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "process",
    navLabel: "Process",
    label: "Process",
    title: "Design Methodology",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          A Double Diamond–led sprint — 4 weeks of research and definition, converging into ideation and delivery by the 23rd August deadline.
        </p>

        <div className="w-full mt-12 mb-8">
          <img src="/samsung/Design Methodology.png" alt="Design Methodology" className="w-full h-auto rounded-2xl" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6">Timeline</h3>
        <div className="w-full overflow-x-auto pb-4 mt-8 custom-scrollbar">
          <div className="min-w-[800px] relative">
            {/* Header */}
            <div className="grid grid-cols-6 text-center mb-6">
              {['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5', 'WEEK 6'].map((week) => (
                <div key={week} className="text-sm font-bold text-white/40 tracking-widest uppercase">
                  {week}
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
                <div className="flex-1 mx-2 bg-white/[0.05] rounded-xl"></div>
              </div>

              {/* Tasks */}
              <div className="relative z-10 py-4 flex flex-col gap-3">
                {[
                  { name: "Awareness & Brief", left: "2%", width: "14%", color: "bg-amber-500/10 text-amber-200/80 border-amber-500/20" },
                  { name: "Desk Research & Survey", left: "10%", width: "24%", color: "bg-amber-500/10 text-amber-200/80 border-amber-500/20" },
                  { name: "Interviews (45 Participants)", left: "20%", width: "16%", color: "bg-emerald-500/10 text-emerald-200/80 border-emerald-500/20" },
                  { name: "Persona & Empathy Map", left: "28%", width: "20%", color: "bg-emerald-500/10 text-emerald-200/80 border-emerald-500/20" },
                  { name: "5 Initial Concepts", left: "40%", width: "15%", color: "bg-emerald-500/10 text-emerald-200/80 border-emerald-500/20" },
                  { name: "Pivot & Strategy (Accessibility)", left: "46%", width: "20%", color: "bg-blue-500/10 text-blue-200/80 border-blue-500/20" },
                  { name: "UI Design & Workflows", left: "60%", width: "20%", color: "bg-blue-500/10 text-blue-200/80 border-blue-500/20" },
                  { name: "Storyboarding & Avatars", left: "63%", width: "18%", color: "bg-blue-500/10 text-blue-200/80 border-blue-500/20" },
                  { name: "Prototyping & Demo Video", left: "75%", width: "20%", color: "bg-rose-500/10 text-rose-200/80 border-rose-500/20" },
                  { name: "Final Delivery", left: "86%", width: "12%", color: "bg-rose-500/10 text-rose-200/80 border-rose-500/20" }
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
      </div>
    ),
  },
  {
    id: "research",
    navLabel: "Desk Research",
    label: "Desk Research",
    title: "Information Gathered from Online Sources",
    content: (
      <div className="space-y-8">
        {/* Horizontal Topic Timeline */}
        <div className="w-full flex flex-wrap lg:flex-nowrap items-start justify-start gap-0 py-10 border-b border-white/5 overflow-x-auto no-scrollbar">
          {[
            { icon: Globe, title: "Samsung", sub: "Ecosystem" },
            { icon: BookOpen, title: "Samsung", sub: "VR History" },
            { icon: User, title: "Avatar", sub: "WHAT? WHY? WHERE?" },
            { icon: Users, title: "Competitors", sub: "Their ecosystem" },
            { icon: Glasses, title: "Immersive Spaces", sub: "Roblox, Fortnite etc." },
            { icon: TestTube, title: "Samsung", sub: "Avatar Synthesis" }
          ].map((topic, i, arr) => (
            <div key={i} className="flex flex-col items-center text-center group min-w-[160px] lg:min-w-0 lg:flex-1 first:items-start first:text-left last:items-end last:text-right">
              <div className="flex items-center w-full mb-6">
                <div className="flex-1 h-[2px] border-t-2 border-dotted border-white/30 opacity-0 lg:opacity-100 group-first:opacity-0" />
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <topic.icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex-1 h-[2px] border-t-2 border-dotted border-white/30 opacity-0 lg:opacity-100 group-last:opacity-0" />
              </div>
              <div className="flex flex-col items-center group-first:items-start group-last:items-end px-4">
                <span className="text-[13px] font-bold text-white tracking-wide">{topic.title}</span>
                <span className="text-[10px] text-white/40 tracking-[0.1em] uppercase mt-2 leading-tight font-medium">{topic.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Figjam Screenshot */}
        <div className="flex flex-col gap-6">
          <div className="w-full rounded-2xl bg-white/5 overflow-hidden p-2 group transition-all duration-500">
            <img 
              src="/samsung/Desk Research.png" 
              alt="Desk Research Figjam Mapping" 
              className="w-full h-auto rounded-xl transition-transform duration-700 group-hover:scale-[1.01]" 
            />
          </div>
          <a 
            href="#" 
            className="text-white/60 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white/20 pb-1 w-fit transition-colors"
          >
            Link to Fig-jam File
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "competitive",
    navLabel: "Competitive",
    label: "Competitive Analysis",
    title: "XR Devices — Avatar Landscape",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Three major XR platforms benchmarked across tracking, ecosystem compatibility, customisation, and realism.
        </p>

        <div className="w-full overflow-x-auto pb-4 mt-8 custom-scrollbar">
          <div className="min-w-[1000px] rounded-3xl border border-white/10 bg-[#1a1525]/60">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-3 w-[8%] text-white/50 font-bold italic tracking-wide text-xs">Brands</th>
                <th className="p-3 w-[10%] text-white/50 font-bold italic tracking-wide text-xs">Devices</th>
                <th className="p-3 w-[16%] text-white/50 font-bold italic tracking-wide text-xs">Tracking</th>
                <th className="p-3 w-[14%] text-white/50 font-bold italic tracking-wide text-xs">Supports</th>
                <th className="p-3 w-[16%] text-white/50 font-bold italic tracking-wide text-xs">Applications</th>
                <th className="p-3 w-[18%] text-white/50 font-bold italic tracking-wide text-xs">Ecosystem Compatibility</th>
                <th className="p-3 w-[18%] text-white/50 font-bold italic tracking-wide text-xs">Conclusion</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-white/10 transition-colors hover:bg-white/5">
                <td className="p-3">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                    <svg viewBox="0 0 384 512" className="w-5 h-5 fill-black">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                  </div>
                </td>
                <td className="p-3 text-white/80">Vision Pro</td>
                <td className="p-3 text-white/70">Facial Tracking, Body Tracking not supported yet</td>
                <td className="p-3 text-white/70">IOS, iPad OS, MacOS</td>
                <td className="p-3 text-white/70">FaceTime & iMessages</td>
                <td className="p-3 text-white/70">Not integrated with Apple TV, Apple Watch yet</td>
                <td className="p-3 text-white/70">Leads in realism and integration with personalised features.</td>
              </tr>
              <tr className="border-b border-white/10 transition-colors hover:bg-white/5">
                <td className="p-3">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                    <svg viewBox="0 0 512 512" className="w-6 h-6 fill-[#0668E1]">
                      <path d="M410 160c-26 0-48 16-56 38l-4 12c-15 42-53 70-98 70s-83-28-98-70l-4-12c-8-22-30-38-56-38-33 0-60 27-60 60s27 60 60 60c26 0 48-16 56-38l4-12c15-42 53-70 98-70s83 28 98 70l4 12c8 22 30 38 56 38 33 0 60-27 60-60s-27-60-60-60zm0 90c-17 0-30-13-30-30s13-30 30-30 30 13 30 30-13 30-30 30zm-308-60c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30z"/>
                    </svg>
                  </div>
                </td>
                <td className="p-3 text-white/80">Quest 3</td>
                <td className="p-3 text-white/70">Facial Tracking, Upper Body Movement only</td>
                <td className="p-3 text-white/70">Oculus headsets, mobile devices & PCs</td>
                <td className="p-3 text-white/70">VR games, Social Apps, Virtual Meetings</td>
                <td className="p-3 text-white/70">Excellent integration within Meta's ecosystem, including social media platforms and VR devices</td>
                <td className="p-3 text-white/70">Strong customisation options & expressive avatars, well-integrated into social and VR platforms.</td>
              </tr>
              <tr className="transition-colors hover:bg-white/5">
                <td className="p-3">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex flex-col items-center justify-center gap-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" className="opacity-0"/>
                      <circle cx="12" cy="9" r="5" fill="none" stroke="black" strokeWidth="1.5" />
                      <circle cx="10" cy="8" r="1.5" fill="black" />
                      <path d="M12 14c-4 0-6-2-6-2" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[7px] font-black tracking-tighter text-black uppercase leading-none -mt-1">PICO</span>
                  </div>
                </td>
                <td className="p-3 text-white/80">Pico 4</td>
                <td className="p-3 text-white/70">Upper Body Tracking</td>
                <td className="p-3 text-white/70">VR Chat, Inbuilt Environments (Inside Pico Headset)</td>
                <td className="p-3 text-white/70">Pico store & Pico Video</td>
                <td className="p-3 text-white/70">Primarily focused on standalone VR, with less emphasis on ecosystem integration.</td>
                <td className="p-3 text-white/70">Basic customisation & limited realism, with a focus on standalone VR experiences.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
  },
  {
    id: "stakeholders",
    navLabel: "Stakeholders",
    label: "Stakeholders",
    title: "Identifying Stakeholders",
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Defining the stakeholders.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Primary */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-center min-h-[160px]">
                <h4 className="text-sm font-black tracking-[0.3em] uppercase text-white/90">Primary</h4>
             </div>
             <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                <span className="text-xs font-bold text-purple-200/80">Inclusive Genz's & Millenials</span>
             </div>
          </div>

          {/* Secondary */}
          <div className="lg:col-span-8 flex flex-col gap-4">
             <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-center min-h-[160px]">
                <h4 className="text-sm font-black tracking-[0.3em] uppercase text-white/90">Secondary</h4>
             </div>
             <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-xs font-bold text-white/60">Gamers</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-xs font-bold text-white/60">Developers</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-xs font-bold text-white/60">Content Creators</span>
                </div>
             </div>
          </div>
        </div>

        {/* Target Audience Banner */}
        <div className="w-full p-8 md:p-12 rounded-[2rem] bg-gradient-to-r from-purple-900/40 via-fuchsia-900/40 to-pink-900/40 border border-white/10 flex flex-col md:flex-row items-center gap-8 group transition-all duration-500 hover:border-purple-500/30">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
               <Users size={40} className="text-white/80" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-light tracking-tight text-white/40 leading-none">Target</span>
              <span className="text-3xl font-bold tracking-tight text-white leading-none mt-1">Audience</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/10" />
          <h2 className="text-2xl md:text-3xl font-bold text-amber-200/90 tracking-tight text-center md:text-left">
            Inclusive Gen-Z's and Millennials
          </h2>
        </div>
      </div>
    ),
  },
  {
    id: "interviews",
    navLabel: "User Interviews",
    label: "Primary Research",
    title: "Interview Questions",
    content: (
      <div className="space-y-12">
        {/* Top: Interview Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Which gadget and brand device do you use?",
            "Which devices do you currently own or use?",
            "Do you know about any avatar/memoji feature currently available on your device?",
            "If yes, for what purposes do you use avatar/memoji as a features?",
            "How would you rate your interest in using avatars for the following purposes?",
            "What would be your interest in using avatars for the following purposes?",
            "Ideas where VR could be integrated with your ecosystem? ( to ease your life )",
            "Any specific feature that you want on your avatar or any task/ interaction to be performed?"
          ].map((q, i) => {
            const isHighlighted = i === 2 || i === 3;
            return (
              <div 
                key={i} 
                className={`flex flex-col gap-3 p-6 rounded-3xl transition-all duration-500 min-h-[160px] ${
                  isHighlighted 
                  ? 'bg-blue-500/10 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <span className={`text-xs font-black ${isHighlighted ? 'text-blue-400' : 'text-white/20'}`}>Q.0{i + 1}</span>
                <p className={`text-xs leading-relaxed font-medium ${isHighlighted ? 'text-white' : 'text-white/60'}`}>{q}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom: Data Visualization */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-12 py-16 bg-white/5 rounded-3xl relative overflow-hidden group transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />
          
          {/* Chart 1: Participants */}
          <div className="relative flex flex-col items-center z-10">
            <div className="w-64 h-64 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-2xl">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E25141" strokeWidth="18" strokeDasharray="118 133" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#90A959" strokeWidth="18" strokeDasharray="78 173" strokeDashoffset="-118" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#5283A4" strokeWidth="18" strokeDasharray="50 201" strokeDashoffset="-196" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E9C46A" strokeWidth="18" strokeDasharray="5 246" strokeDashoffset="-246" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-black text-white leading-none">45</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mt-2">Participants</span>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#5283A4] shadow-[0_0_10px_rgba(82,131,164,0.5)]" />
                <span className="text-[10px] font-bold text-white/70">20% Samsung (Knows)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#E25141] shadow-[0_0_10px_rgba(226,81,65,0.5)]" />
                <span className="text-[10px] font-bold text-white/70">47% Apple</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#90A959] shadow-[0_0_10px_rgba(144,169,89,0.5)]" />
                <span className="text-[10px] font-bold text-white/70">31% Samsung (Unaware)</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Snapchat */}
          <div className="flex flex-col items-center z-10">
            <div className="w-48 h-48 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-2xl">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFD700" strokeWidth="18" strokeDasharray="201 50" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-white">80%</span>
              </div>
            </div>
            <span className="text-[11px] font-black tracking-[0.3em] uppercase text-white/40 mt-6">Snapchat users</span>
          </div>
        </div>

        <div className="mt-16 relative flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 mb-16">
            <h3 className="text-3xl font-bold tracking-tight text-white/90">Research Insights</h3>
            <p className="text-sm text-white/40 tracking-widest uppercase">From Interview Questions</p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 min-h-auto md:min-h-[600px] py-12 md:py-0">
            {/* Left Column Hexagons */}
            <div className="flex flex-col gap-6 w-64 z-10">
              {[
                "Gen-Z users have Samsung & Apple Branded gadgets",
                "Gen-Z have different devices of different brands (major devices: phone, laptops)",
                "Avatar usage found in social media apps (snapchat) & gaming",
                "Future usage on social media interaction, virtual meeting & shopping",
                "Virtual assistance to handle everyday task at home, PM, smart home management"
              ].map((text, i) => (
                <div key={i} className="relative group">
                  <div className="p-4 bg-white/5 border border-white/10 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] hover:bg-white/10 transition-all duration-300 shadow-xl backdrop-blur-sm">
                    <p className="text-[10px] leading-tight text-white/60 text-center font-medium py-2 px-3">{text}</p>
                  </div>
                  {/* Connector Line (Dashed) */}
                  <div className="absolute top-1/2 -right-12 w-12 h-[1px] border-t border-dashed border-white/20 hidden md:block" />
                </div>
              ))}
            </div>

            {/* Central Circle */}
            <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-rose-500/20 border border-white/10 flex items-center justify-center z-0 shadow-[0_0_100px_rgba(139,92,246,0.1)]">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-dashed border-white/20 flex items-center justify-center p-6 md:p-8 text-center bg-white/5 backdrop-blur-md">
                <h4 className="text-xl md:text-3xl font-black text-white/90 leading-tight">Gen-Z &<br/>Millennials</h4>
              </div>
              {/* Pulsing Glow */}
              <div className="absolute inset-0 rounded-full bg-blue-500/5 animate-pulse" />
            </div>

            {/* Right Column Hexagons */}
            <div className="flex flex-col gap-6 w-64 z-10">
              {[
                "Single point virtual avatar could be used in expressing body language, F. voice",
                "Major user's gadgets belong to Apple Brand",
                "Millennials have different devices with different brands",
                "Avatar usage found in social media (snapchat) & Avatar looks cartoonish",
                "Virtual assistance with food command and guide map"
              ].map((text, i) => (
                <div key={i} className="relative group">
                  <div className="p-4 bg-white/5 border border-white/10 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] hover:bg-white/10 transition-all duration-300 shadow-xl backdrop-blur-sm">
                    <p className="text-[10px] leading-tight text-white/60 text-center font-medium py-2 px-3">{text}</p>
                  </div>
                  {/* Connector Line (Dashed) */}
                  <div className="absolute top-1/2 -left-12 w-12 h-[1px] border-t border-dashed border-white/20 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "initial-problem",
    navLabel: "Problem",
    label: "Define",
    title: "Problem Statement",
    content: (
      <div className="space-y-8">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-8">Understanding the gap</p>
        
        <div className="mt-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 p-[1px]">
            <div className="rounded-[14px] bg-[#080c14]/90 backdrop-blur-xl p-8 md:p-10">
              <p className="text-lg md:text-2xl tracking-wide font-light text-white/90 leading-relaxed italic">
                "Very few Samsung device users are aware of the avatar features available in AR Zone, leading to underutilisation of avatar within the Samsung ecosystem, including the XR domain. We need to explore opportunities for integrating avatars more effectively & increasing user engagement by understanding the needs and preferences of Gen Z."
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Graphic */}
        <div className="relative group flex items-center justify-center mt-12">
          <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full opacity-50" />
          <div className="relative z-10 w-full aspect-video max-w-2xl rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center p-8">
            <Sparkles size={48} className="text-purple-400 mb-6 animate-pulse" />
            <p className="text-white/40 text-sm italic font-light tracking-wide px-8">
              [ Decorative Avatar Interaction Graphic ]<br/>
              <span className="text-[10px] uppercase mt-2 block tracking-widest">Gen-Z Engagement Visual</span>
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "empathy",
    navLabel: "Empathy Map",
    label: "Synthesis",
    title: "Empathy Mapping",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-4">
          Mapping out the desires, frustrations, and device behaviors of our two primary demographic segments to find overlapping pain points.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="w-full rounded-2xl overflow-hidden relative">
            <img src="/samsung/Genz Students.png" alt="Gen Z Students Empathy Map" className="w-full h-auto object-cover" />
          </div>
          <div className="w-full rounded-2xl overflow-hidden relative">
            <img src="/samsung/Millennials Professions.png" alt="Millennials Empathy Map" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ideation",
    navLabel: "Ideation",
    label: "Ideation",
    title: "Concepts",
    content: (
      <div className="space-y-16">
        {/* Round 1 */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-white/90">Round 1 — Initial Ideas</h3>
            <p className="text-sm text-white/40 tracking-widest uppercase">Linking to Research Insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 1, label: "Understanding Samsung Ecosystem", title: "Samsung Virtual Store Assisted by an Avatar", desc: "Avatar-assisted virtual Samsung retail experience." },
              { id: 2, label: "Personalisation", title: "3D Custom Asset & Virtual Pet", desc: "Personalised avatar companion that lives across devices." },
              { id: 3, label: "Awareness & User Engagement", title: "3D Avatar Comic stories / AI Generator", desc: "Avatar comic stories auto-generated from photos in your Samsung gallery." }
            ].map((concept) => (
              <div key={concept.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 group hover:bg-white/10 transition-all duration-300">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Concept 0{concept.id}</span>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">({concept.label})</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{concept.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{concept.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Round 2 */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-white/90">Round 2 — Rethink: Avatar as Hero</h3>
            <p className="text-sm text-white/40 tracking-widest uppercase">Evolved Value Propositions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 1, title: "Live stream your Avatar in VR Games", desc: "Real-time avatar projection into VR gaming environments." },
                { id: 2, title: "3D Avatar Comic stories / AI Generated video clips", desc: "Create animated clips from photos in your Samsung gallery." },
                { id: 3, title: "Talking Avatar for your Voice mail", desc: "Leave personalised, animated avatar video messages." },
                { id: 4, title: "Product Avatars of Samsung Ecosystem", desc: "Integrating avatars as guides for Samsung hardware." }
              ].map((concept) => (
                <div key={concept.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2 hover:bg-white/10 transition-all duration-300">
                  <span className="text-[10px] font-bold text-white/30 uppercase">Concept 0{concept.id}</span>
                  <h4 className="text-sm font-bold text-white leading-tight">{concept.title}</h4>
                </div>
              ))}
            </div>

            {/* Concept 5 - Highlighted */}
            <div className="p-8 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 flex flex-col gap-6 relative overflow-hidden group shadow-[0_0_40px_rgba(59,130,246,0.1)]">
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Sparkles size={16} className="text-blue-400" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Concept 05</span>
                <h4 className="text-xl font-bold text-white leading-tight">Sign Language for Deaf & Mute individual</h4>
              </div>
              <div className="space-y-4">
                {[
                  "We want to understand how D&M communicate?",
                  "Can VR domain provide a probable solution & help their communication problem?",
                  "Avatar feature could provide most value to the users."
                ].map((point, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-xs font-bold text-blue-400/60 mt-0.5">{i + 1}.</span>
                    <p className="text-xs text-white/80 leading-relaxed font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  {
    id: "pivot",
    navLabel: "The Pivot",
    label: "Accessibility",
    title: "Why we choose Accessibility?",
    content: (
      <div className="space-y-8">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-12">Addressing accessibility is important</p>
        
        <div className="relative flex flex-col md:flex-row items-center gap-0">
          {/* Left Visual Element: Hexagon & Icon */}
          <div className="relative z-10 -mr-8">
             <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-rose-500/40 to-purple-600/40 border border-white/10 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] flex items-center justify-center shadow-2xl">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[6px] border-white/20 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                   <Accessibility size={48} className="text-white relative z-10" />
                </div>
             </div>
          </div>

          {/* Right Column: Stacked Text Boxes */}
          <div className="flex-1 space-y-4">
            <div className="p-8 md:p-10 pl-12 md:pl-16 rounded-r-[3rem] rounded-l-[1rem] bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <p className="text-lg md:text-xl italic font-light leading-relaxed text-white/80">
                Samsung designs their products with <span className="text-rose-400 font-medium">accessibility in mind</span> & believes that everyone should have equal access to technology, regardless of their abilities.
              </p>
            </div>
            
            <div className="relative ml-8 md:ml-16">
              <div className="p-8 md:p-10 pl-12 md:pl-16 rounded-r-[3rem] rounded-l-[1rem] bg-gradient-to-r from-purple-900/20 to-transparent border border-white/10 backdrop-blur-md">
                <p className="text-lg md:text-xl italic font-light leading-relaxed text-white/80">
                  Our aim is to <span className="text-purple-400 font-medium">bridge the communication gap</span> within deaf & mute individuals with the help of an avatar-based communication tool.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-16 mb-6">Samsung's Accessibility Commitment</h3>
      </div>
    ),
  },
  {
    id: "research-goals",
    navLabel: "Research Goals",
    label: "Synthesis",
    title: "Goal of our Research",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-8">Understand our Target Audiences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Core Goal */}
          <div className="p-10 rounded-[3rem] bg-purple-500/5 border border-white/10 flex flex-col items-center text-center gap-8 group hover:bg-purple-500/10 transition-all duration-500">
            <div className="w-40 h-40 rounded-full border-4 border-white/20 flex items-center justify-center p-8">
               <Accessibility size={80} className="text-white/80 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <p className="text-xl font-medium leading-relaxed text-white/90 px-4">
              Our goals would be to understand the <span className="text-purple-400 font-bold">communication needs of deaf & mute individuals</span>
            </p>
          </div>

          {/* Right Column: Specific Aims */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 flex items-center transition-all duration-300 hover:bg-white/[0.05]">
              <p className="text-lg font-medium leading-relaxed text-white/70">
                Developing solutions that <span className="text-purple-400 font-bold">effectively simplify & enhance their communication experiences.</span>
              </p>
            </div>
            <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 flex items-center transition-all duration-300 hover:bg-white/[0.05]">
              <p className="text-lg font-medium leading-relaxed text-white/70">
                Exploring <span className="text-purple-400 font-bold">sign language, lip reading, and writing</span> across different regions & cultures.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "accessibility-insights",
    navLabel: "Accessibility Insights",
    label: "Synthesis",
    title: "Research Insights.",
    content: (
      <div className="mt-8 relative flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 mb-16 text-center">
          <p className="text-sm text-white/40 tracking-widest uppercase">Key insights from users</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 min-h-auto md:min-h-[600px] py-12 md:py-0">
          {/* Left Column Hexagons */}
          <div className="flex flex-col gap-6 w-64 z-10">
            {[
              "Communication through sign language, lip reading & writing.",
              "Ways of learning sign language is different from person, State and nation.",
              "They are eager to talk to relatives/guest either in person or on VC.",
              "They love watching movies and talking to new people around them.",
              "Emotions are conveyed by touching, facial expression, crying, from phones."
            ].map((text, i) => (
              <div key={i} className="relative group">
                <div className="p-4 bg-white/5 border border-white/10 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] hover:bg-white/10 transition-all duration-300 shadow-xl backdrop-blur-sm">
                  <p className="text-[10px] leading-tight text-white/60 text-center font-medium py-2 px-3">{text}</p>
                </div>
                <div className="absolute top-1/2 -right-12 w-12 h-[1px] border-t border-dashed border-white/20 hidden md:block" />
              </div>
            ))}
          </div>

          {/* Central Circle */}
          <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-rose-500/20 via-purple-500/10 to-blue-500/20 border border-white/10 flex items-center justify-center z-0 shadow-[0_0_100px_rgba(244,63,94,0.1)]">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-dashed border-white/20 flex items-center justify-center p-6 md:p-8 text-center bg-white/5 backdrop-blur-md">
              <h4 className="text-base md:text-xl font-bold text-white/90 leading-tight">Deaf & mute individuals<br/><span className="text-[10px] md:text-sm font-medium text-white/50">(Millennials on behalf of Gen-Alpha)</span></h4>
            </div>
          </div>

          {/* Right Column Hexagons */}
          <div className="flex flex-col gap-6 w-64 z-10">
            {[
              "Interested in using new gadgets",
              "Typing, painting on computers. Playing games on their mobile phones.",
              "Visual and emotional representation is important.",
              "Lip reading can not be understood of every person."
            ].map((text, i) => (
              <div key={i} className="relative group">
                <div className="p-4 bg-white/5 border border-white/10 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] hover:bg-white/10 transition-all duration-300 shadow-xl backdrop-blur-sm">
                  <p className="text-[10px] leading-tight text-white/60 text-center font-medium py-2 px-3">{text}</p>
                </div>
                <div className="absolute top-1/2 -left-12 w-12 h-[1px] border-t border-dashed border-white/20 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "pain-points",
    navLabel: "Pain Points",
    label: "Synthesis",
    title: "Major Pain points.",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/40 leading-relaxed -mt-4">
          Understand our Target Audiences
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          {[
            { 
              title: "Communication Barriers:", 
              color: "text-rose-400",
              accent: "border-rose-500/30 bg-rose-500/5",
              dot: "bg-rose-500",
              points: [
                "Difficulty in understanding sign language from regions.",
                "Challenges in lip reading, especially with new individuals."
              ]
            },
            { 
              title: "Emotional Expression:", 
              color: "text-amber-400",
              accent: "border-amber-500/30 bg-amber-500/5",
              dot: "bg-amber-500",
              points: [
                "Limited ability to convey emotions through traditional communication methods.",
                "Reliance on high facial emotions, touching, and crying to express feelings."
              ]
            },
            { 
              title: "Lack of Standardization:", 
              color: "text-purple-400",
              accent: "border-purple-500/30 bg-purple-500/5",
              dot: "bg-purple-500",
              points: [
                "Variations in sign language learning methods from person to person, state to state, and nation to nation."
              ]
            }
          ].map((item, i) => (
            <div key={i} className={`p-8 rounded-3xl border ${item.accent} flex flex-col gap-4 transition-all duration-300 hover:scale-[1.01] hover:brightness-110`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.dot} shadow-[0_0_10px_rgba(244,63,94,0.3)]`} />
                <h4 className={`text-lg font-bold italic tracking-wide ${item.color}`}>{item.title}</h4>
              </div>
              <ul className="space-y-2">
                {item.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-white/70 text-base leading-relaxed">
                    <span className="text-white/20 mt-1.5">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "opportunities",
    navLabel: "Opportunities",
    label: "Strategy",
    title: "Opportunities.",
    content: (
      <div className="space-y-12">
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <p className="text-sm text-white/40 tracking-widest uppercase">Understand our Target Audiences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center px-4">
          {[
            {
              title: "Avatar Integration",
              color: "text-blue-400",
              accent: "border-blue-500/30 bg-blue-500/5",
              points: [
                "Recognize and translate regional sign languages.",
                "Convey and interpret emotions effectively."
              ]
            },
            {
              title: "Communication Tools",
              color: "text-emerald-400",
              accent: "border-emerald-500/30 bg-emerald-500/5",
              points: [
                "Sign language-to-speech and speech-to-sign language functionalities."
              ]
            },
            {
              title: "Social Connectivity",
              color: "text-purple-400",
              accent: "border-purple-500/30 bg-purple-500/5",
              points: [
                "Video calls with avatars that bridge communication gaps between deaf, mute, and hearing individuals."
              ]
            }
          ].map((opp, i) => (
            <div key={i} className="relative group perspective-1000">
              {/* Main Card */}
              <div className={`relative p-10 rounded-[3rem] border ${opp.accent} backdrop-blur-2xl flex flex-col gap-6 shadow-2xl min-h-[320px] transition-all duration-500 group-hover:-translate-y-2 group-hover:brightness-110`}>
                {/* Sparkle Decoration */}
                <div className="absolute top-6 right-6">
                  <Sparkles size={20} className={`${opp.color} opacity-40 group-hover:opacity-100 transition-colors`} />
                </div>
                
                <h4 className={`text-xl font-bold tracking-tight ${opp.color}`}>{opp.title}</h4>
                <ul className="space-y-4">
                  {opp.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-sm text-white/70 leading-relaxed font-light">
                      <span className={`${opp.color} mt-1.5 flex-shrink-0`}>•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "persona",
    navLabel: "User Persona",
    label: "User Persona",
    title: "Deaf & Mute Student",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          After pivoting to accessibility, we built a persona grounded in real research on deaf and mute communication needs — not assumptions.
        </p>

        <div className="mt-12 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
          <img 
            src="/samsung/Persona.png" 
            alt="User Persona: Saleha" 
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
          />
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    navLabel: "Problem",
    label: "Define",
    title: "Revised Problem Statement.",
    content: (
      <div className="space-y-8">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-8">Understand our Target Audiences</p>
        
        <div className="mt-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 p-[1px]">
            <div className="rounded-[14px] bg-[#080c14]/90 backdrop-blur-xl p-8 md:p-10">
              <p className="text-lg md:text-2xl tracking-wide font-light text-white/90 leading-relaxed italic">
                "Deaf and mute individuals face communication challenges with hearing people due to varying sign languages. We aim to bridge this gap by developing inclusive avatar features for Samsung XR devices, enabling efficient real-time translation and enhanced emotional expression for a truly connected interaction."
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          {/* Small Venn Graphic Coded */}
          <div className="relative w-full max-w-sm h-64 flex items-center justify-center mx-auto">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl opacity-20" />
            <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0 items-center justify-items-center">
              <div className="col-start-2 row-start-1 text-[10px] text-white/40 uppercase tracking-tighter">Communication</div>
              <div className="col-start-1 row-start-2 text-[10px] text-white/40 uppercase tracking-tighter pr-4">Sign Language</div>
              <div className="col-start-2 row-start-2 w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                  <span className="text-2xl font-black text-white">XR</span>
              </div>
              <div className="col-start-3 row-start-2 text-[10px] text-white/40 uppercase tracking-tighter pl-4">Speech or Text</div>
              <div className="col-start-2 row-start-3 text-[10px] text-white/40 uppercase tracking-tighter pt-4">1:1 Virtual Avatar</div>
            </div>
          </div>

          {/* Right Column: Large Graphic */}
          <div className="relative group">
            <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full opacity-50" />
            <img 
              src="/samsung/Revised Problem Statement.png" 
              alt="Networked Avatars Sphere" 
              className="relative z-10 w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>
      </div>
    ),
  },

  {
    id: "other-interactions",
    navLabel: "Interactions",
    label: "Features",
    title: "Other Interactions",
    content: (
      <div className="space-y-12">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-12">Understand our Target Audiences</p>
        
        <div className="space-y-12 max-w-4xl">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white tracking-wide">
              Custom Sign Dictionaries : <span className="font-normal text-white/50">Users can create custom sign gestures to their dictionaries, which the avatar can use to perform specific words/phrases relevant to their needs</span>
            </h4>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white tracking-wide leading-relaxed">
              Translation one Language to other : <span className="font-normal text-white/50">People belonging to different regions/countries have different languages of their own. For them to understand other languages can be challenging so with the use of this feature while communicating with other you can hear other individuals speech in you regional/country language.</span>
            </h4>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "technical",
    navLabel: "Tech Constraints",
    label: "Constraints",
    title: "Technical Considerations",
    content: (
      <div className="space-y-8">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-8">Understand our Target Audiences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: <Accessibility size={24} />, title: "Precise Upper Body Tracking", color: "bg-purple-500", accent: "border-purple-500/30 bg-purple-500/5", text: "text-purple-400" },
              { icon: <Gauge size={24} />, title: "Speed Adjustment of Avatar", color: "bg-blue-500", accent: "border-blue-500/30 bg-blue-500/5", text: "text-blue-400" },
              { icon: <Repeat size={24} />, title: "Repetition feature", color: "bg-emerald-500", accent: "border-emerald-500/30 bg-emerald-500/5", text: "text-emerald-400" }
            ].map((card, i) => (
              <div key={i} className={`p-6 rounded-[3rem] border ${card.accent} flex items-center gap-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}>
                <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  {card.icon}
                </div>
                <h4 className={`text-lg font-bold tracking-wide ${card.text}`}>{card.title}</h4>
              </div>
            ))}
          </div>

          {/* Right Column: Graphic */}
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full opacity-50" />
            <img 
              src="/samsung/Technical Consideration.png" 
              alt="Technical Interface Graphic" 
              className="relative z-10 w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "avatar-feature",
    navLabel: "Feature Detail",
    label: "Features",
    title: "Avatar translator feature for Deaf & Mute individuals",
    content: (
      <div className="space-y-12">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-12">Understand our Target Audiences</p>
        
        <div className="space-y-10 max-w-4xl">
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-white tracking-wide">
              Overview : <span className="font-normal text-white/50">This use case aims to facilitate <span className="text-white/90 font-medium">real-time communication between Deaf and mute individuals</span> within a VR environment.</span>
            </h4>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-bold text-white tracking-wide">
              Entry Point : <span className="font-normal text-white/50">Deaf and Mute user enters a VR environment (Google Meet) and initiates a session.</span>
            </h4>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white tracking-wide">Novel Interactions:</h4>
            <ul className="space-y-4 pl-6">
              <li className="text-lg text-white/50 leading-relaxed">
                <span className="text-white font-bold">Avatar-Based Sign Language Translation :</span> Deaf users will have avatars capable of Translating sign language gestures to speech in real-time for the hearing participants.
              </li>
              <li className="text-lg text-white/50 leading-relaxed">
                <span className="text-white font-bold">AI-Powered Sign Language Recognition :</span> Smart & advanced AI will accurately recognise and help interpret sign language gestures.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-bold text-white tracking-wide">
              Exit Point : <span className="font-normal text-white/50">Users end the communication session and exits the VR environment.</span>
            </h4>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "user-flow",
    navLabel: "User Flow",
    label: "Process",
    title: "User Flow",
    content: (
      <div className="space-y-16">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-12">Step-by-step interaction mapping</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Setup & Recording */}
          <div className="space-y-4">
            <h4 className="text-xs text-blue-400 uppercase tracking-[0.2em] font-black mb-8 px-4">Phase 01: Setup & Recording</h4>
            {[
              { icon: <User size={20} />, text: "Saleha has a meeting to attend." },
              { icon: <Glasses size={20} />, text: "Puts on the Samsung VR headset and turns it on." },
              { icon: <Settings size={20} />, text: "Goes to settings." },
              { icon: <BookOpen size={20} />, text: "Opens the \"Gesture Dictionary.\"" },
              { icon: <Sparkles size={20} />, text: "\"Add New Gesture\"." },
              { icon: <Video size={20} />, text: "\"Record New Gesture\"." },
              { icon: <Settings size={20} />, text: "The device asks permission to use the camera." },
              { icon: <Camera size={20} />, text: "\"Enable Device Camera\"." },
              { icon: <Target size={20} />, text: "Press X to start the recording." },
              { icon: <Target size={20} />, text: "Press Y to finish the recording." },
              { icon: <Layout size={20} />, text: "Type a phrase for the gesture in the Text panel." },
              { icon: <Settings size={20} />, text: "\"Save Gestures\"." },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.06] group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <p className="text-sm text-white/70 leading-snug">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Column 2: Calibration & Enabling */}
          <div className="space-y-4">
            <h4 className="text-xs text-purple-400 uppercase tracking-[0.2em] font-black mb-8 px-4">Phase 02: Calibration & Enabling</h4>
            {[
              { icon: <TestTube size={20} />, text: "To test the added gestures." },
              { icon: <Target size={20} />, text: "Clicks the test button for one of the added gestures in the dictionary (I am sorry)." },
              { icon: <Accessibility size={20} />, text: "Performs the gestures and checks them." },
              { icon: <Settings size={20} />, text: "The gestures could be edited/ saved if now changes are made." },
              { icon: <Accessibility size={20} />, text: "Then in settings \"Accessibility Section\"" },
              { icon: <Accessibility size={20} />, text: "\"Hearing enhancement\"." },
              { icon: <Globe size={20} />, text: "\"Preferred Language\" turns on the feature." },
              { icon: <Settings size={20} />, text: "A pop-up comes indicating \"Avatar Translator Feature is Off\"." },
              { icon: <Settings size={20} />, text: "\"Enable Avatar Translator\"." },
              { icon: <Sparkles size={20} />, text: "The feature is enabled." },
              { icon: <Globe size={20} />, text: "Chooses the preferred language, ASL (American Sign Language)." },
              { icon: <Settings size={20} />, text: "Closes the setting tab." },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.06] group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <p className="text-sm text-white/70 leading-snug">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Column 3: The Meeting */}
          <div className="space-y-4">
            <h4 className="text-xs text-rose-400 uppercase tracking-[0.2em] font-black mb-8 px-4">Phase 03: The Meeting</h4>
            {[
              { icon: <Video size={20} />, text: "Clicks on \"Google Meet Application\"." },
              { icon: <Settings size={20} />, text: "Enable the accessibility features from Samsung XR headset settings in Navigation Panel." },
              { icon: <Video size={20} />, text: "Clicks on \"New Meeting\" to generate a meeting link." },
              { icon: <Globe size={20} />, text: "Share the link with the participant to join the meeting." },
              { icon: <Users size={20} />, text: "The participant joins, and the meeting begins." },
              { icon: <Accessibility size={20} />, text: "Saleha makes gestures that are converted into speech by the avatar." },
              { icon: <User size={20} />, text: "Abhishek speaks, and his speech is converted into sign language." },
              { icon: <Sparkles size={20} />, text: "At the end of the meeting, Saleha selects the Heart gesture from the reaction options." },
              { icon: <Sparkles size={20} />, text: "Heart emojis appear around the avatar, conveying user's emotions." },
              { icon: <Target size={20} />, text: "The meeting ends." },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.06] group">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <p className="text-sm text-white/70 leading-snug">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "prototype",
    navLabel: "Prototype",
    label: "Demo",
    title: "Interactive Prototype.",
    content: (
      <div className="space-y-8">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-12">Witness the translation in action</p>
        
        <div className="w-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_50px_rgba(168,85,247,0.15)] group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <video 
            src="/samsung/Prototype Video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-[1.01]" 
          />
          
          {/* Decorative Overlay */}
          <div className="absolute top-8 right-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Live Demo</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "outcomes",
    navLabel: "Future Scope",
    label: "Future",
    title: "Future Scope",
    content: (
      <div className="space-y-12">
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <p className="text-sm text-white/40 tracking-widest uppercase">Deaf & Mute communicating with Normal User</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center px-4">
          {[
            {
              title: "Emotional Intelligence",
              desc: "Recognise and convey emotions in both spoken and sign language, fostering empathetic communication.",
              delay: "0ms"
            },
            {
              title: "Context-Aware Translations",
              desc: "Understand conversation contexts (e.g., formal, casual) for more accurate and appropriate sign language translations.",
              delay: "100ms"
            },
            {
              title: "AR Integration",
              desc: "Enabling users to see the avatar's sign language translations and real-time visual support in educational settings.",
              delay: "200ms"
            }
          ].map((scope, i) => (
            <div key={i} className="relative group perspective-1000">
              {/* Background Glow/Bubble */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-600/20 blur-3xl opacity-40 rounded-full group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Main Card */}
              <div className="relative p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col gap-6 shadow-2xl min-h-[320px] transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/[0.06] group-hover:border-white/20">
                {/* Sparkle Decoration */}
                <div className="absolute top-6 right-6">
                  <Sparkles size={20} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </div>
                
                <h4 className="text-xl font-bold text-white tracking-tight">{scope.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  {scope.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "learnings",
    navLabel: "Learnings",
    label: "Success",
    title: "Learnings",
    content: (
      <div className="space-y-12">
        <p className="text-sm text-white/40 tracking-widest uppercase -mt-4 mb-12">Stepping stone towards success</p>
        
        <div className="relative space-y-12 pl-4">
          {/* Timeline Line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-px border-l-2 border-dashed border-white/10 z-0" />
          
          {[
            { icon: <Users size={20} />, title: "Incorporating Feedbacks", desc: "Continuous user feedback" },
            { icon: <Repeat size={20} />, title: "Problem Solving", desc: "Addressing challenges related to accessibility" },
            { icon: <Lightbulb size={20} />, title: "Future Forward Thinking", desc: "Exploring technology innovation" },
            { icon: <User size={20} />, title: "Project Management", desc: "Coordinating, managing timelines" }
          ].map((learning, i) => (
            <div key={i} className="relative z-10 flex items-center gap-10 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all duration-300 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 group-hover:text-purple-400 shadow-xl backdrop-blur-md">
                {learning.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold text-white tracking-wide">{learning.title}</h4>
                <p className="text-base text-white/40 font-light">{learning.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 p-[1px]">
            <div className="rounded-[14px] bg-[#080c14]/90 backdrop-blur-xl p-8 md:p-10 text-center">
              <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">Final thought</h4>
              <p className="text-lg md:text-xl tracking-wide font-normal text-white/90 leading-relaxed italic mb-6">
                "The most powerful thing a Samsung Avatar can do isn't look like you. It's speak for you — especially when the world hasn't given everyone an equal voice."
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

export default function SamsungCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
      <div className="fixed w-[809px] h-[809px] left-[-20vw] top-[-10vh] origin-top-left -rotate-[17deg] opacity-50 bg-gradient-to-b from-blue-600 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] left-[10vw] bottom-[-20vh] origin-top-left rotate-[60deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      {/* Header Section - Centered & Narrower */}
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
          Samsung Avatar: One World
        </h1>
        <p className="text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-16 max-w-3xl mx-auto">
          Connecting every voice — exploring novel XR use cases for Samsung Avatars, culminating in an accessibility-first sign language communication tool.
        </p>
        
        <div className="w-full mb-20">
          <div className="w-full aspect-[16/9] bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center text-white/50 overflow-hidden relative shadow-2xl">
            <video src="/samsung/Prototype Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 py-10 rounded-3xl bg-white/5 border border-white/10 mb-20">
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Role</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">XR Concept Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 md:border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Team</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">4 People (Abhishek, Saleha, Shubhanshu, Sumesh)</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Timeline</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">6 Weeks</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Tools</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">UE5, Figma, Blender, After Effects</p>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto relative px-6 pb-40">
        
        {/* Left Sidebar Container - Positioned absolutely to the left of the centered content */}
        <div className="hidden lg:block absolute right-full mr-72 top-0 bottom-0 w-[220px]">
          <AnimatePresence>
            {showSidebar && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="sticky top-0 h-screen flex flex-col justify-center"
              >
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
                            className={`transition-all duration-300 ${isActive ? "text-white scale-110" : "text-white/40 group-hover:text-white/90 group-hover:scale-105"}`}
                            size={20}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                        </div>
                        <span className={`text-base tracking-wide transition-all duration-300 ${isActive ? "font-bold text-white opacity-100" : "font-medium text-white/60 group-hover:text-white/90"}`}>
                          {section.navLabel}
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <div className="w-full">
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
