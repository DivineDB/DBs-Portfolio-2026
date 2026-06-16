import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "../components/SmoothScroll";
import CommandPaletteLoader from "../components/CommandPaletteLoader";
import MobileCommandTrigger from "../components/MobileCommandTrigger";
import BackToHome from "../components/BackToHome";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";


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
  icons: {
    icon: "/icon",
  },
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
      suppressHydrationWarning
    >
      <head>
        {typeof window === "undefined" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (sessionStorage.getItem("hasVisitedHome")) {
                    document.documentElement.classList.add("has-visited");
                  }
                } catch (e) {}
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-full">
        <BackToHome />
        <CommandPaletteLoader />
        <MobileCommandTrigger />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}

