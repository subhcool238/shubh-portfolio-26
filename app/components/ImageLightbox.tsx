"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

// Full-screen image viewer. Opens fitted to the screen; clicking the image zooms in
// (scrollable) so small text is readable. Esc or clicking the backdrop closes it.
export default function ImageLightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!src) return;
    setZoomed(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9000] bg-black/95 backdrop-blur-sm cursor-zoom-out"
          onClick={onClose}
          data-lenis-prevent
        >
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-2">
            <button
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              className="p-3 rounded-full bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
            >
              {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
            <button
              aria-label="Close"
              className="p-3 rounded-full bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
              <X size={20} />
            </button>
          </div>

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full h-full p-4 md:p-12 ${zoomed ? "overflow-auto" : "flex items-center justify-center overflow-hidden"}`}
          >
            <img
              src={src}
              alt="Enlarged view"
              data-cursor-icon="zoom"
              onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
              className={
                zoomed
                  ? "block w-[220%] md:w-[180%] max-w-none h-auto rounded-lg shadow-2xl cursor-zoom-out"
                  : "max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-zoom-in"
              }
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
