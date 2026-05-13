"use client"; // Repairing encoding

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, RefreshCw, Volume2, Pause, Play, Download } from 'lucide-react';

// --- CONFIGURATION ---
const LFM_KEY = "cad7cc3d0510d5ddbb127bf9f06a6212";
const LFM_USER = "subhcool238"; 
const YT_KEY = "AIzaSyDRio5-in_gz4_geEXyrrB7s2gFhwiyGAc";

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

// Helper to filter Last.fm placeholders and pick best available image
function pickArt(images: any[]): string {
  if (!images || !Array.isArray(images) || images.length === 0) return '';
  const PLACEHOLDER = '2a96cbd8b46e442fc41c2b86b821562f';
  
  // Last.fm images are often returned from largest to smallest, but let's be explicit
  const preferredSizes = ['extralarge', 'large', 'medium', 'small'];
  
  for (const size of preferredSizes) {
    const found = images.find(img => img.size === size);
    const url = found?.['#text'];
    if (url && url.length > 0 && !url.includes(PLACEHOLDER)) {
      return url;
    }
  }
  
  // Last resort: find any non-placeholder URL
  for (const img of images) {
    const url = img?.['#text'];
    if (url && url.length > 0 && !url.includes(PLACEHOLDER)) return url;
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
  const [progress, setProgress] = useState(0);

  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const rafRef = useRef<number>(0);
  const rotRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const ytPollRef = useRef<any>(null);
  const turntableRef = useRef<HTMLDivElement>(null);

  // --- PROGRESS TRACKING ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
        try {
          const currentT = ytPlayerRef.current.getCurrentTime();
          const duration = ytPlayerRef.current.getDuration();
          if (duration > 0) setProgress((currentT / duration) * 100);
        } catch (e) {}
      }
    }, 500);
    return () => clearInterval(interval);
  }, [phase]);

  // --- 1. FETCH LAST.FM RECENT TRACKS ---
  useEffect(() => {
    async function load() {
      try {
        // Fetch a larger sample to find tracks with unique artwork
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LFM_USER}&api_key=${LFM_KEY}&format=json&limit=50`;
        const r = await fetch(url);
        if (!r.ok) throw new Error('LFM Fetch Failed');
        const data = await r.json();
        const raw = data?.recenttracks?.track;
        
        if (Array.isArray(raw) && raw.length > 0) {
          const uniqueTracks: Track[] = [];
          const seenNames = new Set();

          // Phase 1: Prioritize tracks WITH artwork
          for (const t of raw) {
            const name = t.name;
            const art = pickArt(t.image ?? []);
            if (!seenNames.has(name) && art !== '') {
              seenNames.add(name);
              uniqueTracks.push({
                name: t.name ?? 'Unknown Track',
                artist: t.artist?.['#text'] ?? 'Unknown Artist',
                art: art,
              });
              if (uniqueTracks.length >= 4) break;
            }
          }

          // Phase 2: If we still need more tracks, add those without artwork
          if (uniqueTracks.length < 4) {
            for (const t of raw) {
              const name = t.name;
              if (!seenNames.has(name)) {
                seenNames.add(name);
                uniqueTracks.push({
                  name: t.name ?? 'Unknown Track',
                  artist: t.artist?.['#text'] ?? 'Unknown Artist',
                  art: '', // Will use high-fidelity fallback in UI
                });
                if (uniqueTracks.length >= 4) break;
              }
            }
          }
          
          setTracks(uniqueTracks);
          setFetching(false);
        }
      } catch (err) {
        console.error("LFM Fetch Error:", err);
        setFetching(false);
      }
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

    const tryCreate = () => {
      if (!window.YT?.Player || !ytContainerRef.current || ytPlayerRef.current) return;

      clearInterval(ytPollRef.current);
      ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
        height: '1', width: '1',
        playerVars: {
          autoplay: 0, 
          controls: 0, 
          playsinline: 1,
          enablejsapi: 1, 
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            ytPlayerRef.current.setVolume(volume);
            setYtReady(true);
          },
          onStateChange: (e: { data: number }) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0, BUFFERING = 3
            if (e.data === 1) setPhase('playing');
            if (e.data === 2) setPhase('paused');
            if (e.data === 0) setPhase('idle');
          },
          onError: () => setPhase('idle'),
        },
      });
    };

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
    if (!ytPlayerRef.current) {
      console.warn("VinylPlayer: YT Player not ready");
      return;
    }
    
    console.log("VinylPlayer: Loading", track.name);
    setCurrent(track);
    setPhase('searching');

    try {
      const q = encodeURIComponent(`${track.name} ${track.artist} official audio`);
      // Abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const r = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&videoCategoryId=10&maxResults=1&key=${YT_KEY}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (!r.ok) throw new Error(`YT API Error: ${r.status}`);

      const data = await r.json();
      const vid = data?.items?.[0]?.id?.videoId;

      if (!vid) {
        console.warn("VinylPlayer: No video for", track.name);
        setPhase('idle');
        return;
      }

      setPhase('loading');
      console.log("VinylPlayer: Loading Video ID", vid);
      
      // Clear any previous state
      if (typeof ytPlayerRef.current.stopVideo === 'function') {
        ytPlayerRef.current.stopVideo();
      }

      ytPlayerRef.current.loadVideoById(vid);
      
      // Force volume and un-mute after a short delay
      setTimeout(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume);
          ytPlayerRef.current.playVideo();
        }
      }, 500);
      
    } catch (err) {
      console.error("VinylPlayer: Search failed", err);
      setPhase('idle');
    }
  }, [volume]);

  // Expose play function to window for debugging if needed
  useEffect(() => {
    (window as any).playVinyl = (trackIndex: number) => {
      if (tracks[trackIndex]) playTrack(tracks[trackIndex]);
    };
  }, [tracks, playTrack]);

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
    
    // Use coordinate-based detection for 100% reliability
    const rect = turntableRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Convert viewport coordinates to document-relative coordinates to match info.point
    const centerX = rect.left + window.scrollX + rect.width / 2;
    const centerY = rect.top + window.scrollY + rect.height / 2;
    
    // Calculate distance from center of turntable
    const dist = Math.hypot(info.point.x - centerX, info.point.y - centerY);
    const isDroppedOnPlayer = dist < (rect.width / 1.5); // 75% radius detection zone

    if (isDroppedOnPlayer) {
      playTrack(track);
    }
  }, [playTrack]);

  return (
    <div className="relative group/vinyl-wrapper transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.35),0_30px_60px_-30px_rgba(0,0,0,0.4),0_-2px_20px_rgba(255,255,255,0.01)] hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.45)] rounded-[40px] w-full max-w-5xl mx-auto">
      <div className="bg-surface/40 backdrop-blur-md rounded-[40px] border border-white/5 p-6 md:p-8 w-full flex flex-col gap-6 md:gap-8 overflow-hidden relative group/player">
      
      {/* Hidden YT Container */}
      <div className="fixed -top-full -left-full w-1 h-1 opacity-0 overflow-hidden pointer-events-none">
        <div ref={ytContainerRef} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <Music className="w-4 h-4 text-white/40" />
          </div>
          <h3 className="text-xs md:text-sm font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-white/50">What I'm Listening To</h3>
          {phase === 'searching' && <RefreshCw className="w-3 h-3 text-blue-500 animate-spin ml-2" />}
        </div>

        {/* Status Chip */}
        <div className={`px-2 md:px-4 py-1.5 rounded-full border text-[8px] md:text-[10px] font-bold tracking-wider md:tracking-widest uppercase transition-all duration-500 ${
          ytReady ? phase === 'playing' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-white/5 border-white/10 text-white/40' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
        }`}>
          {ytReady ? phase === 'playing' ? '● Playing' : phase === 'loading' || phase === 'searching' ? '◌ Searching' : '○ Ready' : '◌ Initializing'}
        </div>
      </div>

      {/* Main UI */}
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full max-w-2xl mx-auto">
        
        {/* Horizontal Controls & Turntable */}
        <div className="flex items-center justify-between w-full px-2 md:px-8 -translate-y-2.5">
          
          {/* Left: Play Button */}
          <div className="flex-1 flex justify-start">
            <button onClick={togglePlay} className="relative flex items-center justify-center rounded-full h-12 w-12 md:h-14 md:w-14 transition-all duration-500 bg-black/40 border border-white/10 shadow-xl group/btn hover:scale-105 active:scale-95">
               <svg width="100%" height="100%" viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
                 <circle cx="28" cy="28" r="26.5" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                 <motion.circle 
                   cx="28" cy="28" r="26.5" fill="none" stroke="#3b82f6" strokeWidth="3" 
                   strokeDasharray="166"
                   animate={{ strokeDashoffset: 166 - (progress / 100) * 166 }}
                   transition={{ type: "tween", ease: "linear" }}
                 />
               </svg>
               {phase === 'playing' ? <Pause className="text-white z-10 w-4 h-4 md:w-5 md:h-5" /> : <Play className="text-white z-10 w-4 h-4 md:w-5 md:h-5 ml-1" />}
            </button>
          </div>

          {/* Center: Turntable */}
          <div className="relative flex flex-col items-center shrink-0">
            <div 
              ref={turntableRef}
              className={`turntable-target relative w-48 h-48 md:w-64 md:h-64 transition-all duration-500 ${isHoveringTurntable ? 'scale-105 brightness-125' : ''}`}
            >
              {/* Turntable Base */}
              <div className="absolute inset-0 rounded-full border border-white/10 bg-[#0a0a0a] shadow-inner"></div>
              
              {/* Grooved Vinyl Record */}
              <motion.div 
                className="absolute inset-1.5 md:inset-2 rounded-full bg-[#050505] shadow-2xl flex items-center justify-center overflow-hidden"
                style={{ rotate: vinylRot }}
              >
                {/* Grooves */}
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.98]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.94]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.90]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.86]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.82]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.78]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.74]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.70]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.66]"></div>
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/[0.03] scale-[0.62]"></div>
                
                <AnimatePresence mode="wait">
                  {current && (
                    <motion.div 
                      key={current.name}
                      layoutId="active-vinyl"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-[35%] h-[35%] relative rounded-full overflow-hidden border-2 md:border-4 border-[#080808] shadow-lg z-20"
                    >
                      <img src={current.art || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17'} alt="Label" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10"></div>
                      {/* Center Hole */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black z-30 shadow-inner" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Tonearm */}
              <div className="absolute -right-3 -top-3 md:-right-2 md:-top-2 z-50 pointer-events-none scale-[0.65] md:scale-[0.85] origin-top-right">
                <div className="relative transition-transform duration-1000 cubic-bezier(.34,1.4,.64,1)"
                  style={{ transform: phase === 'playing' ? 'rotate(28deg)' : 'rotate(0deg)', transformOrigin: '80% 10%' }}>
                  <div className="h-8 w-8 rounded-full bg-stone-800 border border-white/10 shadow-2xl flex items-center justify-center">
                     <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
                  <div className="ml-3 mt-1 h-40 w-[4px] origin-top rotate-12 bg-gradient-to-b from-stone-600 to-stone-800 rounded-full shadow-lg" />
                  <div className="ml-[-10px] mt-[-4px] h-5 w-8 -rotate-12 rounded-sm bg-stone-700 border border-white/10 flex items-center justify-center shadow-lg">
                     <div className="w-[1px] h-3 bg-white/30"></div>
                  </div>
                </div>
              </div>

              {!current && (
                <div className="absolute bottom-[-40px] md:bottom-[-50px] left-1/2 -translate-x-1/2 w-40 md:w-48 py-2 md:py-3 rounded-2xl border border-dashed border-white/10 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm whitespace-nowrap">
                  <span className="md:hidden">Click to play</span>
                  <span className="hidden md:inline">Drag to play</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Volume */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col items-center gap-2 md:gap-3">
               <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Vol</span>
               <div className="relative rounded-xl p-1.5 md:p-2 bg-black/40 border border-white/5 shadow-inner">
                <div className="relative h-20 md:h-32 w-1.5 md:w-3 rounded-full bg-black/60 overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-full bg-blue-500/20 transition-all duration-300" style={{ height: `${volume}%` }}></div>
                </div>
                <input type="range" min="0" max="100" value={volume} onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setVolume(v);
                  if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
                    ytPlayerRef.current.setVolume(v);
                  }
                }} className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize" style={{ writingMode: 'vertical-lr', direction: 'rtl' } as any} />
                 <div className="absolute left-1/2 -translate-x-1/2 w-5 md:w-7 h-2 md:h-3 bg-gradient-to-b from-[#888] via-[#555] to-[#333] rounded-[2px] shadow-xl pointer-events-none z-20 border border-white/10"
                  style={{ bottom: `calc(${volume}% - 4px)` }} />
               </div>
            </div>
          </div>
        </div>

        {/* Bottom: Song Info */}
        <div className="text-center h-10 md:h-12 flex flex-col justify-center md:mt-5">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div key="playing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="font-bold text-white text-sm md:text-base tracking-tight">{current.name}</p>
                <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-1">{current.artist}</p>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/20 mt-4 md:mt-2">Awaiting Track</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Album Grid */}
      <div className="border-t border-white/5 pt-6 md:pt-8 mt-[15px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 px-2 md:px-4">
          {fetching ? Array(4).fill(0).map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />)
            : tracks.map((t) => (
            <div key={t.name} className="flex flex-col gap-4 group/album items-center cursor-pointer md:cursor-grab md:active:cursor-grabbing" onClick={() => { if (window.innerWidth < 768) playTrack(t); }}>
              <div className="relative w-full aspect-square">
                {/* Draggable Vinyl Disk - Behind the cover */}
                <motion.div 
                  drag 
                  dragSnapToOrigin
                  dragElastic={0}
                  dragMomentum={true}
                  dragTransition={{ power: 0.1, timeConstant: 200 }}
                  onDragStart={() => setDraggedTrack(t)}
                  onDrag={(e, info) => {
                    const rect = turntableRef.current?.getBoundingClientRect();
                    if (rect) {
                      const docLeft = rect.left + window.scrollX;
                      const docRight = rect.right + window.scrollX;
                      const docTop = rect.top + window.scrollY;
                      const docBottom = rect.bottom + window.scrollY;
                      setIsHoveringTurntable(info.point.x >= docLeft && info.point.x <= docRight && info.point.y >= docTop && info.point.y <= docBottom);
                    }
                  }}
                  onDragEnd={(e, info) => {
                    handleDragEnd(e, info, t);
                    setDraggedTrack(null);
                  }}
                  initial="initial"
                  whileHover="hover"
                  variants={{ 
                    initial: { y: -10, rotate: 0 }, 
                    hover: { y: -70, rotate: 12 } 
                  }} 
                  animate={{ 
                    opacity: current?.name === t.name ? 0 : 1,
                    scale: current?.name === t.name ? 0.8 : 1,
                    pointerEvents: current?.name === t.name ? 'none' : 'auto'
                  } as any}
                  style={{ cursor: 'inherit' }}
                  className="absolute inset-4 rounded-full bg-[#080808] border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center z-0 group/vinyl"
                >
                   <div className="w-1/3 h-1/3 rounded-full border border-white/10 bg-stone-900 pointer-events-none"></div>
                   
                   {/* Hover Prompt */}
                   <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/vinyl:opacity-100 transition-opacity bg-white text-black px-2 py-1 rounded text-[8px] font-bold uppercase whitespace-nowrap pointer-events-none z-50 shadow-xl">
                     <span className="md:hidden">Click</span>
                     <span className="hidden md:inline">Drag</span>
                   </div>

                   {/* Active Indicator Dot */}
                   {current?.name === t.name && (
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.9)] animate-pulse" />
                   )}
                </motion.div>

                {/* Static Album Cover Sleeve - On top of the vinyl */}
                <div 
                  className={`relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-500 bg-stone-950 shadow-xl z-10 pointer-events-none ${
                    current?.name === t.name ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-white/10'
                  }`}
                >
                  <img 
                    src={t.art || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300&h=300'} 
                    alt={t.name} 
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      current?.name === t.name ? 'grayscale-0' : 'grayscale'
                    }`} 
                  />
                  <div className={`absolute inset-0 transition-colors duration-500 ${
                    current?.name === t.name ? 'bg-transparent' : 'bg-black/40'
                  }`}></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold text-white tracking-tight truncate max-w-[140px]">{t.name}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1 truncate max-w-[140px]">{t.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
