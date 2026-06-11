"use client";

import React, { useState, useEffect, useRef } from "react";

interface InteractiveBirdProps {
  className?: string;
}

// Default sclera centers in SVG coordinates (0 0 104 108)
const LEFT_SCLERA = { x: 29.08, y: 33.70 };
const RIGHT_SCLERA = { x: 57.34, y: 34.22 };

export default function InteractiveBird({ className }: InteractiveBirdProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Current pupil positions (animated) - Centered in the sclera by default
  const leftPupilRef = useRef({ x: LEFT_SCLERA.x, y: LEFT_SCLERA.y });
  const rightPupilRef = useRef({ x: RIGHT_SCLERA.x, y: RIGHT_SCLERA.y });

  const [leftPupil, setLeftPupil] = useState({ x: LEFT_SCLERA.x, y: LEFT_SCLERA.y });
  const [rightPupil, setRightPupil] = useState({ x: RIGHT_SCLERA.x, y: RIGHT_SCLERA.y });

  // Mouse position ref to avoid React state re-renders on mousemove
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  // Track if animation loop is active
  const isAnimatingRef = useRef(false);

  const updatePositionsRef = useRef<() => void>(() => {});

  const updatePositions = () => {
    if (!svgRef.current) {
      isAnimatingRef.current = false;
      return;
    }

    const rect = svgRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      isAnimatingRef.current = false;
      return;
    }

    const mousePos = mousePosRef.current;
    
    // Default targets are the centers of the scleras so the pupils can move symmetrically in all directions
    const targetLeft = { ...LEFT_SCLERA };
    const targetRight = { ...RIGHT_SCLERA };

    if (mousePos) {
      // Convert eye centers to screen coordinates
      const leftScreen = {
        x: rect.left + (LEFT_SCLERA.x / 104) * rect.width,
        y: rect.top + (LEFT_SCLERA.y / 108) * rect.height,
      };
      const rightScreen = {
        x: rect.left + (RIGHT_SCLERA.x / 104) * rect.width,
        y: rect.top + (RIGHT_SCLERA.y / 108) * rect.height,
      };

      // Calculate vector from eyes to mouse
      const leftDx = mousePos.x - leftScreen.x;
      const leftDy = mousePos.y - leftScreen.y;
      const leftDist = Math.sqrt(leftDx * leftDx + leftDy * leftDy);

      const rightDx = mousePos.x - rightScreen.x;
      const rightDy = mousePos.y - rightScreen.y;
      const rightDist = Math.sqrt(rightDx * rightDx + rightDy * rightDy);

      // Maximum distance the pupil can travel from the sclera center (travel limit: 1.5)
      // Expanded to 1.5 so the pupils can move all the way to the edge of the scleras
      const MAX_OFFSET = 1.5;

      if (leftDist > 0) {
        // Travel distance increases with mouse distance, up to 40px (ultra-sensitive)
        const leftOffset = Math.min(MAX_OFFSET, (leftDist / 40) * MAX_OFFSET);
        const leftAngle = Math.atan2(leftDy, leftDx);
        targetLeft.x = LEFT_SCLERA.x + Math.cos(leftAngle) * leftOffset;
        targetLeft.y = LEFT_SCLERA.y + Math.sin(leftAngle) * leftOffset;
      }

      if (rightDist > 0) {
        const rightOffset = Math.min(MAX_OFFSET, (rightDist / 40) * MAX_OFFSET);
        const rightAngle = Math.atan2(rightDy, rightDx);
        targetRight.x = RIGHT_SCLERA.x + Math.cos(rightAngle) * rightOffset;
        targetRight.y = RIGHT_SCLERA.y + Math.sin(rightAngle) * rightOffset;
      }
    }

    // Calculate remaining distance to target
    const leftDiffX = targetLeft.x - leftPupilRef.current.x;
    const leftDiffY = targetLeft.y - leftPupilRef.current.y;
    const rightDiffX = targetRight.x - rightPupilRef.current.x;
    const rightDiffY = targetRight.y - rightPupilRef.current.y;

    const leftMoved = Math.abs(leftDiffX) > 0.002 || Math.abs(leftDiffY) > 0.002;
    const rightMoved = Math.abs(rightDiffX) > 0.002 || Math.abs(rightDiffY) > 0.002;

    if (leftMoved || rightMoved) {
      // Smooth interpolation (lerp) - snap factor of 0.35
      leftPupilRef.current.x += leftDiffX * 0.35;
      leftPupilRef.current.y += leftDiffY * 0.35;
      rightPupilRef.current.x += rightDiffX * 0.35;
      rightPupilRef.current.y += rightDiffY * 0.35;

      setLeftPupil({ x: leftPupilRef.current.x, y: leftPupilRef.current.y });
      setRightPupil({ x: rightPupilRef.current.x, y: rightPupilRef.current.y });

      // Request next frame
      requestAnimationFrame(updatePositionsRef.current);
    } else {
      // Snap to exact target to avoid sub-pixel float drift and stop animation frame loop
      leftPupilRef.current = { ...targetLeft };
      rightPupilRef.current = { ...targetRight };
      setLeftPupil({ ...targetLeft });
      setRightPupil({ ...targetRight });
      isAnimatingRef.current = false;
    }
  };

  useEffect(() => {
    updatePositionsRef.current = updatePositions;
  });

  // Track mouse coordinates & control animations dynamically
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      // Start animation loop only if it's not already running
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        requestAnimationFrame(updatePositionsRef.current);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Start once initially to position pupils relative to mouse position on page load
    isAnimatingRef.current = true;
    requestAnimationFrame(updatePositionsRef.current);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="104"
      height="108"
      viewBox="0 0 104 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible" }}
    >
      {/* 1. Render the original bird SVG body synchronously (no delay between eyes and body) */}
      <image href="/images/bird.svg" width="104" height="108" />

      {/* 2. Custom larger sclera background circles (radius 4.2, no outline) */}
      <circle cx={LEFT_SCLERA.x} cy={LEFT_SCLERA.y} r="4.2" fill="#F4F0E4" />
      <circle cx={RIGHT_SCLERA.x} cy={RIGHT_SCLERA.y} r="4.2" fill="#F4F0E4" />

      {/* 3. Dynamic tracking pupils (pitch dark #000000, radius 2.9) */}
      <circle cx={leftPupil.x} cy={leftPupil.y} r="2.9" fill="#000000" />
      <circle cx={rightPupil.x} cy={rightPupil.y} r="2.9" fill="#000000" />
    </svg>
  );
}
