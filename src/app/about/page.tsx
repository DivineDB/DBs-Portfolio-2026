"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import PageFooter from "@/components/PageFooter";

const LiveWeather = dynamic(() => import("@/components/LiveWeather"), { ssr: false });

const TABS = ["Story", "TL;DR"] as const;
type Tab = (typeof TABS)[number];

const GREETINGS = ["Hello,", "Namaste,", "Hola,", "Ciao,", "Bonjour,", "Konnichiwa,"] as const;


const STORY_BODY_CLASS =
  "flex max-w-[800px] flex-col gap-8 font-satoshi text-lg font-normal leading-relaxed text-[#4A5568]";

const fadedMaskClass = "opacity-25 line-through decoration-text_primary/20";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


type HighlightProps = {
  children: React.ReactNode;
  /** Green backdrop; set false for plain text (e.g. TL;DR body). */
  boxed?: boolean;
};

function Highlight({ children, boxed = true }: HighlightProps) {
  if (!boxed) {
    return <span className="text-inherit font-inherit">{children}</span>;
  }

  return (
    <span className="group relative isolate inline whitespace-nowrap align-baseline leading-none box-border px-1.5 py-[5px]">
      <span
        className="pointer-events-none absolute inset-0 z-0 rounded-[3px] border border-text_primary/15 bg-accent_highlight transition-transform box-border group-hover:scale-[1.03]"
        style={{ boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.25)" }}
        aria-hidden
      />
      <span className="relative z-10 font-gilroyRegular text-text_primary font-normal">{children}</span>
    </span>
  );
}

/** Inline keyword: turns into a syntax-highlighted code snippet on hover */
function CodeKeyword({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="relative inline-block cursor-crosshair font-medium text-[#2a4756] group"
      whileHover="hovered"
      initial="idle"
    >
      {/* Hover pill */}
      <motion.span
        className="absolute -inset-x-2 -inset-y-1 rounded-md bg-[#1e293b] z-0 pointer-events-none"
        variants={{ idle: { opacity: 0, scale: 0.92 }, hovered: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      {/* Normal text (fades out) */}
      <motion.span
        className="relative z-10"
        variants={{ idle: { opacity: 1 }, hovered: { opacity: 0 } }}
        transition={{ duration: 0.12 }}
      >
        {children}
      </motion.span>
      {/* Mono code text (fades in) */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center z-10 font-mono text-[#4ade80] text-[0.85em] whitespace-nowrap"
        variants={{ idle: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.18, delay: 0.06 }}
        aria-hidden
      >
        {'<'}{children}{' />'}
      </motion.span>
    </motion.span>
  );
}

/** Inline keyword: reveals a faint architectural grid on hover */
function DesignEngineeringKeyword({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="relative inline-block cursor-default font-medium text-[#2a4756] px-1 z-10"
      whileHover="hovered"
      initial="idle"
    >
      {/* Grid bg */}
      <motion.span
        className="absolute -inset-x-3 -inset-y-2 rounded pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right,#2a475614 1px,transparent 1px),linear-gradient(to bottom,#2a475614 1px,transparent 1px)",
          backgroundSize: "6px 6px",
        }}
        variants={{ idle: { opacity: 0, scale: 0.88 }, hovered: { opacity: 1, scale: 1.08 } }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Highlight underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-[#a2f991] rounded-full pointer-events-none z-0"
        variants={{ idle: { width: "0%", opacity: 0 }, hovered: { width: "100%", opacity: 1 } }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
}

function StoryContent() {
  return (
    <div className={STORY_BODY_CLASS}>
      <p>
        I was lucky to have my dad&apos;s laptop when I was a kid. Spent a ton of time playing video
        games, but my real introduction to design was messing around with PowerPoint animations in
        school. I loved figuring out how to make things move and fit together on a screen, and that
        early obsession with layouts completely stuck with me.
      </p>
      <p>
        Later on, got obsessed with photography and cinematics. I loved how a single frame could
        freeze a feeling, or how lighting could change a whole mood. That love for visual aesthetics
        and composition never left, it just shifted from camera lenses to digital interfaces.
      </p>
      <p>
        Naturally, I ended up learning how to{" "}
        <CodeKeyword>code</CodeKeyword>{" "}and went for a{" "}
        <Highlight>B.Tech degree</Highlight>. But during my final year, I realized I cared way more
        about UX choices and people than just pure coding. I found myself focusing on why someone
        would use a feature and how it actually felt to use it, rather than just writing hidden
        backend logic.
      </p>
      <p>
        That&apos;s why I love the middle ground of{" "}
        <DesignEngineeringKeyword>
          <Highlight>design engineering</Highlight>
        </DesignEngineeringKeyword>. I
        make sure the creative vision never gets lost in the engineering cycle. I design digital
        products for people, and use code as the medium to bring them to life. I just want to build
        simple, beautiful digital products that make sense to the people using them.
      </p>
    </div>
  );
}

/** Same copy and metrics as Story; subtractive mask via opacity + strikethrough only. */
function TldrContent() {
  return (
    <div className={STORY_BODY_CLASS}>
      <p>
        <span>I was lucky to have my dad&apos;s laptop when I was a kid. </span>
        <span className={fadedMaskClass}>
          Spent a ton of time playing video games, but{" "}
        </span>
        <span>my real introduction to design was messing around with PowerPoint animations</span>
        <span className={fadedMaskClass}>
          {" "}
          in school. I loved figuring out how to make things move and fit together on a screen, and
          that early obsession with layouts completely stuck with me.
        </span>
      </p>
      <p>
        <span className={fadedMaskClass}>
          Later on, got obsessed with photography and cinematics. I loved how a single frame could
          freeze a feeling, or how lighting could change a whole mood.{" "}
        </span>
        <span>
          That love for visual aesthetics and composition never left, it just shifted from camera
          lenses to digital interfaces.
        </span>
      </p>
      <p>
        <span className={fadedMaskClass}>
          Naturally, I ended up learning how to code and went for a B.Tech degree. But during my
          final year,{" "}
        </span>
        <span>I realized I cared way more about UX choices and people than just pure coding.</span>
        <span className={fadedMaskClass}>
          {" "}
          I found myself focusing on why someone would use a feature and how it actually felt to use
          it, rather than just writing hidden backend logic.
        </span>
      </p>
      <p>
        <span>That&apos;s why I love the middle ground of </span>
        <Highlight boxed={false}>design engineering</Highlight>
        <span className={fadedMaskClass}>
          . I make sure the creative vision never gets lost in the engineering cycle.{" "}
        </span>
        <span>
          I design digital products for people, and use code as the medium to bring them to life.
        </span>
        <span className={fadedMaskClass}>
          {" "}
          I just want to build simple, beautiful digital products that make sense to the people
          using them.
        </span>
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Story");
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full bg-bg font-gilroyRegular text-text_primary">
      
      {/* Section 1 — Hero */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 md:px-12 pt-8">
        <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 items-center gap-12 md:grid-cols-2">
          <motion.div
            className="flex flex-col gap-6 text-lg text-text_primary/70 md:text-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            variants={containerVariants}
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <div className="relative h-12 overflow-hidden md:h-14">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={greetingIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="absolute font-playfairDisplayItalic text-4xl text-text_primary/80 md:text-5xl"
                  >
                    {GREETINGS[greetingIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.h1
                className="font-gilroyBold text-6xl tracking-tight text-text_primary md:text-8xl will-change-[transform,filter,opacity]"
                initial={{ opacity: 0, y: 15, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                I&apos;m DB.
              </motion.h1>
            </div>
            <motion.p variants={childVariants}>
              I&apos;m a 22 year old{" "}
              <Highlight boxed={activeTab !== "TL;DR"}>Design Engineer</Highlight> currently freelancing —
              blending full-stack code with product design.
            </motion.p>
            <motion.p variants={childVariants}>
              I am based in Pune, India, and it&apos;s <LiveWeather />
            </motion.p>
          </motion.div>

          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              className="relative z-10 mx-auto aspect-[4/5] w-[340px] rotate-[6deg] border border-text_primary/10 bg-white p-4 pb-14 shadow-2xl md:w-[400px] will-change-transform"
              initial={{ opacity: 0, scale: 0.9, rotate: -3, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
              whileHover={{ scale: 1.02, rotate: -1, transition: { duration: 0.4, ease: "easeOut" } }}
            >
              <div className="absolute inset-x-4 top-4 bottom-14 overflow-hidden">
                <Image
                  src="/images/me.jpeg"
                  alt="Divyansh Baghel"
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 768px) 340px, 400px"
                  priority
                />
              </div>
              <p className="absolute right-0 bottom-0 left-0 flex h-14 items-center justify-center text-sm text-text_primary/40">
                me.jpeg
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text_primary/50 will-change-transform"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-gilroyBold text-xs tracking-[0.2em] uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0 }}
            className="will-change-transform"
          >
            <ArrowDown size={18} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 — About */}
      <section className="relative w-full px-6 md:px-12 py-20">
        <div className="mx-auto max-w-[1000px] flex flex-col gap-10">
          <div className="flex flex-row items-end justify-between border-b border-text_primary/10 pb-4">
            <motion.h2
              className="font-gilroyBold text-4xl text-text_primary/40 will-change-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About
            </motion.h2>

            <div className="relative flex rounded-md border border-text_primary/10 bg-black/5 p-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
                      isActive ? "text-text_primary" : "text-text_primary/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 z-0 rounded bg-bg shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {activeTab === "Story" && <StoryContent />}
            {activeTab === "TL;DR" && <TldrContent />}
          </div>
        </div>
      </section>

      <PageFooter />

    </main>
  );
}
