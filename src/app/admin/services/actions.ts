"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import * as services from "@/lib/data/services";
import { isAllowedMediaUrl } from "@/lib/allowed-media-host";
import { deleteGcsObjectByUrl } from "@/lib/gcs";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

const mediaUrl = z
  .string()
  .trim()
  .min(1)
  .refine(isAllowedMediaUrl, "Must be a relative /path or an allowed host (see next.config.ts remotePatterns)");

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseLinks(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const serviceSchema = z.object({
  title: z.string().trim().min(1),
  subtitle: z.string().trim().optional(),
  description: z.string().trim().min(1),
  video: mediaUrl,
  // Optional image for the home page service grid ("" = none).
  thumbnail: z.union([z.literal(""), mediaUrl]).optional(),
});

function readServiceForm(formData: FormData) {
  return serviceSchema.parse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    video: formData.get("video"),
    thumbnail: formData.get("thumbnail") ?? "",
  });
}

export async function createServiceAction(formData: FormData) {
  await requireAuth();

  const parsed = readServiceForm(formData);
  const links = parseLinks(formData.get("links"));

  const existing = await services.listServicesAdmin();
  await services.createService({
    ...parsed,
    links,
    slug: slugify(parsed.title),
    order: existing.length,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services-cms");
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/about"); // shows the service count
  redirect("/admin/services");
}

export async function updateServiceAction(formData: FormData) {
  await requireAuth();

  const slug = z.string().min(1).parse(formData.get("slug"));
  const order = z.coerce.number().int().min(0).parse(formData.get("order"));
  const parsed = readServiceForm(formData);
  const links = parseLinks(formData.get("links"));

  const previous = await services.getServiceAdmin(slug);
  await services.updateService(slug, { ...parsed, links, order });

  // Remove replaced/cleared uploads from storage.
  if (previous?.video && previous.video !== parsed.video) await deleteGcsObjectByUrl(previous.video);
  if (previous?.thumbnail && previous.thumbnail !== parsed.thumbnail) await deleteGcsObjectByUrl(previous.thumbnail);

  revalidatePath("/admin/services");
  revalidatePath("/services-cms");
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/about"); // shows the service count
  redirect("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAuth();

  const slug = z.string().min(1).parse(formData.get("slug"));
  const deleted = await services.deleteService(slug);
  if (deleted?.video) await deleteGcsObjectByUrl(deleted.video);
  if (deleted?.thumbnail) await deleteGcsObjectByUrl(deleted.thumbnail);

  revalidatePath("/admin/services");
  revalidatePath("/services-cms");
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/about"); // shows the service count
  redirect("/admin/services");
}
