"use client";

import { useEffect, useRef, useCallback, useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────
const BALL_R        = 18;
const PADDLE_W      = 120;
const PADDLE_H      = 14;
const PADDLE_BOTTOM = 110; 
const LAUNCH_VY     = -10;
const SPEED_INC     = 0.015;
const MAX_SPEED     = 18;
const MISS_PAUSE    = 100;

type Phase = 'idle' | 'playing' | 'miss';

interface Ball  { x: number; y: number; vx: number; vy: number; }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; }

// ─── Draw basketball ──────────────────────────────────────────────────
function drawBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  const g = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.04, 0, 0, r);
  g.addColorStop(0, '#f9914a');
  g.addColorStop(0.55, '#d4601a');
  g.addColorStop(1, '#8a2c00');
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = '#1a0800';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, -r); ctx.bezierCurveTo(r * 0.52, -r * 0.28, r * 0.52, r * 0.28, 0, r); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -r); ctx.bezierCurveTo(-r * 0.52, -r * 0.28, -r * 0.52, r * 0.28, 0, r); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-r, 0); ctx.bezierCurveTo(-r * 0.28, -r * 0.52, r * 0.28, -r * 0.52, r, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-r, 0); ctx.bezierCurveTo(-r * 0.28, r * 0.52, r * 0.28, r * 0.52, r, 0); ctx.stroke();
  const sh = ctx.createRadialGradient(-r * 0.32, -r * 0.35, 0, -r * 0.32, -r * 0.35, r * 0.45);
  sh.addColorStop(0, 'rgba(255,215,170,0.3)');
  sh.addColorStop(1, 'rgba(255,215,170,0)');
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = sh; ctx.fill();
  ctx.restore();
}

// ─── Draw paddle ──────────────────────────────────────────────────────
function drawPaddle(ctx: CanvasRenderingContext2D, cx: number, y: number, w: number, h: number, glow: boolean) {
  const x = cx - w / 2;
  const r = h / 2;
  ctx.save();
  if (glow) { ctx.shadowColor = 'rgba(125,173,255,0.6)'; ctx.shadowBlur = 25; }
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  const pg = ctx.createLinearGradient(x, y, x + w, y);
  pg.addColorStop(0, '#7dadff'); pg.addColorStop(1, '#d21d53');
  ctx.fillStyle = pg; ctx.fill();
  ctx.beginPath(); ctx.moveTo(x + r + 2, y + 1.5); ctx.lineTo(x + w - r - 2, y + 1.5);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();
}

// ─── Sparks ───────────────────────────────────────────────────────────
function spawnSparks(sparks: Spark[], x: number, y: number) {
  for (let i = 0; i < 15; i++) {
    const a = Math.random() * Math.PI;
    const sp = 2 + Math.random() * 6;
    sparks.push({
      x, y,
      vx: Math.cos(a) * sp * (Math.random() > 0.5 ? 1 : -1),
      vy: -Math.abs(Math.sin(a) * sp),
      life: 1,
    });
  }
}

