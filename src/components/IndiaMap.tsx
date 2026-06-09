"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { INDIA_STATES } from "./IndiaStatesData";

export interface VisitedCity {
  name: string;
  state: string;
  id: string; // state ID for highlighting
  x: number;
  y: number;
  photos: string[];
  // Positioning overrides for the text label on the map to prevent overlapping
  textAnchor?: "start" | "end" | "middle";
  dx?: number;
  dy?: number;
}

const VISITED_CITIES: VisitedCity[] = [
  {
    name: "Manali",
    state: "Himachal Pradesh",
    id: "hp",
    x: 186,
    y: 118,
    photos: [
      "/images/photography-1.jpg",
      "/images/photography-2.jpg"
    ],
    textAnchor: "start",
    dx: 10,
    dy: 4
  },
  {
    name: "Tungnath",
    state: "Uttarakhand",
    id: "ut",
    x: 242,
    y: 168,
    photos: [
      "/images/photography-3.jpg",
      "/images/photography-4.jpg"
    ],
    textAnchor: "start",
    dx: 10,
    dy: -4
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    id: "ut",
    x: 226,
    y: 180,
    photos: [
      "/images/photography-5.jpg",
      "/images/photography-6.jpg"
    ],
    textAnchor: "start",
    dx: 10,
    dy: 4
  },
  {
    name: "Haridwar",
    state: "Uttarakhand",
    id: "ut",
    x: 220,
    y: 188,
    photos: [
      "/images/photography-7.jpg",
      "/images/photography-8.jpg"
    ],
    textAnchor: "end",
    dx: -10,
    dy: 6
  },
  {
    name: "Delhi",
    state: "Delhi UT",
    id: "dl",
    x: 186,
    y: 210,
    photos: [
      "/images/photography-9.jpg",
      "/images/photography-10.jpg"
    ],
    textAnchor: "end",
    dx: -10,
    dy: 4
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    id: "rj",
    x: 142,
    y: 236,
    photos: [
      "/images/photography-11.jpg",
      "/images/photography-12.jpg"
    ],
    textAnchor: "end",
    dx: -10,
    dy: 4
  },
  {
    name: "Pune",
    state: "Maharashtra",
    id: "mh",
    x: 124,
    y: 465,
    photos: [
      "/images/photography-13.jpg",
      "/images/photography-14.jpg"
    ],
    textAnchor: "start",
    dx: 10,
    dy: 4
  },
  {
    name: "Gwalior",
    state: "Madhya Pradesh",
    id: "mp",
    x: 212,
    y: 256,
    photos: [
      "/images/photography-15.jpg",
      "/images/photography-16.jpg"
    ],
    textAnchor: "end",
    dx: -10,
    dy: 4
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    id: "up",
    x: 208,
    y: 230,
    photos: [
      "/images/photography-17.jpg",
      "/images/photography-18.jpg"
    ],
    textAnchor: "start",
    dx: 10,
    dy: 4
  },
  {
    name: "Jabalpur",
    state: "Madhya Pradesh",
    id: "mp",
    x: 282,
    y: 352,
    photos: [
      "/images/photography-19.jpg",
      "/images/photography-20.jpg"
    ],
    textAnchor: "start",
    dx: 10,
    dy: 4
  },
];

