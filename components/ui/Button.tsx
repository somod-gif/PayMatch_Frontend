"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const variantStyles = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30 hover:shadow-xl disabled:bg-teal-700/50 disabled:cursor-not-allowed disabled:shadow-none",
  secondary:
    "bg-teal-100 text-teal-700 hover:bg-teal-200 active:bg-teal-300 disabled:bg-teal-100/50 disabled:cursor-not-allowed",
  outline:
    "border border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-teal-300 active:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "text-slate-600 hover:text-teal-700 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-lg shadow-red-700/20 disabled:bg-red-600/50 disabled:cursor-not-allowed",
};

const sizeStyles = {
  sm: "px-3.5 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-base rounded-xl gap-2",
  lg: "px-7 py-3 text-lg rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", className, icon, loading, disabled, ...props }, ref) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
          "active:scale-[0.98]",
          variantStyle,
          sizeStyle,
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";