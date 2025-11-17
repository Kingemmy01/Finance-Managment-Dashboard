"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useInvoiceStore } from "@/store/useInvoiceStore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function InvoiceChart() {
  const invoices = useInvoiceStore((s) => s.invoices);

  const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;
  const unpaidInvoices = invoices.filter((inv) => inv.status === "unpaid").length;

  const data = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        label: "Invoices",
        data: [paidInvoices, unpaidInvoices],
        backgroundColor: ["#34D399", "#F87171"], // Tailwind green & red
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 14 } },
      },
      title: {
        display: true,
        text: "Invoice Status Overview",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80">
      <Bar data={data} options={options} />
    </div>
  );
}

