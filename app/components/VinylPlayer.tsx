"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const albums = [
  { id: 1, title: "Spatial Awareness", artist: "Syn", cover: "/about/fitness.png" },
  { id: 2, title: "Chrome Dreams", artist: "Syn", cover: "/about/triumph.png" },
  { id: 3, title: "Silicon Valley Beat", artist: "Syn", cover: "/about/travel.png" },
  { id: 4, title: "Deep Work", artist: "Syn", cover: "/about/mountain.png" },
];

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<any>(albums[0]);

  const handleDrop = (e: any, info: any, album: any) => {
    setActiveAlbum(album);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#0D0D0D] rounded-[32px] border border-white/5 p-8 md:p-12 w-full max-w-5xl mx-auto flex flex-col gap-12 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black">
             <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          </div>
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/50">What I'm Listening To</h3>
        </div>
        <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
          SYS.AUDIO_ACTIVE
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center border-b border-white/5 pb-16">
        
        {/* Turntable Area */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 flex items-center justify-center bg-[#050505] rounded-full border border-white/5 shadow-inner">
          {/* Vinyl Grooves */}
          {[90, 80, 70, 60].map((size, i) => (
             <div key={i} className="absolute rounded-full border border-white-[0.02]" style={{ width: `${size}%`, height: `${size}%` }}></div>
          ))}

          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-[95%] h-[95%] rounded-full flex items-center justify-center relative z-10 bg-[#0A0A0A] shadow-xl border border-white/5 overflow-hidden"
          >
             {/* Inner vinyl grooves */}
             <div className="absolute inset-0 rounded-full border-4 border-white/5 m-4"></div>
             <div className="absolute inset-0 rounded-full border border-white/5 m-8"></div>
             <div className="absolute inset-0 rounded-full border border-white/5 m-12"></div>
             
             {/* Center Label */}
            <div className="w-[40%] h-[40%] rounded-full overflow-hidden border-4 border-[#0D0D0D] relative shadow-2xl z-20">
              <img src={activeAlbum.cover} alt="Vinyl Center" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#050505] rounded-full border border-white/20 shadow-inner"></div>
            </div>
          </motion.div>
          
          {/* Drop Target Hint */}
          {!isPlaying && (
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-widest border border-dashed border-white/20 px-6 py-2 rounded-full backdrop-blur-sm bg-black/50 pointer-events-none">
              Drag vinyl to play
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start w-full gap-10">
           <div className="flex flex-col items-center lg:items-start gap-4">
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500">Now Playing</span>
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center lg:text-left">{activeAlbum.title}</h2>
             <p className="text-lg text-white/40 font-light">{activeAlbum.artist}</p>
           </div>

           <div className="flex items-center gap-8">
             <button 
               onClick={() => setIsPlaying(!isPlaying)}
               className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
             >
               {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
             </button>
             
             {/* Fake Volume Slider */}
             <div className="flex items-center gap-4 h-12">
               <span className="text-[10px] text-white/30 font-mono tracking-widest">VOL</span>
               <div className="w-32 h-[2px] bg-white/10 relative rounded-full">
                 <div className="absolute top-1/2 left-[70%] -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md cursor-ew-resize"></div>
                 <div className="absolute top-1/2 left-0 right-[30%] -translate-y-1/2 h-full bg-blue-500 rounded-full"></div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Album Gallery */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/30 pl-2">Record Collection</h4>
        <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar pb-6 px-2">
          {albums.map((album) => (
            <motion.div 
              key={album.id}
              drag
              dragSnapToOrigin
              onDragEnd={(e, info) => handleDrop(e, info, album)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileDrag={{ scale: 1.1, zIndex: 50, opacity: 0.9 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing flex-shrink-0 relative group shadow-xl border border-white/10"
            >
              <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none gap-2">
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
                   <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-white">Drag to Play</span>
              </div>
              
              {/* Mini tag on cover */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                 <span className="text-[8px] font-mono bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white/80 truncate max-w-[80%]">
                   {album.title}
                 </span>
                 {activeAlbum.id === album.id && isPlaying && (
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
