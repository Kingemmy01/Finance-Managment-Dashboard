"use client";

import React, { useState } from "react";
import { useInvoiceStore, Invoice } from "@/store/useInvoiceStore";
import InvoiceForm from "@/app/components/InvoiceForm";

export default function InvoiceTable() {
  const { invoices, updateInvoice, removeInvoice } = useInvoiceStore();
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">Invoices</h2>

      {editingInvoice ? (
        <InvoiceForm
          initial={editingInvoice}
          onSave={async (updated) => {
            await updateInvoice(editingInvoice.$id!, updated);
            setEditingInvoice(null);
          }}
          onCancel={() => setEditingInvoice(null)}
        />
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Client</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Client Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">VAT</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Total</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.length === 0 ? (
              <tr key="empty">
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.$id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{inv.clientName}</td>
                  <td className="px-4 py-2">{inv.clientEmail}</td>
                  <td className="px-4 py-2">₦{inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">₦{inv.vatAmount.toFixed(2)}</td>
                  <td className="px-4 py-2">₦{inv.total.toFixed(2)}</td>
                  <td className="px-4 py-2 capitalize">{inv.status}</td>

                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => setEditingInvoice(inv)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => removeInvoice(inv.$id!)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
