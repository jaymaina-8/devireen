"use client";

import * as React from "react";
import { X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itemsCount?: number;
  children?: React.ReactNode;
  summary?: React.ReactNode;
}

export function QuoteCartDrawer({ isOpen, onClose, itemsCount = 0, children, summary }: QuoteCartDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-xl sm:w-96">
        <div className="flex items-center justify-between border-b border-border-subtle p-4">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-text-main">Quote Cart</h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
              {itemsCount}
            </span>
          </div>
          <button onClick={onClose} className="rounded-sm p-1 text-text-muted hover:bg-background hover:text-text-main transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
        {summary && (
          <div className="border-t border-border-subtle p-4 bg-surface">
            {summary}
          </div>
        )}
      </div>
    </>
  );
}
