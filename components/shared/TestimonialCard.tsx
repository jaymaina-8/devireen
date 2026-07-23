import * as React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating?: number;
  avatarInitials?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  rating = 5,
  avatarInitials,
  className,
  ...props
}: TestimonialCardProps) {
  const initials = avatarInitials || name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border-l-4 border-l-primary-600 border border-border-subtle bg-surface p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {/* Rating Stars */}
      <div className="flex items-center gap-0.5 mb-4" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating ? "fill-warning text-warning" : "fill-border-subtle text-border-subtle"
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-text-body text-sm md:text-base leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border-subtle">
        <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-main truncate">{name}</div>
          <div className="text-xs text-text-muted truncate">{role}, {company}</div>
        </div>
      </div>
    </div>
  );
}
