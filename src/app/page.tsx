"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { HighlightBox } from "@/components/ui/highlight-box";
import { motion, AnimatePresence } from "framer-motion";
import {
	Coffee,
	Sun,
	Sunset,
	Moon,
	X,
	ArrowDown,
	PartyPopper,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import InteractiveBird from "@/components/InteractiveBird";
import { cn } from "@/lib/cn";
import confetti from "canvas-confetti";

export default function Home() {
	const [time, setTime] = useState("");
	const [isMounted, setIsMounted] = useState(false);
	const [showLocation, setShowLocation] = useState(false);
	const [playIntro, setPlayIntro] = useState(false);
	const [buildingLoaded, setBuildingLoaded] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastIcon, setToastIcon] = useState<
		"morning" | "afternoon" | "evening" | "night"
	>("morning");
	const [isMilestone, setIsMilestone] = useState(false);
	const [visitorCount, setVisitorCount] = useState<number | null>(null);
	const [animationComplete, setAnimationComplete] = useState(false);
	const [isBirdHovered, setIsBirdHovered] = useState(false);
	const [birdMessage, setBirdMessage] = useState("hi...");
	const [showSocialMenu, setShowSocialMenu] = useState(false);
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const socialMenuRef = useRef<HTMLDivElement | null>(null);
	const buildingRef = useRef<HTMLImageElement | null>(null);

	const triggerCelebration = (count: number) => {
		confetti({
			particleCount: 150,
			spread: 80,
			origin: { y: 0.6 },
			zIndex: 100000,
		});
		setTimeout(() => {
			confetti({
				particleCount: 100,
				spread: 100,
				origin: { y: 0.7 },
				zIndex: 100000,
			});
		}, 400);

		const coolMessages = [
			`OMGGGG! Milestone visitor #${count}! 🏆`,
			`You are visitor #${count}! ABSOLUTE LEGEND! 🥳`,
			`Whoa, visitor #${count}! Golden achievement unlocked! 🔥`,
			`We have a winner! Visitor #${count}! ⭐`,
			`Holy moly! You're officially visitor #${count}! 🎉`,
		];
		const randomMessage =
			coolMessages[Math.floor(Math.random() * coolMessages.length)];
		setBirdMessage(randomMessage);
		setIsBirdHovered(true);

		setTimeout(() => {
			setIsBirdHovered(false);
		}, 10000);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				socialMenuRef.current &&
				!socialMenuRef.current.contains(event.target as Node)
			) {
				const target = event.target as HTMLElement;
				if (
					target.id === "contact-menu-btn" ||
					target.closest("#contact-menu-btn")
				) {
					return;
				}
				setShowSocialMenu(false);
			}
		}

		if (showSocialMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showSocialMenu]);

	useEffect(() => {
		const firstVisit = !sessionStorage.getItem("hasVisitedHome");
		if (firstVisit) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setPlayIntro(true);
			sessionStorage.setItem("hasVisitedHome", "true");
		}
		setIsMounted(true);

		// Set custom toast greeting based on local time (Default fallback)
		const hours = new Date().getHours();
		let greeting = "";
		let iconType: "morning" | "afternoon" | "evening" | "night" = "morning";

		if (hours >= 5 && hours < 12) {
			greeting = "Good Morning Visitor! ☕️ Welcome to my portfolio.";
			iconType = "morning";
		} else if (hours >= 12 && hours < 17) {
			greeting = "Good Afternoon Visitor! ☀️ Thanks for dropping by.";
			iconType = "afternoon";
		} else if (hours >= 17 && hours < 23) {
			greeting = "Good Evening Visitor! 🌇 Keep Browsing.";
			iconType = "evening";
		} else {
			greeting = "Hello, fellow night owl.";
			iconType = "night";
		}

		// Calculate delay time for toast
		const delayTime = firstVisit ? 5800 : 1500;
		let toastTimeout: NodeJS.Timeout;
		let dismissTimeout: NodeJS.Timeout;

		const registerVisitAndGetToast = async () => {
			const hasRecorded = sessionStorage.getItem("hasRecordedVisit");
			let isMilestoneVisit = false;
			let currentCount = 0;

			if (!hasRecorded) {
				try {
					const response = await fetch("/api/visitor-count", {
						method: "POST",
					});
					if (response.ok) {
						const data = await response.json();
						currentCount = data.count;
						sessionStorage.setItem("hasRecordedVisit", "true");
						if (currentCount > 0 && currentCount % 50 === 0) {
							isMilestoneVisit = true;
						}
					}
				} catch (error) {
					console.error("Failed to register visitor count:", error);
				}
			}

			if (isMilestoneVisit) {
				setIsMilestone(true);
				setVisitorCount(currentCount);
				let milestoneCopy = "";
				if (currentCount === 50) {
					milestoneCopy =
						"🎉 Woohoo! You are officially my 50th visitor! You just unlocked the golden milestone toast. Thanks for stopping by! 🚀";
				} else if (currentCount === 100) {
					milestoneCopy =
						"✨ Landmark moment! You're visitor #100! That officially makes you a VIP. Thank you for being a part of my journey! 🥳";
				} else {
					milestoneCopy = `🏆 Milestone unlocked! You are visitor #${currentCount}! Thank you for landing on my corner of the internet. Enjoy your stay! 🌟`;
				}
				setToastMessage(milestoneCopy);
			} else {
				setToastMessage(greeting);
				setToastIcon(iconType);
			}

			// Trigger toast display
			toastTimeout = setTimeout(() => {
				setShowToast(true);
				if (isMilestoneVisit) {
					triggerCelebration(currentCount);
				}
			}, delayTime);

			// Auto-dismiss toast after a slightly longer duration for milestone readability
			dismissTimeout = setTimeout(
				() => {
					setShowToast(false);
				},
				delayTime + (isMilestoneVisit ? 8000 : 6000),
			);
		};

		registerVisitAndGetToast();

		const updateTime = () => {
			const options: Intl.DateTimeFormatOptions = {
				timeZone: "Asia/Kolkata",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			};
			setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => {
			clearInterval(interval);
			if (toastTimeout) clearTimeout(toastTimeout);
			if (dismissTimeout) clearTimeout(dismissTimeout);
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (buildingRef.current && buildingRef.current.complete) {
			setBuildingLoaded(true);
		}
	}, []);

	const testMilestone = (count: number) => {
		setShowToast(false);
		setTimeout(() => {
			setIsMilestone(true);
			setVisitorCount(count);
			let milestoneCopy = "";
			if (count === 50) {
				milestoneCopy =
					"🎉 Woohoo! You are officially my 50th visitor! You just unlocked the golden milestone toast. Thanks for stopping by! 🚀";
			} else if (count === 100) {
				milestoneCopy =
					"✨ Landmark moment! You're visitor #100! That officially makes you a VIP. Thank you for being a part of my journey! 🥳";
			} else {
				milestoneCopy = `🏆 Milestone unlocked! You are visitor #${count}! Thank you for landing on my corner of the internet. Enjoy your stay! 🌟`;
			}
			setToastMessage(milestoneCopy);
			setShowToast(true);
			triggerCelebration(count);

			setTimeout(() => {
				setShowToast(false);
			}, 10000);
		}, 300);
	};

	return (
		<main className="relative w-full min-h-screen md:h-screen overflow-y-auto md:overflow-hidden bg-background">
			{/* A subtle, animated noise overlay for texture */}
			<div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay noise-overlay"></div>

			{/* Achievement Toast (Center of screen) */}
			<AnimatePresence>
				{showToast && isMilestone && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none p-4 bg-black/15 backdrop-blur-[4px]"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 12 }}
							transition={{
								type: "spring",
								stiffness: 380,
								damping: 30,
								mass: 0.9,
							}}
							className="pointer-events-auto select-none flex flex-col items-center gap-4 md:gap-6 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#FFFDF0]/98 via-[#FFF9D6]/98 to-[#FFEFA6]/98 border-2 border-[#E5C158] text-[#5C4308] shadow-2xl w-full max-w-[360px] md:max-w-[420px] text-center relative"
						>
							{/* Celebration graphics or icon */}
							<motion.div
								animate={{
									rotate: [0, -15, 15, -15, 0],
									scale: [1, 1.15, 1.15, 1],
								}}
								transition={{
									repeat: Infinity,
									repeatType: "reverse",
									duration: 1.5,
									ease: "easeInOut",
								}}
								className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FFEFA6] border border-[#E5C158]/50 shadow-inner"
							>
								<PartyPopper className="w-6 h-6 md:w-8 md:h-8 text-[#E5C158]" />
							</motion.div>

							<div className="flex flex-col gap-1 md:gap-2">
								<h3 className="font-gilroyBold text-lg md:text-xl tracking-tight text-[#5C4308]">
									Milestone Unlocked!
								</h3>
								<p className="font-satoshi text-xs md:text-sm leading-relaxed text-[#5C4308]/90">
									{toastMessage}
								</p>
							</div>

							<button
								onClick={() => setShowToast(false)}
								className="mt-1 md:mt-2 px-5 py-1.5 md:px-6 md:py-2 rounded-full bg-[#5C4308] text-[#FFFDF0] hover:bg-[#5C4308]/90 active:scale-95 transition-all text-[10px] md:text-xs font-gilroyBold tracking-wider cursor-pointer"
							>
								Awesome!
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Custom Toast Notification */}
			<div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
				<AnimatePresence>
					{showToast && !isMilestone && (
						<motion.div
							initial={{ opacity: 0, y: -20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.95 }}
							transition={{ type: "spring", stiffness: 300, damping: 25 }}
							className="pointer-events-auto select-none flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl md:rounded-full backdrop-blur-md shadow-lg shadow-[#2a4756]/5 w-full bg-[#F9FFD9]/95 border border-[#EADFC3] text-[#26393A] max-w-[360px] md:w-auto"
						>
							<div className="flex items-center gap-2.5">
								{toastIcon === "morning" && (
									<Coffee className="w-4 h-4 text-[#26393A] shrink-0" />
								)}
								{toastIcon === "afternoon" && (
									<Sun className="w-4 h-4 text-[#26393A] shrink-0" />
								)}
								{toastIcon === "evening" && (
									<Sunset className="w-4 h-4 text-[#26393A] shrink-0" />
								)}
								{toastIcon === "night" && (
									<Moon className="w-4 h-4 text-[#26393A] shrink-0" />
								)}

								<span className="font-gilroyBold text-[11px] md:text-[14px] leading-snug">
									{toastMessage}
								</span>
							</div>

							<button
								onClick={() => setShowToast(false)}
								className="w-5 h-5 flex items-center justify-center rounded-full active:scale-90 transition-all cursor-pointer focus:outline-none shrink-0 hover:bg-[#EADFC3]/40"
								aria-label="Dismiss greeting"
							>
								<X className="w-3.5 h-3.5 text-[#26393A]/60" />
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* The main grid container */}
			<div className="w-full max-w-[1600px] min-h-screen md:h-full mx-auto px-8 md:px-16 grid grid-cols-12 gap-8 relative pb-20 md:pb-0">
				{/* Phase 1: Unified Left Column */}
				<div className="col-span-12 md:col-span-6 md:col-start-2 flex flex-col justify-between min-h-[75vh] md:min-h-[85vh] md:h-full pt-16 pb-6 md:py-10 z-20 pointer-events-none">
					{/* TOP / CENTER: Hero Text */}
					<motion.div
						initial="hidden"
						animate="visible"
						variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
						className="flex flex-col justify-center flex-grow pointer-events-auto"
					>
						<motion.span
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
								},
							}}
							className="text-[16px] md:text-[18px] font-satoshi font-medium text-[#2A4756]/40 mb-2.5 select-none"
						>
							Hey, I&apos;m
						</motion.span>

						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
								},
							}}
							className="flex flex-row items-baseline gap-[10px] mb-2.5 flex-wrap"
						>
							<h1 className="text-[36px] md:text-[54px] font-satoshi font-bold tracking-tight text-[#2A4756] leading-none select-none">
								Divyansh
							</h1>
							<HighlightBox
								className="py-[2px] md:py-[3px] px-[8px] md:px-[12px] ml-0 md:ml-0"
								textClassName="text-[36px] md:text-[54px] font-satoshi font-normal text-[#2A4756] tracking-tight leading-none"
							>
								Baghel
							</HighlightBox>
						</motion.div>

						<motion.h2
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
								},
							}}
							className="text-[18px] md:text-[20px] font-satoshi font-normal text-[#2A4756]/40 tracking-tight mb-[42px] select-none"
						>
							Design Engineer
						</motion.h2>

						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
								},
							}}
							className="flex gap-[30px] md:gap-[50px]"
						>
							<a
								href="/Divyansh_Baghel_Resume.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[16px] md:text-[18px] font-satoshi font-medium text-[#2A4756] relative overflow-hidden group py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#2A4756] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
							>
								Resume
							</a>
							<button
								id="contact-menu-btn"
								onClick={() => setShowSocialMenu(!showSocialMenu)}
								className="text-[16px] md:text-[18px] font-satoshi font-medium text-[#2A4756] relative overflow-hidden group py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#2A4756] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 cursor-pointer focus:outline-none"
							>
								Contact
							</button>
						</motion.div>
					</motion.div>

					{/* BOTTOM: Footer & Clock */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 1 }}
						className="flex flex-col gap-[21px] pointer-events-auto"
					>
						<div className="flex items-center gap-3">
							{/* Fixed-size Clock / Social Morph Menu */}
							<motion.div
								ref={socialMenuRef}
								layout
								transition={{ type: "spring", stiffness: 300, damping: 25 }}
								style={{ borderRadius: "9999px" }}
								className={`h-[36px] flex justify-center items-center bg-[#F9FFD9] border border-[#EADFC3] text-[#26393A] transition-all select-none shadow-[#2a4756]/5 relative ${
									showSocialMenu ? "w-[185px] px-3.5" : "w-[122px]"
								}`}
							>
								<AnimatePresence mode="wait">
									{showSocialMenu ? (
										<motion.div
											key="socials"
											initial={{ opacity: 0, scale: 0.95 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{
												opacity: 0,
												scale: 0.9,
												transition: { duration: 0.08 },
											}}
											transition={{ duration: 0.2 }}
											className="flex items-center gap-3"
										>
											<a
												href="https://www.linkedin.com/in/divyansh-baghel/"
												target="_blank"
												rel="noopener noreferrer"
												className="hover:scale-115 active:scale-95 transition-transform text-[#26393A]/80 hover:text-[#26393A] flex items-center justify-center"
												aria-label="LinkedIn"
											>
												<FaLinkedin className="w-4 h-4" />
											</a>
											<a
												href="mailto:divyanshbaghel456@gmail.com"
												className="hover:scale-115 active:scale-95 transition-transform text-[#26393A]/80 hover:text-[#26393A] flex items-center justify-center"
												aria-label="Email"
											>
												<FaEnvelope className="w-4 h-4" />
											</a>
											<a
												href="https://github.com/DivineDB"
												target="_blank"
												rel="noopener noreferrer"
												className="hover:scale-115 active:scale-95 transition-transform text-[#26393A]/80 hover:text-[#26393A] flex items-center justify-center"
												aria-label="GitHub"
											>
												<FaGithub className="w-4 h-4" />
											</a>
											<a
												href="https://www.instagram.com/dbdoesstuff/"
												target="_blank"
												rel="noopener noreferrer"
												className="hover:scale-115 active:scale-95 transition-transform text-[#26393A]/80 hover:text-[#26393A] flex items-center justify-center"
												aria-label="Instagram"
											>
												<FaInstagram className="w-4 h-4" />
											</a>
											<button
												onClick={() => setShowSocialMenu(false)}
												className="ml-0.5 pl-1.5 border-l border-[#EADFC3] hover:scale-115 active:scale-90 transition-transform text-[#26393A]/40 hover:text-[#26393A] cursor-pointer focus:outline-none flex items-center justify-center"
												aria-label="Close"
											>
												<X className="w-3.5 h-3.5" />
											</button>
										</motion.div>
									) : (
										<motion.button
											key="clock"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											onClick={() => setShowLocation(!showLocation)}
											className="w-full h-full flex justify-center items-center text-[15px] font-satoshi font-medium hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none"
										>
											<AnimatePresence mode="wait">
												{showLocation ? (
													<motion.span
														key="location"
														initial={{ y: 6, opacity: 0 }}
														animate={{ y: 0, opacity: 1 }}
														exit={{ y: -6, opacity: 0 }}
														className="will-change-transform"
													>
														Gwalior, IN
													</motion.span>
												) : isMounted ? (
													<motion.span
														key="time"
														initial={{ y: 6, opacity: 0 }}
														animate={{ y: 0, opacity: 1 }}
														exit={{ y: -6, opacity: 0 }}
														className="will-change-transform"
													>
														{time || "15:23"}&nbsp;IST
													</motion.span>
												) : (
													<span
														key="placeholder"
														className="text-transparent"
														aria-hidden="true"
													>
														15:23 IST
													</span>
												)}
											</AnimatePresence>
										</motion.button>
									)}
								</AnimatePresence>
							</motion.div>

							{/* ⌘K Command Palette Trigger — matches clock pill aesthetic (hidden on mobile due to FAB) */}
							<button
								onClick={() =>
									document.dispatchEvent(
										new KeyboardEvent("keydown", {
											key: "k",
											ctrlKey: true,
											bubbles: true,
										}),
									)
								}
								className="h-[36px] px-4 hidden md:flex items-center gap-2 rounded-full bg-[#F9FFD9] border border-[#EADFC3] text-[#26393A] text-[13px] font-satoshi font-medium transition-transform hover:scale-105 active:scale-95 focus:outline-none select-none cursor-pointer"
								aria-label="Open command palette"
							>
								<span className="opacity-50 text-[11px]">Press</span>
								<kbd className="font-satoshi font-semibold tracking-tight">
									⌘K
								</kbd>
							</button>
						</div>
						<span className="text-[10px] font-satoshi font-medium text-[#26393A] select-none">
							© 2026 | Divyansh Baghel.
						</span>

						{/* Animated mobile scroll indicator */}
						<div className="md:hidden flex justify-center w-full mt-6 animate-bounce">
							<button
								onClick={() => {
									const buildingEl = document.getElementById(
										"interactive-building-sec",
									);
									if (buildingEl) {
										buildingEl.scrollIntoView({ behavior: "smooth" });
									}
								}}
								className="pointer-events-auto flex flex-col items-center gap-1 text-[#2A4756]/45 hover:text-[#2A4756]/65 transition-colors focus:outline-none"
								aria-label="Scroll to explore interactive building"
							>
								<span className="text-[10px] font-satoshi font-semibold uppercase tracking-wider">
									Scroll to Explore
								</span>
								<ArrowDown size={14} strokeWidth={2.5} />
							</button>
						</div>
					</motion.div>
				</div>

				{/* Phase 2: Right Column (The Building - Animated Entrance) */}
				<div
					id="interactive-building-sec"
					className="col-span-12 md:col-span-5 relative z-10 flex justify-center items-end pointer-events-none mt-4 md:mt-0 h-auto md:h-full w-full max-w-[450px] md:max-w-none mx-auto md:mx-0"
				>
					{/* Building rises from below */}
					<motion.div
						key={playIntro ? "intro-building" : "static-building"}
						initial={
							!isMounted || playIntro
								? {
										clipPath: "inset(100% 0% 0% 0%)",
										y: 30,
										scale: 0.98,
										opacity: 0,
									}
								: { clipPath: "none", y: 0, scale: 1, opacity: 1 }
						}
						animate={
							!isMounted
								? {
										clipPath: "inset(100% 0% 0% 0%)",
										y: 30,
										scale: 0.98,
										opacity: 0,
									}
								: playIntro
									? buildingLoaded
										? {
												clipPath: "inset(0% 0% 0% 0%)",
												y: 0,
												scale: 1,
												opacity: 1,
											}
										: {
												clipPath: "inset(100% 0% 0% 0%)",
												y: 30,
												scale: 0.98,
												opacity: 0,
											}
									: { clipPath: "none", y: 0, scale: 1, opacity: 1 }
						}
						transition={
							!isMounted
								? { duration: 0 }
								: playIntro
									? { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }
									: { duration: 0 }
						}
						onAnimationComplete={() => {
							if (isMounted && buildingLoaded) {
								setAnimationComplete(true);
							}
						}}
						className="building-container relative h-auto md:h-[96vh] pointer-events-none select-none flex items-end w-full aspect-[611/996] md:aspect-auto will-change-[transform,opacity]"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							ref={buildingRef}
							src="/images/Building.svg"
							className="w-full h-full pointer-events-auto"
							alt="Interactive Building"
							onLoad={() => setBuildingLoaded(true)}
						/>

						<div className="pointer-events-none absolute top-[45.2%] md:top-[42.5%] left-[23%] md:left-[24.5%] z-30 h-auto w-[28%] overflow-hidden">
							<motion.div
								key={playIntro ? "intro-boy" : "static-boy"}
								className="boy-container"
								initial={
									!isMounted || playIntro
										? { opacity: 0, y: 60 }
										: { opacity: 1, y: 0 }
								}
								animate={
									!isMounted
										? { opacity: 0, y: 60 }
										: playIntro
											? buildingLoaded && animationComplete
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 60 }
											: { opacity: 1, y: 0 }
								}
								transition={
									!isMounted
										? { duration: 0 }
										: playIntro
											? { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
											: { duration: 0 }
								}
							>
								<Image
									src="/images/boy.svg"
									alt=""
									aria-hidden
									width={184}
									height={180}
									className="w-full h-auto"
									priority
								/>
							</motion.div>
						</div>

						{/* Interactive Bird - Sitting perfectly on the left roof corner chimney block */}
						<motion.div
							key={playIntro ? "intro-bird" : "static-bird"}
							initial={
								!isMounted || playIntro
									? { opacity: 0, scale: 0 }
									: { opacity: 1, scale: 1 }
							}
							animate={
								!isMounted
									? { opacity: 0, scale: 0 }
									: playIntro
										? buildingLoaded && animationComplete
											? { opacity: 1, scale: 1 }
											: { opacity: 0, scale: 0 }
										: { opacity: 1, scale: 1 }
							}
							transition={
								!isMounted
									? { duration: 0 }
									: playIntro
										? {
												type: "spring",
												stiffness: 400,
												damping: 17,
												delay: 0.1,
											}
										: { duration: 0 }
							}
							onMouseEnter={() => {
								if (hoverTimeoutRef.current) {
									clearTimeout(hoverTimeoutRef.current);
								}
								hoverTimeoutRef.current = setTimeout(() => {
									const greetings = [
										"hi...",
										"sup?",
										"peek-a-boo!",
										"looking at me?",
										"need help?",
										"coo coo!",
										"what's cooking?",
									];
									const randomGreeting =
										greetings[Math.floor(Math.random() * greetings.length)];
									setBirdMessage(randomGreeting);
									setIsBirdHovered(true);
								}, 350); // 350ms delay before appearing
							}}
							onMouseLeave={() => {
								if (hoverTimeoutRef.current) {
									clearTimeout(hoverTimeoutRef.current);
								}
								hoverTimeoutRef.current = setTimeout(() => {
									setIsBirdHovered(false);
								}, 300); // 300ms delay before disappearing
							}}
							className="bird-container pointer-events-auto absolute top-[8.8%] left-[7.7%] z-30 w-[17%] h-auto cursor-pointer hidden md:block"
						>
							<InteractiveBird className="w-full h-auto" />

							{/* Animated chat popup saying a fun greeting */}
							<AnimatePresence>
								{isBirdHovered && (
									<motion.div
										initial={{ opacity: 0, scale: 0.95, y: 3, x: "-50%" }}
										animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
										exit={{ opacity: 0, scale: 0.95, y: 3, x: "-50%" }}
										transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
										className="absolute bottom-[90%] left-[43%] z-50 bg-white/95 backdrop-blur-sm border border-[#EADFC3] text-[#26393A] font-satoshi font-bold text-[10px] px-2 py-1 rounded-lg shadow-md pointer-events-none select-none flex items-center justify-center whitespace-nowrap"
									>
										{birdMessage}
										{/* Triangle tail for speech bubble */}
										<div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#EADFC3]"></div>
										<div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white"></div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>

						{/* Interactive Window Links — staggered fade-in after building lands */}
						<motion.div
							key={playIntro ? "intro-windows" : "static-windows"}
							initial={!isMounted || playIntro ? "hidden" : "visible"}
							animate={
								!isMounted
									? "hidden"
									: playIntro
										? buildingLoaded && animationComplete
											? "visible"
											: "hidden"
										: "visible"
							}
							variants={{
								visible: {
									transition: {
										staggerChildren: playIntro ? 0.3 : 0,
										delayChildren: playIntro ? 1.2 : 0,
									},
								},
								hidden: {},
							}}
							className="contents"
						>
							<motion.div
								variants={{
									hidden: { opacity: 0, scale: 0.95 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.4, ease: "easeOut" },
									},
								}}
								className="window-hotspot absolute top-[34.5%] left-[29.5%] w-[17.5%] h-[23.5%] md:top-[34.1%] md:left-[29.8%] md:w-[16.5%] md:h-[23.5%] z-20"
							>
								<Link
									href="/about"
									className="relative overflow-hidden pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
									aria-label="About Me"
								>
									{/* Glow pulse overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { opacity: 0 },
												visible: {
													opacity: [0, 0.7, 0],
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute inset-0 bg-[#A2F991] pointer-events-none"
										/>
									)}
									{/* Shine sweeping diagonal line overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { left: "-150%" },
												visible: {
													left: "150%",
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute top-0 bottom-0 w-[60%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg] pointer-events-none"
										/>
									)}
								</Link>
							</motion.div>

							<motion.div
								variants={{
									hidden: { opacity: 0, scale: 0.95 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.4, ease: "easeOut" },
									},
								}}
								className="window-hotspot absolute top-[34.5%] left-[59%] w-[16%] h-[23.5%] md:top-[34.1%] md:left-[59%] md:w-[16.5%] md:h-[22.5%] z-20"
							>
								<Link
									href="/work"
									className="relative overflow-hidden pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
									aria-label="Selected Work"
								>
									{/* Glow pulse overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { opacity: 0 },
												visible: {
													opacity: [0, 0.7, 0],
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute inset-0 bg-[#A2F991] pointer-events-none"
										/>
									)}
									{/* Shine sweeping diagonal line overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { left: "-150%" },
												visible: {
													left: "150%",
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute top-0 bottom-0 w-[60%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg] pointer-events-none"
										/>
									)}
								</Link>
							</motion.div>

							<motion.div
								variants={{
									hidden: { opacity: 0, scale: 0.95 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.4, ease: "easeOut" },
									},
								}}
								className="window-hotspot absolute top-[69.5%] left-[30%] w-[16.5%] h-[24%] md:top-[69.1%] md:left-[30%] md:w-[16.5%] md:h-[24%] z-20"
							>
								<Link
									href="/other-things"
									className="relative overflow-hidden pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
									aria-label="Other things I do"
								>
									{/* Glow pulse overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { opacity: 0 },
												visible: {
													opacity: [0, 0.7, 0],
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute inset-0 bg-[#A2F991] pointer-events-none"
										/>
									)}
									{/* Shine sweeping diagonal line overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { left: "-150%" },
												visible: {
													left: "150%",
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute top-0 bottom-0 w-[60%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg] pointer-events-none"
										/>
									)}
								</Link>
							</motion.div>

							<motion.div
								variants={{
									hidden: { opacity: 0, scale: 0.95 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.4, ease: "easeOut" },
									},
								}}
								className="window-hotspot absolute top-[69.5%] left-[59%] w-[16.5%] h-[24%] md:top-[69.3%] md:left-[59%] md:w-[16.7%] md:h-[23.5%] z-20"
							>
								<Link
									href="/hire-me"
									className="relative overflow-hidden pointer-events-auto building-window w-full h-full block rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] active:scale-[0.98] active:bg-[#A2F991]/35 active:border-[#2A4756]/20 active:shadow-md transition-all duration-300"
									aria-label="Hire Me"
								>
									{/* Glow pulse overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { opacity: 0 },
												visible: {
													opacity: [0, 0.7, 0],
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute inset-0 bg-[#A2F991] pointer-events-none"
										/>
									)}
									{/* Shine sweeping diagonal line overlay */}
									{playIntro && (
										<motion.div
											variants={{
												hidden: { left: "-150%" },
												visible: {
													left: "150%",
													transition: { duration: 1.2, ease: "easeInOut" },
												},
											}}
											className="absolute top-0 bottom-0 w-[60%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg] pointer-events-none"
										/>
									)}
								</Link>
							</motion.div>
						</motion.div>

						{/* Window text labels — animated in sync with each hotspot shine */}
						<motion.span
							className="window-text wt-about-me"
							initial={{ opacity: 0 }}
							animate={
								!isMounted
									? { opacity: 0 }
									: playIntro
										? buildingLoaded && animationComplete
											? { opacity: 1 }
											: { opacity: 0 }
										: { opacity: 1 }
							}
							transition={
								!isMounted
									? { duration: 0 }
									: playIntro
										? { duration: 0.4, ease: "easeOut", delay: 1.2 }
										: { duration: 0 }
							}
						>
							About Me
						</motion.span>
						<motion.span
							className="window-text wt-selected-work"
							initial={{ opacity: 0 }}
							animate={
								!isMounted
									? { opacity: 0 }
									: playIntro
										? buildingLoaded && animationComplete
											? { opacity: 1 }
											: { opacity: 0 }
										: { opacity: 1 }
							}
							transition={
								!isMounted
									? { duration: 0 }
									: playIntro
										? { duration: 0.4, ease: "easeOut", delay: 1.5 }
										: { duration: 0 }
							}
						>
							Selected Work
						</motion.span>
						<motion.span
							className="window-text wt-other-things"
							initial={{ opacity: 0 }}
							animate={
								!isMounted
									? { opacity: 0 }
									: playIntro
										? buildingLoaded && animationComplete
											? { opacity: 1 }
											: { opacity: 0 }
										: { opacity: 1 }
							}
							transition={
								!isMounted
									? { duration: 0 }
									: playIntro
										? { duration: 0.4, ease: "easeOut", delay: 1.8 }
										: { duration: 0 }
							}
						>
							Other things I do
						</motion.span>
						<motion.span
							className="window-text wt-hire-me"
							initial={{ opacity: 0 }}
							animate={
								!isMounted
									? { opacity: 0 }
									: playIntro
										? buildingLoaded && animationComplete
											? { opacity: 1 }
											: { opacity: 0 }
										: { opacity: 1 }
							}
							transition={
								!isMounted
									? { duration: 0 }
									: playIntro
										? { duration: 0.4, ease: "easeOut", delay: 2.1 }
										: { duration: 0 }
							}
						>
							Hire Me
						</motion.span>
					</motion.div>
				</div>
			</div>
		</main>
	);
}
