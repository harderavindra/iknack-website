import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCategoryAdmin, listItems } from "@/lib/data/work";
import { createItemAction, updateItemAction, deleteItemAction } from "../../actions";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import MediaSlot from "@/components/admin/MediaSlot";

export default async function AdminCategoryItemsPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { slug } = await params;
  const category = await getCategoryAdmin(slug);
  if (!category) notFound();

  const items = await listItems(slug);
  const isImage = category.mediaType === "image";

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <Link href="/admin/our-work">← All categories</Link>
          <h1>{category.title}</h1>
          <p>
            {items.length} {category.mediaType} item{items.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="admin-item-grid">
        {items.map((item) => {
          const id = item._id!.toString();
          return (
            <form key={id} action={updateItemAction} className="admin-item-card">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="categorySlug" value={slug} />
              <input type="hidden" name="type" value={category.mediaType} />

              <div className="admin-item-card-fields">
                <input type="number" name="order" defaultValue={item.order} min={0} className="admin-order-input" title="Order" />
                <input type="text" name="alt" defaultValue={item.alt} placeholder="Alt text" className="admin-title-input" />
              </div>

              <div className="admin-item-card-media">
                {isImage ? (
                  <>
                    <MediaSlot name="thumbUrl" categorySlug={slug} defaultValue={item.image?.thumbUrl} kind="image" label="Thumb" required />
                    <MediaSlot name="fullUrl" categorySlug={slug} defaultValue={item.image?.fullUrl} kind="image" label="Preview" required />
                  </>
                ) : (
                  <>
                    <MediaSlot name="posterUrl" categorySlug={slug} defaultValue={item.video?.posterUrl} kind="image" label="Thumb" />
                    <MediaSlot name="url" categorySlug={slug} defaultValue={item.video?.url} kind="video" label="Preview" required />
                  </>
                )}
              </div>

              <div className="admin-item-card-actions">
                <button type="submit">Save</button>
                <ConfirmSubmitButton
                  message={`Delete "${item.alt}"?`}
                  className="admin-item-card-delete"
                  formAction={deleteItemAction}
                >
                  Delete
                </ConfirmSubmitButton>
              </div>
            </form>
          );
        })}
      </div>

      <h2>Add item</h2>
      <form action={createItemAction} className="admin-item-card admin-item-card-new">
        <input type="hidden" name="categorySlug" value={slug} />
        <div className="admin-item-card-fields">
          <input type="text" name="alt" placeholder="Alt text" className="admin-title-input" required />
        </div>
        <div className="admin-item-card-media">
          {isImage ? (
            <>
              <MediaSlot name="thumbUrl" categorySlug={slug} kind="image" label="Thumb" required />
              <MediaSlot name="fullUrl" categorySlug={slug} kind="image" label="Preview" required />
            </>
          ) : (
            <>
              <MediaSlot name="posterUrl" categorySlug={slug} kind="image" label="Thumb" />
              <MediaSlot name="url" categorySlug={slug} kind="video" label="Preview" required />
            </>
          )}
        </div>
        <div className="admin-item-card-actions">
          <button type="submit">Add item</button>
        </div>
      </form>
    </div>
  );
}
