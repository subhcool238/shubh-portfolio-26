"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function ScrambleLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
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
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "#work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "#resume" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] pt-4 md:pt-6 pointer-events-none px-4 md:px-0">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between w-full pointer-events-auto rounded-full border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg dark:shadow-2xl transition-all duration-500 hover:border-black/10 dark:hover:border-white/10">

          {/* Left: Logo */}
          <Link href="/" className="relative h-6 w-24 md:h-8 md:w-28 transition-transform duration-300 hover:scale-105 active:scale-95">
            <Image
              src="/logo/White Logo.png"
              alt="Logo"
              fill
              className="object-contain dark:invert-0 invert"
              priority
            />
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ label, href }) => (
              <ScrambleLink key={label} label={label} href={href} />
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 group"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-600 group-hover:text-stone-900 transition-colors" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 text-stone-600 dark:text-white/70"
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
            className="fixed inset-0 z-[90] bg-white dark:bg-black md:hidden flex flex-col items-center justify-center gap-8 p-10"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ScrambleLink 
                  label={label} 
                  href={href} 
                  onClick={() => setIsMenuOpen(false)} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
