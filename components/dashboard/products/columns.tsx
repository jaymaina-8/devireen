'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/Badge';
import { Star } from 'lucide-react';
import { ProductTableRowActions } from './ProductTableRowActions';
import { DataTableColumnHeader } from '@/components/ui/DataTable';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    cell: ({ row }) => {
      const product = row.original;
      const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
            {primaryImage ? (
              <img src={primaryImage.url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400">Img</span>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</div>
            <div className="text-xs text-gray-500">SKU: {product.sku}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const product = row.original;
      return product.categories?.name || <span className="text-gray-400 italic">None</span>;
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div>
          <div className="font-medium text-gray-900">KSh {product.price?.toLocaleString()}</div>
          {product.sale_price && (
            <div className="text-xs text-red-500 line-through">KSh {product.sale_price.toLocaleString()}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex flex-wrap gap-2">
          <Badge variant={product.stock_status === 'IN_STOCK' ? 'success' : product.stock_status === 'PRE_ORDER' ? 'warning' : 'error'}>
            {product.stock_status.replace('_', ' ')}
          </Badge>
          {!product.is_active && (
            <Badge variant="default" className="bg-gray-200 text-gray-700 hover:bg-gray-300">Draft</Badge>
          )}
          {product.is_featured && (
            <Badge variant="default" className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200">
              <Star className="w-3 h-3 inline mr-1" />
              Featured
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ProductTableRowActions product={row.original} />,
  },
];
