'use client';

import { useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { CustomerDetailDrawer } from './CustomerDetailDrawer';
import { Button } from '@/components/ui/Button';
import { Eye, Mail, Phone, Building2 } from 'lucide-react';
import { format } from 'date-fns';

export function CustomersClientView({
  initialCustomers,
}: {
  initialCustomers: any[];
}) {
  const [customers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const columns = [
    {
      accessorKey: 'company_name',
      header: 'Company / Client',
      cell: ({ row }: any) => (
        <button
          onClick={() => setSelectedCustomer(row.original)}
          className="text-left font-bold text-slate-900 transition-colors hover:text-blue-600"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0 text-purple-600" />
            <span>{row.original.company_name || 'Individual Customer'}</span>
          </div>
          {row.original.kra_pin && (
            <div className="pl-6 font-mono text-[10px] text-slate-400">
              KRA: {row.original.kra_pin}
            </div>
          )}
        </button>
      ),
    },
    {
      accessorKey: 'contact_email',
      header: 'Contact Info',
      cell: ({ row }: any) => (
        <div className="space-y-0.5 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>{row.original.contact_email || 'No email'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>{row.original.contact_phone || 'No phone'}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Account Type',
      cell: ({ row }: any) => (
        <span className="rounded-md border border-purple-200/60 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 uppercase">
          {row.original.type || 'RETAIL'}
        </span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Joined Date',
      cell: ({ row }: any) =>
        format(new Date(row.original.created_at), 'MMM d, yyyy'),
    },
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <div className="text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedCustomer(row.original)}
            className="h-8 gap-1 rounded-lg border-slate-200 px-2.5 text-xs"
          >
            <Eye className="h-3.5 w-3.5" /> Inspect CRM
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={customers}
        searchKey="company_name"
        searchPlaceholder="Search customers by company or name..."
      />

      <CustomerDetailDrawer
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </div>
  );
}
