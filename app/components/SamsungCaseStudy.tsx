"use client";

import { useEffect, useState } from "react";
import { 
  Building2, Users, Route, Search, Target, User, Lightbulb, 
  Glasses, Layout, BookOpen, Layers, TestTube, Globe, Settings, Sparkles, Accessibility, Gauge, Repeat, Camera,
  Smartphone, Monitor, Share2, LayoutDashboard, Video, ShieldAlert, AlertCircle, Star, Apple, Scan, Lock, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
  "demo-video": Video,
  "solution": Layout,
  "userflow": Route,
  "outcomes": TestTube
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
    id: "demo-video",
    navLabel: "Demo Video",
    label: "Demo",
    title: "Concept Video",
    content: (
      <div className="space-y-6">
        <div className="w-full rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden p-3 group transition-all duration-500 hover:bg-white/[0.07]">
          <div className="relative w-full aspect-video rounded-[1.8rem] overflow-hidden shadow-2xl">
            <video 
              src="/samsung/Demo Video.mp4" 
              controls 
              playsInline 
              className="w-full h-full object-cover"
            />
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
      <div className="space-y-12">
        <p className="text-xl md:text-2xl font-light tracking-wide text-white/80 leading-relaxed max-w-4xl">
          As the lead XR Concept Designer for this Samsung PRISM project, I steered the design strategy from initial desk research to the final high-fidelity prototype video.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Primary Research",
              desc: "Conducted surveys with 45+ participants and synthesized interview data into actionable insights."
            },
            {
              title: "Concept Design",
              desc: "Ideated 5+ unique use cases for Samsung Avatars, eventually pivoting to a high-impact accessibility solution."
            },
            {
              title: "UI/UX Strategy",
              desc: "Designed the VR-first interaction dictionary and multi-phase user workflows."
            },
            {
              title: "Prototyping & Motion",
              desc: "Directed and edited the final high-fidelity prototype video demonstrating the Avatar Translator in action."
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
        <div className="w-full mt-8 overflow-x-auto pb-6">
          <div className="min-w-[950px] md:min-w-full w-full relative px-0">
            {/* Header */}
            <div className="grid grid-cols-6 text-center mb-6">
              {['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5', 'WEEK 6'].map((week) => (
                <div key={week} className="text-[9px] md:text-xs font-bold text-white/40 tracking-widest uppercase">
                  {week}
                </div>
              ))}
            </div>

            {/* Gantt Area */}
            <div className="relative mt-2">
              {/* Background Columns */}
              <div className="absolute inset-0 flex pointer-events-none">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex-1 mx-1 bg-white/[0.03] rounded-lg"></div>
                ))}
              </div>

              {/* Tasks */}
              <div className="relative z-10 py-4 flex flex-col gap-2">
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
                  <div key={i} className="w-full h-8 relative">
                    <div 
                      className="absolute h-full"
                      style={{ left: task.left, width: task.width }}
                    >
                      <div className={`h-full w-full flex items-center px-2 border rounded-md transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:brightness-125 ${task.color} overflow-hidden`}>
                        <span className="text-[11.5px] md:text-[11px] font-semibold tracking-tight truncate w-full z-20 relative">{task.name}</span>
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
    navLabel: "Research",
    label: "Desk Research",
    title: "Information Gathered from Online Sources",
    content: (
      <div className="space-y-6">
        {/* Horizontal Topic Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-0 py-10 border-b border-white/5">
          {[
            { icon: Globe, title: "Samsung", sub: "Ecosystem" },
            { icon: BookOpen, title: "Samsung", sub: "VR History" },
            { icon: User, title: "Avatar", sub: "WHAT? WHY? WHERE?" },
            { icon: Users, title: "Competitors", sub: "Their ecosystem" },
            { icon: Glasses, title: "Immersive Spaces", sub: "Roblox, Fortnite etc." },
            { icon: TestTube, title: "Samsung", sub: "Avatar Synthesis" }
          ].map((topic, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="flex items-center w-full mb-6">
                <div className="flex-1 h-[2px] border-t-2 border-dotted border-white/30 opacity-0 lg:opacity-100 group-first:opacity-0" />
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <topic.icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex-1 h-[2px] border-t-2 border-dotted border-white/30 opacity-0 lg:opacity-100 group-last:opacity-0" />
              </div>
              <div className="flex flex-col items-center px-4">
                <span className="text-[13px] font-bold text-white tracking-wide uppercase">{topic.title}</span>
                <span className="text-[10px] text-white/40 tracking-[0.1em] uppercase mt-2 leading-tight font-medium max-w-[120px]">{topic.sub}</span>
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
        </div>
      </div>
    ),
  },
  {
    id: "competitive",
    navLabel: "Research",
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
    navLabel: "Research",
    label: "Stakeholders",
    title: "Identifying Stakeholders",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Defining the stakeholders.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Column */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-center min-h-[80px]">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase text-white/90">Primary</h4>
            </div>
            <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center flex items-center justify-center min-h-[60px]">
              <span className="text-xs font-bold text-purple-200/80">Inclusive GenZ's & Millennials</span>
            </div>
          </div>

          {/* Secondary Column */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-center min-h-[80px]">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase text-white/90">Secondary</h4>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex items-center justify-center min-h-[60px]">
                <span className="text-xs font-bold text-white/60">Gamers</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex items-center justify-center min-h-[60px]">
                <span className="text-xs font-bold text-white/60">Developers</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex items-center justify-center min-h-[60px]">
                <span className="text-xs font-bold text-white/60">Content Creators</span>
              </div>
            </div>
          </div>
        </div>

          {/* Target Audience Banner */}
          <div className="w-full p-8 md:p-12 rounded-3xl bg-gradient-to-r from-purple-900/40 via-fuchsia-900/40 to-pink-900/40 border border-white/10 flex flex-col md:flex-row items-center gap-8 group transition-all duration-500 hover:border-purple-500/30">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
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
    navLabel: "Research",
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

        {/* Interview Results Visualization */}
        <div className="w-full mt-12 py-8 px-2 md:px-6 bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden group transition-all duration-500 hover:bg-white/[0.07]">
          <div className="relative w-full max-w-[800px] mx-auto">
            <img 
              src="/samsung/Interview result chart.png" 
              alt="Interview Results Visualization" 
              className="w-full h-auto rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </div>
        </div>

        <div className="mt-24 mb-16 relative">
          <div className="flex flex-col mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-6 block">Synthesis</span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Research Insights</h3>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            {/* Category: Device Ecosystem */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-blue-400">
                  Device Ecosystem
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Gen-Z users have Samsung & Apple Branded gadgets",
                  "Major user's gadgets belong to Apple Brand",
                  "Millennials have different devices with different brands",
                  "Gen-Z have different devices of different brands"
                ].map((text, i) => (
                  <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02]">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mb-4 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category: Usage Patterns */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-emerald-400">
                    Usage Patterns
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Avatar usage found in social media apps (Snapchat) & gaming",
                    "Avatar usage found in social media; current Avatars look cartoonish"
                  ].map((text, i) => (
                    <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mb-4 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category: Future Tech */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-purple-400">
                    Future Tech
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Future usage on social media interaction, virtual meeting & shopping",
                    "Single point virtual avatar expressing body language & voice"
                  ].map((text, i) => (
                    <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mb-4 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category: Virtual Assistance */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-amber-400">
                  Smart Assistance
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Virtual assistance to handle everyday tasks at home & smart home management",
                  "Virtual assistance with food command and guide map integration"
                ].map((text, i) => (
                  <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 flex items-center gap-6">
                    <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 shadow-[0_0_100px_rgba(245,158,11,0.5)]" />
                    <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
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
    id: "initial-problem",
    navLabel: "Research",
    label: "Define",
    title: "Problem Statement",
    content: (
      <div className="space-y-6">

        
        <ProblemCard 
          title="Core Problem" 
          content="Very few Samsung device users are aware of the avatar features available in AR Zone, leading to underutilisation of avatar within the Samsung ecosystem, including the XR domain. We need to explore opportunities for integrating avatars more effectively & increasing user engagement by understanding the needs and preferences of Gen Z."
        />


      </div>
    ),
  },
  {
    id: "empathy",
    navLabel: "Research",
    label: "Synthesis",
    title: "Empathy Mapping",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-4">
          Mapping out the desires, frustrations, and device behaviors of our two primary demographic segments to find overlapping pain points.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Gen-Z Students */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <h4 className="text-lg font-bold text-white/90 tracking-tight">Gen-Z Students</h4>
            </div>
            <div className="w-full rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01] group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/samsung/Genz Students.png")}>
              <img src="/samsung/Genz Students.png" alt="Gen Z Students Empathy Map" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </div>

          {/* Millennial Professionals */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <h4 className="text-lg font-bold text-white/90 tracking-tight">Millennial Professionals</h4>
            </div>
            <div className="w-full rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01] group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/samsung/Millennials Professions.png")}>
              <img src="/samsung/Millennials Professions.png" alt="Millennials Empathy Map" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ideation",
    navLabel: "Research",
    label: "Ideation",
    title: "Concepts",
    content: (
      <div className="space-y-16">
        {/* Round 1 */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-white/90">Round 1 — Initial Ideas</h3>

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
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Concept 0{concept.id}</span>
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
    navLabel: "Research",
    label: "Accessibility",
    title: "Why we choose Accessibility?",
    content: (
      <div className="space-y-8">

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Card 1: Samsung's Philosophy */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
            {/* Subtle Gradient Backdrop */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full group-hover:bg-rose-500/20 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8">
                <Accessibility size={24} className="text-rose-400" />
              </div>
              <h4 className="text-xs font-black tracking-[0.2em] uppercase text-rose-400 mb-6">Samsung Philosophy</h4>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                Samsung designs their products with <span className="text-rose-400 font-medium">accessibility in mind</span> & believes that everyone should have equal access to technology, regardless of their abilities.
              </p>
            </div>
          </div>

          {/* Card 2: Our Strategic Aim */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
            {/* Subtle Gradient Backdrop */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8">
                <Sparkles size={24} className="text-purple-400" />
              </div>
              <h4 className="text-xs font-black tracking-[0.2em] uppercase text-purple-400 mb-6">Strategic Aim</h4>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                Our aim is to <span className="text-purple-400 font-medium">bridge the communication gap</span> within deaf & mute individuals with the help of an avatar-based communication tool.
              </p>
            </div>
          </div>
        </div>


      </div>
    ),
  },
  {
    id: "research-goals",
    navLabel: "Research",
    label: "Synthesis",
    title: "Goal of our Research",
    content: (
      <div className="space-y-6">

        
        <div className="space-y-12 py-8">
          {/* Hero Goal Statement Wrapped */}
          <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
            <h4 className="text-xl md:text-2xl font-light leading-tight text-white/90">
              Our primary goal was to deeply understand the <span className="text-purple-400 font-medium">communication needs</span> and lived experiences of deaf & mute individuals.
            </h4>
          </div>

          {/* Sub-Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8">
                <Sparkles size={24} className="text-purple-400" />
              </div>
              <p className="text-xl leading-relaxed text-white/70">
                Developing solutions that <span className="text-white font-medium">simplify and enhance</span> their everyday communication experiences through XR.
              </p>
            </div>

            <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8">
                <Globe size={24} className="text-blue-400" />
              </div>
              <p className="text-xl leading-relaxed text-white/70">
                Exploring the nuances of <span className="text-white font-medium">sign language, lip reading, and writing</span> across diverse regions and cultures.
              </p>
            </div>
          </div>
        </div>

        <ProblemCard 
          title="The Challenge" 
          content="How might we utilize Samsung's existing Avatar ecosystem to create a real-time sign language translation tool that empowers deaf and mute individuals to communicate more naturally in immersive virtual spaces?" 
        />
      </div>
    ),
  },
  {
    id: "accessibility-insights",
    navLabel: "Research",
    label: "Synthesis",
    title: "Research Insights.",
    content: (
      <div className="mt-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Category: Communication Modes */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-rose-400">
                Communication Modes
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/20 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Communication through sign language, lip reading & writing.",
                "Ways of learning sign language varies by region, state, and nation.",
                "Lip reading cannot be understood by every person."
              ].map((text, i) => (
                <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02] min-h-[160px]">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mb-4 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                  <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category: Social Interaction */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-blue-400">
                  Social Interaction
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Eager to connect with relatives and guests in-person or via Video Calls.",
                  "Enjoys watching movies and engaging with new people in their environment."
                ].map((text, i) => (
                  <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 min-h-[160px]">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mb-4 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Emotional Needs */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-purple-400">
                  Emotional Expression
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Emotions conveyed via touch, facial expressions, and digital cues.",
                  "Visual and emotional representation is critical for effective communication."
                ].map((text, i) => (
                  <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 min-h-[160px]">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mb-4 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category: Tech Proficiency */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-emerald-400">
                Digital Behavior
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Highly interested in exploring and using the latest gadget ecosystems.",
                "Proficient in digital creation, gaming, and smartphone multitasking."
              ].map((text, i) => (
                <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 flex items-center gap-6 min-h-[110px]">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <p className="text-xs leading-relaxed text-white/70 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "pain-points",
    navLabel: "Research",
    label: "Synthesis",
    title: "Major Pain points.",
    content: (
      <div className="space-y-6">

        
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
    navLabel: "Research",
    label: "Strategy",
    title: "Opportunities.",
    content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Avatar Integration",
              label: "Recognition",
              color: "bg-blue-500",
              glow: "bg-blue-500/10",
              points: [
                "Recognize and translate regional sign languages.",
                "Convey and interpret emotions effectively."
              ]
            },
            {
              title: "Communication Tools",
              label: "Translation",
              color: "bg-emerald-500",
              glow: "bg-emerald-500/10",
              points: [
                "Sign language-to-speech and speech-to-sign language functionalities."
              ]
            },
            {
              title: "Social Connectivity",
              label: "Inclusion",
              color: "bg-purple-500",
              glow: "bg-purple-500/10",
              points: [
                "Video calls with avatars that bridge communication gaps between deaf, mute, and hearing individuals."
              ]
            }
          ].map((opp, i) => (
            <div key={i} className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02]">
              {/* Subtle Gradient Backdrop */}
              <div className={`absolute -bottom-20 -right-20 w-48 h-48 ${opp.glow} blur-[60px] rounded-full group-hover:scale-110 transition-transform duration-700`} />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className={`w-3 h-3 rounded-full ${opp.color} shadow-[0_0_15px_rgba(59,130,246,0.3)]`} />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/20 group-hover:text-white/40 transition-colors">{opp.label}</span>
                </div>
                
                <h4 className="text-xl font-bold tracking-tight text-white/90 leading-tight">{opp.title}</h4>
                
                <div className="space-y-4">
                  {opp.points.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-white/60 font-normal">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
    ),
  },
  {
    id: "persona",
    navLabel: "Research",
    label: "User Persona",
    title: "Deaf & Mute Student",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          After pivoting to accessibility, we built a persona grounded in real research on deaf and mute communication needs — not assumptions.
        </p>

        <div className="mt-8 group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/samsung/Persona.png")}>
          <img 
            src="/samsung/Persona.png" 
            alt="User Persona: Saleha" 
            className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" 
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

        
        <ProblemCard 
          title="Revised Problem Statement" 
          content="Deaf and mute individuals face communication challenges with hearing people due to varying sign languages. We aim to bridge this gap by developing inclusive avatar features for Samsung XR devices, enabling efficient real-time translation and enhanced emotional expression for a truly connected interaction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          {/* XR Communication Diagram Asset */}
          <div className="relative w-full rounded-3xl overflow-hidden group cursor-zoom-in" onClick={() => (window as any).setSelectedImage("/samsung/XR Communication.png")}>
            <div className="absolute inset-0 bg-white/5 blur-3xl opacity-20" />
            <img 
              src="/samsung/XR Communication.png" 
              alt="XR Communication Diagram" 
              className="relative z-10 w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
            />
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

        
        <div className="grid grid-cols-1 gap-6 mt-8">
          {[
            {
              title: "Custom Sign Dictionaries",
              desc: "Users can create custom sign gestures to their dictionaries, which the avatar can use to perform specific words/phrases relevant to their needs.",
              color: "bg-blue-500"
            },
            {
              title: "Multi-Language Translation",
              desc: "Seamlessly translate between different regional and international languages. Users can hear other individuals' speech translated into their own regional language through their personal avatar.",
              color: "bg-emerald-500"
            }
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_rgba(59,130,246,0.3)]`} />
                  <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
                </div>
                <p className="text-base leading-relaxed text-white/50 font-normal">
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
    id: "technical",
    navLabel: "Tech Constraints",
    label: "Constraints",
    title: "Technical Considerations",
    content: (
      <div className="space-y-8">

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: <Scan size={24} />, title: "Precise Upper Body Tracking", color: "bg-purple-500", accent: "border-purple-500/30 bg-purple-500/5", text: "text-purple-400" },
              { icon: <Gauge size={24} />, title: "Speed Adjustment of Avatar", color: "bg-blue-500", accent: "border-blue-500/30 bg-blue-500/5", text: "text-blue-400" },
              { icon: <Repeat size={24} />, title: "Repetition feature", color: "bg-emerald-500", accent: "border-emerald-500/30 bg-emerald-500/5", text: "text-emerald-400" }
            ].map((card, i) => (
              <div key={i} className={`p-6 rounded-[2.5rem] border ${card.accent} flex items-center gap-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}>
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

        
        {/* Unified Grid Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Phase 01 */}
          <div className="space-y-6">
            <h4 className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-black mb-4">Phase 01: Setup & Recording</h4>
            <div className="flex flex-col gap-4">
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
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.06] group min-h-[110px]">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 02 */}
          <div className="space-y-6">
            <h4 className="text-[10px] text-purple-400 uppercase tracking-[0.2em] font-black mb-4">Phase 02: Calibration & Enabling</h4>
            <div className="flex flex-col gap-4">
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
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.06] group min-h-[110px]">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 03 */}
          <div className="space-y-6">
            <h4 className="text-[10px] text-rose-400 uppercase tracking-[0.2em] font-black mb-4">Phase 03: The Meeting</h4>
            <div className="flex flex-col gap-4">
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
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.06] group min-h-[110px]">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "prototype",
    navLabel: "Prototype",
    label: "Solution",
    title: "Final Prototype.",
    content: (
      <div className="space-y-6">
        <div className="w-full rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden p-3 group transition-all duration-500 hover:bg-white/[0.07]">
          <div className="relative w-full aspect-video rounded-[1.8rem] overflow-hidden shadow-2xl">
            <video 
              src="/samsung/Prototype Video.mp4" 
              autoPlay 
              loop 
              muted 
              controls 
              playsInline 
              style={{ clipPath: 'inset(0 0 0 0)' }} // Ensures no visual artifacts
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.01] [&::-webkit-media-controls-volume-slider]:hidden [&::-webkit-media-controls-mute-button]:hidden" 
            />
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


        <div className="flex flex-col gap-6">
          {[
            {
              title: "Emotional Intelligence",
              desc: "Recognise and convey emotions in both spoken and sign language, fostering empathetic communication.",
              dotColor: "bg-purple-500",
              glowColor: "rgba(168,85,247,0.4)"
            },
            {
              title: "Context-Aware Translations",
              desc: "Understand conversation contexts (e.g., formal, casual) for more accurate and appropriate sign language translations.",
              dotColor: "bg-blue-500",
              glowColor: "rgba(59,130,246,0.4)"
            },
            {
              title: "AR Integration",
              desc: "Enabling users to see the avatar's sign language translations and real-time visual support in educational settings.",
              dotColor: "bg-emerald-500",
              glowColor: "rgba(16,185,129,0.4)"
            }
          ].map((scope, i) => (
            <div key={i} className="group relative">
              <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-2 h-2 rounded-full ${scope.dotColor} shadow-[0_0_12px_${scope.glowColor}]`} />
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">{scope.title}</h4>
                </div>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-4xl">
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
                — Shubhanshu
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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "shubh238") {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };



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

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-[90] bg-[#0a0a0c] selection:bg-white/30 font-sans flex items-center justify-center p-6">
        {/* Background Glowing Blobs */}
        <div className="absolute w-[400px] h-[400px] left-[-10vw] top-[-5vh] origin-top-left -rotate-[17deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[60s]"></div>
        <div className="absolute w-[740px] h-[740px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-20 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[75s]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-12 text-center backdrop-blur-md shadow-2xl relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
            <Lock size={32} className="text-rose-400" />
          </div>
          
          <div className="mb-4 inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black tracking-[0.2em] uppercase text-rose-400">
            NDA Project
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4">Samsung PRISM</h1>
          
          <p className="text-white/60 mb-8 leading-relaxed font-medium">
            This project is under a Non-Disclosure Agreement. Please mail me on <a href="mailto:hello@shubh.design" className="text-white font-bold hover:underline">hello@shubh.design</a> to get the password.
          </p>

          <form onSubmit={handleUnlock} className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password" 
                className={`w-full bg-black/40 border ${error ? 'border-rose-500' : 'border-white/10 focus:border-white/30'} rounded-xl px-6 py-4 text-white placeholder:text-white/30 outline-none transition-colors text-center tracking-widest font-mono`}
              />
              {error && <span className="absolute -bottom-6 left-0 right-0 text-rose-400 text-xs font-bold">Incorrect password</span>}
            </div>
            <button 
              type="submit"
              className="w-full bg-white text-black font-bold tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-white/90 transition-colors mt-2"
            >
              Unlock Project
            </button>
          </form>
        </motion.div>

        {/* Footer Navigation for Locked State */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1200px] mx-auto px-6 py-8 flex flex-row items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col items-start pointer-events-auto">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Previous Project</p>
            <Link href="/case-study/rgzp" className="group flex items-center gap-2 text-white/50 hover:text-white transition-all font-bold text-sm">
              <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              RGZP Zoo
            </Link>
          </div>
          <div className="flex flex-col items-end pointer-events-auto">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Next Project</p>
            <Link href="/case-study/flytbase" className="group flex items-center gap-2 text-white/50 hover:text-white transition-all font-bold text-sm">
              FlytBase
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent overflow-clip relative selection:bg-white/30 font-sans">
      {/* Background Glowing Blobs - Hidden on mobile */}
      <div className="fixed hidden md:block w-[400px] h-[400px] left-[-10vw] top-[-5vh] origin-top-left -rotate-[17deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[60s]"></div>
      <div className="fixed hidden md:block w-[740px] h-[740px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-20 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[75s]"></div>
      
      {/* Header Section - Centered & Narrower */}
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
          Samsung Avatar: One World
        </h1>
        <p className="text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-16 max-w-3xl mx-auto">
          Connecting every voice — exploring novel XR use cases for Samsung Avatars, culminating in an accessibility-first sign language communication tool.
        </p>
        
        <div className="w-full mb-20">
          <div className="w-full aspect-[16/9] rounded-[3rem] overflow-hidden relative">
            <img src="/samsung/Samsung_hero.png" alt="Samsung Avatar Hero" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 py-10 rounded-3xl bg-white/5 border border-white/10 mb-20">
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Role</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">XR Concept Designer</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 md:border-r border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Team</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">4 People (Abhishek, Saleha, Shubhanshu, Sumesh)</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 border-r border-white/10 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Timeline</p>
            <p className="text-sm md:text-base font-semibold text-white/90 leading-snug">6 Weeks</p>
          </div>
          <div className="flex flex-col items-start text-left px-8 mt-8 md:mt-0">
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Tools</p>
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
                  {(() => {
                    const seenLabels = new Set();
                    return sections.map((section) => {
                      if (seenLabels.has(section.navLabel)) return null;
                      seenLabels.add(section.navLabel);

                      // Check if any section with this navLabel is currently active
                      const isActive = sections.find(s => s.id === activeSection)?.navLabel === section.navLabel;
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
                    });
                  })()}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <div className="w-full">
          <div className="lg:hidden mb-16">
            <nav className="flex flex-wrap gap-4">
              {(() => {
                const seenLabels = new Set();
                return sections.map((section) => {
                  if (seenLabels.has(section.navLabel)) return null;
                  seenLabels.add(section.navLabel);

                  const isActive = sections.find(s => s.id === activeSection)?.navLabel === section.navLabel;
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
                });
              })()}
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
        <Link href="/case-study/rgzp" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
          <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          RGZP Zoo Systems
        </Link>
      </div>
      <div className="flex flex-col items-center md:items-end">
        <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Next Project</p>
        <Link href="/case-study/flytbase" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold text-lg">
          FlytBase
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </div>
);
}
