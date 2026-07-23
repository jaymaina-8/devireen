import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  count?: number;
  imageUrl?: string;
  onClick?: () => void;
}

export function CategoryCard({ name, count, imageUrl, onClick, className, ...props }: CategoryCardProps) {
  if (imageUrl) {
    return (
      <div
        onClick={onClick}
        className={cn(
          "group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] min-h-[160px]",
          className
        )}
        {...props}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/80" />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-base">{name}</h3>
          {count !== undefined && (
            <p className="text-white/70 text-xs mt-0.5">{count} Products</p>
          )}
          <div className="flex items-center gap-1 text-white/70 text-xs mt-1.5 transition-transform duration-300 group-hover:translate-x-1">
            <span>Shop now</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    );
  }

  // Fallback: no image variant
  return (
    <div
      onClick={onClick}
      className={cn("group flex cursor-pointer items-center justify-between rounded-xl border border-border-subtle bg-surface p-4 transition-all duration-300 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5", className)}
      {...props}
    >
      <div>
        <h3 className="font-medium text-text-main group-hover:text-primary-600 transition-colors">{name}</h3>
        {count !== undefined && <p className="text-xs text-text-muted mt-0.5">{count} Products</p>}
      </div>
      <ArrowRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
    </div>
  );
}
