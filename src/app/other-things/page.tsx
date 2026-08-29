import fs from "fs";
import path from "path";
import OtherThingsClient from "./OtherThingsClient";

// Re-render on every request so the shuffle is fresh each visit
export const dynamic = "force-dynamic";

// Fisher-Yates shuffle — unbiased in-place randomisation
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Reads JPEG image dimensions directly from the file header.
 * Fast — reads at most 128 KB instead of loading the full image.
 */
function getJpegDimensions(
  filePath: string
): { width: number; height: number } | null {
  try {
    const CHUNK = 131072; // 128 KB — enough for any JPEG header incl. large EXIF
    const buf = Buffer.alloc(CHUNK);
    const fd = fs.openSync(filePath, "r");
    const bytesRead = fs.readSync(fd, buf, 0, CHUNK, 0);
    fs.closeSync(fd);

    // Verify JPEG SOI marker
    if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;

    let offset = 2;
    while (offset + 4 <= bytesRead) {
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];

      // SOF markers (0xC0–0xCF, excluding 0xC4/0xC8/0xCC) contain dimensions
      if (
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf)
      ) {
        if (offset + 9 <= bytesRead) {
          return {
            height: buf.readUInt16BE(offset + 5),
            width: buf.readUInt16BE(offset + 7),
          };
        }
        break;
      }

      // EOI or SOS markers — can't find dimensions beyond this
      if (marker === 0xd9 || marker === 0xda) break;

      // Skip segment (length field includes itself but not the 0xFF marker byte)
      const segLen = buf.readUInt16BE(offset + 2);
      offset += 2 + segLen;
    }
    return null;
  } catch {
    return null;
  }
}

// Descriptive alt texts keyed by content-hash filenames (photography-{sha256[:10]}.jpg)
const PHOTO_ALTS: Record<string, string> = {
  "photography-f6904751ef.jpg": "Street Photography - Gwalior",
  "photography-83b61a5e97.jpg": "Urban Geometry - Hyderabad",
  "photography-85f16b110c.jpg": "Minimalist Perspective",
  "photography-ad2e4b5eb8.jpg": "Quiet Moment",
  "photography-8de57bc609.jpg": "Textured Cityscape",
  "photography-b928901a18.jpg": "Coastal Wandering",
  "photography-e218e7ee4e.jpg": "Depth of Field",
  "photography-50fc3ed9c5.jpg": "Candid Street Scene",
  "photography-850f2988e6.jpg": "Negative Space",
  "photography-7b053a700d.jpg": "Misty Morning",
  "photography-fb049bd2eb.jpg": "Window Light",
  "photography-4f88f165b2.jpg": "Abstract Geometry",
  "photography-0dc11b1618.jpg": "Motion Blur",
  "photography-f401dba843.jpg": "Evening Reflections",
  "photography-8d82cf9a2d.jpg": "People by the Water",
  "photography-c62c5b2df6.jpg": "Monochrome Street Story",
  "photography-d27c04f466.jpg": "Fleeting Passage",
  "photography-e2e5c76907.jpg": "Candid Portrait",
  "photography-34e9787c8e.jpg": "Cinematic Scene - Pune",
  "photography-df43ca7f72.jpg": "Architectural Fragment",
  "photography-bff77c8e55.jpg": "Warm Perspective Portrait",
};

export default function OtherThingsPage() {
  const imagesDir = path.join(process.cwd(), "public", "images", "gallery");
    let photos: { src: string; alt: string; isLandscape: boolean; width?: number; height?: number }[] = [];

  try {
    const files = fs.readdirSync(imagesDir);
    const photoFiles = files.filter(
      (file) => file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png")
    );

    const mapped = photoFiles.map((file) => {
      const filePath = path.join(imagesDir, file);
      const dims = getJpegDimensions(filePath);
      // Landscape images need special handling in the portrait grid to avoid blur
      const isLandscape = dims ? dims.width > dims.height : false;
      return {
        src: `/images/gallery/${file}`,
        alt:
          PHOTO_ALTS[file] ||
          `Visual Narrative ${file
            .replace("photography-", "")
            .replace(".jpg", "")}`,
        isLandscape,
        width: dims?.width,
        height: dims?.height,
      };
    });

    photos = shuffle(mapped);
  } catch (err) {
    console.error("Failed to read public/images/gallery directory:", err);
  }

  return <OtherThingsClient photos={photos} />;
}
