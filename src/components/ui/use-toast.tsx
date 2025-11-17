"use client";

import * as React from "react";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose } from "./toast";

export function useToast() {
  const [toasts, setToasts] = React.useState<
    { id: string; title: string; description?: string; variant?: "default" | "destructive" }[]
  >([]);

  function toast({ title, description, variant = "default" }: any) {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }

  const ToastContainer = () => (
    <ToastProvider>
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <Toast key={t.id} className={t.variant === "destructive" ? "border-red-500" : ""}>
            <ToastTitle>{t.title}</ToastTitle>
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
            <ToastClose />
          </Toast>
        ))}
      </div>
    </ToastProvider>
  );

  return { toast, ToastContainer };
}

