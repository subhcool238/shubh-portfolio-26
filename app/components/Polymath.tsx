"use client";

import { useState } from "react";
import { Dumbbell, Palette, Mic2, Cpu } from "lucide-react";

export default function Polymath() {
  const [activeTab, setActiveTab] = useState("tech");

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent-light text-sm tracking-wider mb-4 block">03 // The Polymath: Human Performance & Creative Exploration</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Human Performance <br className="hidden md:block"/> & Creative Exploration</h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The best system designers explore multiple disciplines. When I step away from spatial interfaces and local AI automation, my focus shifts to the physical world. You will usually find me training for lean muscle at the gym, exploring creative coding, or mapping out high-altitude Himalayan routes on my Triumph Scrambler 400xc.
        </p>
      </div>

      {/* Custom Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-[#1A1A1A] rounded-full p-1 border border-white/5">
          <button 
            onClick={() => setActiveTab("tech")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "tech" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Cpu className="w-4 h-4" /> Professional
          </button>
          <button 
            onClick={() => setActiveTab("polymath")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "polymath" ? "bg-gradient-to-r from-accent to-accent-dark text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Dumbbell className="w-4 h-4" /> Personal
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[400px] rounded-3xl bg-[#151515] border border-white/5 p-8 md:p-12 overflow-hidden">
        
        {/* Tech View */}
        <div className={`absolute inset-0 p-8 md:p-12 transition-all duration-700 ease-in-out flex flex-col justify-center items-center text-center ${activeTab === "tech" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}`}>
           <h3 className="text-2xl font-bold mb-4 text-white">System Architecture & AI Design</h3>
           <p className="text-gray-400 max-w-lg mb-8">
             My day-to-day involves mapping complex node-based systems, building high-fidelity prototypes in Figma, and writing production-ready React/Next.js code to bring AI agents to life.
           </p>
           <div className="flex gap-4 flex-wrap justify-center">
             {["React/Next.js", "Figma", "GSAP", "LLM Integration", "Spatial UX"].map(skill => (
               <span key={skill} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">{skill}</span>
             ))}
           </div>
        </div>

        {/* Polymath View */}
        <div className={`absolute inset-0 p-8 md:p-12 transition-all duration-700 ease-in-out ${activeTab === "polymath" ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-8 pointer-events-none"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            
            {/* Fitness */}
            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 hover:border-accent-light/30 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Dumbbell className="w-6 h-6 text-accent-light" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Iron & Discipline</h4>
              <p className="text-sm text-gray-400">Consistent weightlifting and metabolic conditioning. Training the body builds the mental resilience required for complex problem-solving.</p>
            </div>

            {/* Painting */}
            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 hover:border-pink-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Canvas & Colors</h4>
              <p className="text-sm text-gray-400">Translating abstract emotions into visual mediums. Painting helps me understand color theory, composition, and organic balance outside of Figma.</p>
            </div>

            {/* Singing */}
            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic2 className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Voice & Rhythm</h4>
              <p className="text-sm text-gray-400">Classical and contemporary singing. Finding harmony and timing in music directly influences the rhythm and pacing of my digital interactions.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
