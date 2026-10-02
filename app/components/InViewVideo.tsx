"use client";

import { useEffect, useRef, VideoHTMLAttributes } from "react";

// Autoplaying video that only downloads and plays once it is scrolled into view,
// and pauses again when it leaves the screen.
export default function InViewVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} preload="none" {...props} />;
}
