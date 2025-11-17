"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.create(ID.unique(), email, password, name);

      toast({ title: "Account created successfully!" });
      router.push("/login");
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err?.message || String(err),
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Branding */}
      <div className="hidden md:flex w-1/2 bg-[#8F0] justify-center items-center">
        <h1 className="text-4xl font-plain text-gray-800">Create Your Account and start managing your invoices with ease</h1>
      </div>

      {/* Right side: Registration Form */}
      <div className="flex flex-1 justify-center items-center p-8 bg-[#F5FFDA]">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6 border border-[#cce685]"
        >
          <h2 className="text-2xl font-bold text-gray-800">Register</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#8F0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F0]"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#8F0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F0]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#8F0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F0]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8F0] hover:bg-[#7AD000] text-gray-900 font-semibold py-2 rounded transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>
          <div className="text-center mt-4 text-sm">
  Already have an account?{" "}
  <a href="/login" className="text-[#c7ef74] hover:underline">
    Login
  </a>
</div>
        </form>
      </div>
    </div>
  );
}