function tickSparks(ctx: CanvasRenderingContext2D, sparks: Spark[]) {
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.x += s.vx; s.y += s.vy; s.vy += 0.25; s.life -= 0.04;
    if (s.life <= 0) { sparks.splice(i, 1); continue; }
    ctx.save(); ctx.globalAlpha = s.life;
    const hue = Math.random() > 0.5 ? 215 : 340;
    ctx.fillStyle = `hsl(${hue}, 100%, 70%)`;
    ctx.beginPath(); ctx.arc(s.x, s.y, 2.5 * s.life, 0, Math.PI * 2);
    ctx.fill(); ctx.restore();
  }
}

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const phaseRef = useRef<Phase>('idle');
  const ballRef = useRef<Ball>({ x: 0, y: 0, vx: 0, vy: 0 });
  const paddleCx = useRef<number>(300);
  const spinAngle = useRef<number>(0);
  const scoreRef = useRef<number>(0);
  const missTimer = useRef<number>(0);
  const sparks = useRef<Spark[]>([]);
  const glowFrames = useRef<number>(0);
  const isHoveringBall = useRef<boolean>(false);

  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [best, setBest] = useState(0);
  const [copied, setCopied] = useState(false);

  const pushScore = (n: number) => { scoreRef.current = n; setScore(n); };
  const pushPhase = (p: Phase) => { phaseRef.current = p; setPhase(p); };
  const getPaddleY = useCallback(() => (canvasRef.current?.height ?? 0) - PADDLE_BOTTOM - PADDLE_H, []);
  
  const resetBall = useCallback(() => {
    ballRef.current = { x: paddleCx.current, y: getPaddleY() - BALL_R, vx: 0, vy: 0 };
    spinAngle.current = 0; sparks.current = [];
  }, [getPaddleY]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current; const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = width; canvas.height = height;
    paddleCx.current = width / 2;
    if (phaseRef.current !== 'playing') resetBall();
  }, [resetBall]);

  const onMove = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    const cx = clientX - rect.left; const cy = clientY - rect.top;
    const half = PADDLE_W / 2; paddleCx.current = Math.max(half, Math.min(canvas.width - half, cx));
    
    // Custom cursor update for the ball with "sticky" fix
    if (phaseRef.current !== 'playing') {
      const b = ballRef.current;
      const dist = Math.hypot(cx - b.x, cy - b.y);
      if (dist < BALL_R + 18) {
        if (!isHoveringBall.current) {
          isHoveringBall.current = true;
          window.dispatchEvent(new CustomEvent('cursor-update', { detail: { state: 'text', text: 'LAUNCH' } }));
        }
      } else {
        if (isHoveringBall.current) {
          isHoveringBall.current = false;
          window.dispatchEvent(new CustomEvent('cursor-update', { detail: { state: 'default' } }));
        }
      }
    }

    if (phaseRef.current === 'idle') { ballRef.current.x = paddleCx.current; ballRef.current.y = getPaddleY() - BALL_R; }
  }, [getPaddleY]);

  const onDown = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current; if (!canvas || phaseRef.current === 'playing') return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    const mx = clientX - rect.left; const my = clientY - rect.top;
    const b = ballRef.current; const dx = mx - b.x; const dy = my - b.y;
    if (Math.sqrt(dx * dx + dy * dy) > BALL_R + 22) return;
    pushScore(0); const lean = (Math.random() - 0.5) * 0.55;
    b.vx = Math.sin(lean) * Math.abs(LAUNCH_VY); b.vy = LAUNCH_VY; pushPhase('playing');
    isHoveringBall.current = false;
    window.dispatchEvent(new CustomEvent('cursor-update', { detail: { state: 'default' } }));
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) { rafRef.current = requestAnimationFrame(loop); return; }
    const ctx = canvas.getContext('2d'); if (!ctx) { rafRef.current = requestAnimationFrame(loop); return; }
    const W = canvas.width; const H = canvas.height; const b = ballRef.current; const pcx = paddleCx.current;
    ctx.clearRect(0, 0, W, H);
    if (phaseRef.current === 'playing') {
      b.x += b.vx; b.y += b.vy; spinAngle.current += b.vx * 0.055;
      if (b.x - BALL_R <= 0) { b.x = BALL_R; b.vx = Math.abs(b.vx); }
      if (b.x + BALL_R >= W) { b.x = W - BALL_R; b.vx = -Math.abs(b.vx); }
      if (b.y - BALL_R <= 2) { b.y = 2 + BALL_R; b.vy = Math.abs(b.vy); }
      const py = getPaddleY(); const plx = pcx - PADDLE_W / 2; const prx = pcx + PADDLE_W / 2;
      if (b.vy > 0 && b.y + BALL_R >= py - 4 && b.y + BALL_R <= py + PADDLE_H + 8 && b.x >= plx - BALL_R * 0.4 && b.x <= prx + BALL_R * 0.4) {
        b.y = py - BALL_R; b.vy = -Math.abs(b.vy);
        const rel = (b.x - plx) / PADDLE_W; b.vx = (rel - 0.5) * 10;
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        const target = Math.min(MAX_SPEED, spd * (1 + SPEED_INC));
        const ratio = target / spd; b.vx *= ratio; b.vy *= ratio;
        const ns = scoreRef.current + 1; pushScore(ns); setBest(prev => Math.max(prev, ns));
        spawnSparks(sparks.current, b.x, py); glowFrames.current = 20;
      }
      if (b.y - BALL_R > H + 50) { pushPhase('miss'); missTimer.current = MISS_PAUSE; }
    }
    if (phaseRef.current === 'miss') { missTimer.current -= 1; if (missTimer.current <= 0) { resetBall(); pushPhase('idle'); } }
    if (glowFrames.current > 0) glowFrames.current -= 1;
    
    ctx.save(); ctx.setLineDash([4, 12]); ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(W, 2); ctx.stroke(); ctx.restore();

    if (phaseRef.current === 'idle') {
      ctx.save(); ctx.setLineDash([3, 9]); ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(b.x, b.y + BALL_R); ctx.lineTo(b.x, getPaddleY()); ctx.stroke(); ctx.restore();
    }
    tickSparks(ctx, sparks.current);
    if (phaseRef.current !== 'miss') drawBall(ctx, b.x, b.y, BALL_R, spinAngle.current);
    drawPaddle(ctx, pcx, getPaddleY(), PADDLE_W, PADDLE_H, glowFrames.current > 0);
    rafRef.current = requestAnimationFrame(loop);
  }, [getPaddleY, resetBall]);

  useEffect(() => {
    const wrap = wrapRef.current; const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    resize(); window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove as EventListener);
    window.addEventListener('touchmove', onMove as EventListener, { passive: false });
    canvas.addEventListener('mousedown', onDown as EventListener);
    canvas.addEventListener('touchstart', onDown as EventListener, { passive: false });
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove as EventListener); window.removeEventListener('touchmove', onMove as EventListener);
      canvas.removeEventListener('mousedown', onDown as EventListener); canvas.removeEventListener('touchstart', onDown as EventListener);
    };
  }, [resize, onMove, onDown, loop]);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@shubh.design");
    setCopied(true);
    window.dispatchEvent(new CustomEvent('cursor-update', { 
      detail: { state: 'text', text: 'EMAIL COPIED!', color: '#4ade80' } 
    }));
    setTimeout(() => {
      setCopied(false);
      // Reset cursor if still hovering over email area
      if (isHoveringBall.current === false) { // Don't override ball hover
        window.dispatchEvent(new CustomEvent('cursor-update', { 
          detail: { state: 'text', text: 'COPY EMAIL', color: null } 
        }));
      }
    }, 2000);
  };

  return (
    <footer ref={wrapRef} className="relative w-full overflow-hidden bg-[#10131b] min-h-[90vh] flex flex-col pt-32 pb-48" style={{ marginLeft: 'calc(-50vw + 50%)', width: '100vw' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] block" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-[5]" />
      <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_70%_60%_at_50%_110%,rgba(125,173,255,0.15)_0%,transparent_80%)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-12 pointer-events-none">
        <div className="flex gap-14 items-center pointer-events-auto">
          {[
            { label: 'Linkedin', href: 'https://www.linkedin.com/in/subhcool238/', iconKey: 'linkedin' },
            { label: 'Instagram', href: 'https://www.instagram.com/shubhdesignverse/', iconKey: 'instagram' },
            { label: 'Behance', href: 'https://www.behance.net/subhcool238/', iconKey: 'behance' },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" 
               data-cursor-text={s.label.toUpperCase()}
               data-cursor-icon={s.iconKey}
               className="group flex flex-col items-center gap-2 text-[11px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-all duration-300">
              {s.label}
            </a>
          ))}
        </div>

        <div className="pointer-events-auto relative cursor-pointer" 
             data-cursor-text={copied ? "EMAIL COPIED!" : "COPY EMAIL"}
             onClick={copyEmail}>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[clamp(40px,8vw,90px)] font-thin tracking-tight text-white/90 hover:text-white transition-colors duration-500">
              hello@shubh.design
            </h2>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[32%] left-1/2 -translate-x-1/2 w-full max-w-md text-center pointer-events-none z-[15] select-none">
        {phase === 'playing' && score > 0 && (
          <div className="text-[140px] font-bold text-white/[0.08] leading-none transition-opacity duration-500">{score}</div>
        )}
        {phase === 'idle' && (
          <div className="animate-pulse">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#7dadff]/80 mb-2 font-bold">Click ball to launch</p>
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/40">Move paddle to catch</p>
          </div>
        )}
        {phase === 'miss' && (
          <div>
            <p className="text-xl tracking-[0.3em] uppercase text-[#d21d53] mb-2 font-bold">{score} {score === 1 ? 'hit' : 'hits'}</p>
            {best > 0 && <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Record: {best}</p>}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 bg-[#0a0c12] border-t border-white/5 py-12 px-6 pointer-events-none">
        <div className="max-w-300 mx-auto text-center text-[11px] tracking-[0.25em] uppercase text-white/50">
           <p>© 2026 SHUBHANSHU SAHU PORTFOLIO · ALL RIGHT RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
