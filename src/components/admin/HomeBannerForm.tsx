import MediaTypeSlot from "@/components/admin/MediaTypeSlot";
import type { HomeBannerSlide } from "@/lib/data/home-banner";

export default function HomeBannerForm({
  slides,
  slideCount,
  saveAction,
}: {
  slides: HomeBannerSlide[];
  slideCount: number;
  saveAction: (formData: FormData) => void;
}) {
  return (
    <form action={saveAction}>
      <div className="admin-item-grid">
        {Array.from({ length: slideCount }, (_, i) => (
          <MediaTypeSlot key={i} id={String(i)} title={`Slide ${i + 1}`} uploadFolder="home-banner" value={slides[i]} />
        ))}
      </div>
      <div className="admin-drawer-actions" style={{ marginTop: "1.5rem" }}>
        <button type="submit">Save banner</button>
      </div>
    </form>
  );
}
