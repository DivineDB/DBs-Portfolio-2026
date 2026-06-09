"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackToHome() {
  const pathname = usePathname();

  // Hide the back-to-home button on the main landing page
  if (pathname === "/") return null;

  // Dynamically adapt to container widths matching other pages' layout boundaries
  const getLayoutClasses = (path: string) => {
    if (path === "/other-things") {
      return {
        outerClass: "",
        innerClass: "max-w-7xl px-5 md:px-16"
      };
    }
    if (path === "/work/scout" || path === "/work/pos-panel") {
      return {
        outerClass: "px-6",
        innerClass: "max-w-[800px]"
      };
    }
    if (path.startsWith("/work/")) {
      return {
        outerClass: "px-6",
        innerClass: "max-w-3xl"
      };
    }
    return {
      outerClass: "px-6 md:px-12",
      innerClass: "max-w-[1000px]"
    };
  };

  const { outerClass, innerClass } = getLayoutClasses(pathname);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 left-0 right-0 z-[50] pointer-events-none w-full ${outerClass}`}
    >
      <div className={`${innerClass} mx-auto w-full flex justify-start`}>
        <Link
          href="/"
          className="
            pointer-events-auto
            flex items-center gap-2
            h-[36px] px-4
            rounded-full
            bg-[var(--button-bg,#f8edd1)]
            border border-[var(--button-border,rgba(42,71,86,0.12))]
            text-xs font-satoshi font-semibold tracking-wider uppercase
            text-[var(--button-text,#2a4756)]/60 hover:text-[var(--button-text,#2a4756)]
            transition-all duration-300
            active:scale-95 cursor-pointer
          "
          style={{
            color: "var(--button-text, #2a4756)",
          }}
          aria-label="Back to home"
        >
          <ArrowLeft size={13} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" style={{ color: "var(--button-text, #2a4756)" }} />
          <span style={{ color: "var(--button-text, #2a4756)" }}>Home</span>
        </Link>
      </div>
    </motion.div>
  );
}
