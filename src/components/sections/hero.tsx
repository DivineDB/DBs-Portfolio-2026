"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HighlightBox } from "@/components/ui/highlight-box";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [time, setTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#F8EDD1] select-none flex flex-col">

      {/* ── Central content grid ─────────────────────────────────────── */}
      <div className="flex-grow w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 relative">

        {/* Left column: hero text, vertically centered */}
        <div className="flex flex-col justify-center h-full z-10">
          <p className="font-gilroyRegular text-xl text-black/30 mb-2">Hey, I&apos;m</p>

          <h1 className="flex flex-row items-baseline gap-4 flex-wrap font-gilroyBold text-6xl lg:text-7xl tracking-tight text-text_primary mb-4 animate-fade-in">
            <span>Divyansh</span>
            <HighlightBox
              className="px-5 md:px-7"
              textClassName="text-4xl lg:text-5xl font-gilroyRegular text-text_primary"
            >
              Baghel
            </HighlightBox>
          </h1>

          <p className="font-gilroyRegular text-2xl text-black/30 font-light mb-12">Design Engineer</p>

          {/* Action links — editorial text-only */}
          <nav className="flex gap-8 font-gilroyRegular">
            <a
              href="/Divyansh_Baghel_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative py-1 text-xl font-medium tracking-wide text-text_primary transition-colors hover:text-slate-500"
            >
              Resume
              <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-text_primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <Link
              href="/hire-me"
              className="group relative py-1 text-xl font-medium tracking-wide text-text_primary transition-colors hover:text-slate-500"
            >
              Contact
              <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-text_primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </nav>
        </div>

        {/* Right column: spacer (building is absolutely positioned) */}
        <div className="hidden md:block" />
      </div>

      {/* ── Building: absolutely anchored to bottom-right ───────────── */}
      <div className="absolute bottom-0 right-0 md:right-[4%] w-auto h-[88vh] z-0 pointer-events-none">
        {/* Aspect-ratio wrapper preserving 588:970 */}
        <div className="relative h-full" style={{ width: "calc(88vh * 588 / 970)" }}>
          <Image
            src="/images/Building.svg"
            alt="Building illustration"
            fill
            priority
            className="object-contain object-bottom pointer-events-none select-none"
            style={{ filter: "drop-shadow(-20px 20px 0px rgba(0,0,0,0.15))" }}
          />
          <Image
            src="/images/boy.svg"
            alt=""
            aria-hidden
            width={184}
            height={180}
            className="pointer-events-none absolute top-[43%] left-[21.8%] z-10 h-auto w-[23%] object-contain"
          />

          {/* Interactive Window Links — pointer-events re-enabled */}
          <Link
            href="/about"
            className="pointer-events-auto absolute top-[37.7%] left-[25.1%] w-[20.7%] h-[18.4%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
          >
            <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
              About Me
            </span>
          </Link>

          <Link
            href="/work"
            className="pointer-events-auto absolute top-[38.1%] left-[61.5%] w-[20.7%] h-[17.5%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
          >
            <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
              Selected Work
            </span>
          </Link>

          <Link
            href="/other-things"
            className="pointer-events-auto absolute top-[73.2%] left-[24.6%] w-[21.3%] h-[19.0%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
          >
            <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
              Other Things
            </span>
          </Link>

          <Link
            href="/hire-me"
            className="pointer-events-auto absolute top-[73.2%] left-[61.5%] w-[21.3%] h-[19.0%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
          >
            <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
              Hire Me
            </span>
          </Link>
        </div>
      </div>

      {/* ── Footer row: absolutely anchored to bottom-left ──────────── */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex flex-col gap-2 z-20">
        <div className="flex items-center gap-6">
          {/* Live clock / location toggle */}
          <motion.button
            onClick={() => setShowLocation(!showLocation)}
            whileHover={{ scale: 1.05, backgroundColor: "#E6F0C2" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex items-center justify-center rounded-full bg-[#F0F5E1] px-5 py-2 text-base font-medium tracking-wide text-slate-800 border-none outline-none shadow-none will-change-transform"
          >
            <AnimatePresence mode="wait">
              {showLocation ? (
                <motion.span
                  key="location"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className="will-change-transform"
                >
                  Gwalior, IN
                </motion.span>
              ) : isMounted ? (
                <motion.span
                  key="time"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className="will-change-transform"
                >
                  {time}&nbsp;IST
                </motion.span>
              ) : (
                <span key="placeholder" className="text-transparent select-none" aria-hidden="true">
                  00:00 IST
                </span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* ⌘K hint badge */}
          <button
            type="button"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
              );
            }}
            title="Open command palette"
            className="group flex items-center gap-1.5 rounded-full border border-text_primary/12 bg-text_primary/5 px-3.5 py-1.5 transition-all duration-200 hover:border-text_primary/20 hover:bg-text_primary/10 hover:scale-105 active:scale-95"
          >
            <span className="font-gilroyRegular text-xs text-text_primary/45 group-hover:text-text_primary/70 transition-colors">
              Press
            </span>
            <kbd className="font-gilroyBold text-xs text-text_primary/55 group-hover:text-text_primary/80 tracking-wide transition-colors">
              ⌘K
            </kbd>
          </button>
        </div>

        <span className="text-sm text-black/25">© 2026 | Divyansh Baghel.</span>
      </div>

    </main>
  );
}
