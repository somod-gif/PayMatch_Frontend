"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const variantStyles = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 shadow-lg hover:shadow-teal-700/30 hover:shadow-xl disabled:bg-teal-700/50 disabled:cursor-not-allowed",
  secondary:
    "bg-teal-100 text-teal-700 hover:bg-teal-200 active:bg-teal-300 disabled:bg-teal-100/50 disabled:cursor-not-allowed",
  outline:
    "border border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-teal-700 active:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "text-slate-600 hover:text-teal-700 hover:bg-slate-100 active:bg-slate-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", className, icon, disabled, ...props }, ref) => {
    const variantStyle = variantStyles[variant as keyof typeof variantStyles];
    const sizeStyle = sizeStyles[size as keyof typeof sizeStyles];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700",
          variantStyle,
          sizeStyle,
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
