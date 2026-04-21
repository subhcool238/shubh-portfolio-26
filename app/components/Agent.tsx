"use client";

import { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, Square, Loader2 } from "lucide-react";
import AIParticleSphere from "./AIParticleSphere";

export default function Agent() {
  const [vapi, setVapi] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<"inactive" | "loading" | "active">("inactive");

  useEffect(() => {
    try {
      const vapiInstance = new Vapi("mock-public-key");
      setVapi(vapiInstance);
      vapiInstance.on("call-start", () => setCallStatus("active"));
      vapiInstance.on("call-end", () => setCallStatus("inactive"));
      vapiInstance.on("error", () => setCallStatus("inactive"));
    } catch (e) {}
  }, []);

  const toggleCall = () => {
    if (callStatus === "active") {
      setCallStatus("loading");
      setTimeout(() => setCallStatus("inactive"), 1000);
    } else {
      setCallStatus("loading");
      setTimeout(() => setCallStatus("active"), 1500);
    }
  };

  const isActiveAI = callStatus === "active" || callStatus === "loading";

  return (
    <>
      {/* Tooltip / Status */}
      <div 
        className={`absolute top-24 right-12 z-50 px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/10 text-sm font-medium transition-all duration-300 shadow-xl ${
          (callStatus !== "inactive") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {callStatus === "loading" && <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-accent-light" /> Connecting...</span>}
        {callStatus === "active" && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Sanky.v2 Listening</span>}
      </div>

      {/* The AI Particle Sphere Entity */}
      <div 
        className="absolute top-[15vh] right-0 translate-x-[5vw] lg:translate-x-[2vw] w-[80vw] h-[40vh] lg:w-[35vw] lg:h-[50vh] max-w-[450px] z-40 cursor-pointer pointer-events-auto"
        onClick={toggleCall}
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           {/* The True 3D Particle Cloud! */}
           <AIParticleSphere isActive={isActiveAI} />
        </div>

        {/* Pulse Animations when active in agent mode */}
        {callStatus === "active" && (
          <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-[ping_2s_ease-out_infinite] opacity-60 pointer-events-none"></div>
        )}
      </div>
    </>
  );
}
