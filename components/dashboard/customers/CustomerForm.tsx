'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToastStore } from '@/lib/store/toast-store';
import { updateCustomerAction } from '@/actions/customer.actions';

export function CustomerForm({ initialData }: { initialData: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { addToast } = useToastStore();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      company_name: formData.get('company_name'),
      contact_email: formData.get('contact_email'),
      contact_phone: formData.get('contact_phone'),
      kra_pin: formData.get('kra_pin'),
      type: formData.get('type'),
    };

    try {
      const result = await updateCustomerAction(initialData.id, payload);
      if (result.success) {
        addToast({ title: 'Success', description: 'Customer updated successfully', variant: 'success' });
        router.push(`/dashboard/customers/${initialData.id}`);
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      addToast({ title: 'Error', description: error.message || 'Operation failed', variant: 'destructive' });
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company_name">Company / Name *</Label>
          <Input 
            id="company_name" 
            name="company_name" 
            defaultValue={initialData?.company_name || ''} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Customer Type *</Label>
          <Select id="type" name="type" defaultValue={initialData?.type || 'BUSINESS'} required>
            <option value="RETAIL">Retail</option>
            <option value="BUSINESS">Business (B2B)</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_email">Email Address</Label>
          <Input 
            id="contact_email" 
            name="contact_email" 
            type="email"
            defaultValue={initialData?.contact_email || ''} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Phone Number</Label>
          <Input 
            id="contact_phone" 
            name="contact_phone" 
            defaultValue={initialData?.contact_phone || ''} 
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="kra_pin">KRA PIN</Label>
          <Input 
            id="kra_pin" 
            name="kra_pin" 
            defaultValue={initialData?.kra_pin || ''} 
          />
          <p className="text-xs text-gray-500">Required for B2B tax compliance.</p>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(`/dashboard/customers/${initialData.id}`)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
