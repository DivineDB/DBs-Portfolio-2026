# Portfolio State (@context.md)

## Phase: 3 — Completed Portfolio UI Elevation (Phases 1-4) & Global Polish

## Stack

- Next.js 16 (App Router, `src/`), TypeScript, Tailwind

## Typography

- **Global:** Gilroy Regular / Bold via `next/font/local` in `src/app/layout.tsx` (CSS variables `--font-gilroy-regular`, `--font-gilroy-bold`).
- **About greeting only:** Playfair Display *italic*, `latin`, from `next/font/google`, variable `--font-playfair-display`; consumed as Tailwind `font-playfairDisplayItalic` on the rotating greeting span.

## Accomplishments (UI Elevation & Polish)

- **Phase 1: Cleaned Building SVG Artifacts:** Removed the drop shadow filter bounding box from `Building.svg` to eliminate the faint horizontal line/artifact hovering above the roof.
- **Phase 2: Typography & Baseline Alignment:** Refactored hero title to perfectly align `"Divyansh"` and `"Baghel"` (wrapped in `<HighlightBox>`) on a single baseline using `flex flex-row items-baseline gap-3 flex-wrap` inside the `h1` wrapper, resolving staggering.
- **Phase 3: Action Links (Resume & Contact):** Upgraded "Resume" and "Contact" nav links to use custom left-to-right scaling animated underlines via css transitions (`after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#A2F991] after:transition-transform hover:after:scale-x-100`).
- **Phase 4: Live Clock Widget:** Redesigned bottom-left status indicator into a glassmorphic IST clock with a pulsing green live indicator that updates dynamically in real-time.
- **Interactive SVG Windows:** Cleared out the static, blurry vector text paths and green hover blocks inside `Building.svg`. Replaced them with responsive absolute HTML Next.js `<Link>` components mapped precisely to the SVG aspect-ratio bounds. Each window features smooth backdrop-blur scaling, premium border glows, and crisp centered typography ("About Me", "Selected Work", "Other Things", "Hire Me").

## Narrative tabs (morphing pill)

- Tabs: **Story**, **TL;DR** (shared `layoutId` pill).
- **Story vs TL;DR:** Same paragraph structure and typography; TL;DR is subtractive masks (`opacity-25`, strikethrough, matching matrix) — no alternate summaries, no `AnimatePresence` on the story body.

## Other routes / components

- **Hire Me page (`src/app/hire-me/page.tsx`)**: Full-screen snap-scrolling “Hire Me” pitch page that inherits **all** visual tokens from the About page (`bg-bg`, `text-text_primary`, `bg-accent_highlight`, Gilroy fonts).
  - **Scroll architecture**: `h-screen w-full overflow-y-scroll snap-y snap-mandatory`; each major section is `h-screen snap-start snap-always … justify-center`; scrollbars hidden via `.no-scrollbar` utility.
  - **Scroll indicator**: Uses the same bottom-center “Scroll Down” + bouncing `ArrowDown` pattern as About.
  - **Highlight**: Introduced `HighlightBox` (`src/components/hire-me/highlight-box.tsx`) for thick marker-style highlights (applied to “Hire me!”, “Tech Stack”, “hire me?”, “Preferences”).
  - **Hero interactions**: Resume download + hover “View PDF” preview card (Framer Motion `AnimatePresence`); Calendly scheduling via `react-calendly` `PopupModal` (no iframe instructions).
  - **Content**: Sections include Tech Stack grid (hover glow/scale), “Why hire me” bullets, Preferences grid, and a footer snap section with About-style dashed border.

## Next

- Continuous verification of custom interactive states and route flow.
- Ensure that git staging tracks all updated assets and component changes.

