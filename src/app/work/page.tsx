"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { HighlightBox } from "@/components/hire-me/highlight-box";
import PageFooter from "@/components/PageFooter";

const PROJECTS = [
  {
    id: "pos-panel",
    index: "01",
    title: "BreezePOS",
    highlight: "Breeze",
    rest: "POS",
    subtitle: "Point-of-Sale System",
    year: "2026",
    role: "Design & Engineering",
    description:
      "A touchscreen-optimized register and analytics dashboard built for convenience store operations. It features checkout under 12 seconds, real-time inventory sync, and zero log loss.",
    image: "/images/Group 5.png",
    imageAlt: "BreezePOS Order Register Workspace",
    imageBg: "#9AD8B6",
    liveUrl: "https://ssg-store.vercel.app",
    liveLabel: "Live Preview",
    wip: false,
  },
  {
    id: "scout",
    index: "02",
    title: "Scout Engine",
    highlight: "Scout",
    rest: " Engine",
    subtitle: "Autonomous Data Intelligence",
    year: "2026",
    role: "Systems Design",
    description:
      "An intelligence engine that crawls raw commercial datasets, runs categorization LLMs, and maps listing schemas into context-aware verticals.",
    image: "/images/scout_mockup.png",
    imageAlt: "Scout Engine Data Intelligence Console",
    imageBg: "#A7D4D7",
    liveUrl: "https://scout-pink-nine.vercel.app",
    liveLabel: "Live Preview",
    wip: false,
  },
];

export default function WorkPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFirstProject = () => {
    const el = document.getElementById("project-01");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="w-full bg-bg font-gilroyRegular text-text_primary">

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 md:px-12 py-24 md:py-0">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6">
          <h1 className="font-gilroyBold text-6xl tracking-tight text-text_primary md:text-8xl">
            <HighlightBox className="overflow-hidden inline-flex">
              <motion.span
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block will-change-transform"
              >
                Selected Work
              </motion.span>
            </HighlightBox>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl text-lg text-text_primary/70 md:text-xl will-change-transform"
          >
            A collection of interfaces and architectures. Bridging the gap between high-fidelity design systems and production-ready code.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto" }}
          transition={{ duration: 0.3 }}
          className="pointer-events-auto cursor-pointer absolute bottom-10 left-1/2 -translate-x-1/2 text-text_primary/30 hover:text-text_primary/60 transition-colors"
          onClick={scrollToFirstProject}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="will-change-transform"
          >
            <ArrowDown size={16} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Project list ─────────────────────────────────────────── */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-[1000px] flex flex-col">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              id={`project-${project.index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="group/article flex flex-col w-full h-screen py-8 pb-20 justify-between"
            >
              {/* Top block: all text + buttons */}
              <div className="flex flex-col gap-2">
                {/* Row 1: Title + subtitle·year */}
                <div className="flex items-baseline justify-between gap-4 border-b border-text_primary/10 pb-3">
                  <h2 className="font-gilroyBold text-2xl md:text-3xl text-text_primary tracking-tight flex items-center leading-none">
                    <HighlightBox className="py-1 px-3 shrink-0 mr-2 text-inherit">{project.highlight}</HighlightBox>
                    <span className="translate-y-[1px]">{project.rest}</span>
                  </h2>
                  <span className="font-gilroyRegular text-sm text-text_primary/60 tracking-wide shrink-0 hidden sm:block">
                    {project.subtitle} · {project.year}
                  </span>
                </div>

                {/* Row 2: Description + Buttons inline */}
                <div className="flex items-center justify-between gap-6 pt-1">
                  <p className="font-gilroyRegular text-sm text-text_primary/75 leading-snug max-w-lg">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <Link
                      href={`/work/${project.id}`}
                      className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-gilroyBold bg-text_primary text-bg shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-gilroyBold border border-text_primary/20 text-text_primary bg-white/20 backdrop-blur-sm transition-all hover:bg-text_primary hover:text-bg hover:border-text_primary active:scale-95"
                    >
                      <span>{project.liveLabel}</span>
                      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Image — fills remaining height */}
              <div
                className={`relative w-full flex-1 min-h-0 rounded-[24px] cursor-pointer transition-transform duration-500 hover:scale-[1.01] mt-4 ${
                  project.id === "pos-panel" ? "overflow-visible" : "overflow-hidden"
                }`}
                style={{ backgroundColor: project.imageBg }}
                onClick={() => router.push(`/work/${project.id}`)}
                title={project.imageAlt ?? undefined}
              >
                {project.id === "pos-panel" ? (
                  <img
                    src={project.image!}
                    alt={project.imageAlt!}
                    className="absolute left-[-6.575%] top-0 w-[113.15%] h-full object-fill pointer-events-none select-none"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={project.image!}
                      alt={project.imageAlt!}
                      className="w-[82%] aspect-[686.669/386.25] object-contain pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* More Builds */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 md:px-12 py-24 md:py-0">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12">
          <h2 className="font-gilroyBold text-4xl text-text_primary md:text-5xl">
            <HighlightBox className="overflow-hidden inline-flex">
              <motion.span
                initial={{ y: "105%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block will-change-transform"
              >
                More Builds
              </motion.span>
            </HighlightBox>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { title: "Ghost Scouter", desc: "Automated job hunting and resume crafting engine.", link: "https://github.com/ghost-scouter" },
              { title: "Sarthi", desc: "Minimalist navigation aid for public transit.", link: "https://github.com/sarthi" },
              { title: "Shift", desc: "Focus orchestrator with Pomodoro and time-blocking.", link: "https://github.com/shift" },
              { title: "Kindly.ai", desc: "Empathy-driven AI assistant for customer support.", link: "https://github.com/kindly-ai" },
            ].map((build, i) => (
              <motion.a
                href={build.link}
                target="_blank"
                rel="noopener noreferrer"
                key={build.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col gap-2 rounded-lg border border-text_primary/10 bg-white/30 p-6 transition-colors hover:bg-white/60"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-gilroyBold text-xl text-text_primary">{build.title}</h3>
                  <span className="text-text_primary/40 transition-transform group-hover:translate-x-1 group-hover:text-text_primary">↗</span>
                </div>
                <p className="text-sm text-text_primary/70">{build.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />

    </main>
  );
}
