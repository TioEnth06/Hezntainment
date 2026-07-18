/**
 * Auth.js breaks with HTTP 500 if AUTH_URL / NEXTAUTH_URL is set but not a valid URL
 * (common Vercel mistake: missing https://, extra quotes, trailing junk).
 *
 * Mutates process.env so Auth.js sees a clean value, or clears a broken one
 * (trustHost: true still works without AUTH_URL).
 */
export function normalizeAuthEnv() {
  const raw =
    process.env.AUTH_URL?.trim() || process.env.NEXTAUTH_URL?.trim() || "";
  if (!raw) return { ok: true as const, host: null as string | null, fixed: false };

  let value = raw.replace(/^["']|["']$/g, "").trim();
  if (value && !/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }

  // Drop trailing slash for Auth.js origin consistency
  value = value.replace(/\/+$/, "");

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
    process.env.AUTH_URL = url.origin;
    delete process.env.NEXTAUTH_URL;
    return {
      ok: true as const,
      host: url.host,
      fixed: value !== raw || url.origin !== raw,
    };
  } catch {
    delete process.env.AUTH_URL;
    delete process.env.NEXTAUTH_URL;
    return {
      ok: false as const,
      host: null as string | null,
      fixed: true,
      rawPreview: raw.slice(0, 48),
    };
  }
}

export function authSecretConfigured() {
  return Boolean(
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim(),
  );
}
