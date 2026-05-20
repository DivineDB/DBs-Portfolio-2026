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
};

const LENS_ITEMS: LensItem[] = [
  { aspect: "aspect-[3/4]", label: "Street", bg: "bg-[#2a4756]/8" },
  { aspect: "aspect-square", label: "Cinematography", bg: "bg-[#2a4756]/12" },
  { aspect: "aspect-video", label: "Digital Canvas", bg: "bg-[#2a4756]/6" },
  { aspect: "aspect-square", label: "Documentary", bg: "bg-[#2a4756]/10" },
  { aspect: "aspect-[3/4]", label: "Architecture", bg: "bg-[#2a4756]/7" },
  { aspect: "aspect-video", label: "Abstract", bg: "bg-[#2a4756]/9" },
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
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(162,249,145,0.07) 0%, transparent 65%), " +
            "linear-gradient(135deg, rgba(42,71,86,0.15) 0%, rgba(42,71,86,0.06) 100%)",
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
   Phase 3 – Market Dynamics (Trading terminal)
───────────────────────────────────────────── */
type TickerRow = {
  symbol: string;
  ltp: string;
  change: string;
  oi: string;
  iv: string;
  type: "CE" | "PE";
};

const TICKER_ROWS: TickerRow[] = [
  { symbol: "NIFTY 24500", ltp: "312.45", change: "+18.20", oi: "1.2M", iv: "14.8%", type: "CE" },
  { symbol: "NIFTY 24000", ltp: "89.10",  change: "-5.60",  oi: "3.4M", iv: "16.2%", type: "PE" },
  { symbol: "SENSEX 81K",  ltp: "540.80", change: "+31.50", oi: "0.8M", iv: "13.4%", type: "CE" },
  { symbol: "NIFTY 23800", ltp: "175.25", change: "-12.40", oi: "2.1M", iv: "17.9%", type: "PE" },
  { symbol: "BANKNIFTY",   ltp: "229.60", change: "+9.85",  oi: "1.7M", iv: "18.3%", type: "CE" },
];

const SPARKLINE_POINTS = "0,48 12,42 24,38 36,44 48,32 60,28 72,35 84,22 96,18 108,24 120,14 132,20 144,12 156,8 168,16 180,10";

function TradingTerminal() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-[#1a3040]/50"
      style={{ background: "linear-gradient(160deg,#0d1f2d 0%,#111a22 60%,#0a1520 100%)" }}
    >
      {/* Terminal chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] text-white/20 tracking-wider uppercase">
          options_chain.live — NSE/BSE
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a2f991] animate-pulse" />
          <span className="font-mono text-[10px] text-[#a2f991]/70">LIVE</span>
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="px-6 pt-5 pb-2">
        <div className="flex items-end justify-between mb-1">
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-wider">
            NIFTY 50 — 1D
          </span>
          <span className="font-mono text-xs font-bold text-[#a2f991]">+1.42%</span>
        </div>
        <svg
          viewBox="0 0 180 56"
          className="w-full h-14"
          preserveAspectRatio="none"
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a2f991" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#a2f991" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            points={SPARKLINE_POINTS + " 180,56 0,56"}
            fill="url(#sparkGrad)"
          />
          <polyline
            points={SPARKLINE_POINTS}
            fill="none"
            stroke="#a2f991"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Current price dot */}
          <circle cx="180" cy="10" r="3" fill="#a2f991" />
          <circle cx="180" cy="10" r="6" fill="#a2f991" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-5 gap-2 px-6 py-1.5 border-t border-b border-white/5 text-[10px] font-mono text-white/20 uppercase tracking-wider">
        <span>Strike</span>
        <span className="text-right">LTP</span>
        <span className="text-right">Chg</span>
        <span className="text-right">OI</span>
        <span className="text-right">IV</span>
      </div>

      {/* Ticker rows */}
      <div className="px-6 py-2 space-y-0.5">
        {TICKER_ROWS.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-2 py-2 border-b border-white/[0.04] group hover:bg-white/[0.03] transition-colors rounded px-1"
          >
            <span className="font-mono text-[11px] text-white/50 flex items-center gap-1.5">
              <span
                className={`text-[8px] px-1 py-0.5 rounded font-bold ${
                  row.type === "CE"
                    ? "bg-[#a2f991]/15 text-[#a2f991]"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                {row.type}
              </span>
              {row.symbol}
            </span>
            <span className="font-mono text-[11px] text-white/70 text-right">{row.ltp}</span>
            <span
              className={`font-mono text-[11px] text-right font-semibold ${
                row.change.startsWith("+") ? "text-[#a2f991]" : "text-red-400"
              }`}
            >
              {row.change}
            </span>
            <span className="font-mono text-[11px] text-white/40 text-right">{row.oi}</span>
            <span className="font-mono text-[11px] text-white/40 text-right">{row.iv}</span>
          </div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-white/5">
        <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider">
          PCR: 0.82 · VIX: 12.4 · Open → 24,230
        </span>
        <span className="font-mono text-[9px] text-white/20">15:29 IST</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Phase 4 – Movement / Travel
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
          color: hovered ? "#2a4756" : "transparent",
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
      <div className="pt-32 pb-16 px-8 md:px-16 max-w-7xl mx-auto">

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
          A collection of visual storytelling, market dynamics, and movement.
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

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mt-8">
            {LENS_ITEMS.map((item, i) => (
              <div key={i} className="break-inside-avoid">
                <LensCard item={item} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Phase 3 – Market Dynamics ── */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-32 will-change-transform"
        >
          <SectionHeader label="02 // Market Dynamics" />

          <div
            className="
              mt-8 rounded-2xl border border-text_primary/10 p-8 md:p-16
              flex flex-col md:flex-row gap-12 items-center
              bg-text_primary/[0.025] backdrop-blur-sm
            "
          >
            {/* Left – copy */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              <h2 className="font-gilroyBold text-4xl md:text-5xl text-text_primary leading-tight">
                Volatility &amp; Momentum.
              </h2>
              <p className="font-satoshi text-base text-about_body leading-relaxed max-w-sm">
                Trading options and navigating the psychology of the stock market.
                Finding patterns in chaos across <strong>Nifty</strong> and <strong>Sensex</strong>.
              </p>

              {/* Stat chips */}
              <div className="flex flex-wrap gap-3 mt-2">
                {["Options", "Derivatives", "Intraday", "Swing"].map((tag) => (
                  <span
                    key={tag}
                    className="font-gilroyBold text-xs uppercase tracking-widest px-3 py-1.5 border border-text_primary/15 rounded-full text-text_primary/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right – terminal */}
            <div className="flex-1 w-full min-w-0">
              <TradingTerminal />
            </div>
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
          <SectionHeader label="03 // Movement" />

          <div className="mt-8 flex flex-col">
            {CITIES.map((city) => (
              <CityRow key={city.name} city={city} />
            ))}
          </div>

          <p className="mt-6 font-satoshi text-sm text-text_muted">
            Hover a city to see the polaroid.
          </p>
        </motion.section>

      </div>

      {/* ── Footer ── */}
      <PageFooter />
    </main>
  );
}
