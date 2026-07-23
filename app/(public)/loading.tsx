import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <Skeleton className="h-16 w-3/4 max-w-4xl mb-6" />
          <Skeleton className="h-6 w-2/3 max-w-2xl mb-10" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
