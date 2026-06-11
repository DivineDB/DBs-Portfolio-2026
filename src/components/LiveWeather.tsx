"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LiveWeather() {
  const [weather, setWeather] = useState<{ temp: string; condition: string; emoji: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        if (!cancelled) {
          setWeather({
            temp: data.temp,
            condition: data.condition,
            emoji: data.emoji,
          });
        }
      } catch {
        if (!cancelled) {
          setWeather({ temp: "--", condition: "clear skies", emoji: "☀️" });
        }
      }
    }
    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: weather ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="inline"
    >
      {weather
        ? `${weather.emoji} ${weather.condition} at ${weather.temp}°C`
        : "\u00a0"}
    </motion.span>
  );
}
