import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default async function Icon() {
  // Load the Gilroy-Bold local font
  let fontData: Buffer;
  try {
    const fontPath = path.join(process.cwd(), "src/app/fonts/Gilroy-Bold.otf");
    fontData = fs.readFileSync(fontPath);
  } catch (error) {
    // Fallback if font loading fails
    console.error("Failed to load Gilroy-Bold font for icon:", error);
    fontData = Buffer.alloc(0);
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2a4756", // Primary Color
          fontFamily: "GilroyBold",
          fontWeight: 800,
          letterSpacing: "-0.08em",
          lineHeight: 1,
          paddingRight: "1px", // Visual centering adjustment
        }}
      >
        DB
      </div>
    ),
    {
      ...size,
      fonts: fontData.length > 0
        ? [
            {
              name: "GilroyBold",
              data: fontData,
              style: "normal",
              weight: 800,
            },
          ]
        : [],
    }
  );
}
