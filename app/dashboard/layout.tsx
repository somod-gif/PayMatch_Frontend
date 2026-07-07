"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/ui/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, Bell, LogOut, User } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-teal-200 border-t-teal-700 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="flex items-center gap-2 md:hidden">
              <div className="w-7 h-7 relative">
                <Image
                  src="/images/logo.png"
                  alt="PayMatch"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-teal-700">PayMatch</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-600 rounded-full ring-2 ring-white" />
            </button>
            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="hidden sm:flex flex-col items-end">
                  <p className="text-sm font-medium text-slate-900">{user.businessName}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                  {user.businessName?.charAt(0) || "U"}
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}