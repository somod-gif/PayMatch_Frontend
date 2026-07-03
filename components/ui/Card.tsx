"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  blur?: boolean;
}

export function Card({
  children,
  className,
  hover = true,
  blur = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 md:p-8",
        blur && "backdrop-blur-xl bg-white/80",
        hover && "hover:shadow-xl hover:shadow-teal-700/10 transition-shadow",
        "shadow-lg shadow-slate-200/50",
        className
      )}
    >
      {children}
    </div>
  );
}
