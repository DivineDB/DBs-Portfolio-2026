"use client";

import { MotionInView } from "@/components/hire-me/motion-in-view";
import { HighlightBox } from "@/components/hire-me/highlight-box";
import { ArrowDown, Calendar, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PopupModal } from "react-calendly";
import { useState } from "react";
import Link from "next/link";
import {
  SiFigma,
  SiGo,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const RESUME_PDF_PATH = "/Divyansh_Baghel_Resume.pdf";
const CALENDLY_URL = "https://calendly.com/divyanshbaghel456";

const TECH = [
  { label: "React", Icon: SiReact, hoverTextClass: "group-hover:text-[#61DAFB]" },
  { label: "Next.js", Icon: SiNextdotjs, hoverTextClass: "group-hover:text-black" },
  { label: "Node.js", Icon: SiNodedotjs, hoverTextClass: "group-hover:text-[#339933]" },
  { label: "TypeScript", Icon: SiTypescript, hoverTextClass: "group-hover:text-[#3178C6]" },
  { label: "GoLang", Icon: SiGo, hoverTextClass: "group-hover:text-[#00ADD8]" },
  { label: "Python", Icon: SiPython, hoverTextClass: "group-hover:text-[#3776AB]" },
  { label: "Figma", Icon: SiFigma, hoverTextClass: "group-hover:text-[#F24E1E]" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, hoverTextClass: "group-hover:text-[#06B6D4]" },
] as const;

const STAGGER = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
} as const;

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
} as const;

