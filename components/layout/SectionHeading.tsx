import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ title, subtitle, action, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end", className)} {...props}>
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-text-main">{title}</h2>
        {subtitle && (
          <p className="text-base text-text-muted">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
