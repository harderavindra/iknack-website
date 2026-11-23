import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { HOME_BANNER_SLIDE_COUNT, getHomeBannerAdmin } from "@/lib/data/home-banner";
import HomeBannerForm from "@/components/admin/HomeBannerForm";
import { saveHomeBannerAction } from "./actions";

export default async function AdminHomeBannerPage({ searchParams }: PageProps<"/admin/home-banner">) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [slides, params] = await Promise.all([getHomeBannerAdmin(), searchParams]);

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <Link href="/admin">← Admin</Link>
          <h1>Home Banner</h1>
          <p>
            Up to {HOME_BANNER_SLIDE_COUNT} full-screen videos or images at the top of the home page. They change every 3
            seconds. Empty slots are skipped; if all are empty, the default videos are shown.
          </p>
          {params.saved && <p style={{ color: "#4ade80" }}>Saved.</p>}
        </div>
      </div>

      <HomeBannerForm slides={slides} slideCount={HOME_BANNER_SLIDE_COUNT} saveAction={saveHomeBannerAction} />
    </div>
  );
}
