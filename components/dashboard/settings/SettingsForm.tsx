'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useToastStore } from '@/lib/store/toast-store';
import { updateSettingsAction } from '@/actions/settings.actions';
import { Building2, Landmark, Clock } from 'lucide-react';

export function SettingsForm({ settings }: { settings: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { addToast } = useToastStore();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await updateSettingsAction(formData);
      if (result.success) {
        addToast({ title: 'Success', description: 'Settings updated successfully', variant: 'success' });
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      addToast({ title: 'Error', description: error.message || 'Failed to update settings', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-400" /> Company Profile & Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input id="company_name" name="company_name" defaultValue={settings.company_name} required />
            </div>
            <div>
              <Label htmlFor="email">Support / Contact Email</Label>
              <Input id="email" name="email" type="email" defaultValue={settings.email} />
            </div>
            <div>
              <Label htmlFor="phone_numbers">Primary Phone</Label>
              <Input id="phone_numbers" name="phone_numbers" defaultValue={settings.phone_numbers?.[0] || settings.phone_numbers} />
            </div>
            <div>
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input id="whatsapp_number" name="whatsapp_number" defaultValue={settings.whatsapp_number} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="physical_address">Physical Address</Label>
              <Input id="physical_address" name="physical_address" defaultValue={settings.physical_address} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" /> Business Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_hours_weekdays">Weekdays (Mon - Fri)</Label>
              <Input id="business_hours_weekdays" name="business_hours_weekdays" placeholder="e.g. 8:00 AM - 5:00 PM" defaultValue={settings.business_hours_weekdays} />
            </div>
            <div>
              <Label htmlFor="business_hours_weekends">Weekends</Label>
              <Input id="business_hours_weekends" name="business_hours_weekends" placeholder="e.g. 9:00 AM - 1:00 PM (Sat), Closed (Sun)" defaultValue={settings.business_hours_weekends} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
             <Landmark className="w-5 h-5 text-gray-400" /> Tax & VAT Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="kra_pin">Company KRA PIN</Label>
              <Input id="kra_pin" name="kra_pin" placeholder="P000000000A" defaultValue={settings.kra_pin} />
              <p className="text-xs text-gray-500 mt-1">Required for generating official quotes and invoices.</p>
            </div>
            <div>
              <Label htmlFor="vat_rate">Default VAT Rate (%)</Label>
              <Input id="vat_rate" name="vat_rate" type="number" min="0" step="0.1" defaultValue={settings.vat_rate || 16} />
              <p className="text-xs text-gray-500 mt-1">Used to calculate taxes on quotes/orders.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </form>
  );
}
