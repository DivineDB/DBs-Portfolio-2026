"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HighlightBox } from "@/components/ui/highlight-box";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Sun, Sunset, Moon, X } from "lucide-react";

export default function Home() {
  const [time, setTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState<"morning" | "afternoon" | "evening" | "night">("morning");

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user has visited in this session
    const visited = sessionStorage.getItem("hasVisitedHome");
    if (!visited) {
      setSkipAnimation(false);
      sessionStorage.setItem("hasVisitedHome", "true");
    }

    // Set custom toast greeting based on local time
    const hours = new Date().getHours();
    let greeting = "";
    let iconType: "morning" | "afternoon" | "evening" | "night" = "morning";

    if (hours >= 5 && hours < 12) {
      greeting = "Good Morning Visitor! ☕️ Welcome to my portfolio.";
      iconType = "morning";
    } else if (hours >= 12 && hours < 17) {
      greeting = "Good Afternoon Visitor! ☀️ Thanks for dropping by.";
      iconType = "afternoon";
    } else if (hours >= 17 && hours < 22) {
      greeting = "Good Evening Visitor! 🌇 Enjoy your stay.";
      iconType = "evening";
    } else {
      greeting = "Good Night Visitor! 🌙 Hello, fellow night owl.";
      iconType = "night";
    }

    setToastMessage(greeting);
    setToastIcon(iconType);

    // Show toast after a short delay (1.5 seconds)
    const toastTimeout = setTimeout(() => {
      setShowToast(true);
    }, 1500);

    // Auto-dismiss toast after 6 seconds
    const dismissTimeout = setTimeout(() => {
      setShowToast(false);
    }, 7500);

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

    return () => {
      clearInterval(interval);
      clearTimeout(toastTimeout);
      clearTimeout(dismissTimeout);
    };
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      {/* A subtle, animated noise overlay for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay noise-overlay"></div>

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-full bg-[#F9FFD9]/95 backdrop-blur-md border border-[#EADFC3] text-[#26393A] shadow-lg shadow-[#2a4756]/5 pointer-events-auto select-none max-w-[90vw]"
          >
            <div className="flex items-center gap-2">
              {toastIcon === "morning" && <Coffee className="w-4 h-4 text-[#26393A]" />}
              {toastIcon === "afternoon" && <Sun className="w-4 h-4 text-[#26393A]" />}
              {toastIcon === "evening" && <Sunset className="w-4 h-4 text-[#26393A]" />}
              {toastIcon === "night" && <Moon className="w-4 h-4 text-[#26393A]" />}
              
              <span className="font-gilroyBold text-[13px] md:text-[14px] leading-none whitespace-nowrap">
                {toastMessage}
              </span>
            </div>
            
            <button
              onClick={() => setShowToast(false)}
              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#EADFC3]/40 active:scale-90 transition-all cursor-pointer focus:outline-none"
              aria-label="Dismiss greeting"
            >
              <X className="w-3.5 h-3.5 text-[#26393A]/60" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="text-[16px] md:text-[18px] font-satoshi font-medium text-[#2A4756]/40 mb-2.5 select-none"
            >
              Hey, I'm
            </motion.span>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} 
              className="flex flex-row items-center gap-[10px] mb-2.5 flex-wrap"
            >
              <h1 className="text-[36px] md:text-[54px] font-satoshi font-bold tracking-tight text-[#2A4756] leading-none select-none">
                Divyansh
              </h1>
              <HighlightBox 
                className="py-2.5 px-[30px] leading-none ml-0 md:ml-0"
                textClassName="text-[36px] md:text-[54px] font-satoshi font-normal text-[#2A4756] tracking-tight leading-none"
              >
                Baghel
              </HighlightBox>
            </motion.div>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} 
              className="text-[18px] md:text-[20px] font-satoshi font-normal text-[#2A4756]/40 tracking-tight mb-[42px] select-none"
            >
              Design Engineer
            </motion.h2>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} 
              className="flex gap-[30px] md:gap-[50px]"
            >
              <a
                href="/Divyansh_Baghel_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] md:text-[18px] font-satoshi font-medium text-[#2A4756] relative overflow-hidden group py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#2A4756] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Resume
              </a>
              <Link
                href="/hire-me"
                className="text-[16px] md:text-[18px] font-satoshi font-medium text-[#2A4756] relative overflow-hidden group py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#2A4756] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
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
            className="flex flex-col gap-[21px] pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              {/* Fixed-size Clock Button */}
              <button
                onClick={() => setShowLocation(!showLocation)}
                className="w-[122px] h-[36px] flex justify-center items-center rounded-full bg-[#F9FFD9] border border-[#EADFC3] text-[#26393A] text-[15px] font-satoshi font-medium transition-transform hover:scale-105 active:scale-95 focus:outline-none select-none cursor-pointer"
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
                      className="will-change-transform"
                    >
                      {time || "15:23"}&nbsp;IST
                    </motion.span>
                  ) : (
                    <span key="placeholder" className="text-transparent" aria-hidden="true">
                      15:23 IST
                    </span>
                  )}
                </AnimatePresence>
              </button>

              {/* ⌘K Command Palette Trigger — matches clock pill aesthetic */}
              <button
                onClick={() =>
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
                  )
                }
                className="h-[36px] px-4 flex items-center gap-2 rounded-full bg-[#F9FFD9] border border-[#EADFC3] text-[#26393A] text-[13px] font-satoshi font-medium transition-transform hover:scale-105 active:scale-95 focus:outline-none select-none cursor-pointer"
                aria-label="Open command palette"
              >
                <span className="opacity-50 text-[11px]">Press</span>
                <kbd className="font-satoshi font-semibold tracking-tight">⌘K</kbd>
              </button>
            </div>
            <span className="text-[10px] font-satoshi font-medium text-[#26393A] select-none">
              © 2026 | Divyansh Baghel.
            </span>
          </motion.div>

        </div>

        {/* Phase 2: Right Column (The Building - Animated Entrance) */}
        <div className="col-span-12 md:col-span-5 relative h-full z-10 flex justify-center items-end pointer-events-none">
          {/* Building rises from below */}
          <motion.div
            initial={skipAnimation ? { y: "0%", opacity: 1 } : { y: "18%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={skipAnimation ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative h-[96vh] pointer-events-none select-none flex items-end"
            style={{ aspectRatio: "611 / 996" }}
          >
            <img
              src="/buildingg.svg"
              className="w-full h-full pointer-events-auto"
              alt="Interactive Building"
            />

            <Image
              src="/images/boy.svg"
              alt=""
              aria-hidden
              width={184}
              height={180}
              className="pointer-events-none absolute top-[45.8%] left-[21.4%] z-10 h-auto w-[28%] object-contain"
            />

            {/* Interactive Window Links — staggered fade-in after building lands */}
            <motion.div
              initial={skipAnimation ? "visible" : "hidden"}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: skipAnimation ? 0 : 0.1, delayChildren: skipAnimation ? 0 : 0.9 } } }}
              className="contents"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[37.7%] left-[25.1%] w-[20.7%] h-[18.4%] z-20"
              >
                <Link
                  href="/about"
                  className="pointer-events-auto w-full h-full flex flex-col items-center justify-start rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="h-[15%] w-full flex-shrink-0" />
                  <span className="font-satoshi text-[10px] md:text-[11.5px] font-bold text-[#2A4756] tracking-wide px-1 whitespace-nowrap leading-none transition-transform group-hover:scale-105">
                    About Me
                  </span>
                </Link>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[38.1%] left-[61.5%] w-[20.7%] h-[17.5%] z-20"
              >
                <Link
                  href="/work"
                  className="pointer-events-auto w-full h-full flex flex-col items-center justify-start rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="h-[15%] w-full flex-shrink-0" />
                  <span className="font-satoshi text-[10px] md:text-[11.5px] font-bold text-[#2A4756] tracking-wide px-1 whitespace-nowrap leading-none transition-transform group-hover:scale-105">
                    Selected Work
                  </span>
                </Link>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[73.2%] left-[24.6%] w-[21.3%] h-[19.0%] z-20"
              >
                <Link
                  href="/other-things"
                  className="pointer-events-auto w-full h-full flex flex-col items-center justify-start rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="h-[25%] w-full flex-shrink-0" />
                  <span className="font-satoshi text-[10px] md:text-[11.5px] font-bold text-[#2A4756] tracking-wide px-1 whitespace-nowrap leading-none transition-transform group-hover:scale-105">
                    Other things I do
                  </span>
                </Link>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[73.2%] left-[61.5%] w-[21.3%] h-[19.0%] z-20"
              >
                <Link
                  href="/hire-me"
                  className="pointer-events-auto w-full h-full flex items-center justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 group"
                >
                  <span className="font-satoshi text-[10px] md:text-[11.5px] font-bold text-[#2A4756] tracking-wide px-1 whitespace-nowrap leading-none transition-transform group-hover:scale-105">
                    Hire Me
                  </span>
                </Link>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </main>
  );
}
