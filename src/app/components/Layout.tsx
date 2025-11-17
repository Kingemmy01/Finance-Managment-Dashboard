"use client";

import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { account } from "@/lib/appwrite";
import { useUserStore } from "@/store/useUserStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, clearUser } = useUserStore();

  // Fetch user if not in store
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const accountData = await account.get();
          setUser(accountData);
        } catch {
          clearUser();
        }
      }
    };
    fetchUser();
  }, [user, setUser, clearUser]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      clearUser();
      toast({ title: "Logged out successfully" });
      router.push("/login");
    } catch (error) {
      toast({ title: "Logout failed", variant: "destructive" });
      console.error(error);
    }
  };

  const showHeader = pathname?.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <header className="bg-white shadow-sm flex justify-between items-center px-4 py-4">
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <span className="font-medium">{user.name || user.email}</span>
              </>
            ) : (
              <span className="font-medium">Guest</span>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}







