import { NextResponse } from "next/server";

/**
 * Lightweight check for Vercel env setup (no secrets leaked).
 * Open /api/health/auth after deploy — ok must be true for login to work.
 */
export async function GET() {
  const secret =
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim();
  const authUrl =
    process.env.AUTH_URL?.trim() || process.env.NEXTAUTH_URL?.trim() || null;

  const ok = Boolean(secret);

  return NextResponse.json(
    {
      ok,
      authSecretConfigured: ok,
      authUrlConfigured: Boolean(authUrl),
      authUrlHost: authUrl
        ? (() => {
            try {
              return new URL(authUrl).host;
            } catch {
              return "invalid";
            }
          })()
        : null,
      hint: ok
        ? "Auth secret is present. If login still fails, Redeploy and confirm AUTH_URL matches this host."
        : "Set AUTH_SECRET in Vercel → Settings → Environment Variables, then Redeploy.",
    },
    { status: ok ? 200 : 503 },
  );
}
