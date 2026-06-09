"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

// Detect touch-only devices to apply a lighter lerp that feels native
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

  return (
    <ReactLenis
      root
      options={{
        // Lighter, faster lerp on touch so it tracks the finger closely
        lerp: isTouchOnly ? 0.12 : 0.08,
        duration: isTouchOnly ? 0.9 : 1.2,
        smoothWheel: true,
        // Disable the wheel override on touch – let native momentum handle it
        ...(isTouchOnly ? { wheelMultiplier: 1 } : {}),
      }}
    >
      {children}
    </ReactLenis>
  );
}
