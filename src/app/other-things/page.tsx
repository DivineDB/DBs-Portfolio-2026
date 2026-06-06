"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, Variants } from "framer-motion";
import PageFooter from "@/components/PageFooter";
import { HighlightBox } from "@/components/hire-me/highlight-box";

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
type LensItem = {
  aspect: string;
  label: string;
  bg: string;
  gradient: string;
};

const LENS_ITEMS: LensItem[] = [
  { 
    aspect: "aspect-[3/4]", 
    label: "Street", 
    bg: "bg-[#2a4756]/8", 
    gradient: "radial-gradient(ellipse at 60% 40%, rgba(249,115,22,0.1) 0%, transparent 65%), linear-gradient(135deg, rgba(42,71,86,0.15) 0%, rgba(42,71,86,0.06) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Cinematography", 
    bg: "bg-[#2a4756]/12", 
    gradient: "radial-gradient(ellipse at 30% 30%, rgba(14,165,233,0.15) 0%, transparent 70%), linear-gradient(135deg, rgba(42,71,86,0.2) 0%, rgba(42,71,86,0.08) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Digital Canvas", 
    bg: "bg-[#2a4756]/6", 
    gradient: "radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.12) 0%, transparent 60%), linear-gradient(135deg, rgba(42,71,86,0.12) 0%, rgba(42,71,86,0.04) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Documentary", 
    bg: "bg-[#2a4756]/10", 
    gradient: "radial-gradient(ellipse at 40% 60%, rgba(120,113,108,0.15) 0%, transparent 65%), linear-gradient(135deg, rgba(42,71,86,0.18) 0%, rgba(42,71,86,0.07) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Minimalism", 
    bg: "bg-[#2a4756]/5", 
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(42,71,86,0.08) 0%, transparent 50%), linear-gradient(135deg, rgba(42,71,86,0.1) 0%, rgba(42,71,86,0.03) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Architecture", 
    bg: "bg-[#2a4756]/9", 
    gradient: "radial-gradient(ellipse at 20% 80%, rgba(100,116,139,0.12) 0%, transparent 65%), linear-gradient(135deg, rgba(42,71,86,0.16) 0%, rgba(42,71,86,0.06) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Portraits", 
    bg: "bg-[#2a4756]/11", 
    gradient: "radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.12) 0%, transparent 70%), linear-gradient(135deg, rgba(42,71,86,0.2) 0%, rgba(42,71,86,0.08) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Landscapes", 
    bg: "bg-[#2a4756]/7", 
    gradient: "radial-gradient(ellipse at 60% 70%, rgba(34,197,94,0.08) 0%, transparent 60%), linear-gradient(135deg, rgba(42,71,86,0.14) 0%, rgba(42,71,86,0.05) 100%)" 
  },
  { 
    aspect: "aspect-[3/4]", 
    label: "Abstract", 
    bg: "bg-[#2a4756]/10", 
    gradient: "radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.12) 0%, transparent 65%), linear-gradient(135deg, rgba(42,71,86,0.18) 0%, rgba(42,71,86,0.07) 100%)" 
  },
];

function LensCard({ item }: { item: LensItem }) {
  return (
    <div
      className={`
        relative group overflow-hidden rounded-lg border border-text_primary/10
        ${item.aspect} ${item.bg}
        cursor-pointer will-change-transform
      `}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Cinematic inner image stand-in */}
      <div
        className="
          absolute inset-0
          transition-all duration-700 ease-out
          grayscale contrast-125 opacity-80
          group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105
        "
        style={{
          background: item.gradient,
        }}
      />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(42,71,86,0.06) 1px,transparent 1px)," +
            "linear-gradient(to bottom,rgba(42,71,86,0.06) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hover label */}
      <div
        className="
          absolute bottom-0 left-0 right-0 p-4
          translate-y-2 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-500 ease-out
        "
      >
        <span className="font-gilroyBold text-xs uppercase tracking-widest text-text_primary/60">
          {item.label}
        </span>
      </div>

      {/* Corner accent */}
      <div
        className="
          absolute top-4 right-4 w-1.5 h-1.5 rounded-full
          bg-text_primary/20 group-hover:bg-accent_highlight
          transition-colors duration-500
        "
      />
    </div>
  );
}

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
      className="relative cursor-pointer select-none border-b border-text_primary/8 py-3"
    >
      {/* City name */}
      <motion.span
        className="font-gilroyBold text-6xl md:text-8xl leading-none block will-change-transform"
        animate={{
          color: hovered ? "#2a4756" : "rgba(42, 71, 86, 0)",
          opacity: hovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          WebkitTextStroke: "1.5px #2a4756",
        }}
      >
        {city.name}
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
              <p className="mt-2 text-center font-satoshi text-[9px] text-text_primary/40 uppercase tracking-widest">
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
  return (
    <main className="w-full bg-bg font-gilroyRegular text-text_primary">
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
          className="max-w-2xl font-satoshi text-lg text-about_body leading-relaxed mb-32"
        >
          Design and engineering pay the bills. This is what keeps the creative engine running.
          A collection of visual storytelling and movement.
        </motion.p>

        {/* ── Phase 2 – The Lens ── */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="will-change-transform"
        >
          <SectionHeader label="01 // The Lens" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {LENS_ITEMS.map((item, i) => (
              <div key={i}>
                <LensCard item={item} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Phase 4 – Movement / Travel ── */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-32 will-change-transform"
        >
          <SectionHeader label="02 // Movement" />

          <div className="mt-8 flex flex-col">
            {CITIES.map((city) => (
              <CityRow key={city.name} city={city} />
            ))}
          </div>

          <p className="mt-6 font-satoshi text-sm text-text_muted">
            {typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
              ? 'Tap a city to explore.'
              : 'Hover a city to see the polaroid.'}
          </p>
        </motion.section>

      </div>

      {/* ── Footer ── */}
      <PageFooter />
    </main>
  );
}
