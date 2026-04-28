"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] p-6 pointer-events-none">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between w-full pointer-events-auto rounded-full border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg dark:shadow-2xl transition-all duration-500 hover:border-black/10 dark:hover:border-white/10">
        
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

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            href="/" 
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 dark:text-white/50 dark:hover:text-white transition-all duration-300"
          >
            Home
          </Link>
          <Link 
            href="#work" 
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 dark:text-white/50 dark:hover:text-white transition-all duration-300"
          >
            Work
          </Link>
          <Link 
            href="/about" 
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 dark:text-white/50 dark:hover:text-white transition-all duration-300"
          >
            About
          </Link>
          <Link 
            href="#resume" 
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 dark:text-white/50 dark:hover:text-white transition-all duration-300"
          >
            Resume
          </Link>
        </div>

        {/* Right: Theme Toggle */}
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
      </div>
    </nav>
  );
}
