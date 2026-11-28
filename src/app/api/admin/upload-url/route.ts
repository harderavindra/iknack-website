import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { auth } from "@/auth";
import { getBucket, publicUrlFor } from "@/lib/gcs";
import { validateUpload } from "@/lib/upload-limits";

const requestSchema = z.object({
  filename: z.string().trim().min(1),
  contentType: z.string().trim().min(1, "Unsupported file type. Upload an image or a video."),
  size: z.number().int().positive(),
  categorySlug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Invalid category slug"),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = requestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid upload request" }, { status: 400 });
  }
  const { filename, contentType, size, categorySlug } = parsed.data;

  const problem = validateUpload(contentType, size);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectPath = `iknack/work/${categorySlug}/${randomUUID()}-${sanitized}`;

  const [uploadUrl] = await getBucket()
    .file(objectPath)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000,
      contentType,
    });

  return NextResponse.json({ uploadUrl, publicUrl: publicUrlFor(objectPath) });
}
