"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative z-10">
        <div className="lg:col-span-4">
          <span className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 block">The System Designer</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Making Sense of Complex Systems</h2>
        </div>
        
        <div className="lg:col-span-8 flex flex-col gap-8">
          <p className="text-xl md:text-3xl font-normal leading-snug md:leading-snug text-gray-300">
            I don't just design interfaces; I figure out how things connect. I treat every design challenge as a <span className="text-white font-medium bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">spatial puzzle</span> waiting to be solved.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            Whether I’m mapping out the operations of a 130-acre zoo, making XR avatars communicate naturally, or building immersive VR classrooms, my goal is always the same: taking messy, complicated technology and turning it into an experience that feels completely natural for the people using it.
          </p>
          
          <div className="pt-4">
            <Link href="/about" className="group flex items-center gap-3 text-sm tracking-widest text-accent-light hover:text-white transition-colors duration-300">
              <span className="relative overflow-hidden">
                <span className="inline-block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">View Full Profile</span>
                <span className="absolute left-0 top-full inline-block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">View Full Profile</span>
              </span>
              <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
