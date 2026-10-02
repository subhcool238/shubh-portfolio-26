"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Eased, inertial wheel scrolling for the whole site (touch devices keep native scrolling).
// The instance is exposed as window.lenis so other components can scroll through it.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.085, autoRaf: true, anchors: true });
    (window as any).lenis = lenis;

    // Pause while something locks the page (preloader, modals set body overflow: hidden)
    const sync = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    sync();

    return () => {
      observer.disconnect();
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Every page opens at the top, including when going back or forward:
  // the browser must not restore the previous scroll position
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const toTop = () => {
      const lenis = (window as any).lenis as Lenis | undefined;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.resize();
      }
      window.scrollTo(0, 0);
    };
    toTop();
    // Again after the new page has painted, in case anything scrolled in between
    const frame = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

// Smoothly scroll to a position or element, through Lenis when it is active
export function smoothScrollTo(target: number | string | HTMLElement) {
  const lenis = (window as any).lenis as Lenis | undefined;
  if (lenis) {
    lenis.scrollTo(target as any);
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
