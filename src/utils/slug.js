// Derives a URL-safe post slug from a title (also used as the Appwrite document ID).
export function createSlug(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s\W]+/g, "-")
    .substring(0, 12);
}