export default function IndiaMap() {
  const [hoveredCity, setHoveredCity] = useState<VisitedCity | null>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for floating polaroids
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 120, damping: 22 });
  const y = useSpring(rawY, { stiffness: 120, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX + 25);
    rawY.set(e.clientY - 120);
  };

  const handleCityHover = (city: VisitedCity | null) => {
    setHoveredCity(city);
    setHoveredStateId(city ? city.id : null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full flex flex-col items-center gap-12 py-8 relative select-none"
    >
      {/* India Map (SVG Container) - Centered horizontally and enlarged */}
      <div className="w-full max-w-[620px] aspect-[612/696] relative flex items-center justify-center mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 612 696"
          className="w-full h-full drop-shadow-sm transition-colors duration-500"
          aria-label="Map of India"
        >
          {/* Render State Paths */}
          <g id="states">
            {INDIA_STATES.map((state) => {
              const isVisitedState = VISITED_CITIES.some((c) => c.id === state.id);
              const isHovered = hoveredStateId === state.id;

              return (
                <path
                  key={state.id}
                  d={state.d}
                  id={state.id}
                  aria-label={state.name}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredStateId(state.id)}
                  onMouseLeave={() => setHoveredStateId(null)}
                  style={{
                    fill: isHovered
                      ? (isVisitedState ? "rgba(162, 249, 145, 0.18)" : "rgba(255, 255, 255, 0.05)")
                      : "currentColor",
                    fillOpacity: isHovered ? 1 : 0.03,
                    stroke: isHovered
                      ? (isVisitedState ? "var(--color-highlight, #a2f991)" : "currentColor")
                      : "currentColor",
                    strokeOpacity: isHovered ? 0.6 : 0.12,
                    strokeWidth: isHovered ? 1.5 : 0.8,
                    transition: "fill 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1), fill-opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke-opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              );
            })}
          </g>

          {/* Glowing City Pins */}
          <g id="pins">
            {VISITED_CITIES.map((city) => {
              const isHovered = hoveredCity?.name === city.name;

              return (
                <g
                  key={city.name}
                  className="cursor-pointer"
                  onMouseEnter={() => handleCityHover(city)}
                  onMouseLeave={() => handleCityHover(null)}
                >
                  {/* Outer pulsing ring */}
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={isHovered ? 16 : 8}
                    fill="var(--color-highlight, #a2f991)"
                    className="origin-center pointer-events-none"
                    style={{ fillOpacity: 0.4 }}
                    animate={{
                      scale: isHovered ? [1, 1.4, 1] : [1, 1.8, 1],
                      opacity: isHovered ? [0.8, 0.2, 0.8] : [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: isHovered ? 1.5 : 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Inner solid core */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isHovered ? 6 : 4}
                    fill="var(--color-highlight, #a2f991)"
                    className="drop-shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      stroke: "currentColor",
                      strokeWidth: isHovered ? 1.5 : 1,
                      strokeOpacity: 0.3,
                    }}
                  />

                  {/* Pin label */}
                  <motion.text
                    x={city.x + (city.dx ?? 10)}
                    y={city.y + (city.dy ?? 4)}
                    textAnchor={city.textAnchor ?? "start"}
                    className="font-satoshi text-[9px] font-semibold tracking-widest fill-current select-none pointer-events-none uppercase"
                    initial={{ opacity: 0 }}
                    animate={{
                      x: isHovered 
                        ? city.x + (city.dx ?? 10) + (city.textAnchor === "end" ? -4 : 4) 
                        : city.x + (city.dx ?? 10),
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {city.name}
                  </motion.text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Floating cursor-following Polaroid Stack */}
      <AnimatePresence>
        {hoveredCity && (
          <motion.div
            key={hoveredCity.name}
            className="fixed pointer-events-none z-[200] will-change-transform"
            style={{ x, y, top: 0, left: 0 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-44 h-48 select-none">
              {/* Photo 2 (Bottom/Underneath Polaroid) */}
              <motion.div
                className="absolute inset-0 bg-white p-2 pb-6 shadow-xl border border-black/5 rounded-sm flex flex-col"
                initial={{ rotate: -2, x: 0, y: 0 }}
                animate={{ rotate: -8, x: -16, y: 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full flex-grow overflow-hidden bg-slate-100 rounded-sm relative aspect-square">
                  <img
                    src={hoveredCity.photos[1]}
                    alt={`${hoveredCity.name} scenery 2`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-4 mt-1.5 flex items-center justify-center">
                  <span className="font-satoshi text-[8px] text-[#2a4756]/40 uppercase tracking-widest">
                    {hoveredCity.name} 02
                  </span>
                </div>
              </motion.div>

              {/* Photo 1 (Top/Main Polaroid) */}
              <motion.div
                className="absolute inset-0 bg-white p-2 pb-6 shadow-2xl border border-black/5 rounded-sm flex flex-col"
                initial={{ rotate: 2, x: 0, y: 0 }}
                animate={{ rotate: 4, x: 12, y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full flex-grow overflow-hidden bg-slate-100 rounded-sm relative aspect-square">
                  <img
                    src={hoveredCity.photos[0]}
                    alt={`${hoveredCity.name} scenery 1`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-4 mt-1.5 flex items-center justify-center">
                  <span className="font-satoshi text-[8px] text-[#2a4756]/60 uppercase tracking-widest font-semibold">
                    {hoveredCity.name} 01
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
