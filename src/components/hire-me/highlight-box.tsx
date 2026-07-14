"use client";

import { cn } from "@/lib/cn";

type HighlightBoxProps = {
  children: React.ReactNode;
  className?: string;
};

export function HighlightBox({ children, className }: HighlightBoxProps) {
  return (
    <span
      className={cn(
        "inline-block bg-accent_highlight px-3 py-1 leading-none text-[#2A4756] font-gilroyBold rounded-sm shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
