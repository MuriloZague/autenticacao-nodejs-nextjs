import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register", "/"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default proxy;