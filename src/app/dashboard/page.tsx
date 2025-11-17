"use client";

import React from "react";
import DashboardCards from "@/app/components/DashboardCards";
import InvoiceChart from "@/app/components/InvoiceChart";
import RevenueChart from "@/app/components/RevenueChart";
import InvoiceForm from "@/app/components/InvoiceForm";
import InvoiceTable from "@/app/components/InvoiceTable";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const { addInvoice, fetchInvoices } = useInvoiceStore();

  React.useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSave = async (invoice: any) => {
    await addInvoice(invoice);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Dashboard Summary Cards */}
      <DashboardCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-sm">
          <InvoiceChart />
        </Card>
        <Card className="p-6 shadow-sm">
          <RevenueChart />
        </Card>
      </div>

      {/* Create Invoice Form */}
      <Card className="p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Create Invoice</h2>
        <InvoiceForm onSave={handleSave} />
      </Card>

      {/* Invoice Table */}
      <Card className="p-6 shadow-sm">
        <InvoiceTable />
      </Card>
    </div>
  );
}

