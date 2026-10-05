import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listCategoriesAdmin, listItems } from "@/lib/data/work";
import { listServicesAdmin } from "@/lib/data/services";
import { signOutAction } from "./actions";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const categories = await listCategoriesAdmin();
  const itemsByCategory = await Promise.all(categories.map((c) => listItems(c.slug)));
  const totalItems = itemsByCategory.reduce((sum, items) => sum + items.length, 0);

  let ourWorkThumb: string | undefined;
  outer: for (const items of itemsByCategory) {
    for (const item of items) {
      const url = item.image?.thumbUrl ?? item.video?.posterUrl;
      if (url) {
        ourWorkThumb = url;
        break outer;
      }
    }
  }

  const services = await listServicesAdmin();
  const servicesThumbVideo = services[0]?.video;

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <h1>Admin</h1>
          <p>Signed in as {session.user?.email}</p>
        </div>
        <form action={signOutAction}>
          <button type="submit">Sign out</button>
        </form>
      </div>

      <div className="admin-dashboard-grid">
        <Link href="/admin/our-work" className="admin-dashboard-card">
          <div className="admin-dashboard-card-thumb">
            {ourWorkThumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={ourWorkThumb} alt="" />
            ) : (
              <span className="admin-dashboard-card-placeholder" />
            )}
          </div>
          <div className="admin-dashboard-card-body">
            <h2>Our Work</h2>
            <p>
              {categories.length} categories, {totalItems} items
            </p>
            <span className="admin-dashboard-card-cta">Manage →</span>
          </div>
        </Link>

        <Link href="/admin/services" className="admin-dashboard-card">
          <div className="admin-dashboard-card-thumb">
            {servicesThumbVideo ? (
              <video src={servicesThumbVideo} muted preload="metadata" />
            ) : (
              <span className="admin-dashboard-card-placeholder" />
            )}
          </div>
          <div className="admin-dashboard-card-body">
            <h2>Services</h2>
            <p>{services.length} services</p>
            <span className="admin-dashboard-card-cta">Manage →</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
