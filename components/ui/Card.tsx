"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  blur?: boolean;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = true, glow = false, blur = false, onClick, padding = "md" }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100",
          paddingStyles[padding],
          blur && "backdrop-blur-xl bg-white/80",
          glow && "card-glow",
          hover && "transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5",
          onClick && "cursor-pointer",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";