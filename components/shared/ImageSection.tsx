import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  overlay?: "dark" | "dark-strong" | "gradient" | "none";
  height?: "sm" | "md" | "lg" | "xl" | "full";
  position?: string;
}

const overlayMap = {
  dark: "bg-dark-overlay",
  "dark-strong": "bg-dark-overlay-strong",
  gradient: "bg-card-gradient",
  none: "",
};

const heightMap = {
  sm: "min-h-[280px]",
  md: "min-h-[400px]",
  lg: "min-h-[500px]",
  xl: "min-h-[600px]",
  full: "min-h-screen",
};

export function ImageSection({
  src,
  alt,
  overlay = "dark",
  height = "md",
  position = "center",
  className,
  children,
  ...props
}: ImageSectionProps) {
  return (
    <div className={cn("relative overflow-hidden", heightMap[height], className)} {...props}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ objectPosition: position }}
        sizes="100vw"
        priority={false}
      />
      {overlay !== "none" && (
        <div className={cn("absolute inset-0", overlayMap[overlay])} aria-hidden="true" />
      )}
      {children && (
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
}
