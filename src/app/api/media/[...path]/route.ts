import { NextRequest, NextResponse } from "next/server";
import { Readable } from "node:stream";
import { getBucket } from "@/lib/gcs";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const objectPath = path.join("/");

  // Only ever serve objects under our own prefix — this route reads from a
  // bucket shared with another project, so this check is the only thing
  // stopping it from becoming an arbitrary-file-read proxy into their data.
  if (!objectPath.startsWith("iknack/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const file = getBucket().file(objectPath);

  let metadata;
  try {
    [metadata] = await file.getMetadata();
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const nodeStream = file.createReadStream();
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  const headers: Record<string, string> = {
    "Content-Type": metadata.contentType ?? "application/octet-stream",
    "Cache-Control": "public, max-age=31536000, immutable",
  };
  if (metadata.size) headers["Content-Length"] = String(metadata.size);

  return new NextResponse(webStream, { headers });
}
