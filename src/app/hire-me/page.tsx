"use client";

import { MotionInView } from "@/components/hire-me/motion-in-view";
import { HighlightBox } from "@/components/hire-me/highlight-box";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PageFooter from "@/components/PageFooter";
import {
	SiFigma,
	SiFramer,
	SiNextdotjs,
	SiPostgresql,
	SiReact,
	SiTailwindcss,
	SiTypescript,
	SiJavascript,
	SiHtml5,
	SiRive,
	SiGooglegemini,
	SiAnthropic,
	SiPython,
} from "react-icons/si";
import {
	LayoutTemplate,
	MousePointer2,
	Cpu,
	BrainCircuit,
	ArrowDown,
	Download,
	Link2,
	Mail,
} from "lucide-react";

const RESUME_PDF_PATH = "/Divyansh_Baghel_Resume.pdf";

// ─── Tech categories (4 bento cards – exact resume content) ──────────────────
type Tool = {
	label: string;
	Icon: React.ElementType;
	color: string;
};

const TECH_CATEGORIES: {
	id: string;
	title: string;
	categoryIcon: React.ElementType;
	tools: Tool[];
}[] = [
	{
		id: "frontend",
		title: "Frontend Development",
		categoryIcon: LayoutTemplate,
		tools: [
			{ label: "Next.js", Icon: SiNextdotjs, color: "#111111" },
			{ label: "React.js", Icon: SiReact, color: "#61DAFB" },
			{ label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
			{ label: "HTML5 / CSS3", Icon: SiHtml5, color: "#E34F26" },
		],
	},
	{
		id: "design",
		title: "Design & Strategy",
		categoryIcon: MousePointer2,
		tools: [
			{ label: "Figma", Icon: SiFigma, color: "#F24E1E" },
			{ label: "Rive", Icon: SiRive, color: "#FF4A21" },
			{ label: "Framer", Icon: SiFramer, color: "#0055FF" },
			{
				label: "Information Architecture",
				Icon: LayoutTemplate,
				color: "#8B5CF6",
			},
		],
	},
	{
		id: "core",
		title: "Core Languages",
		categoryIcon: Cpu,
		tools: [
			{ label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
			{ label: "JavaScript ES6+", Icon: SiJavascript, color: "#F7DF1E" },
			{ label: "Python", Icon: SiPython, color: "#3776AB" },
		],
	},
	{
		id: "data",
		title: "Data & AI Systems",
		categoryIcon: BrainCircuit,
		tools: [
			{ label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
			{ label: "Claude", Icon: SiAnthropic, color: "#D97756" },
			{ label: "Gemini", Icon: SiGooglegemini, color: "#4F46E5" },
			{ label: "Groq", Icon: BrainCircuit, color: "#10B981" },
			{ label: "Next.js API", Icon: SiNextdotjs, color: "#111111" },
		],
	},
];

// ─── Closing quote ────────────────────────────────────────────────────────────
const QUOTE_WORDS =
	"So, are you ready to make me an offer I can't refuse?".split(" ");

// ─── Shared animation variants ────────────────────────────────────────────────
const LIST_STAGGER = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08 } },
} as const;

const LIST_ITEM = {
	hidden: { opacity: 0, y: 14 },
	show: { opacity: 1, y: 0 },
} as const;

const QUOTE_CONTAINER = {
	rest: {},
	hover: { transition: { staggerChildren: 0.05 } },
} as const;

const QUOTE_WORD = {
	rest: { y: 0 },
	hover: {
		y: -6,
		transition: { type: "spring" as const, bounce: 0.6 },
	},
} as const;

