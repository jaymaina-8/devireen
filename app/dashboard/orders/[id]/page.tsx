import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Printer, FileText, Download } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { OrderTimeline } from '@/components/dashboard/orders/OrderTimeline';

export const metadata = {
  title: 'Order Details | Devireen Enterprise',
};

async function getOrderById(id: string) {
  const supabase = await createClient();
  const { data: order } = await supabase
    .from('orders')
    .select('*, customers(*)')
    .eq('id', id)
    .single();

  if (!order) return null;

  // Ideally, an order has order_items. We'll fetch them if the table exists, otherwise mock or ignore
  // Since we haven't strictly created order_items yet in this phase, let's try fetching just in case,
  // If it fails, fallback to empty array.
  let items = [];
  try {
    const { data } = await supabase
      .from('order_items')
      .select('*, products(name, sku)')
      .eq('order_id', id);
    if (data) items = data;
  } catch (e) {
    // Ignore if table doesn't exist yet
  }

  return { ...order, items };
}

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);
  
  if (!order) {
    notFound();
  }

  const getStatusVariant = (status: string) => {
    if (status === 'PENDING') return 'warning';
    if (status === 'CANCELLED') return 'error';
    return 'success';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/orders">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.substring(0, 8).toUpperCase()}</h1>
              <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
              <Badge variant={order.payment_status === 'PAID' ? 'success' : 'warning'}>{order.payment_status}</Badge>
            </div>
            <p className="text-gray-500">Placed on {format(new Date(order.created_at), 'MMMM d, yyyy h:mm a')}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Product</th>
                    <th className="px-6 py-3 font-medium text-right">Price</th>
                    <th className="px-6 py-3 font-medium text-right">Qty</th>
                    <th className="px-6 py-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.length > 0 ? (
                    order.items.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{item.products?.name || 'Unknown Product'}</div>
                          <div className="text-xs text-gray-500">SKU: {item.products?.sku || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono">
                          {item.unit_price?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          {(item.quantity * (item.unit_price || 0)).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No items found for this order.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-center text-sm mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>KSh {order.total_amount?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-4 text-gray-600">
                <span>Tax & Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>KSh {order.total_amount?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-900 border-b pb-3">Customer Information</h2>
            {order.customers ? (
              <div className="text-sm space-y-3">
                <div>
                  <div className="text-gray-500 text-xs uppercase font-medium">Company Name</div>
                  <div className="font-medium text-gray-900 mt-1">{order.customers.company_name}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-medium">Contact Person</div>
                  <div className="text-gray-900 mt-1">{order.customers.first_name} {order.customers.last_name}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-medium">Email</div>
                  <div className="text-blue-600 mt-1">{order.customers.contact_email}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-medium">Phone</div>
                  <div className="text-gray-900 mt-1">{order.customers.phone_number || 'N/A'}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">Guest Order</div>
            )}
            
            {order.quote_id && (
              <div className="pt-4 border-t border-gray-100">
                <Link href={`/dashboard/quotes/${order.quote_id}`} className="text-sm text-blue-600 hover:underline flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> View Original Quote
                </Link>
              </div>
            )}
          </div>

          <OrderTimeline status={order.status} paymentStatus={order.payment_status} createdAt={order.created_at} />
        </div>
      </div>
    </div>
  );
}
