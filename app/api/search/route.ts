import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const supabase = await createClient();
  const searchPattern = `%${query}%`;
  const results = [];

  try {
    // Search Products
    const { data: products } = await supabase
      .from('products')
      .select('id, name, sku')
      .ilike('name', searchPattern)
      .limit(5);

    if (products) {
      results.push(...products.map(p => ({
        type: 'product',
        title: p.name,
        subtitle: `SKU: ${p.sku}`,
        url: `/dashboard/products/${p.id}/edit`
      })));
    }

    // Search Customers
    const { data: customers } = await supabase
      .from('customers')
      .select('id, first_name, last_name, email, phone_number')
      .or(`first_name.ilike.${searchPattern},last_name.ilike.${searchPattern},email.ilike.${searchPattern}`)
      .limit(5);

    if (customers) {
      results.push(...customers.map(c => ({
        type: 'customer',
        title: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
        subtitle: c.email || c.phone_number || 'No contact info',
        url: `/dashboard/customers/${c.id}`
      })));
    }

    // Search Quotes (by quote_number)
    const { data: quotes } = await supabase
      .from('quotes')
      .select('id, quote_number, status')
      .ilike('quote_number', searchPattern)
      .limit(5);

    if (quotes) {
      results.push(...quotes.map(q => ({
        type: 'quote',
        title: q.quote_number,
        subtitle: `Status: ${q.status}`,
        url: `/dashboard/quotes/${q.id}`
      })));
    }

    // Search Orders (by order_number)
    const { data: orders } = await supabase
      .from('orders')
      .select('id, order_number, status')
      .ilike('order_number', searchPattern)
      .limit(5);

    if (orders) {
      results.push(...orders.map(o => ({
        type: 'order',
        title: o.order_number,
        subtitle: `Status: ${o.status}`,
        url: `/dashboard/orders/${o.id}`
      })));
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
