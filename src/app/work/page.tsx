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
		industry: ["Retail Tech"],
		readTime: "8 min read",
		timeline: "6 weeks",
		description:
			"A touchscreen optimized register and analytics dashboard built for convenience store operations. It features fast checkout, real-time inventory sync, and zero log loss.",
		image: "/images/Pos.svg",
		imageAlt: "BreezePOS Order Register Workspace",
		imageBg: "#9AD8B6",
		wip: false,
	},
	{
		id: "scout",
		index: "02",
		title: "Scout Engine",
		highlight: "Scout",
		rest: " Engine",
		subtitle: "Autonomous Job Hunting Tool",
		year: "2026",
		role: "Systems Design",
		industry: ["Automation", "Utility tool"],
		readTime: "12 min read",
		timeline: "10 weeks",
		description:
			"An intelligence engine that crawls raw commercial job listings, runs categorization LLMs, and maps listing schemas into context-aware verticals.",
		image: "/images/Scout.svg",
		imageAlt: "Scout Engine Data Intelligence Console",
		imageBg: "#A7D4D7",
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
						A collection of my work done on interfaces and architectures.
					</motion.p>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: scrolled ? 0 : 1,
						pointerEvents: scrolled ? "none" : "auto",
					}}
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
			<section className="px-6 md:px-12 pb-24">
				<div className="mx-auto max-w-[1000px] flex flex-col divide-y divide-text_primary/10">
					{PROJECTS.map((project, i) => (
						<motion.article
							key={project.id}
							id={`project-${project.index}`}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "0px 0px -10% 0px" }}
							transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
							className="group/article flex flex-col w-full py-12 md:py-16 gap-5 border-t border-text_primary/10 first:border-t-0"
					>
							{/* ── Row 1: Title and Meta ── */}
							<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
								<h2 className="font-gilroyBold text-3xl md:text-4xl text-text_primary tracking-tight leading-none flex items-center flex-wrap gap-x-2">
									<HighlightBox className="py-1 px-3 shrink-0 text-inherit">
										{project.highlight}
									</HighlightBox>
									<span>{project.rest}</span>
								</h2>
								<div className="flex flex-wrap items-center gap-2 md:gap-3 font-satoshi text-[13px] md:text-sm text-about_body/80">
									{project.industry.map((ind, idx) => (
										<span key={idx} className="font-medium bg-text_primary/5 px-3.5 py-1.5 rounded-full">{ind}</span>
									))}
									<span className="flex items-center gap-1.5 bg-text_primary/5 px-3.5 py-1.5 rounded-full">
										<span className="text-[13px]">⏱️</span>
										<span className="font-medium">{project.readTime}</span>
									</span>
								</div>
							</div>

							{/* ── Row 2: Image only ── */}
							<div
								className="w-full rounded-[28px] overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.005] flex items-center justify-center"
								onClick={() => router.push(`/work/${project.id}`)}
								title={project.imageAlt ?? undefined}
							>
								<img
									src={project.image!}
									alt={project.imageAlt!}
									className="w-full h-auto object-cover pointer-events-none select-none transition-transform duration-700 group-hover/article:scale-[1.015]"
									draggable={false}
								/>
							</div>

							{/* ── Row 3: Description + CTA ── */}
							<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
								{/* Left: description */}
								<p className="font-satoshi text-sm md:text-base text-about_body leading-relaxed max-w-xl">
									{project.description}
								</p>

								{/* Right: CTA */}
								<div className="flex flex-col items-start sm:items-end shrink-0">
									<Link
										href={`/work/${project.id}`}
										className="group inline-flex items-center justify-center px-6 py-3 md:py-3.5 md:px-8 rounded-full text-sm md:text-[15px] font-gilroyMedium bg-[#2C3437] text-white transition-all hover:scale-[1.02] active:scale-95"
									>
										<span>Read case study</span>
									</Link>
								</div>
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
							{
								title: "AI Accessibility Checker",
								desc: "A tool that checks the accessibility of websites.",
								link: "https://github.com/DivineDB/AI-Accessibility-Checker",
							},
							{
								title: "Sarthi",
								desc: "Minimalist navigation aid for public transit.",
								link: "https://github.com/sarthiscsc/fg",
							},
							{
								title: "Shift",
								desc: "Focus orchestrator with Pomodoro and time-blocking.",
								link: "https://github.com/DivineDB/focus-orchestrator",
							},
							{
								title: "Kindly.ai",
								desc: "Empathy-driven AI assistant for customer support.",
								link: "https://github.com/kindly-ai/gdgs",
							},
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
									<h3 className="font-gilroyBold text-xl text-text_primary">
										{build.title}
									</h3>
									<span className="text-text_primary/40 transition-transform group-hover:translate-x-1 group-hover:text-text_primary">
										↗
									</span>
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
