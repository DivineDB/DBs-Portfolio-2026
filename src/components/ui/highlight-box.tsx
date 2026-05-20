import Image from "next/image";
import { cn } from "@/lib/cn";

type HighlightBoxProps = {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
};

export function HighlightBox({ children, className, textClassName }: HighlightBoxProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-baseline justify-center px-3 align-middle md:px-3.5 pb-2 pt-1",
        className,
      )}
    >
      <Image
        src="/images/HighlightBox.svg"
        alt=""
        aria-hidden
        width={183}
        height={59}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <span
        className={cn(
          "relative z-10 whitespace-nowrap leading-none text-[#2A4756]",
          textClassName,
        )}
      >
        {children}
      </span>
    </span>
  );
}

