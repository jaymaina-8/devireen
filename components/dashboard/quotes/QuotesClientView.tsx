'use client';

import { useState, useMemo } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { QuoteDetailDrawer } from './QuoteDetailDrawer';
import { Button } from '@/components/ui/Button';
import { Eye, FileText, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export function QuotesClientView({ initialQuotes }: { initialQuotes: any[] }) {
  const [quotes] = useState(initialQuotes);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const filteredQuotes = useMemo(() => {
    if (activeTab === 'ALL') return quotes;
    return quotes.filter((q) => q.status === activeTab);
  }, [quotes, activeTab]);

  const tabs = [
    { label: 'All Quotes', value: 'ALL', count: quotes.length },
    {
      label: 'Pending',
      value: 'PENDING',
      count: quotes.filter((q) => q.status === 'PENDING').length,
    },
    {
      label: 'Reviewing',
      value: 'REVIEWING',
      count: quotes.filter((q) => q.status === 'REVIEWING').length,
    },
    {
      label: 'Approved',
      value: 'APPROVED',
      count: quotes.filter((q) => q.status === 'APPROVED').length,
    },
    {
      label: 'Fulfilled',
      value: 'FULFILLED',
      count: quotes.filter((q) => q.status === 'FULFILLED').length,
    },
    {
      label: 'Rejected',
      value: 'REJECTED',
      count: quotes.filter((q) => q.status === 'REJECTED').length,
    },
  ];

  const columns = [
    {
      accessorKey: 'id',
      header: 'Quote Ref',
      cell: ({ row }: any) => (
        <button
          onClick={() => setSelectedQuote(row.original)}
          className="font-mono text-xs font-bold text-blue-600 hover:underline"
        >
          #
          {row.original.quote_number ||
            row.original.id.slice(0, 8).toUpperCase()}
        </button>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }: any) =>
        format(new Date(row.original.created_at), 'MMM d, yyyy'),
    },
    {
      id: 'customer',
      header: 'Customer Company',
      cell: ({ row }: any) => (
        <div>
          <div className="font-semibold text-slate-900">
            {row.original.customers?.company_name || 'Individual Client'}
          </div>
          <div className="text-[11px] text-slate-500">
            {row.original.customers?.contact_email || 'No email'}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'total_amount',
      header: 'Total Value',
      cell: ({ row }: any) => (
        <div className="font-bold text-slate-900">
          KSh {row.original.total_amount?.toLocaleString() || 0}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status Pipeline',
      cell: ({ row }: any) => {
        const s = row.original.status;
        return (
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
              s === 'PENDING'
                ? 'border border-amber-200 bg-amber-100 text-amber-900'
                : s === 'APPROVED'
                  ? 'border border-emerald-200 bg-emerald-100 text-emerald-900'
                  : s === 'FULFILLED'
                    ? 'border border-blue-200 bg-blue-100 text-blue-900'
                    : 'bg-slate-100 text-slate-700'
            }`}
          >
            {s}
          </span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <div className="text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedQuote(row.original)}
            className="h-8 gap-1 rounded-lg border-slate-200 px-2.5 text-xs"
          >
            <Eye className="h-3.5 w-3.5" /> Inspect
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Pipeline Tabs */}
      <div className="custom-scrollbar flex items-center gap-1.5 overflow-x-auto border-b border-slate-200/80 pb-1 text-xs font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 whitespace-nowrap transition-all ${
              activeTab === tab.value
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`py-0.2 rounded-full px-1.5 text-[10px] font-bold ${
                activeTab === tab.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={filteredQuotes}
        searchKey="id"
        searchPlaceholder="Search by quote reference..."
      />

      {/* Quote Detail Drawer */}
      <QuoteDetailDrawer
        isOpen={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        quote={selectedQuote}
      />
    </div>
  );
}
