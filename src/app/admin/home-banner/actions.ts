"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  HOME_BANNER_SLIDE_COUNT,
  getHomeBannerAdmin,
  saveHomeBanner,
  type HomeBannerSlide,
} from "@/lib/data/home-banner";
import { isAllowedMediaUrl } from "@/lib/allowed-media-host";
import { deleteGcsObjectByUrl } from "@/lib/gcs";

const optionalMediaUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || isAllowedMediaUrl(v), "Must be a relative /path or an allowed host");

const slideSchema = z.object({
  type: z.enum(["video", "image"]),
  src: optionalMediaUrl,
  poster: optionalMediaUrl,
});

export async function saveHomeBannerAction(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const slides: HomeBannerSlide[] = [];
  for (let i = 0; i < HOME_BANNER_SLIDE_COUNT; i++) {
    const parsed = slideSchema.parse({
      type: formData.get(`type-${i}`),
      src: formData.get(`src-${i}`) ?? "",
      poster: formData.get(`poster-${i}`) ?? "",
    });
    if (!parsed.src) continue;
    slides.push({
      type: parsed.type,
      src: parsed.src,
      ...(parsed.type === "video" && parsed.poster ? { poster: parsed.poster } : {}),
    });
  }

  // Remove uploaded files that are no longer referenced by any slide.
  const previous = await getHomeBannerAdmin();
  const kept = new Set(slides.flatMap((s) => [s.src, s.poster].filter(Boolean)));
  const orphaned = previous.flatMap((s) => [s.src, s.poster]).filter((url): url is string => !!url && !kept.has(url));

  await saveHomeBanner(slides);
  await Promise.all(orphaned.map(deleteGcsObjectByUrl));

  revalidatePath("/admin/home-banner");
  revalidatePath("/");
  redirect("/admin/home-banner?saved=1");
}
