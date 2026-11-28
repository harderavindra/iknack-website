import { NextRequest, NextResponse } from "next/server";
import { getBucket } from "@/lib/gcs";

// Uploaded media lives in a private, shared GCS bucket, so it can't be linked to directly.
// Instead of streaming the bytes through this Vercel function (slow, costly, and no Range
// support for video seeking), we redirect to a short-lived signed GCS URL: Google Cloud
// serves the file itself — with Range/206, so videos seek and play on Safari/iOS.
//
// The redirect is cached on Vercel's CDN, so repeat requests don't invoke this function.
const SIGNED_URL_TTL_MS = 24 * 60 * 60 * 1000; // signature valid 24h…
const CDN_CACHE_SECONDS = 12 * 60 * 60; // …CDN reuses the redirect for 12h (always inside the signature)
const BROWSER_CACHE_SECONDS = 60 * 60;

// Uploaded objects never change (UUID filenames), but GCS serves objects without a
// Cache-Control as "private, max-age=0". Browsers then re-check a looping video with GCS on
// every loop (the stream of 304/206 requests). Stamp a long cache header on first use.
const OBJECT_CACHE_CONTROL = "public, max-age=31536000, immutable";

async function redirectToSignedUrl(path: string[]) {
  const objectPath = path.join("/");

  // Only ever serve objects under our own prefix — the bucket is shared with another
  // project, so this check is what stops this route signing URLs for their data.
  if (!objectPath.startsWith("iknack/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const file = getBucket().file(objectPath);

  let signedUrl: string;
  try {
    const metadata = await file
      .getMetadata()
      .then(([m]) => m)
      .catch((err: { code?: number }) => {
        if (err.code === 404) return null;
        throw err;
      });
    if (!metadata) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (metadata.cacheControl !== OBJECT_CACHE_CONTROL) {
      await file.setMetadata({ cacheControl: OBJECT_CACHE_CONTROL }).catch((err) => {
        console.error("Failed to set Cache-Control on", objectPath, err);
      });
    }
    [signedUrl] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + SIGNED_URL_TTL_MS,
    });
  } catch (err) {
    console.error("Failed to sign media URL", objectPath, err);
    return NextResponse.json({ error: "Media unavailable" }, { status: 502 });
  }

  const res = NextResponse.redirect(signedUrl, 302);
  res.headers.set("Cache-Control", `public, max-age=${BROWSER_CACHE_SECONDS}`);
  res.headers.set("Vercel-CDN-Cache-Control", `public, max-age=${CDN_CACHE_SECONDS}`);
  return res;
}

type Context = { params: Promise<{ path: string[] }> };

export async function GET(_req: NextRequest, { params }: Context) {
  return redirectToSignedUrl((await params).path);
}

export async function HEAD(_req: NextRequest, { params }: Context) {
  return redirectToSignedUrl((await params).path);
}
