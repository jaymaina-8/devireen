import * as React from "react";
import { ProductImage } from "@/components/products/ProductImage";
import { Price } from "@/components/products/Price";
import { Button } from "@/components/ui/Button";
import { Trash2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
  onRemove?: (id: string) => void;
}

export function QuoteItem({
  id,
  name,
  sku,
  price,
  imageUrl,
  quantity,
  onUpdateQuantity,
  onRemove,
  className,
  ...props
}: QuoteItemProps) {
  return (
    <div className={cn("flex gap-4 py-4 border-b border-border-subtle", className)} {...props}>
      <div className="h-20 w-20 flex-shrink-0 rounded-md border border-border-subtle overflow-hidden">
        <ProductImage src={imageUrl} alt={name} className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="text-sm font-medium text-text-main line-clamp-2">{name}</h4>
            <p className="text-xs text-text-muted mt-1">{sku}</p>
          </div>
          <Price amount={price * quantity} className="items-end text-sm" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center rounded-md border border-border-strong">
            <button
              type="button"
              className="p-1 hover:bg-background text-text-muted transition-colors disabled:opacity-50"
              onClick={() => onUpdateQuantity?.(id, Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </button>
            <span className="w-8 text-center text-sm font-medium text-text-main">{quantity}</span>
            <button
              type="button"
              className="p-1 hover:bg-background text-text-muted transition-colors"
              onClick={() => onUpdateQuantity?.(id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-error hover:bg-error/10 hover:text-error"
            onClick={() => onRemove?.(id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
