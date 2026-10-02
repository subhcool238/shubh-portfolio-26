"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "start" | "loading" | "done";

// Thin progress bar at the top of the page: starts when an internal link is clicked,
// completes when the new page has rendered.
export default function NavigationProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const set = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const finish = () => {
    if (phaseRef.current === "idle") return;
    clearTimers();
    set("done");
    timers.current.push(setTimeout(() => set("idle"), 500));
  };

  // Start on clicks that navigate to another page of this site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      clearTimers();
      set("start");
      // Next frame: begin filling. Safety net: never leave the bar hanging.
      requestAnimationFrame(() => requestAnimationFrame(() => { if (phaseRef.current === "start") set("loading"); }));
      timers.current.push(setTimeout(finish, 10000));
    };

    // Capture phase: runs before next/link handles (and "prevents") the click
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The route changed: the new page is on screen
  useEffect(() => {
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const style: React.CSSProperties =
    phase === "loading"
      ? { width: "85%", opacity: 1, transition: "width 8s cubic-bezier(0.1, 0.7, 0.1, 1)" }
      : phase === "done"
      ? { width: "100%", opacity: 0, transition: "width 0.2s ease-out, opacity 0.3s ease 0.2s" }
      : { width: "0%", opacity: phase === "start" ? 1 : 0, transition: "none" };

  return (
    <div aria-hidden className="fixed top-0 left-0 right-0 h-[3px] z-[10002] pointer-events-none">
      <div
        className="h-full rounded-r-full shadow-[0_0_10px_rgba(125,173,255,0.6)]"
        style={{ background: "linear-gradient(90deg, rgba(125,173,255,1) 0%, rgba(210,29,83,1) 100%)", ...style }}
      />
    </div>
  );
}
