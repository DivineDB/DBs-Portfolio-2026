"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";
import { HighlightBox } from "@/components/hire-me/highlight-box";
import PageFooter from "@/components/PageFooter";
import InteractiveBackgroundCanvas from "@/components/InteractiveBackgroundCanvas";

export default function WorkPage() {
	return (
		<main className="relative min-h-screen w-full bg-bg font-gilroyRegular text-text_primary flex flex-col justify-between overflow-x-hidden">
			{/* Ambient canvas */}
			<InteractiveBackgroundCanvas />

			{/* Center Board */}
			<div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-20">
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="w-full max-w-[450px] rounded-3xl md:rounded-[32px] bg-[#FFFDF0]/55 backdrop-blur-md border border-[#EADFC3]/80 p-8 md:p-12 shadow-lg shadow-[#2A4756]/5 text-center flex flex-col items-center"
				>
					{/* Pastel Lock icon container */}
					<div className="w-12 h-12 rounded-2xl bg-[#F8EDD1]/70 border border-[#EADFC3] flex items-center justify-center text-[#2A4756] mb-6 shadow-sm">
						<Lock size={18} strokeWidth={2} className="text-[#2A4756]" />
					</div>

					{/* Title */}
					<h1 className="font-gilroyBold text-4xl md:text-5xl tracking-tight text-[#2A4756] mb-2">
						Selected{" "}
						<HighlightBox className="py-0.5 px-3 ml-1">
							Work
						</HighlightBox>
					</h1>

					{/* Subtitle */}
					<p className="font-satoshi text-base text-[#2A4756]/65 mb-8">
						Coming Soon
					</p>

					{/* Back link */}
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2A4756] text-[#F8EDD1] text-xs font-gilroyBold tracking-wide transition-all hover:bg-[#2A4756]/90 active:scale-95 shadow-sm"
					>
						<ArrowLeft size={13} strokeWidth={2.2} />
						<span>Back to Home</span>
					</Link>
				</motion.div>
			</div>

			{/* Minimal Editorial Footer */}
			<div className="relative z-10 w-full">
				<PageFooter />
			</div>
		</main>
	);
}
