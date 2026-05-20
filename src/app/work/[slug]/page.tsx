"use client";

import { motion } from "framer-motion";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <main className="min-h-screen w-full bg-bg font-gilroyRegular text-text_primary selection:bg-accent_highlight selection:text-text_primary no-scrollbar">
      {/* Navigation */}
      <div className="mx-auto max-w-3xl px-6 pt-12">
        <Link href="/work" className="group inline-flex items-center gap-2 text-sm font-gilroyBold text-text_primary/60 transition-colors hover:text-text_primary">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col gap-8"
        >
          {/* Massive title using highlight token color */}
          <h1 className="font-gilroyBold text-6xl tracking-tight text-accent_highlight capitalize md:text-8xl drop-shadow-sm">
            {resolvedParams.slug.replace(/-/g, ' ')}
          </h1>
          
          {/* Full-bleed abstract geometric CSS banner */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-text_primary/10 bg-text_primary/5 mb-16">
             <div className="absolute inset-0 transition-transform duration-1000 hover:scale-105"
                  style={{ backgroundImage: 'radial-gradient(circle at 4px 4px, rgba(42, 71, 86, 0.1) 2px, transparent 0)', backgroundSize: '32px 32px' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-32 w-32 rotate-45 rounded-xl border border-accent_highlight/50 bg-accent_highlight/20 shadow-[0_0_40px_rgba(162,249,145,0.3)] backdrop-blur-md"></div>
                   <div className="absolute h-48 w-48 -rotate-12 rounded-full border border-text_primary/10 bg-white/30 backdrop-blur-lg mix-blend-overlay"></div>
                </div>
             </div>
          </div>
        </motion.header>

        {/* The Brief */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          {/* 2-column split layout */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 border-t border-text_primary/10 pt-12">
            {/* Left: Role, Timeline, Tools */}
            <div className="flex flex-col gap-6 md:col-span-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-gilroyBold tracking-widest text-text_primary/50 uppercase">Role</span>
                <span className="font-medium text-text_primary/80">Design Engineer</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-gilroyBold tracking-widest text-text_primary/50 uppercase">Timeline</span>
                <span className="font-medium text-text_primary/80">6 Weeks</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-gilroyBold tracking-widest text-text_primary/50 uppercase">Tools</span>
                <span className="font-medium text-text_primary/80">Next.js, Tailwind, Framer Motion</span>
              </div>
            </div>
            
            {/* Right: The Core Problem */}
            <div className="flex flex-col gap-4 md:col-span-8">
              <h2 className="font-gilroyBold text-2xl text-text_primary">The Core Problem</h2>
              {/* Slightly larger text for problem statement */}
              <p className="text-xl text-text_primary/80 leading-relaxed font-satoshi">
                When starting this project, the core challenge was bridging the gap between a highly complex backend architecture and a user interface that felt effortlessly simple. Users were consistently overwhelmed by data density.
              </p>
            </div>
          </div>
        </motion.section>

        {/* The Solution */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="mb-6 font-gilroyBold text-3xl text-text_primary">The Solution</h2>
          <div className="mb-10 flex flex-col gap-4 text-lg text-text_primary/80 leading-relaxed font-satoshi">
            <p>
              We approached the UI with a strict subtractive mindset. Every border, color fill, and shadow had to justify its existence. By implementing a cohesive token system and relying on spatial grouping instead of explicit bounding boxes, the interface immediately felt lighter.
            </p>
          </div>
          
          {/* Interactive Prototypes Placeholder */}
          <div className="aspect-video w-full rounded-xl border border-text_primary/10 bg-white/40 p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-white/60 transition-colors shadow-sm">
             <div className="flex flex-col items-center gap-3 transition-transform duration-500 group-hover:scale-105">
                <div className="h-16 w-16 rounded-full border-2 border-accent_highlight flex items-center justify-center shadow-inner bg-white">
                   <div className="h-6 w-6 rounded-full bg-text_primary/80"></div>
                </div>
                <span className="font-gilroyBold text-sm tracking-widest text-text_primary/50 uppercase">Interactive Prototype</span>
             </div>
          </div>
        </motion.section>

        {/* Engineering Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="mb-6 font-gilroyBold text-3xl text-text_primary">Engineering Architecture</h2>
          <div className="flex flex-col gap-4 text-lg text-text_primary/80 leading-relaxed font-satoshi">
            <p>
              On the engineering side, performance was paramount. We utilized Next.js App Router to aggressively cache static segments while streaming dynamic UI components via React Suspense. 
            </p>
            <p>
              State management was handled optimistically, ensuring the interface felt instant even when network latency was high. Framer Motion was employed strictly for layout transitions and subtle orchestrations, maintaining a buttery 60fps across the board.
            </p>
          </div>
        </motion.section>

        {/* Outcomes */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="mb-6 font-gilroyBold text-3xl text-text_primary">Impact & Outcomes</h2>
          <ul className="flex flex-col gap-4 text-lg text-text_primary/80 leading-relaxed font-satoshi pl-2">
            <li className="flex gap-4 items-start">
              <span className="mt-2 h-2 w-2 rounded-full bg-accent_highlight shrink-0"></span>
              <span><strong>40% Increase in conversion:</strong> Reduced friction in the primary user flow resulting in a significant bump in completed transactions.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-2 h-2 w-2 rounded-full bg-accent_highlight shrink-0"></span>
              <span><strong>-2.1s Reduction in TTI:</strong> Optimistic UI and aggressive caching drastically lowered the time-to-interactive metric.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-2 h-2 w-2 rounded-full bg-accent_highlight shrink-0"></span>
              <span><strong>100 Lighthouse Score:</strong> Fully optimized asset delivery, typography, and contrast accessibility for maximum performance.</span>
            </li>
          </ul>
        </motion.section>
      </article>
      
      {/* Footer */}
      <div className="mx-auto w-full max-w-3xl px-6">
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex w-full justify-between border-t border-dashed border-text_primary/40 pt-8 pb-16 text-sm font-gilroyBold"
        >
          <nav className="flex gap-8">
            <Link href="/about" className="hover:opacity-70 transition-opacity">About me</Link>
            <Link href="/other-things" className="hover:opacity-70 transition-opacity">Other things</Link>
            <Link href="/hire-me" className="hover:opacity-70 transition-opacity">Contact</Link>
          </nav>
          <p className="font-gilroyRegular text-text_primary/40">© 2026 | Divyansh Baghel.</p>
        </motion.footer>
      </div>
    </main>
  );
}
