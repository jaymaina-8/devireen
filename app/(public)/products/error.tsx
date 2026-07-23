'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { PackageX } from 'lucide-react';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4 border border-border-subtle rounded-xl bg-surface m-8">
      <div className="bg-error-50 p-4 rounded-full mb-6">
        <PackageX className="h-10 w-10 text-error-500" />
      </div>
      <h2 className="text-2xl font-bold text-text-main mb-3">Unable to load catalog</h2>
      <p className="text-text-muted max-w-md mb-6">
        We couldn't retrieve the product catalog at this time. Please check your connection or try again.
      </p>
      <Button onClick={() => reset()} variant="primary">
        Refresh Catalog
      </Button>
    </div>
  );
}
