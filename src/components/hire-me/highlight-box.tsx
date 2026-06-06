"use client";

type HighlightBoxProps = {
  children: React.ReactNode;
  className?: string;
};

export function HighlightBox({ children, className }: HighlightBoxProps) {
  return (
    <span
      className={[
        "inline-block bg-accent_highlight px-3 py-1 leading-none text-[#2A4756] font-gilroyBold rounded-sm shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

