"use client";

import { cn } from "@/lib/utils";
import { Container } from "./Container";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerSize?: "sm" | "md" | "lg";
  background?: "white" | "light" | "gradient";
}

const backgroundStyles = {
  white: "bg-white",
  light: "bg-slate-50",
  gradient: "bg-gradient-to-b from-white to-slate-50",
};

export function Section({
  children,
  className,
  id,
  containerSize = "lg",
  background = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-32", backgroundStyles[background], className)}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}