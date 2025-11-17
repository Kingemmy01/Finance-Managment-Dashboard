import Layout from "./components/Layout";
import DashboardCards from "./components/DashboardCards";

export default function Home() {
  // Dummy invoices to test UI
  const invoices = [
    { id: '1', amount: 1000, vatAmount: 75, total: 1075, status: 'paid' },
    { id: '2', amount: 500, vatAmount: 37.5, total: 537.5, status: 'unpaid' },
    { id: '3', amount: 2000, vatAmount: 150, total: 2150, status: 'paid' },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>
      <DashboardCards invoices={invoices} />
    </Layout>
  );
}



