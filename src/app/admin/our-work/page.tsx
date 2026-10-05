import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listCategoriesAdmin, listItems } from "@/lib/data/work";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "../actions";
import CategoryTableRow from "@/components/admin/CategoryTableRow";

export default async function AdminOurWorkPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const categories = await listCategoriesAdmin();
  const counts = await Promise.all(categories.map((c) => listItems(c.slug).then((items) => items.length)));

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <Link href="/admin">← Admin</Link>
          <h1>Our Work — categories</h1>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Type</th>
            <th>Items</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <CategoryTableRow
              key={category.slug}
              category={category}
              itemCount={counts[i]}
              updateCategoryAction={updateCategoryAction}
              deleteCategoryAction={deleteCategoryAction}
            />
          ))}
        </tbody>
      </table>

      <h2>Add category</h2>
      <form action={createCategoryAction} className="admin-form">
        <label>
          Slug
          <input type="text" name="slug" placeholder="e.g. behind-the-scenes" required />
        </label>
        <label>
          Title
          <input type="text" name="title" placeholder="e.g. Behind the Scenes" required />
        </label>
        <label>
          Media type
          <select name="mediaType" defaultValue="image">
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
        </label>
        <button type="submit">Add category</button>
      </form>
    </div>
  );
}
