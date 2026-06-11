"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageFooter from "@/components/PageFooter";

// Custom GitHub icon component
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

// ─── Static metadata ──────────────────────────────────────────────────────────
const META = {
  role: "Design Engineer",
  timeline: "Apr 2026 → May 2026",
  stack: ["Next.js 14", "Zustand", "Supabase", "React 19", "Tailwind CSS v4", "jsPDF"],
  github: "https://github.com/DivineDB/POS-Sytem",
  live: "https://ssgkrish.vercel.app",
  language: "TypeScript",
  stars: 1,
};

// ─── Interactive UI Placeholders ──────────────────────────────────────────────
function ScreenPlaceholder({ label }: { label: string }) {
  if (label === "High-Density Grid") {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "16/10",
          background: "#08090a",
          border: "1px solid rgba(166,231,199,0.08)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
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
          boxShadow: "0 12px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
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

  // Fallback / Bill Print
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        aspectRatio: "16/10",
        background: "#08090a",
        border: "1px solid rgba(166,231,199,0.08)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
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
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function POSCaseStudy() {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<"grid" | "pastels" | "relief" | "animations">("grid");

  return (
    <main
      className="min-h-screen w-full font-gilroyRegular selection:bg-accent_highlight selection:text-text_primary"
      style={{ background: "#f8edd1" }}
    >
      {/* ── Sticky back nav ── */}
      <div
        className="sticky top-0 z-50 w-full px-6 py-4"
        style={{
          background: "rgba(248,237,209,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(42,71,86,0.08)",
        }}
      >
        <div className="mx-auto max-w-[800px]">
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
      </div>

      {/* ── Article content ── */}
      <div className="mx-auto max-w-[800px] px-6 py-12 flex flex-col gap-10">
        
        {/* Project Header Identity */}
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
            className="text-lg font-satoshi leading-relaxed mt-2"
            style={{ color: "rgba(42,71,86,0.65)" }}
          >
            A touch-first retail checkout console designed for optimal throughput, offline resilience, and muscle memory.
          </p>
        </motion.div>

        {/* Project Meta Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y"
          style={{ borderColor: "rgba(42,71,86,0.12)" }}
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

        {/* Tags Stack and Action Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div className="flex flex-wrap gap-2 max-w-[500px]">
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
          </div>

          <div className="flex gap-3">
            <a
              href={META.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-gilroyBold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "rgba(5,5,5,0.88)",
                border: "1px solid rgba(166,231,199,0.2)",
                color: "#e8f5e9",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <GithubIcon size={14} className="transition-transform group-hover:rotate-6" />
              GitHub ↗
            </a>
            <a
              href={META.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-gilroyBold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "rgba(166,231,199,0.12)",
                border: "1px solid rgba(166,231,199,0.3)",
                color: "#2a4756",
              }}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          </div>
        </motion.div>

        {/* Narrative Flow */}
        <div className="flex flex-col gap-12 mt-8 font-satoshi text-base leading-relaxed text-slate-800">
          
          {/* TLDR / Brief */}
          <section className="flex flex-col gap-2 border-l-2 pl-4" style={{ borderColor: "rgba(162,249,145,0.5)" }}>
            <span className="text-[10px] font-gilroyBold uppercase tracking-widest text-[#2a4756]/50">Summary</span>
            <p className="text-lg text-[#2a4756] font-gilroyBold leading-snug">
              SSG Store is a high-density, touch-first cashier console custom-built to maximize order throughput and minimize visual strain during long checkout shifts.
            </p>
          </section>

          {/* Section 1: The Challenge */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-gilroyBold text-[#2a4756]">UX Challenge: Cash Register Friction</h2>
            <p>
              In fast-paced retail checkout environments, operators cannot afford layout shifts, deep hierarchical menus, or laggy feedback. The challenge was building an integrated workspace aggregating catalog browsing, cart operations, pricing math, and receipt printing without visual clutter.
            </p>
          </section>

          {/* Section 2: Locked Grid Spatial System */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t pt-8" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">01. Locked-Grid Spatial System</h2>
              <p>
                Unlike fluid web layouts, a Point of Sale (POS) terminal requires constant grid alignment. The checkout panel uses a locked, asymmetric grid that never shifts during operation.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                <li>
                  <strong className="text-slate-900">Fixed Coordinates:</strong> Anchors the Product Catalog, Active Cart, and Checkout Summary in absolute visual positions to build cashier muscle memory.
                </li>
                <li>
                  <strong className="text-slate-900">Touch-Safe Targets:</strong> Buttons, item tiles, and cart controls are constrained to a minimum bounding box of <strong>48x48 pixels</strong> to prevent misaligned taps.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-gilroyBold text-center uppercase tracking-widest text-slate-400">
                Workflow Visual: Grid Layout Mockup
              </span>
              <ScreenPlaceholder label="High-Density Grid" />
            </div>
          </section>

          {/* Section 3: Color-Coded Pastels & Landmark Grids */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t pt-8" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="md:order-2 flex flex-col gap-4">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">02. Pastel Landmarking</h2>
              <p>
                Instead of raw, saturated colors that cause optic fatigue during long shifts, the POS Panel employs a system of soft, high-contrast pastels:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                <li>
                  <strong className="text-slate-900">Brand Mint:</strong> Highlights active state items and primary checkouts.
                </li>
                <li>
                  <strong className="text-slate-900">Rose Pastel:</strong> Signals low stock, errors, or supervisor approvals.
                </li>
                <li>
                  <strong className="text-slate-900">Blue & Lavender Slate:</strong> Segregates categories (e.g. food, drinks) to speed up navigation.
                </li>
                <li>
                  <strong className="text-slate-900">Active Ink:</strong> Dark, high-contrast typography layered over pastel tiles to remain readable under varied lighting.
                </li>
              </ul>
            </div>
            <div className="md:order-1 flex flex-col gap-2">
              <span className="text-[9px] font-gilroyBold text-center uppercase tracking-widest text-slate-400">
                Workflow Visual: Checkout Cart Grid
              </span>
              <ScreenPlaceholder label="Active Checkout Cart" />
            </div>
          </section>

          {/* Section 4: Zustand Offline State & Sync */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t pt-8" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">03. State Lifecycle & Offline Resilience</h2>
              <p>
                Traditional architectures make database requests to compute totals, causing register lag. SSG Store decouples transactions via client-side Zustand store slices.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                <li>
                  <strong className="text-slate-900">Zustand Slices:</strong> Computes tax, wholesale pricing, and discounts locally in under <strong>1.5ms</strong>.
                </li>
                <li>
                  <strong className="text-slate-900">Async Queue Sync:</strong> Transactions write to Supabase asynchronously in the background, allowing terminal operations during connection dropouts.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-gilroyBold text-center uppercase tracking-widest text-slate-400">
                Workflow Diagram: Transaction Lifecycle
              </span>
              <div
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{
                  background: "rgba(5,5,5,0.92)",
                  border: "1px solid rgba(166,231,199,0.1)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                }}
              >
                <p className="text-[9px] font-gilroyBold uppercase tracking-[0.18em] text-[#a6e7c7]/60">
                  Checkout Lifecycle
                </p>
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
                  <div key={step.stage} className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-gilroyBold"
                        style={{
                          background: `${step.color}15`,
                          border: `1px solid ${step.color}35`,
                          color: step.color,
                        }}
                      >
                        {step.stage}
                      </div>
                      {i < 3 && (
                        <div
                          className="w-px h-6"
                          style={{
                            background: `linear-gradient(to bottom, ${step.color}25, transparent)`,
                          }}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-gilroyBold" style={{ color: step.color }}>{step.name}</span>
                      <span className="text-[10px] text-white/40">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: jsPDF Local Print */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t pt-8" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="md:order-2 flex flex-col gap-4">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">04. In-Memory Cache & Thermal Receipts</h2>
              <p>
                To safeguard the register from complete network outages, a local thermal receipt printer workflow runs entirely client-side.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                <li>
                  <strong className="text-slate-900">Local jsPDF Pipeline:</strong> Constructs and streams invoice vector graphics locally, enabling checkout receipts during full internet dropouts.
                </li>
                <li>
                  <strong className="text-slate-900">5-Min Catalog Cache:</strong> Locks metadata catalog records in memory, reducing database read load by 80% to protect supabase infrastructure during peak traffic hours.
                </li>
              </ul>
            </div>
            <div className="md:order-1 flex flex-col gap-2">
              <span className="text-[9px] font-gilroyBold text-center uppercase tracking-widest text-slate-400">
                Workflow Visual: Thermal Receipt Streamer
              </span>
              <ScreenPlaceholder label="Bill Printer" />
            </div>
          </section>

          {/* Section 6: Specifications Panel Reference */}
          <section className="border-t pt-10 flex flex-col gap-6" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">System Specifications Reference</h2>
              <p className="text-sm text-slate-600">
                Direct reference specifications detailing terminal interactive configurations, touch target parameters, and optic refresh systems.
              </p>
            </div>
            
            {/* Interactive design showcase component */}
            <motion.div
              key="design-tokens"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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

              {/* Grid visualizers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual 1 */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Landmark Tile Matrix (48px Touch Zones)
                  </span>
                  <motion.div 
                    className="grid grid-cols-2 gap-2.5 p-3 bg-black/40 rounded-xl border h-44 justify-center items-center transition-all duration-300"
                    animate={{
                      borderColor: (activeShowcaseTab === "grid" || activeShowcaseTab === "pastels") ? "rgba(166,231,199,0.3)" : "rgba(255,255,255,0.05)"
                    }}
                  >
                    <motion.div 
                      className="rounded-lg flex flex-col justify-between p-2 h-16 cursor-pointer" 
                      style={{ background: "#a6e7c7", color: "#1a2f25" }}
                      animate={{
                        scale: activeShowcaseTab === "grid" ? 1.04 : 1,
                        boxShadow: activeShowcaseTab === "pastels" ? "0 0 12px rgba(166,231,199,0.5)" : "none",
                        y: activeShowcaseTab === "animations" ? [0, -3, 0] : 0
                      }}
                      transition={{ y: { repeat: Infinity, duration: 1.5, delay: 0 } }}
                    >
                      <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Active</span>
                      <span className="text-[10px] font-gilroyBold leading-none">Brand Mint</span>
                    </motion.div>

                    <motion.div 
                      className="rounded-lg flex flex-col justify-between p-2 h-16 cursor-pointer" 
                      style={{ background: "#fbc4c5", color: "#3d1f20" }}
                      animate={{
                        scale: activeShowcaseTab === "grid" ? 1.04 : 1,
                        boxShadow: activeShowcaseTab === "pastels" ? "0 0 12px rgba(251,196,197,0.5)" : "none",
                        y: activeShowcaseTab === "animations" ? [0, -3, 0] : 0
                      }}
                      transition={{ y: { repeat: Infinity, duration: 1.5, delay: 0.3 } }}
                    >
                      <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Alert</span>
                      <span className="text-[10px] font-gilroyBold leading-none">Rose Pastel</span>
                    </motion.div>

                    <motion.div 
                      className="rounded-lg flex flex-col justify-between p-2 h-16 cursor-pointer" 
                      style={{ background: "#abcbf4", color: "#1a2535" }}
                      animate={{
                        scale: activeShowcaseTab === "grid" ? 1.04 : 1,
                        boxShadow: activeShowcaseTab === "pastels" ? "0 0 12px rgba(171,203,244,0.5)" : "none",
                        y: activeShowcaseTab === "animations" ? [0, -3, 0] : 0
                      }}
                      transition={{ y: { repeat: Infinity, duration: 1.5, delay: 0.6 } }}
                    >
                      <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Regular</span>
                      <span className="text-[10px] font-gilroyBold leading-none">Blue Slate</span>
                    </motion.div>

                    <motion.div 
                      className="rounded-lg flex flex-col justify-between p-2 h-16 cursor-pointer" 
                      style={{ background: "#d1c4e9", color: "#251a3a" }}
                      animate={{
                        scale: activeShowcaseTab === "grid" ? 1.04 : 1,
                        boxShadow: activeShowcaseTab === "pastels" ? "0 0 12px rgba(209,196,233,0.5)" : "none",
                        y: activeShowcaseTab === "animations" ? [0, -3, 0] : 0
                      }}
                      transition={{ y: { repeat: Infinity, duration: 1.5, delay: 0.9 } }}
                    >
                      <span className="text-[8px] font-gilroyBold uppercase tracking-wider">Special</span>
                      <span className="text-[10px] font-gilroyBold leading-none">Lavender</span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Visual 2 */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Contrast & Structure
                  </span>
                  <motion.div 
                    className="flex flex-col gap-2.5 p-3.5 bg-black/40 rounded-xl border h-44 justify-center transition-all duration-300"
                    animate={{
                      borderColor: activeShowcaseTab === "relief" ? "rgba(166,231,199,0.3)" : "rgba(255,255,255,0.05)"
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-gilroyBold text-white/30 uppercase tracking-widest">Base Canvas</span>
                      <motion.div 
                        className="h-6 rounded bg-[#262626] border flex items-center px-2"
                        animate={{ borderColor: activeShowcaseTab === "relief" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)" }}
                      >
                        <span className="text-[9px] text-white/50">Carbon Canvas</span>
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-gilroyBold text-white/30 uppercase tracking-widest">Raised Surfaces</span>
                      <motion.div 
                        className="h-8 rounded bg-[#303030] border flex items-center justify-between px-2.5"
                        animate={{
                          borderColor: activeShowcaseTab === "relief" ? "#a6e7c7" : "#424242",
                          boxShadow: activeShowcaseTab === "relief" ? "0 0 10px rgba(166,231,199,0.15)" : "none"
                        }}
                      >
                        <span className="text-[9px] text-white/80">Panel Content</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#a6e7c7] shadow-sm shadow-[#a6e7c7]/50" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Selector */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-5 mt-2">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "grid", label: "Locked-Grid System" },
                    { id: "pastels", label: "Pastel Landmarking" },
                    { id: "relief", label: "Optic Relief" },
                    { id: "animations", label: "Micro-Animations" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveShowcaseTab(tab.id as "grid" | "pastels" | "relief" | "animations")}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-gilroyBold cursor-pointer transition-all duration-200"
                      style={{
                        background: activeShowcaseTab === tab.id ? "rgba(166, 231, 199, 0.15)" : "rgba(255, 255, 255, 0.02)",
                        color: activeShowcaseTab === tab.id ? "#a6e7c7" : "rgba(255, 255, 255, 0.5)",
                        border: activeShowcaseTab === tab.id ? "1px solid rgba(166, 231, 199, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)"
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="bg-black/25 rounded-xl p-4 border border-white/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeShowcaseTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-3"
                    >
                      {activeShowcaseTab === "grid" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">Locked-Grid Spatial System</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            POS terminals require a highly predictable layout that builds cashier muscle memory over repetitive operations:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Fixed Coordinates:</strong> Anchors the catalog, checkout cart, and checkout math in absolute positions that never shift.</li>
                            <li><strong className="text-white/85">Touch-Safe Targets:</strong> Imposes a strict minimum bounding size of <strong className="text-[#a6e7c7]">48x48 pixels</strong> for all interactive buttons to eliminate misaligned finger-taps in high-stress retail checkouts.</li>
                          </ul>
                        </>
                      )}
                      {activeShowcaseTab === "pastels" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">Color-Coded Pastels & Landmark Grids</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            Replaces harsh, saturated primary colors with a system of soft pastels to safeguard operators against screen fatigue:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Brand Mint:</strong> Reserved for selected items and high-priority primary checkout actions.</li>
                            <li><strong className="text-white/85">Rose Pastel:</strong> Triggers supervisor alerts, low-stock warnings, and transaction errors.</li>
                            <li><strong className="text-white/85">Blue & Lavender Slate:</strong> Segregates categories (e.g. food, drinks, promos) into visually recognizable groups.</li>
                            <li><strong className="text-white/85">Active Ink:</strong> Solid, high-contrast dark typography layered on pastel tiles to maximize readability under variable retail light.</li>
                          </ul>
                        </>
                      )}
                      {activeShowcaseTab === "relief" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">Optic Relief System</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            Styled specifically to support long 8+ hour cashier shifts:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Deep Carbon Canvas:</strong> Minimizes display light emission and reduces ambient screen glare.</li>
                            <li><strong className="text-white/85">Raised Panel Tiles:</strong> Lighter gray cards that visually segment layout functions without clutter.</li>
                            <li><strong className="text-white/85">Charcoal Borders:</strong> Ultra-thin borders guiding structured navigation without screen glare.</li>
                          </ul>
                        </>
                      )}
                      {activeShowcaseTab === "animations" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">Snappy Micro-Animations</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            Visual feedback speed is optimized to keep pace with rapid retail processing rates:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Ultra-Fast Cycles:</strong> Page changes, category filters, and item updates complete within <strong className="text-[#a6e7c7]">200ms to 300ms</strong>.</li>
                            <li><strong className="text-white/85">Linear Translations:</strong> Hovering and tapping yields instant, simple translation motion to confirm actions immediately.</li>
                          </ul>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* ── Footer spacer + Footer ── */}
      <div className="mt-32" />
      <PageFooter />
    </main>
  );
}
