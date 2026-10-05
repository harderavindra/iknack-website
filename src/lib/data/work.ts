import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { WorkCategory, WorkImage, WorkVideo } from "@/components/our-work/our-work-data";

type MediaType = "image" | "video";

type CategoryDoc = {
  _id?: ObjectId;
  slug: string;
  title: string;
  mediaType: MediaType;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

type ItemDoc = {
  _id?: ObjectId;
  categorySlug: string;
  type: MediaType;
  order: number;
  alt: string;
  image?: { thumbUrl: string; fullUrl: string };
  video?: { url: string; posterUrl?: string };
  sourceKey?: string;
  createdAt: Date;
  updatedAt: Date;
};

async function categoriesCollection() {
  const db = await getDb();
  return db.collection<CategoryDoc>("workCategories");
}

async function itemsCollection() {
  const db = await getDb();
  return db.collection<ItemDoc>("workItems");
}

// ---------- Public (read-only, shaped for the existing UI components) ----------

export async function getWorkCategoriesForDisplay(): Promise<WorkCategory[]> {
  const [categories, items] = await Promise.all([
    (await categoriesCollection()).find().sort({ order: 1 }).toArray(),
    (await itemsCollection()).find().sort({ order: 1 }).toArray(),
  ]);

  return categories.map((category) => {
    const categoryItems = items.filter((item) => item.categorySlug === category.slug);

    if (category.mediaType === "image") {
      const images: WorkImage[] = categoryItems.map((item) => ({
        thumb: item.image?.thumbUrl ?? "",
        full: item.image?.fullUrl ?? "",
        alt: item.alt,
      }));
      return { id: category.slug, title: category.title, itemCount: images.length, images };
    }

    const videos: WorkVideo[] = categoryItems.map((item) => ({
      src: item.video?.url ?? "",
      poster: item.video?.posterUrl,
      alt: item.alt,
    }));
    return { id: category.slug, title: category.title, itemCount: videos.length, videos };
  });
}

// ---------- Admin (category CRUD) ----------

export type CategoryInput = { slug: string; title: string; mediaType: MediaType; order: number };

export async function listCategoriesAdmin() {
  return (await categoriesCollection()).find().sort({ order: 1 }).toArray();
}

export async function getCategoryAdmin(slug: string) {
  return (await categoriesCollection()).findOne({ slug });
}

export async function createCategory(input: CategoryInput) {
  const now = new Date();
  const doc: CategoryDoc = { ...input, createdAt: now, updatedAt: now };
  const result = await (await categoriesCollection()).insertOne(doc);
  return result.insertedId;
}

export async function updateCategory(slug: string, input: Partial<CategoryInput>) {
  await (await categoriesCollection()).updateOne({ slug }, { $set: { ...input, updatedAt: new Date() } });
}

export async function deleteCategory(slug: string) {
  await (await itemsCollection()).deleteMany({ categorySlug: slug });
  await (await categoriesCollection()).deleteOne({ slug });
}

export async function reorderCategories(order: { slug: string; order: number }[]) {
  const collection = await categoriesCollection();
  await Promise.all(order.map(({ slug, order: o }) => collection.updateOne({ slug }, { $set: { order: o, updatedAt: new Date() } })));
}

// ---------- Admin (item CRUD) ----------

export type ItemInput = {
  categorySlug: string;
  type: MediaType;
  order: number;
  alt: string;
  image?: { thumbUrl: string; fullUrl: string };
  video?: { url: string; posterUrl?: string };
  sourceKey?: string;
};

export async function listItems(categorySlug: string) {
  return (await itemsCollection()).find({ categorySlug }).sort({ order: 1 }).toArray();
}

export async function createItem(input: ItemInput) {
  const now = new Date();
  const doc: ItemDoc = { ...input, createdAt: now, updatedAt: now };
  const result = await (await itemsCollection()).insertOne(doc);
  return result.insertedId;
}

export async function updateItem(id: string, input: Partial<ItemInput>) {
  await (await itemsCollection()).updateOne({ _id: new ObjectId(id) }, { $set: { ...input, updatedAt: new Date() } });
}

export async function deleteItem(id: string) {
  return (await itemsCollection()).findOneAndDelete({ _id: new ObjectId(id) });
}

export async function reorderItems(order: { id: string; order: number }[]) {
  const collection = await itemsCollection();
  await Promise.all(
    order.map(({ id, order: o }) => collection.updateOne({ _id: new ObjectId(id) }, { $set: { order: o, updatedAt: new Date() } }))
  );
}
