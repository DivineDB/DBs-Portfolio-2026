"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight,
  ExternalLink, 
  User, 
  Target, 
  Zap, 
  ShieldAlert, 
  Check, 
  Sparkles,
  BarChart3,
  Clock,
  Briefcase,
  Search,
  ShoppingCart,
  CheckCircle2,
  Database,
  Smartphone,
  Layers,
  CreditCard,
  Banknote,
  Printer
} from "lucide-react";
import PageFooter from "@/components/PageFooter";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";

// Framer motion variants for clean scroll-reveal animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function POSCaseStudy() {
  const [activeBranch, setActiveBranch] = useState<"cash" | "digital" | null>(null);

  // Metadata block configuration
  const projectMeta = [
    { label: "Role", value: "Lead UI/UX Designer & Frontend Developer" },
    { label: "Timeline", value: "Apr 2026 — May 2026 (4 Weeks)" },
    { label: "Core Tools", value: "Figma, React, Tailwind CSS, Framer Motion" },
    { label: "Platform", value: "Desktop & Tablet Web-App (Touch-First)" }
  ];

  return (
    <main className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 antialiased" style={{ background: "#f8edd1" }}>
      
      {/* ── STICKY NAVIGATION HEADER ── */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-300" style={{ background: "rgba(248, 237, 209, 0.85)", borderColor: "rgba(42, 71, 86, 0.08)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Selected Work
          </Link>
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Case Study Draft
          </div>
        </div>
      </nav>

      {/* ── SECTION 1: HERO & PROJECT OVERVIEW (bg-white) ── */}
      <section className="w-full bg-transparent">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          {/* Header Identity */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                Case Study
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                FinTech
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
                Touch-First
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight max-w-4xl"
            >
              POS Panel: A Touch-First Retail Checkout Console
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl"
            >
              A clean, modern, and high-throughput point of sale panel template designed to bridge cashier efficiency with zero-latency visual validation.
            </motion.p>
          </motion.div>

          {/* Connective Line */}
          <div className="w-full h-px bg-slate-100 my-16" />

          {/* 3-Column Overview Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Column 1: The Problem */}
            <motion.div variants={fadeInUp} className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                  <ShieldAlert size={20} />
                </div>
                <h3 className="text-lg font-bold">The Problem</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Traditional cash registers suffer from complex menu hierarchies, layout shifts, and visual clutter. Clerks working long, high-stress shifts frequently experience eye strain and tap-friction, resulting in slower transaction rates and cashier errors.
              </p>
            </motion.div>

            {/* Column 2: The Solution */}
            <motion.div variants={fadeInUp} className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-bold">The Solution</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                A locked, asymmetric layout that prioritizes spatial consistency over animation speed. Combining color-coded pastels for instant grid landmarking, touch targets sized explicitly for manual speed, and offline calculations to build permanent cashier muscle memory.
              </p>
            </motion.div>

            {/* Column 3: Timeline / Metadata */}
            <motion.div variants={fadeInUp} className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-lg font-bold">Project Details</h3>
              </div>
              
              <div className="flex flex-col gap-3.5 mt-1 border-t border-slate-100 pt-3">
                {projectMeta.map((meta, i) => (
                  <div key={i} className="flex justify-between items-start text-xs border-b border-slate-50 pb-2">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider">{meta.label}</span>
                    <span className="font-medium text-slate-700 text-right max-w-[200px]">{meta.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: USER RESEARCH & INSIGHTS (bg-gray-50) ── */}
      <section className="w-full bg-white/35 backdrop-blur-sm border-y border-[#2a4756]/8">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Quantitative Data</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">User Research & Insights</h2>
            </div>
            
            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 max-w-md">
              {["Target Audience Traits:", "Ages 18-45", "Retail Store Clerks", "High-stress Environments", "Multi-Hour Shifts"].map((trait, idx) => (
                <span 
                  key={idx} 
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    idx === 0 
                      ? "bg-slate-200/50 text-slate-600 border-transparent font-semibold"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* CSS-Only Data Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Bar Chart Visualization (Left) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex items-center gap-2 text-slate-900">
                  <BarChart3 size={18} className="text-blue-600" />
                  <h4 className="font-bold text-base">Key Cashier Friction Points</h4>
                </div>
                <p className="text-xs text-slate-400">Percentage of surveyed cashiers identifying workflow bottlenecks</p>
              </div>

              {/* Dynamic Mock Bar Chart Rows */}
              <div className="flex flex-col gap-5">
                {[
                  { label: "System latency in inventory search", pct: 85, color: "bg-blue-600" },
                  { label: "Manual validation & checkout changes", pct: 72, color: "bg-blue-500" },
                  { label: "Visual exhaustion from screen glare", pct: 64, color: "bg-slate-400" },
                  { label: "Accidental double-taps on grid buttons", pct: 48, color: "bg-slate-300" }
                ].map((row, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 group">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700">{row.label}</span>
                      <span className="text-slate-900">{row.pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                        className={`h-full ${row.color} rounded-full transition-all`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Circular Chart & Metric Display (Right) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-5 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between items-center text-center"
            >
              <div className="flex flex-col gap-1 mb-4 w-full text-left">
                <div className="flex items-center gap-2 text-slate-900">
                  <Clock size={18} className="text-blue-600" />
                  <h4 className="font-bold text-base">Efficiency Gains</h4>
                </div>
                <p className="text-xs text-slate-400">Post-implementation benchmark analysis</p>
              </div>

              {/* Radial Chart Visualizer */}
              <div className="relative w-40 h-40 flex items-center justify-center my-4">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background Ring */}
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="stroke-slate-100 fill-none"
                    strokeWidth="8"
                  />
                  {/* Accent Progress Ring */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="stroke-blue-600 fill-none"
                    strokeWidth="8"
                    strokeDasharray="427"
                    initial={{ strokeDashoffset: 427 }}
                    whileInView={{ strokeDashoffset: 427 - (427 * 85) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center Content */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-900">85%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Success</span>
                </div>
              </div>

              {/* Key Metrics Columns */}
              <div className="grid grid-cols-2 gap-4 w-full mt-2 pt-4 border-t border-slate-100">
                <div className="flex flex-col text-left">
                  <span className="text-2xl font-extrabold text-blue-600">+140%</span>
                  <span className="text-[10px] text-slate-500 font-medium leading-tight mt-1">Clerk processing speed multiplier.</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-2xl font-extrabold text-slate-800">1.8s</span>
                  <span className="text-[10px] text-slate-500 font-medium leading-tight mt-1">Average screen transaction sync rate.</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: TARGET PERSONAS (bg-white) ── */}
      <section className="w-full bg-transparent">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          
          <div className="flex flex-col gap-2 mb-16 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-blue-600 font-bold font-mono">User Archetypes</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Target Personas</h2>
            <p className="text-sm text-slate-500">Developing solutions tailored to the core motivations, backgrounds, and specific workflow limits of our store staff.</p>
          </div>

          {/* Persona Card Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Lin",
                archetype: "The Speed Runner",
                quote: "“I need to process customers as fast as possible. Any modal popup slows me down.”",
                goals: [
                  "Quick item updates with minimal taps",
                  "Audio confirmations for tap actions",
                  "Reliable offline billing generation"
                ],
                frustrations: [
                  "Accordion menus that hide visual grid",
                  "Search fields with typing delays",
                  "Internet lag freezing the cash drawer"
                ],
                avatar: "bg-blue-50 text-blue-600 font-extrabold text-lg",
                initial: "SL"
              },
              {
                name: "Marcus Cole",
                archetype: "The Store Owner",
                quote: "“I need clean control over stock levels and fast analytics updates at shift shifts.”",
                goals: [
                  "Direct visibility of low-inventory items",
                  "Instant manager override codes",
                  "Synced catalog records on registers"
                ],
                frustrations: [
                  "Dashboards that require complex training",
                  "Price tags not matching server files",
                  "Data dropouts missing evening reports"
                ],
                avatar: "bg-indigo-50 text-indigo-600 font-extrabold text-lg",
                initial: "MC"
              },
              {
                name: "Diana Cruz",
                archetype: "The Part-time Cashier",
                quote: "“I only work occasional shifts. If the register interface is complex, I make errors.”",
                goals: [
                  "Color landmarks to grouping categories",
                  "Self-explanatory cash change layouts",
                  "Accident undo buttons on grid"
                ],
                frustrations: [
                  "Subtle, small text difficult to check",
                  "No validation feedback for transactions",
                  "Cryptic database offline system flags"
                ],
                avatar: "bg-emerald-50 text-emerald-600 font-extrabold text-lg",
                initial: "DC"
              }
            ].map((persona, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex flex-col bg-white border border-slate-150 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Decorative border highlight */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-blue-600 transition-colors" />

                {/* Persona Profile */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner shrink-0 ${persona.avatar}`}>
                    {persona.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{persona.name}</h4>
                    <span className="text-xs font-semibold text-blue-600">{persona.archetype}</span>
                  </div>
                </div>

                <p className="text-xs italic text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {persona.quote}
                </p>

                {/* Goals */}
                <div className="flex flex-col gap-2 mb-4 flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Goals</span>
                  <ul className="flex flex-col gap-2">
                    {persona.goals.map((goal, i) => (
                      <li key={i} className="text-xs text-slate-650 flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Frustrations */}
                <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Frustrations</span>
                  <ul className="flex flex-col gap-2">
                    {persona.frustrations.map((frust, i) => (
                      <li key={i} className="text-xs text-slate-650 flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[9px] font-black leading-none">!</span>
                        </div>
                        <span>{frust}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: USER FLOW & ARCHITECTURE (bg-gray-50) ── */}
      <section className="w-full bg-white/35 backdrop-blur-sm border-y border-[#2a4756]/8">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-bold font-mono">Structural Journey</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">User Journey & Flow</h2>
              <p className="text-sm text-slate-500 max-w-xl">Interactive flow rendering the terminal transaction lifecycle. Hover or click choices below to simulate routing branching.</p>
            </div>
            
            {/* Interactive Toggle for Branching */}
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shrink-0 select-none shadow-sm">
              <button 
                onClick={() => setActiveBranch(null)} 
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBranch === null ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Show All
              </button>
              <button 
                onClick={() => setActiveBranch("cash")} 
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBranch === "cash" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-blue-600"
                }`}
              >
                Cash Branch
              </button>
              <button 
                onClick={() => setActiveBranch("digital")} 
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBranch === "digital" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-blue-600"
                }`}
              >
                Digital Branch
              </button>
            </div>
          </div>

          {/* Flowchart Layout Container */}
          <div className="relative w-full max-w-3xl mx-auto">
            {/* Vertical Flow Track Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2 z-0" />

            {/* FLOW STEPS */}
            <div className="flex flex-col gap-12 relative z-10">

              {/* Node 1: Start (Centered) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex flex-col md:items-center relative"
              >
                {/* Step Circle Indicator */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white border-4 border-white flex items-center justify-center text-xs font-bold shadow-md z-20">
                  1
                </div>
                <div className="ml-16 md:ml-0 md:w-80 md:text-center mt-8 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Initialization</span>
                  <h4 className="font-bold text-slate-900 text-sm">App Launch & Database Sync</h4>
                  <p className="text-xs text-slate-500 mt-1">Queries index database locally in the browser cache, locking item coordinates for static landmarking.</p>
                </div>
              </motion.div>

              {/* Node 2: Catalog Selection (Centered) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex flex-col md:items-center relative"
              >
                {/* Step Circle Indicator */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white border-4 border-white flex items-center justify-center text-xs font-bold shadow-md z-20">
                  2
                </div>
                <div className="ml-16 md:ml-0 md:w-80 md:text-center mt-8 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Cart Assembly</span>
                  <h4 className="font-bold text-slate-900 text-sm">Catalog Browsing & Search</h4>
                  <p className="text-xs text-slate-500 mt-1">Cashier triggers items directly from grids or barcode scanner. System updates total prices instantly via local Zustand states.</p>
                </div>
              </motion.div>

              {/* Node 3: Branching Node Header (Centered) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex flex-col md:items-center relative"
              >
                {/* Step Circle Indicator */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white border-4 border-white flex items-center justify-center text-xs font-bold shadow-md z-20">
                  3
                </div>
                <div className="ml-16 md:ml-0 md:w-80 md:text-center mt-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-blue-50/50">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Decision Point</span>
                  <h4 className="font-bold text-slate-900 text-sm">Select Payment Method</h4>
                  <p className="text-xs text-slate-500 mt-1">Cashier selects payment type. Workflow forks dynamically based on checkout conditions.</p>
                </div>
              </motion.div>

              {/* BRANCH CONTAINER (Split) */}
              <div className="relative w-full">
                
                {/* Visual Branch Line Connector Lines (For Desktop grid paths) */}
                <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-blue-100 z-0" />
                <div className="hidden md:block absolute top-0 left-1/4 bottom-1/2 w-0.5 bg-blue-100 z-0" />
                <div className="hidden md:block absolute top-0 right-1/4 bottom-1/2 w-0.5 bg-blue-100 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pl-16 md:pl-0 pt-4">
                  
                  {/* Left Column: Cash Payment Path */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className={`flex flex-col gap-4 relative transition-all duration-300 ${
                      activeBranch !== null && activeBranch !== "cash" ? "opacity-35 blur-[1px]" : "opacity-100"
                    }`}
                  >
                    {/* Tiny connector node */}
                    <div className="hidden md:block absolute top-1/2 right-[-8px] w-4 h-4 rounded-full bg-blue-400 border-4 border-white shadow-sm z-10" />
                    
                    <div 
                      className={`p-5 rounded-2xl border bg-white transition-all shadow-sm ${
                        activeBranch === "cash" ? "border-blue-500 shadow-md ring-2 ring-blue-50" : "border-slate-100"
                      }`}
                      onClick={() => setActiveBranch("cash")}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md">
                          <Banknote size={15} />
                        </div>
                        <h5 className="font-bold text-slate-950 text-xs">Path A: Cash Payment</h5>
                      </div>
                      <p className="text-xs text-slate-500">Cashier inputs bill amounts, system triggers offline change-return calculations, and opens mechanical drawer.</p>
                    </div>
                  </motion.div>

                  {/* Right Column: Digital UPI/Card Path */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className={`flex flex-col gap-4 relative transition-all duration-300 ${
                      activeBranch !== null && activeBranch !== "digital" ? "opacity-35 blur-[1px]" : "opacity-100"
                    }`}
                  >
                    {/* Tiny connector node */}
                    <div className="hidden md:block absolute top-1/2 left-[-8px] w-4 h-4 rounded-full bg-blue-400 border-4 border-white shadow-sm z-10" />

                    <div 
                      className={`p-5 rounded-2xl border bg-white transition-all shadow-sm ${
                        activeBranch === "digital" ? "border-blue-500 shadow-md ring-2 ring-blue-50" : "border-slate-100"
                      }`}
                      onClick={() => setActiveBranch("digital")}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                          <CreditCard size={15} />
                        </div>
                        <h5 className="font-bold text-slate-950 text-xs">Path B: Digital Checkout</h5>
                      </div>
                      <p className="text-xs text-slate-500">Renders digital QR or streams payment details to card terminals. Triggers async listeners waiting for transaction updates.</p>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* Node 4: Receipt (Centered) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex flex-col md:items-center relative mt-4"
              >
                {/* Step Circle Indicator */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white border-4 border-white flex items-center justify-center text-xs font-bold shadow-md z-20">
                  4
                </div>
                <div className="ml-16 md:ml-0 md:w-80 md:text-center mt-8 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Receipt Output</span>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center justify-start md:justify-center gap-1.5">
                    <Printer size={14} className="text-slate-400" /> Local Receipt Stream
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Generates printable vector receipt files directly in browser storage, printing locally in under 150ms.</p>
                </div>
              </motion.div>

              {/* Node 5: Sync End (Centered) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex flex-col md:items-center relative"
              >
                {/* Step Circle Indicator */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white border-4 border-white flex items-center justify-center text-xs font-bold shadow-md z-20">
                  ✓
                </div>
                <div className="ml-16 md:ml-0 md:w-80 md:text-center mt-8 bg-white p-5 rounded-2xl border border-emerald-150 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">Completed</span>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center justify-start md:justify-center gap-1.5">
                    <Database size={14} className="text-emerald-500" /> Database Edge Sync
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Pushes final transaction models to database edge servers asynchronously, resetting current cart variables to idle.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: HIGH-FIDELITY MOCKUPS (bg-white) ── */}
      <section className="w-full bg-transparent">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          
          <div className="flex flex-col gap-2 mb-16 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-blue-600 font-bold font-mono">Mockups</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Final Design Presentation</h2>
            <p className="text-sm text-slate-500">Coded mockup wireframes mapping the device scale constraints. In your project, replace these wireframes with raw design export png files.</p>
          </div>

          {/* 3-Column Mobile Screen Mockups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            {/* Phone Mockup 1: Dashboard */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-center gap-4"
            >
              {/* Device Container */}
              <div className="relative w-[280px] aspect-[9/18.5] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[6px] border-slate-950 overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform duration-500">
                {/* Notch / Dynamic Island */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-slate-950 rounded-full z-30 flex items-center justify-between px-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
                  <span className="w-3.5 h-1 bg-slate-900 rounded-full"></span>
                </div>

                {/* Status Bar */}
                <div className="absolute top-8 left-6 right-6 flex justify-between text-[9px] font-bold text-slate-400 z-20 select-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span className="w-4 h-2 bg-slate-400 rounded-sm"></span>
                  </div>
                </div>

                {/* Screen Content Area (HTML/CSS Wireframe UI) */}
                <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col pt-12 pb-4 px-4.5 select-none border border-slate-200">
                  
                  {/* Fake UI Header */}
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-extrabold text-slate-800">Terminal #04</span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <User size={10} className="text-slate-500" />
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="w-full bg-slate-50 border border-slate-200/60 rounded-lg p-1.5 flex items-center gap-1.5 mb-3">
                    <Search size={10} className="text-slate-400" />
                    <span className="text-[9px] text-slate-400">Search items...</span>
                  </div>

                  {/* Categories */}
                  <div className="flex gap-1 mb-3.5 overflow-hidden">
                    <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[8px] font-bold">All</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-bold">Coffee</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-bold">Pastries</span>
                  </div>

                  {/* Wireframe Grid */}
                  <div className="grid grid-cols-2 gap-2 flex-grow overflow-hidden max-h-[220px]">
                    {[
                      { name: "Matcha Latte", price: "$4.50", bg: "bg-emerald-50 text-emerald-700" },
                      { name: "Iced Cappuccino", price: "$4.80", bg: "bg-blue-50 text-blue-700" },
                      { name: "Butter Croissant", price: "$3.20", bg: "bg-amber-50 text-amber-700" },
                      { name: "Choco Muffin", price: "$3.50", bg: "bg-amber-50 text-amber-700" }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex flex-col justify-between">
                        <div className={`w-full aspect-video rounded ${item.bg} flex items-center justify-center text-[9px] font-bold`}>
                          UI Shot
                        </div>
                        <span className="text-[9px] font-bold text-slate-800 truncate mt-1.5 block">{item.name}</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[9px] font-bold text-blue-600">{item.price}</span>
                          <span className="w-4 h-4 bg-slate-200 text-slate-700 text-[10px] font-black rounded flex items-center justify-center">+</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Bar Drawer */}
                  <div className="mt-auto bg-blue-600 text-white p-2.5 rounded-xl flex justify-between items-center text-[10px] font-bold shadow-md shadow-blue-100">
                    <span className="flex items-center gap-1"><ShoppingCart size={10} /> 3 Items</span>
                    <span className="flex items-center gap-1">Pay $12.50 <ArrowRight size={10} /></span>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="w-20 h-1 bg-slate-200 rounded-full mx-auto mt-2"></div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700">1. Dashboard Catalog</span>
            </motion.div>

            {/* Phone Mockup 2: Checkout */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-center gap-4"
            >
              {/* Device Container */}
              <div className="relative w-[280px] aspect-[9/18.5] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[6px] border-slate-950 overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform duration-500">
                {/* Notch */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-slate-950 rounded-full z-30 flex items-center justify-between px-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
                  <span className="w-3.5 h-1 bg-slate-900 rounded-full"></span>
                </div>

                {/* Status Bar */}
                <div className="absolute top-8 left-6 right-6 flex justify-between text-[9px] font-bold text-slate-400 z-20 select-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span className="w-4 h-2 bg-slate-400 rounded-sm"></span>
                  </div>
                </div>

                {/* Screen Content Area */}
                <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col pt-12 pb-4 px-4.5 select-none border border-slate-200">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-extrabold text-slate-800">Checkout Bill</span>
                    <span className="text-[8px] font-semibold text-blue-600">Edit items</span>
                  </div>

                  {/* Cart Items List */}
                  <div className="flex flex-col gap-2 flex-grow overflow-hidden max-h-[160px]">
                    {[
                      { name: "Matcha Latte", qty: 2, price: "$9.00" },
                      { name: "Butter Croissant", qty: 1, price: "$3.20" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] border-b border-slate-50 pb-2">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{item.name}</span>
                          <span className="text-[8px] text-slate-400">Qty: {item.qty}</span>
                        </div>
                        <span className="font-extrabold text-slate-800">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Computational Details */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1.5 mb-3.5 mt-auto">
                    <div className="flex justify-between text-[9px] text-slate-500 font-semibold">
                      <span>Subtotal</span>
                      <span>$12.20</span>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500 font-semibold">
                      <span>Tax GST (5%)</span>
                      <span>$0.61</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-900 font-extrabold border-t border-slate-200/60 pt-1.5 mt-0.5">
                      <span>Total Amount</span>
                      <span>$12.81</span>
                    </div>
                  </div>

                  {/* Pay Selector */}
                  <div className="flex gap-2 mb-2.5">
                    <div className="w-1/2 p-2 bg-slate-900 text-white rounded-lg text-center flex flex-col items-center justify-center font-bold">
                      <Banknote size={12} className="mb-0.5" />
                      <span className="text-[8px]">Pay Cash</span>
                    </div>
                    <div className="w-1/2 p-2 bg-blue-600 text-white rounded-lg text-center flex flex-col items-center justify-center font-bold">
                      <CreditCard size={12} className="mb-0.5" />
                      <span className="text-[8px]">Card Terminal</span>
                    </div>
                  </div>

                  {/* Quick Calculator keypad */}
                  <div className="grid grid-cols-3 gap-1 mb-1 border-t border-slate-150 pt-2 text-center text-[9px] font-bold text-slate-600">
                    {["7", "8", "9", "4", "5", "6"].map((num) => (
                      <span key={num} className="py-1 bg-slate-50 border border-slate-100 rounded">{num}</span>
                    ))}
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="w-20 h-1 bg-slate-200 rounded-full mx-auto mt-2"></div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700">2. Active Checkout Cart</span>
            </motion.div>

            {/* Phone Mockup 3: Success */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-center gap-4"
            >
              {/* Device Container */}
              <div className="relative w-[280px] aspect-[9/18.5] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[6px] border-slate-950 overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform duration-500">
                {/* Notch */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-slate-950 rounded-full z-30 flex items-center justify-between px-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
                  <span className="w-3.5 h-1 bg-slate-900 rounded-full"></span>
                </div>

                {/* Status Bar */}
                <div className="absolute top-8 left-6 right-6 flex justify-between text-[9px] font-bold text-slate-400 z-20 select-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span className="w-4 h-2 bg-slate-400 rounded-sm"></span>
                  </div>
                </div>

                {/* Screen Content Area */}
                <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col pt-12 pb-4 px-4.5 select-none border border-slate-200">
                  
                  {/* Animated Success Circle Icon */}
                  <div className="flex flex-col items-center justify-center my-auto">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 shadow-sm shadow-emerald-50">
                      <CheckCircle2 size={24} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 leading-tight">Order Completed</span>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase font-bold font-mono">Invoice ID: #88390</span>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-2 mb-3.5">
                    <div className="flex justify-between items-center text-[9px] border-b border-slate-150 pb-1.5">
                      <span className="text-slate-500 font-semibold">Payment Method</span>
                      <span className="text-slate-800 font-bold">Digital Card</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] border-b border-slate-150 pb-1.5">
                      <span className="text-slate-500 font-semibold">Auth Code</span>
                      <span className="text-slate-800 font-mono text-[8px]">AX-3392</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-500 font-semibold">Terminal Sync</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> Online</span>
                    </div>
                  </div>

                  {/* Thermal Receipt Simulator */}
                  <div className="border-t border-dashed border-slate-300 pt-3 flex flex-col gap-1 mb-4 select-none">
                    <span className="text-[8px] font-bold text-center text-slate-400 uppercase tracking-widest block">Local receipt generated</span>
                    <div className="w-full bg-slate-50 border border-slate-150 border-t-0 p-2 rounded-b text-center text-[7px] font-mono text-slate-500">
                      === SSG STORE POS ===<br />
                      2x MATCHA LATTE ($9.00)<br />
                      1x CROISSANT ($3.20)<br />
                      =====================<br />
                      TOTAL PAID: $12.81
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-xl text-center text-[9px] font-bold cursor-pointer transition-colors shadow-sm">
                    New Transaction
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="w-20 h-1 bg-slate-200 rounded-full mx-auto mt-2"></div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700">3. Thermal Receipt Success</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PROJECT FOOTER & NAVIGATION ── */}
      <section className="w-full bg-white/35 backdrop-blur-sm border-t border-[#2a4756]/10">
        <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col gap-16">
          
          {/* Greeting Column */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 border-b border-gray-200 pb-12">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Thanks for reading!</h3>
              <p className="text-sm text-slate-600">Let&apos;s build something beautiful and functional together.</p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 text-slate-550">
              <a href="https://github.com/DivineDB" target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform hover:text-blue-600 p-2 bg-white rounded-full border border-slate-200 shadow-sm" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/divyansh-baghel/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform hover:text-blue-600 p-2 bg-white rounded-full border border-slate-200 shadow-sm" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="https://www.instagram.com/dbdoesstuff/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform hover:text-blue-600 p-2 bg-white rounded-full border border-slate-200 shadow-sm" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="mailto:divyanshbaghel456@gmail.com" className="hover:scale-110 active:scale-95 transition-transform hover:text-blue-600 p-2 bg-white rounded-full border border-slate-200 shadow-sm" aria-label="Email">
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>

          {/* Project Cross Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center sm:text-left">Check out other projects</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Scout project link */}
              <Link 
                href="/work/scout" 
                className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all hover:scale-[1.01] duration-300"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase font-mono">AI-Native Pipeline</p>
                  <h5 className="font-bold text-lg text-slate-900 leading-tight">Scout</h5>
                  <p className="text-xs text-slate-650 leading-relaxed">An automated intelligence crawler mapping raw data sets into context-aware verticals and localized nodes.</p>
                </div>
                <span className="font-semibold text-xs text-blue-600 inline-flex items-center gap-1 mt-2">
                  Read Case Study <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>

              {/* Main portfolio link */}
              <Link 
                href="/work" 
                className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all hover:scale-[1.01] duration-300"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold tracking-wider text-slate-450 uppercase font-mono">Portfolio Index</p>
                  <h5 className="font-bold text-lg text-slate-900 leading-tight">All Case Studies</h5>
                  <p className="text-xs text-slate-650 leading-relaxed">Browse the full gallery of user experience research prototypes, dashboard engines, and design tools.</p>
                </div>
                <span className="font-semibold text-xs text-blue-600 inline-flex items-center gap-1 mt-2">
                  View Selected Work <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Global site footer */}
      <PageFooter />
    </main>
  );
}
