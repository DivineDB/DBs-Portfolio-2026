"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
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
	ArrowRight,
	ArrowUpRight,
	X,
	Hash,
} from "lucide-react";
import PageFooter from "@/components/PageFooter";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
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
	{ id: "architecture", label: "Systems" },
	{ id: "schema", label: "Database" },
	{ id: "api", label: "API Reference" },
];

interface MockupProps {
	isZoomed?: boolean;
}

function Mockup1() {
	return (
		<div className="w-full overflow-hidden rounded-xl border border-white/5 shadow-lg bg-[#0c0d0e] p-6 text-white text-left select-none">
			<div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded-full bg-red-500" />
					<div className="w-3 h-3 rounded-full bg-yellow-500" />
					<div className="w-3 h-3 rounded-full bg-green-500" />
					<span className="text-xs text-white/50 ml-2 font-mono">
						scout.dev/dashboard
					</span>
				</div>
				<div className="px-3 py-1 rounded bg-[#10b981]/15 text-[#10b981] text-[10px] font-gilroyBold tracking-widest uppercase">
					Obsidian Mint
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Left Lane: Casual Hunt */}
				<div className="bg-[#121416] p-4 rounded-xl border border-white/5 flex flex-col gap-3">
					<div className="flex justify-between items-center pb-2 border-b border-white/5">
						<span className="text-xs font-gilroyBold text-white/60 uppercase">
							Casual Hunt Queue
						</span>
						<span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40">
							3 Auto-Swept
						</span>
					</div>

					{[
						{ role: "Senior Frontend Engineer", comp: "Stripe", score: 94 },
						{ role: "Product Developer", comp: "Vercel", score: 88 },
						{ role: "Fullstack Architect", comp: "Linear", score: 72 },
					].map((item, i) => (
						<div
							key={i}
							className="bg-[#17191d] p-3 rounded-lg border border-white/[0.03] flex items-center justify-between"
						>
							<div>
								<div className="text-xs font-gilroyBold">{item.role}</div>
								<div className="text-[10px] text-white/40">
									{item.comp} · Remote
								</div>
							</div>
							<div className="text-xs font-gilroyBold px-2 py-1 rounded bg-[#10b981]/10 text-[#10b981]">
								{item.score}%
							</div>
						</div>
					))}
				</div>

				{/* Right Lane: Serious Mode */}
				<div className="bg-[#121416] p-4 rounded-xl border border-white/5 flex flex-col gap-3">
					<div className="flex justify-between items-center pb-2 border-b border-white/5">
						<span className="text-xs font-gilroyBold text-[#10b981] uppercase">
							Serious Mode Applications
						</span>
						<span className="text-[10px] bg-[#10b981]/10 px-2 py-0.5 rounded text-[#10b981]">
							1 Active
						</span>
					</div>

					<div className="bg-[#17191d] p-3 rounded-lg border border-[#10b981]/20 flex items-center justify-between">
						<div>
							<div className="text-xs font-gilroyBold text-white">
								Design Engineer
							</div>
							<div className="text-[10px] text-white/40">
								SupaBase · SF / Hybrid
							</div>
						</div>
						<div className="flex gap-2">
							<span className="text-[8px] bg-[#10b981]/15 text-[#10b981] px-2 py-1 rounded font-gilroyBold uppercase">
								Distilled
							</span>
							<span className="text-[8px] bg-blue-500/15 text-blue-400 px-2 py-1 rounded font-gilroyBold uppercase">
								Applied
							</span>
						</div>
					</div>

					<div className="flex-1 border border-dashed border-white/10 rounded-lg flex items-center justify-center p-6 text-white/30 text-[10px] font-mono">
						Drag here to promote to Serious Mode
					</div>
				</div>
			</div>
		</div>
	);
}

