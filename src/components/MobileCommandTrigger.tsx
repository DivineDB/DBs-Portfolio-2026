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
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]
        flex items-center gap-2.5
        min-w-[180px] h-[44px] px-5
        rounded-full
        bg-[#f8edd1]/85 backdrop-blur-xl
        border border-[#2a4756]/12
        shadow-[0_8px_32px_rgba(42,71,86,0.18),0_0_0_1px_rgba(42,71,86,0.06)]
        text-sm font-gilroyRegular text-[#2a4756]/60
        select-none cursor-pointer
        will-change-transform
      "
    >
      <Search size={14} strokeWidth={1.75} className="shrink-0 opacity-60" />
      <span className="flex-1 text-left tracking-wide">Explore...</span>
      <kbd className="text-[10px] font-gilroyBold text-[#2a4756]/30 tracking-widest">
        ⌘K
      </kbd>
    </motion.button>
  );
}
