"use client";

import { useState } from "react";
import Link from "next/link";
import type { listCategoriesAdmin } from "@/lib/data/work";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";

type Category = Awaited<ReturnType<typeof listCategoriesAdmin>>[number];

export default function CategoryTableRow({
  category,
  itemCount,
  updateCategoryAction,
  deleteCategoryAction,
}: {
  category: Category;
  itemCount: number;
  updateCategoryAction: (formData: FormData) => void;
  deleteCategoryAction: (formData: FormData) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <tr>
        <td colSpan={5}>
          <form action={updateCategoryAction} className="admin-inline-form">
            <input type="hidden" name="slug" value={category.slug} />
            <input type="number" name="order" defaultValue={category.order} min={0} className="admin-order-input" />
            <input type="text" name="title" defaultValue={category.title} className="admin-title-input" />
            <code>{category.slug}</code>
            <span>{category.mediaType}</span>
            <span>{itemCount} items</span>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </form>
        </td>
        <td className="admin-row-actions">
          <form action={deleteCategoryAction}>
            <input type="hidden" name="slug" value={category.slug} />
            <ConfirmSubmitButton message={`Delete "${category.title}" and all its items? This cannot be undone.`}>
              Delete
            </ConfirmSubmitButton>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{category.order}</td>
      <td>{category.title}</td>
      <td>
        <code>{category.slug}</code>
      </td>
      <td>{category.mediaType}</td>
      <td>{itemCount} items</td>
      <td className="admin-row-actions">
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
        <Link href={`/admin/categories/${category.slug}`}>Manage items →</Link>
        <form action={deleteCategoryAction}>
          <input type="hidden" name="slug" value={category.slug} />
          <ConfirmSubmitButton message={`Delete "${category.title}" and all its items? This cannot be undone.`}>
            Delete
          </ConfirmSubmitButton>
        </form>
      </td>
    </tr>
  );
}
