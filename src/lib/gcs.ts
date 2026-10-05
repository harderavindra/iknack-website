import { Storage } from "@google-cloud/storage";

let storage: Storage | undefined;

function getStorage(): Storage {
  if (!storage) {
    const privateKey = process.env.GCLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n");
    storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: privateKey,
      },
    });
  }
  return storage;
}

export function getBucket() {
  const bucketName = process.env.GCLOUD_BUCKET_NAME;
  if (!bucketName) throw new Error("Missing GCLOUD_BUCKET_NAME environment variable");
  return getStorage().bucket(bucketName);
}

// The bucket is shared with another project and uses locked uniform
// bucket-level access, so objects can't be made publicly readable (directly
// or scoped to our prefix — GCS rejects IAM Conditions on allUsers grants).
// Media is served through our own /api/media proxy instead, which streams
// the object using our service account and only ever serves the iknack/
// prefix — the stored URL is a same-origin relative path, not a raw GCS URL.
export function publicUrlFor(objectPath: string): string {
  return `/api/media/${objectPath}`;
}

const MEDIA_PROXY_PREFIX = "/api/media/";

function gcsObjectPathFromUrl(url: string): string | null {
  if (!url.startsWith(MEDIA_PROXY_PREFIX)) return null;
  return url.slice(MEDIA_PROXY_PREFIX.length);
}

export async function deleteGcsObjectByUrl(url: string): Promise<void> {
  const objectPath = gcsObjectPathFromUrl(url);
  if (!objectPath) return;
  try {
    await getBucket().file(objectPath).delete({ ignoreNotFound: true });
  } catch (err) {
    console.error("Failed to delete GCS object", objectPath, err);
  }
}
