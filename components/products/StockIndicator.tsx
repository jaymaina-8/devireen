import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'PRE_ORDER' | 'DISCONTINUED';

interface StockIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StockStatus;
  quantity?: number;
}

export function StockIndicator({ status, quantity, className, ...props }: StockIndicatorProps) {
  const config: Record<StockStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'default' | 'info' }> = {
    IN_STOCK: { label: "In Stock", variant: 'success' },
    LOW_STOCK: { label: quantity ? `Only ${quantity} left` : "Low Stock", variant: 'warning' },
    OUT_OF_STOCK: { label: "Out of Stock", variant: 'error' },
    PRE_ORDER: { label: "Pre-order", variant: 'info' },
    DISCONTINUED: { label: "Discontinued", variant: 'default' },
  };

  const currentConfig = config[status] || config.IN_STOCK;
  const { label, variant } = currentConfig;

  return (
    <div className={cn("inline-flex", className)} {...props}>
      <Badge variant={variant}>{label}</Badge>
    </div>
  );
}
