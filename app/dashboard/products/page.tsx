import Link from 'next/link';
import { fetchProductsForAdmin } from '@/actions/product.actions';
import { fetchCategories } from '@/actions/category.actions';
import { Button } from '@/components/ui/Button';
import { Plus, Download, Upload, Filter, Package } from 'lucide-react';
import { ProductsClientView } from '@/components/dashboard/products/ProductsClientView';

export const metadata = {
  title: 'Product Catalog | Devireen Enterprise OS',
};

export default async function ProductsPage() {
  const [productsResult, categoriesResult] = await Promise.all([
    fetchProductsForAdmin({ query: '', page: 1, pageSize: 1000 }),
    fetchCategories(),
  ]);

  const products =
    productsResult.success && productsResult.data ? productsResult.data : [];
  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data
      : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <Package className="h-6 w-6 text-blue-600" /> Products Catalog
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Manage, filter, bulk update, and export product inventory.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Link href="/dashboard/products/new">
            <Button className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500">
              <Plus className="mr-1.5 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <ProductsClientView initialProducts={products} categories={categories} />
    </div>
  );
}
