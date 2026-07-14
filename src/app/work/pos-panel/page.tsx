"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  Sparkles,
  Database,
  Terminal,
  Mail,
  Info,
  Layers,
  Activity,
  UserCheck,
  CheckCircle2,
  FileText,
  Sliders,
  DollarSign,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import PageFooter from "@/components/PageFooter";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "overview", label: "Overview" },
  { id: "story", label: "Empathy" },
  { id: "observations", label: "Observations" },
  { id: "painpoints", label: "Friction" },
  { id: "synthesis", label: "Synthesis" },
  { id: "scope", label: "Scope" },
  { id: "personas", label: "Personas" },
  { id: "strategy", label: "Strategy" },
  { id: "5ws", label: "5 Ws" },
  { id: "walkthrough", label: "Interfaces" },
  { id: "architecture", label: "Resiliency" },
  { id: "roadmap", label: "Future" },
];

export default function POSCaseStudy() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const [isHovered, setIsHovered] = useState(false);
  const lenis = useLenis();
  const isManualScrolling = useRef(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Ensure the page always starts at the top when navigated to
  const hasResetScroll = useRef(false);
  useEffect(() => {
    // Reset native scroll immediately
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (lenis && !hasResetScroll.current) {
      hasResetScroll.current = true;
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-75px 0px -40% 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    isManualScrolling.current = true;

    const el = document.getElementById(id);
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, {
          offset: -80,
          duration: 1.2,
          onComplete: () => {
            setTimeout(() => {
              isManualScrolling.current = false;
            }, 50);
          }
        });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        setTimeout(() => {
          isManualScrolling.current = false;
        }, 1000);
      }
    } else {
      isManualScrolling.current = false;
    }
  };

  return (
    <main className="min-h-screen bg-bg text-text_primary font-gilroyRegular antialiased pb-16">
      
      {/* ── STYLISH APPLE-AESTHETIC SCROLLBAR ── */}
      <div 
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            width: isHovered ? 146 : 8,
            height: isHovered ? 420 : 180,
            backgroundColor: isHovered ? "rgba(248, 237, 209, 0.85)" : "rgba(248, 237, 209, 0)",
            backdropFilter: isHovered ? "blur(20px)" : "blur(0px)",
            borderColor: isHovered ? "rgba(42, 71, 86, 0.12)" : "rgba(42, 71, 86, 0)",
            boxShadow: isHovered 
              ? "0 20px 25px -5px rgba(42, 71, 86, 0.1), 0 8px 10px -6px rgba(42, 71, 86, 0.05)" 
              : "0 0px 0px rgba(0,0,0,0)"
          }}
          transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
          className="rounded-2xl border border-transparent flex flex-col justify-center items-center relative overflow-hidden"
        >
          {/* Inactive Mode: Minimal Progress Bar */}
          <motion.div
            animate={{
              opacity: isHovered ? 0 : 1,
              pointerEvents: isHovered ? "none" : "auto",
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col justify-center items-center py-4"
          >
            <div className="w-[2px] h-[140px] bg-text_primary/15 rounded-full relative overflow-hidden">
              <motion.div
                style={{ scaleY: scrollYProgress, originY: 0 }}
                className="absolute top-0 left-0 w-full h-full bg-text_primary rounded-full"
              />
            </div>
          </motion.div>

          {/* Active Hover Mode: Table of Contents */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? "auto" : "none",
            }}
            transition={{ duration: 0.2, delay: isHovered ? 0.05 : 0 }}
            className="w-full h-full flex flex-col justify-between py-6 px-4 relative"
          >
            {/* Background vertical connector line behind dots */}
            <div className="absolute right-[22px] top-7 bottom-7 w-[1px] bg-text_primary/10 -z-10" />

            {SECTIONS.map((section, index) => (
              <div
                key={section.id}
                onClick={() => handleScrollTo(section.id)}
                className="group flex items-center justify-end gap-2.5 py-0.5 cursor-pointer w-full text-right"
              >
                <motion.span
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : 8,
                  }}
                  transition={{
                    opacity: { duration: 0.25, delay: isHovered ? index * 0.015 : 0, ease: "easeOut" },
                    x: { type: "spring", stiffness: 200, damping: 25, delay: isHovered ? index * 0.015 : 0 }
                  }}
                  className={`text-[9px] font-gilroyBold uppercase tracking-wider transition-colors duration-200 ${
                    activeSection === section.id
                      ? "text-text_primary font-bold"
                      : "text-text_primary/40 group-hover:text-text_primary/75"
                  }`}
                >
                  {section.label}
                </motion.span>
                
                <div className="relative flex items-center justify-center w-3 h-3 flex-shrink-0">
                  {/* Outer ring for active state */}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeDotRing"
                      className="absolute w-3.5 h-3.5 rounded-full border border-text_primary/40"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {/* Central Dot */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-text_primary scale-110"
                        : "bg-text_primary/25 group-hover:bg-text_primary/60"
                    }`}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      
      {/* ── NAVIGATION HEADER ── */}
      <nav className="sticky top-0 z-50 w-full bg-bg/85 backdrop-blur-md border-b border-text_primary/10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-gilroyBold transition-opacity hover:opacity-75"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Selected Work
          </Link>
          
          {/* Top navigation contact icons */}
          <div className="flex items-center gap-3">
            <a 
              href="mailto:divyanshbaghel456@gmail.com" 
              className="p-2 rounded-full hover:bg-text_primary/5 text-text_primary/80 hover:text-text_primary transition-colors"
              aria-label="Email"
              title="Email Divyansh Baghel"
            >
              <Mail size={18} strokeWidth={2} />
            </a>
            <a 
              href="https://www.linkedin.com/in/divyansh-baghel/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full hover:bg-text_primary/5 text-text_primary/80 hover:text-text_primary transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO HEADER SECTION ── */}
      <section id="hero" className="w-full min-h-[calc(100vh-76px)] relative overflow-hidden flex flex-col justify-center items-start py-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[300px] rounded-full bg-accent_highlight/25 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-5xl w-full mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6 md:gap-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-gilroyBold uppercase tracking-wider bg-accent_highlight text-text_primary border border-text_primary/10 shadow-sm">
                UX Case Study
              </span>
              <span className="w-1 h-1 rounded-full bg-text_primary/30" />
              <span className="text-[10px] font-gilroyBold uppercase tracking-wider text-text_primary/60">
                Retail Finance &amp; Ops
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-gilroyBold tracking-tight leading-[0.95] text-text_primary"
            >
              BreezePOS
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-2xl font-gilroyRegular leading-relaxed text-text_primary/80 max-w-3xl"
            >
              A touch-first retail register engine designed to streamline store checkouts under 12 seconds, protect transaction ledger integrity with JSONB snapshots, and guarantee offline resilience.
            </motion.p>

            {/* Action buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-2">
              <a 
                href="https://pos-panel.divyanshbaghel.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-gilroyBold bg-accent_highlight text-text_primary transition-transform hover:scale-[1.02] active:scale-95 shadow-md border border-text_primary/10"
              >
                <Sparkles size={16} className="text-text_primary" />
                <span>Launch Live System Demo</span>
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a 
                href="https://github.com/DivineDB/POS-System" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-gilroyBold bg-text_primary text-bg transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
              >
                <FaGithub size={16} />
                <span>Explore Codebase</span>
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

            {/* Case Study Metadata Grid */}
            <motion.div 
              variants={fadeInUp} 
              className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 border-t border-text_primary/10 pt-8 mt-4 max-w-4xl"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-text_primary/40 block font-gilroyBold mb-1">Role</span>
                <span className="text-sm font-gilroyBold text-text_primary/80">UX Design &amp; Full-Stack Eng.</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-text_primary/40 block font-gilroyBold mb-1">Target Device</span>
                <span className="text-sm font-gilroyBold text-text_primary/80">10&quot; Countertop Register</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-text_primary/40 block font-gilroyBold mb-1">Core Tech</span>
                <span className="text-sm font-gilroyBold text-text_primary/80">Next.js, Zustand, Supabase</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-text_primary/40 block font-gilroyBold mb-1">Performance</span>
                <span className="text-sm font-gilroyBold text-text_primary/80">&lt; 12s Checkout Flow</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0, 1, 0], y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-text_primary/40 select-none z-10"
          onClick={() => {
            const el = document.getElementById("overview");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-gilroyRegular text-[10px] uppercase tracking-[0.2em]">Scroll to start</span>
          <span className="text-xs">▼</span>
        </motion.div>
      </section>
      
      {/* ── CASE STUDY DATA ── */}
      <section className="w-full max-w-5xl mx-auto px-6 py-4">
        
        {/* ── 01. EXECUTIVE BRIEF ── */}
        <motion.div 
          id="overview"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">01. Executive Summary</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Project Overview</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          <p className="font-gilroyRegular text-base md:text-lg leading-relaxed text-text_primary/90 max-w-3xl">
            Design a fast, touchscreen-optimized Point of Sale (POS) tablet web application for a local household convenience store. The platform must streamline customer checkout under 12 seconds, manage real-time inventory balances, track store earnings statistics, and replace traditional handwritten logs.
          </p>
        </motion.div>

        {/* ── 02. THE HUMAN STORY ── */}
        <motion.div 
          id="story"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">02. Empathy & Context</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Introduction & Empathy</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="font-gilroyRegular text-base md:text-lg leading-relaxed text-text_primary/95 space-y-6 max-w-3xl">
            <p>
              This POS system started out of a real-world problem close to home. A close friend of mine, <strong>Krish Agrawal</strong>, runs a local retail convenience store selling daily household goods like plastic containers, microfiber sponges, brooms, and detergents. For years, his entire billing, inventory tracking, and customer account ledgers (<strong>hisaab</strong>) lived inside stacks of paper notebooks and handwritten diaries.
            </p>
            <p>
              It was an operational nightmare. Pages would frequently tear or get misplaced, entries were easily forgotten, and manually tallying up sales at the end of the month meant sitting with a calculator for hours. During peak evening rushes, writing physical bills by hand created long customer queues and visual chaos at the counter.
            </p>
            <p>
              I decided to design and build a tablet-native POS for his counter register. The mission was clear: scrap the paper diaries, prevent billing records from getting lost, and give him a touch interface that works instantly during checkout rushes.
            </p>
          </div>
        </motion.div>

        {/* ── 03. FIELD DISCOVERY ── */}
        <motion.div 
          id="observations"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">03. Field Observations</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Observations</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="space-y-12 max-w-3xl">
            <div className="relative pl-6 border-l-2 border-text_primary/30">
              <h4 className="font-gilroyBold text-xl md:text-2xl text-text_primary mb-2">Forming a retail order takes a lot of effort</h4>
              <p className="font-gilroyRegular text-base md:text-lg text-text_primary/85 leading-relaxed">
                I observed that manual register log writing requires cashiers to copy details twice (once in the checkout log, and once in outstanding debit notebooks). This redundant data-entry loop demands heavy coordination, slows down the check-out flow, and frequently introduces transcription mistakes.
              </p>
            </div>
            <div className="relative pl-6 border-l-2 border-text_primary/30">
              <h4 className="font-gilroyBold text-xl md:text-2xl text-text_primary mb-2">Multiple pricing configurations before billing</h4>
              <p className="font-gilroyRegular text-base md:text-lg text-text_primary/85 leading-relaxed">
                The shop owner creates different wholesale and retail calculations depending on item pack sizes. He constantly calculates price options in his head mid-transaction, delaying final billing until he feels comfortable with the final checkout total.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 04. PAIN POINTS ── */}
        <motion.div 
          id="painpoints"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">04. Friction &amp; Blockers</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Friction &amp; Blockers</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <div className="p-6 md:p-8 bg-red-500/[0.03] border border-red-500/10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="font-gilroyBold text-xl text-text_primary mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  Information Overload
                </h4>
                <p className="font-gilroyRegular text-base text-text_primary/85 leading-relaxed">
                  Friction occurs due to the availability of too many counter options and manual billing methods. Cluttered workspaces and notebook piles confuse cashiers, causing ordering errors and visual chaos at the counter during peak hours.
                </p>
              </div>
            </div>
            <div className="p-6 md:p-8 bg-red-500/[0.03] border border-red-500/10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="font-gilroyBold text-xl text-text_primary mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  Losing Track of Account Logs
                </h4>
                <p className="font-gilroyRegular text-base text-text_primary/85 leading-relaxed">
                  By documenting outstanding transactions across separate notebooks and loose credit sheets, the shop owner loses physical oversight. There is a high financial risk of losing customer debit summaries entirely.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 05. INFERENCE ── */}
        <motion.div 
          id="synthesis"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">05. Research Synthesis</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Research Synthesis</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="space-y-12 max-w-3xl">
            <div className="relative pl-6 border-l-2 border-text_primary/30">
              <h4 className="font-gilroyBold text-xl md:text-2xl text-text_primary mb-2">Adding items and checking out should be a breeze</h4>
              <p className="font-gilroyRegular text-base md:text-lg text-text_primary/85 leading-relaxed">
                To streamline customer lines under 12 seconds, cashiers must search and select store catalog purchases with minimal screen taps and zero nested menus.
              </p>
            </div>
            <div className="relative pl-6 border-l-2 border-text_primary/30">
              <h4 className="font-gilroyBold text-xl md:text-2xl text-text_primary mb-2">Data persistence is key</h4>
              <p className="font-gilroyRegular text-base md:text-lg text-text_primary/85 leading-relaxed">
                Traditional paper logs or spreadsheet entries fail to freeze pricing configurations. The system must record immutable item parameters at the exact moment of checkout to prevent subsequent catalog edits from altering history.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 06. PRODUCT BOUNDARIES ── */}
        <motion.div 
          id="scope"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">06. Project Scope</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Scope of Work</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="font-gilroyRegular text-base md:text-lg leading-relaxed text-text_primary/85 space-y-6 max-w-3xl">
            <p>
              Within the spectrum of digital utility services used at present for retail checkout, shop owners and cashiers require a highly collaborative, fast, and touchscreen-optimized platform that simplifies stock auditing and transaction management.
            </p>
            <p>
              The solution is a tablet-native web application designed specifically for counter registers, which operates instantly without database lag, buffers offline transactions during power drops, and integrates seamlessly into the daily workflows of store operators rather than forcing them to master complex systems.
            </p>
          </div>
        </motion.div>

        {/* ── 07. USER SEGMENTATION ── */}
        <motion.div 
          id="personas"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">07. Target Personas</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Research &amp; User Personas</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="font-gilroyRegular text-base md:text-lg text-text_primary/90 space-y-6 max-w-3xl mb-12">
            <p>
              By translating the Observations and Pain Points into operational parameters, I detailed the primary cashier requirements:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-gilroyBold text-text_primary/40 text-lg select-none">▪</span>
                <span><strong>Time and Place:</strong> Checkout happens in a fast-paced retail zone. Cashiers do not have time to navigate nested settings menus or wait for database loading screens.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-gilroyBold text-text_primary/40 text-lg select-none">▪</span>
                <span><strong>Communication:</strong> The owner manages calculations and base wholesale configurations, whereas cashiers and workers only handle register checkouts and stock shelf listings.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-gilroyBold text-text_primary/40 text-lg select-none">▪</span>
                <span><strong>Order of Events:</strong> Cashiers scan or select items, modify cart numbers, pick cash/online formats, apply store discounts, and print invoices.</span>
              </li>
            </ul>
          </div>

          {/* Personas vertical stack (1x1 grid) */}
          <div className="flex flex-col gap-24 mt-16 max-w-4xl">
            
            {/* Persona 1: Krish Agrawal */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start pb-16 border-b border-text_primary/5">
              {/* Left Column: Image & Centered Details */}
              <div className="sm:col-span-4 flex flex-col items-center text-center">
                <div className="w-full aspect-[3/4] max-w-[200px] rounded-2xl overflow-hidden mb-4 shadow-md border border-text_primary/5 bg-white select-none">
                  <img 
                    src="/images/pos-panel/friend.png" 
                    alt="Krish Agrawal" 
                    className="w-full h-full object-cover filter contrast-[1.02]"
                  />
                </div>
                <h4 className="font-gilroyBold text-lg text-text_primary leading-tight">Krish Agrawal</h4>
                <p className="font-gilroyRegular text-xs text-text_primary/60 mt-1">Store Owner &amp; Manager</p>
                <p className="font-gilroyRegular text-xs text-text_primary/50 mt-0.5">Experience: 8+ years</p>
              </div>

              {/* Right Column: Content */}
              <div className="sm:col-span-8 flex flex-col gap-6">
                <p className="font-gilroyRegular text-base text-text_primary/80 italic leading-relaxed pl-4 border-l-2 border-text_primary/20">
                  &ldquo;I just need a register screen that never freezes, is large enough to tap without making mistakes, and automatically logs customer transactions so I don&apos;t lose my accounts book.&rdquo;
                </p>
                
                <div>
                  <h5 className="font-gilroyBold text-xs uppercase tracking-wider text-text_primary/40 mb-1">Goals</h5>
                  <p className="text-xs md:text-sm text-text_primary/75 leading-relaxed">
                    Ditch handwritten ledger files for secure, auto-logged digital receipt records. Restrict register cashiers from editing pricing scales and audit revenue tallies in seconds.
                  </p>
                </div>

                <div>
                  <h5 className="font-gilroyBold text-xs uppercase tracking-wider text-text_primary/40 mb-1">Frustrations</h5>
                  <p className="text-xs md:text-sm text-text_primary/75 leading-relaxed">
                    Losing written logs or forgetting customer credit summaries. Operations halting completely when counter local Wi-Fi shuts down.
                  </p>
                </div>
              </div>
            </div>

            {/* Persona 2: Rahul */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
              {/* Left Column: Image & Centered Details */}
              <div className="sm:col-span-4 flex flex-col items-center text-center">
                <div className="w-full aspect-[3/4] max-w-[200px] rounded-2xl overflow-hidden mb-4 shadow-md border border-text_primary/5 bg-white select-none">
                  <img 
                    src="/images/pos-panel/cashier_avatar.png" 
                    alt="Rahul" 
                    className="w-full h-full object-cover filter contrast-[1.02]"
                  />
                </div>
                <h4 className="font-gilroyBold text-lg text-text_primary leading-tight">Rahul</h4>
                <p className="font-gilroyRegular text-xs text-text_primary/60 mt-1">Store Cashier &amp; Operator</p>
                <p className="font-gilroyRegular text-xs text-text_primary/50 mt-0.5">Experience: 1 year</p>
              </div>

              {/* Right Column: Content */}
              <div className="sm:col-span-8 flex flex-col gap-6">
                <p className="font-gilroyRegular text-base text-text_primary/80 italic leading-relaxed pl-4 border-l-2 border-text_primary/20">
                  &ldquo;I need an interface that lets me select items and process checkouts under 12 seconds. It has to be dead simple so I don&apos;t hit wrong buttons when customer queues get long.&rdquo;
                </p>
                
                <div>
                  <h5 className="font-gilroyBold text-xs uppercase tracking-wider text-text_primary/40 mb-1">Goals</h5>
                  <p className="text-xs md:text-sm text-text_primary/75 leading-relaxed">
                    Fast checkout taps using high-accuracy items selectors. Instant toggle switches between billing configurations and client receipts.
                  </p>
                </div>

                <div>
                  <h5 className="font-gilroyBold text-xs uppercase tracking-wider text-text_primary/40 mb-1">Frustrations</h5>
                  <p className="text-xs md:text-sm text-text_primary/75 leading-relaxed">
                    Accidentally tapping administrative configuration dials. Getting confused by complex inventory breakdown graphs and finance analytics dashboards.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── 08. DESIGN SPECIFICATION ── */}
        <motion.div 
          id="strategy"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">08. Design Strategy</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Core Objectives &amp; Strategy</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <p className="font-gilroyRegular text-base md:text-lg text-text_primary/90 mb-8 max-w-3xl">
            Based on the inferences and the working of the solution, the key objectives of the app are the following:
          </p>

          {/* Design planning grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-gilroyRegular">
            
            <div className="flex flex-col gap-2 p-6 bg-white/50 backdrop-blur-sm border border-text_primary/10 rounded-2xl shadow-sm hover:bg-white/60 transition-all duration-300">
              <span className="text-base font-gilroyBold text-text_primary">1. Touch-Optimized Register Layout</span>
              <p className="text-sm text-text_primary/75 leading-relaxed">
                All navigation controls and product grids are locked to a minimum of 56px to ensure cashiers can select items and modify cart quantities quickly without visual searching or misclicks.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-6 bg-white/50 backdrop-blur-sm border border-text_primary/10 rounded-2xl shadow-sm hover:bg-white/60 transition-all duration-300">
              <span className="text-base font-gilroyBold text-text_primary">2. Instant Retail / Wholesale Pricing</span>
              <p className="text-sm text-text_primary/75 leading-relaxed">
                A single tap switches checkout pricing models. The calculations run client-side immediately, allowing immediate adjustments during checkout rushes.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-6 bg-white/50 backdrop-blur-sm border border-text_primary/10 rounded-2xl shadow-sm hover:bg-white/60 transition-all duration-300">
              <span className="text-base font-gilroyBold text-text_primary">3. Offline Zustand Fallback Buffer</span>
              <p className="text-sm text-text_primary/75 leading-relaxed">
                If the internet goes offline, checkout carts queue transactions locally. Once the connection is restored, the queue syncs with the database automatically.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-6 bg-white/50 backdrop-blur-sm border border-text_primary/10 rounded-2xl shadow-sm hover:bg-white/60 transition-all duration-300">
              <span className="text-base font-gilroyBold text-text_primary">4. Local Client-Side PDF Receipts</span>
              <p className="text-sm text-text_primary/75 leading-relaxed">
                Invoices compile directly on the tablet register using jsPDF vectors, avoiding server-side delays and printing instantly.
              </p>
            </div>

          </div>
        </motion.div>

        {/* ── 09. THE 5 Ws ALIGNMENT ── */}
        <motion.div 
          id="5ws"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">09. Strategic Alignment</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">The 5 Ws Alignment</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12">
            
            <div className="flex flex-col gap-2 text-left">
              <span className="font-gilroyBold text-xl text-text_primary">What?</span>
              <p className="text-sm text-text_primary/80 leading-relaxed">
                A localized, cloud-first POS tablet dashboard that manages checkout carts, stock alert thresholds, customer billing history, and business parameters.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <span className="font-gilroyBold text-xl text-text_primary">Why?</span>
              <p className="text-sm text-text_primary/80 leading-relaxed">
                To prevent handwritten accounts from being damaged or lost, reduce cashier arithmetic errors, and automate hours of month-end billing tallies.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <span className="font-gilroyBold text-xl text-text_primary">When?</span>
              <p className="text-sm text-text_primary/80 leading-relaxed">
                At the counter register during peak retail evening rushes, where sales processes must run cleanly without screen freezing or database lags.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <span className="font-gilroyBold text-xl text-text_primary">Who?</span>
              <p className="text-sm text-text_primary/80 leading-relaxed">
                A local convenience shop owner (who audits profits and updates catalog parameters) and cashiers (who register items quickly).
              </p>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <span className="font-gilroyBold text-xl text-text_primary">Where?</span>
              <p className="text-sm text-text_primary/80 leading-relaxed">
                Directly on a 10&quot; touchscreen Android tablet mounted at the store checkout counter.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <span className="font-gilroyBold text-xl text-text_primary">How?</span>
              <p className="text-sm text-text_primary/80 leading-relaxed">
                Using Next.js 15, Zustand persistent storage (for offline queueing buffers), PostgreSQL database syncer, and client-side jsPDF compilers.
              </p>
            </div>

          </div>
        </motion.div>

        {/* ── 10. INTERFACE SYSTEM ── */}
        <motion.div 
          id="walkthrough"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-text_primary/75 block mb-1.5">10. System Interfaces</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Introducing my POS</h2>
          
          <div className="flex flex-col gap-60 mt-12">
            
            {/* Screen 1: New Order */}
            <div id="screen-1" className="min-h-screen flex flex-col justify-center py-20 gap-8">
              <div className="flex flex-col gap-1.5">
                <span className="font-gilroyBold text-xs text-text_primary/50 uppercase block tracking-wider">Screen 1</span>
                <h4 className="font-gilroyBold text-2xl md:text-3xl text-text_primary">New Order register workspace</h4>
              </div>
              
              <div className="w-full overflow-hidden rounded-xl border border-text_primary/10 shadow-lg bg-[#121212]">
                <img 
                  src="/images/pos-panel/new-order.png" 
                  alt="POS Register Screen Interface" 
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Explanations Grid below image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Layers size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Main navigation tabs</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Sidebar navigation options are grouped on the left, keeping screen switches close to the cashier&apos;s thumb for single-hand tablet register operations.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Sliders size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Pricing Profile switch</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Toggles checkout pricing between Retail and Wholesale instantly mid-session. The system recalulates item rates locally, bypassing network latency.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Touch-First item cards</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Product and category selector cards are designed with a minimum of 56px targets to ensure high tap accuracy and prevent cashier misclicks.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Terminal size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Keyboard-only checkout binds</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Pressing the <code>Enter</code> key shortcut triggers the payment flow and client invoice generation immediately, speeding up checkout counter lanes.
                  </p>
                </div>
              </div>
            </div>

            {/* Screen 2: Dashboard */}
            <div id="screen-2" className="min-h-screen flex flex-col justify-center py-20 gap-8">
              <div className="flex flex-col gap-1.5">
                <span className="font-gilroyBold text-xs text-text_primary/50 uppercase block tracking-wider">Screen 2</span>
                <h4 className="font-gilroyBold text-2xl md:text-3xl text-text_primary">Analytics Dashboard</h4>
              </div>
              
              <div className="w-full overflow-hidden rounded-xl border border-text_primary/10 shadow-lg bg-[#121212]">
                <img 
                  src="/images/pos-panel/dashboard.png" 
                  alt="POS Admin Analytics dashboard" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Info size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Sensitive data obscurity mask</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Revenue and profit statistics cards are blurred by default. Clicking the eye toggle icon reveals numerical values, keeping store financials safe from customer view.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Low-Stock depletion warnings</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Tracks inventory limits against warning thresholds, flashing red alerts for products running low to prompt timely restocking.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <UserCheck size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Role-Aware Quick Actions</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Features a shortcuts dock displaying specific settings key options depending on logged-in roles (Owner, Cashier, or Worker).
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Activity size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Horizontal Sales charts</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Product sales distribution is formatted into clean horizontal progress bars, keeping layout visual density simple and easy to scan.
                  </p>
                </div>
              </div>
            </div>

            {/* Screen 3: Bill History */}
            <div id="screen-3" className="min-h-screen flex flex-col justify-center py-20 gap-8">
              <div className="flex flex-col gap-1.5">
                <span className="font-gilroyBold text-xs text-text_primary/50 uppercase block tracking-wider">Screen 3</span>
                <h4 className="font-gilroyBold text-2xl md:text-3xl text-text_primary">Immutable Ledger Log</h4>
              </div>
              
              <div className="w-full overflow-hidden rounded-xl border border-text_primary/10 shadow-lg bg-[#121212]">
                <img 
                  src="/images/pos-panel/bill-history.png" 
                  alt="POS Transactions ledger Screen" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Database size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Immutable JSONB snapshots</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Freezes invoice product logs at checkout time, preventing pricing fluctuations in the catalog from retroactively altering transaction reports.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <FileText size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Flat Table Ledger</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Logs rows detail invoice IDs, retail/wholesale types, pay formats (Cash vs Online), and total calculations inside a single, filterable view.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Fast client receipt downloads</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Invoices are compiled client-side using jsPDF vectors, outputting compact thermal layouts in 0ms without server database traffic.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <ExternalLink size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Instant Share modal</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Provides quick action shortcuts (WhatsApp formatting templates, native Web Share dialog triggers, and copy links) to support paperless billing.
                  </p>
                </div>
              </div>
            </div>

            {/* Screen 4: Inventory */}
            <div id="screen-4" className="min-h-screen flex flex-col justify-center py-20 gap-8">
              <div className="flex flex-col gap-1.5">
                <span className="font-gilroyBold text-xs text-text_primary/50 uppercase block tracking-wider">Screen 4</span>
                <h4 className="font-gilroyBold text-2xl md:text-3xl text-text_primary">Catalog Inventory Manager</h4>
              </div>
              
              <div className="w-full overflow-hidden rounded-xl border border-text_primary/10 shadow-lg bg-[#121212]">
                <img 
                  src="/images/pos-panel/inventory.png" 
                  alt="POS Catalog inventory manager screen" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Layers size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Split-pane category tree</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Displays catalog folders on the left pane and product listings on the right, keeping index navigation simple and reducing cognitive fatigue.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <DollarSign size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Inline pricing configurations</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Admins modify retail/wholesale prices directly inside row table fields, removing slow, multi-page settings menus.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <ArrowRight size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Slide-over product drawer</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Adding new products or editing configurations slides out from the right margin, keeping operators in context.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Cascading cleanup</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Deleting catalog categories automatically triggers cleanups on related items, maintaining database structural integrity.
                  </p>
                </div>
              </div>
            </div>

            {/* Screen 5: Settings */}
            <div id="screen-5" className="min-h-screen flex flex-col justify-center py-20 gap-8">
              <div className="flex flex-col gap-1.5">
                <span className="font-gilroyBold text-xs text-text_primary/50 uppercase block tracking-wider">Screen 5</span>
                <h4 className="font-gilroyBold text-2xl md:text-3xl text-text_primary">Business Customizations</h4>
              </div>
              
              <div className="w-full overflow-hidden rounded-xl border border-text_primary/10 shadow-lg bg-[#121212]">
                <img 
                  src="/images/pos-panel/settings.png" 
                  alt="POS invoice template settings screen" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Database size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Zustand persisted form store</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Business credentials, address layouts, and tax structures are cached locally in the browser, surviving power outages or register resets.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Sliders size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">Printer paper ratio sizing</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Toggles template spacing between standard A4 prints and 58mm compact thermal papers, formatting invoice vectors dynamically.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-text_primary/30 md:col-span-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-text_primary/70" />
                    <h5 className="font-gilroyBold text-base md:text-lg text-text_primary leading-none">GSTIN &amp; Tax validations</h5>
                  </div>
                  <p className="text-xs md:text-sm text-text_primary/80 leading-relaxed">
                    Official store tax percentages and registration numbers are validated inline, ensuring invoice generation matches auditing guidelines.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── 11. SYSTEM ARCHITECTURE ── */}
        <motion.div 
          id="architecture"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs text-text_primary/75 font-bold block tracking-[0.18em] mb-1.5 uppercase">11. Technical Resiliency</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Engineering for Resiliency</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="font-gilroyRegular text-base md:text-lg text-text_primary/90 space-y-6 max-w-3xl mb-12">
            <p>
              A clean interface design is only half the battle. If a cashier tab crashes during checkout, or a network drop corrupts stock calculations, the user experience falls apart. 
            </p>
            <p>
              I chose Next.js 15, Zustand, and Supabase to build a fast front-end architecture designed for real-world resilience:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Zustand store code snippet */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div className="p-6 rounded-2xl border border-text_primary/10 bg-white/40 flex flex-col h-full shadow-sm">
                <div className="flex items-center justify-between border-b border-text_primary/10 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-text_primary/70">
                    <Terminal size={14} className="text-text_primary" />
                    <span className="text-[10px] font-gilroyBold">useCartStore.ts</span>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest bg-text_primary/5 border border-text_primary/10 text-text_primary px-2 py-0.5 rounded font-gilroyBold">Zustand Store</span>
                </div>

                <div className="font-mono text-[11px] leading-relaxed overflow-x-auto premium-scrollbar text-text_primary/80 flex-grow select-text animate-none">
                  <span className="text-blue-800">const</span> useCartStore = create()(
                  <br />
                  &nbsp;&nbsp;persist(
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;(set, get) =&gt; (&#123;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cart: [],
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;offlineQueue: [], <span className="text-text_primary/40">// Offline buffer</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;checkout: <span className="text-blue-800">async</span> () =&gt; &#123;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-800">const</span> tx = &#123; id: genId(), items: get().cart &#125;;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-800">if</span> (!navigator.onLine) &#123;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;set(s =&gt; (&#123; 
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;offlineQueue: [...s.offlineQueue, tx],
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cart: []
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;));
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;triggerLocalInvoice(tx);
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-800">return</span>;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-800">await</span> supabase.from(<span className="text-green-800">&apos;bill_history&apos;</span>).insert(tx);
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;)
                  <br />
                  &nbsp;&nbsp;)
                  );
                </div>
              </div>
            </div>

            {/* Right: PostgreSQL Schema for Data Integrity */}
            <div className="md:col-span-6 flex flex-col justify-between h-full">
              <div className="p-6 rounded-2xl border border-text_primary/10 bg-white/40 flex flex-col h-full gap-4 font-gilroyRegular shadow-sm">
                <h3 className="text-base font-gilroyBold text-text_primary flex items-center gap-2">
                  <Database size={16} className="text-text_primary" />
                  Preserving History with JSONB
                </h3>
                
                <p className="text-xs md:text-sm text-text_primary/85 leading-relaxed">
                  In transaction recording systems, linking items purely through dynamic relationships to a <code>products</code> table introduces tax audit vulnerabilities. If an item&apos;s price, stock tax level, or title is updated in the future, past transaction statistics will retroactively skew. 
                </p>
                <p className="text-xs md:text-sm text-text_primary/85 leading-relaxed">
                  To prevent this, our checkout stores the full transaction item details in an immutable <code>JSONB</code> array snapshot in the database. This permanently freezes cart parameters as they existed at the exact millisecond of purchase.
                </p>

                {/* Migration SQL code */}
                <div className="border-t border-text_primary/10 pt-4 mt-2">
                  <div className="flex items-center justify-between mb-2 text-[10px] font-gilroyBold text-text_primary/60">
                    <span>SQL Schema Definition</span>
                    <span className="text-text_primary font-gilroyBold">bill_history.sql</span>
                  </div>
                  <div className="p-3 rounded-lg font-mono text-[9px] leading-relaxed bg-white/60 border border-text_primary/10 text-text_primary/95 overflow-x-auto premium-scrollbar select-text">
                    <span className="text-blue-800">CREATE TABLE</span> bill_history (
                    <br />
                    &nbsp;&nbsp;id UUID PRIMARY KEY,
                    <br />
                    &nbsp;&nbsp;total_amount DECIMAL(10, 2),
                    <br />
                    &nbsp;&nbsp;<span className="font-bold">line_items JSONB NOT NULL</span>,
                    <br />
                    &nbsp;&nbsp;created_at TIMESTAMP DEFAULT NOW()
                    <br />
                    );
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── 12. ROADMAP & FUTURE SCOPE ── */}
        <motion.div 
          id="roadmap"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <span className="font-gilroyBold text-xs text-text_primary/75 font-bold block tracking-[0.18em] mb-1.5 uppercase">12. Future Companion</span>
          <h2 className="font-gilroyBold text-3xl md:text-5xl text-text_primary tracking-tight mb-4">Future Scope: Mobile Sync Companion</h2>
          <div className="w-full h-px bg-text_primary/10 mb-8" />
          
          <div className="font-gilroyRegular text-base md:text-lg leading-relaxed text-text_primary/90 space-y-4 max-w-3xl">
            <p>
              Operating a local retail store means my friend has to run around to warehouses, check stocks on shelf displays, and coordinates deliveries. Being stuck behind the checkout counter tablet all day is impossible.
            </p>
            <p>
              In the next iteration of the project, I plan to develop a companion **mobile application**. This mobile version will sync real-time sales revenue, low-stock notifications, and transactional bill databases via Supabase, allowing him to check dashboard reports and update catalog prices remotely from his phone while on the move.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── PORTFOLIO FOOTER ── */}
      <section className="w-full py-16 border-t border-text_primary/10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-text_primary/5 pb-8">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="text-xl font-gilroyBold text-text_primary">Thanks for reading!</h3>
              <p className="text-xs text-text_primary/60">Let&apos;s collaborate to design and engineer premium interface systems.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/DivineDB" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full border border-text_primary/15 bg-white/40 text-text_primary hover:bg-accent_highlight transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/in/divyansh-baghel/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full border border-text_primary/15 bg-white/40 text-text_primary hover:bg-accent_highlight transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a 
                href="https://www.instagram.com/dbdoesstuff/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full border border-text_primary/15 bg-white/40 text-text_primary hover:bg-accent_highlight transition-all"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a 
                href="mailto:divyanshbaghel456@gmail.com" 
                className="p-2.5 rounded-full border border-text_primary/15 bg-white/40 text-text_primary hover:bg-accent_highlight transition-all"
                aria-label="Email"
              >
                <FaEnvelope size={16} />
              </a>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <Link 
              href="/work/scout" 
              className="group flex flex-col justify-between gap-4 rounded-xl border border-text_primary/10 p-5 bg-white/40 hover:bg-white/60 transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-gilroyRegular text-text_primary/60 uppercase tracking-[0.15em]">AI-Native Pipeline</span>
                <h5 className="font-gilroyBold text-base text-text_primary">Scout</h5>
                <p className="text-xs text-text_primary/70 leading-relaxed">
                  An automated intelligence crawler mapping raw data sets into context-aware verticals and localized nodes.
                </p>
              </div>
              <span className="font-gilroyBold text-xs text-text_primary inline-flex items-center gap-1 mt-2">
                Read Case Study <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

            <Link 
              href="/work" 
              className="group flex flex-col justify-between gap-4 rounded-xl border border-text_primary/10 p-5 bg-white/40 hover:bg-white/60 transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-gilroyRegular text-text_primary/60 uppercase tracking-[0.15em]">Portfolio Index</span>
                <h5 className="font-gilroyBold text-base text-text_primary">All Case Studies</h5>
                <p className="text-xs text-text_primary/70 leading-relaxed">
                  Browse the full gallery of user experience research prototypes, dashboard engines, and design tools.
                </p>
              </div>
              <span className="font-gilroyBold text-xs text-text_primary inline-flex items-center gap-1 mt-2">
                View Selected Work <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* Global layout page footer */}
      <PageFooter />
    </main>
  );
}
