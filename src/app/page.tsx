"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { HighlightBox } from "@/components/ui/highlight-box";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Sun, Sunset, Moon, X, ArrowDown } from "lucide-react";
import InteractiveBird from "@/components/InteractiveBird";

export default function Home() {
  const [time, setTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState<"morning" | "afternoon" | "evening" | "night">("morning");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isBirdHovered, setIsBirdHovered] = useState(false);
  const [birdMessage, setBirdMessage] = useState("hi...");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      greeting = "Good Evening Visitor! 🌇 Keep Browsing.";
      iconType = "evening";
    } else {
      greeting = "🌙 Hello, fellow night owl.";
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
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-background">
      {/* A subtle, animated noise overlay for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay noise-overlay"></div>

      {/* Custom Toast Notification */}
      <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="pointer-events-auto select-none flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl md:rounded-full bg-[#F9FFD9]/95 backdrop-blur-md border border-[#EADFC3] text-[#26393A] shadow-lg shadow-[#2a4756]/5 w-full max-w-[360px] md:w-auto"
            >
              <div className="flex items-center gap-2.5">
                {toastIcon === "morning" && <Coffee className="w-4 h-4 text-[#26393A] shrink-0" />}
                {toastIcon === "afternoon" && <Sun className="w-4 h-4 text-[#26393A] shrink-0" />}
                {toastIcon === "evening" && <Sunset className="w-4 h-4 text-[#26393A] shrink-0" />}
                {toastIcon === "night" && <Moon className="w-4 h-4 text-[#26393A] shrink-0" />}
                
                <span className="font-gilroyBold text-[11px] md:text-[14px] leading-snug">
                  {toastMessage}
                </span>
              </div>
              
              <button
                onClick={() => setShowToast(false)}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#EADFC3]/40 active:scale-90 transition-all cursor-pointer focus:outline-none shrink-0"
                aria-label="Dismiss greeting"
              >
                <X className="w-3.5 h-3.5 text-[#26393A]/60" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The main grid container */}
      <div className="w-full max-w-[1600px] min-h-screen md:h-full mx-auto px-8 md:px-16 grid grid-cols-12 gap-8 relative pb-20 md:pb-0">
        
        {/* Phase 1: Unified Left Column */}
        <div className="col-span-12 md:col-span-6 md:col-start-2 flex flex-col justify-between min-h-[75vh] md:min-h-[85vh] md:h-full pt-16 pb-6 md:py-10 z-20 pointer-events-none">
          
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
              className="flex flex-row items-baseline gap-[10px] mb-2.5 flex-wrap"
            >
              <h1 className="text-[36px] md:text-[54px] font-satoshi font-bold tracking-tight text-[#2A4756] leading-none select-none">
                Divyansh
              </h1>
              <HighlightBox 
                className="py-[2px] md:py-[3px] px-[8px] md:px-[12px] ml-0 md:ml-0"
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

              {/* ⌘K Command Palette Trigger — matches clock pill aesthetic (hidden on mobile due to FAB) */}
              <button
                onClick={() =>
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
                  )
                }
                className="h-[36px] px-4 hidden md:flex items-center gap-2 rounded-full bg-[#F9FFD9] border border-[#EADFC3] text-[#26393A] text-[13px] font-satoshi font-medium transition-transform hover:scale-105 active:scale-95 focus:outline-none select-none cursor-pointer"
                aria-label="Open command palette"
              >
                <span className="opacity-50 text-[11px]">Press</span>
                <kbd className="font-satoshi font-semibold tracking-tight">⌘K</kbd>
              </button>
            </div>
            <span className="text-[10px] font-satoshi font-medium text-[#26393A] select-none">
              © 2026 | Divyansh Baghel.
            </span>

            {/* Animated mobile scroll indicator */}
            <div className="md:hidden flex justify-center w-full mt-6 animate-bounce">
              <button
                onClick={() => {
                  const buildingEl = document.getElementById("interactive-building-sec");
                  if (buildingEl) {
                    buildingEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="pointer-events-auto flex flex-col items-center gap-1 text-[#2A4756]/45 hover:text-[#2A4756]/65 transition-colors focus:outline-none"
                aria-label="Scroll to explore interactive building"
              >
                <span className="text-[10px] font-satoshi font-semibold uppercase tracking-wider">Scroll to Explore</span>
                <ArrowDown size={14} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Phase 2: Right Column (The Building - Animated Entrance) */}
        <div id="interactive-building-sec" className="col-span-12 md:col-span-5 relative z-10 flex justify-center items-end pointer-events-none mt-4 md:mt-0 h-auto md:h-full w-full max-w-[450px] md:max-w-none mx-auto md:mx-0">
          {/* Building rises from below */}
          <motion.div
            initial={skipAnimation ? { clipPath: "none", y: 0, scale: 1, opacity: 1 } : { clipPath: "inset(100% 0% 0% 0%)", y: 30, scale: 0.98, opacity: 0 }}
            animate={skipAnimation || animationComplete ? { clipPath: "none", y: 0, scale: 1, opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", y: 0, scale: 1, opacity: 1 }}
            transition={skipAnimation ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            onAnimationComplete={() => setAnimationComplete(true)}
            className="relative h-auto md:h-[96vh] pointer-events-none select-none flex items-end w-full aspect-[611/996] md:aspect-auto will-change-[transform,opacity]"
          >
            <img
              src="/images/Building.svg"
              className="w-full h-full pointer-events-auto"
              alt="Interactive Building"
            />

            <motion.div
              initial={skipAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={skipAnimation ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 15, delay: 0.8 }}
              className="pointer-events-none absolute top-[45.2%] md:top-[42.5%] left-[23%] md:left-[24.5%] z-30 h-auto w-[28%] object-contain"
            >
              <Image
                src="/images/boy.svg"
                alt=""
                aria-hidden
                width={184}
                height={180}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Interactive Bird - Sitting perfectly on the left roof corner chimney block */}
            <motion.div
              initial={skipAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={skipAnimation ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 15, delay: 0.85 }}
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
                hoverTimeoutRef.current = setTimeout(() => {
                  const greetings = ["hi...", "sup?", "peek-a-boo!", "looking at me?", "tweet tweet!", "need help?", "coo coo!"];
                  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
                  setBirdMessage(randomGreeting);
                  setIsBirdHovered(true);
                }, 350); // 350ms delay before appearing
              }}
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
                hoverTimeoutRef.current = setTimeout(() => {
                  setIsBirdHovered(false);
                }, 300); // 300ms delay before disappearing
              }}
              className="pointer-events-auto absolute top-[8.8%] left-[7.7%] z-30 w-[17%] h-auto cursor-pointer hidden md:block"
            >
              <InteractiveBird className="w-full h-auto" />

              {/* Animated chat popup saying a fun greeting */}
              <AnimatePresence>
                {isBirdHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 3, x: "-50%" }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, scale: 0.95, y: 3, x: "-50%" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[90%] left-[43%] z-50 bg-white/95 backdrop-blur-sm border border-[#EADFC3] text-[#26393A] font-satoshi font-bold text-[10px] px-2 py-1 rounded-lg shadow-md pointer-events-none select-none flex items-center justify-center whitespace-nowrap"
                  >
                    {birdMessage}
                    {/* Triangle tail for speech bubble */}
                    <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#EADFC3]"></div>
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Interactive Window Links — staggered fade-in after building lands */}
            <motion.div
              initial={skipAnimation ? "visible" : "hidden"}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: skipAnimation ? 0 : 0.1, delayChildren: skipAnimation ? 0 : 0.9 } } }}
              className="contents"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[34.5%] left-[29.5%] w-[17.5%] h-[23.5%] md:top-[34.1%] md:left-[29.8%] md:w-[16.5%] md:h-[23.5%] z-20"
              >
                <Link
                  href="/about"
                  className="pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
                  aria-label="About Me"
                />
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[34.5%] left-[59%] w-[16%] h-[23.5%] md:top-[34.1%] md:left-[59%] md:w-[16.5%] md:h-[22.5%] z-20"
              >
                <Link
                  href="/work"
                  className="pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
                  aria-label="Selected Work"
                />
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[69.5%] left-[30%] w-[16.5%] h-[24%] md:top-[69.1%] md:left-[30%] md:w-[16.5%] md:h-[24%] z-20"
              >
                <Link
                  href="/other-things"
                  className="pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
                  aria-label="Other things I do"
                />
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="absolute top-[69.5%] left-[59%] w-[16.5%] h-[24%] md:top-[69.3%] md:left-[59%] md:w-[16.7%] md:h-[23.5%] z-20"
              >
                <Link
                  href="/hire-me"
                  className="pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
                  aria-label="Hire Me"
                />
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </main>
  );
}
