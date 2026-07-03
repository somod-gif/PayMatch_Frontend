import { NextRequest, NextResponse } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/forgot-password", "/about"];

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
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Get the token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing auth routes with a token, redirect to dashboard
  if (pathname.startsWith("/auth") && token) {
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