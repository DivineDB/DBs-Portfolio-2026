# Portfolio State (@context.md)

## Phase: 2 — About page dynamics (in progress alongside global polish)

## Stack

- Next.js 16 (App Router, `src/`), TypeScript, Tailwind

## Typography

- **Global:** Gilroy Regular / Bold via `next/font/local` in `src/app/layout.tsx` (CSS variables `--font-gilroy-regular`, `--font-gilroy-bold`).
- **About greeting only:** Playfair Display *italic*, `latin`, from `next/font/google`, variable `--font-playfair-display`; consumed as Tailwind `font-playfairDisplayItalic` on the rotating greeting span.

## About page (`src/app/about/page.tsx`)

- **Hero:** Rotating greetings; intro + location lines are fixed copy templates; `<Highlight>` wraps “Design Engineer” (and repeated highlights in narrative).
- **Weather:** Client `useEffect` → Open‑Meteo (`Pune` lat/lng); initial state `{ temp: '--', condition: 'mostly clear night skies', emoji: '🌙' }`; WMO bands 0–1 / 2–3 / 45+ with day/night emoji split per spec.
- **Highlight primitive:** Slightly padded green backdrop (`px-1.5 py-[5px]`) on boxed usage; TL;DR tab hides both sticker highlights (hero “Design Engineer” and in-tab “design engineering” render as normal body text).

## Narrative tabs (morphing pill)

- Tabs: **Story**, **TL;DR** (shared `layoutId` pill).
- **Story vs TL;DR:** Same paragraph structure and typography; TL;DR is subtractive masks (`opacity-25`, strikethrough, matching matrix) — no alternate summaries, no `AnimatePresence` on the story body.

## Other routes / components

- Home hero and shared UI unchanged in this snapshot; revisit `hero.tsx` / `highlight-box.tsx` if global highlight sticker rules should align with the About inline `<Highlight>`.
- **Hire Me page (`src/app/hire-me/page.tsx`)**: Full-screen snap-scrolling “Hire Me” pitch page that inherits **all** visual tokens from the About page (`bg-bg`, `text-text_primary`, `bg-accent_highlight`, Gilroy fonts).
  - **Scroll architecture**: `h-screen w-full overflow-y-scroll snap-y snap-mandatory`; each major section is `h-screen snap-start snap-always … justify-center`; scrollbars hidden via `.no-scrollbar` utility.
  - **Scroll indicator**: Uses the same bottom-center “Scroll Down” + bouncing `ArrowDown` pattern as About.
  - **Highlight**: Introduced `HighlightBox` (`src/components/hire-me/highlight-box.tsx`) for thick marker-style highlights (applied to “Hire me!”, “Tech Stack”, “hire me?”, “Preferences”).
  - **Hero interactions**: Resume download + hover “View PDF” preview card (Framer Motion `AnimatePresence`); Calendly scheduling via `react-calendly` `PopupModal` (no iframe instructions).
  - **Content**: Sections include Tech Stack grid (hover glow/scale), “Why hire me” bullets, Preferences grid, and a footer snap section with About-style dashed border.

## Next

- Extend Phase 2 to remaining sections (navigation, footer links, work grids) and any window/click interactions spec’d for the homepage.
- Optional: dedupe Story / TL;DR shared copy into data + renderers once copy stabilizes.
