import * as React from "react";
import { cn } from "@/lib/utils";

interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  currency?: string;
  originalAmount?: number;
  showVat?: boolean;
}

export function Price({ amount, currency = "KSh", originalAmount, showVat = false, className, ...props }: PriceProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('KES', currency);
  };

  const hasDiscount = originalAmount !== undefined && originalAmount > amount;

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex items-baseline space-x-2">
        <span className="text-lg font-bold text-text-main">
          {formatPrice(amount)}
        </span>
        {hasDiscount && (
          <span className="text-sm font-medium text-text-muted line-through">
            {formatPrice(originalAmount)}
          </span>
        )}
      </div>
      {showVat && (
        <span className="text-xs text-text-muted mt-0.5">Excl. VAT</span>
      )}
    </div>
  );
}
