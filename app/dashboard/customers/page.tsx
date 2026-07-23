import { createClient } from '@/lib/supabase/server';
import { DataTable } from '@/components/ui/DataTable';
import { columns } from '@/components/dashboard/customers/columns';

export const metadata = {
  title: 'Customers | Devireen Enterprise',
};

async function getCustomers() {
  const supabase = await createClient();
  const { data, count } = await supabase
    .from('customers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  return { data: data || [], count: count || 0 };
}

export default async function CustomersPage() {
  const { data: customers } = await getCustomers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500">View customer information and quote history.</p>
        </div>
      </div>

      <DataTable columns={columns} data={customers} searchKey="company_name" searchPlaceholder="Search customers by company name..." />
    </div>
  );
}
