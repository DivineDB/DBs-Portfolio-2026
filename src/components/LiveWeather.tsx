"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,weather_code,is_day";

function getWeatherFromWmo(code: number, isDay: number) {
  const day = isDay === 1;
  if (code >= 0 && code <= 1)
    return day ? { condition: "clear skies", emoji: "☀️" } : { condition: "mostly clear night skies", emoji: "🌙" };
  if (code >= 2 && code <= 3)
    return day ? { condition: "partly cloudy", emoji: "🌤️" } : { condition: "partly cloudy", emoji: "☁️" };
  if (code >= 45) {
    const rainy = code >= 51 && code <= 67;
    const condition = rainy ? "rainy" : "overcast";
    return day ? { condition, emoji: "🌧️" } : { condition, emoji: "☁️" };
  }
  return day ? { condition: "clear skies", emoji: "☀️" } : { condition: "mostly clear night skies", emoji: "🌙" };
}

export default function LiveWeather() {
  const [weather, setWeather] = useState<{ temp: string; condition: string; emoji: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchWeather() {
      try {
        const res = await fetch(OPEN_METEO_URL);
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        const current = data.current as {
          temperature_2m: number;
          weather_code: number;
          is_day: number;
        };
        const { condition, emoji } = getWeatherFromWmo(current.weather_code, current.is_day);
        if (!cancelled) setWeather({ temp: String(Math.round(current.temperature_2m)), condition, emoji });
      } catch {
        if (!cancelled) setWeather({ temp: "--", condition: "clear skies", emoji: "☀️" });
      }
    }
    fetchWeather();
    return () => { cancelled = true; };
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
