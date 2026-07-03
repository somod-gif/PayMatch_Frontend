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
    text: "rounded",
    circular: "rounded-full",
    rounded: "rounded-lg",
    rectangular: "rounded-none",
  };

  const style = {
    width: width ?? "100%",
    height: height ?? "1rem",
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "bg-slate-200 animate-pulse",
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
        "bg-slate-200 animate-pulse",
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
        "bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50",
        className
      )}
    >
      <div className="space-y-4">
        <LoadingSkeleton height="1.5rem" width="60%" />
        <LoadingSkeleton height="1rem" />
        <LoadingSkeleton height="1rem" width="80%" />
        <LoadingSkeleton height="1rem" width="40%" />
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