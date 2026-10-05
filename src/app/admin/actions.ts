"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth";
import * as work from "@/lib/data/work";
import { isAllowedMediaUrl } from "@/lib/allowed-media-host";
import { deleteGcsObjectByUrl } from "@/lib/gcs";

const mediaUrl = z
  .string()
  .trim()
  .min(1)
  .refine(isAllowedMediaUrl, "Must be a relative /path or an allowed host (see next.config.ts remotePatterns)");
const mediaUrlOptional = z.union([mediaUrl, z.literal("")]).optional();

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

// ---------- Categories ----------

const categorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1),
  mediaType: z.enum(["image", "video"]),
});

export async function createCategoryAction(formData: FormData) {
  await requireAuth();

  const parsed = categorySchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    mediaType: formData.get("mediaType"),
  });

  const existing = await work.listCategoriesAdmin();
  await work.createCategory({ ...parsed, order: existing.length });

  revalidatePath("/admin");
  revalidatePath("/our-work-cms");
  redirect("/admin");
}

export async function updateCategoryAction(formData: FormData) {
  await requireAuth();

  const slug = z.string().min(1).parse(formData.get("slug"));
  const title = z.string().trim().min(1).parse(formData.get("title"));
  const order = z.coerce.number().int().min(0).parse(formData.get("order"));

  await work.updateCategory(slug, { title, order });

  revalidatePath("/admin");
  revalidatePath("/our-work-cms");
  redirect("/admin");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAuth();

  const slug = z.string().min(1).parse(formData.get("slug"));

  const items = await work.listItems(slug);
  await work.deleteCategory(slug);

  const urls = items
    .flatMap((item) => [item.image?.thumbUrl, item.image?.fullUrl, item.video?.url, item.video?.posterUrl])
    .filter((u): u is string => !!u);
  await Promise.all(urls.map((u) => deleteGcsObjectByUrl(u)));

  revalidatePath("/admin");
  revalidatePath("/our-work-cms");
  redirect("/admin");
}

// ---------- Items ----------

const imageItemSchema = z.object({
  categorySlug: z.string().min(1),
  alt: z.string().trim().min(1),
  thumbUrl: mediaUrl,
  fullUrl: mediaUrl,
});

const videoItemSchema = z.object({
  categorySlug: z.string().min(1),
  alt: z.string().trim().min(1),
  url: mediaUrl,
  posterUrl: mediaUrlOptional,
});

export async function createItemAction(formData: FormData) {
  await requireAuth();

  const categorySlug = z.string().min(1).parse(formData.get("categorySlug"));
  const category = await work.getCategoryAdmin(categorySlug);
  if (!category) throw new Error("Category not found");

  const existing = await work.listItems(categorySlug);
  const order = existing.length;

  if (category.mediaType === "image") {
    const parsed = imageItemSchema.parse({
      categorySlug,
      alt: formData.get("alt"),
      thumbUrl: formData.get("thumbUrl"),
      fullUrl: formData.get("fullUrl"),
    });
    await work.createItem({
      categorySlug,
      type: "image",
      order,
      alt: parsed.alt,
      image: { thumbUrl: parsed.thumbUrl, fullUrl: parsed.fullUrl },
    });
  } else {
    const parsed = videoItemSchema.parse({
      categorySlug,
      alt: formData.get("alt"),
      url: formData.get("url"),
      posterUrl: formData.get("posterUrl"),
    });
    await work.createItem({
      categorySlug,
      type: "video",
      order,
      alt: parsed.alt,
      video: { url: parsed.url, posterUrl: parsed.posterUrl || undefined },
    });
  }

  revalidatePath(`/admin/categories/${categorySlug}`);
  revalidatePath("/our-work-cms");
  redirect(`/admin/categories/${categorySlug}`);
}

export async function updateItemAction(formData: FormData) {
  await requireAuth();

  const id = z.string().min(1).parse(formData.get("id"));
  const categorySlug = z.string().min(1).parse(formData.get("categorySlug"));
  const type = z.enum(["image", "video"]).parse(formData.get("type"));
  const order = z.coerce.number().int().min(0).parse(formData.get("order"));
  const alt = z.string().trim().min(1).parse(formData.get("alt"));

  if (type === "image") {
    const thumbUrl = mediaUrl.parse(formData.get("thumbUrl"));
    const fullUrl = mediaUrl.parse(formData.get("fullUrl"));
    await work.updateItem(id, { order, alt, image: { thumbUrl, fullUrl } });
  } else {
    const url = mediaUrl.parse(formData.get("url"));
    const posterUrl = mediaUrlOptional.parse(formData.get("posterUrl"));
    await work.updateItem(id, { order, alt, video: { url, posterUrl: posterUrl || undefined } });
  }

  revalidatePath(`/admin/categories/${categorySlug}`);
  revalidatePath("/our-work-cms");
  redirect(`/admin/categories/${categorySlug}`);
}

export async function deleteItemAction(formData: FormData) {
  await requireAuth();

  const id = z.string().min(1).parse(formData.get("id"));
  const categorySlug = z.string().min(1).parse(formData.get("categorySlug"));

  const deleted = await work.deleteItem(id);
  if (deleted) {
    const urls = [deleted.image?.thumbUrl, deleted.image?.fullUrl, deleted.video?.url, deleted.video?.posterUrl].filter(
      (u): u is string => !!u
    );
    await Promise.all(urls.map((u) => deleteGcsObjectByUrl(u)));
  }

  revalidatePath(`/admin/categories/${categorySlug}`);
  revalidatePath("/our-work-cms");
  redirect(`/admin/categories/${categorySlug}`);
}
