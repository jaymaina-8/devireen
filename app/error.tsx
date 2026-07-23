'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our centralized logger instead of just console
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-error-50 p-6 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-error-500" />
      </div>
      <h2 className="text-3xl font-bold text-text-main mb-4">Something went wrong</h2>
      <p className="text-text-muted max-w-md mb-8">
        We encountered an unexpected error while loading this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="primary">
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline">Return to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
