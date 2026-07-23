'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useToastStore } from '@/lib/store/toast-store';
import { deleteCategoryAction, updateCategoryAction } from '@/actions/category.actions';

export function CategoryTableRowActions({ category }: { category: any }) {
  const router = useRouter();
  const { addToast } = useToastStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    setIsProcessing(true);
    try {
      const result = await deleteCategoryAction(category.id);
      if (result.success) {
        addToast({ title: 'Deleted', description: 'Category deleted successfully', variant: 'success' });
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      addToast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTogglePublish = async () => {
    setIsProcessing(true);
    try {
      // Need a way to pass FormData to updateCategoryAction or create a separate update method
      const formData = new FormData();
      formData.set('name', category.name);
      formData.set('slug', category.slug);
      formData.set('description', category.description || '');
      formData.set('is_active', (!category.is_active).toString());
      if (category.parent_id) formData.set('parent_id', category.parent_id);

      // But we will also export a direct data-update action for this
      const result = await updateCategoryAction(category.id, formData, true); // true to skip redirect
      if (result.success) {
        addToast({ 
          title: !category.is_active ? 'Published' : 'Unpublished', 
          description: `Category is now ${!category.is_active ? 'visible' : 'hidden'}`, 
          variant: 'success' 
        });
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      addToast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`h-8 w-8 p-0 ${category.is_active ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
        onClick={handleTogglePublish}
        disabled={isProcessing}
        title={category.is_active ? "Unpublish" : "Publish"}
      >
        {category.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        <span className="sr-only">Toggle Publish</span>
      </Button>

      <Link href={`/dashboard/categories/${category.id}`}>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
          <Edit className="w-4 h-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </Link>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={handleDelete}
        disabled={isProcessing}
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}
