"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt: string;
  fallbackIcon?: React.ReactNode;
}

export function ProductImage({ src, alt, className, fallbackIcon, ...props }: ProductImageProps) {
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  if (!src || error) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-primary-50 text-primary-300 rounded-md", className)}>
        {fallbackIcon || (
          <>
            <ImageIcon className="h-10 w-10 mb-2" />
            <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
          </>
        )}
        <span className="sr-only">No image available for {alt}</span>
      </div>
    );
  }

  const { width, height, ...restProps } = props;
  const isFill = !width || !height;

  return (
    <div suppressHydrationWarning={true} className={cn("relative overflow-hidden bg-background", className)}>
      <Image
        src={src}
        alt={alt}
        fill={isFill}
        width={!isFill ? width : undefined}
        height={!isFill ? height : undefined}
        sizes={isFill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
        className={cn(
          "object-contain transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        {...restProps}
      />
    </div>
  );
}
