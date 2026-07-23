import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-primary-50 p-6 rounded-full mb-6">
        <Search className="h-12 w-12 text-primary-500" />
      </div>
      <h1 className="text-4xl font-bold text-text-main mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-text-muted max-w-md mb-8">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="primary">Return to Homepage</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}
