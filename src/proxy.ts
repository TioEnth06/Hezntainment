import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { canAccessPath, homePathForRole, isAdmin } from "@/lib/rbac";

const LEGACY_PREFIXES = ["/admin", "/work", "/app"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMna = pathname.startsWith("/mna");
  const isLegacy = LEGACY_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const isProtected =
    isMna || isLegacy || pathname.startsWith("/onboarding");
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const session = await auth();

  if (isProtected && !session?.user) {
    const url = new URL("/login", request.url);
    url.searchParams.set(
      "callbackUrl",
      isMna ? pathname : "/mna/dashboard",
    );
    return NextResponse.redirect(url);
  }

  if (isAuthPage && session?.user) {
    return NextResponse.redirect(
      new URL(homePathForRole(session.user.role), request.url),
    );
  }

  if (isLegacy) {
    return NextResponse.redirect(new URL("/mna/dashboard", request.url));
  }

  if (isMna && session?.user) {
    const role = session.user.role;

    if (
      (pathname.startsWith("/mna/administrasi/tim") ||
        pathname.startsWith("/mna/administrasi/inventaris")) &&
      !isAdmin(role)
    ) {
      return NextResponse.redirect(new URL("/mna/dashboard", request.url));
    }

    if (!canAccessPath(role, pathname)) {
      return NextResponse.redirect(new URL("/mna/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mna",
    "/mna/:path*",
    "/admin",
    "/admin/:path*",
    "/work",
    "/work/:path*",
    "/app",
    "/app/:path*",
    "/onboarding",
    "/login",
    "/register",
  ],
};
