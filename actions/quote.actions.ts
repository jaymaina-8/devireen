'use server';

import { QuoteRepository } from '@/lib/supabase/repositories/quote.repository';

export async function fetchCustomerQuotes(customerId: string) {
  try {
    const quotes = await QuoteRepository.getQuotesByCustomer(customerId);
    return { success: true, data: quotes };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createQuote(payload: any) {
  try {
    const quote = await QuoteRepository.createQuote(payload);
    return { success: true, data: quote };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createQuoteAction(payload: any) {
  const supabase = await createClient();
  
  // Calculate total
  const total_amount = payload.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unit_price), 0);

  // Insert Quote
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .insert({
      customer_id: payload.customer_id,
      status: payload.status,
      notes: payload.notes,
      total_amount,
    })
    .select('id')
    .single();

  if (quoteError || !quote) {
    return { success: false, error: quoteError?.message || 'Failed to create quote' };
  }

  // Insert Items
  const itemsToInsert = payload.items.map((item: any) => ({
    quote_id: quote.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase
    .from('quote_items')
    .insert(itemsToInsert);

  if (itemsError) {
    return { success: false, error: itemsError.message };
  }

  revalidatePath('/dashboard/quotes');
  return { success: true };
}

export async function updateQuoteAction(id: string, payload: any) {
  const supabase = await createClient();
  
  const total_amount = payload.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unit_price), 0);

  // Update Quote
  const { error: quoteError } = await supabase
    .from('quotes')
    .update({
      customer_id: payload.customer_id,
      status: payload.status,
      notes: payload.notes,
      total_amount,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (quoteError) {
    return { success: false, error: quoteError.message };
  }

  // To simplify, we delete existing items and insert new ones
  await supabase.from('quote_items').delete().eq('quote_id', id);

  const itemsToInsert = payload.items.map((item: any) => ({
    quote_id: id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase
    .from('quote_items')
    .insert(itemsToInsert);

  if (itemsError) {
    return { success: false, error: itemsError.message };
  }

  revalidatePath('/dashboard/quotes');
  return { success: true };
}

export async function convertQuoteToOrderAction(quoteId: string) {
  const supabase = await createClient();

  // 1. Fetch Quote
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('*, items:quote_items(*)')
    .eq('id', quoteId)
    .single();

  if (quoteError || !quote) {
    return { success: false, error: quoteError?.message || 'Quote not found' };
  }

  if (quote.status === 'FULFILLED') {
     return { success: false, error: 'Quote is already converted to an order' };
  }

  // 2. Create Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      quote_id: quote.id,
      customer_id: quote.customer_id,
      status: 'PENDING',
      payment_status: 'UNPAID',
      total_amount: quote.total_amount,
      notes: quote.notes,
    })
    .select('id')
    .single();

  if (orderError || !order) {
    return { success: false, error: orderError?.message || 'Failed to create order' };
  }

  // 3. Create Order Items
  const orderItems = quote.items.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: orderItemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (orderItemsError) {
    return { success: false, error: orderItemsError.message };
  }

  // 4. Update Quote Status
  await supabase
    .from('quotes')
    .update({ status: 'FULFILLED' })
    .eq('id', quoteId);

  revalidatePath('/dashboard/quotes');
  revalidatePath('/dashboard/orders');
  
  return { success: true, orderId: order.id };
}
