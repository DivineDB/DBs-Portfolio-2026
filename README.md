# DivineDB // Portfolio 2026

An editorial-grade design engineering portfolio. Crafted with Next.js, Framer Motion, and Tailwind CSS, embodying a **Minimalist Editorial** aesthetic.

---

## 🎨 The Design System
The visual language balances the elegance of editorial layouts with modern high-fidelity micro-interactions.

*   **Background Canvas (`#F8EDD1`):** A warm, premium editorial paper tone.
*   **Primary Typography & Contrast (`#2A4756`):** Deep slate-blue for comfortable, long-form reading and clear visual hierarchy.
*   **Accent Color (`#A2F991`):** A vibrant mint-electric green highlighting key interactive nodes and core accomplishments.
*   **Grid System:** Asymmetric CSS grids and editorial baselines that feel structured and dynamic.

---

## 🚀 Key Features

*   **Editorial Snapping Work Index (`/work`):** Full-screen viewport-snapping grid configurations highlighting select case studies with zero layout shifting.
*   **Premium Case Studies (`/work/[slug]`):** Dynamic, single-column rich reader view featuring large, responsive geometric visual representations, deep-dive brief structures, and engineered architecture highlights.
*   **Interactive Hero Canvas:** Interactive vector art (`Building.svg`) overlaid with dynamic hover states and navigation.
*   **Live-Time Status Pill:** A glassmorphic widget showing pulsing indicators and real-time Indian Standard Time (IST) for dynamic availability tracking.
*   **Context-Aware Smart Footer:** Dynamic links that automatically hide the current page route to minimize DOM clutter and streamline navigation.
*   **Refined Micro-Interactions:** Smooth, spring-physics underline animations for active navigation and transitions, driven by Framer Motion.

---

## 🛠️ Tech Stack & Architecture

*   **Framework:** Next.js (App Router, Tailwind CSS, TypeScript)
*   **Animations:** Framer Motion (for entrance triggers, page snaps, and layout animations)
*   **Typography:** Custom Gilroy & Mono pairings
*   **Development / Build Tool:** Next.js Turbopack / Webpack

```
src/
├── app/
│   ├── page.tsx          # Landing Hero
│   ├── about/            # Story & Bio Page
│   ├── work/             # Snapping Portfolio Index
│   │   ├── page.tsx
│   │   └── [slug]/       # Premium Dynamic Case Studies
│   └── hire-me/          # Structured Inbound Funnel
└── components/
    ├── sections/         # Page-level core layouts
    └── ui/               # Reusable atomic tokens (HighlightBox, etc.)
```

---

## ⚙️ Development & Deployment

### 1. Local Run
Install dependencies and run the development server:
```bash
npm install
npm run dev
```

### 2. Deployment
This project is optimized for deployment via Vercel:
```bash
npx vercel
```

---
*Crafted by Divyansh Baghel — Design Engineer.*
