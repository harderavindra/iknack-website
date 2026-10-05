import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { auth } from "@/auth";
import { getBucket, publicUrlFor } from "@/lib/gcs";

const requestSchema = z.object({
  filename: z.string().trim().min(1),
  contentType: z.string().trim().min(1),
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
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }
  const { filename, contentType, categorySlug } = parsed.data;

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
