import { NextResponse } from "next/server";
import { authSecretConfigured, normalizeAuthEnv } from "@/lib/auth-env";

/**
 * Lightweight check for Vercel env setup (no secrets leaked).
 * Open /api/health/auth after deploy — ok must be true for login to work.
 */
export async function GET() {
  const urlInfo = normalizeAuthEnv();
  const secretOk = authSecretConfigured();
  const ok = secretOk;

  return NextResponse.json(
    {
      ok,
      authSecretConfigured: secretOk,
      authUrlConfigured: Boolean(urlInfo.host) || urlInfo.ok === false,
      authUrlHost: urlInfo.host,
      authUrlFixed: urlInfo.fixed,
      authUrlWasInvalid: urlInfo.ok === false,
      ...(urlInfo.ok === false && "rawPreview" in urlInfo
        ? { authUrlRawPreview: urlInfo.rawPreview }
        : {}),
      expectedAuthUrl: "https://hezntainment-dpak.vercel.app",
      hint: !secretOk
        ? "Set AUTH_SECRET in Vercel → Settings → Environment Variables, then Redeploy."
        : urlInfo.ok === false
          ? "AUTH_URL was invalid and was cleared. Set AUTH_URL to https://hezntainment-dpak.vercel.app (with https://), then Redeploy."
          : urlInfo.host && urlInfo.host !== "hezntainment-dpak.vercel.app"
            ? `AUTH_URL host is ${urlInfo.host}. Prefer https://hezntainment-dpak.vercel.app to match this deployment.`
            : "Auth env looks OK. If login still fails, Redeploy once more.",
    },
    { status: ok ? 200 : 503 },
  );
}
