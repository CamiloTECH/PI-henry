import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/profile", "/cart"];
const GUEST_ROUTES = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");
  const url = req.nextUrl.clone();

  if (!token) {
    if (AUTH_ROUTES.includes(url.pathname)) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    if (GUEST_ROUTES.includes(url.pathname)) {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/cart", "/login", "/signup"],
};
