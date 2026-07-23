import { createClient } from '@/lib/supabase/server';
import { DataTable } from '@/components/ui/DataTable';
import { columns } from '@/components/dashboard/quotes/columns';

export const metadata = {
  title: 'Quotes | Devireen Enterprise',
};

async function getQuotes() {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from('quotes')
    .select('*, customers(company_name, contact_email, contact_phone, type)', { count: 'exact' })
    .order('created_at', { ascending: false });

  return { data: data || [], count: count || 0 };
}

export default async function QuotesPage() {
  const { data: quotes } = await getQuotes();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-500">Manage customer quote requests and orders.</p>
        </div>
      </div>

      <DataTable columns={columns} data={quotes} searchKey="id" searchPlaceholder="Search by quote ID..." />
    </div>
  );
}
