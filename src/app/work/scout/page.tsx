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
  timeline: "Apr 2026 → Present",
  stack: ["Next.js 16", "Supabase", "Groq LLMs", "TypeScript", "Framer Motion"],
  github: "https://github.com/DivineDB/scout",
  live: "https://scout-pink-nine.vercel.app",
  language: "TypeScript",
  stars: 1,
};

// ─── Content blocks ───────────────────────────────────────────────────────────
const DESIGNER_CONTENT = [
  {
    id: "tldr",
    label: "TL;DR",
    text: "Scout is an intelligent job search interface custom-built to distill chaotic, raw employment listings into clean, zero-noise action paths.",
  },
  {
    id: "challenge",
    label: "UX Challenge: Cognitive Fatigue",
    text: "Standard job boards overload job hunters with repetitive postings, bloated layouts, and buried metadata. Sifting through hundreds of listings causes visual fatigue. The challenge was structuring dense text so that relevance scores, tech alignments, and application paths are scanned in under 250ms.",
  },
  {
    id: "system",
    label: "The Obsidian Mint System",
    text: "Developed a permanently dark design system using HSL value stepping (Obsidian background, Light Frost foreground) called the 'Obsidian Mint' system. High-priority details utilize the Emerald Mint accent. Visual layers are separated by a structured HSL gradient surface ramp (from Base Frame to Overlay Card), separating cards without heavy divider lines.",
  },
  {
    id: "anchors",
    label: "Typographic Scale & Custom Anchors",
    text: "Designed a hierarchy balancing a typographic text scale (--text-1 to --text-4) with clear semantic scales for match scores (Excellent to Low) and work locations (Remote, Hybrid, Onsite). Background processing latency is visually offset by staging jobs in real-time 'draft states', using a custom .ring-accent border glow to anchor focus states.",
  },
];

