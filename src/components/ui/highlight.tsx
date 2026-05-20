type HighlightProps = {
  children: React.ReactNode;
  className?: string;
};

export function Highlight({ children, className }: HighlightProps) {
  return (
    <span
      className={["bg-[#a3f9b2] px-3 py-1 rounded-sm inline-block leading-none", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

