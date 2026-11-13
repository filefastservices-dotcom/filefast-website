const ALLOWED_FIELDS = new Set([
  "clientName", "clientRole", "serviceUsed", "rating", "quote",
  "photoUrl", "isPublished", "source", "sourceUrl", "publicationConsent"
]);

function validHttpsUrl(value) {
  if (!value) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function validateTestimonialPayload(body, { partial = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "A valid testimonial object is required" };
  }
  const unknown = Object.keys(body).filter((key) => !ALLOWED_FIELDS.has(key));
  if (unknown.length) return { error: "Unexpected testimonial field" };

  const payload = {};
  for (const [key, value] of Object.entries(body)) payload[key] = value;

  for (const key of ["clientName", "clientRole", "serviceUsed", "quote", "photoUrl", "source", "sourceUrl"]) {
    if (key in payload && typeof payload[key] !== "string") {
      return { error: key + " must be text" };
    }
  }
  if ("clientName" in payload) {
    payload.clientName = payload.clientName.trim();
    if (!payload.clientName || payload.clientName.length > 120) return { error: "Client name is required and must be 120 characters or fewer" };
  }
  if ("clientRole" in payload && payload.clientRole.length > 120) return { error: "Client role must be 120 characters or fewer" };
  if ("serviceUsed" in payload && payload.serviceUsed.length > 160) return { error: "Service name must be 160 characters or fewer" };
  if ("quote" in payload) {
    payload.quote = payload.quote.trim();
    if (!payload.quote || payload.quote.length > 3000) return { error: "Testimonial text is required and must be 3,000 characters or fewer" };
  }
  if ("rating" in payload && (!Number.isInteger(payload.rating) || payload.rating < 1 || payload.rating > 5)) {
    return { error: "Rating must be a whole number from 1 to 5" };
  }
  if ("isPublished" in payload && typeof payload.isPublished !== "boolean") return { error: "isPublished must be true or false" };
  if ("publicationConsent" in payload && typeof payload.publicationConsent !== "boolean") return { error: "Publication consent must be true or false" };
  if ("source" in payload && !["Client feedback", "Google Maps"].includes(payload.source)) {
    return { error: "Choose Client feedback or Google Maps as the source" };
  }
  if ("photoUrl" in payload && !validHttpsUrl(payload.photoUrl)) return { error: "Photo URL must use HTTPS" };
  if ("sourceUrl" in payload && !validHttpsUrl(payload.sourceUrl)) return { error: "Source URL must use HTTPS" };
  if (payload.source === "Google Maps" && (!payload.sourceUrl || !/google\.[a-z.]+/i.test(new URL(payload.sourceUrl).hostname))) {
    return { error: "Add the original Google Maps listing or review URL for Google-sourced feedback" };
  }

  const isCreating = !partial;
  const isChangingPublicCopy = ["clientName", "quote", "source", "sourceUrl"].some((key) => key in payload);
  if ((isCreating || isChangingPublicCopy) && payload.publicationConsent !== true) {
    return { error: "Confirm that the client has authorised publication of this feedback" };
  }
  return { payload };
}
