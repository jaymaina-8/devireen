import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex flex-col justify-center">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-6 w-48 mb-6" />
          <Skeleton className="h-12 w-32 mb-6" />
          <Skeleton className="h-32 w-full mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-full flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
