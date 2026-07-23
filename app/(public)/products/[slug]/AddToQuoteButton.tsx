"use client";

import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { useQuoteCart } from "@/lib/store/quote-cart";
import { toast } from "@/lib/store/toast-store";
import { useState } from "react";
import { Input } from "@/components/ui/Input";

export function AddToQuoteButton({ product, disabled }: { product: any; disabled: boolean }) {
  const addItem = useQuoteCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem({ ...product, quantity });
    toast({
      title: "Added to Quote",
      description: `${product.name} (${quantity}) added to your quote cart.`,
      variant: "success",
    });
  };

  return (
    <div className="flex gap-4">
      <div className="w-24 shrink-0">
        <label className="sr-only" htmlFor="quantity">Quantity</label>
        <Input 
          id="quantity"
          type="number" 
          min="1" 
          value={quantity} 
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="h-12 text-center"
          disabled={disabled}
        />
      </div>
      <Button 
        variant="primary" 
        size="lg" 
        className="flex-1 h-12 text-base"
        onClick={handleAdd}
        disabled={disabled}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Quote
      </Button>
    </div>
  );
}
