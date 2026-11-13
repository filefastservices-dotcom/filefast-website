const MAX_CONTENT_LENGTH = 100_000;

const FIELD_LIMITS = {
  title: 120,
  slug: 160,
  category: 80,
  excerpt: 150,
  content: MAX_CONTENT_LENGTH,
  featuredImageUrl: 2048,
  metaTitle: 60,
  metaDescription: 160
};

const ALLOWED_FIELDS = new Set([...Object.keys(FIELD_LIMITS), "isPublished"]);

export function validateBlogPayload(input, { partial = false } = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "A valid blog object is required" };
  }

  if (Object.keys(input).some((key) => !ALLOWED_FIELDS.has(key))) {
    return { error: "The request contains unsupported fields" };
  }

  const payload = {};
  for (const [field, maxLength] of Object.entries(FIELD_LIMITS)) {
    if (!(field in input)) {
      if (!partial && ["title", "slug", "content"].includes(field)) {
        return { error: `${field} is required` };
      }
      continue;
    }
    if (typeof input[field] !== "string") return { error: `${field} must be text` };

    const value = input[field].trim();
    if (value.length > maxLength) {
      return { error: `${field} exceeds the ${maxLength}-character limit` };
    }
    if (!partial && ["title", "slug", "content"].includes(field) && value.length === 0) {
      return { error: `${field} cannot be empty` };
    }
    payload[field] = value;
  }

  if (partial && Object.keys(payload).length === 0 && !("isPublished" in input)) {
    return { error: "At least one supported field is required" };
  }

  if (payload.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
    return { error: "Slug must contain lowercase letters, numbers and single hyphens only" };
  }

  if (payload.featuredImageUrl) {
    try {
      const parsed = new URL(payload.featuredImageUrl);
      if (parsed.protocol !== "https:") return { error: "Featured image URL must use HTTPS" };
    } catch {
      if (!payload.featuredImageUrl.startsWith("/") || payload.featuredImageUrl.startsWith("//")) {
        return { error: "Featured image must be an HTTPS URL or a site-relative path" };
      }
    }
  }

  if ("isPublished" in input) {
    if (typeof input.isPublished !== "boolean") return { error: "isPublished must be true or false" };
    payload.isPublished = input.isPublished;
  }

  if (!partial && !("isPublished" in payload)) payload.isPublished = false;
  return { payload };
}
