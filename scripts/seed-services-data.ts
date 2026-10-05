import { getDb } from "../src/lib/mongodb";
import { SERVICE_CATEGORIES } from "../src/components/services/services-data";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const db = await getDb();
  const services = db.collection("services");

  await services.createIndex({ slug: 1 }, { unique: true });

  const now = new Date();

  for (const [index, service] of SERVICE_CATEGORIES.entries()) {
    const slug = slugify(service.title);

    await services.updateOne(
      { slug },
      {
        $set: {
          title: service.title,
          subtitle: service.subtitle,
          description: service.description,
          links: service.links,
          video: service.video,
          order: index,
          updatedAt: now,
        },
        $setOnInsert: { slug, createdAt: now },
      },
      { upsert: true }
    );

    console.log(`Seeded "${service.title}" (slug: ${slug})`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
