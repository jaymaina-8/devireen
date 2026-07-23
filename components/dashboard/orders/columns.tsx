'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import Link from 'next/link';
import { DataTableColumnHeader } from '@/components/ui/DataTable';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
    cell: ({ row }) => {
      const orderId = row.original.id;
      return (
        <Link href={`/dashboard/orders/${orderId}`} className="font-mono text-xs text-blue-600 hover:underline">
          {orderId.substring(0, 8).toUpperCase()}
        </Link>
      );
    },
  },
  {
    id: 'customer',
    accessorFn: row => row.customers ? row.customers.company_name : 'Individual',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          <div className="font-medium text-gray-900">{order.customers?.company_name || 'Individual'}</div>
          <div className="text-xs text-gray-500 font-normal">{order.customers?.contact_email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status === 'PENDING' ? 'warning' : 'success'}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'payment_status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => {
      const paymentStatus = row.original.payment_status;
      return <Badge variant={paymentStatus === 'UNPAID' ? 'error' : 'success'}>{paymentStatus}</Badge>;
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
    accessorKey: 'total_amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => {
      const amount = row.original.total_amount;
      return <div className="font-medium text-gray-900">KSh {amount?.toLocaleString() || '0'}</div>;
    },
  },
];
