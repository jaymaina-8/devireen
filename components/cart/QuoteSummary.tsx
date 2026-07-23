import * as React from "react";
import { Price } from "@/components/products/Price";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface QuoteSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  subtotal: number;
  vatAmount?: number;
  total: number;
  itemCount: number;
  onProceed?: () => void;
  hideAction?: boolean;
}

export function QuoteSummary({ subtotal, vatAmount = 0, total, itemCount, onProceed, hideAction, className, ...props }: QuoteSummaryProps) {
  return (
    <div className={cn("bg-background p-4 rounded-lg border border-border-subtle", className)} {...props}>
      <div className="space-y-3 mb-4 text-sm">
        <div className="flex justify-between text-text-muted">
          <span>Items ({itemCount})</span>
          <div className="text-text-main font-medium">KSh {subtotal.toLocaleString()}</div>
        </div>
        {vatAmount > 0 && (
          <div className="flex justify-between text-text-muted">
            <span>VAT (16%)</span>
            <div className="text-text-main font-medium">KSh {vatAmount.toLocaleString()}</div>
          </div>
        )}
        <div className="flex justify-between border-t border-border-strong pt-3 font-semibold text-text-main text-base">
          <span>Estimated Total</span>
          <Price amount={total} />
        </div>
      </div>
      {!hideAction && (
        <Button variant="primary" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-transparent" onClick={onProceed} disabled={itemCount === 0}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Checkout via WhatsApp
        </Button>
      )}
      <p className="text-xs text-text-muted text-center mt-3">
        Shipping and bulk discounts are calculated during review.
      </p>
    </div>
  );
}
