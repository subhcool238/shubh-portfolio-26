"use client";

import { useEffect, useState, useRef } from "react";
import { useScramble } from "use-scramble";

const styles = {
  linearTextGradient: {
    background: "linear-gradient(90deg, rgba(125,173,255,1) 0%, rgba(210,29,83,1) 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
};

function TextScrambleComponent() {
  const textIndex = useRef(0);
  const skills = [
    "spatial realities",
    "AI ecosystems",
    "immersive systems",
    "human interactions",
  ];

  function getRandomNumber() {
    if (textIndex.current + 1 < skills.length) {
      textIndex.current++;
    } else {
      textIndex.current = 0;
    }
    return textIndex.current;
  }

  const generateWords = () => skills[getRandomNumber()];
  const [scrambleText, setScrambleText] = useState("XR Experience");

  const { ref } = useScramble({
    text: scrambleText,
    speed: 0.3,
  });

  useEffect(() => {
    const intervalRf = setInterval(() => {
      setScrambleText(generateWords());
    }, 1500);
    return () => clearInterval(intervalRf);
  }, []);

  return <span ref={ref} />;
}

export default function Hero() {
  return (
    <section className="h-dvh flex flex-col justify-center bg-transparent w-full relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex w-full items-center justify-between">
        <div className="w-full lg:w-2/3">
          <div className="text-left">
            <p className="text-4xl sm:text-5xl font-bold">
              Hello! I’m <span style={styles.linearTextGradient}>Sanky.</span>{" "}
            </p>
            <p className="text-4xl sm:text-5xl font-bold mt-2">
              I <span className="italic font-normal">design</span>{" "}
              <TextScrambleComponent />
            </p>
          </div>
          <div className="w-full mt-10 font-sans">
            <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed max-w-2xl">
              AI Product Designer & Spatial UX Specialist. With an M.Des in Immersive Media Design, I bridge physical environments and AI ecosystems to build scalable, zero-learning-curve products.
            </p>
          </div>
        </div>
        <div className="w-1/3 hidden lg:flex justify-end">
          {/* Spline Blob is now rendered globally by Agent.tsx and positioned here */}
        </div>
      </div>
      <div className="text-2xl text-center absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#work" className="flex flex-col items-center group">
          <svg
            viewBox="0 0 34 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-12"
          >
            <g opacity={0.7} fillRule="evenodd" clipRule="evenodd" fill="#fff">
              <path d="M16.85 2.66c-7.837 0-14.19 6.353-14.19 14.19v13.3c0 7.837 6.353 14.19 14.19 14.19 7.835 0 14.188-6.353 14.188-14.19v-13.3c0-7.837-6.353-14.19-14.189-14.19zM0 16.85C0 7.543 7.544 0 16.85 0c9.305 0 16.848 7.544 16.848 16.85v13.3c0 9.306-7.544 16.85-16.849 16.85S0 39.456 0 30.15v-13.3z" />
              <path d="M16.85 6.584c.77 0 1.396.626 1.396 1.397v6.651a1.397 1.397 0 11-2.794 0v-6.65c0-.772.626-1.398 1.397-1.398z" />
            </g>
          </svg>
          <p className="pt-2 font-normal text-sm tracking-widest text-white/70">Scroll</p>
        </a>
      </div>
    </section>
  );
}
