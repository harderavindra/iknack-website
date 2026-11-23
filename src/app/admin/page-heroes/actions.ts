"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { PAGE_HEROES, getPageHeroesAdmin, savePageHero } from "@/lib/data/page-heroes";
import { isAllowedMediaUrl } from "@/lib/allowed-media-host";
import { deleteGcsObjectByUrl } from "@/lib/gcs";

const optionalMediaUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || isAllowedMediaUrl(v), "Must be a relative /path or an allowed host");

const heroSchema = z.object({
  type: z.enum(["video", "image"]),
  src: optionalMediaUrl,
  poster: optionalMediaUrl,
});

export async function savePageHeroesAction(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const previous = await getPageHeroesAdmin();
  const orphaned: string[] = [];

  for (const { key, path } of PAGE_HEROES) {
    const parsed = heroSchema.parse({
      type: formData.get(`type-${key}`),
      src: formData.get(`src-${key}`) ?? "",
      poster: formData.get(`poster-${key}`) ?? "",
    });
    const media = parsed.src
      ? {
          type: parsed.type,
          src: parsed.src,
          ...(parsed.type === "video" && parsed.poster ? { poster: parsed.poster } : {}),
        }
      : null;

    await savePageHero(key, media);

    // Remove uploaded files this page no longer uses.
    const old = previous[key];
    const kept = new Set([media?.src, media?.poster].filter(Boolean));
    for (const url of [old?.src, old?.poster]) {
      if (url && !kept.has(url)) orphaned.push(url);
    }
    revalidatePath(path);
  }

  await Promise.all(orphaned.map(deleteGcsObjectByUrl));

  revalidatePath("/admin/page-heroes");
  redirect("/admin/page-heroes?saved=1");
}
