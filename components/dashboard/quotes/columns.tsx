'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { DataTableColumnHeader } from '@/components/ui/DataTable';

function getStatusColor(status: string) {
  switch(status) {
    case 'DRAFT': return 'default';
    case 'PENDING': return 'warning';
    case 'REVIEWING': return 'info';
    case 'APPROVED': return 'success';
    case 'REJECTED': return 'error';
    case 'FULFILLED': return 'success';
    default: return 'default';
  }
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quote ID" />,
    cell: ({ row }) => {
      const quoteId = row.original.id;
      return <div className="font-mono text-xs text-gray-900">{quoteId.substring(0, 8).toUpperCase()}</div>;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      return format(new Date(row.original.created_at), 'MMM d, yyyy');
    },
  },
  {
    id: 'customer',
    accessorFn: row => row.customers ? row.customers.company_name : 'Guest',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const quote = row.original;
      return (
        <div>
          <div className="font-medium text-gray-900">
            {quote.customers ? quote.customers.company_name : 'Guest'}
          </div>
          {quote.customers && (
            <div className="text-xs text-gray-500">{quote.customers.contact_email}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'total_amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => {
      const amount = row.original.total_amount;
      return <div className="font-medium text-gray-900">KSh {amount?.toLocaleString() || '0'}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={getStatusColor(status) as any}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const quoteId = row.original.id;
      return (
        <div className="text-right">
          <Link href={`/dashboard/quotes/${quoteId}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
        </div>
      );
    },
  },
];
