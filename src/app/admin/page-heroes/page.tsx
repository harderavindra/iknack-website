import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PAGE_HEROES, getPageHeroesAdmin } from "@/lib/data/page-heroes";
import MediaTypeSlot from "@/components/admin/MediaTypeSlot";
import { savePageHeroesAction } from "./actions";

export default async function AdminPageHeroesPage({ searchParams }: PageProps<"/admin/page-heroes">) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [heroes, params] = await Promise.all([getPageHeroesAdmin(), searchParams]);

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <Link href="/admin">← Admin</Link>
          <h1>Page Heroes</h1>
          <p>
            One full-width video or image at the top of each page. Leave a slot empty to show the default media.
          </p>
          {params.saved && <p style={{ color: "#4ade80" }}>Saved.</p>}
        </div>
      </div>

      <form action={savePageHeroesAction}>
        <div className="admin-item-grid">
          {PAGE_HEROES.map(({ key, label }) => (
            <MediaTypeSlot key={key} id={key} title={label} uploadFolder="page-heroes" value={heroes[key]} />
          ))}
        </div>
        <div className="admin-drawer-actions" style={{ marginTop: "1.5rem" }}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
