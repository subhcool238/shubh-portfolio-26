"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, RefreshCw, Volume2, Pause, Play, Download } from 'lucide-react';

// --- CONFIGURATION ---
const LFM_KEY = "cad7cc3d0510d5ddbb127bf9f06a6212";
const LFM_USER = "subhcool238"; 
const YT_KEY = "AIzaSyAL_C-qOJTpeqPGMoBeGZpCHx_znUtWMjY";

interface Track {
  name: string;
  artist: string;
  art: string;
}

type Phase = 'idle' | 'searching' | 'loading' | 'playing' | 'paused';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Helper to filter Last.fm placeholders
function pickArt(images: any[]): string {
  if (!images?.length) return '';
  const PLACEHOLDER = '2a96cbd8b46e442fc41c2b86b821562f';
  for (const size of ['extralarge', 'large', 'medium']) {
    const img = images.find(i => i.size === size);
    if (img?.['#text'] && !img['#text'].includes(PLACEHOLDER)) return img['#text'];
  }
  return '';
}

export default function VinylPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [fetching, setFetching] = useState(true);
  const [current, setCurrent] = useState<Track | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [volume, setVolume] = useState(80);
  const [ytReady, setYtReady] = useState(false);
  const [draggedTrack, setDraggedTrack] = useState<Track | null>(null);
  const [isHoveringTurntable, setIsHoveringTurntable] = useState(false);
  const [vinylRot, setVinylRot] = useState(0);

  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const rafRef = useRef<number>(0);
  const rotRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const ytPollRef = useRef<any>(null);
  const turntableRef = useRef<HTMLDivElement>(null);

  // --- 1. FETCH LAST.FM TOP TRACKS ---
  useEffect(() => {
    async function load() {
      for (const period of ['1month', '7day', 'overall']) {
        try {
          const r = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LFM_USER}&api_key=${LFM_KEY}&format=json&limit=4&period=${period}`
          );
          if (!r.ok) continue;
          const data = await r.json();
          const raw = data?.toptracks?.track;
          if (!Array.isArray(raw) || raw.length === 0) continue;

          const list: Track[] = raw.slice(0, 4).map((t: any) => ({
            name: t.name ?? '',
            artist: t.artist?.['#text'] ?? t.artist?.name ?? '',
            art: pickArt(t.image ?? []),
          }));

          setTracks(list);
          setFetching(false);
          return;
        } catch (err) {
          console.error("LFM Fetch Error:", err);
        }
      }
      setFetching(false);
    }
    load();
  }, []);

  // --- 2. YOUTUBE API INIT (POLLING) ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!document.getElementById('yt-iframe-api')) {
      const s = document.createElement('script');
      s.id = 'yt-iframe-api';
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      document.head.appendChild(s);
    }

    function tryCreate() {
      if (!window.YT?.Player || !ytContainerRef.current || ytPlayerRef.current) return;

      clearInterval(ytPollRef.current);
      ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
        height: '1', width: '1',
        playerVars: {
          autoplay: 0, controls: 0, playsinline: 1,
          enablejsapi: 1, origin: window.location.origin,
        },
        events: {
          onReady: () => {
            ytPlayerRef.current.setVolume(volume);
            setYtReady(true);
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === 1) setPhase('playing');
            if (e.data === 2) setPhase('paused');
            if (e.data === 0) setPhase('idle');
          },
          onError: () => setPhase('idle'),
        },
      });
    }

    ytPollRef.current = setInterval(tryCreate, 200);
    tryCreate();

    return () => clearInterval(ytPollRef.current);
  }, []);

  // --- 3. ROTATION ENGINE ---
  useEffect(() => {
    if (phase !== 'playing') {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
      return;
    }
    const tick = (t: number) => {
      if (lastTsRef.current !== null) {
        rotRef.current = (rotRef.current + (t - lastTsRef.current) * 0.025) % 360;
        setVinylRot(rotRef.current);
      }
      lastTsRef.current = t;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // --- 4. PLAY LOGIC ---
  const playTrack = useCallback(async (track: Track) => {
    setCurrent(track);
    setPhase('searching');

    try {
      const q = encodeURIComponent(`${track.name} ${track.artist} official audio`);
      const r = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&videoCategoryId=10&maxResults=1&key=${YT_KEY}`
      );
      const data = await r.json();
      const vid = data?.items?.[0]?.id?.videoId;

      if (!vid || !ytPlayerRef.current) throw new Error('Not found');

      setPhase('loading');
      ytPlayerRef.current.loadVideoById(vid);
      ytPlayerRef.current.setVolume(volume);
    } catch (err) {
      setPhase('idle');
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!ytPlayerRef.current) return;
    if (phase === 'playing') ytPlayerRef.current.pauseVideo();
    else if (phase === 'paused') ytPlayerRef.current.playVideo();
    else if (current) playTrack(current);
  }, [phase, current, playTrack]);

  const handleDragStart = useCallback((e: React.DragEvent, t: Track) => {
    setDraggedTrack(t);
    e.dataTransfer.effectAllowed = 'copy';

    // Build custom vinyl ghost
    const size = 80;
    const cvs = document.createElement('canvas');
    cvs.width = size; cvs.height = size;
    const ctx = cvs.getContext('2d')!;
    
    ctx.beginPath(); ctx.arc(size/2, size/2, size/2-1, 0, Math.PI*2);
    ctx.fillStyle = '#111'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.stroke();
    
    ctx.beginPath(); ctx.arc(size/2, size/2, 4, 0, Math.PI*2);
    ctx.fillStyle = '#000'; ctx.fill();

    e.dataTransfer.setDragImage(cvs, size/2, size/2);
  }, []);

  const handleDragEnd = useCallback((e: any, info: any, track: Track) => {
    setIsHoveringTurntable(false);
    if (!turntableRef.current) return;
    const rect = turntableRef.current.getBoundingClientRect();
    const x = info.point.x;
    const y = info.point.y;

    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      playTrack(track);
    }
  }, [playTrack]);

  return (
    <div className="bg-surface/40 backdrop-blur-md rounded-[40px] border border-white/5 p-8 md:p-12 w-full max-w-5xl mx-auto flex flex-col gap-12 shadow-2xl relative group/player overflow-hidden">
      
      {/* Hidden YT Container */}
      <div className="fixed -top-full -left-full w-1 h-1 opacity-0 overflow-hidden pointer-events-none">
        <div ref={ytContainerRef} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Music className="w-4 h-4 text-white/60" />
          </div>
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/50">What I'm Listening To</h3>
          {phase === 'searching' && <RefreshCw className="w-3 h-3 text-blue-500 animate-spin ml-2" />}
        </div>

        {/* Status Chip */}
        <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all duration-500 ${
          ytReady ? phase === 'playing' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-white/5 border-white/10 text-white/40' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
        }`}>
          {ytReady ? phase === 'playing' ? '● Playing' : phase === 'loading' || phase === 'searching' ? '◌ Searching' : '○ Ready' : '◌ Initializing'}
        </div>
      </div>

      {/* Main UI */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        
        {/* Turntable */}
        <div className="relative flex flex-col items-center">
          <div 
            ref={turntableRef}
            className={`relative w-64 h-64 md:w-80 md:h-80 transition-all duration-500 ${isHoveringTurntable ? 'scale-105 brightness-125' : ''}`}
          >
            <div className="absolute inset-0 rounded-full border border-white/10 bg-black/40 shadow-inner"></div>
            {[85, 70, 55, 40].map((size) => (
              <div key={size} className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.04]"
                style={{ width: `${size}%`, height: `${size}%`, transform: 'translate(-50%, -50%)' }} />
            ))}

            <div className={`absolute inset-4 rounded-full bg-[#080808] shadow-2xl overflow-hidden flex items-center justify-center`}
                 style={{ transform: `rotate(${vinylRot}deg)` }}>
              <AnimatePresence mode="wait">
                {current ? (
                  <motion.div key={current.name} initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full h-full relative">
                    {current.art ? (
                      <img src={current.art} alt="Vinyl" className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <div className="w-full h-full bg-stone-900 flex items-center justify-center text-white/10 text-4xl">♫</div>
                    )}
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 border-[16px] border-black/80 rounded-full"></div>
                  </motion.div>
                ) : (
                  <div className="w-12 h-12 rounded-full border border-white/5 bg-stone-900/50"></div>
                )}
              </AnimatePresence>
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#050505] border border-white/20 z-50 shadow-inner" />
            </div>

            {/* Tonearm */}
            <div className="absolute -right-2 -top-2 md:right-0 md:top-0 z-50">
              <div className="relative transition-transform duration-1000 cubic-bezier(.34,1.4,.64,1)"
                style={{ transform: phase === 'playing' ? 'rotate(28deg)' : 'rotate(0deg)', transformOrigin: '80% 10%' }}>
                <div className="h-6 w-6 rounded-full bg-stone-800 border border-white/10 shadow-2xl flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-white/20"></div>
                </div>
                <div className="ml-2 mt-1 h-32 w-[3px] origin-top rotate-12 bg-gradient-to-b from-stone-600 to-stone-800 rounded-full" />
                <div className="ml-[-8px] mt-[-2px] h-4 w-6 -rotate-12 rounded-sm bg-stone-700 border border-white/10 flex items-center justify-center">
                   <div className="w-[1px] h-3 bg-white/30"></div>
                </div>
              </div>
            </div>

            {!current && (
              <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-48 py-3 rounded-2xl border border-dashed border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                Drag vinyl to play
              </div>
            )}
          </div>

          <div className="mt-12 text-center h-16">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <p className="font-bold text-white text-base tracking-tight">{current.name}</p>
                  <p className="text-sm text-white/40 uppercase tracking-widest mt-1">{current.artist}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8 pt-2">
          <button onClick={togglePlay} className={`relative flex items-center justify-center rounded-full h-14 w-14 transition-all duration-500 bg-black/40 border border-white/10 shadow-xl group/btn`}>
             <svg width="56" height="56" className="absolute inset-0 -rotate-90">
               <circle cx="28" cy="28" r="26.5" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
               <circle cx="28" cy="28" r="26.5" fill="none" stroke="#3b82f6" strokeWidth="3" 
                 strokeDasharray="166" strokeDashoffset={phase === 'playing' ? "40" : "166"} className="transition-all duration-300" />
             </svg>
             {phase === 'playing' ? <Pause className="text-white z-10 w-5 h-5" /> : <Play className="text-white z-10 w-5 h-5 ml-1" />}
          </button>

          <div className="flex flex-col items-center gap-4">
             <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Vol</span>
             <div className="relative rounded-xl p-2 bg-black/40 border border-white/5 shadow-inner">
                <div className="relative h-32 w-3 rounded-full bg-black/60 overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-full bg-blue-500/20 transition-all duration-300" style={{ height: `${volume}%` }}></div>
                </div>
                <input type="range" min="0" max="100" value={volume} onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setVolume(v);
                  if (ytPlayerRef.current) ytPlayerRef.current.setVolume(v);
                }} className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize" style={{ writingMode: 'vertical-lr', direction: 'rtl' } as any} />
                <div className="absolute left-1/2 -translate-x-1/2 w-7 h-3 bg-gradient-to-b from-[#888] via-[#555] to-[#333] rounded-[2px] shadow-xl pointer-events-none z-20 border border-white/10"
                  style={{ bottom: `calc(${volume}% - 6px)` }} />
             </div>
          </div>
        </div>
      </div>

      {/* Album Grid */}
      <div className="border-t border-white/5 pt-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 px-4">
          {fetching ? Array(4).fill(0).map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />)
            : tracks.map((t, i) => (
            <div key={i} className="flex flex-col gap-4 group/album items-center">
              <motion.div className="relative w-full aspect-square" initial="initial" whileHover="hover">
                <motion.div variants={{ initial: { y: 0 }, hover: { y: -30, rotate: 10 } }} className="absolute inset-4 rounded-full bg-[#080808] border border-white/5 shadow-2xl flex items-center justify-center">
                   <div className="w-1/3 h-1/3 rounded-full border border-white/10 bg-stone-900"></div>
                </motion.div>
                <motion.div 
                  drag dragSnapToOrigin 
                  onDrag={(e, info) => {
                    const rect = turntableRef.current?.getBoundingClientRect();
                    if (rect) setIsHoveringTurntable(info.point.x >= rect.left && info.point.x <= rect.right && info.point.y >= rect.top && info.point.y <= rect.bottom);
                  }}
                  onDragEnd={(e, info) => handleDragEnd(e, info, t)}
                  whileHover={{ scale: 1.05 }} className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-stone-950 cursor-grab active:cursor-grabbing shadow-xl z-10">
                  <img src={t.art || '/about/fitness.png'} alt={t.name} className="w-full h-full object-cover grayscale group-hover/album:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover/album:bg-transparent transition-colors"></div>
                  {current?.name === t.name && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />}
                </motion.div>
              </motion.div>
              <div className="text-center">
                <p className="text-[11px] font-bold text-white tracking-tight truncate max-w-[140px]">{t.name}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1 truncate max-w-[140px]">{t.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
