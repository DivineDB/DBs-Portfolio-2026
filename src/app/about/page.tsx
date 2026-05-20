"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const TABS = ["Story", "TL;DR"] as const;
type Tab = (typeof TABS)[number];

const GREETINGS = ["Hello,", "Namaste,", "Hola,", "Ciao,", "Bonjour,", "Konnichiwa,"] as const;

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,weather_code,is_day";

const STORY_BODY_CLASS =
  "flex min-h-[880px] max-w-[800px] flex-col gap-8 font-satoshi text-lg font-normal leading-relaxed text-[#4A5568]";

const fadedMaskClass = "opacity-25 line-through decoration-text_primary/20";

/** WMO buckets: 0–1 clear, 2–3 partly cloudy, 45+ overcast/rain; emoji follows `is_day`. */
function getWeatherFromWmo(code: number, isDay: number) {
  const day = isDay === 1;

  if (code >= 0 && code <= 1) {
    return day
      ? { condition: "clear skies", emoji: "☀️" }
      : { condition: "mostly clear night skies", emoji: "🌙" };
  }
  if (code >= 2 && code <= 3) {
    return day
      ? { condition: "partly cloudy", emoji: "🌤️" }
      : { condition: "partly cloudy", emoji: "☁️" };
  }
  if (code >= 45) {
    const rainy = code >= 51 && code <= 67;
    const condition = rainy ? "rainy" : "overcast";
    return day
      ? { condition, emoji: "🌧️" }
      : { condition, emoji: "☁️" };
  }

  return day
    ? { condition: "clear skies", emoji: "☀️" }
    : { condition: "mostly clear night skies", emoji: "🌙" };
}

type HighlightProps = {
  children: React.ReactNode;
  /** Green backdrop; set false for plain text (e.g. TL;DR body). */
  boxed?: boolean;
};

