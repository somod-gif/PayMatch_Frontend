"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rounded" | "rectangular";
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function LoadingSkeleton({
  className,
  variant = "text",
  width,
  height,
  count = 1,
}: LoadingSkeletonProps) {
  const variantClasses = {
    text: "rounded-md",
    circular: "rounded-full",
    rounded: "rounded-xl",
    rectangular: "rounded-none",
  };

  const style = {
    width: width ?? "100%",
    height: height ?? "1rem",
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "skeleton-shimmer",
              variantClasses[variant],
              className
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "skeleton-shimmer",
        variantClasses[variant],
        className
      )}
      style={style}
    />
  );
}

// Pre-built skeleton components for common use cases
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100",
        className
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <LoadingSkeleton height="1.5rem" width="40%" />
          <LoadingSkeleton variant="circular" width="2.5rem" height="2.5rem" />
        </div>
        <LoadingSkeleton height="2.5rem" width="60%" />
        <LoadingSkeleton height="1rem" width="80%" />
        <LoadingSkeleton height="1rem" width="50%" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex gap-4 p-4 border-b border-slate-100">
      {Array.from({ length: columns }).map((_, i) => (
        <LoadingSkeleton key={i} height="1rem" className="flex-1" />
      ))}
    </div>
  );
}

export function AvatarSkeleton({ size = 10 }: { size?: number }) {
  return (
    <LoadingSkeleton
      variant="circular"
      width={`${size * 0.25}rem`}
      height={`${size * 0.25}rem`}
    />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <LoadingSkeleton variant="rounded" width="3rem" height="3rem" />
        <LoadingSkeleton variant="rounded" width="1.5rem" height="1.5rem" />
      </div>
      <LoadingSkeleton height="2.5rem" width="5rem" className="mb-2" />
      <LoadingSkeleton height="1rem" width="6rem" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4">
      <LoadingSkeleton height="2.5rem" width="100%" className="mb-6" />
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} columns={columns} />
      ))}
    </div>
  );
}