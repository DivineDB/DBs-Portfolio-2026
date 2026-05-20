"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HighlightBox } from "@/components/ui/highlight-box";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [time, setTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [playHover] = useSound("/sounds/tick.mp3", { volume: 0.25 });

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
    <section className="flex h-screen w-screen select-none items-center justify-center bg-[#F8EDD1]">
      <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-12 py-16 md:px-20 lg:grid-cols-12">
        <div className="flex h-full flex-col py-4 lg:col-span-5">
          <div className="flex flex-1 flex-col justify-center items-start gap-2">
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

            <nav className="mt-8 flex gap-4 font-gilroyRegular">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playHover()}
                className="group relative overflow-hidden rounded-full border border-slate-300 px-6 py-2.5 text-sm font-medium tracking-wide text-slate-700 transition-all duration-300 hover:border-[#A2F991] hover:bg-[#A2F991] hover:text-slate-900"
              >
                Resume
              </a>
              <Link
                href="/hire-me"
                onMouseEnter={() => playHover()}
                className="group relative overflow-hidden rounded-full border border-slate-300 px-6 py-2.5 text-sm font-medium tracking-wide text-slate-700 transition-all duration-300 hover:border-[#A2F991] hover:bg-[#A2F991] hover:text-slate-900"
              >
                Contact
              </Link>
            </nav>
          </div>

          <footer className="mt-auto flex flex-col gap-3">
            <motion.button 
              onClick={() => setShowLocation(!showLocation)}
              onMouseEnter={() => playHover()}
              whileHover={{ scale: 1.05, backgroundColor: "#E6F0C2" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex w-fit cursor-pointer items-center justify-center rounded-full bg-[#F0F5E1] px-5 py-2.5 border-none outline-none will-change-transform"
            >
              <AnimatePresence mode="wait">
                {showLocation ? (
                  <motion.span
                    key="location"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-lg font-medium tracking-wide text-slate-800 will-change-transform"
                  >
                    Gwalior, IN
                  </motion.span>
                ) : isMounted ? (
                  <motion.span
                    key="time"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-lg font-medium tracking-wide text-slate-800 will-change-transform"
                  >
                    {time}&nbsp;IST
                  </motion.span>
                ) : (
                  <span key="placeholder" className="text-lg font-medium tracking-wide text-transparent select-none" aria-hidden="true">
                    00:00 IST
                  </span>
                )}
              </AnimatePresence>
            </motion.button>
            <p className="text-xs text-black/25">© 2026 | Divyansh Baghel.</p>
          </footer>
        </div>

        <div className="relative flex h-full w-full items-end justify-center pt-8 lg:col-span-7 lg:justify-end">
          <div className="relative aspect-[588/970] h-[95vh] w-auto mb-4">
            <Image
              src="/images/Building.svg"
              alt="Building illustration"
              fill
              priority
              className="object-contain object-bottom"
              style={{ filter: "drop-shadow(-20px 20px 0px rgba(0,0,0,0.12))" }}
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
              onMouseEnter={() => playHover()}
              className="absolute top-[37.7%] left-[25.1%] w-[20.7%] h-[18.4%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                About Me
              </span>
            </Link>

            <Link
              href="/work"
              onMouseEnter={() => playHover()}
              className="absolute top-[38.1%] left-[61.5%] w-[20.7%] h-[17.5%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                Selected Work
              </span>
            </Link>

            <Link
              href="/other-things"
              onMouseEnter={() => playHover()}
              className="absolute top-[73.2%] left-[24.6%] w-[21.3%] h-[19.0%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                Other Things
              </span>
            </Link>

            <Link
              href="/hire-me"
              onMouseEnter={() => playHover()}
              className="absolute top-[73.2%] left-[61.5%] w-[21.3%] h-[19.0%] flex items-start justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group pt-2.5 sm:pt-3.5"
            >
              <span className="font-gilroyRegular text-[10px] sm:text-xs font-medium text-slate-800 capitalize tracking-normal px-1 transition-transform group-hover:scale-105">
                Hire Me
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

