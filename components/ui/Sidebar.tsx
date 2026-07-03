"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV, APP_NAME } from "@/constants";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Webhook,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Webhook,
  Settings,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/logo.png"
                alt={APP_NAME}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg text-teal-700">{APP_NAME}</span>
          </Link>
          <button
            className="md:hidden p-1 text-slate-500 hover:text-slate-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {DASHBOARD_NAV.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            &copy; 2026 {APP_NAME}. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}