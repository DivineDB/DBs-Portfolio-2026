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
  timeline: "Apr 2026 → Present",
  stack: ["Next.js 16", "Supabase", "Groq LLMs", "TypeScript", "Framer Motion"],
  github: "https://github.com/DivineDB/scout",
  live: "https://scout-pink-nine.vercel.app",
  language: "TypeScript",
  stars: 1,
};

// ─── Interactive UI Placeholders ──────────────────────────────────────────────
function ScreenPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        aspectRatio: "16/10",
        background: "#0a0a0a",
        border: "1px solid rgba(16,185,129,0.08)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ScoutCaseStudy() {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<"surface" | "accent" | "typography" | "transitions">("surface");

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
            AI-Native Pipeline · 2026
          </p>
          <h1
            className="font-gilroyBold text-6xl md:text-7xl tracking-tight leading-none"
            style={{ color: "#2a4756" }}
          >
            Scout
          </h1>
          <p
            className="text-lg font-satoshi leading-relaxed mt-2"
            style={{ color: "rgba(42,71,86,0.65)" }}
          >
            A zero-noise job intelligence platform. Autonomous. AI-powered. Built to eliminate the cognitive tax of job hunting.
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
                border: "1px solid rgba(16,185,129,0.2)",
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
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
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
              Scout is an intelligent job search interface custom-built to distill chaotic, raw employment listings into clean, zero-noise action paths.
            </p>
          </section>

          {/* Section 1: UX Challenge */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-gilroyBold text-[#2a4756]">UX Challenge: Cognitive Fatigue</h2>
            <p>
              Standard job boards overload job hunters with repetitive postings, bloated layouts, and buried metadata. Sifting through hundreds of listings causes visual fatigue. The challenge was structuring dense text so that relevance scores, tech alignments, and application paths are scanned in under 250ms.
            </p>
          </section>

          {/* Section 2: Obsidian Mint Surface Architecture */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t pt-8" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">01. Conceptual Surface Architecture</h2>
              <p>
                Scout is built around the <strong>Obsidian Mint</strong> design system. Rather than using harsh borders and high-opacity dividing lines, Scout separates modules using a gradual HSL-based surface ramp stacked in a strict conceptual sequence:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                <li>
                  <strong className="text-slate-900">Base Frame & Glassy Overlay:</strong> An Obsidian base frame provides a dark canvas to reduce eye strain, while a glassy overlay acts as a container for secondary search filter modules.
                </li>
                <li>
                  <strong className="text-slate-900">Muted Panels & Overlay Cards:</strong> Slightly lighter elevated containers holding individual job listings to visually separate cards.
                </li>
                <li>
                  <strong className="text-slate-900">Emerald Signature Accent:</strong> High relevance matches, active markers, and primary action CTAs utilize an Emerald Mint highlight, catching focus within milliseconds.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-gilroyBold text-center uppercase tracking-widest text-slate-400">
                Workflow Visual: Isometric Elevation Stack
              </span>
              {/* Stacked isometric layers */}
              <div className="relative h-44 w-full bg-black/95 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "16px 16px"
                }} />
                
                <div className="relative w-full max-w-[200px] h-[120px] flex flex-col items-center justify-center" style={{ perspective: "400px" }}>
                  {/* Layer 3 */}
                  <div 
                    className="absolute w-[140px] h-[35px] rounded border border-white/10 flex items-center px-2 shadow-2xl"
                    style={{
                      background: "#27272a",
                      transform: "rotateX(55deg) rotateZ(-30deg) translateZ(30px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                    <div className="h-1 w-12 bg-white/30 rounded" />
                  </div>
                  {/* Layer 2 */}
                  <div 
                    className="absolute w-[150px] h-[35px] rounded border border-white/5 flex items-center px-2"
                    style={{
                      background: "#18181b",
                      transform: "rotateX(55deg) rotateZ(-30deg) translateZ(10px)",
                    }}
                  >
                    <div className="h-1 w-16 bg-white/20 rounded" />
                  </div>
                  {/* Layer 1 */}
                  <div 
                    className="absolute w-[160px] h-[35px] rounded border border-white/5 flex items-center px-2"
                    style={{
                      background: "#09090b",
                      transform: "rotateX(55deg) rotateZ(-30deg) translateZ(-10px)",
                    }}
                  >
                    <div className="h-1 w-20 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Two-Stage AI Filter */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t pt-8" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="md:order-2 flex flex-col gap-4">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">02. Two-Stage Structured AI Filter</h2>
              <p>
                Extracting salary, skills, and relevance matches using heavy 70B parameter LLMs directly on raw, noisy scraped web targets is slow and financially unsustainable. Scout utilizes a two-tier extraction pipeline:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                <li>
                  <strong className="text-slate-900">Lightweight Classifier:</strong> A fast classifier (llama-3.1-8b) runs instant pass/fail evaluations on incoming postings.
                </li>
                <li>
                  <strong className="text-slate-900">Deep Distiller:</strong> Only matches that pass are dispatched to a heavy LLM (llama-3.3-70b) to generate clean JSON schemas and resume-tailoring drafts, reducing API overhead costs by 75%.
                </li>
              </ul>
            </div>
            <div className="md:order-1 flex flex-col gap-2">
              <span className="text-[9px] font-gilroyBold text-center uppercase tracking-widest text-slate-400">
                Workflow Diagram: Pipeline Architecture
              </span>
              {/* Pipeline flow */}
              <div
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{
                  background: "rgba(5,5,5,0.92)",
                  border: "1px solid rgba(16,185,129,0.1)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                }}
              >
                <p className="text-[9px] font-gilroyBold uppercase tracking-[0.18em] text-[#10b981]/60">
                  Pipeline Architecture
                </p>
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

          {/* Section 4: Ghost Sweep Engine */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t pt-8" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">03. The Ghost Sweep Engine</h2>
              <p>
                To aggregate jobs autonomously, a background worker runs scraping scripts across multiple job source endpoints.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                <li>
                  <strong className="text-slate-900">Cryptographic Deduplication:</strong> Scraped description text passes through local hash comparison filters to drop duplicate listings before dispatching LLM queries.
                </li>
                <li>
                  <strong className="text-slate-900">Staging & Realtime Broadcast:</strong> Live processing states sync over Supabase Realtime pipelines, rendering optimistic draft states and preventing layout jumps.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-gilroyBold text-center uppercase tracking-widest text-slate-400">
                Workflow Visual: Scraped Score Feeds
              </span>
              <ScreenPlaceholder label="Scout Score Metrics" />
            </div>
          </section>

          {/* Section 5: Specifications Reference */}
          <section className="border-t pt-10 flex flex-col gap-6" style={{ borderColor: "rgba(42,71,86,0.1)" }}>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-gilroyBold text-[#2a4756]">System Specifications Reference</h2>
              <p className="text-sm text-slate-600">
                Direct reference specifications detailing theme layout hierarchies, focus ring rules, and transition speeds.
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

              {/* Grid visualizers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual 1 */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Elevation Architecture
                  </span>
                  <div className="relative h-44 w-full bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "16px 16px"
                    }} />
                    
                    <div className="relative w-full max-w-[200px] h-[120px] flex flex-col items-center justify-center" style={{ perspective: "400px" }}>
                      <motion.div 
                        className="absolute w-[140px] h-[35px] rounded border flex items-center px-2 shadow-2xl transition-all duration-300"
                        animate={{
                          translateZ: activeShowcaseTab === "surface" ? 40 : 30,
                          borderColor: activeShowcaseTab === "surface" ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.1)",
                          scale: activeShowcaseTab === "surface" ? 1.05 : 1,
                        }}
                        style={{
                          background: "#27272a",
                          transform: "rotateX(55deg) rotateZ(-30deg)",
                          boxShadow: activeShowcaseTab === "surface" ? "0 12px 28px rgba(16,185,129,0.25)" : "0 10px 20px rgba(0,0,0,0.5)"
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        <div className="h-1 w-12 bg-white/30 rounded" />
                      </motion.div>

                      <motion.div 
                        className="absolute w-[150px] h-[35px] rounded border flex items-center px-2 transition-all duration-300"
                        animate={{
                          translateZ: activeShowcaseTab === "surface" ? 15 : 10,
                          borderColor: activeShowcaseTab === "surface" ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.05)",
                          scale: activeShowcaseTab === "surface" ? 1.02 : 1,
                        }}
                        style={{
                          background: "#18181b",
                          transform: "rotateX(55deg) rotateZ(-30deg)",
                        }}
                      >
                        <div className="h-1 w-16 bg-white/20 rounded" />
                      </motion.div>

                      <motion.div 
                        className="absolute w-[160px] h-[35px] rounded border flex items-center px-2 transition-all duration-300"
                        animate={{
                          translateZ: activeShowcaseTab === "surface" ? -5 : -10,
                          borderColor: activeShowcaseTab === "surface" ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.05)",
                        }}
                        style={{
                          background: "#09090b",
                          transform: "rotateX(55deg) rotateZ(-30deg)",
                        }}
                      >
                        <div className="h-1 w-20 bg-white/10 rounded" />
                      </motion.div>
                    </div>
                    
                    <div className="absolute bottom-2 left-2 flex flex-col gap-0.5 text-[8px] transition-colors duration-200">
                      <span style={{ color: activeShowcaseTab === "surface" ? "#10b981" : "rgba(255,255,255,0.4)", fontWeight: activeShowcaseTab === "surface" ? "bold" : "normal" }}>▲ Overlay Card (Active Info)</span>
                      <span style={{ color: activeShowcaseTab === "surface" ? "rgba(16,185,129,0.8)" : "rgba(255,255,255,0.4)" }}>■ Muted Panel (Secondary Container)</span>
                      <span style={{ color: activeShowcaseTab === "surface" ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.4)" }}>▼ Base Canvas (Obsidian Frame)</span>
                    </div>
                  </div>
                </div>

                {/* Visual 2 */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-gilroyBold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Semantic Components
                  </span>
                  <motion.div 
                    className="flex flex-col gap-2 p-3 bg-black/40 rounded-xl border h-44 justify-center transition-all duration-300"
                    animate={{
                      borderColor: (activeShowcaseTab === "accent" || activeShowcaseTab === "typography") ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.05)"
                    }}
                  >
                    <motion.div 
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border transition-all duration-300"
                      animate={{
                        borderColor: activeShowcaseTab === "accent" ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.05)",
                        scale: activeShowcaseTab === "accent" ? 1.03 : 1
                      }}
                    >
                      <span className="text-[10px] transition-colors" style={{ color: activeShowcaseTab === "typography" ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: activeShowcaseTab === "typography" ? "bold" : "normal" }}>Relevance Match</span>
                      <motion.div 
                        className="px-2 py-0.5 rounded-full text-[9px] font-gilroyBold" 
                        style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
                        animate={activeShowcaseTab === "accent" ? { scale: [1, 1.08, 1] } : {}}
                        transition={activeShowcaseTab === "accent" ? { repeat: Infinity, duration: 1.5 } : {}}
                      >
                        98% Match
                      </motion.div>
                    </motion.div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] transition-colors" style={{ color: activeShowcaseTab === "typography" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)", textTransform: activeShowcaseTab === "typography" ? "uppercase" : "none", letterSpacing: activeShowcaseTab === "typography" ? "0.05em" : "normal" }}>Work Arrangement</span>
                      <div className="px-2 py-0.5 rounded-full text-[9px] font-gilroyBold border border-white/10 text-white/80 font-mono">
                        Hybrid · SF
                      </div>
                    </div>

                    <motion.div 
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border transition-all duration-300 cursor-pointer" 
                      animate={{
                        borderColor: (activeShowcaseTab === "transitions" || activeShowcaseTab === "accent") ? "#10b981" : "rgba(255,255,255,0.05)",
                        boxShadow: (activeShowcaseTab === "transitions" || activeShowcaseTab === "accent") ? "0 0 10px rgba(16,185,129,0.3)" : "none",
                        x: activeShowcaseTab === "transitions" ? [0, -4, 4, -4, 0] : 0
                      }}
                      transition={activeShowcaseTab === "transitions" ? { repeat: Infinity, repeatDelay: 1.5, duration: 0.5 } : {}}
                    >
                      <span className="text-[10px] text-white/95">Interactive State</span>
                      <span className="text-[8px] text-[#10b981] font-gilroyBold uppercase tracking-widest">Active Glow</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Selector */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-5 mt-2">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "surface", label: "Surface Architecture" },
                    { id: "accent", label: "Signature Accent" },
                    { id: "typography", label: "Typography Hierarchy" },
                    { id: "transitions", label: "Transition Mechanics" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveShowcaseTab(tab.id as any)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-gilroyBold cursor-pointer transition-all duration-200"
                      style={{
                        background: activeShowcaseTab === tab.id ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.02)",
                        color: activeShowcaseTab === tab.id ? "#10b981" : "rgba(255, 255, 255, 0.5)",
                        border: activeShowcaseTab === tab.id ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)"
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
                      {activeShowcaseTab === "surface" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">Conceptual Surface Architecture</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            Scout operates on the <strong className="text-[#10b981]">Obsidian Mint</strong> design system. Rather than relying on heavy boundaries, it separates modules using a gradual HSL-based surface ramp stacked in a strict conceptual sequence:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Base Frame:</strong> A deep Obsidian tone that provides a dark, non-reflective canvas to reduce eye strain and ground the page.</li>
                            <li><strong className="text-white/85">Glassy Overlay:</strong> A translucent layer serving as a container for secondary search tools and filters to create visual depth.</li>
                            <li><strong className="text-white/85">Muted Panels & Overlay Cards:</strong> Elevated container surfaces hosting individual listings to make cards feel raised.</li>
                            <li><strong className="text-white/85">Micro-Borders:</strong> Hairline dividers isolating active/hover states without introducing layout clutter.</li>
                          </ul>
                        </>
                      )}
                      {activeShowcaseTab === "accent" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">High-Impact Signature Accent</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            By keeping the canvas monochromatic and reserving color strictly for key checkpoints, searchers can scan listings with rapid throughput:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Emerald Mint:</strong> Highlight accent reserved exclusively for high-relevance matches, active status anchors, and primary action CTAs.</li>
                            <li><strong className="text-white/85">Guiding Focus:</strong> Keeps visual weight centered on matches, allowing searchers to evaluate alignments in a fraction of a second.</li>
                          </ul>
                        </>
                      )}
                      {activeShowcaseTab === "typography" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">Typographic Hierarchy</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            Balances information-rich job data with premium, elegant editorial spacing:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Primary Headers:</strong> Bold, geometric sans-serif typefaces set in large sizes to establish immediate context.</li>
                            <li><strong className="text-white/85">Semantic Labels:</strong> Small, wide-spaced, uppercase characters for metadata categories (e.g. ROLE, TIMELINE) to separate them from content.</li>
                            <li><strong className="text-white/85">Body Copy:</strong> High-legibility sans-serif fonts with generous line heights to make job summaries readable at a glance.</li>
                          </ul>
                        </>
                      )}
                      {activeShowcaseTab === "transitions" && (
                        <>
                          <h4 className="text-sm font-gilroyBold text-white">Transition Mechanics</h4>
                          <p className="text-xs font-satoshi text-white/70 leading-relaxed">
                            Interactions utilize physics-inspired animations to make navigation feel tactile and natural:
                          </p>
                          <ul className="text-xs font-satoshi text-white/60 flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="text-white/85">Perspective Crossfade:</strong> Transitions between tab perspectives use a soft fade-and-slide motion to prevent jarring jumps.</li>
                            <li><strong className="text-white/85">Spring-Action Anchors:</strong> Action items use low-mass spring equations, making hover and active states feel bouncy and organic.</li>
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
