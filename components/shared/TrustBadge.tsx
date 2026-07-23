import * as React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface TrustBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  variant?: "default" | "outline" | "subtle";
}

export function TrustBadge({
  icon,
  label,
  variant = "default",
  className,
  ...props
}: TrustBadgeProps) {
  const variants = {
    default: "bg-primary-50 text-primary-700 border-primary-100",
    outline: "bg-transparent text-text-muted border-border-subtle",
    subtle: "bg-background text-text-body border-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon || <ShieldCheck className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </div>
  );
}
