"use client";

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/Toast";
import { useToastStore } from "@/lib/store/toast-store";

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant }) => {
        return (
          <Toast key={id} onOpenChange={(open) => !open && removeToast(id)}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
