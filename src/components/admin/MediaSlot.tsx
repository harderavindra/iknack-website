"use client";

import { useRef, useState } from "react";

export default function MediaSlot({
  name,
  categorySlug,
  defaultValue,
  kind,
  label,
  required,
}: {
  name: string;
  categorySlug: string;
  defaultValue?: string;
  kind: "image" | "video";
  label: string;
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const urlRes = await fetch("/api/admin/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type, categorySlug }),
      });
      if (!urlRes.ok) throw new Error("Could not get an upload URL");
      const { uploadUrl, publicUrl } = await urlRes.json();

      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error("Upload to storage failed");

      setValue(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="admin-media-slot">
      <span className="admin-media-slot-label">{label}</span>
      <input type="hidden" name={name} value={value} required={required} />

      {value ? (
        <div className="admin-media-slot-preview">
          {kind === "video" ? (
            <video src={value} controls />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" />
          )}
          <button type="button" className="admin-media-slot-delete" aria-label={`Remove ${label}`} onClick={() => setValue("")}>
            ×
          </button>
        </div>
      ) : (
        <div className="admin-media-slot-upload">
          <input ref={fileInputRef} type="file" accept={kind === "video" ? "video/*" : "image/*"} onChange={handleFileChange} disabled={uploading} />
          {uploading && <span className="admin-upload-status">Uploading…</span>}
          {error && <span className="admin-login-error">{error}</span>}
        </div>
      )}
    </div>
  );
}
