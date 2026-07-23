import Link from 'next/link';
import { fetchProductsForAdmin } from '@/actions/product.actions';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { columns } from '@/components/dashboard/products/columns';

export const metadata = {
  title: 'Products | Devireen Enterprise',
};

export default async function ProductsPage() {
  // Since DataTable handles client-side filtering and pagination, we'll fetch all or a large chunk for now.
  // In a real enterprise app with 1000s of products, we'd implement server-side pagination in DataTable.
  // But for this phase, we'll fetch all.
  const result = await fetchProductsForAdmin({ query: '', page: 1, pageSize: 1000 });
  const products = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your product catalog.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={products || []} searchKey="name" searchPlaceholder="Search products by name..." />
    </div>
  );
}
