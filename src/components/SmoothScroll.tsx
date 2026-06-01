"use client";

import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

// On touch-only devices (iOS / Android) the browser's native momentum scroll
// is always smoother than JS-driven lerp. Lenis is kept only for pointer
// (mouse-wheel) devices where the polished easing is noticeable.
const isTouchOnly =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  if (isTouchOnly) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
