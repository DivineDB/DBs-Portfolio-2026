"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

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
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force manual scroll restoration so the browser doesn't scroll to previous position on reload
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      // Instantly scroll to top on reload/load
      window.scrollTo(0, 0);
    }
  }, []);

  if (isTouchOnly) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
