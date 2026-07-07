"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className || ""}`}
    >
      {icon && (
        <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      {description && (
        <p className="text-slate-500 max-w-md mb-8 leading-relaxed">{description}</p>
      )}
      <div className="flex gap-3">
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="primary">
            {actionLabel}
          </Button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <Button onClick={onSecondaryAction} variant="outline">
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
}