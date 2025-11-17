"use client";

import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser, clearUser } = useUserStore();

  // Check if logged in, else redirect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch {
        clearUser();
        router.push("/login");
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      clearUser();
      toast({ title: "Logged out successfully" });
      router.push("/login");
    } catch (err) {
      toast({ title: "Logout failed", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                {(user.name || user.email)[0].toUpperCase()}
              </div>
              <span className="font-medium">{user.name || user.email}</span>
            </>
          ) : (
            <span className="font-medium">Loading...</span>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
