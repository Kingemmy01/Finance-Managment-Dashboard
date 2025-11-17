"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useInvoiceStore } from "@/store/useInvoiceStore";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function RevenueChart() {
  const invoices = useInvoiceStore((s) => s.invoices);

  // Prepare monthly revenue
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' }));
  const revenuePerMonth = months.map((_, idx) => {
    return invoices
      .filter(inv => new Date(inv.dueDate).getMonth() === idx && inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0);
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Revenue (₦)",
        data: revenuePerMonth,
        fill: true,
        backgroundColor: "rgba(52, 211, 153, 0.2)", // Tailwind green 100
        borderColor: "#22C55E", // Tailwind green 500
        tension: 0.3,
        pointBackgroundColor: "#22C55E",
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
        text: "Monthly Revenue",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (val: any) => `₦${val.toLocaleString()}` },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80">
      <Line data={data} options={options} />
    </div>
  );
}
