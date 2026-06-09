import fs from "fs";
import path from "path";
import OtherThingsClient from "./OtherThingsClient";

// Helper mapping to provide descriptive, custom alt texts for specific photo assets
const PHOTO_ALTS: Record<string, string> = {
  "photography-1.jpg": "Street Photography - Gwalior",
  "photography-2.jpg": "Cinematic Scene - Pune",
  "photography-3.jpg": "Urban Geometry - Hyderabad",
  "photography-4.jpg": "Minimalist Perspective",
};

export default function OtherThingsPage() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  let photos: { src: string; alt: string }[] = [];

  try {
    const files = fs.readdirSync(imagesDir);
    const photoFiles = files
      .filter((file) => file.startsWith("photography-") && file.endsWith(".jpg"))
      .sort((a, b) => {
        // Natural/sequential sort by parsing the photo index (e.g. photography-2.jpg vs photography-10.jpg)
        const numA = parseInt(a.replace("photography-", "").replace(".jpg", ""), 10);
        const numB = parseInt(b.replace("photography-", "").replace(".jpg", ""), 10);
        return numA - numB;
      });

    photos = photoFiles.map((file) => ({
      src: `/images/${file}`,
      alt: PHOTO_ALTS[file] || `Visual Narrative ${file.replace("photography-", "").replace(".jpg", "")}`,
    }));
  } catch (err) {
    console.error("Failed to read public/images directory:", err);
  }

  return <OtherThingsClient photos={photos} />;
}
