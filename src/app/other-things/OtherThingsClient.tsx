"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import PageFooter from "@/components/PageFooter";
import { HighlightBox } from "@/components/hire-me/highlight-box";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";


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



type PhotoItem = {
  src: string;
  alt: string;
  isLandscape?: boolean;
};

interface OtherThingsClientProps {
  photos: PhotoItem[];
}

/* ─────────────────────────────────────────────
   Parallax Photo Card Component
───────────────────────────────────────────── */
function ParallaxPhotoCard({
  item,
  i,
  isOrphanOnMobile,
  onClick,
}: {
  item: PhotoItem;
  i: number;
  isOrphanOnMobile: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Mathematically calculated translation range to prevent empty spaces:
  // For height = 116% and top = -8%, range [-6.8%, 6.8%] is fully safe.
  // We map the active translation to the middle 70% of scroll progress [0.15, 0.85]
  // to make the parallax feel more intense and active while the image is in the center viewport.
  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["-6.8%", "-6.8%", "6.8%", "6.8%"]
  );

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: (i % 3) * 0.05 }}
      className={`relative overflow-hidden rounded-3xl border border-current/10 cursor-pointer group aspect-[9/16] will-change-[transform,opacity] ${
        isOrphanOnMobile ? "hidden sm:block" : ""
      }`}
    >
      <motion.div
        style={{ y }}
        className="absolute -top-[8%] left-0 w-full h-[116%] will-change-transform transform-gpu"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          // Landscape images in a 9:16 portrait container need the full original
          // pixel data to avoid blur — Next.js would serve a width-sized crop
          // that's far too narrow to cover the container's height.
          {...(item.isLandscape
            ? { unoptimized: true }
            : {
                quality: 95,
                sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 34vw",
              })}
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            item.src.includes("photography-bff77c8e55")
              ? "scale-[0.90] group-hover:scale-[0.95]"
              : "group-hover:scale-[1.04]"
          }`}
          priority={i < 9}
        />
      </motion.div>
    </motion.div>
  );
}

export default function OtherThingsClient({ photos }: OtherThingsClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init status
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 1],
    ["#f8edd1", "#f8edd1", "#121212", "#121212"]
  );
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 1],
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
      const isDark = latest >= 0.08;
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
      const isDark = progress >= 0.08;
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
        <div className="mb-6">
          <h1 className="font-gilroyBold text-6xl md:text-8xl leading-none tracking-tight">
            <HighlightBox className="text-5xl md:text-7xl overflow-hidden inline-flex">
              <motion.span
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="inline-block will-change-transform"
              >
                Off-Hours
              </motion.span>
            </HighlightBox>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          className="max-w-2xl font-satoshi text-lg opacity-80 leading-relaxed mb-[85vh] md:mb-[50vh]"
        >
          Design and engineering pay the bills. This is what keeps the creative engine running.
          A collection of visual storytelling and movement.
        </motion.p>

        {/* ── Photography Gallery ── */}
        <motion.section
          ref={galleryRef}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="relative will-change-transform"
          style={{ position: "relative" }}
        >
          {/* Large animated Photography heading */}
          <div className="overflow-hidden mb-12 mt-16">
            <motion.h2
              className="font-gilroyBold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight"
              animate={isAtTop ? "hidden" : "visible"}
              variants={{
                hidden: {
                  transition: {
                    staggerChildren: 0.015,
                    staggerDirection: -1
                  }
                },
                visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
              }}
            >
              {"Photography".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: "40%",
                      rotateX: 10,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    },
                    visible: {
                      opacity: 1,
                      y: "0%",
                      rotateX: 0,
                      transition: {
                        duration: 0.75,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {photos.map((item, i) => {
              // On mobile (2-col grid), hide the last item when total count is odd
              // so the grid always ends with a complete row.
              const isOrphanOnMobile =
                photos.length % 2 !== 0 && i === photos.length - 1;

              return (
                <ParallaxPhotoCard
                  key={item.src}
                  item={item}
                  i={i}
                  isOrphanOnMobile={isOrphanOnMobile}
                  onClick={() => {
                    setDirection(0);
                    setActiveIndex(i);
                  }}
                />
              );
            })}
          </div>

          {/* Clean Subtle Instagram Text Link aligned right with last image */}
          <div className="mt-6 mb-8 flex justify-end">
            <a
              href="https://www.instagram.com/dbdoesstuff/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#f8edd1]/45 hover:text-[#f8edd1]/90 transition-colors text-xs font-satoshi font-medium cursor-pointer group"
            >
              <FaInstagram className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span>
                View more on <strong className="font-semibold underline underline-offset-4 decoration-current/30 group-hover:decoration-current">@dbdoesstuff</strong>
              </span>
            </a>
          </div>
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
                className="p-3 -mr-3 text-white/60 hover:text-white transition-colors cursor-pointer focus:outline-none rounded-full hover:bg-white/5 active:bg-white/10"
                aria-label="Close slideshow"
              >
                <X size={20} />
              </button>
            </div>

            {/* Middle Main Content */}
            <div 
              onClick={handleBackdropClick}
              className="relative flex-grow flex items-center justify-center w-full"
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
                      quality={97}
                      sizes="100vw"
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

            {/* Bottom Photo Count + Mobile Swipe Hint */}
            <div className="w-full flex flex-col items-center gap-1 py-2 z-10 select-none">
              <span className="font-satoshi text-[10px] tracking-[0.2em] text-white/40 uppercase">
                {activeIndex + 1} / {photos.length}
              </span>
              <span className="md:hidden font-satoshi text-[9px] tracking-widest text-white/20 uppercase">
                swipe to navigate
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
