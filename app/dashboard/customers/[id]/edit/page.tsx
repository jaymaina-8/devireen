import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CustomerForm } from '@/components/dashboard/customers/CustomerForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Edit Customer | Devireen Enterprise',
};

async function getCustomer(id: string) {
  const supabase = await createClient();
  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();

  return customer;
}

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = await getCustomer(params.id);
  
  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/dashboard/customers/${customer.id}`}>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Customer</h1>
          <p className="text-gray-500">Update customer information.</p>
        </div>
      </div>

      <CustomerForm initialData={customer} />
    </div>
  );
}
