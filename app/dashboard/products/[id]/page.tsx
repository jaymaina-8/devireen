import { fetchProductBySlug } from '@/actions/product.actions';
import { fetchCategories } from '@/actions/category.actions';
import { ProductForm } from '@/components/dashboard/products/ProductForm';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Edit Product | Devireen CMS',
};

async function getProductById(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('products').select('*').eq('id', id).single();
  return data;
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  const result = await fetchCategories();
  const categories = result.success ? result.data : [];
  const brands: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500">Update {product.name}</p>
      </div>

      <ProductForm initialData={product} categories={categories || []} brands={brands || []} />
    </div>
  );
}
