import Link from 'next/link';
import { fetchCategories } from '@/actions/category.actions';
import { Button } from '@/components/ui/Button';
import { Plus, Folder } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { columns } from '@/components/dashboard/categories/columns';

export const metadata = {
  title: 'Categories | Devireen Enterprise',
};

export default async function CategoriesPage() {
  const result = await fetchCategories();
  const categories = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500">Manage product categories and hierarchy.</p>
        </div>
        <Link href="/dashboard/categories/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>

      {categories && categories.length > 0 ? (
        <DataTable columns={columns} data={categories} searchKey="name" searchPlaceholder="Search categories..." />
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No categories available</h3>
          <p className="text-gray-500 mb-6">Create a category to organize your products.</p>
          <Link href="/dashboard/categories/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Category
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
