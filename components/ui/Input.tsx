"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent",
            "disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
            "transition-all duration-200",
            error
              ? "border-red-300 focus:ring-red-500"
              : "border-slate-200 hover:border-slate-300",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";