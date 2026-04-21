"use client";

import { MoveRight } from "lucide-react";

export default function About() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative z-10">
        <div className="lg:col-span-4">
          <span className="text-gray-400 text-sm tracking-wider mb-4 block">02 // Background: The System Designer</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The System Designer</h2>
        </div>
        
        <div className="lg:col-span-8 flex flex-col gap-8">
          <p className="text-xl md:text-3xl font-normal leading-snug md:leading-snug text-gray-300">
            I don't just design screens; I map ecosystems. My foundation in Immersive Media Design forces me to treat every interface as a <span className="text-white font-medium bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">spatial challenge</span>.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            Whether I am building projection-mapped AR experiences, mapping human-avatar interactions, or structuring logic gates for a VR Metaversity, my focus is bridging deep cognitive psychology with high-fidelity technical execution.
          </p>
          
          <div className="pt-4">
            <button className="group flex items-center gap-3 text-sm tracking-widest text-accent-light hover:text-white transition-colors duration-300">
              <span className="relative overflow-hidden">
                <span className="inline-block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">View Full Resume</span>
                <span className="absolute left-0 top-full inline-block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">View Full Resume</span>
              </span>
              <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
