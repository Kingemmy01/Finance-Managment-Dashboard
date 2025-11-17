import "./globals.css";
import { ToastProvider, Toaster } from "@/components/ui/toast";

export const metadata = {
  title: "Invoice System",
  description: "Fullstack assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        {children}
        <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}


