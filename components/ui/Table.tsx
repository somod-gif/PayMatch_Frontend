"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full text-sm", className)}>{children}</table>
    </div>
  );
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead>
      <tr className={cn("border-b border-slate-200", className)}>
        {children}
      </tr>
    </thead>
  );
}

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn("divide-y divide-slate-100", className)}>{children}</tbody>;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn(
        "transition-colors",
        onClick && "cursor-pointer hover:bg-slate-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className, header = false }: TableCellProps) {
  const Component = header ? "th" : "td";
  return (
    <Component
      className={cn(
        "px-4 py-3 text-left",
        header
          ? "text-xs font-semibold text-slate-600 uppercase tracking-wider"
          : "text-slate-900",
        className
      )}
    >
      {children}
    </Component>
  );
}