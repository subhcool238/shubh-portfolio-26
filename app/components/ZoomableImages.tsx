"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import ImageLightbox from "./ImageLightbox";

// Images smaller than this on screen (logos, icons, avatars) are not worth zooming
export const MIN_ZOOMABLE_WIDTH = 120;

// Wraps a page so that clicking any image inside it opens the large viewer.
// The custom cursor (MouseCursor) shows a zoom icon over the same images.
export default function ZoomableImages({ children }: { children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const close = useCallback(() => setSrc(null), []);

  // Section content defined outside components opens images via window.setSelectedImage(...)
  useEffect(() => {
    (window as any).setSelectedImage = setSrc;
    return () => {
      delete (window as any).setSelectedImage;
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "IMG" || target.closest("a, button, [data-no-zoom]")) return;
    const img = target as HTMLImageElement;
    if (img.getBoundingClientRect().width < MIN_ZOOMABLE_WIDTH) return;
    setSrc(img.currentSrc || img.src);
  };

  return (
    <div data-zoomable-images onClick={handleClick}>
      {children}
      <ImageLightbox src={src} onClose={close} />
    </div>
  );
}
