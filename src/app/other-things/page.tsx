"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionValueEvent, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import PageFooter from "@/components/PageFooter";
import { HighlightBox } from "@/components/hire-me/highlight-box";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
      className={`font-gilroyBold text-xs uppercase tracking-widest text-text_muted ${className}`}
    >
      {label}
    </p>
  );
}

/* ─────────────────────────────────────────────
   Phase 2 – The Lens (photography grid)
───────────────────────────────────────────── */
type PhotoItem = {
  src: string;
  alt: string;
};

const PHOTO_ITEMS: PhotoItem[] = [
  {
    src: "/images/photography-1.jpg",
    alt: "Street Photography - Gwalior",
  },
  {
    src: "/images/photography-2.jpg",
    alt: "Cinematic Scene - Pune",
  },
  {
    src: "/images/photography-3.jpg",
    alt: "Urban Geometry - Hyderabad",
  },
  {
    src: "/images/photography-4.jpg",
    alt: "Minimalist Perspective",
  },
  {
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop",
    alt: "Vertical Forest Trees",
  },
  {
    src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop",
    alt: "Vertical Path Sunlight",
  },
  {
    src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1600&auto=format&fit=crop",
    alt: "Vertical Sunset Beach",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    alt: "Vertical Misty Lake Mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1600&auto=format&fit=crop",
    alt: "Vertical floral Sunset Field",
  },
];

/* ─────────────────────────────────────────────
   Phase 3 – Movement / Travel
───────────────────────────────────────────── */
type City = {
  name: string;
  img: string; // placeholder colour for now
  imgColor: string;
};

const CITIES: City[] = [
  { name: "Gwalior",   img: "", imgColor: "#c8d5b9" },
  { name: "Pune",      img: "", imgColor: "#b5c8c4" },
  { name: "Hyderabad", img: "", imgColor: "#c4b9c8" },
];

function CityRow({ city }: { city: City }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Raw mouse position (relative to viewport)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed position
  const x = useSpring(rawX, { stiffness: 120, damping: 22 });
  const y = useSpring(rawY, { stiffness: 120, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    rawX.set(e.clientX + 20);
    rawY.set(e.clientY - 60);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative cursor-pointer select-none border-b border-text_primary/10 py-3"
    >
      {/* City name */}
      <motion.span
        className="block will-change-transform"
        animate={{
          opacity: hovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <span
          className="font-gilroyBold text-6xl md:text-8xl leading-none block transition-colors duration-300"
          style={{
            WebkitTextStroke: "1px var(--color-text_primary)",
            color: hovered ? "var(--color-text_primary)" : "transparent",
          }}
        >
          {city.name}
        </span>
      </motion.span>

      {/* Polaroid following cursor — rendered in portal-like fixed layer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={city.name}
            className="fixed pointer-events-none z-50 will-change-transform"
            style={{ x, y, top: 0, left: 0 }}
            initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white p-3 pb-8 shadow-2xl border border-black/8 w-36">
              <div
                className="w-full h-24 rounded-sm"
                style={{ backgroundColor: city.imgColor }}
              />
              <p className="mt-2 text-center font-satoshi text-[9px] text-[#2a4756]/40 uppercase tracking-widest">
                {city.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main page export
───────────────────────────────────────────── */
export default function OtherThingsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 0.8, 0.95, 1],
    ["#f8edd1", "#f8edd1", "#121212", "#121212", "#f8edd1", "#f8edd1"]
  );
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 0.8, 0.95, 1],
    ["#2a4756", "#2a4756", "#f8edd1", "#f8edd1", "#2a4756", "#2a4756"]
  );
  const textMutedColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 0.8, 0.95, 1],
    [
      "rgba(42, 71, 86, 0.25)",
      "rgba(42, 71, 86, 0.25)",
      "rgba(255, 255, 255, 0.4)",
      "rgba(255, 255, 255, 0.4)",
      "rgba(42, 71, 86, 0.25)",
      "rgba(42, 71, 86, 0.25)",
    ]
  );
  const aboutBodyColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 0.8, 0.95, 1],
    ["#4a5568", "#4a5568", "#cbd5e1", "#cbd5e1", "#4a5568", "#4a5568"]
  );

  const lenis = useLenis();

  // Sync scrollbar colors dynamically to the document root based on scroll progress (active dark theme check)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window !== "undefined") {
      if (activeIndex !== null) return;
      const isDark = latest >= 0.15 && latest <= 0.85;
      document.documentElement.style.setProperty(
        "--scrollbar-thumb",
        isDark ? "#000000" : "rgba(42, 71, 86, 0.2)"
      );
    }
  });

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % PHOTO_ITEMS.length));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + PHOTO_ITEMS.length) % PHOTO_ITEMS.length));
  }, []);

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

  // Prevent scroll when slideshow is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
      document.documentElement.style.setProperty("--scrollbar-thumb", "transparent");
      if (lenis) lenis.stop();
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      // Restore scrollbar thumb based on active theme color
      const progress = scrollYProgress.get();
      const isDark = progress >= 0.15 && progress <= 0.85;
      document.documentElement.style.setProperty(
        "--scrollbar-thumb",
        isDark ? "#000000" : "rgba(42, 71, 86, 0.2)"
      );
      if (lenis) lenis.start();
    }
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [activeIndex, lenis, textColor]);

  return (
    <motion.main
      className="w-full min-h-screen font-gilroyRegular text-text_primary"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        ['--color-text_primary' as any]: textColor,
        ['--color-text_muted' as any]: textMutedColor,
        ['--color-bg' as any]: bgColor,
        ['--color-background' as any]: bgColor,
        ['--color-about_body' as any]: aboutBodyColor,
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
          className="max-w-2xl font-satoshi text-lg text-about_body leading-relaxed mb-[50vh]"
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
          <SectionHeader label="01 // The Lens" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mt-8">
            {PHOTO_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                onClick={() => {
                  setDirection(0);
                  setActiveIndex(i);
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.15 }}
                className="relative overflow-hidden rounded-3xl border border-text_primary/10 cursor-pointer group aspect-[9/16]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
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
          <SectionHeader label="02 // Movement" />

          <div className="mt-8 flex flex-col">
            {CITIES.map((city) => (
              <CityRow key={city.name} city={city} />
            ))}
          </div>

          <p className="mt-6 font-satoshi text-sm text-white/40">
            {typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
              ? 'Tap a city to explore.'
              : 'Hover a city to see the polaroid.'}
          </p>
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
                    onDragEnd={(e, { offset, velocity }) => {
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
                    <img
                      src={PHOTO_ITEMS[activeIndex].src}
                      alt={PHOTO_ITEMS[activeIndex].alt}
                      className="w-[90vw] max-w-[90vw] md:w-[85vw] md:max-w-[85vw] h-[85vh] md:h-[95vh] object-contain rounded-2xl md:rounded-3xl pointer-events-none select-none"
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
                {activeIndex + 1} / {PHOTO_ITEMS.length}
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
