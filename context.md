# Portfolio State (@context.md)

## Phase: 7 — Site-wide Mobile Strategy, Scroll Optimization, and Bug Fixes

## Stack

- Next.js 16 (App Router, `src/`), TypeScript, Tailwind CSS, Framer Motion

## Typography

- **Global:** Gilroy Regular / Bold via `next/font/local` in `src/app/layout.tsx` (CSS variables `--font-gilroy-regular`, `--font-gilroy-bold`).
- **About greeting only:** Playfair Display *italic*, `latin`, from `next/font/google`, variable `--font-playfair-display`; consumed as Tailwind `font-playfairDisplayItalic` on the rotating greeting span.

## Accomplishments (UI Elevation, Mobile Strategy, & Polish)

- **Interactive Building & Mobile Layout Strategy:** Kept and optimized the interactive building illustration on both desktop and mobile viewports. On mobile, the building collapses cleanly below the editorial content to preserve readability and access to interactive pages via window hotspots. Switch building container to `h-auto w-full max-w-[450px] mx-auto` to preserve the building aspect ratio on mobile screens without viewport clipping.
- **Mobile Viewport Optimization:** Resolved mobile viewport clipping on `/work`, `/about`, and `/hire-me` by switching sections from fixed `h-screen` to `min-h-screen` and adding responsive vertical padding (`py-24 md:py-0`).
- **Other Things page Mobile Refinements:** Optimized the `/other-things` layout on mobile by reducing hero top padding (`pt-16` instead of `pt-32`), wrapping the 5-col options trading terminal in an `overflow-x-auto` container with a minimum width, and updating interaction hints dynamically based on touch capabilities.
- **Footer Responsiveness:** Overhauled `PageFooter.tsx`: links wrap and stack vertically on mobile, touch target bounds were increased, and added `pb-28` to clear the mobile Floating Action Button (FAB).
- **Lenis Smooth Scroll Adjustment:** Disabled Lenis smooth scrolling inside `SmoothScroll.tsx` on touch-only coarse devices (`(hover: none) and (pointer: coarse)`) to ensure native OS momentum scrolling runs smoothly without JS lag, keeping it enabled for desktop mouse-wheel users.

## UI Polish & Theme Integration

- **HighlightBox Padding Refinement:** Tightened `<HighlightBox>` padding (`py-[2px] md:py-[3px] px-[8px] md:px-[12px]` instead of `py-1 md:py-1.5 px-4 md:px-6`) to make the highlighted container tightly hug the "Baghel" text and match modern Swiss-style aesthetics.
- **Typographic Alignment:** Replaced simulated browser-level `font-extrabold` with mapped local `font-gilroyBold` on the landing page's main heading, adding a left padding offset (`pl-1`) to align the text edge with other left-aligned items.
- **Theme Blended Shortcut Prompt:** Redesigned the desktop `⌘K` command shortcut button with the warm, cozy greenish-cream background (`bg-[#F0F5E1]`), matching text colors (`text-[#2a4756]/70`), a `rounded-full` pill structure, and an inner kbd element (`bg-bg`) to fully integrate with the Swiss design system.
- **Smooth Command Palette Scroll:** Added `scroll-smooth` to the list container inside the Command Palette to animate programmatic scroll transitions during arrow-key navigation.
- **Character & Hotspot Optimization:** Layered `boy.svg` above window overlays with `z-30` so the character graphic remains fully visible and doesn't get obscured by hover backdrops. Refined all window coordinates and hotspot bounds ("About Me", "Selected Work", "Other Things", "Hire Me") to match the updated visual layout. Nudged the character position to `top-[43%] left-[24.5%]` (a bit down and left) to align perfectly inside the window frame.

- **Developer Experience & Console Warning Fixes:**
  - **Cross-Origin Dev Support:** Added `allowedDevOrigins: ["eight-pets-greet.loca.lt", "*.loca.lt"]` inside `next.config.ts` to allow localtunnel/ngrok development proxies.
  - **Module Declaration:** Added `"type": "module"` in `package.json` to eliminate Node warning messages about typeless CommonJS package parsing.
  - **Framer Motion Warning:** Replaced `"transparent"` target in `/other-things` page's city name hover transition with `"rgba(42, 71, 86, 0)"` to resolve `value-not-animatable` console errors.
  - **A11y Dialog Warnings:** Added a visually hidden `<Dialog.Description>` alongside `<Dialog.Title>` inside the Command Palette dialog.

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

- **Hire Me page (`src/app/hire-me/page.tsx`)**: Fully overhauled recruiter-facing page. Plain block layout with `h-screen` sections (no snap-scroll). Inherits all design tokens (`bg-bg`, `text-text_primary`, `bg-accent_highlight`, Gilroy).
  - **Hero CTA row** (`flex flex-wrap gap-4 items-center mt-8`): Three buttons — **Download Resume** (`<a download>`, solid `bg-accent_highlight`), **Copy Link** (`motion.button`, `whileTap` spring only, fixed `w-[140px]` prevents layout shift on “Copied!” swap via `AnimatePresence`), **Contact** (`<a mailto:>`, outline style). No `whileHover` scale anywhere — CSS `transition-colors duration-300` only.
  - **Bento Tech Stack** (`grid grid-cols-1 md:grid-cols-2 gap-6`): 4 category cards with inline dot-grid SVG background + `bg-[#F8EDD1]/80` overlay. Tools as list rows (icon + label). Each `motion.li`: `whileHover={{ y: -2, opacity: 1, filter: 'grayscale(0)' }} initial={{ opacity: 0.7, filter: 'grayscale(1)' }}`.
    - Frontend Development: Next.js, React.js, Tailwind CSS, HTML5/CSS3
    - Design & Strategy: Figma, Rive, Framer, Information Architecture
    - Core Languages: TypeScript, JavaScript ES6+
    - Data & AI Systems: PostgreSQL, Groq, Serper.dev, Next.js API
  - **Closing hook** (above `<PageFooter />`): `flex justify-center py-32`. Words split into `motion.span` inside `whileHover="hover"` parent. `rest: { y:0, color: slate-500 }` → `hover: { y:-6, color: var(--color-highlight), spring bounce:0.6, stagger:0.05s }`. Typography: `font-gilroyRegular text-lg md:text-xl tracking-wide text-slate-500` — non-bold, visually subordinate.
  - **Why hire me?** Reformatted the bulleted list into a 2x2 responsive grid matching the structural aesthetics and layout classes of the Preferences section, while preserving staggered fade-in scroll animations.
  - **Scroll Down indicator**: Hidden on mobile (`hidden md:flex`) to prevent any visual overlaps in short viewports.
  - **Other sections**: Preferences 2-col grid, `<PageFooter />`.

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

- Final validation of production builds and mobile layout checks on dev server.
- Commit all code and confirm responsiveness. stage: `hire-me/page.tsx`, `context.md`.

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