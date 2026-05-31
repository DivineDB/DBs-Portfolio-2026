"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = "designer" | "developer";

// Custom GitHub icon component (Lucide path SVG)
function GithubIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// ─── Static data extracted from GitHub repo ───────────────────────────────────
const META = {
  role: "Design Engineer",
  timeline: "Apr 2026 → May 2026",
  stack: ["Next.js 14", "Zustand", "Supabase", "React 19", "Tailwind CSS v4", "jsPDF"],
  github: "https://github.com/DivineDB/POS-Sytem",
  live: "https://ssgkrish.vercel.app",
  language: "TypeScript",
  stars: 1,
};

// ─── Content blocks ───────────────────────────────────────────────────────────
const DESIGNER_CONTENT = [
  {
    id: "tldr",
    label: "TL;DR",
    text: "SSG Store is a high-density, touch-first cashier console custom-built to maximize order throughput and minimize visual strain during long checkout shifts.",
  },
  {
    id: "challenge",
    label: "UX Challenge: Cash Register Friction",
    text: "In fast-paced retail checkout environments, operators cannot afford layout shifts, deep hierarchical menus, or laggy feedback. The challenge was building an integrated workspace aggregating catalog browsing, cart operations, pricing math, and receipt printing without visual clutter.",
  },
  {
    id: "grid",
    label: "Locked-Grid Architecture & Color-Coded Tiles",
    text: "Designed an asymmetric dashboard layout utilizing color-coded tiles (Brand Mint, Rose, Blue, and Lavender) that act as distinct visual landmarks. Active items feature dark, high-contrast text over soft pastel backgrounds to guide cashier focus. Active touch boundaries are constrained to a safe 48x48px target zone for error-free input.",
  },
  {
    id: "contrast",
    label: "Optic Relief System & Micro-Animations",
    text: "To combat fatigue over 8+ hour shifts, we built a dark theme utilizing deep carbon backgrounds, raised panel surfaces, and subtle charcoal borders. Custom thin scrollbars limit clutter, and snappy micro-animations (page transitions over 300ms, hover translation over 200ms) keep the console feeling hyper-responsive.",
  },
];

const DEVELOPER_CONTENT = [
  {
    id: "tldr",
    label: "TL;DR",
    text: "An offline-tolerant, reactive terminal featuring client-side computation engines and an optimized caching layer to safeguard database throughput.",
  },
  {
    id: "difficulty",
    label: "Tech Challenge: Database Saturation & Network Dropouts",
    text: "In traditional architectures, performing server roundtrips to compute shopping totals or register inventory changes on every cart update creates huge lag. Dips in internet connectivity freeze the entire cashier station, causing queues and customer frustration.",
  },
  {
    id: "workaround",
    label: "Offline-First State & Local Sync",
    text: "Decoupled transaction mechanics by standardizing operations inside Zustand store slices. All transaction mathematics (wholesale/retail pricing, GST tier rules, flat discounts) are computed locally client-side in under 1.5ms. Order records sync to Supabase database transaction pipelines asynchronously in the background.",
  },
  {
    id: "pdf",
    label: "Offline PDF Generator & Cache",
    text: "Built a client-side in-memory cache that locks product catalog metadata for 5 minutes, yielding an 80% reduction in database read traffic. Implemented a direct browser-based jsPDF pipeline that constructs and streams thermal receipts locally, ensuring cashiers can print invoices even during complete internet blackouts.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PerspectiveToggle({
  viewMode,
  onChange,
}: {
  viewMode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div
      className="relative flex items-center gap-1 rounded-full p-1"
      style={{
        background: "rgba(42,71,86,0.06)",
        border: "1px solid rgba(42,71,86,0.1)",
      }}
      role="tablist"
      aria-label="Perspective toggle"
    >
      {(["designer", "developer"] as ViewMode[]).map((mode) => (
        <button
          key={mode}
          id={`toggle-${mode}`}
          role="tab"
          aria-selected={viewMode === mode}
          onClick={() => onChange(mode)}
          className="relative z-10 px-5 py-2 text-sm font-gilroyBold capitalize tracking-wide transition-colors duration-200 rounded-full cursor-pointer focus:outline-none"
          style={{
            color: viewMode === mode ? "#2a4756" : "rgba(42,71,86,0.4)",
          }}
        >
          {/* Animated pill background */}
          {viewMode === mode && (
            <motion.span
              layoutId="perspective-pill"
              className="absolute inset-0 rounded-full"
              style={{ background: "#A2F991" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.6,
              }}
            />
          )}
          <span className="relative z-10">{mode}</span>
        </button>
      ))}
    </div>
  );
}

