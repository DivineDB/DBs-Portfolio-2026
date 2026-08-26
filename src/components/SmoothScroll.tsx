"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force manual scroll restoration so the browser doesn't scroll to previous position on reload
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      // Instantly scroll to top on reload/load
      window.scrollTo(0, 0);

      const checkTouch = () => {
        setIsTouch(
          window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
            window.innerWidth < 768
        );
      };
      checkTouch();
      window.addEventListener("resize", checkTouch);
      return () => window.removeEventListener("resize", checkTouch);
    }
  }, []);

  if (isTouch) {
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
