'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product Details Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <div className="bg-error-50 p-6 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-error-500" />
      </div>
      <h2 className="text-3xl font-bold text-text-main mb-4">Product Not Available</h2>
      <p className="text-text-muted max-w-md mb-8">
        We encountered an issue loading this product's details. It may no longer exist or our systems are currently updating.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="primary">
          Try Again
        </Button>
        <Link href="/products">
          <Button variant="outline">Browse Other Products</Button>
        </Link>
      </div>
    </div>
  );
}
