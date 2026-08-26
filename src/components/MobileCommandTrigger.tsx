"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function MobileCommandTrigger() {
  const openPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
    );
  };

  return (
    <motion.button
      id="mobile-command-fab"
      aria-label="Open command palette"
      onClick={openPalette}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className="
        md:hidden
        fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-[60]
        flex items-center gap-2.5
        min-w-[180px] h-[44px] px-5
        rounded-full
        bg-[var(--button-bg,#f8edd1)]
        border border-[var(--button-border,rgba(42,71,86,0.12))]
        text-sm font-gilroyRegular
        select-none cursor-pointer
        will-change-transform
      "
      style={{
        color: "var(--button-text, #2a4756)",
      }}
    >
      <Search size={14} strokeWidth={1.75} className="shrink-0 opacity-60" style={{ color: "var(--button-text, #2a4756)" }} />
      <span className="flex-1 text-left tracking-wide opacity-80" style={{ color: "var(--button-text, #2a4756)" }}>Explore...</span>
      <kbd className="text-[10px] font-gilroyBold tracking-widest opacity-40" style={{ color: "var(--button-text, #2a4756)" }}>
        ⌘K
      </kbd>
    </motion.button>
  );
}