function Highlight({ children, boxed = true }: HighlightProps) {
  if (!boxed) {
    return <span className="text-inherit font-inherit">{children}</span>;
  }

  return (
    <span className="group relative isolate inline whitespace-nowrap align-baseline leading-none box-border px-1.5 py-[5px]">
      <span
        className="pointer-events-none absolute inset-0 z-0 rounded-[3px] border border-text_primary/15 bg-accent_highlight transition-transform box-border group-hover:scale-[1.03]"
        style={{ boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.25)" }}
        aria-hidden
      />
      <span className="relative z-10 font-gilroyRegular text-text_primary font-normal">{children}</span>
    </span>
  );
}

function StoryContent() {
  return (
    <div className={STORY_BODY_CLASS}>
      <p>
        I was lucky to have my dad&apos;s laptop when I was a kid. Spent a ton of time playing video
        games, but my real introduction to design was messing around with PowerPoint animations in
        school. I loved figuring out how to make things move and fit together on a screen, and that
        early obsession with layouts completely stuck with me.
      </p>
      <p>
        Later on, got obsessed with photography and cinematics. I loved how a single frame could
        freeze a feeling, or how lighting could change a whole mood. That love for visual aesthetics
        and composition never left, it just shifted from camera lenses to digital interfaces.
      </p>
      <p>
        Naturally, I ended up learning how to code and went for a{" "}
        <Highlight>B.Tech degree</Highlight>. But during my final year, I realized I cared way more
        about UX choices and people than just pure coding. I found myself focusing on why someone
        would use a feature and how it actually felt to use it, rather than just writing hidden
        backend logic.
      </p>
      <p>
        That&apos;s why I love the middle ground of <Highlight>design engineering</Highlight>. I
        make sure the creative vision never gets lost in the engineering cycle. I design digital
        products for people, and use code as the medium to bring them to life. I just want to build
        simple, beautiful digital products that make sense to the people using them.
      </p>
    </div>
  );
}

/** Same copy and metrics as Story; subtractive mask via opacity + strikethrough only. */
function TldrContent() {
  return (
    <div className={STORY_BODY_CLASS}>
      <p>
        <span>I was lucky to have my dad&apos;s laptop when I was a kid. </span>
        <span className={fadedMaskClass}>
          Spent a ton of time playing video games, but{" "}
        </span>
        <span>my real introduction to design was messing around with PowerPoint animations</span>
        <span className={fadedMaskClass}>
          {" "}
          in school. I loved figuring out how to make things move and fit together on a screen, and
          that early obsession with layouts completely stuck with me.
        </span>
      </p>
      <p>
        <span className={fadedMaskClass}>
          Later on, got obsessed with photography and cinematics. I loved how a single frame could
          freeze a feeling, or how lighting could change a whole mood.{" "}
        </span>
        <span>
          That love for visual aesthetics and composition never left, it just shifted from camera
          lenses to digital interfaces.
        </span>
      </p>
      <p>
        <span className={fadedMaskClass}>
          Naturally, I ended up learning how to code and went for a B.Tech degree. But during my
          final year,{" "}
        </span>
        <span>I realized I cared way more about UX choices and people than just pure coding.</span>
        <span className={fadedMaskClass}>
          {" "}
          I found myself focusing on why someone would use a feature and how it actually felt to use
          it, rather than just writing hidden backend logic.
        </span>
      </p>
      <p>
        <span>That&apos;s why I love the middle ground of </span>
        <Highlight boxed={false}>design engineering</Highlight>
        <span className={fadedMaskClass}>
          . I make sure the creative vision never gets lost in the engineering cycle.{" "}
        </span>
        <span>
          I design digital products for people, and use code as the medium to bring them to life.
        </span>
        <span className={fadedMaskClass}>
          {" "}
          I just want to build simple, beautiful digital products that make sense to the people
          using them.
        </span>
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Story");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [weather, setWeather] = useState({
    temp: "--",
    condition: "mostly clear night skies",
    emoji: "🌙",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const res = await fetch(OPEN_METEO_URL);
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        const current = data.current as {
          temperature_2m: number;
          weather_code: number;
          is_day: number;
        };
        const { condition, emoji } = getWeatherFromWmo(current.weather_code, current.is_day);
        if (!cancelled) {
          setWeather({
            temp: String(Math.round(current.temperature_2m)),
            condition,
            emoji,
          });
        }
      } catch {
        if (!cancelled) {
          setWeather({
            temp: "--",
            condition: "mostly clear night skies",
            emoji: "🌙",
          });
        }
      }
    }

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-bg font-gilroyRegular text-text_primary no-scrollbar">
      
      {/* Section 1 — Hero */}
      <section className="relative flex h-screen w-full snap-start flex-col items-center justify-center overflow-hidden px-6 md:px-12 pt-8">
        <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6 text-lg text-text_primary/70 md:text-xl">
            <div>
              <div className="relative h-12 overflow-hidden md:h-14">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={greetingIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="absolute font-playfairDisplayItalic text-4xl text-text_primary/80 md:text-5xl"
                  >
                    {GREETINGS[greetingIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <h1 className="font-gilroyBold text-6xl tracking-tight text-text_primary md:text-8xl">
                I&apos;m DB.
              </h1>
            </div>
            <p>
              I&apos;m a 22 year old{" "}
              <Highlight boxed={activeTab !== "TL;DR"}>Design Engineer</Highlight> currently freelancing —
              blending full-stack code with product design.
            </p>
            <p>
              I am based in Pune, India, and it&apos;s {weather.emoji} {weather.condition} at{" "}
              {weather.temp}°C.
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <div className="relative z-10 mx-auto aspect-[4/5] w-[340px] rotate-[6deg] border border-text_primary/10 bg-white p-4 pb-14 shadow-2xl md:w-[400px]">
              <div className="absolute inset-x-4 top-4 bottom-14 overflow-hidden">
                <Image
                  src="/images/me.jpeg"
                  alt="Divyansh Baghel"
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 768px) 340px, 400px"
                  priority
                />
              </div>
              <p className="absolute right-0 bottom-0 left-0 flex h-14 items-center justify-center text-sm text-text_primary/40">
                me.jpeg
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text_primary/50">
          <span className="font-gilroyBold text-xs tracking-[0.2em] uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} strokeWidth={1.5} />
          </motion.div>
        </div>
      </section>

      {/* Section 2 — About */}
      <section className="relative flex min-h-screen w-full snap-start flex-col items-center justify-center px-6 md:px-12 pt-24 pb-20">
        <div className="mx-auto flex w-full h-full max-w-[1000px] flex-col">
          <div className="flex flex-row items-end justify-between border-b border-text_primary/10 pb-4">
            <motion.h2
              className="font-gilroyBold text-4xl text-text_primary/40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About
            </motion.h2>

            <div className="relative flex rounded-md border border-text_primary/10 bg-black/5 p-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
                      isActive ? "text-text_primary" : "text-text_primary/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 z-0 rounded bg-bg shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex flex-1 flex-col">
            {activeTab === "Story" && <StoryContent />}
            {activeTab === "TL;DR" && <TldrContent />}
          </div>
        </div>
      </section>

      {/* Section 3 — Footer */}
      <section className="relative flex min-h-[30vh] w-full snap-start flex-col justify-end px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1000px]">
          <motion.footer
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full justify-between border-t border-dashed border-text_primary/40 pt-8 pb-12 text-sm font-gilroyBold"
          >
            <nav className="flex gap-8">
              <Link href="/work" className="hover:opacity-70 transition-opacity">My work</Link>
              <Link href="/other-things" className="hover:opacity-70 transition-opacity">Other things</Link>
              <Link href="/hire-me" className="hover:opacity-70 transition-opacity">Contact</Link>
            </nav>
            <p className="font-gilroyRegular text-text_primary/40">© 2026 | Divyansh Baghel.</p>
          </motion.footer>
        </div>
      </section>

    </main>
  );
}
