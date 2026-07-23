"use client";

import * as React from "react";
import { useQuoteCart } from "@/lib/store/quote-cart";
import { QuoteSummary } from "@/components/cart/QuoteSummary";
import { QuoteItem } from "@/components/cart/QuoteItem";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ShoppingCart, Send } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { toast } from "@/lib/store/toast-store";
import { createQuote } from "@/actions/quote.actions";
import { z } from "zod";

const quoteFormSchema = z.object({
  companyName: z.string().optional(),
  contactName: z.string().min(2, "Contact name is required (min 2 chars)"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  notes: z.string().optional()
});

export function QuoteForm() {
  const { items, updateQuantity, removeItem, getSummary, clearCart } = useQuoteCart();
  const [mounted, setMounted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = React.useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: ''
  });

  if (!mounted) return null;

  const { subtotal, vatAmount, total, itemCount } = getSummary();

  if (items.length === 0) {
    return (
      <EmptyState 
        icon={ShoppingCart} 
        title="Your quote is empty" 
        description="Add products to your quote cart before requesting a quotation."
        action={
          <Link href="/">
            <Button variant="primary">Return to Homepage</Button>
          </Link>
        }
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const result = quoteFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flattened = result.error.flatten().fieldErrors;
      Object.keys(flattened).forEach(key => {
        fieldErrors[key] = flattened[key as keyof typeof flattened]?.[0] || "";
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const apiResult = await createQuote({
        ...formData,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price
        }))
      });
      
      if (!apiResult.success) {
        throw new Error(apiResult.error);
      }

      const text = `*New Quote Request*\n\n` +
        `*Contact:* ${formData.contactName}\n` +
        `*Company:* ${formData.companyName || 'N/A'}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Email:* ${formData.email}\n\n` +
        `*Items:*\n` +
        items.map(i => `- ${i.quantity}x ${i.name}`).join('\n') +
        `\n\n*Total (Est):* KSh ${total.toLocaleString()}` +
        (formData.notes ? `\n\n*Notes:* ${formData.notes}` : '');
        
      const waUrl = `https://wa.me/254700000000?text=${encodeURIComponent(text)}`;
      
      toast({
        title: "Quote Submitted",
        description: "Redirecting to WhatsApp to complete your request.",
        variant: "success",
      });
      
      clearCart();
      window.open(waUrl, '_blank');
      window.location.href = '/';

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-surface border border-border-subtle rounded-lg p-4 md:p-6">
          <h2 className="text-xl font-bold text-text-main mb-6">Quote Items</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <QuoteItem
                key={item.id}
                id={item.id}
                name={item.name}
                sku={item.sku}
                price={item.price}
                imageUrl={item.imageUrl}
                quantity={item.quantity}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form & Summary */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="bg-surface border border-border-subtle rounded-lg p-4 md:p-6">
          <h2 className="text-xl font-bold text-text-main mb-6">Your Details</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-text-main mb-1">Company Name</label>
              <Input 
                id="companyName" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleInputChange} 
                placeholder="Optional" 
                className={errors.companyName ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
              />
              {errors.companyName && <p className="text-sm text-error-600 mt-1">{errors.companyName}</p>}
            </div>
            
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-text-main mb-1">Contact Name *</label>
              <Input 
                id="contactName" 
                name="contactName" 
                value={formData.contactName} 
                onChange={handleInputChange} 
                className={errors.contactName ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
              />
              {errors.contactName && <p className="text-sm text-error-600 mt-1">{errors.contactName}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-main mb-1">Email Address *</label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className={errors.email ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
              />
              {errors.email && <p className="text-sm text-error-600 mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text-main mb-1">Phone Number *</label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                value={formData.phone} 
                onChange={handleInputChange} 
                className={errors.phone ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
              />
              {errors.phone && <p className="text-sm text-error-600 mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-text-main mb-1">Additional Notes</label>
              <textarea 
                id="notes" 
                name="notes" 
                rows={3}
                value={formData.notes} 
                onChange={handleInputChange} 
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-text-main placeholder:text-text-muted disabled:opacity-50 ${
                  errors.notes 
                    ? "border-error-500 focus:border-error-500 focus:ring-error-500 focus:ring-1" 
                    : "border-border-main focus:border-primary-500 focus:ring-primary-500 focus:ring-1"
                }`}
                placeholder="Any special requirements?"
              />
              {errors.notes && <p className="text-sm text-error-600 mt-1">{errors.notes}</p>}
            </div>
          </div>
          
          <div className="mt-8 border-t border-border-subtle pt-6">
            <QuoteSummary 
              subtotal={subtotal} 
              vatAmount={vatAmount} 
              total={total} 
              itemCount={itemCount} 
              onProceed={() => {}}
              hideAction
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : (
              <>
                <Send className="mr-2 h-4 w-4" /> Request Quote via WhatsApp
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
