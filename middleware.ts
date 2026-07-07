import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/dashboard/customers",
  "/dashboard/invoices",
  "/dashboard/payments",
  "/dashboard/webhooks",
  "/dashboard/settings",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Get the x-user-id from cookies
  const userId = request.cookies.get("x-user-id")?.value;

  // If accessing a protected route without a userId, redirect to login
  if (isProtectedRoute && !userId) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing auth routes with a userId, redirect to dashboard
  if ((pathname.startsWith("/auth") || pathname === "/") && userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};