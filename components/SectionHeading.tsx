import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  light?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = false,
  className,
  titleClassName,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 md:mb-12", centered && "text-center mx-auto max-w-3xl", className)}>
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3",
            light
              ? "bg-teal-900/40 text-teal-200 border border-teal-700/50"
              : "bg-teal-50 text-teal-800 border border-teal-200/60"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          {badge}
        </div>
      )}
      <h2
        className={cn(
          "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
          light ? "text-white" : "text-navy-950",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base sm:text-lg leading-relaxed",
            light ? "text-slate-300" : "text-surface-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
