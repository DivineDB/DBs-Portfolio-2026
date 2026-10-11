"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useLenis } from "lenis/react";
import {
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  Mail,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Compass,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import PageFooter from "@/components/PageFooter";

const BG = "#EDEDED";
const TEXT = "#000000";
const DIVIDER = "#BAA5A5";
const LABEL = "#A58788";

const SECTIONS = [
  { id: "hero", label: "01. Intro", title: "Hero & Title", src: "/images/scout/hero.svg" },
  { id: "overview", label: "02. Overview", title: "Overview & Impact Metrics", src: "/images/scout/overview.svg" },
  { id: "features", label: "03. Features", title: "Interface & Key Features", src: "/images/scout/features.svg" },
  { id: "architecture", label: "04. Architecture", title: "Data Engine & Pipeline", src: "/images/scout/architecture.svg" },
  { id: "results", label: "05. Results", title: "Systems Analysis & Results", src: "/images/scout/results.svg" },
];

export default function ScoutCaseStudy() {
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const lenis = useLenis();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowScrollTop(currentY > 600);

      // Percentage calculation
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH > 0) {
        setScrollPercent(Math.min(100, Math.max(0, Math.round((currentY / totalH) * 100))));
      }

      // Active section detection
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset scroll to top on mount
  const hasResetScroll = useRef(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (lenis && !hasResetScroll.current) {
      hasResetScroll.current = true;
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLightbox = (src: string, title: string) => {
    setLightboxImage({ src, title });
    setZoomScale(1);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setZoomScale(1);
  };

  return (
    <main
      className="min-h-screen antialiased pb-0 relative"
      style={{ backgroundColor: BG, color: TEXT }}
    >
      {/* ── TOP SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{ scaleX, backgroundColor: TEXT }}
      />

      {/* ── STICKY NAV HEADER ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 w-full border-b"
        style={{
          backgroundColor: "rgba(237,237,237,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: DIVIDER,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm md:text-base font-medium transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-work-sans), sans-serif",
              color: TEXT,
            }}
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Selected Work
          </Link>

          {/* Center Title & Live Scroll Progress */}
          <div className="flex items-center gap-3">
            <span
              className="text-xs md:text-sm tracking-wider uppercase font-semibold opacity-70 hidden sm:inline"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              Scout Engine — Case Study
            </span>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/5 border border-black/10 text-black/70"
            >
              8 min read • {scrollPercent}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:divyanshbaghel456@gmail.com"
              className="p-2 rounded-full transition-colors hover:bg-black/10"
              aria-label="Email"
              style={{ color: TEXT }}
            >
              <Mail size={18} strokeWidth={2} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/divyansh-baghel/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors hover:bg-black/10"
              aria-label="LinkedIn"
              style={{ color: TEXT }}
            >
              <FaLinkedin size={18} />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* ── ANIMATED CASE STUDY SECTIONS ── */}
      <div className="w-full flex flex-col items-center py-4 md:py-8 px-0 sm:px-4 space-y-12 md:space-y-16">
        {SECTIONS.map((sec, idx) => (
          <motion.section
            key={sec.id}
            id={sec.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1440px] group relative rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => openLightbox(sec.src, sec.title)}
          >
            {/* Click to Zoom Overlay Indicator */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="flex items-center gap-2 bg-black/80 text-white text-xs px-3.5 py-2 rounded-full backdrop-blur-md shadow-xl border border-white/20">
                <Maximize2 size={14} />
                <span>Click to Expand Lightbox</span>
              </div>
            </div>

            {/* SVG Image Section */}
            <div className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.008]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sec.src}
                alt={`Scout Case Study — ${sec.title}`}
                className="w-full h-auto block select-none"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          </motion.section>
        ))}
      </div>

      {/* ── FLOATING TABLE OF CONTENTS (TOC) PILL ── */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="px-3 py-1.5 flex items-center gap-1.5 text-xs text-white/50 border-r border-white/10 shrink-0">
            <Compass size={13} />
            <span className="hidden md:inline font-mono">TOC</span>
          </div>

          {SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-md scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {s.label}
              </button>
            );
          })}

          <button
            onClick={() => scrollToSection("next-case-study")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
              activeSection === "next-case-study"
                ? "bg-white text-black font-semibold shadow-md scale-105"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            06. Next
          </button>
        </div>
      </motion.div>

      {/* ── NEXT CASE STUDY SECTION ── */}
      <section id="next-case-study" className="w-full py-16 md:py-24 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-[1000px] border-t pt-12 md:pt-16" style={{ borderColor: DIVIDER }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm tracking-widest uppercase font-semibold mb-4"
            style={{
              fontFamily: "var(--font-work-sans), sans-serif",
              color: LABEL,
            }}
          >
            Next Case Study
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/work/pos-panel"
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 md:p-12 rounded-3xl transition-all duration-500 hover:shadow-2xl border"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderColor: DIVIDER,
              }}
            >
              <div className="flex flex-col gap-2">
                <span
                  className="text-2xl md:text-4xl font-semibold tracking-tight transition-colors group-hover:text-black/80"
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                    color: TEXT,
                  }}
                >
                  BreezePOS
                </span>
                <p
                  className="text-sm md:text-base opacity-75"
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                    color: TEXT,
                  }}
                >
                  Touchscreen optimized register & analytics dashboard for retail operations.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                    color: TEXT,
                  }}
                >
                  Explore BreezePOS
                </span>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.06)",
                    color: TEXT,
                  }}
                >
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SCROLL TO TOP FLOATING BUTTON ── */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full shadow-xl transition-colors border cursor-pointer"
          style={{
            backgroundColor: TEXT,
            color: BG,
            borderColor: DIVIDER,
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      {/* ── INTERACTIVE LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 md:p-8 bg-black/90 backdrop-blur-2xl"
            onClick={closeLightbox}
          >
            {/* Top Modal Controls */}
            <div
              className="w-full max-w-[1440px] flex items-center justify-between z-10 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-white text-sm md:text-base font-semibold tracking-wide">
                  {lightboxImage.title}
                </span>
                <span className="text-white/40 text-xs font-mono">
                  ({Math.round(zoomScale * 100)}% scale)
                </span>
              </div>

              {/* Zoom Controls & Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomScale((z) => Math.max(0.8, z - 0.2))}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>

                <button
                  onClick={() => setZoomScale(1)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw size={18} />
                </button>

                <button
                  onClick={() => setZoomScale((z) => Math.min(2.5, z + 0.25))}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>

                <button
                  onClick={closeLightbox}
                  className="p-2 ml-2 rounded-full bg-white text-black hover:bg-white/90 transition-colors cursor-pointer"
                  title="Close Lightbox (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Lightbox Zoomable Viewport */}
            <div
              className="w-full flex-1 flex items-center justify-center overflow-auto p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: zoomScale }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="max-w-[1440px] max-h-[85vh] overflow-auto rounded-xl shadow-2xl bg-[#EDEDED]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="w-full h-auto block select-none"
                />
              </motion.div>
            </div>

            {/* Bottom Caption Hint */}
            <div className="text-white/50 text-xs tracking-wider uppercase font-mono z-10 pt-2">
              Press Esc or click backdrop to exit lightbox
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER (Without Make Offer button) ── */}
      <PageFooter showOfferButton={false} />
    </main>
  );
}
