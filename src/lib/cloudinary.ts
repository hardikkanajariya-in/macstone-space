import { v2 as cloudinary } from "cloudinary";

const configured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (configured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(configured);
}

export async function uploadImage(
  file: Buffer | string,
  folder = "makstone/properties"
): Promise<{ url: string; publicId: string }> {
  if (!configured) {
    throw new Error("Cloudinary is not configured. Set CLOUDINARY_* environment variables.");
  }

  const result = await cloudinary.uploader.upload(
    typeof file === "string" ? file : `data:image/jpeg;base64,${file.toString("base64")}`,
    { folder, resource_type: "image" }
  );

  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string): Promise<void> {
  if (!configured) return;
  await cloudinary.uploader.destroy(publicId);
}

export function optimizeImageUrl(url: string, width = 1200): string {
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  if (url.includes("unsplash.com")) {
    return url.replace(/w=\d+/, `w=${width}`);
  }
  return url;
}