function ContentBlock({
  label,
  text,
  index,
}: {
  label: string;
  text: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2 border-l-2 pl-4"
      style={{ borderColor: "rgba(162,249,145,0.5)" }}
    >
      <span
        className="text-xs font-gilroyBold uppercase tracking-widest"
        style={{ color: "rgba(42,71,86,0.45)" }}
      >
        {label}
      </span>
      <p
        className="text-base leading-relaxed font-satoshi"
        style={{ color: "rgba(42,71,86,0.82)" }}
      >
        {text}
      </p>
    </motion.div>
  );
}

function ScreenPlaceholder({ label }: { label: string }) {
  if (label === "High-Density Grid") {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "16/10",
          background: "#08090a",
          border: "1px solid rgba(166,231,199,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Fake POS grid interface */}
        <div className="absolute inset-0 flex flex-col p-3 gap-2">
          {/* Categories Tab Row */}
          <div className="flex gap-1.5 pb-1 border-b border-white/5">
            {["All", "Drinks", "Snacks", "Sweets"].map((cat, i) => (
              <div
                key={i}
                className="text-[9px] font-gilroyBold px-2.5 py-1 rounded"
                style={{
                  background: i === 0 ? "rgba(166,231,199,0.15)" : "rgba(255,255,255,0.03)",
                  color: i === 0 ? "#a6e7c7" : "rgba(255,255,255,0.4)",
                  border: i === 0 ? "1px solid rgba(166,231,199,0.2)" : "1px solid transparent",
                }}
              >
                {cat}
              </div>
            ))}
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-3 gap-2 flex-grow overflow-hidden">
            {[
              { name: "Espresso", price: "$3.50", stock: "45 left", color: "#a6e7c7" },
              { name: "Matcha Latte", price: "$4.80", stock: "12 left", color: "#a6e7c7" },
              { name: "Choco Muffin", price: "$3.00", stock: "8 left", color: "rgba(255, 69, 58, 0.8)" },
              { name: "Avocado Toast", price: "$7.50", stock: "30 left", color: "#a6e7c7" },
              { name: "Croissant", price: "$2.80", stock: "3 left", color: "rgba(255, 69, 58, 0.8)" },
              { name: "Club Sandwich", price: "$8.50", stock: "22 left", color: "#a6e7c7" },
            ].map((prod, i) => (
              <div
                key={i}
                className="rounded-lg p-2 flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="h-1 w-8 rounded mb-1" style={{ background: prod.color }} />
                  <span className="text-[10px] font-gilroyBold text-white/90 truncate">{prod.name}</span>
                  <span className="text-[8px] text-white/40">{prod.stock}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-gilroyBold text-[#a6e7c7]">{prod.price}</span>
                  <div className="w-4 h-4 rounded flex items-center justify-center text-[9px] text-white/80" style={{ background: "rgba(255,255,255,0.06)" }}>
                    +
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (label === "Active Checkout Cart") {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "16/10",
          background: "#08090a",
          border: "1px solid rgba(166,231,199,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Fake Cart summary layout */}
        <div className="absolute inset-0 flex flex-col p-3 justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-gilroyBold text-white/40 uppercase tracking-widest">Active Cart (3 items)</span>
            <div className="flex flex-col gap-1.5 max-h-[110px] overflow-hidden">
              {[
                { name: "Matcha Latte", qty: "2x", price: "$9.60" },
                { name: "Choco Muffin", qty: "1x", price: "$3.00" },
                { name: "Avocado Toast", qty: "1x", price: "$7.50" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] py-1 border-b border-white/5">
                  <div className="flex gap-2 text-white/80">
                    <span className="text-[#a6e7c7]">{item.qty}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-gilroyBold text-white/90">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Cart totals */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
            <div className="flex justify-between text-[9px] text-white/40">
              <span>Subtotal</span>
              <span>$20.10</span>
            </div>
            <div className="flex justify-between text-[9px] text-white/40">
              <span>GST (5%)</span>
              <span>$1.01</span>
            </div>
            <div className="flex justify-between text-[11px] font-gilroyBold text-[#a6e7c7] pt-0.5">
              <span>Total</span>
              <span>$21.11</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / default placeholder (Checkout Analytics or Bill Print)
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        aspectRatio: "16/10",
        background: "#08090a",
        border: "1px solid rgba(166,231,199,0.08)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(166,231,199,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(166,231,199,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 flex flex-col p-4 justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "#a6e7c7" }} />
            <span className="text-[10px] text-white/60 font-gilroyBold">Terminal Active</span>
          </div>
          <span className="text-[9px] text-white/30 font-mono">ID: pos-t4</span>
        </div>

        {/* Center illustration of invoice */}
        <div className="flex flex-col items-center gap-1.5 my-auto">
          <div className="w-12 h-16 rounded border border-white/10 bg-white/5 p-1.5 flex flex-col gap-1">
            <div className="h-1.5 w-full bg-white/20 rounded" />
            <div className="h-1 w-2/3 bg-white/10 rounded" />
            <div className="h-1 w-1/2 bg-white/10 rounded" />
            <div className="h-1 w-3/4 bg-white/15 rounded mt-auto" />
          </div>
          <span className="text-[10px] text-white/50 font-gilroyBold">jsPDF Offline Generator</span>
        </div>

        <div className="flex justify-between items-center text-[8px] text-white/30">
          <span>SSG STORE POS</span>
          <span>ONLINE MODE</span>
        </div>
      </div>
      {/* Label overlay */}
      <div className="absolute bottom-3 right-3">
        <span
          className="text-[9px] font-gilroyBold uppercase tracking-widest px-2 py-1 rounded"
          style={{ background: "rgba(166,231,199,0.08)", color: "rgba(166,231,199,0.4)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function POSCaseStudy() {
  const [viewMode, setViewMode] = useState<ViewMode>("designer");

  const content = viewMode === "designer" ? DESIGNER_CONTENT : DEVELOPER_CONTENT;

  return (
    <main
      className="min-h-screen w-full font-gilroyRegular selection:bg-accent_highlight selection:text-text_primary"
      style={{ background: "#f8edd1" }}
    >
      {/* ── Back nav ── */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 pt-10">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-gilroyBold transition-colors"
          style={{ color: "rgba(42,71,86,0.5)" }}
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />
          Selected Work
        </Link>
      </div>

      {/* ── Split-screen layout ── */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* ════════════ LEFT COLUMN ════════════ */}
        <div className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col gap-8">

          {/* Project identity */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <p
              className="text-xs font-gilroyBold uppercase tracking-[0.2em]"
              style={{ color: "rgba(42,71,86,0.4)" }}
            >
              Retail Dashboard · 2026
            </p>
            <h1
              className="font-gilroyBold text-6xl md:text-7xl tracking-tight leading-none"
              style={{ color: "#2a4756" }}
            >
              POS Panel
            </h1>
            <p
              className="text-lg font-satoshi leading-relaxed"
              style={{ color: "rgba(42,71,86,0.65)" }}
            >
              A high-density retail point-of-sale console. Tactile grids. Offline resiliency. Engineered to eliminate input lag and visual noise.
            </p>
          </motion.div>

          {/* Screenshots / Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <ScreenPlaceholder label="High-Density Grid" />
            <div className="grid grid-cols-2 gap-3">
              <ScreenPlaceholder label="Active Checkout Cart" />
              <ScreenPlaceholder label="Bill Printer" />
            </div>
          </motion.div>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Role", value: META.role },
              { label: "Timeline", value: META.timeline },
              { label: "Language", value: META.language },
              { label: "Stars", value: `★ ${META.stars}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span
                  className="text-[10px] font-gilroyBold uppercase tracking-widest"
                  style={{ color: "rgba(42,71,86,0.35)" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm font-gilroyBold"
                  style={{ color: "rgba(42,71,86,0.75)" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Stack tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2"
          >
            {META.stack.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-gilroyBold"
                style={{
                  background: "rgba(42,71,86,0.05)",
                  border: "1px solid rgba(42,71,86,0.1)",
                  color: "rgba(42,71,86,0.6)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Primary glassmorphic GitHub button */}
            <a
              href={META.github}
              target="_blank"
              rel="noopener noreferrer"
              id="pos-github-cta"
              className="group flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-gilroyBold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex-1 sm:flex-initial"
              style={{
                background: "rgba(5,5,5,0.88)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(166,231,199,0.2)",
                color: "#e8f5e9",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(166,231,199,0.08)",
              }}
            >
              <GithubIcon size={15} className="transition-transform group-hover:rotate-6" />
              View on GitHub
              <span
                className="ml-auto opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all text-xs"
              >
                ↗
              </span>
            </a>

            {/* Secondary: Live demo */}
            <a
              href={META.live}
              target="_blank"
              rel="noopener noreferrer"
              id="pos-live-cta"
              className="group flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-gilroyBold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex-1 sm:flex-initial"
              style={{
                background: "rgba(166,231,199,0.12)",
                border: "1px solid rgba(166,231,199,0.3)",
                color: "#2a4756",
                boxShadow: "0 2px 12px rgba(166,231,199,0.1)",
              }}
            >
              <ExternalLink size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Live Demo
            </a>
          </motion.div>
        </div>

        {/* ════════════ RIGHT COLUMN — The Breakdown ════════════ */}
        <div className="lg:col-span-7 flex flex-col gap-8">

          {/* Header + Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 pt-1"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2
                className="font-gilroyBold text-2xl"
                style={{ color: "#2a4756" }}
              >
                The Breakdown
              </h2>
              <PerspectiveToggle viewMode={viewMode} onChange={setViewMode} />
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(42,71,86,0.08)" }} />
          </motion.div>

          {/* Dynamic content — AnimatePresence crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-7"
            >
              {content.map((block, i) => (
                <ContentBlock
                  key={block.id}
                  label={block.label}
                  text={block.text}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Contextual technical visual ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {viewMode === "developer" ? (
                <motion.div
                  key="arch-diagram"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32 }}
                  className="rounded-2xl p-6 flex flex-col gap-5"
                  style={{
                    background: "rgba(5,5,5,0.92)",
                    border: "1px solid rgba(166,231,199,0.1)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                  }}
                >
                  <p
                    className="text-[10px] font-gilroyBold uppercase tracking-[0.18em]"
                    style={{ color: "rgba(166,231,199,0.5)" }}
                  >
                    Checkout Lifecycle
                  </p>
                  {/* Architecture flow */}
                  {[
                    {
                      stage: "01",
                      name: "Zustand Local Stage",
                      desc: "Instant cart mutation & computational math (<1.5ms)",
                      color: "rgba(166,231,199,0.9)",
                    },
                    {
                      stage: "02",
                      name: "Direct jsPDF Construct",
                      desc: "Render vector print stream directly in browser (0 dependencies)",
                      color: "rgba(166,231,199,0.6)",
                    },
                    {
                      stage: "03",
                      name: "Supabase Queue Push",
                      desc: "Parallel write for order logs & sales history aggregation",
                      color: "rgba(166,231,199,0.4)",
                    },
                    {
                      stage: "04",
                      name: "Database Edge Trigger",
                      desc: "Stock adjustments & proactive low-stock system alerts",
                      color: "rgba(166,231,199,0.25)",
                    },
                  ].map((step, i) => (
                    <div key={step.stage} className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-gilroyBold"
                          style={{
                            background: `${step.color}18`,
                            border: `1px solid ${step.color}40`,
                            color: step.color,
                          }}
                        >
                          {step.stage}
                        </div>
                        {i < 3 && (
                          <div
                            className="w-px h-8"
                            style={{
                              background: `linear-gradient(to bottom, ${step.color}30, transparent)`,
                            }}
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 pt-0.5">
                        <span
                          className="text-sm font-gilroyBold"
                          style={{ color: step.color }}
                        >
                          {step.name}
                        </span>
                        <span
                          className="text-xs font-satoshi"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="design-tokens"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32 }}
                  className="rounded-2xl p-6 flex flex-col gap-6"
                  style={{
                    background: "rgba(10,18,22,0.95)",
                    border: "1px solid rgba(166,231,199,0.15)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="text-[10px] font-gilroyBold uppercase tracking-[0.2em]"
                      style={{ color: "#a6e7c7" }}
                    >
                      Design Element System Showcase
                    </p>
                    <span className="text-[9px] font-gilroyBold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: "rgba(166,231,199,0.1)", color: "#a6e7c7" }}>
                      Tactile POS
                    </span>
                  </div>

                  {/* Dual Grid: Landmark Keypad & Contrast Hierarchy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual 1: Landmark Color Grid */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Landmark Tile Matrix (48px Touch Zones)
                      </span>
                      <div className="grid grid-cols-2 gap-2.5 p-3 bg-black/40 rounded-xl border border-white/5 h-44 justify-center">
                        <div className="rounded-lg flex flex-col justify-between p-2 h-16 transition-transform hover:scale-105 cursor-pointer" style={{ background: "#a6e7c7", color: "#1a2f25" }}>
                          <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Active</span>
                          <span className="text-[10px] font-gilroyBold leading-none">Brand Mint</span>
                        </div>
                        <div className="rounded-lg flex flex-col justify-between p-2 h-16 transition-transform hover:scale-105 cursor-pointer" style={{ background: "#fbc4c5", color: "#3d1f20" }}>
                          <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Alert</span>
                          <span className="text-[10px] font-gilroyBold leading-none">Rose Pastel</span>
                        </div>
                        <div className="rounded-lg flex flex-col justify-between p-2 h-16 transition-transform hover:scale-105 cursor-pointer" style={{ background: "#abcbf4", color: "#1a2535" }}>
                          <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Regular</span>
                          <span className="text-[10px] font-gilroyBold leading-none">Blue Slate</span>
                        </div>
                        <div className="rounded-lg flex flex-col justify-between p-2 h-16 transition-transform hover:scale-105 cursor-pointer" style={{ background: "#d1c4e9", color: "#251a3a" }}>
                          <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Special</span>
                          <span className="text-[10px] font-gilroyBold leading-none">Lavender</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual 2: Optic Relief Layering */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Contrast & Structure
                      </span>
                      <div className="flex flex-col gap-2.5 p-3.5 bg-black/40 rounded-xl border border-white/5 h-44 justify-center">
                        {/* Contrast demo row */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] font-gilroyBold text-white/30 uppercase tracking-widest">Base Canvas</span>
                          <div className="h-6 rounded bg-[#262626] border border-white/5 flex items-center px-2">
                            <span className="text-[9px] text-white/50">Carbon Canvas</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] font-gilroyBold text-white/30 uppercase tracking-widest">Raised Surfaces</span>
                          <div className="h-8 rounded bg-[#303030] border border-[#424242] flex items-center justify-between px-2.5">
                            <span className="text-[9px] text-white/80">Panel Content</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a6e7c7] shadow-sm shadow-[#a6e7c7]/50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-xs font-satoshi leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    SSG Store cash terminal designs prioritize muscle memory. Core grids are geometrically locked to prevent runtime shifting, while pastel visual landmarks map category regions. Minimum active targets of 48px square safeguard against false cashier taps during checkout rushes.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="mx-auto max-w-[1200px] px-6 md:px-12 pb-16 mt-8"
        style={{ borderTop: "1px dashed rgba(42,71,86,0.15)" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
          <nav className="flex gap-6">
            {[
              { label: "About", href: "/about" },
              { label: "Other Things", href: "/other-things" },
              { label: "Contact", href: "/hire-me" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-gilroyBold transition-opacity hover:opacity-60"
                style={{ color: "#2a4756" }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <p
            className="text-xs font-gilroyRegular"
            style={{ color: "rgba(42,71,86,0.35)" }}
          >
            © 2026 · Divyansh Baghel
          </p>
        </div>
      </div>
    </main>
  );
}
