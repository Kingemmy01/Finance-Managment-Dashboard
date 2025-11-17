"use client";

import React, { useMemo } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Wallet, Clock, Receipt } from "lucide-react";

export default function DashboardCards() {
  const invoices = useInvoiceStore((state) => state.invoices);

  const totals = useMemo(() => {
    const totalInvoices = invoices.length;
    const totalPaidAmount = invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.total, 0);
    const pendingPayments = invoices
      .filter((i) => i.status === "unpaid")
      .reduce((sum, i) => sum + i.total, 0);
    const totalVatCollected = invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.vatAmount, 0);

    return { totalInvoices, totalPaidAmount, pendingPayments, totalVatCollected };
  }, [invoices]);

  const formatted = {
    totalPaid: totals.totalPaidAmount.toLocaleString(),
    pending: totals.pendingPayments.toLocaleString(),
    vat: totals.totalVatCollected.toLocaleString(),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Invoices */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
            <Receipt size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Invoices</p>
            <p className="text-2xl font-semibold">{totals.totalInvoices}</p>
          </div>
        </CardContent>
      </Card>

      {/* Total Paid */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-100 text-green-600">
            <Wallet size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-2xl font-semibold">₦{formatted.totalPaid}</p>
          </div>
        </CardContent>
      </Card>

      {/* Pending Payments */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Payments</p>
            <p className="text-2xl font-semibold">₦{formatted.pending}</p>
          </div>
        </CardContent>
      </Card>

      {/* VAT Collected */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
            <TrendingUp size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">VAT Collected</p>
            <p className="text-2xl font-semibold">₦{formatted.vat}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
