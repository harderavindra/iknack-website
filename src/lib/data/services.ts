import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { ServiceCategory } from "@/components/services/services-data";

type ServiceDoc = {
  _id?: ObjectId;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  links: string[];
  video: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

async function servicesCollection() {
  const db = await getDb();
  return db.collection<ServiceDoc>("services");
}

// ---------- Public (read-only, shaped for the existing UI components) ----------

export async function getServicesForDisplay(): Promise<ServiceCategory[]> {
  const docs = await (await servicesCollection()).find().sort({ order: 1 }).toArray();
  return docs.map((doc) => ({
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    links: doc.links,
    video: doc.video,
  }));
}

// ---------- Admin CRUD ----------

export type ServiceInput = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  links: string[];
  video: string;
  order: number;
};

export async function listServicesAdmin() {
  return (await servicesCollection()).find().sort({ order: 1 }).toArray();
}

export async function getServiceAdmin(slug: string) {
  return (await servicesCollection()).findOne({ slug });
}

export async function createService(input: ServiceInput) {
  const now = new Date();
  const doc: ServiceDoc = { ...input, createdAt: now, updatedAt: now };
  const result = await (await servicesCollection()).insertOne(doc);
  return result.insertedId;
}

export async function updateService(slug: string, input: Partial<ServiceInput>) {
  await (await servicesCollection()).updateOne({ slug }, { $set: { ...input, updatedAt: new Date() } });
}

export async function deleteService(slug: string) {
  return (await servicesCollection()).findOneAndDelete({ slug });
}
