import { createClient } from '@/lib/supabase/server';
import { DatabaseError } from '@/lib/errors/DatabaseError';
import { logger } from '@/lib/logger';

export class QuoteRepository {
  static async getQuotesByCustomer(customerId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('quotes')
      .select('*, quote_items(*, products(*))')
      .eq('customer_id', customerId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (error) {
      logger.error(`Failed to retrieve quotes for customer: ${customerId}`, error);
      throw new DatabaseError('Database error while retrieving quotes');
    }
    return data;
  }

  static async createQuote(payload: any) {
    const supabase = await createClient();
    const sessionId = Math.random().toString(36).substring(2, 15);
    
    const totalAmount = payload.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
    
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        session_id: sessionId,
        status: 'DRAFT',
        notes: `Company: ${payload.companyName || 'N/A'}\nContact: ${payload.contactName}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nNotes: ${payload.notes || ''}`,
        total_amount: totalAmount
      })
      .select()
      .single();
      
    if (quoteError) {
      logger.error('Failed to create quote', quoteError);
      throw new DatabaseError('Failed to create quote');
    }
    
    const quoteItems = payload.items.map((item: any) => ({
      quote_id: quote.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: item.unitPrice
    }));
    
    const { error: itemsError } = await supabase
      .from('quote_items')
      .insert(quoteItems);
      
    if (itemsError) {
      logger.error('Failed to create quote items', itemsError);
      throw new DatabaseError('Failed to create quote items');
    }
    
    return quote;
  }
}
