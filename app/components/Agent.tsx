"use client";

import { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import { Loader2 } from "lucide-react";

export default function Agent() {
  const [callStatus, setCallStatus] = useState<"inactive" | "loading" | "active">("inactive");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vapi, setVapi] = useState<any>(null);

  // Initialize Vapi for Voice
  useEffect(() => {
    try {
      // Use the public key provided
      const vapiInstance = new Vapi("38ee3ea1-7192-4b9f-8c63-1f306eced6c8");
      setVapi(vapiInstance);
      
      vapiInstance.on("call-start", () => {
        setCallStatus("active");
        triggerSpline("Happy Button");
      });
      vapiInstance.on("call-end", () => {
        setCallStatus("inactive");
        setIsSpeaking(false);
        triggerSpline("Normal Button");
      });
      vapiInstance.on("speech-start", () => {
        setIsSpeaking(true);
      });
      vapiInstance.on("speech-end", () => {
        setIsSpeaking(false);
      });
      vapiInstance.on("error", (e: any) => {
        console.error("Vapi error", e);
        setCallStatus("inactive");
        setIsSpeaking(false);
        triggerSpline("Normal Button");
      });
    } catch (e) {
      console.error("Failed to init Vapi", e);
    }
  }, []);

  // Helper to trigger events inside Spline
  const triggerSpline = (objectName: string) => {
    const viewer = document.querySelector('spline-viewer') as any;
    if (viewer && viewer.spline) {
      try {
        viewer.spline.emitEvent("mouseDown", objectName);
      } catch (e) {
        console.warn(`Spline trigger failed for ${objectName}:`, e);
      }
    }
  };

  useEffect(() => {
    // 1. Load the Spline Viewer Script
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.92/build/spline-viewer.js";
    script.type = "module";
    document.head.appendChild(script);

    // 2. Wake up Syn by listening to the load event
    const handleLoad = () => {
      setLoading(false);
      
      // Aggressively try to trigger Normal Button a few times
      let attempts = 0;
      const eyeInterval = setInterval(() => {
        triggerSpline("Normal Button");
        attempts++;
        if (attempts > 5) clearInterval(eyeInterval);
      }, 500);
    };

    // We use polling because the element might take a moment to be available
    const checkViewer = setInterval(() => {
      const viewer = document.querySelector('spline-viewer') as any;
      if (viewer) {
        // Aggressively hide logo and hint in shadow DOM
        try {
          if (viewer.shadowRoot) {
            // Remove Spline logo
            const logo = viewer.shadowRoot.querySelector('#logo');
            if (logo) logo.remove();
            
            // Remove hint/hand icon (aggressive search)
            const hint = viewer.shadowRoot.querySelector('#hint');
            if (hint) hint.remove();
            
            // Also search for classes that might be used for hints
            const hints = viewer.shadowRoot.querySelectorAll('[class*="hint"], [id*="hint"]');
            hints.forEach((h: any) => h.remove());

            // Remove any overlay that might contain the hand icon
            const overlays = viewer.shadowRoot.querySelectorAll('div');
            overlays.forEach((div: any) => {
              if (div.innerText.toLowerCase().includes('click') || div.querySelector('svg')) {
                // Be careful not to remove everything, but often the hint is a centered div with an svg
                if (div.style.position === 'absolute' && div.style.display !== 'none') {
                   // This is a bit risky, let's stick to known selectors if possible
                }
              }
            });

            const aTags = viewer.shadowRoot.querySelectorAll('a');
            aTags.forEach((a: any) => {
              if (a.href.includes('spline.design')) a.remove();
            });
          }
        } catch (e) {}

        // Handle load
        if (viewer.spline && !viewer.dataset.loaded) {
          viewer.dataset.loaded = "true";
          handleLoad();
          clearInterval(checkViewer);
        } else if (!viewer.dataset.listening) {
          viewer.dataset.listening = "true";
          viewer.addEventListener('load', () => {
            viewer.dataset.loaded = "true";
            handleLoad();
            clearInterval(checkViewer);
          });
        }
      }
    }, 100);

    return () => {
      clearInterval(checkViewer);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const toggleCall = () => {
    if (callStatus === "active") {
      setCallStatus("loading");
      vapi?.stop();
    } else {
      setCallStatus("loading");
      // Start the voice call with the specific assistant ID
      vapi?.start("2e27bdd1-18c3-45a8-b4fa-5f9b3f88becc");
    }
  };

  // Update cursor text when call status changes while hovering
  useEffect(() => {
    const sphere = document.getElementById('agent-sphere');
    if (sphere && sphere.matches(':hover')) {
      window.dispatchEvent(new CustomEvent("cursor-update", {
        detail: { 
          text: callStatus === "active" ? "stop syn" : "talk to syn",
          state: "text"
        }
      }));
    }
  }, [callStatus]);

  return (
    <>

      {/* Breathing Glow Background (only when active) */}
      {callStatus === "active" && (
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 ease-in-out ${isSpeaking ? 'w-[600px] h-[600px] opacity-100' : 'w-[400px] h-[400px] opacity-50'}`}>
          <div className={`w-full h-full rounded-full blur-[100px] transition-colors duration-1000 ${isSpeaking ? 'bg-fuchsia-500/20' : 'bg-cyan-500/20'} animate-pulse`} />
        </div>
      )}

      {/* Syn — High Fidelity Agent */}
      <div className="w-full h-full flex items-center justify-center pointer-events-none relative overflow-visible group">
        {/* Visual Container - Scales on hover of the hit area */}
        <div className="w-[700px] h-[700px] relative flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none">
          {/* Status Tag - Relative to the visual container but higher z-index if needed */}
          <div 
            className={`absolute top-[60px] z-[100] px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 transition-all duration-700 ${
              (callStatus !== "inactive") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-1.5 h-1.5 rounded-full ${callStatus === 'loading' ? 'bg-white animate-spin' : isSpeaking ? 'bg-fuchsia-400 animate-pulse' : 'bg-cyan-400 animate-pulse'}`} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/90">
                Syn {callStatus === "active" ? (isSpeaking ? "Speaking" : "Listening") : "Booting"}
              </span>
            </div>
          </div>

          {/* @ts-ignore */}
          <spline-viewer 
            url="/aiassistant/scene.splinecode"
            events-target="global"
            hint="false"
            logo="false"
            loading-reveal="instant"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Interaction Hit Area - Only works over the visual sphere */}
        <div 
          id="agent-sphere"
          className="absolute w-[360px] h-[360px] rounded-full z-50 pointer-events-auto cursor-pointer bg-transparent"
          onClick={toggleCall}
          onMouseEnter={() => triggerSpline("Happy Button")}
          onMouseLeave={() => {
            if (callStatus === "inactive") triggerSpline("Normal Button");
          }}
          data-cursor-text={callStatus === "active" ? "stop syn" : "talk to syn"}
        />
      </div>
    </>
  );
}
