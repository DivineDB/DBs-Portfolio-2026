# Portfolio State (@context.md)

## Phase: 5 — Rebuilt "Minimalist Editorial" Landing Page (Awwwards-level)

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
- **Phase 5 (Regression Fixes):** Removed `overflow-hidden` from main app wrappers to prevent clipping of the building SVG roof. Refactored the `<HighlightBox>` internal styling (`inline-flex items-baseline`) to align strictly with external typographic baselines without hardcoded heights. Adjusted window link text overlays to use top-aligned minimalist typography (`font-gilroyRegular text-xs capitalize tracking-normal text-slate-800`).
- **Phase 6: Rebuilt Minimalist Editorial Landing Page:** Rebuilt the landing page (`/src/app/page.tsx`) completely from scratch using a strict professional 12-column CSS Grid layout (`col-span-7` for typography and `col-span-5` for the building). Cleaned up all imports and deleted `use-sound` and any audio triggers. Structured an animated background noise overlay. Anchored the building at the bottom-right scaling at exactly `90vh` to bleed off the bottom naturally while preserving Next.js `<Link>` window overlays for tactile location redirects. Set up a dynamic fixed-width Control Deck in the absolute bottom-left (integrating live dynamic IST clock withlocation toggles and ⌘K search shortcut) and copyright row placed directly below.

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

## Phase 4 — Global Command Palette & Interactive Keywords

- **`cmdk` installed** (`npm install cmdk`).
- **`src/components/CommandPalette.tsx`** (new `"use client"`): Global `keydown` listener for `Ctrl+K` / `Cmd+K`. `Command.Dialog` (cmdk) with glassmorphic palette (`bg-[#f8edd1]/90 backdrop-blur-xl`) at `mt-[15vh]`. Groups: **Navigation** (Home, About, Work, Hire Me — `useRouter.push`) and **Actions** (Download Resume → `window.open('/Divyansh_Baghel_Resume.pdf')`, Copy Email → clipboard API with 1.4 s "Copied!" feedback). Footer keyboard hint. Adds/removes `lenis-stopped` on `<html>` to freeze Lenis scroll while open.
- **`src/components/CommandPaletteLoader.tsx`** (new `"use client"` wrapper): Thin client component that wraps `dynamic(() => import('./CommandPalette'), { ssr: false })`. Required because `ssr: false` is not permitted directly in a Server Component — this intermediary layer resolves the Turbopack build error.
- **`src/app/layout.tsx`**: Imports `CommandPaletteLoader` (plain static import, valid in Server Component) and renders it as the first child of `<body>`.
- **`src/app/about/page.tsx`** — Two new inline keyword components in `StoryContent`:
  - `CodeKeyword`: `motion.span` (`cursor-crosshair`). Hover → dark `#1e293b` pill fades in, word cross-fades to `font-mono text-[#4ade80]` showing `<code />`.
  - `DesignEngineeringKeyword`: `motion.span` (`cursor-default`). Hover → faint 6×6 px CSS grid scales out beyond text bounds + `#a2f991` underline draws left-to-right. Wraps the existing `<Highlight>` component.
- `TldrContent` uses `motion.div` / `motion.p` wrappers (restored after accidental strip).
- **Build verified:** `next build` exits 0 with all 6 routes static (`/`, `/about`, `/hire-me`, `/other-things`, `/work`, `/_not-found`) + 1 dynamic (`/work/[slug]`).

## Next

- Verify `other-things` page animations and hover states in dev server.
- Ensure git staging tracks new/changed files: `other-things/page.tsx`, `PageFooter.tsx`, `CommandPalette.tsx`, `context.md`.

# AI Skill: Emil Kowalski UI & Animation Guidelines

When writing, reviewing, or refactoring UI components, you must evaluate all animations and layout choices against these 4 core tenets:

## 1. Interaction Frequency Rules
- High Frequency (Keyboard shortcuts, opening command palette): NO animation. Ever. It makes power users feel delayed.
- Medium Frequency (Hover states, sidebar toggles, list selection): Micro-animations under 150ms or instant transitions.
- Low Frequency (Modals, drawers, multi-step forms): Smooth, expressive spring animations under 300ms.

## 2. Easing & Timing Constraints
- Never use standard CSS `ease-in`. It delays initial feedback where the eye watches closest.
- Default to snappy `ease-out` configurations for immediate interactive response.
- All spatial motion must use Spring Physics instead of hard durations:
  - Snappy Micro-interactions: stiffness: 450, damping: 30
  - Light Interactive Press/Tap: stiffness: 500, damping: 15 (Scale down slightly to 0.97 on active press).
  - Heavy Modals/Sheets: stiffness: 350, damping: 28

## 3. Property Selection (Zero Layout Thrash)
- CRITICAL: Only animate `transform` (x, y, scale, rotate) and `opacity`.
- NEVER animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`) as they force the browser to recalculate layouts on every frame.
- If an element changes visually on mount/unmount, use `clip-path` for fluid reveals instead of animating raw wrapper sizes.
- Force hardware layers by adding `will-change-transform` or `will-change-[transform,opacity]` to animated elements.

## 4. Visual Polish Principles
- Blur Bridging: When crossfading states, animate a quick 4px -> 0px blur filter in tandem with opacity. It tricks the eye into seeing a seamless morph rather than two overlapping objects.
- Spatial Consistency: If a component enters from the bottom, it must exit toward the bottom.
- Initial Delay Bypass: Tooltips or menus should delay on the first hover, but open instantaneously on subsequent near items to make toolbars feel hyper-fast.