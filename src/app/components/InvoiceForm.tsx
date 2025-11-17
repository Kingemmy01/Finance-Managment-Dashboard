"use client";

import React, { useState } from "react";
import { calcVatAmount, calcTotal } from "@/utils/finance";
import { Invoice } from "@/store/useInvoiceStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  initial?: Partial<Invoice>;
  onSave: (data: Invoice) => Promise<void>;
  onCancel?: () => void;
};

export default function InvoiceForm({ initial, onSave, onCancel }: Props) {
  const { toast } = useToast();

  const [clientName, setClientName] = useState(initial?.clientName || "");
  const [clientEmail, setClientEmail] = useState(initial?.clientEmail || "");
  const [amount, setAmount] = useState(String(initial?.amount ?? ""));
  const [vatPercent, setVatPercent] = useState(String(initial?.vatPercent ?? 7.5));
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial.dueDate.slice(0, 10) : "");
  const [status, setStatus] = useState<"paid" | "unpaid">(initial?.status || "unpaid");

  const numericAmount = Number(amount || 0);
  const numericVat = Number(vatPercent || 0);
  const vatAmount = calcVatAmount(numericAmount, numericVat);
  const total = calcTotal(numericAmount, numericVat);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();

    const invoice: Invoice = {
      clientName,
      clientEmail,
      amount: numericAmount,
      vatPercent: numericVat,
      vatAmount,
      total,
      dueDate: new Date(dueDate).toISOString(),
      status,
    };

    try {
      await onSave(invoice);
      toast({ title: "Invoice saved successfully!" });
      // Clear form after save
      setClientName("");
      setClientEmail("");
      setAmount("");
      setVatPercent("7.5");
      setDueDate("");
      setStatus("unpaid");
    } catch (error) {
      toast({ title: "Failed to save invoice.", description: String(error), variant: "destructive" });
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 p-6 rounded-lg shadow-sm bg-gray-50 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Invoice</h2>

      <div>
        <Label className="text-gray-600">Client Name</Label>
        <Input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          placeholder="Enter client name"
          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"

        />
      </div>

      <div>
        <Label className="text-gray-600">Client Email</Label>
        <Input
          type="email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder="Enter client email"
          className="mt-1"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-600">Amount (₦)</Label>
          <Input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <Label className="text-gray-600">VAT (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={vatPercent}
            onChange={(e) => setVatPercent(e.target.value)}
            className="mt-1"
            placeholder="7.5"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-2">
        <div>
          <Label className="text-gray-600">VAT Amount</Label>
          <p className="font-medium mt-1 text-gray-700">₦{vatAmount.toFixed(2)}</p>
        </div>
        <div>
          <Label className="text-gray-600">Total</Label>
          <p className="font-medium mt-1 text-gray-700">₦{total.toFixed(2)}</p>
        </div>
        <div>
          <Label className="text-gray-600">Due Date</Label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Label className="text-gray-600">Status</Label>
        <Select value={status} onValueChange={(val) => setStatus(val as "paid" | "unpaid")}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        {onCancel && (
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Invoice
        </Button>
      </div>
    </form>
  );
}
