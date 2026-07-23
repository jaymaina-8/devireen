import { CategoryForm } from '@/components/dashboard/categories/CategoryForm';
import { fetchCategoryById } from '@/actions/category.actions';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Category | Devireen Enterprise',
};

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const result = await fetchCategoryById(resolvedParams.id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CategoryForm initialData={result.data} />
    </div>
  );
}