const DEVELOPER_CONTENT = [
  {
    id: "tldr",
    label: "TL;DR",
    text: "An AI-native crawler and processing core written with Next.js 16 App Router, Supabase Postgres, and parallelized LLM extraction hooks.",
  },
  {
    id: "difficulty",
    label: "Tech Challenge: Costly LLM Latency & Deduplication",
    text: "Operating a 70B LLM to extract granular JSON schema items (salary, skills, match grade) directly from thousands of noisy scraped web pages is incredibly slow and financially unsustainable. Standard database storage also risks duplicates due to varied job listing URLs.",
  },
  {
    id: "workaround",
    label: "Structured Two-Stage AI Filter",
    text: "Engineered a two-tier extraction pipeline. Raw job postings pass through a fast, lightweight classifier (llama-3.1-8b) to make immediate pass/fail matching decisions. Only passing roles are dispatched to a heavy distiller (llama-3.3-70b) that formats precise JSON details and constructs tailored cover letter prompts, cutting LLM cost by 75%.",
  },
  {
    id: "ghost",
    label: "The Ghost Sweep Engine",
    text: "Built an autonomous background worker controlled by Next.js edge route handlers and CRON schedulers. It scrapes multi-target web targets simultaneously, runs description texts through a local cryptographic hash to instantly filter out duplicates prior to LLM compilation, and broadcasts successful writes over Supabase Realtime for optimistic UI rendering.",
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
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        aspectRatio: "16/10",
        background: "#0a0a0a",
        border: "1px solid rgba(16,185,129,0.08)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Fake UI chrome */}
      <div className="absolute inset-0 flex flex-col p-4 gap-3">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "#10b981", opacity: 0.7 }} />
            <div className="h-2 w-12 rounded" style={{ background: "rgba(16,185,129,0.15)" }} />
          </div>
          <div className="flex gap-2">
            {[70, 50, 90].map((w, i) => (
              <div key={i} className="h-1.5 rounded" style={{ width: w, background: "rgba(255,255,255,0.06)" }} />
            ))}
          </div>
        </div>
        {/* Score cards row */}
        <div className="flex gap-2 mt-1">
          {[
            { score: "92", w: "flex-1" },
            { score: "87", w: "flex-1" },
            { score: "74", w: "flex-1" },
          ].map(({ score, w }, i) => (
            <div
              key={i}
              className={`${w} rounded-lg p-2.5 flex flex-col gap-1.5`}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-16 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div
                  className="text-[10px] font-gilroyBold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
                >
                  {score}
                </div>
              </div>
              <div className="h-1 w-20 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="h-1 w-12 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
            </div>
          ))}
        </div>
        {/* List rows */}
        {[85, 70, 55, 65].map((opacity, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5 px-2 rounded-lg" style={{ background: `rgba(255,255,255,0.0${i % 2 === 0 ? 2 : 1})` }}>
            <div className="w-6 h-6 rounded-md flex-shrink-0" style={{ background: "rgba(16,185,129,0.08)" }} />
            <div className="flex-1 flex flex-col gap-1">
              <div className="h-1.5 rounded" style={{ width: `${opacity}%`, background: "rgba(255,255,255,0.07)" }} />
              <div className="h-1 w-2/5 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
            </div>
            <div className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "rgba(16,185,129,0.6)" }}>
              {80 - i * 5}
            </div>
          </div>
        ))}
      </div>
      {/* Label overlay */}
      <div className="absolute bottom-3 right-3">
        <span
          className="text-[9px] font-gilroyBold uppercase tracking-widest px-2 py-1 rounded"
          style={{ background: "rgba(16,185,129,0.08)", color: "rgba(16,185,129,0.4)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ScoutCaseStudy() {
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
              AI-Native Pipeline · 2026
            </p>
            <h1
              className="font-gilroyBold text-6xl md:text-7xl tracking-tight leading-none"
              style={{ color: "#2a4756" }}
            >
              Scout
            </h1>
            <p
              className="text-lg font-satoshi leading-relaxed"
              style={{ color: "rgba(42,71,86,0.65)" }}
            >
              A zero-noise job intelligence platform. Autonomous. AI-powered. Built to eliminate the cognitive tax of job hunting.
            </p>
          </motion.div>

          {/* Screenshots / Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <ScreenPlaceholder label="Obsidian Mint · Dashboard" />
            <div className="grid grid-cols-2 gap-3">
              <ScreenPlaceholder label="Score Badges" />
              <ScreenPlaceholder label="Ghost Sweep" />
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
              id="scout-github-cta"
              className="group flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-gilroyBold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "rgba(5,5,5,0.88)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(16,185,129,0.2)",
                color: "#e8f5e9",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(16,185,129,0.08)",
              }}
            >
              <GithubIcon size={15} className="transition-transform group-hover:rotate-6" />
              View on GitHub
              <span
                className="ml-auto opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all"
              >
                ↗
              </span>
            </a>

            {/* Secondary: Live demo */}
            <a
              href={META.live}
              target="_blank"
              rel="noopener noreferrer"
              id="scout-live-cta"
              className="group flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-gilroyBold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#2a4756",
                boxShadow: "0 2px 12px rgba(16,185,129,0.1)",
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
                    border: "1px solid rgba(16,185,129,0.1)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                  }}
                >
                  <p
                    className="text-[10px] font-gilroyBold uppercase tracking-[0.18em]"
                    style={{ color: "rgba(16,185,129,0.5)" }}
                  >
                    Pipeline Architecture
                  </p>
                  {/* Architecture flow */}
                  {[
                    {
                      stage: "01",
                      name: "Ghost Sweep Engine",
                      desc: "CRON → Google Jobs · RemoteOK · ATS",
                      color: "rgba(16,185,129,0.9)",
                    },
                    {
                      stage: "02",
                      name: "Rapid Classifier",
                      desc: "llama-3.1-8b · filter bad matches",
                      color: "rgba(16,185,129,0.6)",
                    },
                    {
                      stage: "03",
                      name: "Deep Distiller",
                      desc: "llama-3.3-70b · JSON hooks + resume morph",
                      color: "rgba(16,185,129,0.4)",
                    },
                    {
                      stage: "04",
                      name: "Supabase Realtime",
                      desc: "Live staging → Optimistic UI push",
                      color: "rgba(16,185,129,0.25)",
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
                    border: "1px solid rgba(16,185,129,0.15)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="text-[10px] font-gilroyBold uppercase tracking-[0.2em]"
                      style={{ color: "#10b981" }}
                    >
                      Design Element System Showcase
                    </p>
                    <span className="text-[9px] font-gilroyBold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                      Obsidian Mint
                    </span>
                  </div>

                  {/* Dual Grid: Stacked Elevation & Semantic Components */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual 1: 3D Stacked Layers */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Elevation Architecture
                      </span>
                      <div className="relative h-44 w-full bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                          backgroundSize: "16px 16px"
                        }} />
                        
                        {/* Stacked isometric layers */}
                        <div className="relative w-full max-w-[200px] h-[120px] flex flex-col items-center justify-center" style={{ perspective: "400px" }}>
                          {/* Layer 3 (Overlay Card) */}
                          <div 
                            className="absolute w-[140px] h-[35px] rounded border border-white/10 flex items-center px-2 shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            style={{
                              background: "#27272a",
                              transform: "rotateX(55deg) rotateZ(-30deg) translateZ(30px)",
                              boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
                            }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                            <div className="h-1 w-12 bg-white/30 rounded" />
                          </div>

                          {/* Layer 2 (Muted Layer) */}
                          <div 
                            className="absolute w-[150px] h-[35px] rounded border border-white/5 flex items-center px-2 transition-all duration-300"
                            style={{
                              background: "#18181b",
                              transform: "rotateX(55deg) rotateZ(-30deg) translateZ(10px)",
                            }}
                          >
                            <div className="h-1 w-16 bg-white/20 rounded" />
                          </div>

                          {/* Layer 1 (Base Frame) */}
                          <div 
                            className="absolute w-[160px] h-[35px] rounded border border-white/5 flex items-center px-2 transition-all duration-300"
                            style={{
                              background: "#09090b",
                              transform: "rotateX(55deg) rotateZ(-30deg) translateZ(-10px)",
                            }}
                          >
                            <div className="h-1 w-20 bg-white/10 rounded" />
                          </div>
                        </div>
                        
                        {/* Legend overlay */}
                        <div className="absolute bottom-2 left-2 flex flex-col gap-0.5 text-[8px] text-white/40">
                          <span>▲ Overlay Card (Active Info)</span>
                          <span>■ Muted Panel (Secondary Container)</span>
                          <span>▼ Base Canvas (Obsidian Frame)</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual 2: Semantic Elements & Focus Anchor */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Semantic Components
                      </span>
                      <div className="flex flex-col gap-2 p-3 bg-black/40 rounded-xl border border-white/5 h-44 justify-center">
                        {/* Score Badge */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-[10px] text-white/50">Relevance Match</span>
                          <div className="px-2 py-0.5 rounded-full text-[9px] font-gilroyBold" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>
                            98% Match
                          </div>
                        </div>
                        
                        {/* Metadata Tag */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-[10px] text-white/50">Work Arrangement</span>
                          <div className="px-2 py-0.5 rounded-full text-[9px] font-gilroyBold border border-white/10 text-white/80">
                            Hybrid · SF
                          </div>
                        </div>

                        {/* Interactive focus ring glow demo */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border transition-all duration-300" style={{ borderColor: "#10b981", boxShadow: "0 0 10px rgba(16,185,129,0.3)" }}>
                          <span className="text-[10px] text-white/95">Interactive State</span>
                          <span className="text-[8px] text-[#10b981] font-gilroyBold uppercase tracking-widest">Active Glow</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-xs font-satoshi leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    The Obsidian Mint visual system operates on pure elevation theory. Contrast is generated structurally using step-based surface shifts rather than border lines. Signature Emerald is reserved entirely for focal signals (match scores and interactive states) to command layout scanning speeds below 250ms.
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
