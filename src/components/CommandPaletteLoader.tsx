"use client";

import dynamic from "next/dynamic";

// ssr:false is only valid inside a Client Component.
// This thin wrapper lets us use it from the Server Component layout.
const CommandPalette = dynamic(() => import("./CommandPalette"), {
  ssr: false,
});

export default function CommandPaletteLoader() {
  return <CommandPalette />;
}
