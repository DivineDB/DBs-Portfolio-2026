"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HighlightBox } from "@/components/ui/highlight-box";

export function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex h-screen w-screen select-none items-center justify-center overflow-hidden bg-[#F8EDD1]">
      <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-12 py-16 md:px-20 lg:grid-cols-12">
        <div className="flex h-full max-h-[600px] flex-col justify-between py-4 lg:col-span-5">
          <div className="flex flex-col items-start gap-2">
            <p className="font-gilroyRegular text-lg text-black/25">Hey, I&apos;m</p>
            <h1 className="flex flex-row items-baseline gap-3 flex-wrap font-gilroyBold text-5xl tracking-tight text-text_primary md:text-6xl animate-fade-in">
              <span>Divyansh</span>
              <HighlightBox
                className="h-[48px] md:h-[64px] px-5 md:px-7 translate-y-[2px]"
                textClassName="text-3xl md:text-5xl font-gilroyRegular text-text_primary"
              >
                Baghel
              </HighlightBox>
            </h1>
            <p className="font-gilroyRegular text-xl text-black/25">Design Engineer</p>

            <nav className="mt-6 flex gap-6 font-gilroyRegular text-lg font-medium text-text_primary">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative pb-1 transition-colors hover:text-text_primary"
              >
                Resume
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-[#A2F991] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
              <Link
                href="/hire-me"
                className="group relative pb-1 transition-colors hover:text-text_primary"
              >
                Contact
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-[#A2F991] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </nav>
          </div>

          <footer className="mt-auto flex flex-col gap-3">
            <div className="flex items-center gap-2 border border-text_primary/10 bg-[#F8EDD1]/50 backdrop-blur-sm rounded-full px-4 py-1.5 w-fit text-sm text-text_primary/70 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-sm tracking-wide">{time || "15:23"} IST</span>
            </div>
            <p className="text-xs text-black/25">© 2026 | Divyansh Baghel.</p>
          </footer>
        </div>

        <div className="relative flex h-full max-h-[750px] w-full items-center justify-end lg:col-span-7">
          <div className="relative aspect-[588/970] w-full max-w-[600px]">
            <Image
              src="/images/Building.svg"
              alt="Building illustration"
              fill
              priority
              className="h-full w-full object-contain"
            />
            <Image
              src="/images/boy.svg"
              alt=""
              aria-hidden
              width={184}
              height={180}
              className="pointer-events-none absolute top-[43%] left-[21.8%] z-10 h-auto w-[23%] object-contain"
            />

            {/* Interactive Window Links */}
            <Link
              href="/about"
              className="absolute top-[37.7%] left-[25.1%] w-[20.7%] h-[18.4%] flex items-center justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group"
            >
              <span className="font-gilroyBold text-[9px] xs:text-[11px] sm:text-xs md:text-sm font-medium text-text_primary tracking-wide uppercase px-1 transition-transform group-hover:scale-105">
                About Me
              </span>
            </Link>

            <Link
              href="/work"
              className="absolute top-[38.1%] left-[61.5%] w-[20.7%] h-[17.5%] flex items-center justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group"
            >
              <span className="font-gilroyBold text-[9px] xs:text-[11px] sm:text-xs md:text-sm font-medium text-text_primary tracking-wide uppercase px-1 transition-transform group-hover:scale-105">
                Selected Work
              </span>
            </Link>

            <Link
              href="/other-things"
              className="absolute top-[73.2%] left-[24.6%] w-[21.3%] h-[19.0%] flex items-center justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group"
            >
              <span className="font-gilroyBold text-[9px] xs:text-[11px] sm:text-xs md:text-sm font-medium text-text_primary tracking-wide uppercase px-1 transition-transform group-hover:scale-105">
                Other Things
              </span>
            </Link>

            <Link
              href="/hire-me"
              className="absolute top-[73.2%] left-[61.5%] w-[21.3%] h-[19.0%] flex items-center justify-center text-center rounded-md border border-[#2A4756]/0 bg-[#A2F991]/5 hover:bg-[#A2F991]/25 hover:border-[#2A4756]/15 hover:shadow-lg hover:shadow-[#A2F991]/10 hover:scale-[1.02] transition-all duration-300 z-20 group"
            >
              <span className="font-gilroyBold text-[9px] xs:text-[11px] sm:text-xs md:text-sm font-medium text-text_primary tracking-wide uppercase px-1 transition-transform group-hover:scale-105">
                Hire Me
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

