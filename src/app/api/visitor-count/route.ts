import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "src/data/visitor-count.json");

// In-memory queue to serialize writes in this Node process
let writeQueue = Promise.resolve();

// Fallback in-memory counter in case writing to the file system fails
let fallbackCount = 0;

export async function POST() {
	return new Promise<Response>((resolve) => {
		// Chain the write request to the queue to prevent concurrent file-write conflicts
		writeQueue = writeQueue
			.then(async () => {
				let count = 0;
				try {
					let fileContent = "";
					try {
						fileContent = await fs.readFile(dataFilePath, "utf8");
					} catch (readError: any) {
						if (readError.code === "ENOENT") {
							// If the file does not exist, initialize it
							const initialData = JSON.stringify({ count: 0 }, null, 2);
							await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
							await fs.writeFile(dataFilePath, initialData, "utf8");
							fileContent = initialData;
						} else {
							throw readError;
						}
					}

					const data = JSON.parse(fileContent);
					if (typeof data.count !== "number") {
						throw new Error("Invalid format in visitor-count.json");
					}

					data.count += 1;
					count = data.count;

					// Write the incremented count back to the file
					await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
				} catch (error) {
					console.error("Error updating visitor count file, using in-memory fallback:", error);
					// Fallback to incrementing our in-memory counter
					fallbackCount += 1;
					count = fallbackCount;
				}

				resolve(NextResponse.json({ count }));
			})
			.catch((err) => {
				console.error("Visitor count queue system error:", err);
				fallbackCount += 1;
				resolve(NextResponse.json({ count: fallbackCount }));
			});
	});
}
