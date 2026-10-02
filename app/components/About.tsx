"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="min-h-[90vh] flex items-center py-40 md:py-56 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10 w-full">
        <Reveal className="lg:col-span-4">
          <span className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-8 block">The Pattern</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            <span className="block">Complex</span>
            <span className="block">Systems,</span>
            <span className="block">Made</span>
            <span className="block">Usable</span>
          </h2>
        </Reveal>
        
        <Reveal className="lg:col-span-8 flex flex-col gap-10" delay={0.15}>
          <p className="text-2xl md:text-4xl font-normal leading-snug md:leading-snug text-gray-300">
            I look at a system and figure out how the pieces connect, then design the experience so nobody using it has to think about that complexity.
          </p>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
            From mapping the operations of a 130-acre zoo, to making XR avatars communicate naturally, to building immersive VR classrooms, the result is the same: complicated technology that feels natural to use.
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
        </Reveal>
      </div>
    </section>
  );
}
