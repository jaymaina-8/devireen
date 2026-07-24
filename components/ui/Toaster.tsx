'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/Toast';
import { useToastStore } from '@/lib/store/toast-store';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  const getIcon = (variant?: 'default' | 'destructive' | 'success') => {
    switch (variant) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />;
      case 'destructive':
        return <XCircle className="h-5 w-5 shrink-0 text-red-600" />;
      default:
        return <Info className="h-5 w-5 shrink-0 text-blue-600" />;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant, action }) => {
        return (
          <Toast
            key={id}
            onOpenChange={(open) => !open && removeToast(id)}
            className="rounded-xl border border-slate-200/80 bg-white/95 p-4 shadow-lg backdrop-blur-sm"
          >
            <div className="flex w-full items-start gap-3 pr-4">
              {getIcon(variant)}
              <div className="min-w-0 flex-1">
                {title && (
                  <ToastTitle className="text-sm font-semibold text-slate-900">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className="mt-0.5 text-xs text-slate-500">
                    {description}
                  </ToastDescription>
                )}
              </div>
              {action && (
                <button
                  type="button"
                  onClick={() => {
                    action.onClick();
                    removeToast(id);
                  }}
                  className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
                >
                  {action.label}
                </button>
              )}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