export default function HireMePage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [resumeHover, setResumeHover] = useState(false);
  const canUseDom = typeof document !== "undefined";

  return (
    <main className="relative h-screen w-full bg-bg font-gilroyRegular text-text_primary">
      {/* Dashed top/bottom borders (overlay; don’t affect section height). */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 border-t border-dashed border-[#2A4756]" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-b border-dashed border-[#2A4756]" />

      <div className="h-screen w-full overflow-y-scroll overscroll-contain snap-y snap-mandatory no-scrollbar">
        {/* Section 1: Hero */}
        <section id="top" className="snap-start snap-always h-screen px-6 md:px-12">
          <MotionInView className="relative mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-gilroyBold uppercase tracking-[0.2em] text-[#2A4756]/55">
                AVAILABLE FOR NEW OPPORTUNITIES
              </span>
            </div>

            <h1 className="text-5xl font-gilroyBold tracking-tight md:text-7xl">
              <HighlightBox className="font-gilroyBold tracking-tight">Hire me!</HighlightBox>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-800 md:text-lg">
              If you&apos;re a recruiter or building a team with an opportunity I simply can&apos;t refuse—you&apos;re in
              the right place.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={RESUME_PDF_PATH}
                download
                className="inline-flex items-center gap-2 rounded-full bg-accent_highlight px-5 py-3 text-sm font-gilroyBold text-text_primary transition hover:brightness-[0.98]"
              >
                Download <Download className="h-4 w-4" />
              </a>

              <div
                className="relative"
                onMouseEnter={() => setResumeHover(true)}
                onMouseLeave={() => setResumeHover(false)}
              >
                <a
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2A4756]/15 bg-transparent px-5 py-3 text-sm font-gilroyBold text-text_primary transition hover:bg-black/[0.03]"
                >
                  View PDF
                </a>

                <AnimatePresence>
                  {resumeHover ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute left-0 top-full z-30 mt-3 w-[260px] rounded-2xl border border-[#2A4756]/15 bg-bg p-4 shadow-[0_18px_50px_rgba(0,0,0,0.14)]"
                    >
                      <div className="rounded-xl border border-[#2A4756]/15 bg-white/40 p-3">
                        <div className="space-y-2">
                          <div className="h-3 w-2/3 rounded bg-[#2A4756]/10" />
                          <div className="h-2.5 w-full rounded bg-[#2A4756]/10" />
                          <div className="h-2.5 w-11/12 rounded bg-[#2A4756]/10" />
                          <div className="h-2.5 w-10/12 rounded bg-[#2A4756]/10" />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="h-14 rounded bg-[#2A4756]/10" />
                          <div className="h-14 rounded bg-[#2A4756]/10" />
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="h-2.5 w-full rounded bg-[#2A4756]/10" />
                          <div className="h-2.5 w-5/6 rounded bg-[#2A4756]/10" />
                          <div className="h-2.5 w-3/4 rounded bg-[#2A4756]/10" />
                        </div>
                      </div>
                      <p className="mt-3 text-[11px] uppercase tracking-widest text-[#2A4756]/45">
                        Preview
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <span className="px-2 text-xs uppercase tracking-widest text-[#2A4756]/45">OR</span>

              <button
                type="button"
                onClick={() => setCalendlyOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-accent_highlight px-5 py-3 text-sm font-gilroyBold text-text_primary transition hover:brightness-[0.98]"
              >
                Let&apos;s Chat <Calendar className="h-4 w-4" />
              </button>
            </div>

            {/* About-page style scroll indicator (bottom center) */}
            <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#2A4756]/50">
              <span className="font-gilroyBold text-xs tracking-[0.2em] uppercase">Scroll Down</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowDown size={18} strokeWidth={1.5} />
              </motion.div>
            </div>
          </MotionInView>
        </section>

        {/* Section 2: Interactive Tech Stack */}
        <section className="snap-start snap-always h-screen px-6 md:px-12">
          <MotionInView className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center">
            <h2 className="text-3xl font-gilroyBold tracking-tight md:text-5xl">
              My <HighlightBox className="font-gilroyBold tracking-tight">Tech Stack</HighlightBox>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-800 md:text-lg">
              Technologies I use to get the job done.
            </p>

            <div className="mt-12">
              <div className="grid grid-cols-3 gap-y-10 sm:grid-cols-4 md:grid-cols-8">
                {TECH.map(({ label, Icon, hoverTextClass }) => (
                  <div key={label} className="group flex flex-col items-center">
                    <Icon
                      aria-hidden
                      className={[
                        "h-9 w-9 text-text_primary grayscale opacity-50 transition-all duration-300",
                        "group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110",
                        hoverTextClass,
                      ].join(" ")}
                    />
                    <span className="mt-3 text-xs font-gilroyBold tracking-tight text-text_primary opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </MotionInView>
        </section>

        {/* Section 3: Why Hire Me */}
        <section className="snap-start snap-always h-screen px-6 md:px-12">
          <MotionInView className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center">
            <h2 className="text-3xl font-gilroyBold tracking-tight md:text-5xl">
              Why must you <HighlightBox className="font-gilroyBold tracking-tight">hire me?</HighlightBox>
            </h2>

            <motion.ul
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-slate-800 md:text-lg"
            >
              <motion.li variants={STAGGER_ITEM}>
                • <span className="font-gilroyBold text-text_primary">A witty package:</span> Bringing humor, craft, and
                absolute clarity to complex problems.
              </motion.li>
              <motion.li variants={STAGGER_ITEM}>
                • <span className="font-gilroyBold text-text_primary">Proven leadership:</span> Experience leading
                engineering teams in India and shaping products end-to-end.
              </motion.li>
              <motion.li variants={STAGGER_ITEM}>
                • <span className="font-gilroyBold text-text_primary">Highly adaptable:</span> A quick learner
                comfortable jumping across domains—from food-tech and ed-tech, to fin-tech.
              </motion.li>
              <motion.li variants={STAGGER_ITEM}>
                • <span className="font-gilroyBold text-text_primary">Deep expertise:</span> A Full-stack engineer
                specializing in building scalable apps with React, TypeScript, Node.js, and GoLang.
              </motion.li>
            </motion.ul>
          </MotionInView>
        </section>

        {/* Section 4: Preferences */}
        <section className="snap-start snap-always h-screen px-6 md:px-12">
          <MotionInView className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center">
            <h2 className="text-3xl font-gilroyBold tracking-tight md:text-5xl">
              My <HighlightBox className="font-gilroyBold tracking-tight">Preferences</HighlightBox>
            </h2>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
                <div>
                  <p className="font-gilroyBold text-lg tracking-tight text-text_primary">Amazing work culture.</p>
                  <p className="mt-2 text-base leading-relaxed text-slate-800">
                    Clear ownership, kind feedback loops, and a strict bias toward shipping quality work.
                  </p>
                </div>
                <div>
                  <p className="font-gilroyBold text-lg tracking-tight text-text_primary">Familiar Tech stack.</p>
                  <p className="mt-2 text-base leading-relaxed text-slate-800">
                    React/Next.js, TypeScript, and strong fundamentals so I can start contributing on day one.
                  </p>
                </div>
                <div>
                  <p className="font-gilroyBold text-lg tracking-tight text-text_primary">Remote first.</p>
                  <p className="mt-2 text-base leading-relaxed text-slate-800">
                    Async-friendly teams with deliberate collaboration, strong documentation, and thoughtful rituals.
                  </p>
                </div>
                <div>
                  <p className="font-gilroyBold text-lg tracking-tight text-text_primary">Fair compensation.</p>
                  <p className="mt-2 text-base leading-relaxed text-slate-800">
                    Transparent leveling and compensation that aligns directly with impact, ownership, and execution.
                  </p>
                </div>
              </div>
            </div>
          </MotionInView>
        </section>

        {/* Footer section */}
        <section className="snap-start snap-always px-6 md:px-12">
          <MotionInView className="mx-auto w-full max-w-[1000px] py-12">
            <footer className="flex w-full items-center justify-between border-t border-dashed border-[#2A4756] pt-8 text-sm font-gilroyBold">
              <nav className="flex gap-8">
                <Link href="/about" className="transition hover:text-[#2A4756]/80">
                  About me
                </Link>
                <Link href="/work" className="transition hover:text-[#2A4756]/80">
                  My work
                </Link>
                <Link href="/other-things" className="transition hover:text-[#2A4756]/80">
                  Other things
                </Link>
              </nav>
              <p className="font-gilroyRegular text-[#2A4756]/40">© 2026 | Divyansh Baghel.</p>
            </footer>
          </MotionInView>
        </section>
      </div>

      {/* Calendly PopupModal (react-calendly) */}
      {canUseDom ? (
        <PopupModal
          url={CALENDLY_URL}
          open={calendlyOpen}
          onModalClose={() => setCalendlyOpen(false)}
          rootElement={document.body}
        />
      ) : null}
    </main>
  );
}

