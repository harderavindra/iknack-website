"use client";

import { useState } from "react";
import type { listServicesAdmin } from "@/lib/data/services";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import MediaSlot from "@/components/admin/MediaSlot";

type Service = Awaited<ReturnType<typeof listServicesAdmin>>[number];

const NEW = "__new__";

export default function ServicesAdminBoard({
  services,
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
}: {
  services: Service[];
  createServiceAction: (formData: FormData) => void;
  updateServiceAction: (formData: FormData) => void;
  deleteServiceAction: (formData: FormData) => void;
}) {
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const editingService = editingSlug && editingSlug !== NEW ? services.find((s) => s.slug === editingSlug) ?? null : null;
  const isOpen = editingSlug !== null;
  const isNew = editingSlug === NEW;

  return (
    <>
      <div className="admin-service-list">
        {services.map((service) => (
          <div key={service.slug} className="admin-service-row">
            <span className="admin-service-row-order">{service.order}</span>
            <div className="admin-service-row-thumb">
              {service.video && <video src={service.video} muted preload="metadata" />}
            </div>
            <div className="admin-service-row-text">
              <strong>{service.title}</strong>
              {service.subtitle && <span>{service.subtitle}</span>}
            </div>
            <div className="admin-service-row-actions">
              <button type="button" onClick={() => setEditingSlug(service.slug)}>
                Edit
              </button>
              <form action={deleteServiceAction}>
                <input type="hidden" name="slug" value={service.slug} />
                <ConfirmSubmitButton message={`Delete "${service.title}"?`}>Delete</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="admin-service-add-trigger" onClick={() => setEditingSlug(NEW)}>
        + Add service
      </button>

      {isOpen && (
        <>
          <div className="admin-drawer-backdrop" onClick={() => setEditingSlug(null)} />
          <div className="admin-drawer">
            <div className="admin-drawer-header">
              <h2>{isNew ? "Add service" : "Edit service"}</h2>
              <button type="button" className="admin-drawer-close" onClick={() => setEditingSlug(null)} aria-label="Close">
                ×
              </button>
            </div>

            <form action={isNew ? createServiceAction : updateServiceAction} className="admin-drawer-form">
              {!isNew && editingService && (
                <>
                  <input type="hidden" name="slug" value={editingService.slug} />
                  <label>
                    Order
                    <input type="number" name="order" defaultValue={editingService.order} min={0} />
                  </label>
                </>
              )}
              <label>
                Title
                <input type="text" name="title" defaultValue={editingService?.title} required />
              </label>
              <label>
                Subtitle (optional)
                <input type="text" name="subtitle" defaultValue={editingService?.subtitle} />
              </label>
              <label>
                Description
                <textarea name="description" defaultValue={editingService?.description} rows={4} required />
              </label>
              <label>
                Links (one per line)
                <textarea
                  name="links"
                  defaultValue={editingService?.links.join("\n")}
                  placeholder={"Brand Identity Design\nLogo Design"}
                  rows={5}
                />
              </label>
              <label>
                Video
                <MediaSlot name="video" categorySlug="services" defaultValue={editingService?.video} kind="video" label="" required />
              </label>

              <div className="admin-drawer-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingSlug(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