function Mockup2({ isZoomed = false }: MockupProps) {
	return (
		<div className="w-full overflow-hidden rounded-xl border border-white/5 shadow-lg bg-[#0c0d0e] p-6 text-white text-left select-none relative">
			{/* Floating Notification Pill */}
			<div
				className={`absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-[#10b981] text-[#0c0d0e] px-4 py-2 rounded-full shadow-lg border border-white/20 z-10 ${isZoomed ? "" : "animate-bounce"}`}
			>
				<span className="relative flex h-2.5 w-2.5">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
					<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0c0d0e]" />
				</span>
				<span className="font-gilroyBold text-[10px] uppercase tracking-wider">
					4 sweeps pending merge — click to stage
				</span>
			</div>

			<div
				className={`mt-8 transition-all duration-300 ${isZoomed ? "opacity-100 filter-none" : "opacity-40 filter blur-[1px]"}`}
			>
				<div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-red-500" />
						<div className="w-3 h-3 rounded-full bg-yellow-500" />
						<div className="w-3 h-3 rounded-full bg-green-500" />
						<span className="text-xs text-white/50 ml-2 font-mono">
							scout.dev/sweeps
						</span>
					</div>
					{isZoomed && (
						<span className="text-[9px] text-[#10b981] font-mono">
							Query: &quot;Next.js&quot; + &quot;San Francisco&quot; | Salary:
							&gt; $130k
						</span>
					)}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{
							title: "Staff Dev",
							company: "Greenhouse",
							stats: "Next.js · 94% Match",
						},
						{
							title: "AI Designer",
							company: "Greenhouse",
							stats: "Zustand · 88% Match",
						},
					].map((job, i) => (
						<div
							key={i}
							className="bg-[#121416] p-4 rounded-xl border border-white/5 flex flex-col gap-2"
						>
							<div className="text-xs font-gilroyBold">{job.title}</div>
							<div className="text-[10px] text-white/40">{job.company}</div>
							<div className="text-[9px] text-[#10b981]">{job.stats}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function Mockup3() {
	return (
		<div className="w-full overflow-hidden rounded-xl border border-white/5 shadow-lg bg-[#0c0d0e] p-6 text-white text-left select-none">
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2 bg-[#121416] p-2.5 rounded-lg border border-white/5">
					<span className="text-[10px] text-white/40 font-mono">
						Target URL:
					</span>
					<input
						type="text"
						value="https://lever.co/supabase/design-engineer-1092"
						readOnly
						className="bg-transparent text-xs font-mono text-[#10b981] outline-none flex-1"
					/>
					<button className="text-[10px] font-gilroyBold bg-[#10b981] text-[#0c0d0e] px-3 py-1 rounded cursor-pointer">
						Scout URL
					</button>
				</div>

				<div className="bg-[#121416] p-4 rounded-xl border border-[#10b981]/15 flex items-center justify-between gap-4">
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="text-xs font-gilroyBold">
								Design Engineer (Platform)
							</span>
							<span className="text-[8px] bg-[#10b981]/10 text-[#10b981] px-1.5 py-0.5 rounded">
								Scraped
							</span>
						</div>
						<p className="text-[10px] text-white/50 mt-1 leading-relaxed">
							Groq analysis successfully run via Llama 3.3. Visa sponsoring
							matches user requirements.
						</p>
					</div>
					<div className="flex flex-col items-center gap-1">
						<div className="text-2xl font-gilroyBold text-[#10b981]">92%</div>
						<div className="text-[8px] uppercase tracking-widest text-white/40 font-gilroyBold">
							Suitability
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Mockup4() {
	return (
		<div className="w-full overflow-hidden rounded-xl border border-white/5 shadow-lg bg-[#0c0d0e] p-6 text-white text-left select-none">
			<div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
				<div className="sm:col-span-7 flex flex-col gap-3 font-mono text-[10px] text-white/70">
					<div className="pb-2 border-b border-white/10 text-white font-gilroyBold text-xs">
						Dynamic Bullet point re-order
					</div>
					<div className="bg-[#121416] p-2.5 rounded border border-yellow-500/20 text-yellow-200">
						Target Stack: Next.js Server Actions, Zustand
					</div>
					<div className="flex items-start gap-2 text-white/50 leading-relaxed">
						<span className="text-[#10b981]">↗</span>
						<span>
							Migrated context workflows to Zustand stores to handle offline
							database sync states.
						</span>
					</div>
					<div className="flex items-start gap-2 leading-relaxed">
						<span className="text-[#10b981]">✔</span>
						<span>
							Configured Next.js server actions to trigger real-time
							notification alerts. (Morphed to top)
						</span>
					</div>
				</div>
				<div className="sm:col-span-5 flex flex-col items-center gap-3">
					<div className="w-24 aspect-[1/1.4] bg-white border border-white/10 shadow-md rounded p-2 flex flex-col gap-1 select-none">
						<div className="h-1.5 w-1/2 bg-black/60 rounded" />
						<div className="h-1 w-full bg-black/10 rounded" />
						<div className="h-1 w-5/6 bg-black/10 rounded" />
						<div className="h-1 w-3/4 bg-black/35 rounded" />
						<div className="h-1 w-full bg-black/10 rounded" />
					</div>
					<button className="text-[10px] font-gilroyBold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 px-3 py-1 rounded cursor-pointer">
						Generate Tailored PDF
					</button>
				</div>
			</div>
		</div>
	);
}

function Mockup5() {
	return (
		<div className="w-full overflow-hidden rounded-xl border border-white/5 shadow-lg bg-[#0c0d0e] p-6 text-white text-left select-none">
			<div className="flex flex-col gap-3 font-mono text-[10px]">
				<div className="flex justify-between items-center pb-2 border-b border-white/10">
					<span className="font-gilroyBold text-xs text-red-400">
						Shield Warning: 68% Match
					</span>
					<span className="text-[8px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded uppercase font-gilroyBold">
						Gaps Detected
					</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="bg-[#121416] p-3 rounded border border-red-500/10">
						<div className="font-gilroyBold text-[#10b981] mb-1">
							Identified Skill Gaps
						</div>
						<ul className="list-disc list-inside text-white/60 space-y-1">
							<li>GraphQL Subscriptions</li>
							<li>Docker containers orchestration</li>
						</ul>
					</div>
					<div className="bg-[#121416] p-3 rounded border border-yellow-500/10">
						<div className="font-gilroyBold text-yellow-400 mb-1">
							Objection-Handling Strategy
						</div>
						<p className="text-white/60 leading-relaxed">
							Highlight Zustand/Supabase Realtime experience and outline basic
							Docker orchestration knowledge.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function TerminalSimulator() {
	const [logs, setLogs] = useState<string[]>([]);
	const [isSimulating, setIsSimulating] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [logs]);

	const logQueue = [
		"[system] Initializing Ghost Sweep daemon worker...",
		"[crawler] Scraping job listings across Greenhouse, Lever, and RemoteOK...",
		"[crawler] Found 3 new job postings matching user parameters.",
		"[Groq 8B] Classifying Job 1: Design Engineer @ Supabase (Salary: $140k, Visa: Yes) -> PASS (92%)",
		"[Groq 8B] Classifying Job 2: backend developer @ LegacyCorp (Fails remote criteria) -> FAIL (45%)",
		"[Groq 8B] Classifying Job 3: React Lead @ Stealth (Matches frontend stack) -> PASS (78%)",
		"[Groq 70B] Extracting requirements & generating objection shield vectors for Job 1...",
		"[Groq 70B] Crafting cold templates for Email and LinkedIn outreaches...",
		"[Supabase] Syncing... 2 high-score listings committed to Postgres staging queue.",
		"[Resend] Unicorn Alert: Dispatching high-priority HTML summary to candidate inbox.",
		"[system] Sweep cycle completed. 2 jobs cached in Realtime queue.",
	];

	const triggerSimulation = () => {
		if (isSimulating) return;
		setIsSimulating(true);
		setLogs([]);
		let currentIdx = 0;

		const interval = setInterval(() => {
			if (currentIdx < logQueue.length) {
				const nextLog = logQueue[currentIdx];
				if (nextLog) {
					setLogs((prev) => [...prev, nextLog]);
				}
				currentIdx++;
			} else {
				clearInterval(interval);
				setIsSimulating(false);
			}
		}, 900);
	};

	return (
		<div className="w-full bg-[#0d0e11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-mono text-[11px] md:text-xs text-white/90">
			<div className="bg-[#14161b] px-4 py-3 flex items-center justify-between border-b border-white/5">
				<div className="flex items-center gap-2">
					<div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
					<div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
					<div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
					<span className="text-white/50 text-[10px] ml-2 select-none">
						ghost_sweep_daemon.sh
					</span>
				</div>
				<span className="text-[10px] text-[#10b981] font-bold select-none">
					STATUS: ACTIVE
				</span>
			</div>
			<div
				ref={containerRef}
				className="p-4 h-60 overflow-y-auto no-scrollbar flex flex-col gap-2 bg-[#0a0b0d]"
			>
				{logs.length === 0 ? (
					<div className="text-white/40 italic flex flex-col items-center justify-center h-full select-none">
						Click &apos;Trigger Ghost Sweep&apos; below to simulate the AI
						parser daemon...
					</div>
				) : (
					logs.map((log, index) => {
						if (!log) return null;
						let color = "text-white/70";
						if (log.startsWith("[system]")) color = "text-yellow-400/90";
						else if (log.includes("PASS")) color = "text-[#10b981]";
						else if (log.includes("FAIL")) color = "text-red-400/90";
						else if (log.startsWith("[Resend]")) color = "text-purple-400";

						return (
							<div key={index} className={`leading-relaxed ${color}`}>
								<span className="text-white/30 mr-1.5 select-none">&gt;</span>
								{log}
							</div>
						);
					})
				)}
			</div>
			<div className="bg-[#14161b] px-4 py-3 border-t border-white/5 flex items-center justify-between">
				<button
					onClick={triggerSimulation}
					disabled={isSimulating}
					className={`px-4 py-2 rounded-lg text-[10px] font-gilroyBold tracking-wider uppercase transition-all ${
						isSimulating
							? "bg-white/10 text-white/30 cursor-not-allowed"
							: "bg-[#10b981] text-[#0a0b0d] hover:bg-[#10b981]/80 cursor-pointer shadow-md active:scale-95"
					}`}
				>
					{isSimulating ? "Crawling ATS feeds..." : "Trigger Ghost Sweep"}
				</button>
				<span className="text-[9px] text-white/30 select-none">
					Next.js 16 Cron Daemon
				</span>
			</div>
		</div>
	);
}

export default function ScoutCaseStudy() {
	const { scrollYProgress } = useScroll();
	const [activeSection, setActiveSection] = useState("hero");
	const [isHovered, setIsHovered] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
	const [activeImage, setActiveImage] = useState<string | null>(null);
	const [activeMockupId, setActiveMockupId] = useState<string | null>(null);
	const lenis = useLenis();
	const isManualScrolling = useRef(false);

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	const scrollToTop = () => {
		if (lenis) {
			lenis.scrollTo(0);
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// Prevent background scrolling when lightbox is active
	useEffect(() => {
		if (activeImage || activeMockupId) {
			document.body.style.overflow = "hidden";
			if (lenis) lenis.stop();
		} else {
			document.body.style.overflow = "";
			if (lenis) lenis.start();
		}
		return () => {
			document.body.style.overflow = "";
			if (lenis) lenis.start();
		};
	}, [activeImage, activeMockupId, lenis]);

	// Ensure the page always starts at the top when navigated to
	const hasResetScroll = useRef(false);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		if (lenis && !hasResetScroll.current) {
			hasResetScroll.current = true;
			lenis.scrollTo(0, { immediate: true });
		}
	}, [lenis]);

	useEffect(() => {
		const handleScroll = () => setShowScrollTop(window.scrollY > 500);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);

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
					},
				});
			} else {
				const offset = 80;
				const bodyRect = document.body.getBoundingClientRect().top;
				const elementRect = el.getBoundingClientRect().top;
				const elementPosition = elementRect - bodyRect;
				const offsetPosition = elementPosition - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
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
		<main className="min-h-screen bg-[#0a0b0d] text-[#e2e8f0] font-gilroyRegular antialiased pb-16">
			{/* ── STYLISH APPLE-AESTHETIC SCROLLBAR ── */}
			<div
				className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block cursor-pointer select-none"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<motion.div
					animate={{
						width: isHovered ? 146 : 8,
						height: isHovered ? 380 : 160,
						backgroundColor: isHovered
							? "rgba(13, 14, 18, 0.95)"
							: "rgba(13, 14, 18, 0)",
						backdropFilter: isHovered ? "blur(20px)" : "blur(0px)",
						borderColor: isHovered
							? "rgba(255, 255, 255, 0.08)"
							: "rgba(255, 255, 255, 0)",
						boxShadow: isHovered
							? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)"
							: "0 0px 0px rgba(0,0,0,0)",
					}}
					transition={{
						type: "spring",
						stiffness: 220,
						damping: 28,
						mass: 0.6,
					}}
					className="rounded-2xl border border-transparent flex flex-col justify-center items-center relative overflow-hidden"
				>
					{/* Inactive Mode: Minimal Progress Bar */}
					<motion.div
						animate={{
							opacity: isHovered ? 0 : 1,
							pointerEvents: isHovered ? "none" : "auto",
						}}
						transition={{
							duration: isHovered ? 0.15 : 0.18,
							delay: isHovered ? 0 : 0.12,
							ease: "easeOut",
						}}
						className="absolute inset-0 flex flex-col justify-center items-center py-4"
					>
						<div className="w-[1.5px] h-[120px] bg-white/15 rounded-full relative overflow-hidden">
							<motion.div
								style={{ scaleY: scrollYProgress, originY: 0 }}
								className="absolute top-0 left-0 w-full h-full bg-[#10b981] rounded-full"
							/>
						</div>
					</motion.div>

					{/* Active Hover Mode: Table of Contents */}
					<motion.div
						animate={{
							opacity: isHovered ? 1 : 0,
							pointerEvents: isHovered ? "auto" : "none",
						}}
						transition={{
							duration: isHovered ? 0.2 : 0.12,
							ease: "easeOut",
						}}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[146px] h-[380px] flex flex-col justify-between py-6 px-4 shrink-0"
					>
						{/* Background vertical connector line behind dots */}
						<div className="absolute right-[22px] top-7 bottom-7 w-[1px] bg-white/5 -z-10" />

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
										opacity: {
											duration: 0.25,
											delay: isHovered ? index * 0.015 : 0,
											ease: "easeOut",
										},
										x: {
											type: "spring",
											stiffness: 200,
											damping: 25,
											delay: isHovered ? index * 0.015 : 0,
										},
									}}
									className={`text-[9px] font-gilroyBold uppercase tracking-wider transition-colors duration-200 ${
										activeSection === section.id
											? "text-white font-bold"
											: "text-white/40 group-hover:text-white/75"
									}`}
								>
									{section.label}
								</motion.span>

								<div className="relative flex items-center justify-center w-3 h-3 flex-shrink-0">
									{/* Outer ring for active state */}
									{activeSection === section.id && (
										<motion.div
											layoutId="activeDotRingScout"
											className="absolute w-3.5 h-3.5 rounded-full border border-[#10b981]/50"
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 25,
											}}
										/>
									)}
									{/* Central Dot */}
									<div
										className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
											activeSection === section.id
												? "bg-[#10b981] scale-110"
												: "bg-white/25 group-hover:bg-[#10b981]/70"
										}`}
									/>
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>
			</div>

			{/* ── NAVIGATION HEADER ── */}
			<nav className="sticky top-0 z-50 w-full bg-[#0a0b0d]/80 backdrop-blur-md border-b border-white/10 shadow-lg">
				<div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
					<Link
						href="/work"
						className="group inline-flex items-center gap-2 text-sm font-gilroyBold text-white transition-opacity hover:opacity-75"
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
							className="p-2 rounded-full hover:bg-white/5 text-white/80 hover:text-white transition-colors"
							aria-label="Email"
							title="Email Divyansh Baghel"
						>
							<Mail size={18} strokeWidth={2} />
						</a>
						<a
							href="https://www.linkedin.com/in/divyansh-baghel/"
							target="_blank"
							className="p-2 rounded-full hover:bg-white/5 text-white/80 hover:text-white transition-colors"
							aria-label="LinkedIn"
							title="LinkedIn Profile"
						>
							<FaLinkedin size={18} />
						</a>
					</div>
				</div>
			</nav>

			{/* ── HERO HEADER SECTION ── */}
			<section
				id="hero"
				className="w-full min-h-[calc(100vh-76px)] relative overflow-hidden flex flex-col justify-center items-start py-20"
			>
				<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[300px] rounded-full bg-[#10b981]/10 blur-[150px] pointer-events-none -z-10" />

				<div className="max-w-5xl w-full mx-auto px-6">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="flex flex-col gap-6 md:gap-8"
					>
						<motion.div
							variants={fadeInUp}
							className="flex flex-wrap items-center gap-2 md:gap-3 font-satoshi text-[13px] md:text-sm text-white/80"
						>
							<span className="font-medium bg-white/10 px-3.5 py-1.5 rounded-full">
								AI System Design
							</span>
							<span className="font-medium bg-white/10 px-3.5 py-1.5 rounded-full">
								Autonomous Job Intelligence
							</span>
							<span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full">
								<span className="text-[13px]">⏱️</span>
								<span className="font-medium">12 Min Read</span>
							</span>
						</motion.div>

						<motion.h1
							variants={fadeInUp}
							className="text-5xl md:text-8xl font-gilroyBold tracking-tight leading-[0.95] text-white"
						>
							Scout Engine
						</motion.h1>

						<motion.p
							variants={fadeInUp}
							className="text-base md:text-xl font-gilroyRegular leading-relaxed text-white/80 max-w-3xl"
						>
							An autonomous recruiting agent that crawls ATS platforms, runs
							dual-stage LLM evaluation pipelines on Groq Cloud, and morphs
							resumes dynamically to eliminate job application friction.
						</motion.p>

						{/* Action buttons */}
						<motion.div
							variants={fadeInUp}
							className="flex flex-wrap items-center gap-4 mt-2"
						>
							<a
								href="https://github.com/DivineDB/Scout"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-gilroyBold bg-white text-black transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
							>
								<FaGithub size={16} />
								<span>Explore Scout Repository</span>
								<ExternalLink
									size={14}
									className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</a>

							<a
								href="https://scout-pink-nine.vercel.app"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-gilroyBold bg-[#10b981] text-[#0a0b0d] transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
							>
								<span>Launch Live Preview</span>
								<ExternalLink
									size={14}
									className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</a>
						</motion.div>

						{/* Case Study Metadata Grid */}
						<motion.div
							variants={fadeInUp}
							className="flex flex-wrap items-center gap-x-12 gap-y-4 mt-8 text-xs md:text-sm border-y border-white/10 py-4 w-full max-w-4xl"
						>
							{[
								{ label: "Role", value: "Design & Development" },
								{ label: "Timeline", value: "12 Weeks" },
								{ label: "Industry", value: "HR Tech (Developer Tool)" },
							].map((metric) => (
								<div key={metric.label} className="flex items-baseline gap-2">
									<span className="text-white text-[16px] font-gilroyBold uppercase tracking-wider">
										{metric.label}:
									</span>
									<span className="font-satoshi font-medium text-[15px] text-white/80">
										{metric.value}
									</span>
								</div>
							))}
						</motion.div>
					</motion.div>
				</div>

				{/* Scroll down indicator */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: [0, 1, 0], y: [0, 5, 0] }}
					transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-white/40 select-none z-10"
					onClick={() => {
						const el = document.getElementById("overview");
						if (el) el.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<span className="font-gilroyRegular text-[10px] uppercase tracking-[0.2em]">
						Scroll to start
					</span>
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						01. Executive Summary
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Project Overview
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						<div className="lg:col-span-6">
							<p className="font-gilroyRegular text-base md:text-lg leading-relaxed text-white/70">
								Modern job boards force candidates to parse through bloated
								formatting and irrelevant listings just to find basic details
								like salary caps, tech requirements, or visa sponsorship. Scout
								is a self-hosted command center designed to automate this entire
								research and preparation phase. By combining scheduler-driven
								scrapers, a dual-stage Groq LLM filter, and a dynamic PDF resume
								generator, Scout transforms the application process from manual
								grinding into surgical precision.
							</p>
						</div>

						{/* Embedded interactive terminal simulation */}
						<div className="lg:col-span-6">
							<TerminalSimulator />
						</div>
					</div>
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						02. Empathy &amp; Context
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						The Job Hunting Grind
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="font-gilroyRegular text-base md:text-lg leading-relaxed text-white/70 space-y-6 max-w-3xl">
						<p>
							Job hunting is notoriously exhausting. Engineers spend hours
							navigating multiple job boards (Google Jobs, LinkedIn, RemoteOK),
							filtering out roles that don&apos;t fit their salary bands or visa
							requirements, and tracking everything in massive, manually
							maintained spreadsheets.
						</p>
						<p>
							Worse yet, to satisfy Applicant Tracking Systems (ATS), candidates
							must meticulously alter their resume bullet points for every
							single application. High-intent outreach also requires writing
							custom cold emails and LinkedIn messages to hiring managers.
						</p>
						<p>
							I set out to build an autonomous agent that could handle the heavy
							lifting of research and preparation. It sweeps job boards,
							classifies matches against user preferences, extracts skill gaps,
							and prepares outreach hooks and customized PDF resumes on demand.
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						03. Field Observations
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Observations
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="space-y-12 max-w-3xl">
						<div className="relative pl-6 border-l-2 border-[#10b981]/30">
							<h4 className="font-gilroyBold text-xl md:text-2xl text-white mb-2">
								Manual parsing is a major time sink
							</h4>
							<p className="font-gilroyRegular text-base md:text-lg text-white/60 leading-relaxed">
								Candidates spend upwards of 75% of their search time parsing
								wall-of-text descriptions simply checking for blockers like
								missing visa sponsorship, remote location mismatch, or low
								salary ranges.
							</p>
						</div>
						<div className="relative pl-6 border-l-2 border-[#10b981]/30">
							<h4 className="font-gilroyBold text-xl md:text-2xl text-white mb-2">
								Resume tailoring is tedious and slow
							</h4>
							<p className="font-gilroyRegular text-base md:text-lg text-white/60 leading-relaxed">
								Tailoring bullet points to match the target stack is vital for
								ATS passing, but doing it manually per role is highly repetitive
								and slows down application rates to just 2–3 submittals per day.
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						04. Friction &amp; Blockers
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Friction &amp; Blockers
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
						<div className="p-6 md:p-8 bg-red-500/[0.02] border border-red-500/10 rounded-2xl flex flex-col justify-between shadow-sm">
							<div>
								<h4 className="font-gilroyBold text-xl text-white mb-3 flex items-center gap-2">
									<span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
									Cognitive Fatigue
								</h4>
								<p className="font-gilroyRegular text-base text-white/60 leading-relaxed">
									Visual clutter and repetitiveness across popular job boards
									dilute high-quality leads, leading to application burnout and
									reduced output quality.
								</p>
							</div>
						</div>
						<div className="p-6 md:p-8 bg-red-500/[0.02] border border-red-500/10 rounded-2xl flex flex-col justify-between shadow-sm">
							<div>
								<h4 className="font-gilroyBold text-xl text-white mb-3 flex items-center gap-2">
									<span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
									Lack of Preparation Context
								</h4>
								<p className="font-gilroyRegular text-base text-white/60 leading-relaxed">
									Candidates apply blindly without knowing where their skills
									gap lies relative to the job requirements, creating interview
									friction and high rejection rates.
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						05. Research Synthesis
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Research Synthesis
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="space-y-12 max-w-3xl">
						<div className="relative pl-6 border-l-2 border-[#10b981]/30">
							<h4 className="font-gilroyBold text-xl md:text-2xl text-white mb-2">
								Automate the filtration pipeline
							</h4>
							<p className="font-gilroyRegular text-base md:text-lg text-white/60 leading-relaxed">
								By running scheduled classifiers on raw text datasets in the
								background, we can drop the visual tax of search entirely. Only
								matched entries pass to the candidate.
							</p>
						</div>
						<div className="relative pl-6 border-l-2 border-[#10b981]/30">
							<h4 className="font-gilroyBold text-xl md:text-2xl text-white mb-2">
								Optimistic, non-blocking UI queueing
							</h4>
							<p className="font-gilroyRegular text-base md:text-lg text-white/60 leading-relaxed">
								Background scraping shouldn&apos;t cause layout shifting.
								Real-time updates must queue incoming results in a notification
								drawer, letting the user merge them on command.
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						06. Project Scope
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Scope of Work
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="font-gilroyRegular text-base md:text-lg leading-relaxed text-white/70 space-y-6 max-w-3xl">
						<p>
							Scout aims to create a highly focused, self-hosted job hunting
							dashboard. It abstracts all parsing, scraping, scoring, and
							customization logistics away from the candidate.
						</p>
						<p>
							Rather than being a social network or generic spreadsheet tracker,
							Scout operates as a background recruitment agent. It monitors ATS
							feeds, classifies suitability on Groq Cloud, dynamically tweaks
							PDF layout engines, and provides tailored outreach.
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						07. Target Personas
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Research &amp; User Personas
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="font-gilroyRegular text-base md:text-lg text-white/70 space-y-6 max-w-3xl mb-12">
						<p>
							To structure the user experience, I mapped out the primary user
							segments and their critical needs:
						</p>
					</div>

					{/* Personas vertical stack (1x1 grid) */}
					<div className="flex flex-col gap-24 mt-16 max-w-4xl">
						{/* Persona 1: Aarav Mehta */}
						<div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start pb-16 border-b border-white/5">
							<div className="sm:col-span-4 flex flex-col items-center text-center">
								<div className="w-full aspect-[3/4] max-w-[200px] rounded-2xl overflow-hidden mb-4 shadow-md border border-white/10 bg-[#121417] select-none">
									<div className="w-full h-full bg-[#10b981]/10 flex items-center justify-center text-4xl">
										👨‍💻
									</div>
								</div>
								<h4 className="font-gilroyBold text-lg text-white leading-tight">
									Aarav Mehta
								</h4>
								<p className="font-gilroyRegular text-xs text-white/60 mt-1">
									Senior Front-End Dev
								</p>
								<p className="font-gilroyRegular text-xs text-white/40 mt-0.5">
									Focus: Hybrid Next.js / React
								</p>
							</div>

							<div className="sm:col-span-8 flex flex-col gap-6">
								<p className="font-gilroyRegular text-base text-white/70 italic leading-relaxed pl-4 border-l-2 border-white/20">
									&ldquo;I want a central dashboard that instantly filters out
									companies that don&apos;t sponsor visas or meet my salary
									requirements so I can focus only on relevant senior
									roles.&rdquo;
								</p>

								<div>
									<h5 className="font-gilroyBold text-xs uppercase tracking-wider text-white/40 mb-1">
										Goals
									</h5>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Filter out non-visa sponsoring boards immediately and
										generate personalized cold emails for hiring managers.
									</p>
								</div>

								<div>
									<h5 className="font-gilroyBold text-xs uppercase tracking-wider text-white/40 mb-1">
										Frustrations
									</h5>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Spending hours parsing job descriptions to check basic
										salary parameters. Writing custom pitch letters repeatedly.
									</p>
								</div>
							</div>
						</div>

						{/* Persona 2: Sarah Jenkins */}
						<div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
							<div className="sm:col-span-4 flex flex-col items-center text-center">
								<div className="w-full aspect-[3/4] max-w-[200px] rounded-2xl overflow-hidden mb-4 shadow-md border border-white/10 bg-[#121417] select-none">
									<div className="w-full h-full bg-[#10b981]/20 flex items-center justify-center text-4xl">
										👩‍💻
									</div>
								</div>
								<h4 className="font-gilroyBold text-lg text-white leading-tight">
									Rahul Jain
								</h4>
								<p className="font-gilroyRegular text-xs text-white/60 mt-1">
									Junior Full-Stack Developer
								</p>
								<p className="font-gilroyRegular text-xs text-white/40 mt-0.5">
									Focus: Entry-Level Postings
								</p>
							</div>

							<div className="sm:col-span-8 flex flex-col gap-6">
								<p className="font-gilroyRegular text-base text-white/70 italic leading-relaxed pl-4 border-l-2 border-white/20">
									&ldquo;I need to know exactly which requirements I miss for a
									job description, and get advice on how to address those
									missing pieces during interviews.&rdquo;
								</p>

								<div>
									<h5 className="font-gilroyBold text-xs uppercase tracking-wider text-white/40 mb-1">
										Goals
									</h5>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Find entry-level roles, track skill gaps, and get
										objection-handling cards prepared for upcoming calls.
									</p>
								</div>

								<div>
									<h5 className="font-gilroyBold text-xs uppercase tracking-wider text-white/40 mb-1">
										Frustrations
									</h5>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Applying to positions and getting filtered out by ATS
										algorithms because the resume bullet points weren&apos;t
										customized.
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						08. Design Strategy
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Core Objectives &amp; Strategy
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<p className="font-gilroyRegular text-base md:text-lg text-white/70 mb-8 max-w-3xl">
						To make the job application process seamless, Scout is designed
						around four key product objectives:
					</p>

					{/* Design planning grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-gilroyRegular">
						<div className="flex flex-col gap-2 p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl shadow-sm hover:bg-white/[0.05] transition-all duration-300">
							<span className="text-base font-gilroyBold text-white">
								1. Dual-Pipeline Staging Dashboard
							</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Separates incoming scraped jobs into a low-intent &ldquo;Casual
								Hunt&rdquo; queue for review, and a high-intent &ldquo;Serious
								Mode&rdquo; pipeline for active applications.
							</p>
						</div>

						<div className="flex flex-col gap-2 p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl shadow-sm hover:bg-white/[0.05] transition-all duration-300">
							<span className="text-base font-gilroyBold text-white">
								2. Realtime Staging Queue Pill
							</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Filters incoming background scrapes through a floating
								indicator, buffering additions via Supabase Realtime to prevent
								jarring layout jumps.
							</p>
						</div>

						<div className="flex flex-col gap-2 p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl shadow-sm hover:bg-white/[0.05] transition-all duration-300">
							<span className="text-base font-gilroyBold text-white">
								3. Sniper Resume Morpher
							</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Tailors a custom PDF resume dynamically using
								`@react-pdf/renderer` by re-ordering project experience bullet
								points based on the target job stack.
							</p>
						</div>

						<div className="flex flex-col gap-2 p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl shadow-sm hover:bg-white/[0.05] transition-all duration-300">
							<span className="text-base font-gilroyBold text-white">
								4. Obsidian Mint Surface Ramp
							</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Built on a premium monochromatic dark container system with
								gradual surface levels, using an Emerald Mint signature accent
								strictly for match scores.
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
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						09. Strategic Alignment
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						The 5 Ws Alignment
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12">
						<div className="flex flex-col gap-2 text-left">
							<span className="font-gilroyBold text-xl text-white">What?</span>
							<p className="text-sm text-white/60 leading-relaxed">
								An autonomous, self-hosted job intelligence dashboard that
								crawls job boards, runs dual-stage LLM classifiers, and prepares
								custom outreach templates and resumes.
							</p>
						</div>

						<div className="flex flex-col gap-2 text-left">
							<span className="font-gilroyBold text-xl text-white">Why?</span>
							<p className="text-sm text-white/60 leading-relaxed">
								To bypass the hours spent parsing irrelevant descriptions,
								checking sponsorships, writing outreach scripts, and tailoring
								resumes by hand.
							</p>
						</div>

						<div className="flex flex-col gap-2 text-left">
							<span className="font-gilroyBold text-xl text-white">When?</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Runs automatically on a daily scheduler (CRON trigger) in the
								background, or dynamically on demand when pasting a manual
								listing URL.
							</p>
						</div>

						<div className="flex flex-col gap-2 text-left">
							<span className="font-gilroyBold text-xl text-white">Who?</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Software developers and system designers who want to streamline
								their job application process and avoid burnout.
							</p>
						</div>

						<div className="flex flex-col gap-2 text-left">
							<span className="font-gilroyBold text-xl text-white">Where?</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Self-hosted by the user, running client-side on Next.js 16 and
								syncing data over Supabase.
							</p>
						</div>

						<div className="flex flex-col gap-2 text-left">
							<span className="font-gilroyBold text-xl text-white">How?</span>
							<p className="text-sm text-white/60 leading-relaxed">
								Leveraging Next.js app routes, Firecrawl scraping APIs, Groq
								Cloud inference triggers (Llama 8B and 70B models), and
								`@react-pdf/renderer` layouts.
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
					className="flex flex-col justify-center py-20"
				>
					<span className="font-gilroyBold text-xs uppercase tracking-[0.18em] text-white/70 block mb-1.5">
						10. System Interfaces
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Walkthrough: The Interface Command
					</h2>

					<div className="flex flex-col gap-24 mt-12">
						{/* Screen 1: Obsidian Pipeline */}
						<div id="screen-1" className="flex flex-col py-10 gap-6">
							<div className="flex flex-col gap-1.5">
								<span className="font-gilroyBold text-xs text-white/50 uppercase block tracking-wider">
									Screen 1
								</span>
								<h4 className="font-gilroyBold text-2xl md:text-3xl text-white">
									Obsidian Pipeline
								</h4>
								<p className="text-sm text-white/50 font-gilroyRegular max-w-2xl">
									Kanban-style application tracker with four stages — Serious
									Pipeline, Applied, Interviewing, and Archived. Drag cards
									across columns to track live application progress.
								</p>
							</div>
							<div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0d0e]">
								<img
									src="/images/scout/screen-pipeline.png"
									alt="Scout Obsidian Pipeline — Kanban job tracking board"
									className="w-full object-cover select-none"
									draggable={false}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<Layers size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Stage-Based Kanban Layout
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Separates applications into four stages — Serious, Applied,
										Interviewing, and Archived — so you always know where each
										role stands without scanning spreadsheets.
									</p>
								</div>
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<Sliders size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Groq Match Score Badges
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Every card shows a Groq-computed suitability score (e.g.
										92%, 70%) so you prioritize high-intent applications and
										skip low-confidence listings at a glance.
									</p>
								</div>
							</div>
						</div>

						{/* Screen 2: Command Center — Configuration */}
						<div id="screen-2" className="flex flex-col py-10 gap-6">
							<div className="flex flex-col gap-1.5">
								<span className="font-gilroyBold text-xs text-white/50 uppercase block tracking-wider">
									Screen 2
								</span>
								<h4 className="font-gilroyBold text-2xl md:text-3xl text-white">
									Command Center — Scout Configuration
								</h4>
								<p className="text-sm text-white/50 font-gilroyRegular max-w-2xl">
									Configure your target roles, experience level, and locations.
									The Sweep Activity Log on the right shows every autonomous
									crawl run — detections found and listings saved.
								</p>
							</div>
							<div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0d0e]">
								<img
									src="/images/scout/screen-command-config.png"
									alt="Scout Command Center — Ghost Scouter Configuration and Sweep Activity Log"
									className="w-full object-cover select-none"
									draggable={false}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<Info size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Preference-Synced Targeting
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Set target roles, experience bands, and location preferences
										once. Scout syncs these parameters as the filter blueprint
										for every automated ghost sweep.
									</p>
								</div>
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<Activity size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Live Sweep Activity Log
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										A timestamped activity panel records every background cron
										run — detections found and net listings added — giving full
										transparency into the crawler's output.
									</p>
								</div>
							</div>
						</div>

						{/* Screen 3: Command Center — Identity Profile */}
						<div id="screen-3" className="flex flex-col py-10 gap-6">
							<div className="flex flex-col gap-1.5">
								<span className="font-gilroyBold text-xs text-white/50 uppercase block tracking-wider">
									Screen 3
								</span>
								<h4 className="font-gilroyBold text-2xl md:text-3xl text-white">
									Command Center — Identity Profile
								</h4>
								<p className="text-sm text-white/50 font-gilroyRegular max-w-2xl">
									Your professional identity card: salary band, work type, tech
									arsenal by category, and a full career timeline — all used as
									the source of truth for resume morphing and scoring.
								</p>
							</div>
							<div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0d0e]">
								<img
									src="/images/scout/screen-profile.png"
									alt="Scout Command Center — Identity profile with tech arsenal and professional timeline"
									className="w-full object-cover select-none"
									draggable={false}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<UserCheck size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Tech Arsenal Mapping
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Categorizes your skills across AI/ML, tools, UI frameworks,
										databases, and languages. These tags feed directly into the
										LLM scoring and resume bullet-point reordering engine.
									</p>
								</div>
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<Database size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Search Logic Anchors
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Salary band, work type, and company size preferences are
										persisted as Supabase user profile fields — queried by every
										sweep to eliminate mismatched listings before they surface.
									</p>
								</div>
							</div>
						</div>

						{/* Screen 4: Casual Hunt */}
						<div id="screen-4" className="flex flex-col py-10 gap-6">
							<div className="flex flex-col gap-1.5">
								<span className="font-gilroyBold text-xs text-white/50 uppercase block tracking-wider">
									Screen 4
								</span>
								<h4 className="font-gilroyBold text-2xl md:text-3xl text-white">
									Casual Hunt — Job Grid
								</h4>
								<p className="text-sm text-white/50 font-gilroyRegular max-w-2xl">
									Auto-swept listings displayed in a filterable card grid. Role
									chips, location, and ATS source are shown on every card
									alongside a Groq match percentage so you can triage quickly.
								</p>
							</div>
							<div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0d0e]">
								<img
									src="/images/scout/screen-casual-hunt.png"
									alt="Scout Casual Hunt — auto-swept job listing grid with match scores"
									className="w-full object-cover select-none"
									draggable={false}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<Terminal size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Filter Rail + ATS Source Tags
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										A persistent filter chip row lets you narrow by role type,
										location, and work format without page reloads. ATS source
										(e.g. Lever, Greenhouse) is labeled on every card.
									</p>
								</div>
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<CheckCircle2 size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											One-Click Promotion to Pipeline
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Interesting listings can be promoted from Casual Hunt to the
										Obsidian Pipeline in a single action, triggering full 70B
										distillation and outreach generation.
									</p>
								</div>
							</div>
						</div>

						{/* Screen 5: Live ATS Preview */}
						<div id="screen-5" className="flex flex-col py-10 gap-6">
							<div className="flex flex-col gap-1.5">
								<span className="font-gilroyBold text-xs text-white/50 uppercase block tracking-wider">
									Screen 5
								</span>
								<h4 className="font-gilroyBold text-2xl md:text-3xl text-white">
									Live ATS Preview — Sniper Resume Morpher
								</h4>
								<p className="text-sm text-white/50 font-gilroyRegular max-w-2xl">
									Split-pane view: job details, skill gap analysis, and
									AI-generated outreach hook on the left — a live PDF preview of
									the dynamically tailored resume on the right, ready to
									download.
								</p>
							</div>
							<div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0d0e]">
								<img
									src="/images/scout/screen-resume-morph.png"
									alt="Scout Live ATS Preview — tailored resume PDF alongside job detail and skill gap analysis"
									className="w-full object-cover select-none"
									draggable={false}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<FileText size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Dynamic Bullet-Point Reordering
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										The 70B model re-ranks resume bullet points to surface the
										most relevant experience first. The PDF preview updates live
										so you see the exact ATS-ready output before downloading.
									</p>
								</div>
								<div className="pl-4 border-l-2 border-[#10b981]/30 flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<AlertTriangle size={18} className="text-[#10b981]/80" />
										<h5 className="font-gilroyBold text-base md:text-lg text-white leading-none">
											Skill Gap + Hook Generation
										</h5>
									</div>
									<p className="text-xs md:text-sm text-white/60 leading-relaxed">
										Identifies missing requirements (e.g. Senior UX/UI
										experience) and generates an AI outreach hook that reframes
										adjacent skills — turning gaps into confident talking
										points.
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
					<span className="font-gilroyBold text-xs text-white/70 font-bold block tracking-[0.18em] mb-1.5 uppercase">
						11. Technical Infrastructure
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Engineering for Blistering Speed
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch font-gilroyRegular">
						{/* Left: Zustand & Groq Classification */}
						<div className="md:col-span-6 flex flex-col justify-between h-full">
							<div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col h-full gap-4 font-gilroyRegular shadow-sm">
								<h3 className="text-base font-gilroyBold text-white flex items-center gap-2">
									<Terminal size={16} className="text-white" />
									Dual-Stage Groq Cloud Pipeline
								</h3>

								<p className="text-xs md:text-sm text-white/70 leading-relaxed">
									Executing heavy 70B parameter LLM distillation directly on
									scraped job postings is cost-prohibitive. Scout implements a
									two-stage classification strategy.
								</p>
								<p className="text-xs md:text-sm text-white/70 leading-relaxed">
									A lightweight model (Llama-3.1-8B-instant) filters out
									mismatches in milliseconds. Only passing roles are sent to the
									larger model (Llama-3.3-70B-versatile) for full context
									mapping and outreach generation.
								</p>

								<div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 mt-2">
									<div className="flex items-center gap-2 text-white/70">
										<Terminal size={14} className="text-white" />
										<span className="text-[10px] font-gilroyBold">
											scoutRouter.ts
										</span>
									</div>
									<span className="text-[8px] uppercase tracking-widest bg-white/5 border border-white/10 text-white px-2 py-0.5 rounded font-gilroyBold">
										AI Endpoint
									</span>
								</div>

								<div className="font-mono text-[10px] leading-relaxed overflow-x-auto premium-scrollbar text-white/80 flex-grow select-text animate-none bg-black/40 p-3 rounded-lg border border-white/5">
									<span className="text-pink-400">const</span> classifyJob ={" "}
									<span className="text-pink-400">async</span> (text) =&gt;
									&#123;
									<br />
									&nbsp;&nbsp;<span className="text-pink-400">const</span>{" "}
									isMatch = <span className="text-pink-400">await</span>{" "}
									groq.run(
									<span className="text-yellow-200/95">
										&quot;llama3-8b&quot;
									</span>
									, filterRules, text);
									<br />
									&nbsp;&nbsp;<span className="text-pink-400">if</span>{" "}
									(!isMatch) <span className="text-pink-400">return</span>{" "}
									<span className="text-blue-400">null</span>;
									<br />
									&nbsp;&nbsp;<span className="text-pink-400">return</span>{" "}
									<span className="text-pink-400">await</span> groq.run(
									<span className="text-yellow-200/95">
										&quot;llama3-70b&quot;
									</span>
									, distillTemplate, text);
									<br />
									&#125;;
								</div>
							</div>
						</div>

						{/* Right: Scraping Systems */}
						<div className="md:col-span-6 flex flex-col justify-between h-full">
							<div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col h-full gap-4 font-gilroyRegular shadow-sm">
								<h3 className="text-base font-gilroyBold text-white flex items-center gap-2">
									<Activity size={16} className="text-white" />
									Scheduled Ghost Sweeps
								</h3>

								<p className="text-xs md:text-sm text-white/70 leading-relaxed">
									To keep the application queues filled, background workers
									operate on Cron schedules. The worker utilizes Serper.dev and
									Firecrawl to scan directories and ATS boards based on user
									profile preferences.
								</p>
								<p className="text-xs md:text-sm text-white/70 leading-relaxed">
									Cryptographic deduplication runs locally on database
									ingestion. The system logs sweep diagnostics inside
									`ghost_sweeps` tables to prevent duplicate API cycles and
									limit rates.
								</p>

								<div className="border-t border-white/10 pt-4 mt-2">
									<div className="flex items-center justify-between mb-2 text-[10px] font-gilroyBold text-white/60">
										<span>Cron Sweeper Script</span>
										<span className="text-white font-gilroyBold">
											cron_sweep.ts
										</span>
									</div>
									<div className="p-3 rounded-lg font-mono text-[9px] leading-relaxed bg-black/40 border border-white/5 text-white/80 overflow-x-auto premium-scrollbar select-text">
										<span className="text-pink-400">export async function</span>{" "}
										GET(req) &#123;
										<br />
										&nbsp;&nbsp;verifyCronSecret(req);
										<br />
										&nbsp;&nbsp;<span className="text-pink-400">
											const
										</span>{" "}
										rawJobs = <span className="text-pink-400">await</span>{" "}
										triggerSweeper(userProfile);
										<br />
										&nbsp;&nbsp;<span className="text-pink-400">
											return
										</span>{" "}
										syncWithSupabase(rawJobs);
										<br />
										&#125;
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* ── 12. DATABASE SCHEMA ── */}
				<motion.div
					id="schema"
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="min-h-screen flex flex-col justify-center py-20"
				>
					<span className="font-gilroyBold text-xs text-white/70 font-bold block tracking-[0.18em] mb-1.5 uppercase">
						12. Database Schema
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						Relational Architecture
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-gilroyRegular max-w-4xl">
						{/* Table 1: jobs */}
						<div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] shadow-sm flex flex-col gap-3">
							<h4 className="text-sm font-gilroyBold text-white flex items-center gap-2">
								<Database size={15} />
								Table: `jobs`
							</h4>
							<div className="overflow-x-auto text-[11px] font-mono leading-relaxed text-white/80">
								<table className="w-full text-left">
									<thead>
										<tr className="border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
											<th className="pb-1">Column</th>
											<th className="pb-1">Type</th>
											<th className="pb-1">Description</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b border-white/5">
											<td className="py-1 text-[#10b981]">id</td>
											<td className="py-1">uuid</td>
											<td className="py-1">PK, auto-generated</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">status</td>
											<td className="py-1">text</td>
											<td className="py-1">casual or serious</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">match_score</td>
											<td className="py-1">int</td>
											<td className="py-1">0-100 score rating</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">match_explanation</td>
											<td className="py-1">text</td>
											<td className="py-1">one-sentence AI rationale</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">outreach_hooks</td>
											<td className="py-1">jsonb</td>
											<td className="py-1">cached copy by channel</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">objection_strategies</td>
											<td className="py-1">text[]</td>
											<td className="py-1">cached objection handling</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						{/* Table 2: user_profile */}
						<div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] shadow-sm flex flex-col gap-3">
							<h4 className="text-sm font-gilroyBold text-white flex items-center gap-2">
								<Database size={15} />
								Table: `user_profile`
							</h4>
							<div className="overflow-x-auto text-[11px] font-mono leading-relaxed text-white/80">
								<table className="w-full text-left">
									<thead>
										<tr className="border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40">
											<th className="pb-1">Column</th>
											<th className="pb-1">Type</th>
											<th className="pb-1">Description</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b border-white/5">
											<td className="py-1 text-[#10b981]">id</td>
											<td className="py-1">uuid</td>
											<td className="py-1">PK, auto-generated</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">salary_min</td>
											<td className="py-1">int</td>
											<td className="py-1">minimum salary threshold</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">skills</td>
											<td className="py-1">jsonb</td>
											<td className="py-1">list of technologies &amp; level</td>
										</tr>
										<tr className="border-b border-white/5">
											<td className="py-1">preferred_roles</td>
											<td className="py-1">text[]</td>
											<td className="py-1">preferred roles mappings</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</motion.div>

				{/* ── 13. API REFERENCE ── */}
				<motion.div
					id="api"
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="min-h-screen flex flex-col justify-center py-20"
				>
					<span className="font-gilroyBold text-xs text-white/70 font-bold block tracking-[0.18em] mb-1.5 uppercase">
						13. API Endpoints
					</span>
					<h2 className="font-gilroyBold text-3xl md:text-5xl text-white tracking-tight mb-4">
						API Reference
					</h2>
					<div className="w-full h-px bg-white/10 mb-8" />

					<div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] shadow-sm font-gilroyRegular text-xs max-w-4xl">
						<table className="w-full text-left">
							<thead>
								<tr className="bg-white/[0.03] border-b border-white/10 text-[9px] uppercase tracking-wider text-white/50 font-gilroyBold">
									<th className="p-4">Endpoint</th>
									<th className="p-4">Method</th>
									<th className="p-4">Engine</th>
									<th className="p-4">Description</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/5 font-mono text-[10px] text-white/80">
								{[
									{
										route: "/api/scout",
										method: "POST",
										engine: "Groq + Firecrawl",
										desc: "Scrape URL → AI distill → save job",
									},
									{
										route: "/api/scout/distill",
										method: "POST",
										engine: "Groq + Firecrawl",
										desc: "Re-evaluate existing job by ID",
									},
									{
										route: "/api/job/analyze-gaps",
										method: "POST",
										engine: "Groq Llama 8B",
										desc: "Perform skill gap assessment",
									},
									{
										route: "/api/job/generate-hook",
										method: "POST",
										engine: "Groq Llama 8B",
										desc: "Create channel-specific pitch outreach copy",
									},
									{
										route: "/api/cron/sweep",
										method: "GET/POST",
										engine: "Groq + Serper + Resend",
										desc: "Trigger scheduled crawler checks",
									},
								].map((row, i) => (
									<tr
										key={i}
										className="hover:bg-white/[0.01] transition-colors"
									>
										<td className="p-4 text-[#10b981]">{row.route}</td>
										<td className="p-4">
											<span className="px-2 py-0.5 rounded bg-white/5 text-white text-[8px] font-gilroyBold">
												{row.method}
											</span>
										</td>
										<td className="p-4 text-white/60">{row.engine}</td>
										<td className="p-4 font-gilroyRegular text-[11px] text-white/70">
											{row.desc}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</motion.div>
			</section>

			{/* ── PORTFOLIO FOOTER ── */}
			<section className="w-full py-16 border-t border-white/10">
				<div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
						<div className="flex flex-col gap-1 text-center sm:text-left">
							<h3 className="text-xl font-gilroyBold text-white">
								Thanks for reading!
							</h3>
							<p className="text-xs text-white/60">
								Let&apos;s collaborate to design and engineer premium interface
								systems.
							</p>
						</div>

						<div className="flex items-center gap-3">
							<a
								href="https://github.com/DivineDB"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-full border border-white/15 bg-white/5 text-white hover:bg-[#10b981] hover:text-[#0a0b0d] transition-all"
								aria-label="GitHub"
							>
								<FaGithub size={16} />
							</a>
							<a
								href="https://www.linkedin.com/in/divyansh-baghel/"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-full border border-white/15 bg-white/5 text-white hover:bg-[#10b981] hover:text-[#0a0b0d] transition-all"
								aria-label="LinkedIn"
							>
								<FaLinkedin size={16} />
							</a>
						</div>
					</div>

					{/* Links grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Link
							href="/work/pos-panel"
							className="group flex flex-col justify-between gap-4 rounded-xl border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
						>
							<div className="flex flex-col gap-1.5">
								<span className="text-[9px] font-gilroyRegular text-white/60 uppercase tracking-[0.15em]">
									UX Case Study
								</span>
								<h5 className="font-gilroyBold text-base text-white">
									BreezePOS
								</h5>
								<p className="text-xs text-white/70 leading-relaxed">
									A touchscreen-optimized countertop register and real-time
									inventory engine designed for convenience store operators.
								</p>
							</div>
							<span className="font-gilroyBold text-xs text-white inline-flex items-center gap-1 mt-2">
								Read Case Study{" "}
								<span className="transition-transform group-hover:translate-x-1">
									→
								</span>
							</span>
						</Link>

						<Link
							href="/work"
							className="group flex flex-col justify-between gap-4 rounded-xl border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
						>
							<div className="flex flex-col gap-1.5">
								<span className="text-[9px] font-gilroyRegular text-white/60 uppercase tracking-[0.15em]">
									Portfolio Index
								</span>
								<h5 className="font-gilroyBold text-base text-white">
									All Case Studies
								</h5>
								<p className="text-xs text-white/70 leading-relaxed">
									Browse the full gallery gallery of user experience research
									prototypes, dashboard engines, and design tools.
								</p>
							</div>
							<span className="font-gilroyBold text-xs text-white inline-flex items-center gap-1 mt-2">
								View Selected Work{" "}
								<span className="transition-transform group-hover:translate-x-1">
									→
								</span>
							</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Global layout page footer */}
			<PageFooter />

			{/* Scroll to top */}
			<AnimatePresence>
				{showScrollTop && (
					<motion.button
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						onClick={scrollToTop}
						className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#121417]/90 backdrop-blur-md text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg"
						aria-label="Scroll to top"
					>
						<ArrowUpRight size={16} className="-rotate-45" />
					</motion.button>
				)}
			</AnimatePresence>

			{/* Floating mobile ToC button */}
			<div className="block md:hidden">
				<button
					onClick={() => setIsMobileTocOpen(true)}
					className="fixed bottom-24 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#121417]/90 backdrop-blur-md text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-md"
					aria-label="Table of contents"
				>
					<Hash size={16} />
				</button>
			</div>

			{/* Mobile ToC Drawer */}
			<AnimatePresence>
				{isMobileTocOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsMobileTocOpen(false)}
							className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm block md:hidden"
						/>
						<motion.div
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							exit={{ y: "100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-[#0a0b0d] border-t border-white/10 p-6 shadow-2xl max-h-[80vh] overflow-y-auto no-scrollbar block md:hidden text-white"
						>
							<div className="flex justify-between items-center mb-6">
								<span className="font-gilroyBold text-sm uppercase tracking-widest text-white/40">
									Chapters
								</span>
								<button
									onClick={() => setIsMobileTocOpen(false)}
									className="p-1 rounded-full hover:bg-white/5 text-white/60 cursor-pointer"
								>
									<X size={18} />
								</button>
							</div>
							<div className="flex flex-col gap-4">
								{SECTIONS.map((section) => (
									<button
										key={section.id}
										onClick={() => {
											setIsMobileTocOpen(false);
											setTimeout(() => {
												handleScrollTo(section.id);
											}, 300);
										}}
										className={`flex justify-between items-center text-left py-2 px-3 rounded-lg transition-colors cursor-pointer w-full ${
											activeSection === section.id
												? "bg-white/5 text-white font-bold"
												: "text-white/70 hover:bg-white/5"
										}`}
									>
										<span className="font-gilroyBold text-sm">
											{section.label}
										</span>
										{activeSection === section.id && (
											<Check size={14} className="text-[#10b981]" />
										)}
									</button>
								))}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Lightbox Zoom Modal for code mockups */}
			<AnimatePresence>
				{activeMockupId && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setActiveMockupId(null)}
						className="fixed inset-0 z-55 flex items-center justify-center bg-black/85 backdrop-blur-md cursor-zoom-out p-4"
					>
						<motion.div
							initial={{ scale: 0.95, y: 15 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.95, y: 15 }}
							transition={{ type: "spring", stiffness: 300, damping: 25 }}
							className="relative max-w-4xl w-full flex items-center justify-center text-white bg-[#0c0d0e] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl select-text"
							onClick={(e) => e.stopPropagation()}
						>
							{activeMockupId === "dashboard-mockup" && (
								<div className="w-full flex flex-col gap-4">
									<div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
										<span className="font-gilroyBold text-sm text-[#10b981] uppercase tracking-wider">
											Screen 1: Dual-Pipeline Dashboard
										</span>
										<span className="text-[10px] text-white/40">
											scout.dev/dashboard
										</span>
									</div>
									<p className="text-xs text-white/70 leading-relaxed mb-4">
										This command view shows how auto-swept job listings populate
										the left lane (Casual Hunt), while selected, high-intent
										roles you choose to pursue are advanced to the right lane
										(Serious Mode).
									</p>
									<Mockup1 />
								</div>
							)}

							{activeMockupId === "queue-mockup" && (
								<div className="w-full flex flex-col gap-4">
									<div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
										<span className="font-gilroyBold text-sm text-[#10b981] uppercase tracking-wider">
											Screen 2: Realtime Staging Queue
										</span>
										<span className="text-[10px] text-white/40">
											scout.dev/sweeps
										</span>
									</div>
									<p className="text-xs text-white/70 leading-relaxed mb-4">
										This alert pill floats at the top of the interface. When
										background sweeps finish, Supabase Realtime delivers counts
										optimistically, prompting you to merge listings to prevent
										layout jumps.
									</p>
									<Mockup2 isZoomed={true} />
								</div>
							)}

							{activeMockupId === "url-mockup" && (
								<div className="w-full flex flex-col gap-4">
									<div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
										<span className="font-gilroyBold text-sm text-[#10b981] uppercase tracking-wider">
											Screen 3: On-Demand URL Scouting
										</span>
										<span className="text-[10px] text-white/40">
											scout.dev/url-scouter
										</span>
									</div>
									<p className="text-xs text-white/70 leading-relaxed mb-4">
										Found a job manually? Paste its ATS listing URL. Firecrawl
										scraping APIs parse the body text, send the raw payload to
										Groq, and deliver suitability metrics instantly.
									</p>
									<Mockup3 />
								</div>
							)}

							{activeMockupId === "resume-mockup" && (
								<div className="w-full flex flex-col gap-4">
									<div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
										<span className="font-gilroyBold text-sm text-[#10b981] uppercase tracking-wider">
											Screen 4: Sniper Resume Morpher
										</span>
										<span className="text-[10px] text-white/40">
											scout.dev/resume-morpher
										</span>
									</div>
									<p className="text-xs text-white/70 leading-relaxed mb-4">
										Our dynamic layout engine re-evaluates project description
										bullet points, shifts high-relevance tech keywords to the
										top, and renders standard ATS-compliant single-column PDF
										structures immediately.
									</p>
									<Mockup4 />
								</div>
							)}

							{activeMockupId === "shield-mockup" && (
								<div className="w-full flex flex-col gap-4">
									<div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
										<span className="font-gilroyBold text-sm text-[#10b981] uppercase tracking-wider">
											Screen 5: Shield Objections &amp; Gap Analyzer
										</span>
										<span className="text-[10px] text-white/40">
											scout.dev/shield
										</span>
									</div>
									<p className="text-xs text-white/70 leading-relaxed mb-4">
										Whenever an AI score returns below 70%, Shield outlines gaps
										and prepares objections. This guarantees candidates can
										address technical shortcomings comfortably during screen
										calls.
									</p>
									<Mockup5 />
								</div>
							)}

							<button
								onClick={() => setActiveMockupId(null)}
								className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 cursor-pointer transition-colors shadow-lg flex items-center justify-center"
								aria-label="Close lightbox"
							>
								<X size={16} />
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
}
