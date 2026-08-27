"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useSyncExternalStore } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const emptySubscribe = () => () => {};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const isMobile = useSyncExternalStore(
    emptySubscribe,
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        window.innerWidth < 768),
    () => false
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force manual scroll restoration so the browser doesn't scroll to previous position on reload
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
  }, []);

  // Mobile / touch — use a native-momentum Lenis config.
  // GPU-backed via Lenis's rAF loop; touchMultiplier makes swipes feel snappy.
  if (isMobile) {
    return (
      <ReactLenis
        root
        options={{
          // Let native browser inertia handle momentum on iOS; lenis only
          // applies lerp so scrolling stays on the compositor thread.
          lerp: 0.1,
          duration: 0.9,
          smoothWheel: false,   // wheel isn't used on touch, skip it
          smoothTouch: false,   // native iOS scroll is already GPU-composited
          touchMultiplier: 1.8, // natural feel on touch screens
          infinite: false,
          // Prevent Lenis from fighting the browser's own momentum
          gestureOrientation: "vertical",
        }}
      >
        {children}
      </ReactLenis>
    );
  }

  // Desktop — butter-smooth GPU-accelerated wheel scroll via Lenis
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,   // standard wheel speed
        touchMultiplier: 2.0,   // fast trackpad swipes
        infinite: false,
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}