// ─── Bento tech card ──────────────────────────────────────────────────────────
function TechCard({
	title,
	categoryIcon: CategoryIcon,
	tools,
}: {
	title: string;
	categoryIcon: React.ElementType;
	tools: Tool[];
}) {
	return (
		<div
			className="relative overflow-hidden rounded-xl bg-[#F8EDD1]/30 border border-[#2A4756]/5 p-6 flex flex-col justify-between min-h-[340px] transition-all duration-300 hover:border-[#2A4756]/10 hover:bg-[#F8EDD1]/40"
			style={{
				backgroundImage:
					"radial-gradient(rgba(42, 71, 86, 0.03) 1px, transparent 1px)",
				backgroundSize: "16px 16px",
			}}
		>
			<div>
				{/* Header */}
				<div className="flex items-center gap-3 pb-4 mb-4 border-b border-dashed border-[#2A4756]/10">
					<CategoryIcon className="h-5 w-5 text-text_primary/60" />
					<h3 className="font-gilroyBold text-lg tracking-tight text-text_primary">
						{title}
					</h3>
				</div>

				{/* Tools list */}
				<ul className="space-y-3 relative z-10">
					{tools.map(({ label, Icon, color }) => (
						<motion.li
							key={label}
							whileHover={{ y: -2, opacity: 1, filter: "grayscale(0)" }}
							initial={{ opacity: 0.75, filter: "grayscale(1)" }}
							transition={{ duration: 0.2 }}
							className="flex cursor-default items-center gap-3"
						>
							<Icon
								aria-hidden
								style={{ color }}
								className="h-[18px] w-[18px] flex-shrink-0"
							/>
							<span className="font-gilroyRegular text-sm text-text_primary/80">
								{label}
							</span>
						</motion.li>
					))}
				</ul>
			</div>

			{/* Faint watermark illustration in bottom-right */}
			<CategoryIcon className="absolute bottom-0 right-0 translate-x-4 translate-y-4 opacity-[0.015] w-32 h-32 text-text_primary pointer-events-none select-none rotate-[-12deg]" />
		</div>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HireMePage() {
	const [copied, setCopied] = useState(false);

	const fallbackCopyText = (text: string) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.opacity = "0";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand("copy");
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Fallback: Oops, unable to copy", err);
		}
		document.body.removeChild(textArea);
	};

	const handleCopyLink = () => {
		const url = "https://drive.google.com/file/d/1vUgA7o_6XvnUPN_Hifq-3-viOe_D97XI/view?usp=drive_link";
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(url)
				.then(() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 2000);
				})
				.catch((err) => {
					console.error("Failed to copy link: ", err);
					fallbackCopyText(url);
				});
		} else {
			fallbackCopyText(url);
		}
	};

	return (
		<main className="relative w-full bg-bg font-gilroyRegular text-text_primary">
			{/* Fixed dashed borders */}
			<div className="pointer-events-none fixed inset-x-0 top-0 z-40 border-t border-dashed border-[#2A4756]" />
			<div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-b border-dashed border-[#2A4756]" />

			{/* ══ Section 1: Hero ══════════════════════════════════════════════════════ */}
			<section
				id="top"
				className="relative min-h-screen px-6 md:px-12 py-24 md:py-0 flex items-center"
			>
				<MotionInView className="relative mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center">
					{/* Status pill */}
					<div className="mb-4 flex items-center gap-2.5">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
						</span>
						<span className="text-xs font-gilroyBold uppercase tracking-[0.2em] text-[#2A4756]/55">
							Available for new opportunities
						</span>
					</div>

					<h1 className="text-5xl font-gilroyBold tracking-tight md:text-7xl">
					<HighlightBox className="font-gilroyBold tracking-tight overflow-hidden inline-flex">
						<motion.span
							initial={{ y: "105%", opacity: 0 }}
							animate={{ y: "0%", opacity: 1 }}
							transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
							className="inline-block will-change-transform"
						>
							Hire me!
						</motion.span>
					</HighlightBox>
				</h1>

					<p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">
						If you are a recruiter or someone working at a company who has an
						opportunity for me that I cannot say no to, then this page is for
						you.
					</p>

					{/* ── Phase 1: Premium zero-shift button row ───────────────────────── */}
					<div className="mt-8 flex flex-wrap items-center gap-4">
						{/* Button 1 — Download (solid, no hover scale) */}
						<a
							id="btn-download-resume"
							href={RESUME_PDF_PATH}
							download
							aria-label="Download resume PDF"
							className="inline-flex items-center gap-2 rounded-full bg-accent_highlight px-6 py-3 text-sm font-gilroyBold text-text_primary transition-colors duration-300 hover:brightness-95"
						>
							Download Resume <Download className="h-4 w-4" />
						</a>

						{/* Button 2 — Copy Link (fixed width, whileTap only) */}
						<motion.button
							id="btn-copy-link"
							onClick={handleCopyLink}
							aria-label="Copy page link to clipboard"
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
							className="w-[140px] inline-flex justify-center items-center gap-2 rounded-full border border-[#2A4756]/20 bg-transparent px-6 py-3 text-sm font-gilroyBold text-text_primary transition-colors duration-300 hover:border-[#2A4756]/60 hover:bg-black/[0.03] overflow-hidden"
						>
							<AnimatePresence mode="wait">
								{copied ? (
									<motion.span
										key="copied"
										initial={{ y: 8, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -8, opacity: 0 }}
										transition={{ duration: 0.15 }}
										className="flex items-center gap-1.5"
									>
										<span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
										Copied!
									</motion.span>
								) : (
									<motion.span
										key="copy"
										initial={{ y: 8, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -8, opacity: 0 }}
										transition={{ duration: 0.15 }}
										className="flex items-center gap-2"
									>
										Copy Link <Link2 className="h-4 w-4" />
									</motion.span>
								)}
							</AnimatePresence>
						</motion.button>

						{/* Button 3 — Contact (outline, no hover scale) */}
						<a
							id="btn-contact"
							href="mailto:divyanshbaghel456@gmail.com"
							aria-label="Send an email"
							className="inline-flex items-center gap-2 rounded-full border border-[#2A4756]/20 bg-transparent px-6 py-3 text-sm font-gilroyBold text-text_primary transition-colors duration-300 hover:border-[#2A4756]/60 hover:bg-black/[0.03]"
						>
							Contact <Mail className="h-4 w-4" />
						</a>
					</div>
				</MotionInView>

				{/* Scroll indicator */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
					className="pointer-events-none absolute bottom-8 left-1/2 hidden md:flex -translate-x-1/2 flex-col items-center gap-2 text-[#2A4756]/50"
				>
					<span className="font-gilroyBold text-xs uppercase tracking-[0.2em]">
						Scroll Down
					</span>
					<motion.div
						animate={{ y: [0, 6, 0] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
					>
						<ArrowDown size={18} strokeWidth={1.5} />
					</motion.div>
				</motion.div>
			</section>

			{/* ══ Section 2: Bento Tech Stack ══════════════════════════════════════════ */}
			<section className="px-6 md:px-12">
				<MotionInView className="mx-auto w-full max-w-[1200px] py-24 md:py-32">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div>
							<h2 className="text-3xl font-gilroyBold tracking-tight md:text-5xl">
								My{" "}
								<HighlightBox className="font-gilroyBold tracking-tight">
									<motion.span
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
										className="inline-block will-change-transform"
									>
										Tech Stack
									</motion.span>
								</HighlightBox>
							</h2>
							<p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
								Technologies that I use to get the job done.
							</p>
						</div>

						{/* Pill Button "HIRE ME" */}
						<motion.a
							href="mailto:divyanshbaghel456@gmail.com?subject=Opportunity%20for%20Divyansh%20Baghel&body=Hi%20Divyansh%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20design%20engineering%20work.%20I'd%20love%20to%20chat%20about%20potential%20opportunities%20we%20have.%0A%0ABest%20regards%2C%0A%5BName%5D"
							initial="rest"
							whileHover="hover"
							whileTap={{ scale: 0.95 }}
							className="relative w-[190px] h-[54px] rounded-full bg-[#2A4756] text-sm font-gilroyBold tracking-widest text-[#F8EDD1] shadow-md transition-colors duration-300 hover:bg-[#2A4756]/90 cursor-pointer flex items-center"
						>
							{/* Text clip container */}
							<div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none flex items-center">
								{/* NOW! text (enters from left on hover) */}
								<motion.span
									variants={{
										rest: { opacity: 0, x: -30 },
										hover: { opacity: 1, x: 0 },
									}}
									transition={{ type: "spring", stiffness: 180, damping: 18 }}
									className="absolute left-6 inline-block whitespace-nowrap z-10"
								>
									NOW!
								</motion.span>

								{/* HIRE ME text (disappears to right on hover) */}
								<motion.span
									variants={{
										rest: { opacity: 1, x: 0 },
										hover: { opacity: 0, x: 30 },
									}}
									transition={{ type: "spring", stiffness: 180, damping: 18 }}
									className="absolute right-6 inline-block whitespace-nowrap z-10"
								>
									HIRE ME
								</motion.span>
							</div>

							{/* Boy smiling image (centered vertically, slides left to right on hover, overflows) */}
							{/* Note: Native layout size is set to the maximum scale (104px x 104px) and scaled down to 0.769 (80px) at rest.
                  This forces the browser to rasterize the SVG at high resolution, preventing any blur when scaling up on hover. */}
							<motion.img
								src="/images/boy-smiling.svg"
								alt=""
								className="absolute select-none origin-center pointer-events-none z-20"
								style={{
									left: "75px",
									top: "-33px",
									width: "120px",
									height: "120px",
									imageRendering: "-webkit-optimize-contrast",
									backfaceVisibility: "hidden",
									WebkitBackfaceVisibility: "hidden",
								}}
								variants={{
									rest: { x: -85, y: 5, scale: 0.667 },
									hover: { x: 0, y: 0, scale: 1.0 },
								}}
								transition={{ type: "spring", stiffness: 180, damping: 18 }}
							/>
						</motion.a>
					</div>

					{/* ── 4 column bento grid ─────────────────────────────────────── */}
					<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{TECH_CATEGORIES.map((cat) => (
							<TechCard key={cat.id} {...cat} />
						))}
					</div>
				</MotionInView>
			</section>

			{/* ══ Section 3: Why Hire Me ════════════════════════════════════════════════ */}
			{/* ══ Section 3: Why Hire Me ════════════════════════════════════════════════ */}
			<section className="min-h-screen px-6 md:px-12 py-24 md:py-0 flex items-center">
				<MotionInView className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center">
					<h2 className="text-3xl font-gilroyBold tracking-tight md:text-5xl">
						Why must you{" "}
						<HighlightBox className="font-gilroyBold tracking-tight">
							<motion.span
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
								className="inline-block will-change-transform"
							>
								hire me?
							</motion.span>
						</HighlightBox>
					</h2>

					<motion.div
						variants={LIST_STAGGER}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.3 }}
						className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2"
					>
						<motion.div variants={LIST_ITEM}>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								I bridge the product gap
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								I live at the intersection of design and code. My mornings are
								spent mapping user flows in Figma, and my afternoons are spent
								writing clean code in React, Next.js, and Node.js. You
								won&apos;t have to teach me how to talk to developers or
								designers—I already speak both languages.
							</p>
						</motion.div>
						<motion.div variants={LIST_ITEM}>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								Proven self-starter
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								Without a team or manager pushing me, I’ve independently built
								and shipped personal projects from scratch. I know how to scope
								a problem, design the solution, and code the final product.
							</p>
						</motion.div>
						<motion.div variants={LIST_ITEM}>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								Comfortable with ambiguity
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								I actually enjoy the friction of figuring out messy, complex
								problems. When I hit a bug or a design flaw in my projects, I
								don&apos;t stop—I research and fix it.
							</p>
						</motion.div>
						<motion.div variants={LIST_ITEM}>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								Ready to adapt
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								Beyond my technical toolkit, I bring a sharp attention to
								detail, an eagerness to learn from seasoned pros, and just
								enough humor to keep sprint planning engaging.
							</p>
						</motion.div>
					</motion.div>
				</MotionInView>
			</section>

			{/* ══ Section 4: Preferences ════════════════════════════════════════════════ */}
			<section className="min-h-screen px-6 md:px-12 py-24 md:py-0 flex items-center">
				<MotionInView className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center">
					<h2 className="text-3xl font-gilroyBold tracking-tight md:text-5xl">
						My{" "}
						<HighlightBox className="font-gilroyBold tracking-tight">
							<motion.span
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
								className="inline-block will-change-transform"
							>
								Preferences
							</motion.span>
						</HighlightBox>
					</h2>

					<div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
						<div>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								Amazing work culture.
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								I want to work with people who genuinely care about what they
								are building. I am looking for a team that gets excited about
								solving tough problems, shares ideas openly, and pushes each
								other to do great work.
							</p>
						</div>
						<div>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								Remote first.
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								I value the flexibility and comfort of working from anywhere. A
								company that supports remote work is a big plus for me.
							</p>
						</div>
						<div>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								Familiar Tech stack.
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								I believe in using the right tool for the right job, and so far
								I&apos;ve been able to pick up new technologies fairly quickly.
							</p>
						</div>
						<div>
							<p className="font-gilroyBold text-lg tracking-tight text-text_primary">
								Fair compensation.
							</p>
							<p className="mt-2 text-base leading-relaxed text-slate-700">
								I won&apos;t lie, I love getting fairly paid, for the work I do.
								But that&apos;s not my only incentive, anything but my
								side-projects are a testament to that.
							</p>
						</div>
					</div>
				</MotionInView>
			</section>

			{/* ══ Phase 3: Refined closing hook ════════════════════════════════════════ */}
			<MotionInView className="w-full px-6 md:px-12">
				<div className="mx-auto flex w-full max-w-[1000px] justify-center pt-12 pb-24">
					<motion.div
						variants={QUOTE_CONTAINER}
						initial="rest"
						whileHover="hover"
						className="flex cursor-default select-none flex-wrap justify-center gap-x-[0.35em] gap-y-2"
						aria-label="So, are you ready to make me an offer I can't refuse?"
					>
						{QUOTE_WORDS.map((word, i) => (
							<motion.span
								key={i}
								variants={QUOTE_WORD}
								className="font-gilroyRegular text-lg tracking-wide text-[#2A4756]/50 will-change-transform md:text-xl"
							>
								{word}
							</motion.span>
						))}
					</motion.div>
				</div>
			</MotionInView>

			<PageFooter showOfferButton={true} />
		</main>
	);
}
