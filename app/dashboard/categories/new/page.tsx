import { CategoryForm } from '@/components/dashboard/categories/CategoryForm';

export const metadata = {
  title: 'Add Category | Devireen Enterprise',
};

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <CategoryForm />
    </div>
  );
}
