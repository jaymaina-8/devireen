'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from './ProductImage';

interface GalleryImage {
  id?: string;
  url: string;
  alt_text?: string;
  is_primary?: boolean;
}

interface ProductImageGalleryProps {
  images: GalleryImage[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const primary =
    images.find((i) => i.is_primary)?.url || images[0]?.url || null;
  const [activeUrl, setActiveUrl] = useState<string | null>(primary);

  if (!images.length) {
    return (
      <div className="border-border-subtle bg-surface relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border">
        <ProductImage
          src={null}
          alt={productName}
          className="absolute inset-0 h-full w-full p-8 mix-blend-multiply"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="border-border-subtle bg-surface group relative aspect-square overflow-hidden rounded-2xl border">
        <ProductImage
          src={activeUrl}
          alt={productName}
          className="img-zoom absolute inset-0 h-full w-full p-8 mix-blend-multiply"
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id || i}
              type="button"
              onClick={() => setActiveUrl(img.url)}
              className={`bg-surface relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all focus:outline-none ${
                img.url === activeUrl
                  ? 'border-primary-500 shadow-sm'
                  : 'border-border-subtle hover:border-border-strong'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={`${productName} - Image ${i + 1}`}
                fill
                className="object-contain p-2 mix-blend-multiply"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
