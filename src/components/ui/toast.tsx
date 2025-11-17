"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils"; // utility for conditional classes
import { X } from "lucide-react";

// Toast Provider
export const ToastProvider = ToastPrimitive.Provider;

// Toast Root
export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      "bg-white rounded-md shadow-lg p-4 grid grid-cols-[auto_max-content] gap-4 items-center",
      className
    )}
    {...props}
  />
));

// Toast Title
export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));

// Toast Description
export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm opacity-80", className)}
    {...props}
  />
));

// Toast Close Button
export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn("absolute top-2 right-2", className)}
    {...props}
  >
    <X className="w-4 h-4" />
  </ToastPrimitive.Close>
));

// Toast viewport
export const Toaster = () => {
  return (
    <ToastPrimitive.Viewport
      className="fixed top-5 right-5 z-[1000] flex flex-col gap-2 w-96 max-w-full"
    />
  );
};
