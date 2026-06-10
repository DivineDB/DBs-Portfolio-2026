# My Portfolio 2026
An editorial-grade design engineering portfolio. Crafted with Next.js, Framer Motion, and Tailwind CSS, embodying a **Minimalist Editorial** aesthetic.

---

## 🎨 Design Philosophy & Signification

This portfolio is an exercise in restraint, typography, and micro-interactions. It rejects the generic templates of modern web design, drawing heavy inspiration from high-end print design, editorial publications, and archival media.

### The Palette & Aesthetics
*   **Warm Paper Canvas (`#F8EDD1`):** Represents analog touch, history, and archival paper. It is warm, welcoming, and immediately shifts the user's perception from a cold digital screen to a tangible physical layout.
*   **Organic Contrast (`#2A4756`):** Opting for deep slate-blue instead of standard digital black. This reduces eye strain, maintains pure editorial structure, and conveys premium editorial typography.
*   **Electric Utility (`#A2F991`):** Represents high-performance technology. An active, vibrant green that flashes across interactive nodes and live status widgets—a reminder of the fast, high-fidelity codebase underlying the static canvas.

---

## ⚡ Interactive Features (Morphed Modules)

### 🕰️ Clock Morphing Social Menu
On clicking the **Contact** button, the live clock pill dynamically spring-morphs from `122px` width to `185px` width to reveal a menu containing the user's social links (LinkedIn, Email, GitHub, and Instagram), complete with custom spring physics and rapid exit animations on closure.

### 🪟 SVG-to-HTML Window Typography Overlay
Vector text labels inside the interactive windows of the building illustration were migrated from static SVG paths to native, screen-reader friendly HTML overlays. Custom fluid typography was styled with **Satoshi Bold** and responsive `clamp()` functions to scale perfectly across mobile viewports (`vw`-based) and desktop viewports (`vh`-based).

---

## 🛠️ The Tech Stack & What It Signifies

To bridge the gap between traditional print design and bleeding-edge web engineering, we selected a highly curated stack:

### Next.js & TypeScript
*   **Significance:** Structural solidity and type-safety.
*   **Why It Matters:** Just as editorial grid systems mandate rigid alignment rules, TypeScript ensures strict data structures, preventing layout shifts or component failures. The App Router provides smooth, instant page transitions without refreshing, preserving the immersive canvas experience.

### Framer Motion
*   **Significance:** Physics, weight, and organic momentum.
*   **Why It Matters:** Animations in this portfolio do not follow robotic linear timings. They use custom spring physics (dampening and stiffness) to mimic physical inertia, mimicking the tactile feedback of turning a premium magazine page or pressing a springy mechanical button.

### Tailwind CSS
*   **Significance:** Design system utility tokens.
*   **Why It Matters:** Tailwind's configuration forms the exact design token contract of this site. By mapping spacing, colors, and layout configurations directly to Tailwind variables, we enforce pixel-perfect grid margins and typographic alignments across all viewports.

---

## 📂 Structural Overview

The project is architected with a strict hierarchy that mirrors the logical division of editorial sections:

*   **`src/app/page.tsx`:** The entry canvas. An interactive grid featuring an abstract architectural illustration alongside high-contrast type and the morphing status/social widget.
*   **`src/app/about`:** A minimalist personal narrative using spacious typographic layout blocks and standard high-fidelity transitions.
*   **`src/app/work`:** A strict full-viewport scroll-snapping work index, highlighting select software architectures.
*   **`src/app/work/[slug]`:** Single-column dynamic case study reader layout optimized for uninterrupted editorial reading, utilizing geometric banners and split structure briefs.
*   **`src/app/hire-me`:** A clean, minimal, functional inbound funnel layout.

---

## 🚀 Local Development

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Run Dev Server
Start the local development server:
```bash
npm run dev
```

### 3. Production Build
Create an optimized production bundle:
```bash
npm run build
```

---
*Crafted by Divyansh Baghel — Design Engineer.*
