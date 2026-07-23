import { fetchCategories } from '@/actions/category.actions';
import { ProductForm } from '@/components/dashboard/products/ProductForm';

export const metadata = {
  title: 'Add Product | Devireen CMS',
};

export default async function AddProductPage() {
  const result = await fetchCategories();
  const categories = result.success ? result.data : [];
  // For now we skip brands if they don't exist yet
  const brands: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500">Create a new product in the catalog.</p>
      </div>

      <ProductForm categories={categories || []} brands={brands || []} />
    </div>
  );
}
