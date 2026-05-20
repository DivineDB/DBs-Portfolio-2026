"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { HighlightBox } from "@/components/hire-me/highlight-box";

export default function WorkPage() {
  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-bg font-gilroyRegular text-text_primary no-scrollbar">
      
      {/* Hero Section */}
      <section className="relative flex h-screen w-full snap-start flex-col items-center justify-center px-6 md:px-12">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-gilroyBold text-6xl tracking-tight text-text_primary md:text-8xl"
          >
            <HighlightBox>Selected Work</HighlightBox>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl text-lg text-text_primary/70 md:text-xl"
          >
            A collection of interfaces and architectures. Bridging the gap between high-fidelity design systems and production-ready code.
          </motion.p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text_primary/50">
          <span className="font-gilroyBold text-xs tracking-[0.2em] uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} strokeWidth={1.5} />
          </motion.div>
        </div>
      </section>

      {/* Featured Project 1: Scout */}
      <section className="relative flex h-screen w-full snap-start flex-col justify-center px-6 md:px-12">
        <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <p className="font-gilroyBold text-sm tracking-wide text-text_primary/50 uppercase">AI-NATIVE PIPELINE</p>
            <h2 className="font-gilroyBold text-4xl text-text_primary md:text-5xl">Scout</h2>
            <p className="text-lg text-text_primary/70">
              An automated intelligence engine that autonomously crawls raw data and maps listings into context-aware verticals.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Next.js', 'Groq', 'TypeScript'].map(tag => (
                <span key={tag} className="rounded-full border border-text_primary/10 px-4 py-1.5 text-sm text-text_primary/60">
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-4">
               <Link href="/work/scout" className="group inline-flex items-center gap-2 font-gilroyBold text-text_primary transition-opacity hover:opacity-70">
                 Read Case Study
                 <span className="transition-transform group-hover:translate-x-1">→</span>
               </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded border border-text_primary/10 bg-text_primary/5 lg:col-span-7"
          >
            {/* Abstract geometric visual */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
               <div className="relative h-64 w-64">
                 <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-accent_highlight/40 mix-blend-multiply blur-2xl filter transition-transform group-hover:translate-x-4"></div>
                 <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-text_primary/10 mix-blend-multiply blur-2xl filter transition-transform group-hover:-translate-x-4"></div>
                 <div className="absolute inset-8 rounded-lg border border-text_primary/15 bg-white/40 backdrop-blur-sm shadow-xl flex items-center justify-center">
                    <div className="flex flex-col gap-3 w-full px-6">
                       <div className="h-3 w-3/4 rounded bg-text_primary/20"></div>
                       <div className="h-3 w-1/2 rounded bg-text_primary/10"></div>
                       <div className="h-3 w-5/6 rounded bg-text_primary/10"></div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Project 2: POS Panel */}
      <section className="relative flex h-screen w-full snap-start flex-col justify-center px-6 md:px-12">
        <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <p className="font-gilroyBold text-sm tracking-wide text-text_primary/50 uppercase">RETAIL DASHBOARD</p>
            <h2 className="font-gilroyBold text-4xl text-text_primary md:text-5xl">POS Panel</h2>
            <p className="text-lg text-text_primary/70">
              A high-density dashboard engineered to reduce cognitive fatigue for retail workers, featuring Optimistic UI patterns.
            </p>
            <div className="pt-4">
               <Link href="/work/pos-panel" className="group inline-flex items-center gap-2 font-gilroyBold text-text_primary transition-opacity hover:opacity-70">
                 Read Case Study
                 <span className="transition-transform group-hover:translate-x-1">→</span>
               </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded border border-text_primary/10 bg-text_primary/5 lg:col-span-7"
          >
            {/* Abstract geometric visual dot-matrix UI */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(42, 71, 86, 0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
               <div className="absolute inset-0 flex flex-col p-8 gap-4 items-center justify-center">
                  <div className="w-full max-w-[300px] bg-white/60 backdrop-blur-md border border-text_primary/10 p-4 rounded-lg shadow-lg flex justify-between items-center">
                     <div className="h-4 w-16 bg-text_primary/20 rounded"></div>
                     <div className="h-6 w-12 bg-accent_highlight rounded border border-text_primary/10 shadow-inner"></div>
                  </div>
                  <div className="w-full max-w-[300px] bg-white/60 backdrop-blur-md border border-text_primary/10 p-4 rounded-lg shadow-lg flex justify-between items-center opacity-80 translate-x-4">
                     <div className="h-4 w-24 bg-text_primary/20 rounded"></div>
                     <div className="h-6 w-12 bg-accent_highlight rounded border border-text_primary/10 shadow-inner"></div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Builds */}
      <section className="relative flex h-screen w-full snap-start flex-col items-center justify-center px-6 md:px-12">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-gilroyBold text-4xl text-text_primary md:text-5xl"
          >
            <HighlightBox>More Builds</HighlightBox>
          </motion.h2>

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

      {/* Footer */}
      <section className="relative flex min-h-[30vh] w-full snap-start flex-col justify-end px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1000px]">
          <motion.footer
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full justify-between border-t border-dashed border-text_primary/40 pt-8 pb-12 text-sm font-gilroyBold"
          >
            <nav className="flex gap-8">
              <Link href="/about" className="hover:opacity-70 transition-opacity">About me</Link>
              <Link href="/other-things" className="hover:opacity-70 transition-opacity">Other things</Link>
              <Link href="/hire-me" className="hover:opacity-70 transition-opacity">Contact</Link>
            </nav>
            <p className="font-gilroyRegular text-text_primary/40">© 2026 | Divyansh Baghel.</p>
          </motion.footer>
        </div>
      </section>

    </main>
  );
}
