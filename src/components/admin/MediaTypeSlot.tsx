"use client";

import { useState } from "react";
import MediaSlot from "@/components/admin/MediaSlot";

export type MediaTypeValue = {
  type: "video" | "image";
  src: string;
  poster?: string;
};

// A video-or-image picker: type select + upload, plus an optional poster for videos.
// Submits `type-<id>`, `src-<id>` and (videos only) `poster-<id>`.
export default function MediaTypeSlot({
  id,
  title,
  uploadFolder,
  value,
}: {
  id: string;
  title: string;
  uploadFolder: string;
  value?: MediaTypeValue;
}) {
  const [type, setType] = useState<MediaTypeValue["type"]>(value?.type ?? "video");
  // Only pre-fill media when the chosen type matches what was saved.
  const saved = value && value.type === type ? value : undefined;

  return (
    <div className="admin-item-card">
      <div className="admin-item-card-fields">
        <strong>{title}</strong>
        <select name={`type-${id}`} value={type} onChange={(e) => setType(e.target.value as MediaTypeValue["type"])}>
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
      </div>
      <MediaSlot
        key={`src-${type}`}
        name={`src-${id}`}
        categorySlug={uploadFolder}
        defaultValue={saved?.src}
        kind={type}
        label={type === "video" ? "Video" : "Image"}
      />
      {type === "video" && (
        <MediaSlot
          name={`poster-${id}`}
          categorySlug={uploadFolder}
          defaultValue={saved?.poster}
          kind="image"
          label="Poster image (optional, shown while video loads)"
        />
      )}
    </div>
  );
}
