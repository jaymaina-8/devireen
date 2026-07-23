import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-32 mb-4" />
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </aside>
      
      <main className="flex-1">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-80 w-full rounded-lg" />
          ))}
        </div>
      </main>
    </div>
  );
}
