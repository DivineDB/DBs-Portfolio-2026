"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  Variants,
  MotionConfig,
} from "framer-motion";
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
  width?: number;
  height?: number;
};

interface OtherThingsClientProps {
  photos: PhotoItem[];
}

/* ─────────────────────────────────────────────
   Parallax Photo Card Component (Grid)
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

  // Continuous deep parallax vertical movement across page scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

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
        className="absolute -top-[12%] left-0 w-full h-[124%] will-change-transform transform-gpu"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          quality={97}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            item.src.includes("photography-bff77c8e55")
              ? "scale-[0.90] group-hover:scale-[0.95]"
              : "group-hover:scale-[1.04]"
          }`}
          priority={i < 4}
          loading={i < 4 ? undefined : "lazy"}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   World-Class Infinite Gallery Carousel Modal
───────────────────────────────────────────── */
function CarouselModal({
  photos,
  initialIndex,
  closeSlideshow,
  scrollOffset,
}: {
  photos: PhotoItem[];
  initialIndex: number;
  closeSlideshow: () => void;
  scrollOffset: number;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const filmstripTrackRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Preload adjacent images for infinite loop
  useEffect(() => {
    if (photos.length === 0) return;
    const nextIdx = (index + 1) % photos.length;
    const prevIdx = (index - 1 + photos.length) % photos.length;
    const img1 = new window.Image();
    img1.src = photos[nextIdx].src;
    const img2 = new window.Image();
    img2.src = photos[prevIdx].src;
  }, [index, photos]);

  // Reliable scroll centering math (Fixed CSS Scroll Lock bug)
  useEffect(() => {
    const track = filmstripTrackRef.current;
    const activeEl = thumbnailRefs.current[index];
    if (track && activeEl) {
      const containerWidth = track.clientWidth;
      const activeLeft = activeEl.offsetLeft;
      const activeWidth = activeEl.clientWidth;
      const targetScrollLeft = activeLeft - containerWidth / 2 + activeWidth / 2;

      track.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  }, [index]);

  // Keyboard navigation (Esc to exit, Arrow keys for infinite loop)
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Escape") {
        closeSlideshow();
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide, closeSlideshow]);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={closeSlideshow}
        className="fixed inset-0 z-[999999] w-screen h-screen bg-[#050607]/90 backdrop-blur-3xl flex flex-col justify-between p-3 sm:p-6 select-none cursor-pointer overflow-hidden isolate"
        style={{
          position: "fixed",
          top: `${scrollOffset}px`,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 999999,
        }}
        data-lenis-prevent
      >
        {/* Soft Ambient Center Vignette Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] z-0" />

        {/* Top Floating Glass Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full flex justify-between items-center z-50 px-2 sm:px-4 py-2 cursor-default flex-shrink-0"
        >
          {/* Subtle Minimal Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-medium tracking-widest text-white/80 bg-white/[0.06] backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-full shadow-sm">
              {index + 1} / {photos.length}
            </span>
          </div>

          {/* Minimal Floating Close Button */}
          <button
            onClick={closeSlideshow}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.18] active:scale-90 border border-white/15 backdrop-blur-xl flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
            aria-label="Close gallery"
          >
            <X size={17} />
          </button>
        </div>

        {/* Center Gallery Stage (Clicking background closes modal) */}
        <div
          onClick={closeSlideshow}
          className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden my-auto py-2 cursor-pointer z-10"
        >
          {/* Floating Left Arrow */}
          <motion.button
            whileHover={{ opacity: 1, scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            className="absolute left-2 sm:left-6 md:left-10 top-1/2 -mt-5 sm:-mt-6 z-50 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/75 active:scale-90 backdrop-blur-2xl border border-white/15 text-white cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Main Slide Image (Unrounded Corners, True High-Quality Resolution) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[76vh] sm:max-h-[82vh] max-w-[90vw] sm:max-w-[85vw] flex items-center justify-center cursor-default z-10 p-1"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={index}
                src={photos[index]?.src}
                alt={photos[index]?.alt || "Photo"}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    opacity: 0,
                    scale: 0.96,
                    x: dir > 0 ? 70 : dir < 0 ? -70 : 0,
                  }),
                  center: {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  },
                  exit: (dir: number) => ({
                    opacity: 0,
                    scale: 0.96,
                    x: dir > 0 ? -70 : 70,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -30) {
                    nextSlide();
                  } else if (offset.x > 30) {
                    prevSlide();
                  }
                }}
                className="max-h-[76vh] sm:max-h-[82vh] max-w-[90vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-none shadow-[0_35px_90px_-15px_rgba(0,0,0,0.95)] pointer-events-auto select-none will-change-transform transform-gpu"
              />
            </AnimatePresence>
          </div>

          {/* Floating Right Arrow */}
          <motion.button
            whileHover={{ opacity: 1, scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            className="absolute right-2 sm:right-6 md:right-10 top-1/2 -mt-5 sm:-mt-6 z-50 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/75 active:scale-90 backdrop-blur-2xl border border-white/15 text-white cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>

        {/* Floating iOS Filmstrip Glass Bar (Fixed CSS Scroll Lock Bug with End Padding) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full pt-1 pb-3 px-2 z-50 select-none flex flex-col items-center gap-1.5 flex-shrink-0 cursor-default"
        >
          <div
            ref={filmstripTrackRef}
            className="w-full max-w-xl sm:max-w-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-full py-2 sm:py-2.5 overflow-x-auto no-scrollbar flex items-center justify-start scroll-smooth shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-max h-11 sm:h-13 px-6 sm:px-8">
              {photos.map((item, i) => {
                const isActive = i === index;
                return (
                  <motion.button
                    key={item.src}
                    ref={(el) => {
                      thumbnailRefs.current[i] = el;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      opacity: isActive ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`relative flex-shrink-0 h-9 sm:h-11 w-auto transition-all duration-200 cursor-pointer overflow-hidden rounded-none ${
                      isActive ? "z-30" : "hover:opacity-90 hover:scale-110"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`h-full w-auto object-contain rounded-none transition-all duration-300 ${
                        isActive ? "grayscale-0 contrast-100" : "grayscale contrast-110"
                      }`}
                      loading="lazy"
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <span className="sm:hidden text-[9px] font-satoshi tracking-widest text-white/30 uppercase mt-0.5">
            swipe to navigate
          </span>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

export default function OtherThingsClient({ photos }: OtherThingsClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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

  const openSlideshow = useCallback((index: number) => {
    setScrollOffset(window.scrollY);
    setActiveIndex(index);
  }, []);

  const closeSlideshow = useCallback(() => {
    setActiveIndex(null);
  }, []);

  // Sync scrollbar and button colors dynamically based on scroll progress
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

  // Lock body scroll cleanly when slideshow is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [activeIndex, lenis]);

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

        {/* ── Photography Gallery Grid ── */}
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
              const isOrphanOnMobile =
                photos.length % 2 !== 0 && i === photos.length - 1;

              return (
                <ParallaxPhotoCard
                  key={item.src}
                  item={item}
                  i={i}
                  isOrphanOnMobile={isOrphanOnMobile}
                  onClick={() => openSlideshow(i)}
                />
              );
            })}
          </div>

          {/* Clean Subtle Instagram Text Link */}
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

      {/* ── Footer ── */}
      <PageFooter />

      {/* ── World-Class Gallery Carousel Modal Portal ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeIndex !== null && (
              <CarouselModal
                photos={photos}
                initialIndex={activeIndex}
                closeSlideshow={closeSlideshow}
                scrollOffset={scrollOffset}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.main>
  );
}
