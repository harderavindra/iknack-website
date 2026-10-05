import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listServicesAdmin } from "@/lib/data/services";
import { createServiceAction, updateServiceAction, deleteServiceAction } from "./actions";
import ServicesAdminBoard from "@/components/admin/ServicesAdminBoard";

export default async function AdminServicesPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const services = await listServicesAdmin();

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <Link href="/admin">← Admin</Link>
          <h1>Services</h1>
          <p>{services.length} services</p>
        </div>
      </div>

      <ServicesAdminBoard
        services={services}
        createServiceAction={createServiceAction}
        updateServiceAction={updateServiceAction}
        deleteServiceAction={deleteServiceAction}
      />
    </div>
  );
}
