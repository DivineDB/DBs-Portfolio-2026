"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import PageFooter from "@/components/PageFooter";
import { HighlightBox } from "@/components/hire-me/highlight-box";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import IndiaMap from "@/components/IndiaMap";

/* ─────────────────────────────────────────────
   Shared animation variant helpers
───────────────────────────────────────────── */
const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─────────────────────────────────────────────
   Section header component
───────────────────────────────────────────── */
function SectionHeader({ label, className = "" }: { label: string; className?: string }) {
  return (
    <p
      className={`font-gilroyBold text-xs uppercase tracking-widest opacity-40 ${className}`}
    >
      {label}
    </p>
  );
}

type PhotoItem = {
  src: string;
  alt: string;
};

interface OtherThingsClientProps {
  photos: PhotoItem[];
}

export default function OtherThingsClient({ photos }: OtherThingsClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const lenis = useLenis();

  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.01, 0.08, 1],
    ["#f8edd1", "#f8edd1", "#121212", "#121212"]
  );
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.01, 0.08, 1],
    ["#2a4756", "#2a4756", "#f8edd1", "#f8edd1"]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const closeSlideshow = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSlideshow();
    }
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape") {
        closeSlideshow();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, nextSlide, prevSlide, closeSlideshow]);

  // Sync scrollbar and button colors dynamically to the document root based on scroll progress (active dark theme check)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window !== "undefined") {
      if (activeIndex !== null) return;
      const isDark = latest >= 0.05;
      document.documentElement.style.setProperty(
        "--scrollbar-thumb",
        isDark ? "#333333" : "rgba(42, 71, 86, 0.2)"
      );
      document.documentElement.style.setProperty(
        "--scrollbar-track",
        isDark ? "#121212" : "transparent"
      );
      
      // Sync buttons to dark mode
      document.documentElement.style.setProperty(
        "--button-bg",
        isDark ? "#1e1e1e" : "#f8edd1"
      );
      document.documentElement.style.setProperty(
        "--button-text",
        isDark ? "#f8edd1" : "#2a4756"
      );
      document.documentElement.style.setProperty(
        "--button-border",
        isDark ? "#2d2d2d" : "#e1d4b7"
      );
    }
  });

  // Smoothly sync body/document background colors during page scrolling
  useMotionValueEvent(bgColor, "change", (latestBg) => {
    if (typeof window !== "undefined") {
      if (activeIndex !== null) return;
      document.body.style.backgroundColor = latestBg;
      document.documentElement.style.backgroundColor = latestBg;
    }
  });

  // Prevent scroll when slideshow is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
      document.documentElement.style.setProperty("--scrollbar-thumb", "transparent");
      document.documentElement.style.setProperty("--scrollbar-track", "transparent");
      if (lenis) lenis.stop();
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      // Restore scrollbar thumb based on active theme color
      const progress = scrollYProgress.get();
      const isDark = progress >= 0.15;
      document.documentElement.style.setProperty(
        "--scrollbar-thumb",
        isDark ? "#333333" : "rgba(42, 71, 86, 0.2)"
      );
      document.documentElement.style.setProperty(
        "--scrollbar-track",
        isDark ? "#121212" : "transparent"
      );
      const bg = bgColor.get();
      document.body.style.backgroundColor = bg;
      document.documentElement.style.backgroundColor = bg;
      if (lenis) lenis.start();
    }
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [activeIndex, lenis, textColor, bgColor, scrollYProgress]);

  // Clean up scrollbar styles on unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty("--scrollbar-thumb");
      document.documentElement.style.removeProperty("--scrollbar-track");
      document.documentElement.style.removeProperty("--button-bg");
      document.documentElement.style.removeProperty("--button-text");
      document.documentElement.style.removeProperty("--button-border");
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  return (
    <motion.main
      className="w-full min-h-screen font-gilroyRegular"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className="pt-16 md:pt-32 pb-16 px-5 md:px-16 max-w-7xl mx-auto">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 will-change-transform"
        >
          <h1 className="font-gilroyBold text-6xl md:text-8xl leading-none tracking-tight">
            <HighlightBox className="text-5xl md:text-7xl">Off-Hours</HighlightBox>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-2xl font-satoshi text-lg opacity-80 leading-relaxed mb-[50vh]"
        >
          Design and engineering pay the bills. This is what keeps the creative engine running.
          A collection of visual storytelling and movement.
        </motion.p>

        {/* ── Phase 2 – The Lens ── */}
        <motion.section
          ref={galleryRef}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="relative will-change-transform"
          style={{ position: "relative" }}
        >
          <SectionHeader label="01 The Lens" />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-8">
            {photos.map((item, i) => (
              <motion.div
                key={i}
                onClick={() => {
                  setDirection(0);
                  setActiveIndex(i);
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: (i % 3) * 0.05 }}
                className="relative overflow-hidden rounded-3xl border border-current/10 cursor-pointer group aspect-[9/16] will-change-[transform,opacity]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  priority={i < 6}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Phase 4 – Movement / Travel ── */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-56 will-change-transform"
        >
          <SectionHeader label="02 Movement" />
          <p className="mt-4 max-w-xl font-satoshi text-base opacity-60 leading-relaxed mb-8">
            I also love to travel and explore new horizons. It keeps my creative engine running, whether wandering through mountain trails or navigating bustling metro cities. Here are some of the places I&apos;ve visited.
          </p>
          <IndiaMap />
        </motion.section>

      </div>

      {/* ── Slideshow Modal ── */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#0c1214]/95 backdrop-blur-2xl flex flex-col justify-between p-6 select-none"
            data-lenis-prevent
          >
            {/* Top Navigation Row */}
            <div className="w-full flex justify-end items-center z-10 px-4">
              <button
                onClick={closeSlideshow}
                className="p-2 -mr-2 text-white/60 hover:text-white transition-colors cursor-pointer focus:outline-none"
                aria-label="Close slideshow"
              >
                <X size={20} />
              </button>
            </div>

            {/* Middle Main Content */}
            <div 
              onClick={handleBackdropClick}
              className="relative flex-grow flex items-center justify-center w-full h-[95vh]"
            >
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 text-white/40 hover:text-white transition-colors cursor-pointer focus:outline-none rounded-full bg-white/5 hover:bg-white/10 items-center justify-center"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Slide Container with drag gestures */}
              <div 
                onClick={handleBackdropClick}
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        scale: dir === 0 ? 0.96 : (dir > 0 ? 1.04 : 0.96),
                        opacity: 0,
                        x: dir * 50,
                      }),
                      center: {
                        scale: 1,
                        opacity: 1,
                        x: 0,
                      },
                      exit: (dir: number) => ({
                        scale: dir > 0 ? 0.96 : 1.04,
                        opacity: 0,
                        x: dir * -50,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 220, damping: 26 },
                      scale: { type: "spring", stiffness: 220, damping: 26 },
                      opacity: { duration: 0.25, ease: "easeInOut" },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(e, { offset }) => {
                      const swipeThreshold = 50;
                      if (offset.x < -swipeThreshold) {
                        nextSlide();
                      } else if (offset.x > swipeThreshold) {
                        prevSlide();
                      }
                    }}
                    onClick={handleBackdropClick}
                    className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing will-change-[transform,opacity] transform-gpu"
                  >
                    <Image
                      src={photos[activeIndex].src}
                      alt={photos[activeIndex].alt}
                      fill
                      sizes="90vw"
                      priority
                      className="object-contain rounded-2xl md:rounded-3xl pointer-events-none select-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 text-white/40 hover:text-white transition-colors cursor-pointer focus:outline-none rounded-full bg-white/5 hover:bg-white/10 items-center justify-center"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Photo Count */}
            <div className="w-full flex justify-center items-center py-2 z-10 select-none">
              <span className="font-satoshi text-[10px] tracking-[0.2em] text-white/40 uppercase">
                {activeIndex + 1} / {photos.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <PageFooter />
    </motion.main>
  );
}
