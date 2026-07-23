import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface IndustryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description?: string;
  imageUrl?: string;
  gradientClass?: string;
}

export function IndustryCard({
  name,
  description,
  imageUrl,
  gradientClass = "from-gray-700 to-gray-900",
  className,
  ...props
}: IndustryCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] min-h-[200px]",
        !imageUrl && `bg-gradient-to-br ${gradientClass}`,
        className
      )}
      {...props}
    >
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover img-zoom"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/85" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <h3 className="text-white text-lg font-bold">{name}</h3>
        {description && (
          <p className="text-white/75 text-sm mt-1 line-clamp-2">{description}</p>
        )}
        <div className="flex items-center gap-1 text-white/80 text-sm mt-2 transition-transform duration-300 group-hover:translate-x-1">
          <span>Learn more</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
