"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/types";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  error: "bg-red-50 text-red-700 border border-red-200",
  info: "bg-blue-50 text-blue-700 border border-blue-200",
  neutral: "bg-slate-100 text-slate-700",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-slate-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-slate-500",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

export function Badge({ children, variant = "default", size = "sm", className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const variantMap: Record<string, BadgeVariant> = {
    completed: "success",
    paid: "success",
    active: "success",
    pending: "warning",
    partial: "warning",
    overdue: "error",
    cancelled: "error",
    failed: "error",
    refunded: "info",
    inactive: "neutral",
    archived: "neutral",
  };

  const labelMap: Record<string, string> = {
    completed: "Completed",
    paid: "Paid",
    active: "Active",
    pending: "Pending",
    partial: "Partial",
    overdue: "Overdue",
    cancelled: "Cancelled",
    failed: "Failed",
    refunded: "Refunded",
    inactive: "Inactive",
    archived: "Archived",
  };

  return (
    <Badge
      variant={variantMap[status] || "default"}
      dot
    >
      {labelMap[status] || status}
    </Badge>
  );
}