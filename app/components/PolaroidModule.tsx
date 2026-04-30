"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Download, SkipForward, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PolaroidModule = () => {
  const webcamRef = useRef<Webcam>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  
  const [ejectedImg, setEjectedImg] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(true);

  const capture = useCallback(() => {
    // Prevent capturing if already processing
    if (isCapturing || previewImg || ejectedImg) return; 
    
    setIsCapturing(true);
    // Remove getScreenshot reliance for full quality
    const video = webcamRef.current?.video;
    
    // Flash effect
    setTimeout(() => {
      if (video && video.readyState === 4) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 800x960 canvas for crisp high-dpi images
        canvas.width = 800;
        canvas.height = 960;
        
        // Background of the polaroid
        ctx!.fillStyle = '#ffffff';
        ctx!.fillRect(0, 0, 800, 960);
        
        // The image
        const size = Math.min(video.videoWidth, video.videoHeight);
        const startX = (video.videoWidth - size) / 2;
        const startY = (video.videoHeight - size) / 2;
        
        // Draw mirrored image directly from video for true resolution
        ctx!.save();
        ctx!.translate(32 + 736 / 2, 32 + 736 / 2);
        ctx!.scale(-1, 1);
        ctx!.drawImage(video, startX, startY, size, size, -736 / 2, -736 / 2, 736, 736);
        ctx!.restore();
        
        // Draw thin border around image like the screenshot
        ctx!.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx!.lineWidth = 2;
        ctx!.strokeRect(32, 32, 736, 736);

        // Signature/Text - Hand-written style date + time
        ctx!.fillStyle = '#111';
        ctx!.font = 'italic 32px "Comic Sans MS", cursive, sans-serif';
        const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const text = `${dateStr} ${timeStr}`;
        const textWidth = ctx!.measureText(text).width;
        ctx!.fillText(text, 800 - 32 - textWidth, 880);
        
        const finalImg = canvas.toDataURL('image/png');
          
          // 1. Eject animation starts
          setEjectedImg(finalImg);
          
          // 2. After eject animation (1s), show the popup preview
          setTimeout(() => {
             setPreviewImg(finalImg);
          }, 1200);
      }
      setIsCapturing(false);
    }, 150);
  }, [webcamRef, previewImg, ejectedImg, isCapturing]);

  const handleDownload = () => {
    if (previewImg) {
      const a = document.createElement('a');
      a.href = previewImg;
      a.download = `sanky-polaroid-${Date.now()}.png`;
      a.click();
      
      setPhotos(prev => [previewImg, ...prev]);
      setPreviewImg(null);
      setEjectedImg(null);
    }
  };

  const handleSkip = () => {
    if (previewImg) {
      setPhotos(prev => [previewImg, ...prev]);
      setPreviewImg(null);
      setEjectedImg(null);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
         // Don't capture if modal is open, maybe use Enter for Download?
         if (previewImg) {
           handleDownload();
         } else {
           capture();
         }
      } else if (e.key === 'g' || e.key === 'G') {
        setIsGalleryOpen(prev => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMusicOn(prev => !prev);
      } else if (e.key === 'Escape') {
        if (previewImg) handleSkip();
        if (isGalleryOpen) setIsGalleryOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [capture, previewImg, isGalleryOpen, handleDownload, handleSkip]);

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center bg-[#111] overflow-hidden rounded-[24px]">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="flex w-full h-full items-center justify-center gap-16 lg:gap-32 relative z-10">
        
        {/* CSS Polaroid Camera */}
        <div className="relative flex flex-col items-center">
          
          <div className="relative w-80 h-[400px] md:w-[360px] md:h-[440px] rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col z-20 bg-gradient-to-b from-[#222] to-[#111]">
            
            {/* Lower Black Section (Background) - z-10 */}
            <div className="absolute bottom-0 left-0 w-full h-[35%] flex flex-col justify-end pb-4 px-8 z-10 rounded-b-3xl overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500"></div>
               
               <div className="flex justify-between items-end mt-4">
                  {/* Color Stripes */}
                  <div className="flex flex-col gap-[2px]">
                     <div className="w-8 h-1.5 bg-[#e73c3e] rounded-sm"></div>
                     <div className="w-8 h-1.5 bg-[#f58220] rounded-sm"></div>
                     <div className="w-8 h-1.5 bg-[#ffc40d] rounded-sm"></div>
                     <div className="w-8 h-1.5 bg-[#8bc53f] rounded-sm"></div>
                     <div className="w-8 h-1.5 bg-[#009ee3] rounded-sm"></div>
                  </div>
                  
                  <span className="text-white/80 font-bold tracking-[0.2em] text-lg font-sans">Polaroid</span>
               </div>
            </div>

            {/* Flash Overlay - Applies to whole camera */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white animate-out fade-out duration-[400ms] z-50 rounded-3xl pointer-events-none"></div>
            )}

            {/* Top White Section - z-30 */}
            <div className="absolute top-0 left-0 w-full h-[65%] z-30 flex flex-col pointer-events-none">
               <div className="relative w-full h-full bg-gradient-to-b from-[#fdfdfd] to-[#e8e8e8] rounded-t-3xl border-t border-x border-white/80 p-6 pointer-events-auto shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                  
                  {/* Top Bar with Flash, Viewfinder */}
                  <div className="flex justify-between items-start w-full">
                     {/* Flash */}
                     <div className="w-16 h-20 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg border-2 border-gray-100 shadow-inner p-1">
                       <div className="w-full h-full bg-white/50 rounded flex flex-col gap-[2px] overflow-hidden">
                          {[...Array(15)].map((_, i) => (
                            <div key={i} className="w-full h-[2px] bg-gray-400/30"></div>
                          ))}
                       </div>
                     </div>

                     {/* Tiny sensor dot */}
                     <div className="w-4 h-4 rounded-full bg-black shadow-inner mt-2 ml-4">
                        <div className="w-1 h-1 bg-white/40 rounded-full ml-1 mt-1"></div>
                     </div>

                     {/* Viewfinder (Live Webcam) */}
                     <div className="w-16 h-16 bg-[#111] rounded-xl border-4 border-gray-800 shadow-inner overflow-hidden relative ml-auto flex items-center justify-center group cursor-pointer" onClick={capture}>
                        <Webcam 
                           audio={false} 
                           ref={webcamRef} 
                           screenshotFormat="image/png"
                           videoConstraints={{ width: 1920, height: 1080, facingMode: "user" }}
                           className="w-full h-full object-cover transform -scale-x-100" // Mirror the webcam
                        />
                        <div className="absolute inset-0 border-2 border-white/10 rounded-lg pointer-events-none"></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                     </div>
                  </div>

                  {/* Shutter Button */}
                  <button 
                     onClick={capture}
                     className="absolute left-6 top-[130px] w-10 h-10 rounded-full bg-red-600 border-[3px] border-red-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(220,38,38,0.5)] active:scale-95 active:shadow-inner transition-all hover:brightness-110 z-30 pointer-events-auto"
                  ></button>

                  {/* Dark Mode Sensor */}
                  <div className="absolute right-8 bottom-4 w-6 h-6 rounded-full bg-black shadow-inner flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                  </div>

                  {/* Lens Structure (Shifted up to -bottom-10) */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-44 h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.4)] flex items-center justify-center border-4 border-gray-300 z-40 pointer-events-none">
                     <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#111] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center border-2 border-gray-800">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border-4 border-[#0a0a0a] flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,1)]">
                           {/* Lens Glare */}
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#050505] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden">
                              <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-blue-500/10 blur-md"></div>
                              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/30 blur-[1px]"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* The Little Bar (Film Slot) - Just a bar drawn on the black body below the lens */}
            <div className="absolute top-[calc(65%+56px)] left-1/2 -translate-x-1/2 w-[85%] h-6 bg-[#2a2a2a] rounded border border-[#111] shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex items-center justify-center z-30 pointer-events-none">
               <div className="w-[95%] h-2 bg-[#050505] rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,1)] border-b border-white/5"></div>
            </div>

            {/* Ejecting Photo Animation Container - z-20 (Overflow hidden so it slides down visually from the slot) */}
            <div className="absolute top-[calc(65%+56px+14px)] left-0 w-full h-[400px] overflow-hidden pointer-events-none z-20">
               <AnimatePresence>
                  {ejectedImg && (
                     <motion.div 
                        initial={{ y: "-100%" }}
                        animate={{ y: "20px" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                     >
                        <img src={ejectedImg} className="w-full h-auto" alt="Ejected Polaroid" />
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>

          {/* Camera Controls Footer */}
          <div className="flex items-center gap-6 mt-12 text-[10px] font-mono tracking-widest text-white/40 uppercase">
             <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 border border-white/20 rounded text-white shadow-sm bg-white/5">↵</kbd> Capture</span>
             <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 border border-white/20 rounded text-white shadow-sm bg-white/5">G</kbd> Gallery</span>
             <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 border border-white/20 rounded text-white shadow-sm bg-white/5">M</kbd> Music {isMusicOn ? 'ON' : 'OFF'}</span>
          </div>
        </div>

        {/* Compiled Photos Stack on Right */}
        <div className="relative w-56 h-72 hidden lg:block perspective-1000">
          {photos.length === 0 ? (
            <div className="w-full h-full border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-white/20 text-xs font-mono uppercase tracking-widest text-center px-4 bg-white/[0.02]">
              Awaiting Capture
            </div>
          ) : (
            <div className="relative w-full h-full">
              {photos.slice(0, 5).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -100, y: 100, rotate: -20, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    x: i * 6, 
                    y: i * 6, 
                    rotate: (i % 2 === 0 ? 1 : -1) * (i * 3 + 2),
                    scale: 1 
                  }}
                  transition={{ type: "spring", damping: 15 }}
                  className="absolute inset-0 origin-bottom-left drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  style={{ zIndex: 10 - i }}
                >
                  <img src={photo} alt="Compiled Polaroid" className="w-full h-auto" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal Overlay (IP-1 Reference) */}
      <AnimatePresence>
        {previewImg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D0D0D]/95 backdrop-blur-md rounded-[24px]"
            onClick={handleSkip}
          >
            <div 
              className="relative flex flex-col items-center w-full max-w-2xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* The Big Polaroid */}
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="w-[320px] md:w-[400px] relative drop-shadow-2xl"
              >
                <img src={previewImg} alt="Preview" className="w-full h-auto" />
              </motion.div>

              {/* Buttons below the photo */}
              <div className="flex items-center gap-4 mt-12">
                 <button 
                   onClick={handleDownload}
                   className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
                 >
                   <Download className="w-5 h-5" /> 
                   Capture Snapshot
                 </button>
                 <button 
                   onClick={handleSkip}
                   className="px-8 py-4 border border-white/10 text-white rounded-full font-bold hover:bg-white/5 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                 >
                   <SkipForward className="w-4 h-4" /> 
                   Skip
                 </button>
              </div>
              
              <p className="mt-8 text-[9px] font-mono tracking-widest text-white/30 uppercase">
                 *Privacy: Processed locally in-browser. No data stored.*
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Gallery Overlay (Press G) */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "10%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[150] bg-[#111]/95 backdrop-blur-xl overflow-y-auto p-8 md:p-16 rounded-[24px]"
          >
            <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
              <h3 className="text-3xl font-bold tracking-tight text-white">Capture History</h3>
              <button onClick={() => setIsGalleryOpen(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors group">
                 <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            {photos.length === 0 ? (
              <div className="w-full h-64 flex flex-col items-center justify-center text-white/30 font-mono text-sm uppercase tracking-widest gap-4">
                <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center">0</div>
                No captures yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                {photos.map((photo, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, y: -10 }}
                    className="transform transition-all cursor-pointer drop-shadow-xl"
                    style={{ rotate: `${(i % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2)}deg` }}
                    onClick={() => {
                       const a = document.createElement('a');
                       a.href = photo;
                       a.download = `sanky-polaroid-${Date.now()}.png`;
                       a.click();
                    }}
                  >
                    <img src={photo} alt={`Gallery ${i}`} className="w-full h-auto" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
