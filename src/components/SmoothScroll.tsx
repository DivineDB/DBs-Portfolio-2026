"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useSyncExternalStore } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const emptySubscribe = () => () => {};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const isMobileOrTouch = useSyncExternalStore(
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

  if (isMobileOrTouch) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
