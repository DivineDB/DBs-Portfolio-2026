"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick, ChevronDown } from "lucide-react";

const PAGES_ORDER = [
	{ path: "/about", label: "About Me" },
	{ path: "/work", label: "Selected Work" },
	{ path: "/other-things", label: "Other Things" },
	{ path: "/hire-me", label: "Hire Me" },
];

interface ScrollNudgeProps {
	onNudgeStateChange?: (active: boolean) => void;
}

export default function ScrollNudge({ onNudgeStateChange }: ScrollNudgeProps) {
	const router = useRouter();
	const [showNudge, setShowNudge] = useState(false);
	const [nextPage, setNextPage] = useState<{
		path: string;
		label: string;
	} | null>(null);

	const showNudgeRef = useRef<boolean>(false);
	const scrollStepRef = useRef<number>(0); // 0 = hidden, 1 = first scroll, 2 = second scroll, 3 = navigation
	const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
	const isNavigatingRef = useRef<boolean>(false);
	const isLockedRef = useRef<boolean>(false);
	const lockTimerRef = useRef<NodeJS.Timeout | null>(null);

	const updateNudgeState = (active: boolean) => {
		showNudgeRef.current = active;
		setShowNudge(active);
		if (onNudgeStateChange) {
			onNudgeStateChange(active);
		}
	};

	useEffect(() => {
		const handleScrollAction = () => {
			if (typeof window !== "undefined" && window.innerWidth < 768) return;

			const currentPath = window.location.pathname;
			let targetPage = PAGES_ORDER[0];
			const currentIndex = PAGES_ORDER.findIndex((p) => p.path === currentPath);
			if (currentIndex !== -1) {
				targetPage = PAGES_ORDER[(currentIndex + 1) % PAGES_ORDER.length];
			}

			if (showNudgeRef.current) {
				if (scrollStepRef.current === 1) {
					scrollStepRef.current = 2;
					setNextPage(targetPage);

					if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
					hideTimerRef.current = setTimeout(() => {
						updateNudgeState(false);
						scrollStepRef.current = 0;
						setNextPage(null);
					}, 4000);
				} else if (scrollStepRef.current === 2) {
					scrollStepRef.current = 3;
					if (!isNavigatingRef.current) {
						isNavigatingRef.current = true;
						router.push(targetPage.path);
					}
				}
			} else {
				scrollStepRef.current = 1;
				updateNudgeState(true);
				setNextPage(null);
				isNavigatingRef.current = false;

				if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
				hideTimerRef.current = setTimeout(() => {
					updateNudgeState(false);
					scrollStepRef.current = 0;
					setNextPage(null);
				}, 4000);
			}
		};

		const handleWheel = (e: WheelEvent) => {
			// Require a minimum scroll threshold to ignore minor accidental trackpad movement
			if (e.deltaY < 15) return;

			// If locked out from recent scroll action, swallow all scroll/inertia events
			if (isLockedRef.current) return;

			// Lock out further events for 700ms so a single physical swipe never triggers >1 step
			isLockedRef.current = true;
			if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
			lockTimerRef.current = setTimeout(() => {
				isLockedRef.current = false;
			}, 700);

			handleScrollAction();
		};

		window.addEventListener("wheel", handleWheel, { passive: true });

		return () => {
			window.removeEventListener("wheel", handleWheel);
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
			if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
		};
	}, [router]);

	const handleNextPageClick = () => {
		if (nextPage) {
			router.push(nextPage.path);
		} else {
			router.push("/about");
		}
	};

	return (
		<AnimatePresence mode="wait">
			{showNudge && (
				<motion.div
					key={nextPage ? "double-scroll-nudge" : "first-scroll-nudge"}
					initial={{ opacity: 0, y: 30, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					transition={{ type: "spring", stiffness: 350, damping: 25 }}
					className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto select-none"
				>
					<div className="flex items-center gap-3 px-4.5 py-2.5 rounded-full bg-[#2A4756] border border-[#2A4756]/20 text-[#F9FFD9] shadow-xl shadow-[#2A4756]/20 backdrop-blur-md">
						{nextPage ? (
							<button
								onClick={handleNextPageClick}
								className="flex items-center gap-2 text-[12px] md:text-[13px] font-satoshi font-medium text-[#F9FFD9] hover:opacity-90 transition-opacity cursor-pointer group"
							>
								<span>
									Scroll again or{" "}
									<strong className="font-bold underline underline-offset-2">
										Click here
									</strong>{" "}
									to view{" "}
									<span className="text-[#A2F991] font-semibold">
										{nextPage.label}
									</span>
								</span>
								<ChevronDown className="w-4 h-4 text-[#A2F991] animate-bounce group-hover:translate-y-0.5 transition-transform" />
							</button>
						) : (
							<div className="flex items-center gap-2 text-[12px] md:text-[13px] font-satoshi font-medium text-[#F9FFD9]/95">
								<MousePointerClick className="w-4 h-4 text-[#A2F991] animate-pulse" />
								<span>
									Click on{" "}
									<strong className="text-[#A2F991] font-bold">
										the windows
									</strong>{" "}
									to interact
								</span>
							</div>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
