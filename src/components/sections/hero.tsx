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
    <section className="h-screen w-full overflow-hidden bg-[#F8EDD1] select-none flex flex-col justify-between box-border p-8 md:p-12">

      {/* ── Central grid: text + building ─────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 items-center gap-8 min-h-0">

        {/* Left: hero text */}
        <div className="flex flex-col justify-start pt-[4vh] h-full md:col-span-5">
          <div className="flex flex-col items-start gap-2">
            <p className="font-gilroyRegular text-lg text-black/25">Hey, I&apos;m</p>
            <h1 className="flex flex-row items-baseline gap-3 flex-wrap font-gilroyBold text-5xl tracking-tight text-text_primary md:text-6xl animate-fade-in">
              <span>Divyansh</span>
              <HighlightBox
                className="px-5 md:px-7"
                textClassName="text-3xl md:text-5xl font-gilroyRegular text-text_primary"
              >
                Baghel
              </HighlightBox>
            </h1>
            <p className="font-gilroyRegular text-xl text-black/25">Design Engineer</p>

            {/* Action links — editorial text-only style */}
            <nav className="mt-6 flex gap-8 font-gilroyRegular">
              <a
                href="/resume.pdf"
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
        </div>

        {/* Right: building illustration */}
        <div className="relative w-full h-full flex items-end justify-end md:col-span-7 overflow-visible">
          <div className="relative aspect-[588/970] h-[110%] w-auto max-w-none translate-y-4">
            <Image
              src="/images/Building.svg"
              alt="Building illustration"
              fill
              priority
              className="object-contain object-bottom select-none"
              style={{ filter: "drop-shadow(-24px 24px 0px rgba(0,0,0,0.14))" }}
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
              className="absolute top-[37.7%] left-[25.1%] w-[20.7%] h-[18.4%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                About Me
              </span>
            </Link>

            <Link
              href="/work"
              className="absolute top-[38.1%] left-[61.5%] w-[20.7%] h-[17.5%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                Selected Work
              </span>
            </Link>

            <Link
              href="/other-things"
              className="absolute top-[73.2%] left-[24.6%] w-[21.3%] h-[19.0%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                Other Things
              </span>
            </Link>

            <Link
              href="/hire-me"
              className="absolute top-[73.2%] left-[61.5%] w-[21.3%] h-[19.0%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                Hire Me
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom row: clock pinned in screen bounds ──────────────── */}
      <div className="w-full flex justify-between items-end h-[8vh] shrink-0">
        <div className="flex flex-col gap-1">
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
          <p className="text-xs text-black/25">© 2026 | Divyansh Baghel.</p>
        </div>
      </div>

    </section>
  );
}
