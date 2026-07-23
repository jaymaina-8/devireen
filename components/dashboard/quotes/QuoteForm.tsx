'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { useToastStore } from '@/lib/store/toast-store';
import { Plus, Trash2 } from 'lucide-react';
import { createQuoteAction, updateQuoteAction } from '@/actions/quote.actions';

export function QuoteForm({ initialData, customers = [], products = [] }: { initialData?: any, customers?: any[], products?: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState<any[]>(initialData?.items || [{ product_id: '', quantity: 1, unit_price: 0 }]);
  const router = useRouter();
  const { addToast } = useToastStore();

  const isEditing = !!initialData;

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    const newItems = [...items];
    newItems[index].product_id = productId;
    newItems[index].unit_price = product ? product.price : 0;
    setItems(newItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...items];
    newItems[index].quantity = quantity;
    setItems(newItems);
  };

  const handlePriceChange = (index: number, price: number) => {
    const newItems = [...items];
    newItems[index].unit_price = price;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { product_id: '', quantity: 1, unit_price: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.unit_price), 0);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      customer_id: formData.get('customer_id') as string,
      status: formData.get('status') as string,
      notes: formData.get('notes') as string,
      items: items.filter(i => i.product_id !== ''),
    };

    if (payload.items.length === 0) {
      addToast({ title: 'Error', description: 'Please add at least one product.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditing) {
        await updateQuoteAction(initialData.id, payload);
        addToast({ title: 'Success', description: 'Quote updated', variant: 'success' });
      } else {
        await createQuoteAction(payload);
        addToast({ title: 'Success', description: 'Quote created', variant: 'success' });
      }
      router.push('/dashboard/quotes');
      router.refresh();
    } catch (error: any) {
      addToast({ title: 'Error', description: error.message || 'Operation failed', variant: 'destructive' });
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
      {/* Left Column: Line Items */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-900">Products & Services</h2>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" /> Add Line
            </Button>
          </div>

          <div className="p-6 space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 items-end p-4 border border-gray-100 rounded-lg bg-gray-50/30">
                <div className="flex-1">
                  <Label className="text-xs text-gray-500 mb-1">Product</Label>
                  <Select 
                    value={item.product_id} 
                    onChange={(e) => handleProductChange(index, e.target.value)}
                    required
                  >
                    <option value="">Select Product...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} (SKU: {p.sku})</option>
                    ))}
                  </Select>
                </div>
                <div className="w-28">
                  <Label className="text-xs text-gray-500 mb-1">Unit Price</Label>
                  <input 
                    type="number" 
                    min="0"
                    step="0.01"
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={item.unit_price}
                    onChange={(e) => handlePriceChange(index, parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
                <div className="w-20">
                  <Label className="text-xs text-gray-500 mb-1">Qty</Label>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
                <div className="w-28 text-right pb-2 font-medium text-gray-900">
                  {(item.quantity * item.unit_price).toLocaleString()}
                </div>
                <Button type="button" variant="ghost" size="icon" className="mb-1 text-gray-400 hover:text-red-600 hover:bg-red-50" onClick={() => removeItem(index)} disabled={items.length === 1}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end">
            <div className="text-right">
              <span className="text-sm text-gray-500 mr-4">Total Amount:</span>
              <span className="text-2xl font-bold text-gray-900">KSh {calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Details & Actions */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-900 border-b pb-3">Quote Details</h2>
          
          <div>
            <Label htmlFor="customer_id" className="text-gray-600">Customer *</Label>
            <Select id="customer_id" name="customer_id" defaultValue={initialData?.customer_id || ''} required className="mt-1">
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.company_name} ({c.contact_email})</option>
              ))}
            </Select>
            <div className="mt-2 text-right">
              <span className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">+ Add New Customer</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="status" className="text-gray-600">Status</Label>
            <Select id="status" name="status" defaultValue={initialData?.status || 'PENDING'} className="mt-1">
              <option value="DRAFT">Draft</option>
              <option value="PENDING">Pending (New)</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="APPROVED">Approved (Quoted)</option>
              <option value="REJECTED">Rejected</option>
              <option value="FULFILLED">Fulfilled (Converted to Order)</option>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes" className="text-gray-600">Internal Notes</Label>
            <textarea 
              id="notes" 
              name="notes" 
              placeholder="Visible only to staff..."
              className="w-full border border-gray-300 rounded-md p-3 min-h-[120px] text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              defaultValue={initialData?.notes || ''}
            />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
          <Button type="submit" size="lg" className="w-full shadow-sm" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Quote'}
          </Button>
          <Button type="button" variant="outline" size="lg" className="w-full bg-white" onClick={() => router.push('/dashboard/quotes')}>
            Discard Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
