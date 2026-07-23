"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQuoteCart } from "@/lib/store/quote-cart";
import { QuoteCartDrawer } from "./QuoteCartDrawer";
import { QuoteItem } from "./QuoteItem";
import { QuoteSummary } from "./QuoteSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function QuoteCartContainer() {
  const router = useRouter();
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getSummary } = useQuoteCart();
  
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { subtotal, vatAmount, total, itemCount } = getSummary();

  const handleProceed = () => {
    const phoneNumber = "254708037929";
    let message = "Hello Devireen Enterprise, I would like to order the following items:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (SKU: ${item.sku}) - Qty: ${item.quantity}\n`;
    });
    
    message += `\n*Estimated Total: KSh ${total.toLocaleString()}*`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const summaryNode = itemCount > 0 ? (
    <QuoteSummary
      subtotal={subtotal}
      vatAmount={vatAmount}
      total={total}
      itemCount={itemCount}
      onProceed={handleProceed}
    />
  ) : null;

  return (
    <QuoteCartDrawer 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
      itemsCount={itemCount}
      summary={summaryNode}
    >
      {items.length === 0 ? (
        <EmptyState 
          icon={ShoppingCart} 
          title="Your cart is empty" 
          description="Browse our catalogue to add items to your quote."
          action={<Button variant="outline" onClick={() => setIsOpen(false)}>Continue Shopping</Button>}
        />
      ) : (
        <div className="flex flex-col">
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
      )}
    </QuoteCartDrawer>
  );
}
