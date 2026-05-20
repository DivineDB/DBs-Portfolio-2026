"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HighlightBox } from "@/components/ui/highlight-box";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
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
    <main className="relative w-full h-screen overflow-hidden bg-background">
      {/* A subtle, animated noise overlay for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay noise-overlay"></div>

      {/* The main grid container */}
      <div className="w-full max-w-[1600px] h-full mx-auto px-8 md:px-16 grid grid-cols-12 gap-8 relative">
        
        {/* Phase 1: Unified Left Column (Alignment Fix, Hero Text, Clock & Footer) */}
        <div className="col-span-12 md:col-span-6 md:col-start-2 flex flex-col justify-between h-full py-10 z-20 pointer-events-none">
          
          {/* TOP / CENTER: Hero Text */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col justify-center flex-grow pointer-events-auto"
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} 
              className="text-lg md:text-xl font-medium text-muted tracking-wide mb-3 select-none"
            >
              Hey, I'm
            </motion.span>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} 
              className="flex flex-row items-baseline gap-4 mb-6 flex-wrap"
            >
              <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight text-slate-900 leading-none select-none">
                Divyansh
              </h1>
              <HighlightBox 
                className="py-1 px-3 leading-none"
                textClassName="text-6xl lg:text-8xl font-gilroyBold text-slate-900 tracking-tight leading-none"
              >
                Baghel
              </HighlightBox>
            </motion.div>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} 
              className="text-2xl md:text-3xl font-light text-muted tracking-tight mb-12 select-none"
            >
              Design Engineer
            </motion.h2>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} 
              className="flex gap-8"
            >
              <a
                href="/Divyansh_Baghel_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-slate-700 relative overflow-hidden group py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-slate-900 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Resume
              </a>
              <Link
                href="/hire-me"
                className="text-lg font-medium text-slate-700 relative overflow-hidden group py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-slate-900 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>

          {/* BOTTOM: Footer & Clock */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col gap-5 pointer-events-auto"
          >
            <div className="flex items-center gap-5">
              {/* Fixed-width Clock Button */}
              <button
                onClick={() => setShowLocation(!showLocation)}
                className="w-[140px] flex justify-center items-center py-2.5 rounded-full bg-[#F0F5E1] text-slate-800 text-sm font-medium transition-transform hover:scale-105 active:scale-95 focus:outline-none select-none cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {showLocation ? (
                    <motion.span
                      key="location"
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      className="will-change-transform"
                    >
                      Gwalior, IN
                    </motion.span>
                  ) : isMounted ? (
                    <motion.span
                      key="time"
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      className="will-change-transform flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {time || "17:48"}&nbsp;IST
                    </motion.span>
                  ) : (
                    <span key="placeholder" className="text-transparent" aria-hidden="true">
                      17:48 IST
                    </span>
                  )}
                </AnimatePresence>
              </button>
              
              {/* Tactile Keyboard Cmd+K Prompt */}
              <div 
                onClick={() => {
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
                  );
                }}
                className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-md shadow-[0_2px_0_0_rgba(203,213,225,1)] text-xs font-mono text-muted select-none cursor-pointer hover:bg-white/85 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(203,213,225,1)] transition-all duration-150"
              >
                <span className="opacity-70">Press</span>
                <kbd className="font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded shadow-sm border border-slate-200">⌘K</kbd>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted/60 select-none">
              © 2026 // Divyansh Baghel
            </span>
          </motion.div>

        </div>

        {/* Phase 2: Right Column (The Building - Standard Unscaled Natural Height) */}
        <div className="col-span-12 md:col-span-5 relative h-full z-10 flex justify-end items-end pointer-events-none">
          <div
            className="relative h-[90vh] pointer-events-none select-none flex items-end"
            style={{ aspectRatio: "588 / 970" }}
          >
            <img
              src="/building.svg"
              className="w-auto h-[90vh] object-contain object-bottom pointer-events-auto"
              style={{ filter: "drop-shadow(-16px 16px 0px rgba(0,0,0,0.08))" }}
              alt="Interactive Building"
            />

            <Image
              src="/images/boy.svg"
              alt=""
              aria-hidden
              width={184}
              height={180}
              className="pointer-events-none absolute top-[43%] left-[21.8%] z-10 h-auto w-[23%] object-contain"
            />

            {/* Interactive Window Links */}
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

      </div>
    </main>
  );
}
