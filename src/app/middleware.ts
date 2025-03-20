import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth")?.value; // Check if auth cookie exists

  if (!auth && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url)); // Redirect to SignIn
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware for all /admin pages
};
