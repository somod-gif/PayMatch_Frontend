"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  blur?: boolean;
  onClick?: () => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = true, blur = false, onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "bg-white rounded-2xl p-6 md:p-8",
          blur && "backdrop-blur-xl bg-white/80",
          hover && "hover:shadow-xl hover:shadow-teal-700/10 transition-shadow",
          onClick && "cursor-pointer",
          "shadow-lg shadow-slate-200/50",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
