import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("a_session");

  // PROTECT dashboard only
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow login/register
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
