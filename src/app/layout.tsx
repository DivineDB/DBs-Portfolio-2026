import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import CommandPaletteLoader from "../components/CommandPaletteLoader";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-playfair-display",
});

const gilroyRegular = localFont({
  src: "./fonts/Gilroy-Regular.otf",
  variable: "--font-gilroy-regular",
  weight: "400",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  display: "swap",
});

const gilroyBold = localFont({
  src: "./fonts/Gilroy-Bold.otf",
  variable: "--font-gilroy-bold",
  weight: "600",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divyansh Baghel — Design Engineer",
  description: "Portfolio of Divyansh Baghel, Design Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gilroyRegular.variable} ${gilroyBold.variable} ${playfairDisplay.variable} h-full`}
    >
      <body className="min-h-full">
        <CommandPaletteLoader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

