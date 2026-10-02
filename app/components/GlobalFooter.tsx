"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function GlobalFooter() {
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);

  // Pin the footer for the reveal effect only when it fits on screen; otherwise it scrolls normally
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const check = () => setFits(el.offsetHeight <= window.innerHeight);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // Do not show footer on the playground page
  if (pathname === "/playground") {
    return null;
  }

  return (
    <div ref={wrapRef} className={fits ? "sticky bottom-0" : "relative"}>
      <Footer />
    </div>
  );
}
