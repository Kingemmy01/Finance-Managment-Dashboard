"use client";

import { create } from "zustand";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const APPWRITE_DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const APPWRITE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

export type Invoice = {
  clientName: string;
  clientEmail: string;
  amount: number;
  vatPercent: number;
  vatAmount: number;
  total: number;
  dueDate: string;
  status: "paid" | "unpaid";
  $id?: string;
  $createdAt?: string;
};

type InvoiceStore = {
  invoices: Invoice[];
  fetchInvoices: () => Promise<void>;
  addInvoice: (invoice: Invoice) => Promise<void>;
  updateInvoice: (id: string, invoice: Invoice) => Promise<void>;
  removeInvoice: (id: string) => Promise<void>;
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],

  fetchInvoices: async () => {
    try {
      if (!APPWRITE_DB_ID || !APPWRITE_COLLECTION_ID)
        throw new Error("Database or Collection ID is missing");

      const res = await databases.listDocuments(
        APPWRITE_DB_ID,
        APPWRITE_COLLECTION_ID
      );

      set({ invoices: res.documents as any });
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  },

  addInvoice: async (invoice) => {
    try {
      if (!APPWRITE_DB_ID || !APPWRITE_COLLECTION_ID)
        throw new Error("Database or Collection ID is missing");

      const newInvoice = await databases.createDocument(
        APPWRITE_DB_ID,
        APPWRITE_COLLECTION_ID,
        ID.unique(),
        invoice
      );

      set((state) => ({
        invoices: [...state.invoices, newInvoice as any],
      }));
    } catch (err) {
      console.error("Failed to save invoice:", err);
      throw err;
    }
  },

  updateInvoice: async (id, invoice) => {
    try {
      const updatedInvoice = await databases.updateDocument(
        APPWRITE_DB_ID,
        APPWRITE_COLLECTION_ID,
        id,
        invoice
      );

      set((state) => ({
        invoices: state.invoices.map((inv) =>
          inv.$id === id ? (updatedInvoice as any) : inv
        ),
      }));
    } catch (err) {
      console.error("Failed to update invoice:", err);
      throw err;
    }
  },

  removeInvoice: async (id) => {
    try {
      await databases.deleteDocument(APPWRITE_DB_ID, APPWRITE_COLLECTION_ID, id);
      set((state) => ({
        invoices: state.invoices.filter((inv) => inv.$id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete invoice:", err);
      throw err;
    }
  },
}));
