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
        "relative inline-flex h-8 items-center justify-center px-3 align-middle md:h-9 md:px-3.5",
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
          "relative z-10 whitespace-nowrap text-sm leading-none text-[#2A4756] md:text-base",
          textClassName,
        )}
      >
        {children}
      </span>
    </span>
  );
}
