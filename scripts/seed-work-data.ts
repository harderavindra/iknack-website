import { getDb } from "../src/lib/mongodb";
import { WORK_CATEGORIES } from "../src/components/our-work/our-work-data";

function sourceKeyFrom(path: string): string {
  return path.split("/").pop() ?? path;
}

async function main() {
  const db = await getDb();
  const categories = db.collection("workCategories");
  const items = db.collection("workItems");

  await categories.createIndex({ slug: 1 }, { unique: true });
  await items.createIndex({ categorySlug: 1, order: 1 });

  const now = new Date();

  for (const [categoryIndex, category] of WORK_CATEGORIES.entries()) {
    const mediaType = category.videos ? "video" : "image";

    await categories.updateOne(
      { slug: category.id },
      {
        $set: { title: category.title, mediaType, order: categoryIndex, updatedAt: now },
        $setOnInsert: { slug: category.id, createdAt: now },
      },
      { upsert: true }
    );

    const media = category.images ?? category.videos ?? [];

    for (const [itemIndex, item] of media.entries()) {
      const isVideo = "src" in item;
      const sourceKey = sourceKeyFrom(isVideo ? item.src : item.thumb);

      await items.updateOne(
        { categorySlug: category.id, sourceKey },
        {
          $set: {
            categorySlug: category.id,
            type: isVideo ? "video" : "image",
            order: itemIndex,
            alt: item.alt,
            ...(isVideo
              ? { video: { url: item.src, posterUrl: item.poster } }
              : { image: { thumbUrl: item.thumb, fullUrl: item.full } }),
            sourceKey,
            updatedAt: now,
          },
          $setOnInsert: { createdAt: now },
        },
        { upsert: true }
      );
    }

    console.log(`Seeded "${category.title}" (${media.length} items)`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
