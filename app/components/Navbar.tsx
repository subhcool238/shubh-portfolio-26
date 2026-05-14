"use client"; // Repairing encoding

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function ScrambleLink({ label, href, onClick, target }: { label: string; href: string; onClick?: () => void; target?: string }) {
  const [displayText, setDisplayText] = useState(label);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterationRef = useRef(0);

  const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  const scramble = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    iterationRef.current = 0;

    frameRef.current = setInterval(() => {
      if (iterationRef.current < 5) {
        setDisplayText(label.split("").map(c => c === " " ? " " : randomChar()).join(""));
      } else {
        const lockProgress = iterationRef.current - 5;
        const lockedCount = Math.floor(lockProgress * 0.45);

        setDisplayText(
          label.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < lockedCount) return label[i];
            return randomChar();
          }).join("")
        );

        if (lockedCount >= label.length) {
          clearInterval(frameRef.current!);
          setDisplayText(label);
          return;
        }
      }
      iterationRef.current += 1;
    }, 30);
  }, [label]);

  const reset = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    setDisplayText(label);
  }, [label]);

  useEffect(() => () => {
    if (frameRef.current) clearInterval(frameRef.current);
  }, []);

  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="text-[14px] md:text-[14px] text-[24px] font-normal font-sans tracking-[0.15em] capitalize text-stone-500 hover:text-stone-900 dark:text-white/50 dark:hover:text-white transition-colors duration-300"
      style={{ fontVariantNumeric: "tabular-nums", minWidth: `${label.length}ch`, display: "inline-block" }}
    >
      {displayText}
    </Link>
  );
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "#work" },
    { label: "Playground", href: "/playground" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "https://drive.google.com/file/d/1rIlCpF8HYNW9d7m7ABtvyJYANE8vBMFb/view?usp=drive_link", target: "_blank" },
  ];

  if (pathname === "/playground") return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] pt-3 md:pt-4 pointer-events-none flex justify-center">
        <div className="max-w-[800px] w-full mx-4 md:mx-6 h-[50px] md:h-[56px] flex items-center justify-center pointer-events-auto rounded-full border border-white/10 bg-black/50 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20 relative overflow-hidden">

          {/* Left Side: Logo — Shifted right for better breathing room */}
          <div className="absolute left-[27px] h-full flex items-center">
            <Link href="/" className="relative h-8 w-8 md:h-9 md:w-9 transition-transform duration-300 hover:scale-110 active:scale-90">
              <Image
                src="/Logo/White Logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links — Dead Center */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href, target }) => (
              <ScrambleLink key={label} label={label} href={href} target={target} />
            ))}
          </div>

          {/* Right Side: Actions — More compact rounded pill */}
          <div className="absolute right-[8px] h-full flex items-center">
            <Link 
              href="mailto:hello@shubh.design"
              className="hidden md:flex h-[calc(100%-14px)] items-center px-4 md:px-5 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap"
            >
              Let's Connect
            </Link>

            {/* Mobile Menu Toggle — Visible on small screens only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors duration-300 text-white/70"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[95] bg-white dark:bg-black md:hidden flex flex-col items-center justify-center gap-8 p-10"
          >
            {navLinks.map(({ label, href, target }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ScrambleLink 
                  label={label} 
                  href={href} 
                  target={target}
                  onClick={() => setIsMenuOpen(false)} 
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                href="mailto:hello@shubh.design"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 flex items-center px-8 py-3 rounded-full border border-stone-200 dark:border-white/20 hover:border-stone-400 dark:hover:border-white/50 bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-white"
              >
                Let's Connect
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
