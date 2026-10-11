"use client";

import { motion } from "framer-motion";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Clock } from "lucide-react";
import InteractiveBackgroundCanvas from "@/components/InteractiveBackgroundCanvas";
import PageFooter from "@/components/PageFooter";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const formattedTitle = resolvedParams.slug.replace(/-/g, " ");

  return (
    <main className="relative min-h-screen w-full bg-bg font-gilroyRegular text-text_primary flex flex-col justify-between overflow-x-hidden selection:bg-accent_highlight selection:text-text_primary">
      <InteractiveBackgroundCanvas />

      {/* Navigation */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-12">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-gilroyBold text-text_primary/60 transition-colors hover:text-text_primary"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Selected Work
        </Link>
      </div>

      {/* Main Locked Notice */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[620px] rounded-3xl bg-[#FFFDF5]/80 backdrop-blur-xl border border-[#EADFC3] p-8 md:p-12 shadow-xl shadow-[#2A4756]/5 text-center flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#F8EDD1] border border-[#EADFC3] flex items-center justify-center text-[#2A4756] shadow-inner mb-6">
            <Lock size={22} strokeWidth={2} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A2F991]/30 border border-[#A2F991]/60 text-[#2A4756] text-[11px] font-satoshi font-semibold uppercase tracking-wider mb-4">
            Case Study Restricted
          </div>

          <h1 className="font-gilroyBold text-3xl md:text-4xl text-[#2A4756] tracking-tight capitalize mb-4">
            {formattedTitle}
          </h1>

          <p className="font-satoshi text-sm md:text-base text-[#2A4756]/70 leading-relaxed max-w-md mb-8">
            This dossier and interactive case study breakdown are currently locked while under 2026 production curation.
          </p>

          <div className="flex items-center gap-2 text-xs font-satoshi text-[#2A4756]/60 mb-8">
            <Clock size={13} strokeWidth={2} className="text-amber-600" />
            <span>Scheduled Release: <strong>Q4 2026</strong></span>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2A4756] text-[#F8EDD1] text-xs font-gilroyBold tracking-wide transition-all hover:bg-[#2A4756]/90 active:scale-95 shadow-sm"
          >
            <ArrowLeft size={13} strokeWidth={2.2} />
            <span>Return to Work Index</span>
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        <PageFooter />
      </div>
    </main>
  );
}
