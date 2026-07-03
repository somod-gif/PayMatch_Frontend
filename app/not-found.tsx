import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | PayMatch",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-6 px-4">
        <div className="text-8xl font-bold text-teal-700">404</div>
        <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Sorry, we could not find the page you are looking for. It might
          have been moved or not exist.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}