'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/Badge';
import { Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { CustomerTableRowActions } from './CustomerTableRowActions';
import { DataTableColumnHeader } from '@/components/ui/DataTable';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'company_name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div>
          <div className="font-medium text-gray-900">{customer.company_name || 'Individual'}</div>
          {customer.kra_pin && (
            <div className="text-xs text-gray-500">KRA: {customer.kra_pin}</div>
          )}
        </div>
      );
    },
    // We want search to also work on email, so we need to ensure searchKey on DataTable is set appropriately, 
    // or we implement a custom filter if we have a single search box. 
    // Usually DataTable globalFilter handles multiple columns.
  },
  {
    accessorKey: 'contact_email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact" />,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <span>{customer.contact_email || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>{customer.contact_phone || 'N/A'}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <Badge variant={customer.type === 'BUSINESS' ? 'info' : 'default'}>
          {customer.type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const customer = row.original;
      return customer.is_active !== false ? (
        <Badge variant="success">Active</Badge>
      ) : (
        <Badge variant="error">Blocked</Badge>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined" />,
    cell: ({ row }) => {
      return format(new Date(row.original.created_at), 'MMM d, yyyy');
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CustomerTableRowActions customer={row.original} />,
  },
];
