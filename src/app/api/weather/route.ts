import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface WeatherCache {
  temp: string;
  condition: string;
  emoji: string;
  timestamp: number;
}

let cachedWeather: WeatherCache | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,weather_code,is_day";

function getWeatherFromWmo(code: number, isDay: number) {
  const day = isDay === 1;
  
  if (code === 0) return day ? { condition: "clear skies", emoji: "☀️" } : { condition: "mostly clear night skies", emoji: "🌙" };
  if (code === 1) return day ? { condition: "mainly clear skies", emoji: "🌤️" } : { condition: "mostly clear night skies", emoji: "🌙" };
  if (code === 2) return day ? { condition: "partly cloudy", emoji: "⛅" } : { condition: "partly cloudy", emoji: "☁️" };
  if (code === 3) return { condition: "overcast", emoji: "☁️" };
  if (code === 45 || code === 48) return { condition: "foggy", emoji: "🌫️" };
  if (code === 51 || code === 53 || code === 55) return { condition: "drizzling", emoji: "🌧️" };
  if (code === 56 || code === 57) return { condition: "freezing drizzle", emoji: "🌧️" };
  if (code === 61 || code === 63 || code === 65) return { condition: "rainy", emoji: "🌧️" };
  if (code === 66 || code === 67) return { condition: "freezing rain", emoji: "🌧️" };
  if (code === 71 || code === 73 || code === 75) return { condition: "snowy", emoji: "❄️" };
  if (code === 77) return { condition: "snow grains", emoji: "❄️" };
  if (code === 80 || code === 81 || code === 82) return { condition: "rain showers", emoji: "🌦️" };
  if (code === 85 || code === 86) return { condition: "snow showers", emoji: "❄️" };
  if (code === 95 || code === 96 || code === 99) return { condition: "thunderstorms", emoji: "⛈️" };
  
  return day ? { condition: "clear skies", emoji: "☀️" } : { condition: "mostly clear night skies", emoji: "🌙" };
}

export async function GET() {
  const now = Date.now();
  
  if (cachedWeather && now - cachedWeather.timestamp < CACHE_TTL) {
    return NextResponse.json(cachedWeather);
  }
  
  try {
    const res = await fetch(OPEN_METEO_URL, {
      next: { revalidate: 600 },
    });
    
    if (!res.ok) throw new Error("Failed to fetch from Open-Meteo");
    
    const data = await res.json();
    const current = data.current;
    
    if (!current || typeof current.temperature_2m !== "number" || typeof current.weather_code !== "number") {
      throw new Error("Invalid format from Open-Meteo");
    }
    
    const { condition, emoji } = getWeatherFromWmo(current.weather_code, current.is_day ?? 1);
    const temp = String(Math.round(current.temperature_2m));
    
    cachedWeather = {
      temp,
      condition,
      emoji,
      timestamp: now,
    };
    
    return NextResponse.json(cachedWeather);
  } catch (error) {
    console.error("Weather Route Handler Error:", error);
    if (cachedWeather) {
      return NextResponse.json(cachedWeather);
    }
    return NextResponse.json({
      temp: "--",
      condition: "clear skies",
      emoji: "☀️",
      timestamp: now,
    });
  }
}
